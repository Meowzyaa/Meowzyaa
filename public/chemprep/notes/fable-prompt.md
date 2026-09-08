# Prompt for a fresh Fable 5.1 session

Open a terminal at `C:\projects\chemprep`, start Claude Code, switch the model to Fable 5.1
(`/model claude-fable-5-1`), and paste everything below the line.

---

You are working on **chemprep**, a static revision site for the NIS Grade 12 chemistry ESA
(external summative assessment) in Kazakhstan. It is built for one real student sitting the real
exam, so correctness matters more than cleverness. The repo is at `C:\projects\chemprep`.

## What already exists

Read `README.md` first, then `assets/app.js`, `assets/chem.js` and `assets/style.css`. In short:

- **356 real past paper questions**, extracted from 19 NIS papers spanning 2014 to 2025 and filed
  under the 25 units of the syllabus. 116 mark themselves against official answer keys; 22 carry
  the full official mark scheme inline; 33 carry examiner commentary on real graded candidate
  answers.
- **304 syllabus learning objectives**, extracted verbatim from the grade 11 and 12 course
  calendars and ranked by how heavily the archive tests each one.
- **63 written practice questions** covering the top 32 objectives, each with a mark scheme and a
  worked solution.
- Two modes: `#/topic/<id>` for the past paper archive, `#/goals` for the objective checklist.
  Progress, notes and flags live in `localStorage` under `chemprep.v1`.
- A Perl extraction pipeline in `tools/`, driven by `bash tools/rebuild.sh`, which regenerates
  `data/questions.js`, `data/objectives.js` and `data/practice.js` from the PDFs.

Run it with `powershell -ExecutionPolicy Bypass -File tools/serve.ps1 -Port 8765` and open
<http://localhost:8765>.

## Hard constraints, learned the hard way

- **No node, no npm, no working python** on this machine. Available: Perl 5, `pdftotext`
  (poppler), `unzip`, PowerShell, Git Bash. Do not introduce a toolchain that needs any of the
  missing ones.
- **No build step for the app.** `index.html` loads plain scripts. Data ships as `.js` assigning
  to `window.*` rather than `.json`, so the site also works when opened straight off disk with no
  server. Keep it that way.
- **`perl -i` silently fails to write on this machine.** Pipe to a temp file and `mv` instead.
- **No em dashes anywhere in user-facing copy.** Use commas, colons or parentheses.
- **`past_papers/` is gitignored** (111 MB of exam board PDFs). Everything must still work when
  it is absent; only the "open the paper" links go dead.
- Design language: warm paper (`#faf7f2`), ink (`#1c1a17`), clay orange (`#c2603f`), muted sage,
  sky, plum and sand accents. Fraunces for display, Inter for UI, JetBrains Mono for data. Light
  and dark both fully supported. It should not look like a generic dashboard template.

## Rules you must not break

1. **Never invent an exam answer or a mark scheme.** Where the archive has no official key, the
   question stays self-marked and the UI says so plainly. A confidently wrong answer is worse
   than no answer, because the student will trust it.
2. **Never blur real past paper questions with written practice.** Real questions carry their
   year and paper tag; written ones carry the plum `written` tag, live under `practice/*.js`, and
   their results are tracked separately so archive performance is never diluted.
3. **Every chemistry claim must be correct at A level / NIS Grade 12 standard.** If you are not
   certain of a value, a mechanism or a colour change, leave it out rather than guess.
4. Match the surrounding code style. Comments explain why, never what.

## What to work on

Pick from these, highest value first. Tell me which you are taking before you start, and do one
properly rather than three partially.

**1. Draw the missing diagrams.** This is the biggest weakness by far. `pdftotext` discards every
image, so 126 of the 356 questions reference a graph, mechanism, spectrum, apparatus diagram or
displayed structure that simply is not there; those questions carry a "has a diagram" badge and a
link to the PDF page instead. Hand-author inline SVG for the highest-value ones (start with the
auto-marked Paper 1 questions, where everything else about the question already works), keyed by
question id in a new `figures/` directory bundled the same way `practice/` is. They must be
theme-aware (use `currentColor` and CSS variables, never hardcoded black), readable at mobile
width, and chemically faithful to the original: check the source PDF page before drawing. Getting
even 40 of these right would unlock a large slice of the archive.

**2. A timed exam mode.** The archive knows every question's paper, year and marks. Assemble a
real Paper 1 (40 marks, 1 hour) or a Paper 2 subset, run a countdown, block the answers until
submission, then produce a breakdown by topic showing which units cost the marks. Mark schemes
already exist for the papers that have them.

**3. Spaced repetition for the review pile.** Right now `#/review` is a flat list of everything
wrong or flagged. Give each attempt a due date on a simple SM-2 style interval, surface what is
due today, and let a question leave the pile only after being answered correctly twice on
separate days.

**4. More written practice.** 272 objectives still have none. `#/goals` is ordered by archive
yield, so the top of that list is the highest-value work. Follow the schema and the tone in
`practice/*.js` exactly: exam-style stems, a real mark scheme with mark allocations, and a worked
solution that explains why the wrong options are wrong, not just which one is right.

**5. Teaching notes per objective.** Each objective page currently shows practice and matching
past paper questions but nothing that teaches the content. Add a short, dense explainer per
objective: the definition, the thing examiners actually want in the words they want it, and the
one mistake that loses the mark most often. The examiner commentary already in
`data/questions.js` (33 questions carry it) is real evidence of what candidates get wrong; mine it
rather than inventing.

**6. A built-in data booklet.** `past_papers/2023/NIS_G12_CHE_QAD_3RP_AFP.pdf` is the periodic
table and qualitative analysis reference the students get in the exam. A pinnable panel with the
periodic table, common ion colours, precipitate tests and standard electrode potentials would
save constant PDF switching. It has to work with `past_papers/` absent, so transcribe the data
rather than linking to it.

**7. Accessibility and keyboard flow.** Drills have keyboard shortcuts but the rest does not.
Audit focus order, focus visibility, ARIA on the accordions and `<details>` blocks, screen reader
labelling of the option buttons, and reduced-motion behaviour.

Before you finish, run `bash tools/rebuild.sh`, load the site, click through
`#/`, `#/goals`, a topic, a drill, `#/review` and `#/papers`, and confirm the browser console is
clean. Tell me honestly what you did not get to.
