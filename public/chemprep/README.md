# chemprep

Topic-sorted practice for the NIS grade 12 chemistry ESA, built from the real past papers.

356 questions pulled out of twelve papers spanning 2014 to 2025, filed under the 25 units of
the Kazakh NIS chemistry syllabus. Pick a topic, see what has actually been asked about it,
and answer it. No build step, no dependencies, no backend.

## What it does

- **Topic browser.** Every question is tagged to a syllabus unit (11.1.4 bonding, 12.3.4 acids
  and bases, and so on), with counts and a mastery bar per topic.
- **Auto marking where the archive has an answer key.** 116 multiple choice questions from
  2021, 2024 and 2025 mark themselves instantly against the official key.
- **Mark schemes inline.** 22 structured questions carry the full official mark scheme, part by
  part, with the mark allocations and the accept/reject guidance, behind a reveal.
- **Examiner commentary.** 33 structured questions carry the examiner's notes on real candidate
  answers graded A, C and E, taken from the OOK example-answer booklets.
- **Self marking everywhere else.** A work pad, a link straight to the right page of the PDF,
  and a marks scale so you score yourself out of the real mark total.
- **A syllabus mode.** All 304 learning objectives from the grade 11 and 12 course calendars,
  ranked by how hard the past papers lean on each one, each linking to the archive questions
  that test it and to written practice with worked solutions.
- **Drills.** Mixed, per topic, or against your review pile. Questions that mark themselves come
  first, unseen before seen. Keyboard: `a` to `d` to answer, `f` to flag, `enter` for next, `/` to search, `esc` to close the search or the menu.
- **A review pile.** Anything you got wrong or flagged collects in one place.
- **Deep links into the source.** Every question knows which PDF and which page it came from.

Progress lives in `localStorage`, so it is per browser and never leaves the machine.

## Running it

Any static server works. There is a dependency-free one included:

```bash
powershell -ExecutionPolicy Bypass -File tools/serve.ps1 -Port 8765
```

Then open <http://localhost:8765>. Opening `index.html` straight off disk also works, because
the data ships as plain `.js` rather than `.json` (no fetch, so no CORS problem).

## Layout

```
index.html          the whole app shell
assets/style.css    warm paper, ink, one clay accent, light and dark; icons are Lucide (MIT)
assets/chem.js      re-inserts the subscripts and superscripts pdftotext throws away
assets/app.js       router, question cards, drills, progress
data/topics.js      the syllabus taxonomy, taken from the yearly course calendars
data/questions.js   the extracted past paper bank      (generated)
data/objectives.js  the 304 learning objectives, ranked (generated)
data/practice.js    the written practice bank          (generated)
practice/*.js       the written practice, one file per group of units (edit these)
tools/*.pl          the extraction pipeline
past_papers/        the source PDFs (gitignored, see below)
```

## The two modes

**Topics** is the past paper archive: real questions, filed under the unit they test. Nothing
in it was written by anyone but the exam board.

**Syllabus** is objective-first. Every learning objective from the course calendars gets a row,
ordered by how heavily the archive tests it, and opening one shows written practice for that
objective alongside the real questions that match it. Written questions are tagged `written`
in plum throughout, and their results are tracked separately, so past paper performance is
never diluted by practice performance.

### Adding written practice

Practice lives in `practice/*.js`, one file per group of units, so batches can be added without
touching anything else. Each entry names the objective it belongs to and carries a worked
solution:

```js
{
  id: 'p-12.3.4.16-2', goal: '12.3.4.16', kind: 'structured', marks: 3,
  stem: '...',
  scheme: ['first marking point [1]', 'second marking point [1]'],
  why: 'the worked solution, explaining the reasoning rather than just the marks'
}
```

Multiple choice entries use `kind: 'mcq'` with `options` and `answer` instead of `scheme`.
`bash tools/rebuild.sh` bundles them into `data/practice.js`; nothing else needs editing,
because the objective page finds its own questions by the `goal` field.

Which objectives are worth writing for next is a question the data answers: the ranking in
`data/objectives.js` counts how many archive questions match each objective's distinctive
vocabulary, so the top of `#/goals` is the highest-yield work.

## How the question bank was built

`pdftotext -layout -enc UTF-8` over every paper, then:

1. `tools/extract_p1.pl` walks the multiple choice papers, tracking question numbers, options
   A to D and the page each one sits on. It skips questions whose options are pictures, and
   repairs the common case where a stem sentence beginning with "A " gets swallowed as option A.
2. `tools/extract_ms1.pl` reads the paper 1 mark schemes. Two layouts show up: one where the
   answer letter sits on the same line as the question number, one where the column is offset
   by two rows. It detects which and zips accordingly.
3. `tools/extract_p23.pl` walks the structured papers, capturing each question with its parts
   and mark total. The extracted totals come to 95 to 100 marks per paper 2 and up to 40 per
   paper 3, which matches the printed maximums, so nothing is missing.
4. `tools/extract_msdocx.pl` reads the mark schemes that ship as .docx. A .docx is a zip, so
   `word/document.xml` unzips out and its paragraphs keep the table's reading order, which the
   PDF schemes do not. The Mark column is full of bare numbers, so a label only counts when it
   carries a part letter.
5. `tools/extract_ook.pl` reads the OOK example-answer booklets. The mark schemes and candidate
   scripts in those are scans, but the examiner commentary is text. The 2021 and 2023 booklets
   label each response A, C or E; the 2024 and 2025 ones just print three comments per part in
   descending order of quality, so the parser handles both shapes.
6. `tools/normalise.pl` repairs what pdftotext mangles: Symbol-font glyphs arrive as private-use
   codepoints (U+F02B for "+", U+F0E0 for the reaction arrow, U+F044 for delta), and Cyrillic
   homoglyphs leak into the English papers, most visibly as the option letters А, В and С.
7. `tools/topics.pl` classifies each question by weighted keyword rules over the syllabus
   vocabulary, scoring stem matches double option matches. Roughly 30 questions the rules could
   not place confidently are assigned by hand in the override table at the top of `build.pl`.
8. `tools/build.pl` joins it all up and emits `data/questions.js`.
9. `tools/extract_goals.pl` pulls the learning objectives out of the course calendars. Those
   are two-column tables, so an objective is its code line plus every following line starting
   in the same column.
10. `tools/rank_goals.pl` scores each objective against the archive. It reduces the objective to
    its distinctive terms, drops anything appearing in more than 12 per cent of questions as too
    generic to be evidence, and counts a question as testing the objective when it carries two
    of those terms including at least one rare one. That ranking is what orders `#/goals`.

To regenerate after adding papers:

```bash
bash tools/rebuild.sh
```

### What the extraction cannot do

pdftotext throws away every image. Questions built on a graph, a mechanism, a spectrum or a
displayed structure survive only as text, so they carry a "has a diagram" badge and a link to
the exact page of the original. Roughly one multiple choice question in eight is in that
category, and most structured questions have at least one diagram somewhere.

Axis labels and table cells from those images land in the sentence stream as number soup
("70 | 600K 700K 60 | 800K 50 | 5 10 15 20 25 30 35 40"). `assets/chem.js` separates that from
the prose by numeric density and folds it away, while protecting anything holding a real
chemical formula, because numbered statements made of formulas look identical to a chart.

Four multiple choice questions were dropped entirely because their options are pictures with no
text at all (2021 q18 and q20, 2024 q2 and q22). Those are the only questions from the English
papers that are not here.

### What is left in the archive

- The `lab/` and `other/` folders are byte-identical copies of the year folders, plus Kazakh and
  Russian translations of papers that are already here in English.
- Paper 1 mark schemes exist for 2021, 2024 and 2025 only. The 2014, 2016, 2018 and 2023
  multiple choice papers have no key in the archive, so those questions are self marked rather
  than given a fabricated answer.
- The Paper 2 and 3 mark schemes that ship as PDF (2021, 2024, 2025) are tables that pdftotext
  scrambles, with answers landing under the wrong part labels. They are linked rather than
  parsed, because a mark scheme that quietly misattributes answers is worse than none.
- The 2018 OOK booklet uses a different structure with no per-question headings, and the 2022
  one is a truncated `.crdownload` download that will not open.

## The PDFs

`past_papers/` is about 111 MB of exam board material and is gitignored. The site degrades
gracefully without it: every question still reads and marks, the "open the paper" links just
404. If you clone this and want the links live, drop the papers back into `past_papers/<year>/`
under the filenames listed in `tools/build.pl`.

Worth thinking about before making the repo public: these are NIS and Cambridge assessment
papers, and republishing them is a different thing from keeping a personal copy.
