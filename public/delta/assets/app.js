/* ============================================================
   delta : topic-sorted maths practice for the NIS grade 12 ESA.
   Built on the chemprep engine. The tasks are AI-generated to the
   NIS specification, and every one says so.
   ============================================================ */

(function () {
  'use strict';

  var QS = window.DELTA_QUESTIONS || [];
  var UNITS = window.DELTA_UNITS || [];
  var GOALS = [];     // no syllabus objectives mode yet
  var PRACTICE = [];  // every task lives in QS
  var FIGURES = {};
  var REF = window.DELTA_REFERENCE || [];

  var QBY = {};
  QS.forEach(function (q) { QBY[q.id] = q; });

  var PBY_GOAL = {};
  PRACTICE.forEach(function (p) { (PBY_GOAL[p.goal] = PBY_GOAL[p.goal] || []).push(p); });

  var GOAL_BY_CODE = {};
  GOALS.forEach(function (g) {
    GOAL_BY_CODE[g.code] = g;
    g.practice = PBY_GOAL[g.code] || [];
  });

  var TOPIC = {};
  UNITS.forEach(function (u) {
    u.topics.forEach(function (t) { t.unit = u; TOPIC[t.id] = t; });
  });

  QS.forEach(function (q) {
    q._search = (q.stem + ' ' + (q.body || '') + ' ' +
      (q.options ? Object.keys(q.options).map(function (k) { return q.options[k]; }).join(' ') : '') +
      ' ' + (TOPIC[q.topic] ? TOPIC[q.topic].name : q.topic)).toLowerCase();
  });

  /* ---------------- state ---------------- */

  var KEY = 'delta.v1';
  var S = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var v = JSON.parse(raw);
        v.results = v.results || {};
        v.notes = v.notes || {};
        v.flags = v.flags || {};
        v.theme = v.theme || null;
        v.sideHidden = !!v.sideHidden;
        v.last = v.last || null;
        v.tourSeen = !!v.tourSeen;
        v.srs = v.srs || {};
        v.goal = v.goal || 20;
        v.examDate = v.examDate || null;
        v.session = v.session || null;
        v.builder = v.builder || null;
        if (!v.days) {
          // older saves only kept the latest answer per question; that is still
          // enough to rebuild a rough activity history for the streak
          v.days = {};
          Object.keys(v.results).forEach(function (id) {
            var r = v.results[id];
            if (r && r.at) { var d = dayKey(r.at); v.days[d] = (v.days[d] || 0) + 1; }
          });
        }
        return v;
      }
    } catch (e) { /* private mode, first run */ }
    return { results: {}, notes: {}, flags: {}, theme: null, last: null, tourSeen: false,
      srs: {}, days: {}, goal: 20, examDate: null, session: null, builder: null };
  }

  var DAY = 86400000;
  function dayStart(t) { var d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function dayKey(t) {
    var d = new Date(t);
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  // where the student was last working, so the home page can offer a way back
  function remember(hash, label) {
    S.last = { hash: hash, label: label, at: Date.now() };
    save();
  }

  var saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
    }, 180);
  }

  function result(id) { return S.results[id] || null; }
  // Returns the review box the question sat in before this answer, so a
  // confidence rating given straight after can reschedule from the same base.
  function setResult(id, status, pick) {
    var base = S.srs[id] ? S.srs[id].box : (S.results[id] && S.results[id].s === 'wrong' ? 1 : 0);
    S.results[id] = { s: status, at: Date.now(), pick: pick || null };
    var today = dayKey(Date.now());
    S.days[today] = (S.days[today] || 0) + 1;
    schedule(id, status === 'correct', null, base);
    save();
    refreshChrome();
    return base;
  }

  /* ---------------- spaced review ---------------- */

  // A Leitner schedule, as in Anki and Brainscape: a miss or a guess comes back
  // tomorrow, then each clean answer pushes it further out. Questions answered
  // right with confidence the first time never enter the pile at all.
  var INTERVAL = [0, 1, 3, 7, 16, 35];

  function schedule(id, ok, conf, base) {
    var box;
    if (!ok || conf === 'guess') box = 1;
    else if (conf === 'unsure') box = Math.max(2, base);
    else if (conf === 'knew') box = base ? base + 2 : 0;
    else box = base ? base + 1 : 0;
    if (box > 5) box = 0; // learned: retire it
    if (!box) { delete S.srs[id]; return; }
    S.srs[id] = { box: box, due: dayStart(Date.now()) + INTERVAL[box] * DAY };
  }

  function rateConfidence(id, conf, base) {
    var r = result(id);
    if (!r) return;
    schedule(id, r.s === 'correct', conf, base);
    save();
    refreshChrome();
  }

  function isDue(q, now) {
    var c = S.srs[q.id];
    if (c) return c.due <= now;
    var r = result(q.id);
    return !!(r && r.s === 'wrong'); // mistakes from before the schedule existed
  }
  function dueQuestions() {
    var now = Date.now();
    return QS.filter(function (q) { return isDue(q, now); });
  }
  function upcoming(days) {
    var now = Date.now(), until = dayStart(now) + (days + 1) * DAY;
    return QS.filter(function (q) {
      var c = S.srs[q.id];
      return c && c.due > now && c.due < until;
    }).length;
  }
  function mistakes() {
    return QS.filter(function (q) { var r = result(q.id); return r && r.s === 'wrong'; });
  }
  function flagged() {
    return QS.filter(function (q) { return S.flags[q.id]; });
  }

  function streak() {
    var n = 0, t = Date.now();
    if (!S.days[dayKey(t)]) t -= DAY; // today not started yet does not break it
    while (S.days[dayKey(t)]) { n++; t -= DAY; }
    return n;
  }
  function todayCount() { return S.days[dayKey(Date.now())] || 0; }

  /* ---------------- helpers ---------------- */

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var main = $('#main');

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function paperLabel(q) { return 'p' + q.paper; }

  // Slides a card body open or shut by animating a measured height, then hands
  // the height back to the content so folds inside can still grow.
  function slide(body, open) {
    clearTimeout(body._t);
    if (open) {
      body.style.height = '0px';
      void body.offsetHeight;
      body.style.height = body.scrollHeight + 'px';
      body._t = setTimeout(function () { body.style.height = 'auto'; }, 300);
    } else {
      body.style.height = body.offsetHeight + 'px';
      void body.offsetHeight;
      body.style.height = '0px';
    }
  }

  // Lucide icons (MIT), inlined so the site keeps working offline
  var ICONS = {
    house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    zap: '<path d="M15.914 4a1.5 1.5 0 0 0-2.474-1.561l-9 9A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l9-9A1.5 1.5 0 0 0 18.5 10h-3.997a.5.5 0 0 1-.472-.667z"/>',
    list: '<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>',
    flag: '<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',
    out: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    again: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    book: '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2 5 5 0 0 1 4-2z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    search: '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    menu: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>'
  };
  ICONS.x = '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>';
  ICONS.clock = '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>';
  ICONS.target = '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>';
  ICONS.flame = '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>';
  ICONS.calendar = '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>';
  ICONS['chevron-left'] = '<path d="m15 18-6-6 6-6"/>';
  ICONS['chevron-right'] = '<path d="m9 18 6-6-6-6"/>';
  ICONS.info = '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>';
  ICONS.send = '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>';
  ICONS.bug = '<path d="M12 20v-9"/><path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"/><path d="M14.12 3.88 16 2"/><path d="M21 21a4 4 0 0 0-3.81-4"/><path d="M21 5a4 4 0 0 1-3.55 3.97"/><path d="M22 13h-4"/><path d="M3 21a4 4 0 0 1 3.81-4"/><path d="M3 5a4 4 0 0 0 3.55 3.97"/><path d="M6 13H2"/><path d="m8 2 1.88 1.88"/><path d="M9 7.13V6a3 3 0 1 1 6 0v1.13"/>';

  function icon(name) {
    return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
  }

  var CHEVRON = '<span class="q-chev" aria-hidden="true">' + icon('chevron') + '</span>';

  // Isaac-style status mark: empty ring, tick or cross, readable at a glance
  function statusMark(r) {
    if (!r) return '<span class="q-status" title="Not tried" aria-label="Not tried"></span>';
    var ok = r.s === 'correct';
    return '<span class="q-status ' + (ok ? 'ok' : 'no') + '" title="' + (ok ? 'Right' : 'Wrong') +
      '" aria-label="' + (ok ? 'Answered right' : 'Answered wrong') + '">' + icon(ok ? 'check' : 'x') + '</span>';
  }

  // The diagram cropped straight out of the source PDF, where we have one.
  function figureFor(q) {
    var f = FIGURES[q.id];
    if (!f) return null;
    var fig = el('figure', 'qfig');
    var img = el('img');
    img.src = 'figures/' + q.id + '.png';
    img.alt = 'Diagram from ' + q.year + ' paper ' + q.paper + ' question ' + q.n;
    img.loading = 'lazy';
    img.width = f.w;
    img.height = f.h;
    fig.appendChild(img);
    fig.appendChild(el('figcaption', null, 'from the original paper, page ' + q.page));
    return fig;
  }

  // Renders question text with the flattened chart and table fragments moved
  // into a fold, so the prose reads as prose.
  function questionText(q, src) {
    var split = splitFigureText(src);
    var wrap = el('div');
    wrap.appendChild(el('div', 'q-full', chem(split.prose)));
    var fig = figureFor(q);
    if (fig) wrap.appendChild(fig);
    if (split.figure) {
      var det = el('details', 'figtext');
      det.innerHTML = '<summary>text lifted out of the diagram</summary>' +
        '<div class="figtext-body">' + chem(split.figure) + '</div>';
      wrap.appendChild(det);
    }
    return wrap;
  }

  // A flattened diagram leaves a trail of stranded letters. Fine inside the
  // full question, useless in a one-line preview.
  function preview(q, limit) {
    limit = limit || 190;
    var s = splitFigureText(String(q.stem || '')).prose
      .replace(/(?:(?:^|[\s│])[A-Za-z]{1,2}(?=[\s│]|$)){3,}/g, ' … ')
      .replace(/\s*…\s*(…\s*)+/g, ' … ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    if (s.length <= limit) return s;
    var cut = s.slice(0, limit);
    var sp = cut.lastIndexOf(' ');
    return (sp > limit * 0.6 ? cut.slice(0, sp) : cut) + '…';
  }

  function questionsFor(topicId) {
    return QS.filter(function (q) { return q.topic === topicId; });
  }

  function topicStats(topicId) {
    var qs = questionsFor(topicId);
    var ok = 0, no = 0, seen = 0;
    qs.forEach(function (q) {
      var r = result(q.id);
      if (!r) return;
      seen++;
      if (r.s === 'correct') ok++;
      else if (r.s === 'wrong') no++;
    });
    return { total: qs.length, ok: ok, no: no, seen: seen };
  }

  // the objectives filed under a topic, and the written practice set on them;
  // a unit with no archive questions still has these
  function goalsFor(topicId) {
    return GOALS.filter(function (g) { return g.topic === topicId; });
  }

  function writtenFor(topicId) {
    return goalsFor(topicId).reduce(function (acc, g) { return acc.concat(g.practice); }, []);
  }

  function overall() {
    var ok = 0, no = 0, seen = 0;
    QS.forEach(function (q) {
      var r = result(q.id);
      if (!r) return;
      seen++;
      if (r.s === 'correct') ok++;
      else if (r.s === 'wrong') no++;
    });
    return { total: QS.length, ok: ok, no: no, seen: seen };
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------------- marking ---------------- */

  // A task marks itself when it has a key: a letter for multiple choice, or a
  // list of accepted forms for a typed answer. Structured tasks are self marked.
  function isAuto(q) {
    if (q.kind === 'short') return !!(q.accept && q.accept.length);
    return q.kind !== 'structured' && !!q.answer;
  }

  var SUPERS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };

  // drops a leading "x =", "a =", "f′(2) =" so the bare value is compared
  function dropLabel(t) { return t.replace(/^[a-zα-ω][a-z0-9'′″()]*=/, ''); }

  // One spelling for the many ways the same answer gets typed: spaces,
  // superscripts, the three kinds of minus, ≤ and <=, pi and π, degree signs.
  // A set answer ("x = 0 and x = 1") is split, stripped and sorted.
  function normAnswer(v, isSet) {
    var t = String(v == null ? '' : v).toLowerCase()
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, function (m) { return '^' + m.split('').map(function (c) { return SUPERS[c]; }).join(''); })
      .replace(/[−–—]/g, '-').replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/pi/g, 'π')
      .replace(/°/g, '').replace(/\*/g, '').replace(/\s+/g, '');
    if (!isSet) return dropLabel(t);
    return t.replace(/and|or|;/g, ',').split(',').map(dropLabel).filter(Boolean).sort().join(',');
  }

  function checkShort(q, given) {
    var g = normAnswer(given, q.set);
    return g !== '' && q.accept.some(function (a) { return normAnswer(a, q.set) === g; });
  }

  // the verdict for whatever was picked or typed, or null when nothing can mark it
  function markPick(q, pick) {
    if (q.kind === 'short') return isAuto(q) ? (checkShort(q, pick) ? 'correct' : 'wrong') : null;
    return q.answer ? (pick === q.answer ? 'correct' : 'wrong') : null;
  }

  function answerShown(q) { return q.kind === 'short' ? q.show : q.answer; }

  function tagHtml(q) {
    return '<span class="q-tag p' + q.paper + '" title="Written in the style of paper ' + q.paper + '">P' + q.paper + '</span>' +
      '<span class="q-tag ai" title="AI-generated to match the NIS specification">AI</span>';
  }

  // the standing disclaimer, on the home and about pages
  function aiNote() {
    return el('div', 'ai-note', icon('info') + '<span><b>AI-generated tasks.</b> Every task on this site was written by AI to ' +
      'match the NIS grade 12 mathematics specification. They are not past papers and have not been checked by NIS or a ' +
      'teacher, so mistakes are possible. If one looks wrong, use the report link under it. <a href="#/about">More</a></span>');
  }

  function pdfHref(path, page) {
    if (!path) return null;
    var parts = path.split('/').map(encodeURIComponent).join('/');
    return parts + (page ? '#page=' + page : '');
  }

  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    requestAnimationFrame(function () { t.classList.add('show'); });
    clearTimeout(t._t);
    t._t = setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.hidden = true; }, 240);
    }, 1900);
  }

  /* ---------------- chrome ---------------- */

  function buildNav() {
    var nav = $('#nav');
    nav.innerHTML = '';

    var home = el('a', 'nav-item', icon('house') + '<span class="ni-name">Overview</span>');
    home.href = '#/';
    home.dataset.route = '/';
    nav.appendChild(home);

    var drill = el('a', 'nav-item', icon('zap') + '<span class="ni-name">Practice</span>');
    drill.href = '#/practice';
    drill.dataset.route = '/practice';
    nav.appendChild(drill);

    var rev = el('a', 'nav-item', icon('again') + '<span class="ni-name">Review</span><span class="ni-n" id="nav-due"></span>');
    rev.href = '#/review';
    rev.dataset.route = '/review';
    nav.appendChild(rev);

    var exam = el('a', 'nav-item', icon('list') + '<span class="ni-name">The exam</span>');
    exam.href = '#/papers';
    exam.dataset.route = '/papers';
    nav.appendChild(exam);

    var ref = el('a', 'nav-item', icon('book') + '<span class="ni-name">Reference</span>');
    ref.href = '#/reference';
    ref.dataset.route = '/reference';
    nav.appendChild(ref);

    var about = el('a', 'nav-item', icon('info') + '<span class="ni-name">About and contact</span>');
    about.href = '#/about';
    about.dataset.route = '/about';
    nav.appendChild(about);

    UNITS.forEach(function (u) {
      var g = el('div', 'nav-group');
      g.appendChild(el('h4', null, esc(u.name)));
      u.topics.forEach(function (t) {
        var n = questionsFor(t.id).length;
        var a = el('a', 'nav-item',
          '<span class="ni-dot"></span>' +
          '<span class="ni-name">' + esc(t.name) + '</span>' +
          '<span class="ni-n">' + n + '</span>');
        a.href = '#/topic/' + t.id;
        a.dataset.route = '/topic/' + t.id;
        g.appendChild(a);
      });
      nav.appendChild(g);
    });
  }

  function refreshChrome() {
    var o = overall();
    var pct = o.total ? Math.round((o.ok / o.total) * 100) : 0;
    $('#sp-pct').textContent = pct + '%';
    $('#sp-bar').style.width = pct + '%';
    $('#sp-note').textContent = o.seen
      ? o.ok + ' right, ' + o.no + ' wrong, ' + (o.total - o.seen) + ' left'
      : 'nothing attempted yet';

    var w = dueQuestions().length;
    var badge = $('#review-count');
    badge.textContent = w;
    badge.hidden = w === 0;
    var navDue = $('#nav-due');
    if (navDue) navDue.textContent = w ? w + ' due' : '';
    var tabBadge = $('#tab-review-count');
    tabBadge.textContent = w;
    tabBadge.hidden = w === 0;
  }

  function markNav(route) {
    Array.prototype.forEach.call(document.querySelectorAll('.nav-item, .tab-item'), function (a) {
      a.classList.toggle('on', a.dataset.route === route);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.tb-link'), function (a) {
      var on = a.getAttribute('href') === '#' + route;
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  /* ---------------- question card ---------------- */

  function optionRow(q, key, state, onPick) {
    var b = el('button', 'opt');
    b.innerHTML = '<span class="k">' + key + '</span><span>' + chem(q.options[key]) + '</span>';
    if (state) {
      b.disabled = true;
      if (q.answer && key === q.answer) b.classList.add('right');
      if (state.pick === key && q.answer && key !== q.answer) b.classList.add('mistake');
      if (state.pick === key && !q.answer) b.classList.add('picked');
    } else {
      b.addEventListener('click', function () { onPick(key); });
    }
    return b;
  }

  /* ---------------- bug reports ---------------- */

  var CONTACT = { url: 'https://t.me/roarinx', handle: '@roarinx' };

  // Telegram links cannot carry a message to a person, so the report is put on
  // the clipboard and the chat opens alongside it, ready to paste.
  function reportText(q) {
    var lines = ['delta bug report', ''];
    if (q) {
      lines.push('task: ' + q.id + ' (P' + q.paper + ' style, AI-generated)');
      if (TOPIC[q.topic]) lines.push('topic: ' + TOPIC[q.topic].name);
    }
    lines.push('page: ' + location.href);
    lines.push('');
    lines.push('what is wrong:');
    lines.push('');
    lines.push('what it should be (if you know):');
    return lines.join('\n');
  }

  function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) { /* fall through to the old way */ }
    var ta = el('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }

  // A real link rather than window.open, so the new tab is never popup-blocked.
  function reportLink(q, label, cls) {
    var a = el('a', cls || 'srclink', icon('bug') + (label || 'report a problem'));
    a.href = CONTACT.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.addEventListener('click', function () {
      toast(copyText(reportText(q))
        ? 'report copied, paste it into the chat'
        : 'opening the chat, describe the problem there');
    });
    return a;
  }

  function sourceLinks(q) {
    var wrap = el('div', 'q-actions');
    wrap.appendChild(reportLink(q, 'report a mistake'));
    wrap.appendChild(el('span', 'spacer'));

    var flag = el('button', 'btn small', icon('flag') + (S.flags[q.id] ? 'flagged' : 'flag for later'));
    flag.setAttribute('aria-pressed', String(!!S.flags[q.id]));
    flag.addEventListener('click', function () {
      if (S.flags[q.id]) delete S.flags[q.id]; else S.flags[q.id] = true;
      flag.innerHTML = icon('flag') + (S.flags[q.id] ? 'flagged' : 'flag for later');
      flag.setAttribute('aria-pressed', String(!!S.flags[q.id]));
      save(); refreshChrome();
    });
    wrap.appendChild(flag);
    return wrap;
  }

  function selfMarkRow(q, onDone) {
    var row = el('div', 'selfmark');
    row.appendChild(el('span', null, 'mark yourself:'));
    var btns = el('div', 'mark-btns');
    var max = Math.min(q.marks, 15);
    var r = result(q.id);

    for (var i = 0; i <= max; i++) {
      (function (score) {
        var b = el('button', null, String(score));
        if (r && r.pick === 'sm' + score) b.classList.add('on');
        b.addEventListener('click', function () {
          Array.prototype.forEach.call(btns.children, function (c) { c.classList.remove('on'); });
          b.classList.add('on');
          setResult(q.id, score >= Math.ceil(q.marks * 0.6) ? 'correct' : 'wrong', 'sm' + score);
          toast(score + ' of ' + q.marks + ' recorded');
          if (onDone) onDone();
        });
        btns.appendChild(b);
      })(i);
    }
    row.appendChild(btns);
    row.appendChild(el('span', 'muted', 'out of ' + q.marks));
    return row;
  }

  function selfCheckRow(q, onDone) {
    var row = el('div', 'selfmark');
    row.appendChild(el('span', null, 'check it against the paper, then:'));
    var btns = el('div', 'mark-btns');
    [['got it', 'correct'], ['missed it', 'wrong']].forEach(function (pair) {
      var b = el('button', null, pair[0]);
      b.style.width = 'auto';
      b.style.padding = '0 10px';
      var r = result(q.id);
      if (r && r.s === pair[1]) b.classList.add('on');
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(btns.children, function (c) { c.classList.remove('on'); });
        b.classList.add('on');
        setResult(q.id, pair[1], 'self');
        if (onDone) onDone();
      });
      btns.appendChild(b);
    });
    row.appendChild(btns);
    return row;
  }

  // the .docx mark schemes keep their table order, so their text can be shown
  // inline instead of sending the reader off to the PDF
  function schemeBlock(q) {
    if (!q.scheme || !q.scheme.length) return null;
    var det = el('details', 'scheme');
    var rows = q.scheme.map(function (p) {
      return '<div class="scheme-row"><b>' + esc(p.part) + '</b><span>' +
        chem(p.text.replace(/\s*\|\s*/g, '\n')) + '</span></div>';
    }).join('');
    det.innerHTML = '<summary>Reveal the mark scheme</summary>' +
      '<div class="scheme-body">' + rows + '</div>';
    return det;
  }

  function solutionBlock(q) {
    if (!q.why) return null;
    var w = el('details', 'solution');
    w.innerHTML = '<summary>Worked solution</summary><div class="solution-body">' + chem(q.why) + '</div>';
    return w;
  }

  function appendExplain(box, q) {
    var sb = schemeBlock(q);
    if (sb) box.appendChild(sb);
    var wb = solutionBlock(q);
    if (wb) box.appendChild(wb);
  }

  function verdictEl(q, ok) {
    return el('div', 'verdict-row ' + (ok ? 'ok' : 'no'),
      '<span class="verdict ' + (ok ? 'ok' : 'no') + '">' + icon(ok ? 'check' : 'x') +
      (ok ? 'Correct' : 'Not accepted. The answer is ' + chem(answerShown(q)) + '.') + '</span>');
  }

  // a typed final answer: the box, a button, and Enter to submit
  function shortRow(q, given, locked, onCheck, label) {
    var row = el('div', 'short-row');
    var id = 'ans-' + q.id;
    row.appendChild(el('label', null, esc(q.label || 'Answer')));
    row.firstChild.setAttribute('for', id);
    var inp = el('input');
    inp.id = id;
    inp.type = 'text';
    inp.autocomplete = 'off';
    inp.spellcheck = false;
    inp.value = given || '';
    inp.disabled = !!locked;
    row.appendChild(inp);
    if (!locked) {
      var b = el('button', 'btn primary small', label || 'Check');
      b.type = 'button';
      var go = function () { if (inp.value.trim()) onCheck(inp.value.trim()); else inp.focus(); };
      b.addEventListener('click', go);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } });
      row.appendChild(b);
    }
    return row;
  }

  // examiner commentary on real candidate answers, from the OOK booklets
  function examinerBlock(q) {
    if (!q.examiner || !q.examiner.length) return null;
    var det = el('details', 'examiner');
    var rows = q.examiner.map(function (e, i) {
      var label = e.grade ? 'grade ' + e.grade : 'answer ' + (i % 3 + 1);
      return '<div class="ex-row"><b>' + esc(label) +
        (e.part ? '<i>' + esc(e.part) + '</i>' : '') + '</b><span>' + chem(e.text) + '</span></div>';
    }).join('');
    det.innerHTML = '<summary>What the examiners said about real answers to this question</summary>' +
      '<div class="ex-body">' + rows + '</div>';
    return det;
  }

  function workPad(q) {
    var ta = el('textarea', 'work');
    ta.placeholder = 'Work it out here. Saved on this device only.';
    ta.value = S.notes[q.id] || '';
    ta.addEventListener('input', function () {
      S.notes[q.id] = ta.value;
      if (!ta.value) delete S.notes[q.id];
      save();
    });
    return ta;
  }

  function questionCard(q, opts) {
    opts = opts || {};
    var r = result(q.id);
    var card = el('article', 'qcard' + (r ? ' ' + r.s : ''));

    var head = el('button', 'q-head');
    var tags = tagHtml(q);
    var meta = '';
    meta += '<span class="pill marks">' + q.marks + (q.marks === 1 ? ' mark' : ' marks') + '</span>';
    // structured questions nearly always carry a diagram, so the badge only
    // earns its place on multiple choice
    if (isAuto(q)) meta += '<span class="pill key">auto marked</span>';
    if (S.flags[q.id]) meta += '<span class="pill flagp">' + icon('flag') + 'flagged</span>';

    head.innerHTML = statusMark(r) + tags +
      '<span class="q-stem">' + chem(preview(q)) + '</span>' +
      '<span class="q-meta">' + meta + '</span>' + CHEVRON;
    head.setAttribute('aria-expanded', 'false');
    card.appendChild(head);

    var body = el('div', 'q-body');
    var clip = el('div', 'q-body-in');
    var inner = el('div', 'q-body-pad');
    clip.appendChild(inner);
    body.appendChild(clip);
    card.appendChild(body);

    var built = false;
    function build() {
      if (built) return;
      built = true;

      if (q.kind === 'structured') {
        inner.appendChild(questionText(q, q.body || q.stem));
        inner.appendChild(workPad(q));
        inner.appendChild(el('p', 'note', 'Work it out first, then reveal the mark scheme and score yourself honestly.'));
        appendExplain(inner, q);
        inner.appendChild(selfMarkRow(q, opts.onAnswer));
      } else if (q.kind === 'short') {
        inner.appendChild(questionText(q, q.stem));
        var cur = result(q.id);
        inner.appendChild(shortRow(q, cur ? cur.pick : '', !!cur, function (val) {
          var s2 = checkShort(q, val) ? 'correct' : 'wrong';
          setResult(q.id, s2, val);
          rebuild();
          toast(s2 === 'correct' ? 'correct' : 'the answer is ' + chemPlain(q.show));
          if (opts.onAnswer) opts.onAnswer();
        }));
        if (cur) {
          inner.appendChild(verdictEl(q, cur.s === 'correct'));
          appendExplain(inner, q);
        } else {
          inner.appendChild(el('p', 'short-hint', q.hint || 'Type the final answer only. Forms like 3/4, 0.75 and x = 3 are all fine.'));
        }
      } else {
        inner.appendChild(questionText(q, q.stem));
        var optWrap = el('div', 'opts');
        var current = result(q.id);
        ['A', 'B', 'C', 'D'].forEach(function (k) {
          optWrap.appendChild(optionRow(q, k, current, function (pick) {
            setResult(q.id, pick === q.answer ? 'correct' : 'wrong', pick);
            rebuild();
            toast(pick === q.answer ? 'correct' : 'the answer is ' + q.answer);
            if (opts.onAnswer) opts.onAnswer();
          }));
        });
        inner.appendChild(optWrap);
        if (current) appendExplain(inner, q);
      }

      inner.appendChild(sourceLinks(q));
    }

    function rebuild() {
      built = false;
      inner.innerHTML = '';
      build();
      var rr = result(q.id);
      card.className = 'qcard is-open' + (rr ? ' ' + rr.s : '');
      var st = $('.q-status', head);
      if (st) st.outerHTML = statusMark(rr);
    }

    head.addEventListener('click', function () {
      var open = !card.classList.contains('is-open');
      if (open) build();
      card.classList.toggle('is-open', open);
      head.setAttribute('aria-expanded', String(open));
      slide(body, open);
    });

    if (opts.open) {
      build(); card.classList.add('is-open');
      body.style.height = 'auto';
      head.setAttribute('aria-expanded', 'true');
    }
    return card;
  }

  /* ---------------- written practice ---------------- */

  function practiceStats(code) {
    var list = PBY_GOAL[code] || [];
    var ok = 0, no = 0;
    list.forEach(function (p) {
      var r = result(p.id);
      if (!r) return;
      if (r.s === 'correct') ok++; else no++;
    });
    return { total: list.length, ok: ok, no: no, seen: ok + no };
  }

  function practiceCard(p, opts) {
    opts = opts || {};
    var r = result(p.id);
    var card = el('article', 'qcard practice' + (r ? ' ' + r.s : ''));

    var head = el('button', 'q-head');
    var meta = '<span class="pill marks">' + p.marks + (p.marks === 1 ? ' mark' : ' marks') + '</span>';
    if (r) meta += '<span class="pill ' + (r.s === 'correct' ? 'ok' : 'no') + '">' +
      (r.s === 'correct' ? 'right' : 'wrong') + '</span>';
    head.innerHTML =
      '<span class="q-tag written">written</span>' +
      '<span class="q-stem">' + chem(p.stem.split('\n')[0].slice(0, 190)) + '</span>' +
      '<span class="q-meta">' + meta + '</span>' + CHEVRON;
    head.setAttribute('aria-expanded', 'false');
    card.appendChild(head);

    var body = el('div', 'q-body');
    var clip = el('div', 'q-body-in');
    var inner = el('div', 'q-body-pad');
    clip.appendChild(inner);
    body.appendChild(clip);
    card.appendChild(body);

    var built = false;
    function reveal() {
      var w = el('details', 'solution');
      w.innerHTML = '<summary>Worked solution</summary><div class="solution-body">' +
        chem(p.why) + '</div>';
      return w;
    }

    function build() {
      if (built) return;
      built = true;
      inner.appendChild(el('div', 'q-full', chem(p.stem)));

      if (p.kind === 'mcq') {
        var wrap = el('div', 'opts');
        var cur = result(p.id);
        ['A', 'B', 'C', 'D'].forEach(function (k) {
          var b = el('button', 'opt');
          b.innerHTML = '<span class="k">' + k + '</span><span>' + chem(p.options[k]) + '</span>';
          if (cur) {
            b.disabled = true;
            if (k === p.answer) b.classList.add('right');
            if (cur.pick === k && k !== p.answer) b.classList.add('mistake');
          } else {
            b.addEventListener('click', function () {
              setResult(p.id, k === p.answer ? 'correct' : 'wrong', k);
              built = false; inner.innerHTML = ''; build();
              card.className = 'qcard practice is-open ' + (k === p.answer ? 'correct' : 'wrong');
              toast(k === p.answer ? 'correct' : 'the answer is ' + p.answer);
              if (opts.onAnswer) opts.onAnswer();
            });
          }
          wrap.appendChild(b);
        });
        inner.appendChild(wrap);
        if (cur) inner.appendChild(reveal());
      } else {
        inner.appendChild(workPad(p));
        var det = el('details', 'scheme');
        det.innerHTML = '<summary>Reveal the mark scheme</summary><div class="scheme-body">' +
          p.scheme.map(function (s, i) {
            return '<div class="scheme-row"><b>' + (i + 1) + '</b><span>' + chem(s) + '</span></div>';
          }).join('') + '</div>';
        inner.appendChild(det);
        inner.appendChild(reveal());
        inner.appendChild(selfMarkRow(p, opts.onAnswer));
      }
    }

    head.addEventListener('click', function () {
      var open = !card.classList.contains('is-open');
      if (open) build();
      card.classList.toggle('is-open', open);
      head.setAttribute('aria-expanded', String(open));
      slide(body, open);
    });
    if (opts.open) {
      build(); card.classList.add('is-open');
      body.style.height = 'auto';
      head.setAttribute('aria-expanded', 'true');
    }
    return card;
  }

  /* ---------------- syllabus objectives ---------------- */

  var goalFilter = { grade: 'all', state: 'all' };

  function viewGoals() {
    markNav('/goals');
    var written = GOALS.filter(function (g) { return g.practice.length; }).length;

    main.innerHTML = '';
    main.appendChild(el('div', 'crumb', '<a href="#/">Overview</a> <span>/</span> <span>Syllabus</span>'));

    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">the checklist the exam is built from</p>' +
      '<h1 class="display" style="font-size:clamp(26px,3.4vw,36px)">Syllabus objectives</h1>' +
      '<p class="lede">All ' + GOALS.length + ' learning objectives from your grade 11 and 12 course calendars, ' +
      'ordered by how hard the past papers lean on them. ' + written + ' of them have written practice with worked solutions so far, ' +
      'and every objective links to the archive questions that test it.</p>';
    main.appendChild(head);

    var bar = el('div', 'filters');
    function chips(name, vals, labels) {
      vals.forEach(function (v, i) {
        var c = el('button', 'chip' + (goalFilter[name] === v ? ' on' : ''), labels[i]);
        c.setAttribute('aria-pressed', String(goalFilter[name] === v));
        c.addEventListener('click', function () { goalFilter[name] = v; viewGoals(); });
        bar.appendChild(c);
      });
    }
    chips('grade', ['all', 11, 12], ['both grades', 'grade 11', 'grade 12']);
    bar.appendChild(el('span', 'chip-sep'));
    chips('state', ['all', 'written', 'tested', 'todo'],
      ['everything', 'has practice', 'tested in papers', 'not started']);
    main.appendChild(bar);

    var shown = GOALS.filter(function (g) {
      if (goalFilter.grade !== 'all' && g.grade !== goalFilter.grade) return false;
      if (goalFilter.state === 'written' && !g.practice.length) return false;
      if (goalFilter.state === 'tested' && !g.hits) return false;
      if (goalFilter.state === 'todo') {
        var st = practiceStats(g.code);
        if (!g.practice.length || st.seen) return false;
      }
      return true;
    });
    shown.sort(function (a, b) {
      return b.practice.length - a.practice.length || b.hits - a.hits || a.code.localeCompare(b.code);
    });

    var list = el('div', 'goal-list');
    if (!shown.length) {
      list.appendChild(el('div', 'empty', '<b>Nothing here</b><span>Loosen the filters.</span>'));
    }
    shown.forEach(function (g) { list.appendChild(goalRow(g, true)); });
    main.appendChild(list);
  }

  function goalRow(g, withTopic) {
    var st = practiceStats(g.code);
    var a = el('a', 'goal-row');
    a.href = '#/goal/' + g.code;
    var t = withTopic && TOPIC[g.topic];
    a.innerHTML =
      '<span class="gr-code">' + esc(g.code) + '</span>' +
      '<span class="gr-text">' + chem(g.text) + '</span>' +
      '<span class="gr-meta">' +
        (t ? '<span class="pill">' + esc(t.name) + '</span>' : '') +
        (g.practice.length
          ? '<span class="pill ' + (st.seen === st.total ? 'ok' : 'key') + '">' +
            st.ok + '/' + st.total + ' practice</span>'
          : '<span class="pill nokey">no practice yet</span>') +
        '<span class="pill marks">' + g.hits + ' in papers</span>' +
      '</span>';
    return a;
  }

  function viewGoal(code) {
    var g = GOAL_BY_CODE[code];
    if (!g) return viewGoals();
    markNav('/goals');
    remember('#/goal/' + code, 'objective ' + code);
    var t = TOPIC[g.topic];

    main.innerHTML = '';
    main.appendChild(el('div', 'crumb',
      '<a href="#/">Overview</a> <span>/</span> <a href="#/goals">Syllabus</a>' +
      (t ? ' <span>/</span> <a href="#/topic/' + g.topic + '">' + esc(t.name) + '</a>' : '')));

    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">objective ' + esc(g.code) + ' &middot; grade ' + g.grade + '</p>' +
      '<h1 class="display" style="font-size:clamp(20px,2.4vw,27px);line-height:1.25">' + chem(g.text) + '</h1>';
    main.appendChild(head);

    if (g.practice.length) {
      var st = practiceStats(g.code);
      var sec = el('div', 'sec-head');
      sec.innerHTML = '<div><h2 class="sec">Written practice</h2>' +
        '<p class="unit-note">Questions written against this objective, with worked solutions. ' +
        'These are not past paper questions.</p></div>' +
        '<span class="mono muted">' + st.ok + ' of ' + st.total + ' right</span>';
      main.appendChild(sec);
      var pl = el('div', 'qlist');
      g.practice.forEach(function (p) { pl.appendChild(practiceCard(p)); });
      main.appendChild(pl);
    } else {
      main.appendChild(el('div', 'empty',
        '<b>No written practice yet</b><span>This objective has not been covered in the written bank. ' +
        'The past paper questions below still apply.</span>'));
    }

    var archive = (g.qs || []).map(function (id) { return QBY[id]; }).filter(Boolean);
    if (archive.length) {
      var sec2 = el('div', 'sec-head');
      sec2.innerHTML = '<div><h2 class="sec">From the past papers</h2>' +
        '<p class="unit-note">' + archive.length + ' archive question' + (archive.length === 1 ? '' : 's') +
        ' whose wording matches this objective.</p></div>';
      main.appendChild(sec2);
      archive.sort(function (a, b) { return b.year - a.year || a.paper - b.paper || a.n - b.n; });
      var al = el('div', 'qlist');
      archive.slice(0, 20).forEach(function (q) { al.appendChild(questionCard(q)); });
      main.appendChild(al);
    }
  }

  /* ---------------- views ---------------- */

  function viewHome() {
    markNav('/');
    var o = overall();
    var withKey = QS.filter(isAuto).length;
    var withScheme = QS.filter(function (q) { return q.scheme && q.scheme.length; }).length;

    var frag = document.createDocumentFragment();

    var first = !o.seen;
    var due = dueQuestions().length;
    var today = todayCount();
    var goalPct = Math.min(100, Math.round(today / S.goal * 100));
    var C = 2 * Math.PI * 36;
    var ss = S.session && !S.session.done ? S.session : null;

    var hero = el('section', 'hero' + (first ? ' is-first' : ''));
    var cta =
      '<div class="cta-row">' +
        (ss
          ? '<a class="btn primary" href="#/session">' + icon('zap') + 'Resume ' + esc(ss.title) + ' · ' +
              Object.keys(ss.ans).length + '/' + ss.ids.length + '</a>' +
            '<a class="btn" href="#/practice">New practice set</a>'
          : '<a class="btn primary" href="#/practice">' + icon('zap') + 'Build a practice set</a>' +
            '<a class="btn" href="#/drill/all">Quick 20</a>') +
        (due ? '<a class="btn" href="#/drill/review">' + icon('again') + 'Review ' + due + ' due</a>' : '') +
      '</div>';
    hero.innerHTML =
      '<div class="hero-in">' +
        '<p class="hero-greet">' + esc(greeting()) + '</p>' +
        (first
          ? '<h1 class="display">Grade 12 maths practice, sorted by the topic it tests.</h1>' +
            '<p class="lede">' + QS.length + ' tasks written to the NIS specification, across the ' +
              Object.keys(TOPIC).length + ' units of the grade 11 and 12 course. Build a set, answer it, and the site schedules what you miss for review.</p>'
          : '<h1 class="display">' + (due ? 'You have ' + due + ' question' + (due === 1 ? '' : 's') + ' to review.'
              : today >= S.goal ? 'Daily goal done. Nice work.' : (S.goal - today) + ' questions to today’s goal.') + '</h1>' +
            '<p class="lede">' + o.seen + ' of ' + o.total + ' tasks tried, ' +
              (o.seen ? Math.round(o.ok / o.seen * 100) + '% of them right.' : '') +
              (due ? ' Clear the review first while it is fresh, then start something new.' : ' Pick up something new, or test yourself in exam mode.') + '</p>') +
        cta +
      '</div>' +
      '<aside class="hero-panel today" aria-label="Today">' +
        '<div class="hp-head">Today<span>' + new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' }) + '</span></div>' +
        '<div class="hp-ring">' +
          '<div class="ring" role="img" aria-label="' + today + ' of ' + S.goal + ' questions today">' +
            '<svg viewBox="0 0 84 84"><circle class="track" cx="42" cy="42" r="36"/>' +
            '<circle class="fill' + (goalPct >= 100 ? ' done' : '') + '" cx="42" cy="42" r="36" stroke-dasharray="' + C.toFixed(1) +
              '" stroke-dashoffset="' + (C * (1 - goalPct / 100)).toFixed(1) + '"/></svg>' +
            '<b>' + today + '<small>of ' + S.goal + '</small></b>' +
          '</div>' +
          '<div class="hp-legend">' +
            '<span class="streak">' + icon('flame') + '<em>' + streak() + '-day streak</em></span>' +
            '<label class="goal-pick">Daily goal <select id="goal-sel" aria-label="Daily goal">' +
              [10, 20, 30, 50].map(function (n) { return '<option' + (n === S.goal ? ' selected' : '') + '>' + n + '</option>'; }).join('') +
            '</select></label>' +
          '</div>' +
        '</div>' +
        '<div class="hp-rows">' +
          '<a class="hp-row" href="#/review">' + icon('again') + '<span>Due for review</span><b>' + due + '</b></a>' +
          '<div class="hp-row exam">' + icon('calendar') + examLine() + '</div>' +
        '</div>' +
      '</aside>';
    frag.appendChild(hero);
    frag.appendChild(aiNote());

    $('#goal-sel', hero).addEventListener('change', function (e) { S.goal = +e.target.value; save(); viewHome(); });
    wireExamDate(hero);

    // Strengths and weaknesses, the way Save My Exams lays them out: every
    // topic you have enough answers in, weakest first
    var perf = Object.keys(TOPIC).map(function (id) {
      var st = topicStats(id);
      return { id: id, st: st, rate: st.seen ? st.ok / st.seen : 0 };
    }).filter(function (x) { return x.st.seen >= 2; });
    if (perf.length) {
      perf.sort(function (a, b) { return a.rate - b.rate; });
      var sw = el('section', 'sw');
      sw.innerHTML = '<div class="sec-head"><div><h2 class="sec">Strengths and weaknesses</h2>' +
        '<p>Topics with at least two answers, weakest first. ' + (Object.keys(TOPIC).length - perf.length) + ' not started yet.</p></div></div>';
      var tbl = el('div', 'topic-perf');
      perf.slice(0, 6).forEach(function (x) {
        var p = Math.round(x.rate * 100);
        var r = el('div', 'tp-row');
        r.innerHTML = '<a class="tp-name" href="#/topic/' + x.id + '">' + esc(TOPIC[x.id].name) + '</a>' +
          '<span class="tp-bar"><i class="ok" style="width:' + (x.st.ok / x.st.total * 100) + '%"></i><i class="no" style="width:' + (x.st.no / x.st.total * 100) + '%"></i></span>' +
          '<span class="tp-n">' + x.st.seen + '/' + x.st.total + ' tried</span>' +
          '<span class="tp-p ' + (p >= 70 ? 'ok' : p >= 50 ? 'mid' : 'no') + '">' + p + '%</span>' +
          '<a class="btn small" href="#/drill/' + x.id + '">Practise</a>';
        tbl.appendChild(r);
      });
      sw.appendChild(tbl);
      frag.appendChild(sw);
    }

    if (first) {
      var stats = el('div', 'stat-row');
      stats.innerHTML =
        '<div class="stat"><b>' + QS.length + '</b><span>tasks</span></div>' +
        '<div class="stat"><b>' + Object.keys(TOPIC).length + '</b><span>units</span></div>' +
        '<div class="stat"><b>' + withKey + '</b><span>auto marked</span></div>' +
        '<div class="stat"><b>' + withScheme + '</b><span>with mark schemes</span></div>';
      frag.appendChild(stats);
    }

    var pDone = PRACTICE.filter(function (p) { return result(p.id); }).length;
    if (pDone) {
      var pOk = PRACTICE.filter(function (p) {
        var r = result(p.id); return r && r.s === 'correct';
      }).length;
      var ps = el('div', 'strip');
      ps.innerHTML = '<span>Written practice: <b>' + pOk + '</b> right out of <b>' + pDone +
        '</b> attempted, ' + (PRACTICE.length - pDone) + ' still to go</span>';
      var pg = el('a', 'btn small', 'Keep going');
      pg.href = '#/goals';
      ps.appendChild(pg);
      frag.appendChild(ps);
    }

    frag.appendChild(el('div', 'sec-head units-head', '<div><h2 class="sec">All topics</h2><p>The ' + Object.keys(TOPIC).length + ' units of the grade 11 and 12 course, with how far you are through each.</p></div>'));

    UNITS.forEach(function (u) {
      var head = el('div', 'sec-head');
      head.innerHTML = '<div><h2 class="sec">' + esc(u.name) + '</h2>' +
        '<p class="unit-note">' + esc(u.note) + '</p></div>';
      frag.appendChild(head);

      var grid = el('div', 'topic-grid');
      u.topics.forEach(function (t) {
        var st = topicStats(t.id);
        var a = el('a', 'topic-card');
        a.href = '#/topic/' + t.id;
        var okPct = st.total ? (st.ok / st.total) * 100 : 0;
        var noPct = st.total ? (st.no / st.total) * 100 : 0;
        a.innerHTML =
          '<div class="tc-top"><span class="tc-code">' + esc(t.code) + '</span>' +
          '<span class="tc-n">' + st.total + ' task' + (st.total === 1 ? '' : 's') + '</span></div>' +
          '<h3 class="tc-name">' + esc(t.name) + '</h3>' +
          '<p class="tc-blurb">' + esc(t.blurb) + '</p>' +
          '<div class="tc-bar"><i class="ok" style="width:' + okPct + '%"></i>' +
          '<i class="no" style="width:' + noPct + '%"></i></div>' +
          '<div class="tc-foot">' + (st.total
            ? '<span>' + (st.seen ? st.seen + ' tried' : 'Not started') + '</span>' +
              (st.seen ? '<b>' + Math.round(okPct) + '% right</b>' : '')
            : '<span>No tasks yet</span>' +
              (writtenFor(t.id).length ? '<b>' + writtenFor(t.id).length + ' written</b>' : '')) + '</div>';
        grid.appendChild(a);
      });
      frag.appendChild(grid);
    });

    main.innerHTML = '';
    main.appendChild(frag);
  }

  // A different line each visit, keyed to the hour, with today's tally when
  // there is one. Kept short: it is a greeting, not a pep talk.
  var GREETS = {
    early:     ['Early start. Kettle on, then a drill.', 'Up with the sun. Fresh head, hardest topic first.', 'Morning. The unit circle is already awake.'],
    morning:   ['Good morning.', 'Morning. Twenty questions before lunch is a good day.', 'Good morning. Start with the topic you keep avoiding.'],
    afternoon: ['Good afternoon.', 'Afternoon. A short drill beats a long scroll.', 'Afternoon slump? Ten quick ones will fix it.'],
    evening:   ['Good evening.', 'Evening. Clear the review pile first, then something new.', 'Evening session. Steady beats heroic.'],
    night:     ['Night owl.', 'Late one. Ten questions, then sleep.', 'Still up? Make it count, then rest.', 'Past midnight. The exam is in daylight, remember.']
  };
  function greeting() {
    var h = new Date().getHours();
    var b = h < 5 ? 'night' : h < 9 ? 'early' : h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 22 ? 'evening' : 'night';
    var pool = GREETS[b];
    var line = pool[Math.floor(Math.random() * pool.length)];
    var start = new Date(); start.setHours(0, 0, 0, 0);
    var n = 0, ok = 0;
    Object.keys(S.results).forEach(function (id) {
      var r = S.results[id];
      if (!r || r.at < start.getTime()) return;
      n++;
      if (r.s === 'correct') ok++;
    });
    n = todayCount();
    if (n) line += ' ' + n + ' answered today.';
    return line;
  }

  // Countdown to the ESA. The date is the student's to set, since it moves
  // from year to year and school to school.
  // The ESA sits in May. Until a student sets the real date, count down to
  // mid-May in weeks, since a day count would claim precision it lacks.
  function nextMay() {
    var now = new Date(), y = now.getFullYear();
    if (now.getMonth() > 4) y++; // June onwards: next year's sitting
    return new Date(y, 4, 15);
  }
  function examLine() {
    if (!S.examDate) {
      var wk = Math.max(0, Math.round((nextMay().getTime() - dayStart(Date.now())) / (7 * DAY)));
      return '<span>' + (wk > 1 ? 'About <b>' + wk + ' weeks</b> to the ESA' : 'The ESA is <b>this month</b>') +
        ' <i class="muted">(May)</i></span><button class="linkish" id="exam-set">Set exact date</button>' +
        '<input type="date" id="exam-in" hidden aria-label="ESA date">';
    }
    var d = Math.round((new Date(S.examDate + 'T00:00:00').getTime() - dayStart(Date.now())) / DAY);
    var txt = d > 1 ? '<b>' + d + '</b> days to the ESA' : d === 1 ? 'ESA is <b>tomorrow</b>' : d === 0 ? 'ESA is <b>today</b>. Good luck.' : 'ESA date has passed';
    return '<span>' + txt + '</span><button class="linkish" id="exam-set">Change</button><input type="date" id="exam-in" hidden value="' + S.examDate + '" aria-label="ESA date">';
  }
  function wireExamDate(root) {
    var b = $('#exam-set', root), inp = $('#exam-in', root);
    if (!b) return;
    b.addEventListener('click', function () {
      b.hidden = true; inp.hidden = false; inp.focus();
      if (inp.showPicker) { try { inp.showPicker(); } catch (e) { /* not allowed here */ } }
    });
    inp.addEventListener('change', function () { S.examDate = inp.value || null; save(); viewHome(); });
  }

  function weakest() {
    var scored = Object.keys(TOPIC).map(function (id) {
      var st = topicStats(id);
      if (st.seen < 2) return null;
      return { id: id, rate: st.ok / st.seen };
    }).filter(Boolean);
    scored.sort(function (a, b) { return a.rate - b.rate; });
    return scored.slice(0, 3).filter(function (x) { return x.rate < 0.8; });
  }

  /* ---------------- topic view ---------------- */

  var filters = { paper: 'all', year: 'all', state: 'all' };

  function viewTopic(id) {
    var t = TOPIC[id];
    if (!t) return viewHome();
    markNav('/topic/' + id);
    remember('#/topic/' + id, t.name);

    var all = questionsFor(id);
    var st = topicStats(id);

    main.innerHTML = '';

    var crumb = el('div', 'crumb', '<a href="#/">Overview</a> <span>/</span> <span>' + esc(t.unit.name) + '</span>');
    main.appendChild(crumb);

    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">' + esc(t.code) + ' &middot; ' + all.length + (all.length === 1 ? ' task' : ' tasks') + '</p>' +
      '<h1 class="display" style="font-size:clamp(26px,3.4vw,36px)">' + esc(t.name) + '</h1>' +
      '<p class="lede">' + esc(t.blurb) + '</p>';
    main.appendChild(head);

    if (!all.length) {
      main.appendChild(el('div', 'empty', icon('inbox') + '<b>No tasks here yet</b><span>Tasks for this unit are still being written.</span>'));
      return;
    }

    var cta = el('div', 'cta-row');
    var drillBtn = el('a', 'btn primary', icon('zap') + 'Practise this topic');
    drillBtn.href = '#/drill/' + id;
    cta.appendChild(drillBtn);
    var custom = el('a', 'btn', 'Customise');
    custom.href = '#/practice/' + id;
    cta.appendChild(custom);
    cta.appendChild(el('span', 'btn', st.seen + ' of ' + st.total + ' attempted, ' + st.ok + ' right'));
    main.appendChild(cta);

    var bar = el('div', 'filters');
    function chipSet(name, values, labels) {
      values.forEach(function (v, i) {
        var c = el('button', 'chip' + (filters[name] === v ? ' on' : ''), labels[i]);
        c.setAttribute('aria-pressed', String(filters[name] === v));
        c.addEventListener('click', function () {
          filters[name] = v;
          viewTopic(id);
        });
        bar.appendChild(c);
      });
    }
    chipSet('paper', ['all', 1, 2, 3], ['any style', 'P1 style', 'P2 style', 'P3 style']);
    bar.appendChild(el('span', 'chip-sep'));
    chipSet('state', ['all', 'unseen', 'wrong', 'key'],
      ['everything', 'not tried', 'got wrong', 'auto marked']);
    main.appendChild(bar);

    var list = el('div', 'qlist');
    main.appendChild(list);

    function renderList() {
      var shown = all.filter(function (q) {
        if (filters.paper !== 'all' && q.paper !== filters.paper) return false;
        var r = result(q.id);
        if (filters.state === 'unseen' && r) return false;
        if (filters.state === 'wrong' && !(r && r.s === 'wrong')) return false;
        if (filters.state === 'key' && !isAuto(q)) return false;
        return true;
      });

      list.innerHTML = '';
      if (!shown.length) {
        list.appendChild(el('div', 'empty', '<b>Nothing here</b><span>Loosen the filters and try again.</span>'));
        return;
      }
      shown.sort(function (a, b) { return a.paper - b.paper || a.n - b.n; });
      shown.forEach(function (q) { list.appendChild(questionCard(q)); });
    }
    renderList();
  }

  /* ---------------- practice sessions ---------------- */

  // One engine for every way of practising. Tutor mode marks each question as
  // it is answered (UWorld's tutor mode); exam mode holds the marks back until
  // the set is submitted, with a clock running. The session lives in S so it
  // survives a reload or a detour to the reference.

  var sessTimer = null;

  // unseen before seen, and inside that, questions that mark themselves come
  // first so practice keeps giving feedback for as long as it can
  function orderPool(pool) {
    function bucket(q) {
      var seen = result(q.id) ? 4 : 0;
      if (q.kind === 'structured') return seen + 3;
      return seen + (isAuto(q) ? 1 : 2);
    }
    var buckets = {};
    pool.forEach(function (q) {
      var b = bucket(q);
      (buckets[b] = buckets[b] || []).push(q);
    });
    return Object.keys(buckets).sort(function (a, b) { return a - b; })
      .reduce(function (acc, k) { return acc.concat(shuffle(buckets[k])); }, []);
  }

  function startSession(opts) {
    var old = S.session;
    if (old && !old.done && old.mode === 'exam' && Object.keys(old.ans).length &&
        !confirm('You have an exam set in progress that has not been submitted. Start a new one and drop it?')) return;
    S.session = {
      title: opts.title, mode: opts.mode || 'tutor', ids: opts.qs.map(function (q) { return q.id; }),
      i: 0, ans: {}, spent: 0, started: Date.now(), done: false
    };
    save();
    if (location.hash === '#/session') route(); else location.hash = '#/session';
  }

  // the old one-click entry points, kept so existing links and bookmarks work
  function viewDrill(scope) {
    var pool, title;
    if (scope === 'all') {
      pool = orderPool(QS.filter(isAuto)).slice(0, 20);
      title = 'Quick 20';
    } else if (scope === 'weak') {
      var ids = weakest().map(function (w) { return w.id; });
      pool = orderPool(QS.filter(function (q) { return ids.indexOf(q.topic) > -1; })).slice(0, 20);
      title = 'Weak spots';
    } else if (scope === 'review') {
      pool = dueQuestions();
      if (!pool.length) pool = mistakes().concat(flagged().filter(function (q) { var r = result(q.id); return !r || r.s !== 'wrong'; }));
      pool = shuffle(pool);
      title = 'Review';
    } else {
      pool = orderPool(questionsFor(scope));
      title = TOPIC[scope] ? TOPIC[scope].name : scope;
    }
    if (!pool.length) {
      main.innerHTML = '<div class="empty">' + icon('inbox') + '<b>Nothing to practise here</b><span>Try another topic, or build a set.</span></div>';
      return;
    }
    remember('#/drill/' + scope, title);
    startSession({ title: title, qs: pool, mode: 'tutor' });
  }

  function stopClock() {
    clearInterval(sessTimer);
    sessTimer = null;
  }

  function fmtTime(ms) {
    var t = Math.round(ms / 1000), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), sec = t % 60;
    return (h ? h + ':' + ('0' + m).slice(-2) : m) + ':' + ('0' + sec).slice(-2);
  }

  function sessionState(ss, id) {
    var a = ss.ans[id];
    if (!a) return '';
    if (ss.mode === 'exam' && !ss.done) return 'done';
    return a.s === 'correct' ? 'ok' : a.s === 'wrong' ? 'no' : 'done';
  }

  function viewSession() {
    var ss = S.session;
    markNav('/practice');
    if (!ss) { location.hash = '#/practice'; return; }
    if (ss.done) return renderResults();

    var q = QBY[ss.ids[ss.i]];
    var a = ss.ans[q.id] || null;
    var locked = ss.mode === 'tutor' && !!a; // tutor answers are final
    main.innerHTML = '';

    var wrap = el('div', 'drill-wrap');

    // header: title, mode, clock, end
    var head = el('div', 'sess-head');
    head.innerHTML =
      '<div class="sess-title"><b>' + esc(ss.title) + '</b>' +
      '<span class="mode-badge ' + ss.mode + '">' + (ss.mode === 'exam' ? 'Exam mode' : 'Tutor mode') + '</span></div>' +
      '<span class="sess-clock" aria-live="off">' + icon('clock') + '<span id="sess-time">' + fmtTime(ss.spent) + '</span></span>';
    var endBtn = el('button', 'btn small', ss.mode === 'exam' ? 'Submit' : 'End session');
    endBtn.addEventListener('click', finishSession);
    head.appendChild(endBtn);
    wrap.appendChild(head);

    // navigator: every question as a numbered square, coloured by state
    var answered = Object.keys(ss.ans).length;
    var nav = el('div', 'qnav');
    nav.setAttribute('aria-label', 'Questions in this set');
    ss.ids.forEach(function (id, n) {
      var b = el('button', 'qn ' + sessionState(ss, id) + (n === ss.i ? ' cur' : '') + (S.flags[id] ? ' flag' : ''), String(n + 1));
      b.title = 'Question ' + (n + 1);
      if (n === ss.i) b.setAttribute('aria-current', 'step');
      b.addEventListener('click', function () { go(n); });
      nav.appendChild(b);
    });
    var navWrap = el('div', 'qnav-wrap');
    navWrap.appendChild(el('div', 'qnav-meta',
      '<span>Question <b>' + (ss.i + 1) + '</b> of ' + ss.ids.length + '</span>' +
      '<span>' + answered + ' answered' + (ss.mode === 'tutor' ? tutorTally(ss) : '') + '</span>'));
    navWrap.appendChild(nav);
    wrap.appendChild(navWrap);

    var card = el('div', 'drill-card');
    var kick = el('div', 'drill-kicker');
    kick.innerHTML =
      tagHtml(q) +
      '<span class="pill marks">' + q.marks + (q.marks === 1 ? ' mark' : ' marks') + '</span>' +
      '<span class="pill">' + esc(TOPIC[q.topic] ? TOPIC[q.topic].name : q.topic) + '</span>';
    card.appendChild(kick);

    var split = splitFigureText(q.kind === 'structured' ? (q.body || q.stem) : q.stem);
    card.appendChild(el('p', 'drill-stem', chem(split.prose)));
    var fig = figureFor(q);
    if (fig) card.appendChild(fig);
    if (split.figure) {
      var det = el('details', 'figtext');
      det.innerHTML = '<summary>text lifted out of the diagram</summary><div class="figtext-body">' + chem(split.figure) + '</div>';
      card.appendChild(det);
    }
    if (q.figure && !FIGURES[q.id]) {
      card.appendChild(el('p', 'note warn', q.kind === 'structured'
        ? 'Work this one from the paper page below, where the diagrams and tables are.'
        : 'Part of this question is a diagram. Open the paper page to see it.'));
    }

    var after = el('div', 'sess-after');

    if (q.kind === 'structured') {
      card.appendChild(workPad(q));
      var sb = schemeBlock(q);
      if (sb) card.appendChild(sb);
      var wb = solutionBlock(q);
      if (wb) card.appendChild(wb);
      card.appendChild(selfMarkRow(q, function () {
        var r = result(q.id);
        ss.ans[q.id] = { pick: r.pick, s: r.s };
        save();
        viewSession();
      }));
    } else if (q.kind === 'short') {
      card.appendChild(shortRow(q, a ? a.pick : '', locked, function (val) {
        if (ss.mode === 'exam') {
          ss.ans[q.id] = { pick: val };
          save();
          viewSession();
          toast('answer saved');
          return;
        }
        var s3 = checkShort(q, val) ? 'correct' : 'wrong';
        var base3 = setResult(q.id, s3, val);
        ss.ans[q.id] = { pick: val, s: s3, base: base3 };
        save();
        viewSession();
        toast(s3 === 'correct' ? 'correct' : 'the answer is ' + chemPlain(q.show));
      }, ss.mode === 'exam' ? (a ? 'Replace answer' : 'Save answer') : 'Check'));
      if (locked) {
        after.appendChild(verdictEl(q, a.s === 'correct'));
        after.appendChild(confidenceRow(q, a));
        appendExplain(after, q);
      } else if (a && ss.mode === 'exam') {
        after.appendChild(el('p', 'short-hint', 'Saved. Marks come when you submit.'));
      } else {
        after.appendChild(el('p', 'short-hint', q.hint || 'Type the final answer only. Forms like 3/4, 0.75 and x = 3 are all fine.'));
      }
    } else {
      var opts = el('div', 'opts');
      ['A', 'B', 'C', 'D'].forEach(function (k) {
        var b = el('button', 'opt');
        b.dataset.key = k;
        b.innerHTML = '<span class="k">' + k + '</span><span>' + chem(q.options[k]) + '</span>';
        if (locked) {
          b.disabled = true;
          if (q.answer && k === q.answer) b.classList.add('right');
          if (a.pick === k && q.answer && k !== q.answer) b.classList.add('mistake');
          if (a.pick === k && !q.answer) b.classList.add('picked');
        } else if (a && a.pick === k) {
          b.classList.add('picked');
          b.setAttribute('aria-pressed', 'true');
        }
        b.addEventListener('click', function () { pick(k); });
        opts.appendChild(b);
      });
      card.appendChild(opts);

      if (locked && q.answer) {
        var ok = a.s === 'correct';
        after.appendChild(el('div', 'verdict-row ' + (ok ? 'ok' : 'no'),
          '<span class="verdict ' + (ok ? 'ok' : 'no') + '">' + icon(ok ? 'check' : 'x') +
          (ok ? 'Correct' : 'Incorrect. The answer is ' + q.answer + '.') + '</span>'));
        after.appendChild(confidenceRow(q, a));
        appendExplain(after, q);
      } else if (locked && !q.answer) {
        after.appendChild(el('p', 'note', 'No answer key for this paper is in the archive. Check it against the paper, then say how it went.'));
        after.appendChild(selfCheckRow(q, function () {
          var r = result(q.id);
          a.s = r.s;
          save();
          viewSession();
        }));
      }
    }
    card.appendChild(after);

    // footer: sources, flag, previous and next
    var foot = el('div', 'drill-foot');
    var src = pdfHref(q.src, q.page);
    if (src) {
      var sa = el('a', 'srclink', icon('out') + 'paper, p. ' + q.page);
      sa.href = src; sa.target = '_blank'; sa.rel = 'noopener';
      foot.appendChild(sa);
    }
    if (q.ms && (ss.mode === 'tutor')) {
      var ma = el('a', 'srclink', icon('out') + 'mark scheme');
      ma.href = pdfHref(q.ms); ma.target = '_blank'; ma.rel = 'noopener';
      foot.appendChild(ma);
    }
    foot.appendChild(reportLink(q, 'report'));
    foot.appendChild(el('span', 'spacer'));

    var flagBtn = el('button', 'btn small' + (S.flags[q.id] ? ' is-on' : ''), icon('flag') + (S.flags[q.id] ? 'Flagged' : 'Flag'));
    flagBtn.setAttribute('aria-pressed', String(!!S.flags[q.id]));
    function toggleFlag() {
      if (S.flags[q.id]) delete S.flags[q.id]; else S.flags[q.id] = true;
      toast(S.flags[q.id] ? 'flagged for review' : 'flag removed');
      save(); refreshChrome(); viewSession();
    }
    flagBtn.addEventListener('click', toggleFlag);
    foot.appendChild(flagBtn);

    var prev = el('button', 'btn small', icon('chevron-left') + 'Back');
    prev.disabled = ss.i === 0;
    prev.addEventListener('click', function () { go(ss.i - 1); });
    foot.appendChild(prev);

    var last = ss.i === ss.ids.length - 1;
    var next = el('button', 'btn small' + (a ? ' primary' : ''),
      last ? (ss.mode === 'exam' ? 'Submit' : 'Finish') : (a ? 'Next' : 'Skip') + icon('chevron-right'));
    next.addEventListener('click', function () { if (last) finishSession(); else go(ss.i + 1); });
    foot.appendChild(next);

    card.appendChild(foot);
    wrap.appendChild(card);

    wrap.appendChild(el('p', 'kbd-hint sess-keys',
      (q.kind === 'mcq' ? '<kbd>A</kbd>–<kbd>D</kbd> answer · ' : q.kind === 'short' ? '<kbd>Enter</kbd> in the box checks · ' : '') +
      (locked && isAuto(q) ? '<kbd>1</kbd>–<kbd>3</kbd> confidence · ' : '') +
      '<kbd>F</kbd> flag · <kbd>←</kbd> <kbd>→</kbd> move · <kbd>Enter</kbd> next'));

    main.appendChild(wrap);
    main.focus({ preventScroll: true });
    var cur = $('.qn.cur', nav);
    if (cur && nav.scrollWidth > nav.clientWidth) cur.scrollIntoView({ block: 'nearest', inline: 'center' });

    function pick(k) {
      if (q.kind !== 'mcq' || locked) return;
      if (ss.mode === 'exam') {
        ss.ans[q.id] = { pick: k };
        save();
        viewSession();
        return;
      }
      var s2;
      if (q.answer) s2 = k === q.answer ? 'correct' : 'wrong';
      var base = q.answer ? setResult(q.id, s2, k) : 0;
      ss.ans[q.id] = { pick: k, s: s2 || null, base: base };
      save();
      viewSession();
      if (q.answer) toast(s2 === 'correct' ? 'correct' : 'the answer is ' + q.answer);
    }

    function go(n) {
      if (n < 0 || n >= ss.ids.length) return;
      ss.i = n;
      save();
      viewSession();
      window.scrollTo(0, 0);
    }

    SESS_KEYS = {
      pick: pick,
      flag: toggleFlag,
      prev: function () { go(ss.i - 1); },
      next: function () { if (last) finishSession(); else go(ss.i + 1); },
      conf: locked && isAuto(q) ? function (n) {
        var btn = $('.conf-btns button[data-n="' + n + '"]', main);
        if (btn) btn.click();
      } : null
    };

    // the clock only runs while the set is on screen
    stopClock();
    var tick = Date.now();
    sessTimer = setInterval(function () {
      if (!S.session || S.session !== ss || location.hash !== '#/session') { stopClock(); return; }
      var now = Date.now();
      if (!document.hidden) ss.spent += now - tick;
      tick = now;
      var t = $('#sess-time');
      if (t) t.textContent = fmtTime(ss.spent);
      save();
    }, 1000);
  }

  var SESS_KEYS = null;

  function tutorTally(ss) {
    var ok = 0, no = 0;
    Object.keys(ss.ans).forEach(function (id) {
      if (ss.ans[id].s === 'correct') ok++;
      else if (ss.ans[id].s === 'wrong') no++;
    });
    return ' · <b class="t-ok">' + ok + ' right</b>' + (no ? ' · <b class="t-no">' + no + ' wrong</b>' : '');
  }

  // Metacognition step borrowed from Brainscape: a right answer you guessed is
  // not a right answer you know, so it comes back sooner.
  function confidenceRow(q, a) {
    var row = el('div', 'conf');
    row.appendChild(el('span', 'conf-q', 'How sure were you?'));
    var btns = el('div', 'conf-btns');
    [['guess', 'Guessed', 'back tomorrow'], ['unsure', 'Unsure', 'back in a few days'], ['knew', 'Knew it', 'spaced out']]
      .forEach(function (c, n) {
        var b = el('button', a.conf === c[0] ? 'on' : null,
          '<kbd>' + (n + 1) + '</kbd><span>' + c[1] + '</span><i>' + c[2] + '</i>');
        b.dataset.n = String(n + 1);
        b.setAttribute('aria-pressed', String(a.conf === c[0]));
        b.addEventListener('click', function () {
          a.conf = c[0];
          rateConfidence(q.id, c[0], a.base || 0);
          Array.prototype.forEach.call(btns.children, function (x) {
            x.classList.toggle('on', x === b);
            x.setAttribute('aria-pressed', String(x === b));
          });
        });
        btns.appendChild(b);
      });
    row.appendChild(btns);
    return row;
  }

  function finishSession() {
    var ss = S.session;
    if (!ss) return;
    var open = ss.ids.length - Object.keys(ss.ans).length;
    if (ss.mode === 'exam') {
      if (!confirm(open ? open + ' question' + (open === 1 ? ' is' : 's are') + ' unanswered. Submit anyway?' : 'Submit and see your marks?')) return;
      ss.ids.forEach(function (id) {
        var a = ss.ans[id], q = QBY[id];
        if (!a) return;
        a.s = markPick(q, a.pick);
        if (a.s) a.base = setResult(id, a.s, a.pick);
      });
    } else if (open && ss.i < ss.ids.length - 1 &&
               !confirm('End now? ' + open + ' question' + (open === 1 ? '' : 's') + ' will be left unanswered.')) {
      return;
    }
    stopClock();
    ss.done = true;
    ss.ended = Date.now();
    save();
    renderResults();
    window.scrollTo(0, 0);
  }

  // UWorld-style report: score, time, then where the marks went by topic.
  function renderResults() {
    var ss = S.session;
    stopClock();
    SESS_KEYS = null;
    main.innerHTML = '';
    var ok = 0, no = 0, byTopic = {};
    ss.ids.forEach(function (id) {
      var a = ss.ans[id], q = QBY[id];
      var t = byTopic[q.topic] = byTopic[q.topic] || { ok: 0, no: 0, n: 0 };
      t.n++;
      if (a && a.s === 'correct') { ok++; t.ok++; }
      else if (a && a.s === 'wrong') { no++; t.no++; }
    });
    var marked = ok + no;
    var pct = marked ? Math.round(ok / marked * 100) : 0;
    var skipped = ss.ids.length - Object.keys(ss.ans).length;

    var wrap = el('div', 'results');
    wrap.appendChild(el('div', 'crumb', '<a href="#/practice">Practice</a> <span>/</span> <span>Results</span>'));
    var head = el('header', 'res-head');
    head.innerHTML =
      '<p class="h-eyebrow">' + esc(ss.title) + ' · ' + (ss.mode === 'exam' ? 'exam mode' : 'tutor mode') + '</p>' +
      '<h1 class="display">' + (marked ? ok + ' of ' + marked + ' correct' : 'Nothing marked') + '</h1>' +
      '<p class="lede">' + (!marked ? 'Answer a few questions and the report fills in.'
        : pct >= 80 ? 'Strong set. Move on to a topic you have not touched, or raise the stakes with exam mode.'
        : pct >= 55 ? 'Getting there. The misses are scheduled for review tomorrow; read their mark schemes first.'
        : 'A tough set. Go through the misses below with the mark scheme open before trying again.') + '</p>';
    wrap.appendChild(head);

    var tiles = el('div', 'stat-row res-tiles');
    tiles.innerHTML =
      '<div class="stat"><b>' + pct + '%</b><span>score</span></div>' +
      '<div class="stat"><b>' + fmtTime(ss.spent) + '</b><span>time on task</span></div>' +
      '<div class="stat"><b>' + (Object.keys(ss.ans).length ? fmtTime(ss.spent / Object.keys(ss.ans).length) : '–') + '</b><span>per question</span></div>' +
      '<div class="stat"><b>' + skipped + '</b><span>skipped</span></div>';
    wrap.appendChild(tiles);

    var row = el('div', 'cta-row');
    var wrongIds = ss.ids.filter(function (id) { return ss.ans[id] && ss.ans[id].s === 'wrong'; });
    if (wrongIds.length) {
      var retry = el('button', 'btn primary', icon('again') + 'Retry the ' + wrongIds.length + ' you missed');
      retry.addEventListener('click', function () {
        startSession({ title: 'Retry: ' + ss.title, mode: 'tutor', qs: wrongIds.map(function (id) { return QBY[id]; }) });
      });
      row.appendChild(retry);
    }
    var fresh = el('a', 'btn' + (wrongIds.length ? '' : ' primary'), icon('zap') + 'New practice set');
    fresh.href = '#/practice';
    row.appendChild(fresh);
    var home = el('a', 'btn', 'Home');
    home.href = '#/';
    row.appendChild(home);
    wrap.appendChild(row);

    var topics = Object.keys(byTopic).sort(function (x, y) {
      var a = byTopic[x], b = byTopic[y];
      var ra = a.ok + a.no ? a.ok / (a.ok + a.no) : 2, rb = b.ok + b.no ? b.ok / (b.ok + b.no) : 2;
      return ra - rb;
    });
    var sec = el('section', 'res-sec');
    sec.innerHTML = '<div class="sec-head"><div><h2 class="sec">By topic</h2><p>Weakest first.</p></div></div>';
    var tbl = el('div', 'topic-perf');
    topics.forEach(function (id) {
      var t = byTopic[id], m = t.ok + t.no;
      var p = m ? Math.round(t.ok / m * 100) : null;
      var r = el('a', 'tp-row');
      r.href = '#/topic/' + id;
      r.innerHTML = '<span class="tp-name">' + esc(TOPIC[id] ? TOPIC[id].name : id) + '</span>' +
        '<span class="tp-bar"><i class="ok" style="width:' + (m ? t.ok / t.n * 100 : 0) + '%"></i><i class="no" style="width:' + (m ? t.no / t.n * 100 : 0) + '%"></i></span>' +
        '<span class="tp-n">' + t.ok + '/' + t.n + '</span>' +
        '<span class="tp-p ' + (p == null ? '' : p >= 70 ? 'ok' : p >= 50 ? 'mid' : 'no') + '">' + (p == null ? '–' : p + '%') + '</span>';
      tbl.appendChild(r);
    });
    sec.appendChild(tbl);
    wrap.appendChild(sec);

    var qsec = el('section', 'res-sec');
    qsec.innerHTML = '<div class="sec-head"><div><h2 class="sec">Every question</h2><p>Open one to see the answer, the mark scheme and a worked solution.</p></div></div>';
    var list = el('div', 'qlist');
    ss.ids.forEach(function (id) { list.appendChild(questionCard(QBY[id])); });
    qsec.appendChild(list);
    wrap.appendChild(qsec);

    main.appendChild(wrap);
  }

  /* ---------------- practice builder ---------------- */

  // UWorld's "create test" and Save My Exams' target tests: choose topics, which
  // questions, how many, and whether marks come now or at the end.
  var POOLS = [
    ['unused', 'Not tried'], ['due', 'Due for review'], ['wrong', 'Got wrong'], ['flagged', 'Flagged'], ['all', 'Everything']
  ];

  function builderState() {
    var b = S.builder || {};
    return {
      mode: b.mode || 'tutor',
      pool: b.pool || 'unused',
      kind: b.kind || 'mcq',
      n: b.n || 20,
      topics: b.topics && b.topics.length ? b.topics.slice() : Object.keys(TOPIC)
    };
  }

  function builderMatches(b, topicFilter) {
    var now = Date.now();
    return QS.filter(function (q) {
      if (topicFilter !== false && b.topics.indexOf(q.topic) < 0) return false;
      if ((b.mode === 'exam' || b.kind === 'mcq') && !isAuto(q)) return false;
      var r = result(q.id);
      if (b.pool === 'unused') return !r;
      if (b.pool === 'wrong') return r && r.s === 'wrong';
      if (b.pool === 'flagged') return !!S.flags[q.id];
      if (b.pool === 'due') return isDue(q, now);
      return true;
    });
  }

  function viewPractice(preset) {
    markNav('/practice');
    var b = builderState();
    if (preset && TOPIC[preset]) { b.topics = [preset]; b.pool = 'all'; }

    function persist() { S.builder = b; save(); }

    main.innerHTML = '';
    var wrap = el('div', 'builder');
    wrap.appendChild(el('div', 'crumb', '<a href="#/">Overview</a> <span>/</span> <span>Practice</span>'));
    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">practice</p>' +
      '<h1 class="display" style="font-size:clamp(26px,3.4vw,36px)">Build a practice set</h1>' +
      '<p class="lede">Pick what to work on and how. Retrieval under test conditions is the most effective way to revise that there is, so the defaults favour questions you have not seen.</p>';
    wrap.appendChild(head);

    // quick starts for when choosing is the obstacle
    var quick = el('div', 'quick-row');
    var due = dueQuestions().length;
    quick.innerHTML =
      '<a class="quick" href="#/drill/all">' + icon('zap') + '<span><b>Quick 20</b><i>Auto-marked, unseen first</i></span></a>' +
      '<a class="quick' + (due ? '' : ' is-empty') + '" href="#/drill/review">' + icon('again') + '<span><b>Review due</b><i>' + (due ? due + ' question' + (due === 1 ? '' : 's') + ' waiting' : 'Nothing due today') + '</i></span></a>' +
      (weakest().length ? '<a class="quick" href="#/drill/weak">' + icon('target') + '<span><b>Weak spots</b><i>Your three lowest topics</i></span></a>' : '');
    wrap.appendChild(quick);

    var form = el('div', 'pb');

    // 1. mode
    var modeSec = section('1', 'Mode');
    var modes = el('div', 'radio-cards');
    [['tutor', 'Tutor', 'Marked after every question, with the answer, mark scheme and a confidence check. Best for learning a topic.'],
     ['exam', 'Exam', 'Timed. Nothing is marked until you submit, then you get a full report. Uses auto-marked questions only. Best for checking you are ready.']]
      .forEach(function (m) {
        var c = el('button', 'rcard' + (b.mode === m[0] ? ' on' : ''),
          '<span class="rc-dot"></span><span><b>' + m[1] + '</b><i>' + m[2] + '</i></span>');
        c.setAttribute('role', 'radio');
        c.setAttribute('aria-checked', String(b.mode === m[0]));
        c.addEventListener('click', function () { b.mode = m[0]; persist(); redraw(); });
        modes.appendChild(c);
      });
    modeSec.appendChild(modes);
    form.appendChild(modeSec);

    // 2. which questions
    var poolSec = section('2', 'Questions');
    var seg = el('div', 'seg');
    seg.setAttribute('role', 'radiogroup');
    POOLS.forEach(function (p) {
      var n = builderMatches({ mode: b.mode, kind: b.kind, pool: p[0], topics: b.topics }).length;
      var o = el('button', 'seg-o' + (b.pool === p[0] ? ' on' : ''), esc(p[1]) + '<span>' + n + '</span>');
      o.setAttribute('role', 'radio');
      o.setAttribute('aria-checked', String(b.pool === p[0]));
      o.addEventListener('click', function () { b.pool = p[0]; persist(); redraw(); });
      seg.appendChild(o);
    });
    poolSec.appendChild(seg);
    var kinds = el('label', 'check-line' + (b.mode === 'exam' ? ' is-disabled' : ''));
    kinds.innerHTML = '<input type="checkbox"' + (b.kind === 'all' && b.mode !== 'exam' ? ' checked' : '') +
      (b.mode === 'exam' ? ' disabled' : '') + '> Include longer P2 and P3 style tasks that you mark yourself against the mark scheme';
    $('input', kinds).addEventListener('change', function (e) { b.kind = e.target.checked ? 'all' : 'mcq'; persist(); redraw(); });
    poolSec.appendChild(kinds);
    form.appendChild(poolSec);

    // 3. topics
    var topSec = section('3', 'Topics');
    var tools = el('div', 'topic-tools');
    var allB = el('button', 'chip', 'All'), noneB = el('button', 'chip', 'None');
    allB.addEventListener('click', function () { b.topics = Object.keys(TOPIC); persist(); redraw(); });
    noneB.addEventListener('click', function () { b.topics = []; persist(); redraw(); });
    tools.appendChild(allB); tools.appendChild(noneB);
    if (weakest().length) {
      var wk = el('button', 'chip', 'My weakest');
      wk.addEventListener('click', function () { b.topics = weakest().map(function (w) { return w.id; }); persist(); redraw(); });
      tools.appendChild(wk);
    }
    tools.appendChild(el('span', 'muted', b.topics.length + ' of ' + Object.keys(TOPIC).length + ' selected'));
    topSec.appendChild(tools);

    var units = el('div', 'unit-cols');
    UNITS.forEach(function (u) {
      var box = el('fieldset', 'unit-box');
      var ids = u.topics.map(function (t) { return t.id; });
      var on = ids.filter(function (id) { return b.topics.indexOf(id) > -1; }).length;
      var lg = el('legend');
      lg.innerHTML = '<label class="check-line strong"><input type="checkbox"' + (on === ids.length ? ' checked' : '') + '> ' + esc(u.name) + '</label>';
      var master = $('input', lg);
      master.indeterminate = on > 0 && on < ids.length;
      master.addEventListener('change', function () {
        b.topics = b.topics.filter(function (id) { return ids.indexOf(id) < 0; });
        if (master.checked) b.topics = b.topics.concat(ids);
        persist(); redraw();
      });
      box.appendChild(lg);
      u.topics.forEach(function (t) {
        var n = builderMatches({ mode: b.mode, kind: b.kind, pool: b.pool, topics: [t.id] }).length;
        var l = el('label', 'check-line' + (n ? '' : ' is-zero'));
        l.innerHTML = '<input type="checkbox"' + (b.topics.indexOf(t.id) > -1 ? ' checked' : '') + '> <span>' + esc(t.name) + '</span><em>' + n + '</em>';
        $('input', l).addEventListener('change', function (e) {
          if (e.target.checked) b.topics.push(t.id);
          else b.topics = b.topics.filter(function (x) { return x !== t.id; });
          persist(); redraw();
        });
        box.appendChild(l);
      });
      units.appendChild(box);
    });
    topSec.appendChild(units);
    form.appendChild(topSec);

    // 4. length
    var lenSec = section('4', 'Length');
    var lseg = el('div', 'seg');
    [10, 20, 40, 0].forEach(function (n) {
      var o = el('button', 'seg-o' + (b.n === n || (!n && b.n === 0) ? ' on' : ''), n ? n + ' questions' : 'All matching');
      o.addEventListener('click', function () { b.n = n; persist(); redraw(); });
      lseg.appendChild(o);
    });
    lenSec.appendChild(lseg);
    form.appendChild(lenSec);
    wrap.appendChild(form);

    // sticky summary and start
    var matches = builderMatches(b);
    var count = b.n ? Math.min(b.n, matches.length) : matches.length;
    var bar = el('div', 'pb-bar');
    bar.innerHTML = '<div><b>' + count + ' question' + (count === 1 ? '' : 's') + '</b><span>' +
      (b.mode === 'exam' ? 'Exam mode, timed, marked at the end' : 'Tutor mode, marked as you go') + '</span></div>';
    var start = el('button', 'btn primary', 'Start ' + (b.mode === 'exam' ? 'exam' : 'practice') + icon('chevron-right'));
    start.disabled = !count;
    start.addEventListener('click', function () {
      var qs = (b.pool === 'unused' || b.pool === 'all' ? orderPool(matches) : shuffle(matches)).slice(0, count);
      var title = b.topics.length === 1 ? TOPIC[b.topics[0]].name
        : b.topics.length === Object.keys(TOPIC).length ? 'Mixed practice' : b.topics.length + ' topics';
      remember('#/practice', 'Practice');
      startSession({ title: title, mode: b.mode, qs: qs });
    });
    bar.appendChild(start);
    if (!count) bar.appendChild(el('p', 'pb-empty', 'No questions match. Widen the topics or pick a different set of questions.'));
    wrap.appendChild(bar);

    main.appendChild(wrap);

    function redraw() {
      var y = window.scrollY;
      viewPractice();
      window.scrollTo(0, y);
    }
    function section(n, title) {
      var sct = el('section', 'pb-sec');
      sct.appendChild(el('h2', 'pb-h', '<span>' + n + '</span>' + title));
      return sct;
    }
  }

  /* ---------------- review ---------------- */

  var reviewTab = 'due';

  function viewReview() {
    markNav('/review');
    var due = dueQuestions(), wrong = mistakes(), flags = flagged();
    main.innerHTML = '';
    main.appendChild(el('div', 'crumb', '<a href="#/">Overview</a> <span>/</span> <span>Review</span>'));
    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">spaced review</p>' +
      '<h1 class="display" style="font-size:clamp(26px,3.4vw,36px)">Review</h1>' +
      '<p class="lede">Questions you miss, or get right by guessing, come back after 1, 3, 7, 16 and then 35 days. Answer them well and they space out; miss one and it starts again. A little each day beats a lot the night before.</p>';
    main.appendChild(head);

    var sched = el('div', 'sched');
    sched.innerHTML =
      '<div><b>' + due.length + '</b><span>due now</span></div>' +
      '<div><b>' + upcoming(1) + '</b><span>by tomorrow</span></div>' +
      '<div><b>' + upcoming(7) + '</b><span>this week</span></div>' +
      '<div><b>' + Object.keys(S.srs).length + '</b><span>in rotation</span></div>';
    main.appendChild(sched);

    var tabs = el('div', 'tabs');
    tabs.setAttribute('role', 'tablist');
    var sets = { due: due, wrong: wrong, flagged: flags };
    [['due', 'Due now'], ['wrong', 'Mistakes'], ['flagged', 'Flagged']].forEach(function (t) {
      var b = el('button', 'tab' + (reviewTab === t[0] ? ' on' : ''), t[1] + '<span>' + sets[t[0]].length + '</span>');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(reviewTab === t[0]));
      b.addEventListener('click', function () { reviewTab = t[0]; viewReview(); });
      tabs.appendChild(b);
    });
    main.appendChild(tabs);

    var qs = sets[reviewTab];
    if (!qs.length) {
      var msg = {
        due: ['Nothing due', upcoming(7) ? 'Come back tomorrow; ' + upcoming(7) + ' more fall due this week.' : 'Miss a question or mark one as a guess and it will be scheduled here.'],
        wrong: ['No mistakes on record', 'Everything you have answered, you got right.'],
        flagged: ['Nothing flagged', 'Press F on any question to keep it here.']
      }[reviewTab];
      main.appendChild(el('div', 'empty', icon('inbox') + '<b>' + msg[0] + '</b><span>' + msg[1] + '</span>'));
      return;
    }

    var cta = el('div', 'cta-row');
    var d = el('button', 'btn primary', icon('zap') + (qs.length === 1 ? 'Practise it' : 'Practise these ' + qs.length));
    d.addEventListener('click', function () {
      startSession({ title: { due: 'Review', wrong: 'Mistakes', flagged: 'Flagged' }[reviewTab], mode: 'tutor', qs: shuffle(qs) });
    });
    cta.appendChild(d);
    main.appendChild(cta);

    qs = qs.slice().sort(function (a, b) {
      var ra = result(a.id), rb = result(b.id);
      return (rb ? rb.at : 0) - (ra ? ra.at : 0);
    });
    var list = el('div', 'qlist');
    list.style.marginTop = '18px';
    qs.forEach(function (q) { list.appendChild(questionCard(q)); });
    main.appendChild(list);
  }

  /* ---------------- papers ---------------- */

  function viewPapers() {
    markNav('/papers');
    var n = { 1: 0, 2: 0, 3: 0 };
    QS.forEach(function (q) { n[q.paper] = (n[q.paper] || 0) + 1; });

    main.innerHTML = '';
    main.appendChild(el('div', 'crumb', '<a href="#/">Overview</a> <span>/</span> <span>The exam</span>'));
    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">external summative assessment</p>' +
      '<h1 class="display" style="font-size:clamp(26px,3.4vw,36px)">The grade 12 maths exam</h1>' +
      '<p class="lede">Three papers, 230 marks, set to the Cambridge A Level standard and covering the whole of the grade 11 and 12 course. ' +
      'Every task here is tagged P1, P2 or P3 for the paper whose style it follows.</p>';
    main.appendChild(head);

    var t = el('table', 'paper-table');
    t.innerHTML = '<thead><tr><th>Paper</th><th>Time</th><th>Questions</th><th>Marks</th><th>Calculator</th><th>Tasks here</th></tr></thead><tbody>' +
      '<tr><td><span class="q-tag p1">P1</span></td><td class="mono">80 min</td><td>25–30 short questions, 2–3 marks each</td><td class="mono">60 (26%)</td><td>not allowed</td><td class="mono">' + n[1] + '</td></tr>' +
      '<tr><td><span class="q-tag p2">P2</span></td><td class="mono">120 min</td><td>about 12 questions, 3–15 marks each</td><td class="mono">90 (39%)</td><td>allowed; show all working</td><td class="mono">' + n[2] + '</td></tr>' +
      '<tr><td><span class="q-tag p3">P3</span></td><td class="mono">120 min</td><td>about 10 questions set in a real context, 3–12 marks each</td><td class="mono">80 (35%)</td><td>allowed; show all working</td><td class="mono">' + n[3] + '</td></tr>' +
      '</tbody>';
    main.appendChild(t);

    var body = el('div', 'about');
    body.innerHTML =
      '<section class="about-sec"><h2 class="sec">What the marks are for</h2><ul class="about-list">' +
        '<li><b>AO1, mathematical techniques (80 marks).</b> Recall and use facts, notation and methods accurately. Most of paper 1.</li>' +
        '<li><b>AO2, applying mathematics (75 marks).</b> Model real situations and combine methods to solve problems in context. Most of paper 3.</li>' +
        '<li><b>AO3, mathematical reasoning (75 marks).</b> Build logical arguments and proofs, and justify each step. Most of paper 2.</li>' +
      '</ul>' +
      '<table class="paper-table" style="margin-top:14px"><thead><tr><th></th><th>P1</th><th>P2</th><th>P3</th><th>Total</th></tr></thead><tbody>' +
        '<tr><td>AO1</td><td class="mono">40</td><td class="mono">20</td><td class="mono">20</td><td class="mono">80</td></tr>' +
        '<tr><td>AO2</td><td class="mono">10</td><td class="mono">20</td><td class="mono">45</td><td class="mono">75</td></tr>' +
        '<tr><td>AO3</td><td class="mono">10</td><td class="mono">50</td><td class="mono">15</td><td class="mono">75</td></tr>' +
        '<tr><td>Total</td><td class="mono">60</td><td class="mono">90</td><td class="mono">80</td><td class="mono">230</td></tr>' +
      '</tbody></table></section>' +
      '<section class="about-sec"><h2 class="sec">On the day</h2><ul class="about-list">' +
        '<li><b>A formula list and statistical tables are provided,</b> including the binomial, Poisson and normal distribution tables.</li>' +
        '<li><b>Calculators.</b> None in paper 1. In papers 2 and 3 a scientific calculator is allowed, but not one that does algebra, differentiates or integrates, or connects to anything.</li>' +
        '<li><b>Show your working in papers 2 and 3.</b> Full marks need every step, and correct steps earn marks even when the final answer is wrong.</li>' +
        '<li><b>Mark scheme codes.</b> M1 is a method mark for a correct approach, A1 an accuracy mark that depends on the method mark before it, B1 a mark for a correct result on its own.</li>' +
        '<li><b>Language.</b> The exam is sat in Kazakh or Russian, the language you are taught in.</li>' +
      '</ul><p class="muted" style="font-size:13px">From the NIS specification for the grade 12 mathematics external summative assessment.</p></section>';
    main.appendChild(body);
  }

  /* ---------------- about ---------------- */

  function viewAbout() {
    markNav('/about');
    var auto = QS.filter(isAuto).length;

    main.innerHTML = '';
    main.appendChild(el('div', 'crumb', '<a href="#/">Overview</a> <span>/</span> <span>About</span>'));

    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">about delta</p>' +
      '<h1 class="display" style="font-size:clamp(26px,3.4vw,36px)">Why this exists</h1>' +
      '<p class="lede">The NIS grade 12 maths ESA has no public archive of past papers to practise from. ' +
      'delta fills the gap with tasks written to the published specification: the same three papers, the same kind of ' +
      'questions, sorted into the units of the grade 11 and 12 course so you can work on the one you are weakest in. ' +
      'It is the maths sibling of chemprep, and works the same way.</p>';
    main.appendChild(head);
    main.appendChild(aiNote());

    var body = el('div', 'about');
    body.innerHTML =
      '<section class="about-sec">' +
        '<h2 class="sec">What it is for</h2>' +
        '<ul class="about-list">' +
          '<li><b>Practise by topic.</b> ' + QS.length + ' tasks across ' + Object.keys(TOPIC).length + ' units, each tagged ' +
            '<span class="q-tag p1">P1</span>, <span class="q-tag p2">P2</span> or <span class="q-tag p3">P3</span> for the paper whose style it follows.</li>' +
          '<li><b>Get marked straight away.</b> ' + auto + ' short-answer and multiple choice tasks mark themselves. The longer ones come ' +
            'with a mark scheme in the exam’s M1, A1, B1 style and a worked solution, so you can mark yourself honestly.</li>' +
          '<li><b>Keep the formulas close.</b> The reference collects the definitions, formulas and methods for every unit.</li>' +
        '</ul>' +
      '</section>' +

      '<section class="about-sec">' +
        '<h2 class="sec">Worth knowing</h2>' +
        '<ul class="about-list">' +
          '<li><b>The tasks are AI-generated.</b> Every task was written by an AI model to follow the NIS specification and course plans, ' +
            'and carries the <span class="q-tag ai">AI</span> tag. They are not past papers, not from NIS, and not checked by a teacher. ' +
            'The answers were worked through and checked, but mistakes are still possible.</li>' +
          '<li><b>It is unofficial.</b> This is an independent study tool, not a product of NIS or the Center for Pedagogical Measurements.</li>' +
          '<li><b>Typed answers are marked by matching.</b> Common forms are accepted, such as 3/4 or 0.75 and x = 3 or 3, but an unusual ' +
            'correct form can still be marked wrong. The worked solution always shows the expected answer.</li>' +
          '<li><b>Your progress stays with you.</b> It lives in this browser only. Use export in the sidebar to move it to another device.</li>' +
        '</ul>' +
      '</section>';
    main.appendChild(body);

    var card = el('section', 'contact-card');
    card.innerHTML =
      '<div class="contact-copy">' +
        '<p class="h-eyebrow">wrong answers, bugs, ideas</p>' +
        '<h2 class="sec">Found a mistake?</h2>' +
        '<p>Message ' + esc(CONTACT.handle) + ' on Telegram. Because the tasks are AI-generated, reports of wrong answers are especially ' +
          'useful. The fastest way is the <b>report a mistake</b> link under any task, which copies its id and the page for you.</p>' +
      '</div>';
    var actions = el('div', 'contact-actions');
    var tg = el('a', 'btn primary', icon('send') + 'Message ' + esc(CONTACT.handle));
    tg.href = CONTACT.url; tg.target = '_blank'; tg.rel = 'noopener';
    actions.appendChild(tg);
    actions.appendChild(reportLink(null, 'Copy a report template', 'btn'));
    card.appendChild(actions);
    main.appendChild(card);
  }

  /* ---------------- reference ---------------- */

  var refFilter = { area: 'all', q: '' };

  function refItemHtml(it) {
    return '<div class="ref-item"><b class="ref-term">' + chem(it.t) + '</b><div class="ref-body">' +
      (it.f ? '<code class="ref-f">' + chem(it.f) + '</code>' : '') +
      (it.d ? '<p>' + chem(it.d) + '</p>' : '') + '</div></div>';
  }

  function refMatches(q) {
    var t = q.toLowerCase().trim();
    var out = [];
    REF.forEach(function (sec) {
      sec.items.forEach(function (it) {
        if (!t || (it.t + ' ' + (it.f || '') + ' ' + it.d + ' ' + sec.title).toLowerCase().indexOf(t) > -1) {
          out.push({ sec: sec, it: it });
        }
      });
    });
    return out;
  }

  function viewReference() {
    markNav('/reference');
    main.innerHTML = '';
    main.appendChild(el('div', 'crumb', '<a href="#/">Overview</a> <span>/</span> <span>Reference</span>'));

    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">справочник</p>' +
      '<h1 class="display" style="font-size:clamp(26px,3.4vw,36px)">Reference</h1>' +
      '<p class="lede">Formulas, definitions and methods for every unit, in the notation the mark schemes use. ' +
      'The exam gives you a formula list and statistical tables; everything else here is worth knowing by heart.</p>';
    main.appendChild(head);

    var tools = el('div', 'ref-tools');
    var box = el('input', 'ref-search');
    box.type = 'search';
    box.placeholder = 'Filter: logarithm, chain rule, determinant, variance';
    box.value = refFilter.q;
    box.setAttribute('aria-label', 'Filter the reference');
    tools.appendChild(box);
    var areas = [['all', 'everything'], ['algebra', 'algebra'], ['calculus', 'calculus'], ['geometry', 'geometry'], ['statistics', 'statistics']];
    areas.forEach(function (a) {
      var c = el('button', 'chip' + (refFilter.area === a[0] ? ' on' : ''), a[1]);
      c.setAttribute('aria-pressed', String(refFilter.area === a[0]));
      c.addEventListener('click', function () {
        refFilter.area = a[0];
        Array.prototype.forEach.call(tools.querySelectorAll('.chip'), function (x) {
          var on = x === c;
          x.classList.toggle('on', on);
          x.setAttribute('aria-pressed', String(on));
        });
        renderRef();
      });
      tools.appendChild(c);
    });
    main.appendChild(tools);

    var toc = el('nav', 'ref-toc');
    toc.setAttribute('aria-label', 'Sections');
    main.appendChild(toc);

    var body = el('div');
    main.appendChild(body);

    function renderRef() {
      var t = refFilter.q.toLowerCase().trim();
      body.innerHTML = '';
      toc.innerHTML = '';
      var shown = 0;
      REF.forEach(function (sec) {
        if (refFilter.area !== 'all' && sec.area !== refFilter.area) return;
        var items = sec.items.filter(function (it) {
          return !t || (it.t + ' ' + (it.f || '') + ' ' + it.d).toLowerCase().indexOf(t) > -1;
        });
        if (!items.length) return;
        shown += items.length;

        var link = el('a', null, esc(sec.title));
        link.href = '#/reference';
        link.addEventListener('click', function (e) {
          e.preventDefault();
          var target = $('#ref-' + sec.id);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        toc.appendChild(link);

        var s = el('section', 'ref-sec');
        s.id = 'ref-' + sec.id;
        var n = questionsFor(sec.topic).length;
        var t2 = TOPIC[sec.topic];
        s.innerHTML = '<div class="sec-head"><div><h2 class="sec">' + esc(sec.title) + '</h2>' +
          (t2 ? '<p class="unit-note"><a href="#/topic/' + sec.topic + '">' + (n
            ? n + ' task' + (n === 1 ? '' : 's') + ' on this unit'
            : 'No tasks yet') + '</a></p>' : '') +
          '</div></div>' +
          '<div class="ref-list">' + items.map(refItemHtml).join('') + '</div>';
        body.appendChild(s);
      });
      if (!shown) body.appendChild(el('div', 'ref-empty', 'Nothing matches. Try a shorter word.'));
    }

    var timer = null;
    box.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { refFilter.q = box.value; renderRef(); }, 120);
    });
    renderRef();
  }

  function viewSearch(term) {
    markNav('');
    var t = term.toLowerCase().trim();
    var hits = QS.filter(function (q) { return q._search.indexOf(t) > -1; }).slice(0, 60);
    var rhits = refMatches(t).slice(0, 6);
    main.innerHTML = '';
    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">search</p>' +
      '<h1 class="display" style="font-size:clamp(24px,3vw,32px)">' + hits.length +
        (hits.length === 60 ? '+' : '') + ' match' + (hits.length === 1 ? '' : 'es') + ' for &ldquo;' + esc(term) + '&rdquo;</h1>';
    main.appendChild(head);
    if (rhits.length) {
      var rs = el('div', 'sec-head search-ref');
      rs.innerHTML = '<div><h2 class="sec">From the reference</h2></div><a class="srclink" href="#/reference">open the reference</a>';
      main.appendChild(rs);
      var rl = el('div', 'ref-list');
      rl.style.maxWidth = '920px';
      rl.innerHTML = rhits.map(function (m) { return refItemHtml(m.it); }).join('');
      main.appendChild(rl);
    }
    if (!hits.length) {
      if (!rhits.length) main.appendChild(el('div', 'empty', '<b>Nothing found</b><span>Try a formula, a method or a topic name.</span>'));
      return;
    }
    var list = el('div', 'qlist');
    list.style.marginTop = '18px';
    hits.forEach(function (q) { list.appendChild(questionCard(q)); });
    main.appendChild(list);
  }

  /* ---------------- router ---------------- */

  function route() {
    var h = location.hash.replace(/^#/, '') || '/';
    var parts = h.split('/').filter(Boolean);
    window.scrollTo(0, 0);
    // restart the enter animation on every navigation
    main.classList.remove('enter');
    void main.offsetWidth;
    main.classList.add('enter');

    if (!parts.length) return viewHome();
    if (parts[0] === 'topic') return viewTopic(parts[1]);
    if (parts[0] !== 'session') { stopClock(); SESS_KEYS = null; }
    if (parts[0] === 'drill') return viewDrill(parts[1] || 'all');
    if (parts[0] === 'session') return viewSession();
    if (parts[0] === 'practice') return viewPractice(parts[1]);
    if (parts[0] === 'goals' || parts[0] === 'goal') return viewHome();
    if (parts[0] === 'review') return viewReview();
    if (parts[0] === 'papers') return viewPapers();
    if (parts[0] === 'reference') return viewReference();
    if (parts[0] === 'about') return viewAbout();
    if (parts[0] === 'search') return viewSearch(decodeURIComponent(parts.slice(1).join('/')));
    return viewHome();
  }

  /* ---------------- first-run tour ---------------- */

  // Each step points at a real control (a spotlight plus an arrow), except the
  // demo, which is a live question so the marking states can be tried safely.
  var TOUR = [
    { target: '#nav', place: 'right', icon: 'house', title: 'Topics live in the sidebar',
      body: 'The ' + Object.keys(TOPIC).length + ' units of the grade 11 and 12 course, each with the number of tasks in it. Above them: the overview, the practice builder, your review, the exam format and the reference.',
      mobileTarget: '#side-toggle', mobileIcon: 'menu', mobileTitle: 'Topics live behind this button',
      mobileBody: 'It opens the ' + Object.keys(TOPIC).length + ' units of the grade 11 and 12 course, each with the number of tasks in it, plus practice, review, the exam format and the reference.' },
    { target: '#search', mobileTarget: '#search-toggle', icon: 'search', title: 'Search anything',
      body: 'A formula, a method, a topic, a phrase from a mark scheme. Results include the reference entries. Press / to jump here from anywhere.' },
    { demo: true, icon: 'check', title: 'Try one',
      body: 'A task in the style of paper 1. Pick an answer and see how marking looks. Nothing you do here is recorded.' },
    { target: '.tb-link[href="#/review"]', mobileTarget: '.tab-item[href="#/review"]', icon: 'again', title: 'Spaced review',
      body: 'Anything you miss, or get right by guessing, comes back after 1, 3, 7, 16 and 35 days. The badge shows what is due today. Flags live here too.' },
    { target: '.tb-link[href="#/papers"]', mobileTarget: '.tab-item[href="#/papers"]', icon: 'list', title: 'The exam',
      body: 'The three papers, their timings and marks, and what each assessment objective is worth, from the NIS specification.' },
    { target: '.tb-link[href="#/reference"]', icon: 'book', title: 'Reference, the справочник',
      body: 'Formulas, definitions and methods for every unit, in the notation mark schemes use. Press r from anywhere.' },
    { target: '#help-btn', icon: 'help', title: 'Shortcuts, and this tour',
      body: 'a to d answer, enter checks a typed answer, 1 to 3 rate confidence, f flag, arrows move, / search, r reference, ? reopens this tour. It will not appear on its own again.' }
  ];

  var DEMO = {
    tag: 'P1',
    stem: 'Which of these is equal to ⁴√(81x⁸) for x > 0?',
    options: { A: '3x²', B: '9x²', C: '3x⁴', D: '81x²' },
    answer: 'A',
    why: '⁴√81 = 3, and the fourth root of x⁸ is x², so the answer is 3x².'
  };

  function demoHtml() {
    return '<div class="tour-demo">' +
      '<div class="td-head"><span class="q-tag p1">' + DEMO.tag + '</span><span class="q-tag ai">AI</span><span class="pill marks">1 mark</span><span class="pill key">auto marked</span></div>' +
      '<p class="td-stem">' + esc(DEMO.stem) + '</p>' +
      '<div class="opts">' + ['A', 'B', 'C', 'D'].map(function (k) {
        return '<button class="opt" data-pick="' + k + '"><span class="k">' + k + '</span><span>' + esc(DEMO.options[k]) + '</span></button>';
      }).join('') + '</div>' +
      '<p class="td-note">Green is the answer. Red is a wrong pick. Wrong answers go to your review pile.</p>' +
      '<div class="td-badges">' +
        '<span><span class="pill key">auto marked</span> marks itself as soon as you answer</span>' +
        '<span><span class="q-tag ai">AI</span> written by AI to match the specification, not a past paper</span>' +
        '<span><span class="q-tag p2">P2</span> a longer task you mark yourself against the mark scheme</span>' +
      '</div>' +
    '</div>';
  }

  function showTour() {
    if ($('.tour-wrap')) return;
    var opener = document.activeElement;
    var wrap = el('div', 'tour-wrap');
    var back = el('div', 'tour-backdrop');
    var spot = el('div', 'tour-spot');
    var dlg = el('div', 'tour');
    var arrow = el('i', 'tour-arrow');
    dlg.setAttribute('role', 'dialog');
    dlg.setAttribute('aria-modal', 'true');
    dlg.setAttribute('aria-labelledby', 'tour-title');
    wrap.appendChild(back);
    wrap.appendChild(spot);
    wrap.appendChild(dlg);
    var i = 0;

    function close() {
      S.tourSeen = true;
      save();
      document.removeEventListener('keydown', keys, true);
      window.removeEventListener('resize', position);
      wrap.classList.add('out');
      setTimeout(function () { wrap.remove(); }, 200);
      if (opener && opener.focus) opener.focus();
    }

    function stepTarget(s) {
      var sel = narrow.matches && s.mobileTarget ? s.mobileTarget : s.target;
      if (!sel) return null;
      var t = $(sel);
      // a control hidden at this width cannot be pointed at
      if (!t || (t.offsetParent === null && getComputedStyle(t).position !== 'fixed')) return null;
      return t;
    }

    // Puts the spotlight over the target and the card beside it: to the right
    // of tall targets, otherwise below, otherwise above, otherwise centred.
    function position() {
      var s = TOUR[i];
      var t = stepTarget(s);
      var vw = window.innerWidth, vh = window.innerHeight;
      var cw = dlg.offsetWidth, ch = dlg.offsetHeight;
      var m = 14, pad = 6;
      arrow.className = 'tour-arrow';
      if (!t) {
        wrap.classList.remove('spot');
        dlg.style.left = Math.max(12, (vw - cw) / 2) + 'px';
        dlg.style.top = Math.max(12, (vh - ch) / 2) + 'px';
        return;
      }
      var r = t.getBoundingClientRect();
      wrap.classList.add('spot');
      spot.style.left = (r.left - pad) + 'px';
      spot.style.top = (r.top - pad) + 'px';
      spot.style.width = (r.width + pad * 2) + 'px';
      spot.style.height = (r.height + pad * 2) + 'px';

      var left, top;
      if (s.place === 'right' && r.right + m + cw <= vw) {
        left = r.right + m;
        top = Math.min(Math.max(r.top, 12), vh - ch - 12);
        arrow.classList.add('left');
        arrow.style.top = Math.min(Math.max(r.top + r.height / 2 - top - 7, 16), ch - 30) + 'px';
        arrow.style.left = '';
      } else if (r.bottom + m + ch <= vh) {
        top = r.bottom + m;
        left = Math.min(Math.max(r.left + r.width / 2 - cw / 2, 12), vw - cw - 12);
        arrow.classList.add('top');
        arrow.style.left = Math.min(Math.max(r.left + r.width / 2 - left - 7, 16), cw - 30) + 'px';
        arrow.style.top = '';
      } else if (r.top - m - ch >= 0) {
        top = r.top - m - ch;
        left = Math.min(Math.max(r.left + r.width / 2 - cw / 2, 12), vw - cw - 12);
        arrow.classList.add('bottom');
        arrow.style.left = Math.min(Math.max(r.left + r.width / 2 - left - 7, 16), cw - 30) + 'px';
        arrow.style.top = '';
      } else {
        left = Math.max(12, (vw - cw) / 2);
        top = Math.max(12, (vh - ch) / 2);
      }
      dlg.style.left = left + 'px';
      dlg.style.top = top + 'px';
    }

    function render() {
      var s = TOUR[i];
      var last = i === TOUR.length - 1;
      var mobile = narrow.matches;
      dlg.innerHTML =
        '<div class="tour-icon">' + icon(mobile && s.mobileIcon ? s.mobileIcon : s.icon) + '</div>' +
        '<p class="tour-step">' + (i + 1) + ' of ' + TOUR.length + '</p>' +
        '<h2 id="tour-title">' + esc(mobile && s.mobileTitle ? s.mobileTitle : s.title) + '</h2>' +
        '<p>' + esc(mobile && s.mobileBody ? s.mobileBody : s.body) + '</p>' +
        (s.demo ? demoHtml() : '') +
        '<div class="tour-dots" aria-hidden="true">' + TOUR.map(function (_, k) { return '<i class="' + (k === i ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
        '<div class="tour-actions">' +
          '<button class="btn small ghost" data-act="skip">' + (last ? 'Close' : 'Skip') + '</button>' +
          '<span class="spacer"></span>' +
          (i > 0 ? '<button class="btn small" data-act="back">Back</button>' : '') +
          '<button class="btn small primary" data-act="next">' + (last ? 'Start' : 'Next') + '</button>' +
        '</div>';
      dlg.appendChild(arrow);
      position();
      $('[data-act="next"]', dlg).focus({ preventScroll: true });
    }
    function step(d) {
      var n = i + d;
      if (n >= TOUR.length) return close();
      if (n < 0) return;
      i = n;
      render();
    }
    function demoPick(k) {
      var right = k === DEMO.answer;
      Array.prototype.forEach.call(dlg.querySelectorAll('.tour-demo .opt'), function (b) {
        b.disabled = true;
        if (b.dataset.pick === DEMO.answer) b.classList.add('right');
        if (b.dataset.pick === k && !right) b.classList.add('mistake');
      });
      var note = $('.td-note', dlg);
      note.innerHTML = (right ? '<b>Right.</b> ' : '<b>Not this time.</b> ') + esc(DEMO.why) +
        (right ? ' A right answer colours the card green and fills the topic bar.' : ' A wrong answer colours the card red and adds it to your review pile.');
      position();
    }
    dlg.addEventListener('click', function (e) {
      var o = e.target.closest('[data-pick]');
      if (o && !o.disabled) return demoPick(o.dataset.pick);
      var b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'skip') close();
      else if (b.dataset.act === 'back') step(-1);
      else step(1);
    });
    back.addEventListener('click', close);
    spot.addEventListener('click', close);
    function keys(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'Tab') {
        // keep focus inside the dialog
        var f = dlg.querySelectorAll('button:not(:disabled)');
        var first = f[0], lastB = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastB.focus(); }
        else if (!e.shiftKey && document.activeElement === lastB) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', keys, true);
    window.addEventListener('resize', position);
    document.body.appendChild(wrap);
    render();
    // the entrance animation is decoration: once it has had its time, the
    // final state is set outright so nothing depends on it having played
    setTimeout(function () { dlg.style.animation = 'none'; back.style.animation = 'none'; }, 400);
  }

  /* ---------------- boot ---------------- */

  var themeTimer = null;
  function applyTheme(t, animate) {
    var root = document.documentElement;
    if (animate) {
      root.classList.add('theming');
      clearTimeout(themeTimer);
      themeTimer = setTimeout(function () { root.classList.remove('theming'); }, 350);
    }
    root.dataset.theme = t;
    var tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.content = t === 'dark' ? '#0a0c10' : '#ffffff';
    S.theme = t;
    save();
  }

  // On a narrow screen the sidebar is a drawer that never persists; on a wide
  // one it is a column whose collapsed state is remembered.
  var narrow = window.matchMedia('(max-width: 980px)');
  var sideBtn = $('#side-toggle');
  function applySidebar(collapsed) {
    document.body.classList.toggle('side-hidden', collapsed);
    S.sideHidden = collapsed;
    save();
    if (!narrow.matches) sideBtn.setAttribute('aria-expanded', String(!collapsed));
  }
  function setDrawer(open) {
    document.body.classList.toggle('side-open', open);
    sideBtn.setAttribute('aria-expanded', String(open));
    if (open) {
      var on = $('.nav-item.on');
      if (on) on.scrollIntoView({ block: 'center' });
    }
  }
  sideBtn.addEventListener('click', function () {
    if (narrow.matches) setDrawer(!document.body.classList.contains('side-open'));
    else applySidebar(!document.body.classList.contains('side-hidden'));
  });
  $('#side-backdrop').addEventListener('click', function () { setDrawer(false); });
  applySidebar(!!S.sideHidden);
  if (narrow.matches) sideBtn.setAttribute('aria-expanded', 'false');
  (narrow.addEventListener ? narrow.addEventListener.bind(narrow, 'change') : narrow.addListener.bind(narrow))(function () {
    setDrawer(false);
    sideBtn.setAttribute('aria-expanded', String(narrow.matches ? false : !S.sideHidden));
  });

  var searchBtn = $('#search-toggle');
  function setSearch(open) {
    document.body.classList.toggle('search-open', open);
    searchBtn.setAttribute('aria-expanded', String(open));
    if (open) searchBox.focus();
  }
  searchBtn.addEventListener('click', function () {
    setSearch(!document.body.classList.contains('search-open'));
  });

  $('#theme-toggle').addEventListener('click', function () {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });

  $('#reset-btn').addEventListener('click', function () {
    if (!confirm('Clear every answer, note and flag on this device?')) return;
    S = { results: {}, notes: {}, flags: {}, theme: S.theme, sideHidden: S.sideHidden, tourSeen: true, last: null,
      srs: {}, days: {}, goal: S.goal, examDate: S.examDate, session: null, builder: null };
    save();
    refreshChrome();
    route();
    toast('progress cleared');
  });

  // progress lives in this browser only, so a file is the way to carry it to
  // another device or keep it safe
  $('#export-btn').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify({ results: S.results, notes: S.notes, flags: S.flags, srs: S.srs, days: S.days, exported: new Date().toISOString() }, null, 1)],
      { type: 'application/json' });
    var a = el('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'delta-progress.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('progress saved to a file');
  });
  var importFile = $('#import-file');
  $('#import-btn').addEventListener('click', function () { importFile.click(); });
  importFile.addEventListener('change', function () {
    var f = importFile.files[0];
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var v = JSON.parse(reader.result);
        if (!v || typeof v.results !== 'object') throw new Error('shape');
        Object.keys(v.results || {}).forEach(function (k) { S.results[k] = v.results[k]; });
        Object.keys(v.notes || {}).forEach(function (k) { S.notes[k] = v.notes[k]; });
        Object.keys(v.flags || {}).forEach(function (k) { S.flags[k] = v.flags[k]; });
        Object.keys(v.srs || {}).forEach(function (k) { S.srs[k] = v.srs[k]; });
        Object.keys(v.days || {}).forEach(function (k) { S.days[k] = Math.max(S.days[k] || 0, v.days[k]); });
        save();
        refreshChrome();
        route();
        toast('progress imported');
      } catch (e) {
        toast('that file is not a delta export');
      }
    };
    reader.readAsText(f);
    importFile.value = '';
  });

  $('#help-btn').addEventListener('click', showTour);

  var searchBox = $('#search');
  var searchTimer = null;
  searchBox.addEventListener('input', function () {
    clearTimeout(searchTimer);
    var v = searchBox.value.trim();
    searchTimer = setTimeout(function () {
      if (v.length < 2) { if (location.hash.indexOf('#/search') === 0) location.hash = '#/'; return; }
      location.hash = '#/search/' + encodeURIComponent(v);
    }, 260);
  });

  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
    if (e.key === 'Escape') {
      if (e.target === searchBox) {
        searchBox.value = '';
        searchBox.blur();
        setSearch(false);
        if (location.hash.indexOf('#/search') === 0) location.hash = '#/';
      } else if (document.body.classList.contains('side-open')) {
        setDrawer(false);
        sideBtn.focus();
      }
      return;
    }
    if (e.key === '/' && !typing) {
      e.preventDefault();
      if (narrow.matches) setSearch(true); else searchBox.focus();
      return;
    }
    if (typing || $('.tour-wrap')) return;
    if (e.key === '?') { e.preventDefault(); showTour(); return; }
    if (e.key === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey) { location.hash = '#/reference'; return; }
    if (!SESS_KEYS || e.ctrlKey || e.metaKey || e.altKey) return;
    if (/^(BUTTON|A|SUMMARY)$/.test(e.target.tagName) && e.key === 'Enter') return;
    var k = e.key.toLowerCase();
    if ('abcd'.indexOf(k) > -1 && k.length === 1) { e.preventDefault(); SESS_KEYS.pick(k.toUpperCase()); }
    else if ('123'.indexOf(k) > -1 && k.length === 1 && SESS_KEYS.conf) { e.preventDefault(); SESS_KEYS.conf(+k); }
    else if (k === 'f') { e.preventDefault(); SESS_KEYS.flag(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); SESS_KEYS.prev(); }
    else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); SESS_KEYS.next(); }
  });

  // the drawer and the phone search bar close themselves once a link is followed
  window.addEventListener('hashchange', function () {
    setDrawer(false);
    if (location.hash.indexOf('#/search') !== 0) {
      if (document.activeElement !== searchBox) { searchBox.value = ''; setSearch(false); }
    }
  });

  applyTheme(S.theme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  buildNav();
  refreshChrome();
  window.addEventListener('hashchange', route);
  route();
  // The tour shows itself once. It is marked seen the moment it opens, and it
  // never opens on its own where nothing can be remembered (private windows),
  // so it cannot come back on every visit.
  var canRemember = (function () {
    try { localStorage.setItem('delta.probe', '1'); localStorage.removeItem('delta.probe'); return true; }
    catch (e) { return false; }
  })();
  if (!S.tourSeen && canRemember) {
    S.tourSeen = true;
    save();
    setTimeout(showTour, 600);
  }
})();
