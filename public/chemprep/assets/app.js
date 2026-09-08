/* ============================================================
   chemprep : topic-sorted practice over the NIS ESA archive
   ============================================================ */

(function () {
  'use strict';

  var QS = window.CHEMPREP_QUESTIONS || [];
  var UNITS = window.CHEMPREP_UNITS || [];
  var GOALS = window.CHEMPREP_OBJECTIVES || [];
  var PRACTICE = window.CHEMPREP_PRACTICE || [];

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
        return v;
      }
    } catch (e) { /* private mode, first run */ }
    return { results: {}, notes: {}, flags: {}, theme: null, last: null };
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

  var CHEVRON = '<span class="q-chev" aria-hidden="true">' +
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>';

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

    var home = el('a', 'nav-item', '<span class="ni-name">Overview</span>');
    home.href = '#/';
    home.dataset.route = '/';
    nav.appendChild(home);

    var drill = el('a', 'nav-item', '<span class="ni-name">Mixed drill</span>');
    drill.href = '#/drill/all';
    drill.dataset.route = '/drill/all';
    nav.appendChild(drill);

    var goals = el('a', 'nav-item',
      '<span class="ni-name">Syllabus objectives</span><span class="ni-n">' + GOALS.length + '</span>');
    goals.href = '#/goals';
    goals.dataset.route = '/goals';
    nav.appendChild(goals);

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
      var a = el('a', 'srclink', '&#8599; question paper, page ' + q.page);
      a.href = src; a.target = '_blank'; a.rel = 'noopener';
      wrap.appendChild(a);
    }
    if (q.ms) {
      var m = el('a', 'srclink', '&#8599; mark scheme');
      m.href = pdfHref(q.ms); m.target = '_blank'; m.rel = 'noopener';
      wrap.appendChild(m);
    }
    wrap.appendChild(el('span', 'spacer'));

    var flag = el('button', 'btn small', S.flags[q.id] ? 'flagged' : 'flag for later');
    flag.addEventListener('click', function () {
      if (S.flags[q.id]) delete S.flags[q.id]; else S.flags[q.id] = true;
      flag.textContent = S.flags[q.id] ? 'flagged' : 'flag for later';
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
    body.hidden = true;
    var inner = el('div', 'q-body-in');
    body.appendChild(inner);
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
      var open = body.hidden;
      if (open) build();
      body.hidden = !open;
      card.classList.toggle('is-open', open);
      head.setAttribute('aria-expanded', String(open));
    });

    if (opts.open) {
      build(); body.hidden = false; card.classList.add('is-open');
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
    body.hidden = true;
    var inner = el('div', 'q-body-in');
    body.appendChild(inner);
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
      var open = body.hidden;
      if (open) build();
      body.hidden = !open;
      card.classList.toggle('is-open', open);
      head.setAttribute('aria-expanded', String(open));
    });
    if (opts.open) {
      build(); body.hidden = false; card.classList.add('is-open');
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
        '<p class="h-eyebrow">external summative assessment</p>' +
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
          '<a class="btn primary" href="#/drill/all">Start a mixed drill</a>' +
          '<a class="btn" href="#/goals">Work the syllabus</a>' +
          '<a class="btn" href="#/papers">Browse the papers</a>' +
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
    var flagBtn = el('button', 'btn small', S.flags[q.id] ? 'flagged' : 'flag');
    flagBtn.setAttribute('aria-pressed', String(!!S.flags[q.id]));
    function toggleFlag() {
      if (S.flags[q.id]) delete S.flags[q.id]; else S.flags[q.id] = true;
      flagBtn.textContent = S.flags[q.id] ? 'flagged' : 'flag';
      flagBtn.setAttribute('aria-pressed', String(!!S.flags[q.id]));
      toast(S.flags[q.id] ? 'added to your review pile' : 'flag removed');
      save(); refreshChrome();
    }
    flagBtn.addEventListener('click', toggleFlag);
    drill._flag = toggleFlag;

    var src = pdfHref(q.src, q.page);
    if (src) {
      var a = el('a', 'srclink', '&#8599; page ' + q.page + ' of the paper');
      a.href = src; a.target = '_blank'; a.rel = 'noopener';
      foot.appendChild(a);
    }
    if (q.ms) {
      var m = el('a', 'srclink', '&#8599; mark scheme');
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
    var again = el('button', 'btn primary', 'Go again');
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
      main.appendChild(el('div', 'empty', '<b>Empty pile</b><span>Nothing wrong and nothing flagged.</span>'));
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
          ? '<a class="srclink" target="_blank" rel="noopener" href="' + pdfHref(r.ms) + '">&#8599; open</a>'
          : '<span class="muted">not in archive</span>') + '</td>' +
        '<td>' + (q ? '<a class="srclink" target="_blank" rel="noopener" href="' + q + '">&#8599; question paper</a>' : '') + '</td>';
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    main.appendChild(t);
  }

  function viewSearch(term) {
    markNav('');
    var t = term.toLowerCase().trim();
    var hits = QS.filter(function (q) { return q._search.indexOf(t) > -1; }).slice(0, 60);
    main.innerHTML = '';
    var head = el('header');
    head.innerHTML =
      '<p class="h-eyebrow">search</p>' +
      '<h1 class="display" style="font-size:clamp(24px,3vw,32px)">' + hits.length +
        (hits.length === 60 ? '+' : '') + ' match' + (hits.length === 1 ? '' : 'es') + ' for &ldquo;' + esc(term) + '&rdquo;</h1>';
    main.appendChild(head);
    if (!hits.length) {
      main.appendChild(el('div', 'empty', '<b>Nothing found</b><span>Try a formula, a reagent or a topic name.</span>'));
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
    if (parts[0] === 'search') return viewSearch(decodeURIComponent(parts.slice(1).join('/')));
    return viewHome();
  }

  /* ---------------- boot ---------------- */

  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
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
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  $('#reset-btn').addEventListener('click', function () {
    if (!confirm('Clear every answer, note and flag on this device?')) return;
    S = { results: {}, notes: {}, flags: {}, theme: S.theme, sideHidden: S.sideHidden };
    save();
    refreshChrome();
    route();
    toast('progress cleared');
  });

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
    if (typing) return;
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
})();
