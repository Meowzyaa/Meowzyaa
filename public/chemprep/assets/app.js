/* ============================================================
   chemprep : topic-sorted practice over the NIS ESA archive
   ============================================================ */

(function () {
  'use strict';

  var QS = window.CHEMPREP_QUESTIONS || [];
  var UNITS = window.CHEMPREP_UNITS || [];
  var GOALS = window.CHEMPREP_OBJECTIVES || [];
  var PRACTICE = window.CHEMPREP_PRACTICE || [];
  var REF = window.CHEMPREP_REFERENCE || [];

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

  var KEY = 'chemprep.v1';
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
        return v;
      }
    } catch (e) { /* private mode, first run */ }
    return { results: {}, notes: {}, flags: {}, theme: null, last: null, tourSeen: false };
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
  function setResult(id, status, pick) {
    S.results[id] = { s: status, at: Date.now(), pick: pick || null };
    save();
    refreshChrome();
  }

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
  function icon(name) {
    return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
  }

  var CHEVRON = '<span class="q-chev" aria-hidden="true">' + icon('chevron') + '</span>';

  // Renders question text with the flattened chart and table fragments moved
  // into a fold, so the prose reads as prose.
  function questionText(q, src) {
    var split = splitFigureText(src);
    var wrap = el('div');
    wrap.appendChild(el('div', 'q-full', chem(split.prose)));
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

  function wrongQuestions() {
    return QS.filter(function (q) {
      var r = result(q.id);
      return (r && r.s === 'wrong') || S.flags[q.id];
    });
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
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

    var drill = el('a', 'nav-item', icon('zap') + '<span class="ni-name">Mixed drill</span>');
    drill.href = '#/drill/all';
    drill.dataset.route = '/drill/all';
    nav.appendChild(drill);

    var goals = el('a', 'nav-item',
      icon('list') + '<span class="ni-name">Syllabus objectives</span><span class="ni-n">' + GOALS.length + '</span>');
    goals.href = '#/goals';
    goals.dataset.route = '/goals';
    nav.appendChild(goals);

    var ref = el('a', 'nav-item', icon('book') + '<span class="ni-name">Reference</span>');
    ref.href = '#/reference';
    ref.dataset.route = '/reference';
    nav.appendChild(ref);

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

    var w = wrongQuestions().length;
    var badge = $('#review-count');
    badge.textContent = w;
    badge.hidden = w === 0;
  }

  function markNav(route) {
    Array.prototype.forEach.call(document.querySelectorAll('.nav-item'), function (a) {
      a.classList.toggle('on', a.dataset.route === route);
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

  function sourceLinks(q) {
    var wrap = el('div', 'q-actions');
    var src = pdfHref(q.src, q.page);
    if (src) {
      var a = el('a', 'srclink', icon('out') + 'question paper, page ' + q.page);
      a.href = src; a.target = '_blank'; a.rel = 'noopener';
      wrap.appendChild(a);
    }
    if (q.ms) {
      var m = el('a', 'srclink', icon('out') + 'mark scheme');
      m.href = pdfHref(q.ms); m.target = '_blank'; m.rel = 'noopener';
      wrap.appendChild(m);
    }
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
    det.innerHTML = '<summary>Reveal the official mark scheme</summary>' +
      '<div class="scheme-body">' + rows + '</div>';
    return det;
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
    var tags = '<span class="q-tag ' + paperLabel(q) + '">' + q.year + ' p' + q.paper + ' q' + q.n + '</span>';
    var meta = '';
    meta += '<span class="pill marks">' + q.marks + (q.marks === 1 ? ' mark' : ' marks') + '</span>';
    // structured questions nearly always carry a diagram, so the badge only
    // earns its place on multiple choice
    if (q.figure && q.kind !== 'structured') meta += '<span class="pill fig">has a diagram</span>';
    if (q.kind !== 'structured') {
      meta += q.answer ? '<span class="pill key">key</span>' : '<span class="pill nokey">no key</span>';
    }
    if (r) meta += '<span class="pill ' + (r.s === 'correct' ? 'ok' : 'no') + '">' + (r.s === 'correct' ? 'right' : 'wrong') + '</span>';

    head.innerHTML = tags +
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

      if (q.figure && q.kind !== 'structured') {
        inner.appendChild(el('p', 'note warn',
          'This one leans on a diagram or table that does not survive as text. Open the question paper page below to see it.'));
      }

      if (q.kind === 'structured') {
        inner.appendChild(el('p', 'note warn',
          'Structured questions come with diagrams, graphs and tables. Work from the paper page linked below, and use the text here to keep track of the parts.'));
        inner.appendChild(questionText(q, q.body));
        inner.appendChild(workPad(q));
        var sb = schemeBlock(q);
        if (sb) {
          inner.appendChild(el('p', 'note', 'Write your answer first, then reveal the mark scheme and score yourself honestly.'));
          inner.appendChild(sb);
        } else if (q.ms) {
          inner.appendChild(el('p', 'note', 'Write your answer, then open the mark scheme and score yourself honestly. Six marks in ten counts as a pass here.'));
        } else {
          inner.appendChild(el('p', 'note', 'The archive has no mark scheme for this paper, so mark this one against your notes or your teacher.'));
        }
        var eb = examinerBlock(q);
        if (eb) inner.appendChild(eb);
        inner.appendChild(selfMarkRow(q, opts.onAnswer));
      } else {
        inner.appendChild(questionText(q, q.stem));
        var optWrap = el('div', 'opts');
        var current = result(q.id);
        ['A', 'B', 'C', 'D'].forEach(function (k) {
          optWrap.appendChild(optionRow(q, k, current, function (pick) {
            if (q.answer) {
              setResult(q.id, pick === q.answer ? 'correct' : 'wrong', pick);
              rebuild();
              toast(pick === q.answer ? 'correct' : 'the answer is ' + q.answer);
            } else {
              setResult(q.id, 'wrong', pick);
              rebuild();
              toast('no key in the archive, check the paper');
            }
            if (opts.onAnswer) opts.onAnswer();
          }));
        });
        inner.appendChild(optWrap);

        if (!q.answer) {
          inner.appendChild(el('p', 'note',
            'No mark scheme for this paper is in the archive, so nothing is marked automatically here.'));
          inner.appendChild(selfCheckRow(q, opts.onAnswer));
        }
      }

      inner.appendChild(sourceLinks(q));
    }

    function rebuild() {
      built = false;
      inner.innerHTML = '';
      build();
      var rr = result(q.id);
      card.className = 'qcard is-open' + (rr ? ' ' + rr.s : '');
      var m = $('.q-meta', head);
      if (m && rr) {
        var old = $('.pill.ok, .pill.no', m);
        if (old) old.remove();
        m.insertAdjacentHTML('beforeend',
          '<span class="pill ' + (rr.s === 'correct' ? 'ok' : 'no') + '">' + (rr.s === 'correct' ? 'right' : 'wrong') + '</span>');
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
    shown.forEach(function (g) {
      var st = practiceStats(g.code);
      var a = el('a', 'goal-row');
      a.href = '#/goal/' + g.code;
      var t = TOPIC[g.topic];
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
      list.appendChild(a);
    });
    main.appendChild(list);
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
    var years = {};
    QS.forEach(function (q) { years[q.year] = 1; });
    var yearList = Object.keys(years).sort();
    var withKey = QS.filter(function (q) { return q.answer; }).length;
    var withScheme = QS.filter(function (q) { return q.scheme; }).length;
    var withExaminer = QS.filter(function (q) { return q.examiner; }).length;

    var frag = document.createDocumentFragment();

    var hero = el('section', 'hero');
    hero.innerHTML =
      '<div class="hero-in">' +
        '<p class="hero-greet">' + esc(greeting()) + '</p>' +
        '<h1 class="display">Every past paper question,<br>filed under the topic it tests.</h1>' +
        '<p class="lede">' + QS.length + ' real questions pulled out of the NIS grade 12 chemistry papers from ' +
          yearList[0] + ' to ' + yearList[yearList.length - 1] + ', sorted into the ' +
          Object.keys(TOPIC).length + ' units of the syllabus. Pick a topic you are shaky on and work through what has actually been asked.</p>' +
        '<div class="stat-row">' +
          '<div class="stat"><b>' + QS.length + '</b><span>questions</span></div>' +
          '<div class="stat"><b>' + yearList.length + '</b><span>exam years</span></div>' +
          '<div class="stat"><b>' + withKey + '</b><span>auto marked</span></div>' +
          '<div class="stat"><b>' + withScheme + '</b><span>mark schemes</span></div>' +
          '<div class="stat"><b>' + withExaminer + '</b><span>examiner notes</span></div>' +
          '<div class="stat"><b>' + PRACTICE.length + '</b><span>written practice</span></div>' +
          '<div class="stat"><b>' + o.ok + '</b><span>you have right</span></div>' +
        '</div>' +
        '<div class="cta-row">' +
          '<a class="btn primary" href="#/drill/all">' + icon('zap') + 'Start a mixed drill</a>' +
          '<a class="btn" href="#/goals">' + icon('list') + 'Work the syllabus</a>' +
          '<a class="btn" href="#/papers">' + icon('book') + 'Browse the papers</a>' +
        '</div>' +
      '</div>';
    frag.appendChild(hero);

    if (S.last && S.last.hash) {
      var ls = el('div', 'strip soft');
      ls.innerHTML = '<span>Pick up where you left off: <b>' + esc(S.last.label) + '</b></span>';
      var lg = el('a', 'btn small', 'Continue');
      lg.href = S.last.hash;
      ls.appendChild(lg);
      frag.appendChild(ls);
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

    var weak = weakest();
    if (weak.length) {
      var strip = el('div', 'strip');
      strip.innerHTML = '<span>Weakest right now: <b>' +
        weak.map(function (w) { return esc(TOPIC[w.id].name.toLowerCase()); }).join('</b>, <b>') + '</b></span>';
      var go = el('a', 'btn small', 'Drill these');
      go.href = '#/drill/weak';
      strip.appendChild(go);
      frag.appendChild(strip);
    }

    var w = wrongQuestions().length;
    if (w) {
      var s2 = el('div', 'strip');
      s2.innerHTML = '<span><b>' + w + '</b> question' + (w === 1 ? '' : 's') + ' waiting in your review pile</span>';
      var g2 = el('a', 'btn small', 'Review now');
      g2.href = '#/review';
      s2.appendChild(g2);
      frag.appendChild(s2);
    }

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
          '<span class="tc-n">' + st.total + '</span></div>' +
          '<h3 class="tc-name">' + esc(t.name) + '</h3>' +
          '<p class="tc-blurb">' + esc(t.blurb) + '</p>' +
          '<div class="tc-bar"><i class="ok" style="width:' + okPct + '%"></i>' +
          '<i class="no" style="width:' + noPct + '%"></i></div>';
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
    early:     ['Early start. Kettle on, then a drill.', 'Up with the sun. Fresh head, hardest topic first.', 'Morning. The periodic table is already awake.'],
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
    if (n) line += ' ' + n + ' answered today, ' + ok + ' right.';
    return line;
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
      '<p class="h-eyebrow">' + esc(t.code) + ' &middot; ' + all.length + ' questions</p>' +
      '<h1 class="display" style="font-size:clamp(26px,3.4vw,36px)">' + esc(t.name) + '</h1>' +
      '<p class="lede">' + esc(t.blurb) + '</p>';
    main.appendChild(head);

    var cta = el('div', 'cta-row');
    var drillBtn = el('a', 'btn primary', 'Drill this topic');
    drillBtn.href = '#/drill/' + id;
    cta.appendChild(drillBtn);
    cta.appendChild(el('span', 'btn', st.seen + ' of ' + st.total + ' attempted, ' + st.ok + ' right'));
    main.appendChild(cta);

    var years = {};
    all.forEach(function (q) { years[q.year] = 1; });

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
    chipSet('paper', ['all', 1, 2, 3], ['all papers', 'paper 1', 'paper 2', 'paper 3']);
    bar.appendChild(el('span', 'chip-sep'));
    chipSet('state', ['all', 'unseen', 'wrong', 'key'],
      ['everything', 'not tried', 'got wrong', 'auto marked']);
    bar.appendChild(el('span', 'chip-sep'));
    // up to eight years as chips pushed the bar onto three rows, so they live
    // in one control instead
    var ySel = el('select', 'chip' + (filters.year === 'all' ? '' : ' on'));
    ySel.setAttribute('aria-label', 'Filter by exam year');
    ['all'].concat(Object.keys(years).sort()).forEach(function (y) {
      var o = el('option', null, y === 'all' ? 'all years' : y);
      o.value = y;
      if (String(filters.year) === String(y)) o.selected = true;
      ySel.appendChild(o);
    });
    ySel.addEventListener('change', function () {
      filters.year = ySel.value;
      viewTopic(id);
    });
    bar.appendChild(ySel);
    main.appendChild(bar);

    var list = el('div', 'qlist');
    main.appendChild(list);

    function renderList() {
      var shown = all.filter(function (q) {
        if (filters.paper !== 'all' && q.paper !== filters.paper) return false;
        if (filters.year !== 'all' && String(q.year) !== String(filters.year)) return false;
        var r = result(q.id);
        if (filters.state === 'unseen' && r) return false;
        if (filters.state === 'wrong' && !(r && r.s === 'wrong')) return false;
        if (filters.state === 'key' && !q.answer) return false;
        return true;
      });

      list.innerHTML = '';
      if (!shown.length) {
        list.appendChild(el('div', 'empty', '<b>Nothing here</b><span>Loosen the filters and try again.</span>'));
        return;
      }
      shown.sort(function (a, b) { return b.year - a.year || a.paper - b.paper || a.n - b.n; });
      shown.forEach(function (q) { list.appendChild(questionCard(q)); });
    }
    renderList();
  }

  /* ---------------- drill ---------------- */

  var drill = null;

  function viewDrill(scope) {
    markNav('/drill/' + scope);
    var pool;
    var title;

    if (scope === 'all') {
      pool = QS.filter(function (q) { return q.answer; });
      title = 'Mixed drill';
    } else if (scope === 'weak') {
      var ids = weakest().map(function (w) { return w.id; });
      pool = QS.filter(function (q) { return ids.indexOf(q.topic) > -1; });
      title = 'Weak spots';
    } else {
      pool = questionsFor(scope);
      title = TOPIC[scope] ? TOPIC[scope].name : scope;
    }

    if (!pool.length) {
      main.innerHTML = '<div class="empty"><b>No questions to drill</b><span>Try a different topic.</span></div>';
      return;
    }
    remember('#/drill/' + scope, scope === 'all' || scope === 'weak' ? title : title + ' drill');

    // unseen before seen, and inside that, questions that mark themselves come
    // first so the drill keeps giving feedback for as long as it can
    function bucket(q) {
      var seen = result(q.id) ? 4 : 0;
      if (q.kind === 'structured') return seen + 3;
      return seen + (q.answer ? 1 : 2);
    }
    var buckets = {};
    pool.forEach(function (q) {
      var b = bucket(q);
      (buckets[b] = buckets[b] || []).push(q);
    });
    var order = Object.keys(buckets).sort(function (a, b) { return a - b; })
      .reduce(function (acc, k) { return acc.concat(shuffle(buckets[k])); }, []);

    drill = { order: order, i: 0, title: title, right: 0, wrong: 0, done: 0 };
    renderDrill();
  }

  function drillTally() {
    return '<span class="tally"><b class="ok">' + drill.right + ' right</b>' +
      (drill.wrong ? ' <span class="muted">/</span> <b class="no">' + drill.wrong + ' wrong</b>' : '') + '</span>';
  }

  function renderDrill() {
    if (!drill) return;
    if (drill.i >= drill.order.length) return renderDrillEnd();

    var q = drill.order[drill.i];
    drill._pick = null;
    main.innerHTML = '';

    var wrap = el('div', 'drill-wrap');

    var crumb = el('div', 'crumb',
      '<a href="#/">Overview</a> <span>/</span> <span>' + esc(drill.title) + '</span>');
    wrap.appendChild(crumb);

    var bar = el('div', 'drill-bar');
    var pct = Math.round((drill.i / drill.order.length) * 100);
    bar.innerHTML =
      '<span class="mono">' + (drill.i + 1) + ' / ' + drill.order.length + '</span>' +
      '<span class="bar"><i style="width:' + pct + '%"></i></span>' +
      drillTally();
    wrap.appendChild(bar);

    var card = el('div', 'drill-card');

    var kick = el('div', 'drill-kicker');
    kick.innerHTML =
      '<span class="q-tag ' + paperLabel(q) + '">' + q.year + ' p' + q.paper + ' q' + q.n + '</span>' +
      '<span class="pill marks">' + q.marks + (q.marks === 1 ? ' mark' : ' marks') + '</span>' +
      (q.figure && q.kind !== 'structured' ? '<span class="pill fig">has a diagram</span>' : '') +
      '<span class="pill">' + esc(TOPIC[q.topic] ? TOPIC[q.topic].name : q.topic) + '</span>';
    card.appendChild(kick);

    var dSplit = splitFigureText(q.kind === 'structured' ? q.body : q.stem);
    card.appendChild(el('p', 'drill-stem', chem(dSplit.prose)));
    if (dSplit.figure) {
      var dDet = el('details', 'figtext');
      dDet.innerHTML = '<summary>text lifted out of the diagram</summary>' +
        '<div class="figtext-body">' + chem(dSplit.figure) + '</div>';
      card.appendChild(dDet);
    }

    if (q.figure) {
      card.appendChild(el('p', 'note warn', q.kind === 'structured'
        ? 'Work this one from the paper page below, where the diagrams and tables are.'
        : 'Part of this question is a diagram. Open the paper page to see it.'));
    }

    var foot = el('div', 'drill-foot');

    if (q.kind === 'structured') {
      card.appendChild(workPad(q));
      var dsb = schemeBlock(q);
      if (dsb) card.appendChild(dsb);
      var deb = examinerBlock(q);
      if (deb) card.appendChild(deb);
      card.appendChild(selfMarkRow(q, function () {
        var rr = result(q.id);
        if (rr && rr.s === 'correct') drill.right++; else drill.wrong++;
        drill.done++;
        advance(true);
      }));
    } else {
      var optWrap = el('div', 'opts');
      var answered = false;
      ['A', 'B', 'C', 'D'].forEach(function (k) {
        var b = el('button', 'opt');
        b.dataset.key = k;
        b.innerHTML = '<span class="k">' + k + '</span><span>' + chem(q.options[k]) + '</span>';
        b.addEventListener('click', function () { pick(k); });
        optWrap.appendChild(b);
      });
      card.appendChild(optWrap);

      function pick(k) {
        if (answered) return;
        answered = true;
        var right = q.answer && k === q.answer;
        Array.prototype.forEach.call(optWrap.children, function (b) {
          b.disabled = true;
          if (q.answer && b.dataset.key === q.answer) b.classList.add('right');
          if (b.dataset.key === k && !right) b.classList.add(q.answer ? 'mistake' : 'picked');
        });
        if (q.answer) {
          setResult(q.id, right ? 'correct' : 'wrong', k);
          if (right) drill.right++; else drill.wrong++;
          foot.insertBefore(el('span', 'verdict ' + (right ? 'ok' : 'no'),
            right ? 'Right.' : 'Not this time.'), foot.firstChild);
        } else {
          foot.insertBefore(el('span', 'verdict', 'No key on file.'), foot.firstChild);
        }
        drill.done++;
        var tallyEl = $('.tally', bar);
        if (tallyEl) tallyEl.outerHTML = drillTally();
        nextBtn.classList.add('primary');
        nextBtn.focus();
      }
      drill._pick = pick;
    }

    // a question worth coming back to should be one press away, mid-drill
    var flagBtn = el('button', 'btn small', icon('flag') + (S.flags[q.id] ? 'flagged' : 'flag'));
    flagBtn.setAttribute('aria-pressed', String(!!S.flags[q.id]));
    function toggleFlag() {
      if (S.flags[q.id]) delete S.flags[q.id]; else S.flags[q.id] = true;
      flagBtn.innerHTML = icon('flag') + (S.flags[q.id] ? 'flagged' : 'flag');
      flagBtn.setAttribute('aria-pressed', String(!!S.flags[q.id]));
      toast(S.flags[q.id] ? 'added to your review pile' : 'flag removed');
      save(); refreshChrome();
    }
    flagBtn.addEventListener('click', toggleFlag);
    drill._flag = toggleFlag;

    var src = pdfHref(q.src, q.page);
    if (src) {
      var a = el('a', 'srclink', icon('out') + 'page ' + q.page + ' of the paper');
      a.href = src; a.target = '_blank'; a.rel = 'noopener';
      foot.appendChild(a);
    }
    if (q.ms) {
      var m = el('a', 'srclink', icon('out') + 'mark scheme');
      m.href = pdfHref(q.ms); m.target = '_blank'; m.rel = 'noopener';
      foot.appendChild(m);
    }
    foot.appendChild(el('span', 'spacer'));
    foot.appendChild(el('span', 'kbd-hint',
      (q.kind === 'structured' ? '' : '<kbd>a</kbd> to <kbd>d</kbd> answer, ') +
      '<kbd>f</kbd> flag, <kbd>enter</kbd> next'));
    foot.appendChild(flagBtn);

    var nextBtn = el('button', 'btn', drill.i === drill.order.length - 1 ? 'Finish' : 'Next');
    nextBtn.addEventListener('click', function () { advance(false); });
    foot.appendChild(nextBtn);

    card.appendChild(foot);
    wrap.appendChild(card);
    main.appendChild(wrap);
    // take focus off the button that was just pressed, without scrolling the
    // drawer or the topbar out of view on a phone
    main.focus({ preventScroll: true });

    function advance() {
      drill.i++;
      renderDrill();
    }
    drill._advance = advance;
  }

  function renderDrillEnd() {
    var pct = drill.done ? Math.round((drill.right / drill.done) * 100) : 0;
    main.innerHTML = '';
    var wrap = el('div', 'drill-wrap');
    var card = el('div', 'drill-card');
    card.innerHTML =
      '<p class="h-eyebrow">' + esc(drill.title) + '</p>' +
      '<h1 class="display" style="font-size:32px">' + drill.right + ' out of ' + drill.done + '</h1>' +
      '<p class="lede">' + (pct >= 80
        ? 'Solid. Move on to a topic you have not touched yet.'
        : pct >= 55
          ? 'Middling. The ones you missed are sitting in your review pile.'
          : 'Rough round. Read the mark schemes for the ones you missed before drilling again.') + '</p>';
    var row = el('div', 'cta-row');
    var again = el('button', 'btn primary', icon('again') + 'Go again');
    again.addEventListener('click', function () { viewDrill(location.hash.split('/')[2] || 'all'); });
    row.appendChild(again);
    var rev = el('a', 'btn', 'Review what you missed');
    rev.href = '#/review';
    row.appendChild(rev);
    var home = el('a', 'btn', 'Back to topics');
    home.href = '#/';
    row.appendChild(home);
    card.appendChild(row);
    wrap.appendChild(card);
    main.appendChild(wrap);
    drill = null;
  }

  /* ---------------- review + papers ---------------- */

  function viewReview() {
    markNav('/review');
    var qs = wrongQuestions();
    main.innerHTML = '';
    main.appendChild(el('div', 'crumb', '<a href="#/">Overview</a> <span>/</span> <span>Review</span>'));
    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">wrong answers and flags</p>' +
      '<h1 class="display" style="font-size:clamp(26px,3.4vw,36px)">Your review pile</h1>' +
      '<p class="lede">Everything you got wrong or flagged, newest first. Clearing this list is the whole game.</p>';
    main.appendChild(head);

    if (!qs.length) {
      main.appendChild(el('div', 'empty', icon('inbox') + '<b>Empty pile</b><span>Nothing wrong and nothing flagged.</span>'));
      return;
    }

    var cta = el('div', 'cta-row');
    var d = el('a', 'btn primary', 'Drill the pile');
    d.href = '#/drill/review';
    cta.appendChild(d);
    main.appendChild(cta);

    qs.sort(function (a, b) {
      var ra = result(a.id), rb = result(b.id);
      return (rb ? rb.at : 0) - (ra ? ra.at : 0);
    });
    var list = el('div', 'qlist');
    list.style.marginTop = '18px';
    qs.forEach(function (q) { list.appendChild(questionCard(q)); });
    main.appendChild(list);
  }

  function viewPapers() {
    markNav('/papers');
    var byPaper = {};
    QS.forEach(function (q) {
      var k = q.year + '|' + q.paper;
      if (!byPaper[k]) byPaper[k] = { year: q.year, paper: q.paper, n: 0, marks: 0, src: q.src, ms: q.ms };
      byPaper[k].n++;
      byPaper[k].marks += q.marks;
    });
    var rows = Object.keys(byPaper).map(function (k) { return byPaper[k]; });
    rows.sort(function (a, b) { return b.year - a.year || a.paper - b.paper; });

    main.innerHTML = '';
    main.appendChild(el('div', 'crumb', '<a href="#/">Overview</a> <span>/</span> <span>Papers</span>'));
    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">the archive</p>' +
      '<h1 class="display" style="font-size:clamp(26px,3.4vw,36px)">Papers this is built from</h1>' +
      '<p class="lede">Paper 1 is multiple choice, paper 2 is the long structured paper, paper 3 is practical. ' +
      'Links open the original PDFs from the folder next to this page.</p>';
    main.appendChild(head);

    var t = el('table', 'paper-table');
    t.innerHTML = '<thead><tr><th>Year</th><th>Paper</th><th>Questions here</th><th>Marks</th><th>Mark scheme</th><th></th></tr></thead>';
    var tb = el('tbody');
    rows.forEach(function (r) {
      var tr = el('tr');
      var q = pdfHref(r.src);
      tr.innerHTML =
        '<td class="yr">' + r.year + '</td>' +
        '<td><span class="q-tag p' + r.paper + '">paper ' + r.paper + '</span></td>' +
        '<td class="mono">' + r.n + '</td>' +
        '<td class="mono">' + r.marks + '</td>' +
        '<td>' + (r.ms
          ? '<a class="srclink" target="_blank" rel="noopener" href="' + pdfHref(r.ms) + '">' + icon('out') + 'mark scheme</a>'
          : '<span class="muted">not in archive</span>') + '</td>' +
        '<td>' + (q ? '<a class="srclink" target="_blank" rel="noopener" href="' + q + '">' + icon('out') + 'question paper</a>' : '') + '</td>';
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    main.appendChild(t);
  }

  /* ---------------- reference ---------------- */

  var refFilter = { area: 'all', q: '' };

  function refItemHtml(it) {
    return '<div class="ref-item"><b class="ref-term">' + esc(it.t) + '</b><div class="ref-body">' +
      (it.f ? '<code class="ref-f">' + esc(it.f) + '</code>' : '') +
      '<p>' + esc(it.d) + '</p></div></div>';
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
      '<p class="lede">The formulae, definitions and observations the papers keep asking for, in the wording the mark schemes want. ' +
      'The ion and gas tests are transcribed from the official data booklet.</p>';
    main.appendChild(head);

    var tools = el('div', 'ref-tools');
    var box = el('input', 'ref-search');
    box.type = 'search';
    box.placeholder = 'Filter: Hess, buffer, precipitate, iodoform';
    box.value = refFilter.q;
    box.setAttribute('aria-label', 'Filter the reference');
    tools.appendChild(box);
    var areas = [['all', 'everything'], ['physical', 'physical'], ['inorganic', 'inorganic'], ['organic', 'organic'], ['analysis', 'analysis']];
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
          (t2 ? '<p class="unit-note"><a href="#/topic/' + sec.topic + '">' + n + ' question' + (n === 1 ? '' : 's') + ' on this in the archive</a></p>' : '') +
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
      if (!rhits.length) main.appendChild(el('div', 'empty', '<b>Nothing found</b><span>Try a formula, a reagent or a topic name.</span>'));
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
    if (parts[0] === 'drill') {
      if (parts[1] === 'review') {
        var qs = wrongQuestions();
        if (!qs.length) return viewReview();
        drill = { order: shuffle(qs), i: 0, title: 'Review pile', right: 0, wrong: 0, done: 0 };
        markNav('/review');
        return renderDrill();
      }
      return viewDrill(parts[1] || 'all');
    }
    if (parts[0] === 'goals') return viewGoals();
    if (parts[0] === 'goal') return viewGoal(parts.slice(1).join('/'));
    if (parts[0] === 'review') return viewReview();
    if (parts[0] === 'papers') return viewPapers();
    if (parts[0] === 'reference') return viewReference();
    if (parts[0] === 'search') return viewSearch(decodeURIComponent(parts.slice(1).join('/')));
    return viewHome();
  }

  /* ---------------- first-run tour ---------------- */

  // Each step points at a real control (a spotlight plus an arrow), except the
  // demo, which is a live question so the marking states can be tried safely.
  var TOUR = [
    { target: '#nav', place: 'right', icon: 'house', title: 'Topics live in the sidebar',
      body: 'The 25 units of the syllabus, each with the number of past paper questions filed under it. Above them: the overview, a mixed drill that picks questions for you, the syllabus objectives and the reference.',
      mobileTarget: '#side-toggle', mobileIcon: 'menu', mobileTitle: 'Topics live behind this button',
      mobileBody: 'It opens the 25 units of the syllabus, each with the number of past paper questions filed under it, plus the mixed drill, the syllabus objectives and the reference.' },
    { target: '#search', mobileTarget: '#search-toggle', icon: 'search', title: 'Search anything',
      body: 'A formula, a reagent, a topic, a phrase from a mark scheme. Results include the reference entries. Press / to jump here from anywhere.' },
    { demo: true, icon: 'check', title: 'Try one',
      body: 'A real question from the 2024 paper. Pick an answer and see how marking looks. Nothing you do here is recorded.' },
    { target: '.tb-link[href="#/review"]', icon: 'flag', title: 'The review pile',
      body: 'Everything you get wrong or flag lands here, newest first, and you can drill just the pile. Clearing it is the whole game.' },
    { target: '.tb-link[href="#/goals"]', icon: 'list', title: 'Syllabus objectives',
      body: 'All 304 learning objectives from the course calendars, ranked by how often the papers test them, each with written practice and the archive questions that match it.',
      mobileBody: 'All 304 learning objectives from the course calendars, ranked by how often the papers test them, each with written practice and the archive questions that match it. On a phone it sits near the top of the menu.' },
    { target: '.tb-link[href="#/reference"]', icon: 'book', title: 'Reference, the справочник',
      body: 'Formulae, definitions, colour changes and the data booklet ion tests, in the wording mark schemes want. Press r from anywhere.' },
    { target: '#help-btn', icon: 'help', title: 'Shortcuts, and this tour',
      body: 'a to d answer, f flag, enter next, / search, r reference, ? reopens this tour. It will not appear on its own again.' }
  ];

  var DEMO = {
    tag: '2024 p1 q9',
    stem: 'There are four isomeric alcohols with the molecular formula C₄H₁₀O. One isomer, alcohol Q, does not react with acidified potassium dichromate(VI) solution. Name the alcohol Q.',
    options: { A: 'butan-1-ol', B: 'butan-2-ol', C: '2-methylpropan-1-ol', D: '2-methylpropan-2-ol' },
    answer: 'D',
    why: 'Q is a tertiary alcohol: the carbon carrying the OH has no hydrogen, so dichromate cannot oxidise it and stays orange.'
  };

  function demoHtml() {
    return '<div class="tour-demo">' +
      '<div class="td-head"><span class="q-tag p1">' + DEMO.tag + '</span><span class="pill marks">1 mark</span><span class="pill key">key</span></div>' +
      '<p class="td-stem">' + esc(DEMO.stem) + '</p>' +
      '<div class="opts">' + ['A', 'B', 'C', 'D'].map(function (k) {
        return '<button class="opt" data-pick="' + k + '"><span class="k">' + k + '</span><span>' + esc(DEMO.options[k]) + '</span></button>';
      }).join('') + '</div>' +
      '<p class="td-note">Green is the answer. Red is a wrong pick. Wrong answers go to your review pile.</p>' +
      '<div class="td-badges">' +
        '<span><span class="pill key">key</span> marks itself as soon as you answer</span>' +
        '<span><span class="pill nokey">no key</span> older paper, check the paper and mark yourself</span>' +
        '<span><span class="pill fig">has a diagram</span> open the paper page linked under the question</span>' +
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
    S = { results: {}, notes: {}, flags: {}, theme: S.theme, sideHidden: S.sideHidden, tourSeen: true, last: null };
    save();
    refreshChrome();
    route();
    toast('progress cleared');
  });

  // progress lives in this browser only, so a file is the way to carry it to
  // another device or keep it safe
  $('#export-btn').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify({ results: S.results, notes: S.notes, flags: S.flags, exported: new Date().toISOString() }, null, 1)],
      { type: 'application/json' });
    var a = el('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'chemprep-progress.json';
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
        save();
        refreshChrome();
        route();
        toast('progress imported');
      } catch (e) {
        toast('that file is not a chemprep export');
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
    if (!drill) return;
    var k = e.key.toLowerCase();
    if ('abcd'.indexOf(k) > -1 && drill._pick) { e.preventDefault(); drill._pick(k.toUpperCase()); }
    else if (k === 'f' && drill._flag) { e.preventDefault(); drill._flag(); }
    else if (e.key === 'Enter' && drill._advance) { e.preventDefault(); drill._advance(); }
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
    try { localStorage.setItem('chemprep.probe', '1'); localStorage.removeItem('chemprep.probe'); return true; }
    catch (e) { return false; }
  })();
  if (!S.tourSeen && canRemember) {
    S.tourSeen = true;
    save();
    setTimeout(showTour, 600);
  }
})();
