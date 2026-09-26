/* Checks every task and the reference. Run from public/delta with JavaScriptCore:
     /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc tools/check.js
   It loads the marking helpers from assets/app.js itself, checks ids, topics, papers,
   that every accepted and shown answer is accepted, that scheme marks add up to the
   task marks, how real typing is marked, and that every unit has a reference section
   and at least 5 tasks. Prints "all checks pass" or a list of problems. */

var window = {};
load('data/topics.js'); window.DELTA_QUESTIONS = []; var DELTA_QUESTIONS = window.DELTA_QUESTIONS;
load('data/tasks/grade11.js'); load('data/tasks/grade12.js'); load('data/reference.js'); load('assets/maths.js');
// the marking helpers, taken from app.js itself so the check tests the real code
var APP = read('assets/app.js');
eval(APP.slice(APP.indexOf('  function isAuto(q)'), APP.indexOf('  function answerShown(q)')));

var T = {}; window.DELTA_UNITS.forEach(function (u) { u.topics.forEach(function (t) { T[t.id] = t; }); });
var Q = window.DELTA_QUESTIONS, ids = {}, bad = [], per = {}, kinds = {};
Q.forEach(function (q) {
  if (ids[q.id]) bad.push('dup ' + q.id); ids[q.id] = 1;
  if (!T[q.topic]) bad.push('topic ' + q.id);
  if ([1, 2, 3].indexOf(q.paper) < 0) bad.push('paper ' + q.id);
  per[q.topic] = (per[q.topic] || 0) + 1; kinds[q.kind] = (kinds[q.kind] || 0) + 1;
  if (!q.why) bad.push('no why ' + q.id);
  if (q.kind === 'short') {
    if (!q.accept || !q.show) bad.push('short fields ' + q.id);
    q.accept.forEach(function (a) { if (!checkShort(q, a)) bad.push('accept fails ' + q.id + ' ' + a); });
    if (q.awrt && !q.accept.some(function (a) { return /^-?\d+\.\d+$/.test(a); })) bad.push('awrt without a decimal key ' + q.id);
  } else if (q.kind === 'mcq') {
    if (!q.options || !q.options[q.answer]) bad.push('mcq ' + q.id);
  } else if (q.kind === 'structured') {
    if (!q.body || !q.scheme) bad.push('structured ' + q.id);
    var m = 0; q.scheme.forEach(function (p) { (p.text.match(/\b[MAB]\d\b/g) || []).forEach(function (c) { m += +c.slice(1); }); });
    if (m !== q.marks) bad.push('marks ' + q.id + ' scheme=' + m + ' marks=' + q.marks);
  } else bad.push('kind ' + q.id);
  if (q.kind !== 'structured' && q.scheme) {
    var m2 = 0; q.scheme.forEach(function (p) { m2 += +p.part.slice(1); });
    if (m2 !== q.marks) bad.push('marks ' + q.id + ' scheme=' + m2 + ' marks=' + q.marks);
  }
});
// how students actually type things
var tries = [
  ['g11-exp-4', 'x = 0 or x = 1', true], ['g11-exp-4', '1, 0', true], ['g11-exp-4', 'x=0;x=1', true], ['g11-exp-4', '0', false],
  ['g11-eq-4', 'pi/6, 5pi/6', true], ['g11-eq-4', '5π/6 and π/6', true], ['g11-eq-4', 'π/6', false],
  ['g11-eq-1', 'x = −1 or x = 4', true], ['g11-calc2-1', '−3', true], ['g11-calc2-1', "f'(2) = -3", true], ['g11-calc2-2', 'f″(4)=1.5', true],
  ['g11-roots-5', '1/2 ≤ x < 5', true], ['g11-roots-5', 'x < 5', false], ['g11-eq-2', '-2 < x < 4', true],
  ['g11-calc3-3', 'e²', true], ['g11-calc3-3', 'e^2', true], ['g11-solid-2', '24 pi', true], ['g11-solid-2', '24', false],
  ['g11-vec-3', '(6, -3, 1)', true], ['g11-vec-3', '6i − 3j + k', true], ['g11-roots-2', 'a¹', true], ['g11-exp-1', 'x = 3 or x = -3', false],
  ['g11-poly-1', 'remainder = 13', true], ['g11-stat-2', '64/5', true], ['g11-calc3-4', '4/3', true],
  ['g12-prob-3', 'P(A|B) = 0.5', true], ['g12-prob-3', 'p(a | b)=1/2', true], ['g12-bp-1', 'P(X = 2) = 0.233', true],
  ['g12-rv-1', 'E(X) = 2.7', true], ['g12-hyp-1', 's² = 2.5', true], ['g12-hyp-1', 's^2=5/2', true],
  ['g12-app-2', 'dr/dt = 1/(2π)', true], ['g12-app-2', '1/(2pi)', true], ['g12-app-4', 'δy ≈ 0.12', true],
  ['g12-app-1', 't = 1 and t = 3', true], ['g12-app-1', '3, 1', true], ['g12-app-1', '1', false],
  ['g12-cx-1', '11 − 2i', true], ['g12-cx-1', 'zw = 11-2i', true], ['g12-cx-1', '11+2i', false],
  ['g12-cx-3', 'arg z = 2pi/3', true], ['g12-cx-3', '-π/3', false], ['g12-bp-7', 'e^-3.5', true], ['g12-bp-7', 'e^(-3.5)', true],
  ['g12-num-2', '[2, 2.25]', true], ['g12-num-2', '2 ≤ x ≤ 2.25', true], ['g12-num-2', '[2, 2.5]', false],
  ['g12-con-3', '(3, 0)', true], ['g12-con-3', '(3; 0)', true], ['g12-ser-4', '1 − x − x²/2', true], ['g12-ser-4', '1-x-0.5x^2', true],
  ['g12-hyp-3', '(51.32, 53.28)', true], ['g12-vol-1', '12 pi', true], ['g12-vol-4', '8π', true], ['g12-de-3', 'y = x', true],
  ['g12-de-1', '3e', true], ['g12-norm-4', 'h = 180.3', true], ['g12-norm-4', '159.7', false],
  // decimal commas, the way most students here write decimals; a set still splits on them
  ['g11-eq-3', '0,5', true], ['g12-hyp-1', 's² = 2,5', true], ['g12-rv-1', '2,7', true], ['g12-bp-7', 'e^-3,5', true],
  ['g12-hyp-3', '(51,32; 53,28)', true], ['g11-roots-5', '[0,5; 5)', true], ['g11-eq-2', '(−2; 4)', true],
  ['g11-exp-4', '0,1', true], ['g11-exp-4', '0,5', false], ['g11-exp-3', '3,4', false],
  // units after the value, as the answers themselves are shown
  ['g11-solid-2', '24π cm²', true], ['g11-solid-2', '24 pi cm^2', true], ['g12-vol-2', '48 cm³', true], ['g12-vol-1', '12π cm3', true],
  ['g12-norm-4', '180.3 cm', true], ['g12-app-2', '0.159 cm/s', true], ['g12-app-1', 't = 1 s and t = 3 s', true],
  // the label printed next to the box, typed back, and phone keyboards
  ['g11-vec-2', 'a · b = 1', true], ['g11-vec-3', 'a × b = (6, −3, 1)', true], ['g11-calc2-1', 'f’(2) = −3', true],
  ['g12-rv-2', 'Var(2X + 5) = 8', true], ['g12-app-4', 'δy ~ 0.12', true], ['g11-exp-4', 'x₁ = 0, x₂ = 1', true],
  // other ways of writing the same number or set
  ['g11-eq-3', '½', true], ['g12-ser-4', '1 − x − ½x²', true], ['g12-rv-1', '2.70', true], ['g12-prob-3', '.5', true],
  ['g11-exp-4', '{0, 1}', true], ['g11-exp-4', 'x = 0 или x = 1', true], ['g11-eq-4', 'pi/6 or 5pi/6', true],
  // awrt tasks take a longer calculator value that rounds to the key, and only those tasks
  ['g12-bp-1', '0.23347', true], ['g12-norm-1', '0.93319', true], ['g12-rv-3', '0.1111', true], ['g11-calc3-4', '1.3333', true],
  ['g12-num-3', '2.09455', true], ['g12-norm-4', '180.2524', true], ['g12-app-2', '0.15915', true], ['g12-prob-5', '0,11574', true],
  ['g12-bp-1', '0.2339', false], ['g12-num-3', '2.0944', false], ['g12-norm-4', '180.24', false], ['g12-rv-1', '2.70001', false],
  // near misses stay wrong
  ['g12-norm-2', '0.774', false], ['g12-app-2', '0.16', false], ['g12-rv-1', '2.74', false], ['g11-exp-3', '3.4', false]
];
// every short answer's own `show` text must be accepted too (units and all)
Q.forEach(function (q) { if (q.kind === 'short' && !checkShort(q, q.show.replace(/ ≈ .*$/, ''))) bad.push('show not accepted ' + q.id + ' "' + q.show + '"'); });
var byId = {}; Q.forEach(function (q) { byId[q.id] = q; });
tries.forEach(function (t) { var got = checkShort(byId[t[0]], t[1]); if (got !== t[2]) bad.push('typing ' + t[0] + ' "' + t[1] + '" -> ' + got); });
// "pi" and "or" count only as words
[['2pi', false, '2π'], ['spin', false, 'spin'], ['x = 1 for n = 2', true, '1forn=2']].forEach(function (t) {
  var got = normAnswer(t[0], t[1]); if (got !== t[2]) bad.push('normAnswer "' + t[0] + '" -> ' + got);
});
var refs = window.DELTA_REFERENCE; refs.forEach(function (r) { if (!T[r.topic]) bad.push('ref topic ' + r.id); });
print('tasks ' + Q.length + ' ' + JSON.stringify(kinds));
print('per topic ' + JSON.stringify(per));
print('reference sections ' + refs.length + ', items ' + refs.reduce(function (n, r) { return n + r.items.length; }, 0));
print('matrix render: ' + window.chem('A = [[2, 1], [5, 3]] and x^{2} + a_{n}'));
print('plain: ' + window.chemPlain('e^{−3.5} and a_{n}'));
var noRef = Object.keys(T).filter(function (id) { return !refs.some(function (r) { return r.topic === id; }); }); if (noRef.length) bad.push('units without reference ' + noRef.join(','));
var few = Object.keys(T).filter(function (id) { return (per[id] || 0) < 5; }); if (few.length) bad.push('units with under 5 tasks ' + few.join(','));
print(bad.length ? 'PROBLEMS:\n' + bad.join('\n') : 'all checks pass');
