# delta

Topic-sorted practice for the NIS grade 12 mathematics ESA. The maths sibling of
[chemprep](../chemprep/README.md), built on the same engine: topic browser, practice builder,
tutor and exam modes, spaced review, a Today dashboard and a reference.

## The tasks are AI-generated

There is no public archive of NIS maths past papers, so every task here was written by an AI
model to follow the NIS specification for the grade 12 mathematics external summative
assessment and the grade 11 and 12 course plans. The site says so on the home page, on the
About page and with an **AI** tag on every task. They are not past papers, not from NIS and
not checked by a teacher. The answers were worked through and checked, but mistakes are
possible, which is why every task has a report link.

## What it covers

- **Units** of the NIS mathematics course (10-hour programme) in `data/topics.js`, grouped
  into algebra, calculus, geometry and statistics. The 10 grade 11 units follow the grade 11
  long-term plan and keep its codes (11.1A …). The 12 grade 12 units follow the order the
  grade 12 course teaches its topics, and are coded by grade and term (12.1 = term 1) until
  they are matched to the official grade 12 plan.
- **Tasks** in the style of the three papers, tagged P1, P2 or P3:
  - P1: 80 minutes, 25–30 short questions, no calculator, 60 marks.
  - P2: 120 minutes, about 12 longer questions, calculator, 90 marks.
  - P3: 120 minutes, about 10 questions in a real context, calculator, 80 marks.
- **Marking.** Short answers are typed and checked against a list of accepted forms; multiple
  choice marks itself; longer tasks are self marked against a mark scheme in the exam's
  M1 / A1 / B1 style. Every task has a worked solution.
- **The exam page** (`#/papers`) sets out the three papers and the assessment objectives
  (AO1 techniques 80, AO2 applying 75, AO3 reasoning 75 marks) from the specification.
- **The reference** (`data/reference.js`): formulas, definitions and methods for every unit.

## Layout

```
index.html          the app shell (loads each data/tasks/*.js file)
assets/app.js       chemprep's engine, adapted: typed answers, P1-P3 tags, the exam page
assets/maths.js     formats task text: x^{n}, a_{n} and [[1, 2], [3, 4]] matrices
assets/style.css    chemprep's styles plus the AI tag, matrices and the answer box
data/topics.js      the units
data/tasks/*.js     the tasks: grade11.js and grade12.js
data/reference.js   the reference
tools/check.js      checks every task and the reference (see the top of the file)
```

## Adding tasks

Add objects to a file in `data/tasks/` (a new file needs a `<script>` line in `index.html`):

```js
{
  id: 'g11-exp-2', topic: 'exp-log', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'Solve 2^{x+1} = 32.',
  label: 'x =', accept: ['4'], show: 'x = 4',
  scheme: [{ part: 'M1', text: '32 = 2⁵, so x + 1 = 5' }, { part: 'A1', text: 'x = 4' }],
  why: 'The worked solution.'
}
```

- `kind: 'short'`: `accept` lists every accepted form. Answers are compared after removing
  spaces, a leading label such as `x =`, and differences like `−` or `-`, `≤` or `<=`, `pi` or
  `π`, `²` or `^2`. Add `set: true` for several values in any order ("x = 0 or x = 1").
- `kind: 'mcq'`: `options` A to D and the `answer` letter. Build the wrong options from real
  mistakes.
- `kind: 'structured'`: `body` with the parts and their marks in brackets, and a `scheme` whose
  codes add up to `marks`.

Progress is stored in `localStorage` under `delta.v1`, separate from chemprep's.

After changing tasks, run `tools/check.js` with JavaScriptCore's `jsc` from this folder
(there is no node on the machine this was built on). It should print `all checks pass`.
