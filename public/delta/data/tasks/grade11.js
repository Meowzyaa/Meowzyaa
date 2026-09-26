/* Grade 11 tasks. AI-generated to the NIS grade 12 mathematics specification
   and the grade 11 long-term plan; not past paper questions.

   Each task:  id, topic, paper (the style it follows: 1, 2 or 3), n (order),
   kind: 'short'      typed answer, marked against `accept` (set: true for
                      answers with several values, in any order), shown as `show`
         'mcq'        options A-D and the `answer` letter
         'structured' `body` with parts; self marked against `scheme`
   marks, stem, scheme ([{ part, text }] in M1/A1/B1 style), why (worked solution).
   Maths is plain Unicode plus x^{n}, a_{n} and [[1, 2], [3, 4]] (see assets/maths.js). */
DELTA_QUESTIONS.push(

// ---- 11.1A  nth roots and powers ------------------------------------------------
{
  id: 'g11-roots-1', topic: 'roots', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'Evaluate ∛(−27) + 16^{3/4} without a calculator.',
  label: 'Answer', accept: ['5'], show: '5',
  scheme: [{ part: 'B1', text: '∛(−27) = −3' }, { part: 'B1', text: '16^{3/4} = (⁴√16)³ = 2³ = 8, so the total is 5' }],
  why: 'The cube root of a negative number is negative: (−3)³ = −27. For 16^{3/4}, take the root first: ⁴√16 = 2, then cube it: 2³ = 8. So −3 + 8 = 5. Cubing 16 first gives 4096, which is far harder by hand.'
},
{
  id: 'g11-roots-2', topic: 'roots', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'Simplify a^{2/3} · a^{1/2} ÷ a^{1/6}, where a > 0, giving your answer as a single power of a.',
  label: 'Answer', accept: ['a', 'a^1'], show: 'a', hint: 'Type a power of a, for example a^3 or just a.',
  scheme: [{ part: 'M1', text: 'adds and subtracts the indices: 2/3 + 1/2 − 1/6' }, { part: 'A1', text: '= 1, so the answer is a' }],
  why: 'Multiplying powers of the same base adds the indices, dividing subtracts them: 2/3 + 1/2 − 1/6 = 4/6 + 3/6 − 1/6 = 6/6 = 1. So the expression is a¹ = a.'
},
{
  id: 'g11-roots-3', topic: 'roots', paper: 1, n: 3, kind: 'short', marks: 3,
  stem: 'Solve the equation √(x + 7) = x − 5.',
  label: 'x =', accept: ['9'], show: 'x = 9',
  scheme: [
    { part: 'M1', text: 'squares both sides: x + 7 = x² − 10x + 25' },
    { part: 'A1', text: 'x² − 11x + 18 = 0, so x = 9 or x = 2' },
    { part: 'A1', text: 'checks both and rejects x = 2: x = 9 only' }
  ],
  why: 'Squaring can create a root that does not satisfy the original equation, so check both. x = 9: √16 = 4 and 9 − 5 = 4, true. x = 2: √9 = 3 but 2 − 5 = −3, false, because a square root is never negative. So x = 9 only.'
},
{
  id: 'g11-roots-4', topic: 'roots', paper: 1, n: 4, kind: 'mcq', marks: 1,
  stem: 'Which of these is equal to ⁴√(81x⁸) for x > 0?',
  options: { A: '3x²', B: '9x²', C: '3x⁴', D: '81x²' }, answer: 'A',
  why: '⁴√81 = 3 because 3⁴ = 81, and ⁴√(x⁸) = x^{8/4} = x². So ⁴√(81x⁸) = 3x². B takes the square root of 81 instead of the fourth root; C halves the power instead of dividing it by 4.'
},
{
  id: 'g11-roots-5', topic: 'roots', paper: 1, n: 5, kind: 'short', marks: 2,
  stem: 'Solve the inequality √(2x − 1) < 3.',
  label: 'Answer', accept: ['1/2<=x<5', '0.5<=x<5', '[1/2,5)', '[0.5,5)', 'x∈[1/2,5)', 'x∈[0.5,5)'], show: '1/2 ≤ x < 5',
  hint: 'Write it as an inequality, for example 1 <= x < 4.',
  scheme: [{ part: 'B1', text: 'the root needs 2x − 1 ≥ 0, so x ≥ 1/2' }, { part: 'B1', text: 'squaring: 2x − 1 < 9, so x < 5; answer 1/2 ≤ x < 5' }],
  why: 'Two conditions. The expression under the root cannot be negative, so x ≥ 1/2. Both sides are non-negative, so squaring keeps the direction of the inequality: 2x − 1 < 9 gives x < 5. Together, 1/2 ≤ x < 5. Forgetting the first condition is the usual mistake.'
},
{
  id: 'g11-roots-6', topic: 'roots', paper: 2, n: 6, kind: 'structured', marks: 6,
  stem: 'The function f(x) = x^{−2} is defined for all real x ≠ 0.',
  body: 'The function f(x) = x^{−2} is defined for all real x ≠ 0.\n\n(a) State the range of f. [1]\n(b) State whether f is even, odd or neither, giving a reason. [2]\n(c) Solve the inequality x^{−2} > 4. [3]',
  scheme: [
    { part: '(a)', text: 'f(x) > 0, all positive real numbers  B1' },
    { part: '(b)', text: 'even  B1\nf(−x) = (−x)^{−2} = x^{−2} = f(x)  B1' },
    { part: '(c)', text: 'multiplies by x² > 0: 1 > 4x², so x² < 1/4  M1\n−1/2 < x < 1/2  A1\nexcludes x = 0: −1/2 < x < 0 or 0 < x < 1/2  A1' }
  ],
  why: '(a) 1/x² is positive for every x ≠ 0 and can be made as large or as small as you like, so the range is all positive numbers.\n(b) Replacing x by −x changes nothing, because the power is even, so the graph is symmetric about the y-axis: even.\n(c) Multiplying both sides by x² is safe because x² is positive, so the inequality keeps its direction: x² < 1/4, which gives −1/2 < x < 1/2. The function is not defined at 0, so that point must be left out.'
},

// ---- 11.1B  Algebraic expressions -----------------------------------------------
{
  id: 'g11-poly-1', topic: 'polynomials', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'Find the remainder when x³ − 2x² + 4 is divided by (x − 3).',
  label: 'Remainder =', accept: ['13'], show: '13',
  scheme: [{ part: 'M1', text: 'uses the remainder theorem: f(3) = 27 − 18 + 4' }, { part: 'A1', text: '13' }],
  why: 'By the remainder theorem, dividing f(x) by (x − a) leaves the remainder f(a). f(3) = 27 − 18 + 4 = 13. No long division needed.'
},
{
  id: 'g11-poly-2', topic: 'polynomials', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'Given that (x + 2) is a factor of x³ + ax² − x − 2, find the value of a.',
  label: 'a =', accept: ['2'], show: 'a = 2',
  scheme: [{ part: 'M1', text: 'f(−2) = −8 + 4a + 2 − 2 = 0' }, { part: 'A1', text: 'a = 2' }],
  why: 'By the factor theorem, (x + 2) is a factor exactly when f(−2) = 0. f(−2) = −8 + 4a + 2 − 2 = 4a − 8, so a = 2. Check: x³ + 2x² − x − 2 = (x + 2)(x² − 1).'
},
{
  id: 'g11-poly-3', topic: 'polynomials', paper: 1, n: 3, kind: 'short', marks: 3,
  stem: 'The roots of x³ − 6x² + 11x − 6 = 0 are α, β and γ. Without solving the equation, find α² + β² + γ².',
  label: 'Answer', accept: ['14'], show: '14',
  scheme: [
    { part: 'B1', text: 'α + β + γ = 6 and αβ + βγ + γα = 11' },
    { part: 'M1', text: 'uses (α + β + γ)² − 2(αβ + βγ + γα)' },
    { part: 'A1', text: '36 − 22 = 14' }
  ],
  why: 'For ax³ + bx² + cx + d = 0, Vieta gives α + β + γ = −b/a = 6 and αβ + βγ + γα = c/a = 11. Squaring the sum gives α² + β² + γ² + 2(αβ + βγ + γα), so α² + β² + γ² = 6² − 2 × 11 = 14. The roots are in fact 1, 2 and 3, and 1 + 4 + 9 = 14 confirms it.'
},
{
  id: 'g11-poly-4', topic: 'polynomials', paper: 1, n: 4, kind: 'mcq', marks: 1,
  stem: 'Which of these is not a root of 2x³ + x² − 5x + 2 = 0?',
  options: { A: '1', B: '1/2', C: '−2', D: '2' }, answer: 'D',
  why: 'Test each value. f(1) = 2 + 1 − 5 + 2 = 0; f(1/2) = 1/4 + 1/4 − 5/2 + 2 = 0; f(−2) = −16 + 4 + 10 + 2 = 0; f(2) = 16 + 4 − 10 + 2 = 12. So 2 is not a root. By the rational root theorem, any rational root is ±(a factor of 2) ÷ (a factor of 2), which is why these candidates were the ones worth testing.'
},
{
  id: 'g11-poly-5', topic: 'polynomials', paper: 1, n: 5, kind: 'mcq', marks: 2,
  stem: 'Which is the complete factorisation of x³ − 5x² + 2x + 8?',
  options: { A: '(x − 2)(x − 4)(x + 1)', B: '(x + 2)(x − 4)(x − 1)', C: '(x − 2)(x + 4)(x − 1)', D: '(x − 2)(x − 4)(x − 1)' }, answer: 'A',
  why: 'f(2) = 8 − 20 + 4 + 8 = 0, so (x − 2) is a factor. Horner’s scheme with 2 on the coefficients 1, −5, 2, 8 gives 1, −3, −4 and remainder 0, so the quotient is x² − 3x − 4 = (x − 4)(x + 1). Expanding (x − 2)(x − 4)(x + 1) gives x³ − 5x² + 2x + 8 back.'
},
{
  id: 'g11-poly-6', topic: 'polynomials', paper: 2, n: 6, kind: 'structured', marks: 6,
  stem: 'p(x) = 2x³ + x² − 13x + 6. Show that (x − 2) is a factor, then factorise and solve.',
  body: 'p(x) = 2x³ + x² − 13x + 6.\n\n(a) Show that (x − 2) is a factor of p(x). [2]\n(b) Hence factorise p(x) completely. [3]\n(c) Solve the equation p(x) = 0. [1]',
  scheme: [
    { part: '(a)', text: 'p(2) = 16 + 4 − 26 + 6  M1\n= 0, so (x − 2) is a factor  A1' },
    { part: '(b)', text: 'divides, or compares coefficients, to find the quadratic factor  M1\n2x² + 5x − 3  A1\n(x − 2)(2x − 1)(x + 3)  A1' },
    { part: '(c)', text: 'x = 2, x = 1/2, x = −3  B1' }
  ],
  why: '(a) By the factor theorem it is enough to show p(2) = 0: 16 + 4 − 26 + 6 = 0. "Show that" means the working is the answer, so write the substitution out in full.\n(b) Horner’s scheme with 2 on 2, 1, −13, 6 gives 2, 5, −3 and remainder 0, so p(x) = (x − 2)(2x² + 5x − 3), and the quadratic factorises as (2x − 1)(x + 3).\n(c) Each factor gives a root: x = 2, 1/2 and −3.'
},

// ---- 11.1C  Elements of statistics ----------------------------------------------
{
  id: 'g11-stat-1', topic: 'statistics', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'The numbers 3, 7, 7, 9 and x have a mean of 8. Find x.',
  label: 'x =', accept: ['14'], show: 'x = 14',
  scheme: [{ part: 'M1', text: '3 + 7 + 7 + 9 + x = 5 × 8 = 40' }, { part: 'A1', text: 'x = 14' }],
  why: 'The mean times the number of values gives the total: 5 × 8 = 40. The four known values add to 26, so x = 40 − 26 = 14.'
},
{
  id: 'g11-stat-2', topic: 'statistics', paper: 1, n: 2, kind: 'short', marks: 3,
  stem: 'Find the variance of the numbers 3, 7, 7, 9, 14.',
  label: 'Variance =', accept: ['12.8', '64/5'], show: '12.8',
  hint: 'Use the variance with n in the denominator.',
  scheme: [
    { part: 'B1', text: 'mean = 40/5 = 8' },
    { part: 'M1', text: 'Σ(x − x̄)² = 25 + 1 + 1 + 1 + 36 = 64' },
    { part: 'A1', text: 'variance = 64/5 = 12.8' }
  ],
  why: 'The mean is 40/5 = 8. The deviations from it are −5, −1, −1, 1, 6, and their squares add to 64. Dividing by n = 5 gives 12.8. The shortcut Σx²/n − x̄² gives the same: 384/5 − 64 = 76.8 − 64 = 12.8.'
},
{
  id: 'g11-stat-3', topic: 'statistics', paper: 1, n: 3, kind: 'short', marks: 2,
  stem: 'Find the median of 12, 5, 9, 20, 7, 15.',
  label: 'Median =', accept: ['10.5', '21/2'], show: '10.5',
  scheme: [{ part: 'M1', text: 'orders the data: 5, 7, 9, 12, 15, 20' }, { part: 'A1', text: '(9 + 12)/2 = 10.5' }],
  why: 'Put the values in order first: 5, 7, 9, 12, 15, 20. With an even number of values the median is halfway between the two middle ones: (9 + 12)/2 = 10.5. Taking the middle of the unsorted list is the usual slip.'
},
{
  id: 'g11-stat-4', topic: 'statistics', paper: 1, n: 4, kind: 'mcq', marks: 1,
  stem: 'One very large value is added to a data set. Which of these measures changes the most?',
  options: { A: 'the median', B: 'the mode', C: 'the mean', D: 'the interquartile range' }, answer: 'C',
  why: 'The mean uses the size of every value, so one extreme value pulls it a long way. The median and the interquartile range depend only on the order of the values, and the mode on the most common one, so they barely move. That is why the median is preferred for skewed data such as incomes.'
},
{
  id: 'g11-stat-5', topic: 'statistics', paper: 1, n: 5, kind: 'short', marks: 2,
  stem: 'The number of books x read last month by 20 students:\n\nx:           1   2   3   4\nfrequency:   3   5   8   4\n\nFind the mean number of books.',
  label: 'Mean =', accept: ['2.65', '53/20'], show: '2.65',
  scheme: [{ part: 'M1', text: 'Σfx = 3 + 10 + 24 + 16 = 53' }, { part: 'A1', text: '53 ÷ 20 = 2.65' }],
  why: 'For a frequency table, multiply each value by its frequency and add: 1 × 3 + 2 × 5 + 3 × 8 + 4 × 4 = 53. Divide by the total frequency, 20, not by the number of different values, 4: the mean is 2.65.'
},
{
  id: 'g11-stat-6', topic: 'statistics', paper: 2, n: 6, kind: 'structured', marks: 6,
  stem: 'Five numbers have a mean of 6 and a variance of 4. A sixth number, 12, is added.',
  body: 'Five numbers have a mean of 6 and a variance of 4.\n\n(a) Find Σx and Σx². [3]\n(b) A sixth number, 12, is added to the five. Find the mean and the variance of the six numbers. [3]',
  scheme: [
    { part: '(a)', text: 'Σx = 5 × 6 = 30  B1\nuses variance = Σx²/n − x̄²: Σx²/5 − 36 = 4  M1\nΣx² = 200  A1' },
    { part: '(b)', text: 'new mean = 42/6 = 7  B1\n(200 + 144)/6 − 7²  M1\n= 25/3 ≈ 8.33  A1' }
  ],
  why: '(a) The mean times the count gives the total, Σx = 30. Rearranging the variance formula, Σx²/5 = 4 + 36 = 40, so Σx² = 200.\n(b) Adding 12 changes both sums: Σx = 42 and Σx² = 200 + 144 = 344, with n = 6. Mean = 7, variance = 344/6 − 49 = 25/3 ≈ 8.33. The variance grows because 12 is far from the old mean.'
},
{
  id: 'g11-stat-7', topic: 'statistics', paper: 3, n: 7, kind: 'structured', marks: 6,
  stem: 'A café’s daily sales over 10 days, one of them a festival day: mean, spread, and which average to report.',
  body: 'A café records the number of cakes it sells on 10 days:\n\n12, 15, 11, 18, 14, 16, 13, 30, 15, 16\n\nThe day with 30 sales was a city festival.\n\n(a) Find the mean and the standard deviation of the number of cakes sold. [3]\n(b) The owner removes the festival day. Describe the effect on the mean and on the median, with numbers. [2]\n(c) Which average better describes a typical day? Give a reason. [1]',
  scheme: [
    { part: '(a)', text: 'mean = 160/10 = 16  B1\nuses Σx²/n − x̄² = 2816/10 − 256  M1\nstandard deviation = √25.6 ≈ 5.06  A1' },
    { part: '(b)', text: 'mean falls from 16 to 130/9 ≈ 14.4  B1\nmedian stays at 15  B1' },
    { part: '(c)', text: 'the median, because it is not pulled up by the unusual festival day  B1' }
  ],
  why: '(a) The total is 160, so the mean is 16. Σx² = 2816, so the variance is 281.6 − 256 = 25.6 and the standard deviation is about 5.06 cakes.\n(b) Without 30 the total is 130 over 9 days, a mean of about 14.4. In order, the ten values are 11, 12, 13, 14, 15, 15, 16, 16, 18, 30, with median 15; the nine without 30 still have 15 in the middle.\n(c) One extreme day moved the mean by more than 1.5 cakes and the median not at all, so the median is the better picture of a typical day. In context questions, always tie the reason to the situation.'
},

// ---- 11.2A  Polyhedra and solids of revolution -------------------------------------
{
  id: 'g11-solid-1', topic: 'solids', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'A cube has a total surface area of 150 cm². Find the length of its edge in cm.',
  label: 'Edge =', accept: ['5', '5cm'], show: '5 cm',
  scheme: [{ part: 'M1', text: '6a² = 150' }, { part: 'A1', text: 'a² = 25, a = 5' }],
  why: 'A cube has 6 square faces, each of area a². So 6a² = 150, a² = 25 and a = 5 cm.'
},
{
  id: 'g11-solid-2', topic: 'solids', paper: 1, n: 2, kind: 'short', marks: 3,
  stem: 'A cone has base radius 3 cm and height 4 cm. Find its total surface area, giving your answer in terms of π.',
  label: 'Area =', accept: ['24π'], show: '24π cm²', hint: 'Type it in terms of π, for example 10π or 10pi.',
  scheme: [
    { part: 'B1', text: 'slant height l = √(3² + 4²) = 5' },
    { part: 'M1', text: 'πr² + πrl' },
    { part: 'A1', text: '9π + 15π = 24π' }
  ],
  why: 'The curved surface of a cone is πrl, where l is the slant height, not the vertical height. Here l = √(9 + 16) = 5, so the curved surface is 15π. Add the circular base, 9π, for 24π cm².'
},
{
  id: 'g11-solid-3', topic: 'solids', paper: 1, n: 3, kind: 'short', marks: 2,
  stem: 'A closed cylinder has radius 2 cm and height 5 cm. Find its total surface area in terms of π.',
  label: 'Area =', accept: ['28π'], show: '28π cm²', hint: 'Type it in terms of π, for example 10π or 10pi.',
  scheme: [{ part: 'M1', text: '2πr² + 2πrh' }, { part: 'A1', text: '8π + 20π = 28π' }],
  why: 'Two circular ends, 2 × π × 2² = 8π, plus the curved surface, which unrolls into a rectangle 2πr by h: 2π × 2 × 5 = 20π. Total 28π cm².'
},
{
  id: 'g11-solid-4', topic: 'solids', paper: 1, n: 4, kind: 'mcq', marks: 1,
  stem: 'A regular square pyramid has base edge 6 cm, and the height of each triangular face (the apothem) is 5 cm. What is its lateral surface area?',
  options: { A: '30 cm²', B: '60 cm²', C: '96 cm²', D: '120 cm²' }, answer: 'B',
  why: 'Each triangular face has area ½ × 6 × 5 = 15 cm², and there are four of them: 60 cm². Adding the square base, 36 cm², gives the total surface area, 96 cm², which is option C. Read which area the question asks for.'
},
{
  id: 'g11-solid-5', topic: 'solids', paper: 1, n: 5, kind: 'short', marks: 2,
  stem: 'A sphere has surface area 36π cm². Find its radius in cm.',
  label: 'r =', accept: ['3', '3cm'], show: '3 cm',
  scheme: [{ part: 'M1', text: '4πr² = 36π' }, { part: 'A1', text: 'r² = 9, r = 3' }],
  why: 'The surface area of a sphere is 4πr². Setting 4πr² = 36π gives r² = 9, so r = 3 cm.'
},
{
  id: 'g11-solid-6', topic: 'solids', paper: 2, n: 6, kind: 'structured', marks: 6,
  stem: 'A frustum of a cone has base radii 6 cm and 3 cm and height 4 cm.',
  body: 'A frustum of a cone has base radii 6 cm and 3 cm and height 4 cm.\n\n(a) Find the slant height of the frustum. [2]\n(b) Find its curved surface area, in terms of π. [2]\n(c) Find its total surface area, in terms of π. [2]',
  scheme: [
    { part: '(a)', text: 'right triangle with legs 4 and 6 − 3 = 3: l = √(3² + 4²)  M1\nl = 5 cm  A1' },
    { part: '(b)', text: 'π(R + r)l = π(6 + 3)(5)  M1\n45π cm²  A1' },
    { part: '(c)', text: 'adds both circles: 36π + 9π  M1\n90π cm²  A1' }
  ],
  why: '(a) A cross-section through the axis shows a right-angled triangle with legs 4 (the height) and 6 − 3 = 3 (the difference of the radii), so l = 5 cm.\n(b) The curved surface of a frustum is π(R + r)l = π × 9 × 5 = 45π cm².\n(c) Add the two circular faces, π × 6² and π × 3²: 45π + 36π + 9π = 90π cm².'
},

// ---- 11.2B  Calculus II --------------------------------------------------------------
{
  id: 'g11-calc2-1', topic: 'calculus-2', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'Given that f(x) = x³ − 6x² + 9x, find f′(2).',
  label: 'f′(2) =', accept: ['-3'], show: '−3',
  scheme: [{ part: 'M1', text: 'f′(x) = 3x² − 12x + 9' }, { part: 'A1', text: 'f′(2) = 12 − 24 + 9 = −3' }],
  why: 'Differentiate each term: bring the power down and reduce it by one. f′(x) = 3x² − 12x + 9, so f′(2) = 12 − 24 + 9 = −3. Substitute only after differentiating.'
},
{
  id: 'g11-calc2-2', topic: 'calculus-2', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'Given that f(x) = 4x^{3/2}, find f″(4).',
  label: 'f″(4) =', accept: ['3/2', '1.5'], show: '3/2',
  scheme: [{ part: 'M1', text: 'f′(x) = 6x^{1/2}, f″(x) = 3x^{−1/2}' }, { part: 'A1', text: 'f″(4) = 3/√4 = 3/2' }],
  why: 'The power rule works for fractional powers too. f′(x) = 4 × (3/2)x^{1/2} = 6x^{1/2}, and f″(x) = 6 × (1/2)x^{−1/2} = 3/√x. At x = 4, f″(4) = 3/2.'
},
{
  id: 'g11-calc2-3', topic: 'calculus-2', paper: 1, n: 3, kind: 'short', marks: 3,
  stem: 'Find the greatest value of f(x) = x³ − 3x on the interval 0 ≤ x ≤ 2.',
  label: 'Greatest value =', accept: ['2'], show: '2',
  scheme: [
    { part: 'M1', text: 'f′(x) = 3x² − 3 = 0 gives x = 1 in the interval' },
    { part: 'M1', text: 'compares f(0) = 0, f(1) = −2, f(2) = 2' },
    { part: 'A1', text: 'greatest value 2' }
  ],
  why: 'On a closed interval the greatest value is at a stationary point or at an end. The only stationary point inside is x = 1, a minimum with f(1) = −2. The ends give f(0) = 0 and f(2) = 8 − 6 = 2. The greatest value is 2, at x = 2.'
},
{
  id: 'g11-calc2-4', topic: 'calculus-2', paper: 1, n: 4, kind: 'mcq', marks: 2,
  stem: 'Find ∫(6x² − 4x + 3) dx.',
  options: { A: '2x³ − 2x² + 3x + C', B: '12x − 4 + C', C: '6x³ − 4x² + 3x + C', D: '2x³ − 4x² + 3x + C' }, answer: 'A',
  why: 'Integrate term by term: raise each power by one and divide by the new power. 6x² becomes 2x³, −4x becomes −2x², and 3 becomes 3x. B differentiates instead; C forgets to divide; D divides only the first term.'
},
{
  id: 'g11-calc2-5', topic: 'calculus-2', paper: 1, n: 5, kind: 'short', marks: 2,
  stem: 'The curve y = x³ − 12x + 1 has two stationary points. Find the x-coordinate of the local minimum.',
  label: 'x =', accept: ['2'], show: 'x = 2',
  scheme: [{ part: 'M1', text: 'dy/dx = 3x² − 12 = 0, so x = ±2' }, { part: 'A1', text: 'd²y/dx² = 6x > 0 at x = 2: minimum at x = 2' }],
  why: 'dy/dx = 3x² − 12 = 0 gives x = 2 or x = −2. The second derivative, 6x, is positive at x = 2 (a minimum) and negative at x = −2 (a maximum).'
},
{
  id: 'g11-calc2-6', topic: 'calculus-2', paper: 2, n: 6, kind: 'structured', marks: 7,
  stem: 'f(x) = x³ − 3x² − 9x + 5. Find the stationary points, then the greatest value on an interval.',
  body: 'f(x) = x³ − 3x² − 9x + 5.\n\n(a) Find the coordinates of the stationary points of the curve y = f(x) and determine their nature. [5]\n(b) Find the greatest value of f(x) on the interval −2 ≤ x ≤ 4. [2]',
  scheme: [
    { part: '(a)', text: 'f′(x) = 3x² − 6x − 9  M1\n3(x − 3)(x + 1) = 0, so x = 3 or x = −1  A1\n(−1, 10) and (3, −22)  A1\nf″(x) = 6x − 6, and uses its sign  M1\n(−1, 10) is a maximum, (3, −22) a minimum  A1' },
    { part: '(b)', text: 'compares f(−1) = 10 with f(−2) = 3 and f(4) = −15  M1\ngreatest value 10  A1' }
  ],
  why: '(a) Set the derivative to zero: 3x² − 6x − 9 = 3(x − 3)(x + 1), so x = 3 or x = −1. Substituting back gives (−1, 10) and (3, −22). The second derivative 6x − 6 is −12 at x = −1, a maximum, and 12 at x = 3, a minimum.\n(b) The greatest value on an interval is at a stationary point or an end. The ends give f(−2) = 3 and f(4) = −15, the maximum gives 10, so the greatest value is 10.'
},
{
  id: 'g11-calc2-7', topic: 'calculus-2', paper: 3, n: 7, kind: 'structured', marks: 7,
  stem: 'A closed can must hold 250π cm³. Find the radius that uses the least metal.',
  body: 'A closed cylindrical can of radius r cm and height h cm must hold 250π cm³.\n\n(a) Show that its total surface area is S = 2πr² + 500π/r. [2]\n(b) Find the value of r for which S is stationary. [3]\n(c) Show that this value gives a minimum, and find the minimum surface area in terms of π. [2]',
  scheme: [
    { part: '(a)', text: 'πr²h = 250π, so h = 250/r²  M1\nS = 2πr² + 2πr(250/r²) = 2πr² + 500π/r  A1' },
    { part: '(b)', text: 'dS/dr = 4πr − 500π/r²  M1\n4πr − 500π/r² = 0 gives r³ = 125  M1\nr = 5  A1' },
    { part: '(c)', text: 'd²S/dr² = 4π + 1000π/r³ > 0, so a minimum  B1\nS = 50π + 100π = 150π cm²  B1' }
  ],
  why: '(a) The volume fixes h in terms of r: h = 250/r². Substitute into S = 2πr² + 2πrh; "show that" questions need every step written.\n(b) Write 500π/r as 500πr^{−1} to differentiate: dS/dr = 4πr − 500πr^{−2}. Setting it to 0 gives 4r³ = 500, so r³ = 125 and r = 5.\n(c) The second derivative is positive for every r > 0, so r = 5 gives a minimum. Then S = 2π(25) + 500π/5 = 150π ≈ 471 cm². At this radius h = 10 = 2r: the least-metal can is as tall as it is wide.'
},

// ---- 11.3A  Exponential and logarithmic functions ------------------------------------
{
  id: 'g11-exp-1', topic: 'exp-log', paper: 1, n: 1, kind: 'short', marks: 3,
  stem: 'Solve the equation log₂(x − 1) + log₂(x + 1) = 3.',
  label: 'x =', accept: ['3'], show: 'x = 3',
  scheme: [
    { part: 'M1', text: 'combines the logs: log₂((x − 1)(x + 1)) = 3' },
    { part: 'M1', text: 'removes the log: x² − 1 = 2³ = 8' },
    { part: 'A1', text: 'x = 3 only, rejecting x = −3' }
  ],
  why: 'x² − 1 = 8 gives x = 3 or x = −3. But at x = −3, x − 1 = −4 is negative, and the logarithm of a negative number does not exist. Always check each root against the original equation.'
},
{
  id: 'g11-exp-2', topic: 'exp-log', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'Solve 2^{x+1} = 32.',
  label: 'x =', accept: ['4'], show: 'x = 4',
  scheme: [{ part: 'M1', text: '32 = 2⁵, so x + 1 = 5' }, { part: 'A1', text: 'x = 4' }],
  why: 'Write both sides as powers of the same base: 2^{x+1} = 2⁵. Equal powers of the same base have equal exponents, so x + 1 = 5 and x = 4.'
},
{
  id: 'g11-exp-3', topic: 'exp-log', paper: 1, n: 3, kind: 'short', marks: 2,
  stem: 'Evaluate log₃ 54 − log₃ 2.',
  label: 'Answer', accept: ['3'], show: '3',
  scheme: [{ part: 'M1', text: 'log₃(54 ÷ 2) = log₃ 27' }, { part: 'A1', text: '3' }],
  why: 'The difference of two logs with the same base is the log of the quotient: log₃(54/2) = log₃ 27 = 3, because 3³ = 27.'
},
{
  id: 'g11-exp-4', topic: 'exp-log', paper: 1, n: 4, kind: 'short', marks: 3,
  stem: 'Solve 9^{x} − 4 · 3^{x} + 3 = 0.',
  label: 'x =', set: true, accept: ['0,1'], show: 'x = 0 or x = 1', hint: 'Give both values, separated by a comma.',
  scheme: [
    { part: 'M1', text: 'substitutes t = 3^{x}: t² − 4t + 3 = 0' },
    { part: 'A1', text: 't = 1 or t = 3' },
    { part: 'A1', text: 'x = 0 or x = 1' }
  ],
  why: '9^{x} = (3^{x})², so the equation is a quadratic in t = 3^{x}: t² − 4t + 3 = (t − 1)(t − 3) = 0. Then 3^{x} = 1 gives x = 0 and 3^{x} = 3 gives x = 1. Both are valid, because 3^{x} is positive for every x.'
},
{
  id: 'g11-exp-5', topic: 'exp-log', paper: 1, n: 5, kind: 'mcq', marks: 1,
  stem: 'The graph of y = log₂ x passes through which point?',
  options: { A: '(0, 1)', B: '(1, 0)', C: '(2, 0)', D: '(0, 0)' }, answer: 'B',
  why: 'log₂ 1 = 0 because 2⁰ = 1, so the graph crosses the x-axis at (1, 0). It never meets the y-axis: the logarithm is only defined for x > 0. (0, 1) is where y = 2^{x} crosses the y-axis, its mirror image in y = x.'
},
{
  id: 'g11-exp-6', topic: 'exp-log', paper: 2, n: 6, kind: 'structured', marks: 7,
  stem: 'Solve an exponential equation, then a logarithmic inequality with base 1/2.',
  body: '(a) Solve the equation 5^{2x} − 6 · 5^{x} + 5 = 0. [4]\n(b) Solve the inequality log_{1/2}(x − 2) > −3. [3]',
  scheme: [
    { part: '(a)', text: 'substitutes t = 5^{x}: t² − 6t + 5 = 0  M1\n(t − 1)(t − 5) = 0  A1\n5^{x} = 1 or 5^{x} = 5  M1\nx = 0 or x = 1  A1' },
    { part: '(b)', text: 'domain: x − 2 > 0  B1\nbase below 1 reverses the inequality: x − 2 < (1/2)^{−3} = 8  M1\n2 < x < 10  A1' }
  ],
  why: '(a) Treat 5^{2x} as (5^{x})² and solve the quadratic in t = 5^{x}.\n(b) Two things decide this one. The logarithm needs x − 2 > 0. And because the base 1/2 is less than 1, log_{1/2} is a decreasing function, so removing it reverses the inequality: x − 2 < (1/2)^{−3} = 8. Together, 2 < x < 10.'
},
{
  id: 'g11-exp-7', topic: 'exp-log', paper: 3, n: 7, kind: 'structured', marks: 7,
  stem: 'A cup of tea cools in a 20 °C room: T = 20 + 70e^{−kt}. Find k, then how long it takes to reach 30 °C.',
  body: 'A cup of tea is left in a room at 20 °C. Its temperature T °C after t minutes is modelled by\n\nT = 20 + 70e^{−kt},\n\nwhere k is a positive constant. After 5 minutes the temperature is 55 °C.\n\n(a) Find the exact value of k. [3]\n(b) Find how long it takes for the tea to cool to 30 °C. Give your answer to the nearest tenth of a minute. [3]\n(c) State the temperature the model predicts the tea approaches in the long run. [1]',
  scheme: [
    { part: '(a)', text: '55 = 20 + 70e^{−5k}  M1\ne^{−5k} = 1/2  A1\nk = (ln 2)/5  A1' },
    { part: '(b)', text: '30 = 20 + 70e^{−kt}, so e^{−kt} = 1/7  M1\nt = (ln 7)/k = 5 ln 7 / ln 2  M1\nt ≈ 14.0 minutes  A1' },
    { part: '(c)', text: '20 °C (as t grows, e^{−kt} tends to 0)  B1' }
  ],
  why: '(a) Substitute t = 5 and T = 55: 70e^{−5k} = 35, so e^{−5k} = 1/2. Take natural logs: −5k = ln(1/2) = −ln 2, so k = (ln 2)/5 ≈ 0.139. "Exact" means leave it with ln.\n(b) 70e^{−kt} = 10 gives e^{−kt} = 1/7, so t = (ln 7)/k = 5 ln 7 / ln 2 ≈ 5 × 2.807 = 14.0 minutes.\n(c) e^{−kt} shrinks towards 0, so T approaches 20 °C, the room temperature. The model makes sense: tea never cools below the room.'
},

// ---- 11.3B  Matrices and determinants -----------------------------------------------
{
  id: 'g11-mat-1', topic: 'matrices', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'Find the determinant of [[2, 3], [1, 4]].',
  label: 'det =', accept: ['5'], show: '5',
  scheme: [{ part: 'M1', text: '2 × 4 − 3 × 1' }, { part: 'A1', text: '5' }],
  why: 'For [[a, b], [c, d]] the determinant is ad − bc: the leading diagonal multiplied, minus the other diagonal multiplied. 8 − 3 = 5.'
},
{
  id: 'g11-mat-2', topic: 'matrices', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'A = [[1, 2], [3, 4]] and B = [[0, 1], [1, 0]]. Find the entry in the first row and first column of AB.',
  label: 'Entry =', accept: ['2'], show: '2',
  scheme: [{ part: 'M1', text: 'row 1 of A times column 1 of B: 1 × 0 + 2 × 1' }, { part: 'A1', text: '2' }],
  why: 'Each entry of AB is a row of A times a column of B. Row 1 of A is (1, 2) and column 1 of B is (0, 1): 1 × 0 + 2 × 1 = 2. In full, AB = [[2, 1], [4, 3]]: multiplying by B on the right swaps the columns of A.'
},
{
  id: 'g11-mat-3', topic: 'matrices', paper: 1, n: 3, kind: 'short', marks: 3,
  stem: 'Find the determinant of [[1, 2, 0], [0, 1, 3], [2, 0, 1]].',
  label: 'det =', accept: ['13'], show: '13',
  scheme: [
    { part: 'M1', text: 'expands along the first row' },
    { part: 'A1', text: '1(1 − 0) − 2(0 − 6) + 0' },
    { part: 'A1', text: '13' }
  ],
  why: 'Expanding along the first row: 1 × (1 × 1 − 3 × 0) − 2 × (0 × 1 − 3 × 2) + 0 = 1 + 12 = 13. Mind the alternating signs, + − +, across the row.'
},
{
  id: 'g11-mat-4', topic: 'matrices', paper: 1, n: 4, kind: 'short', marks: 3,
  stem: 'Use determinants to solve the system 2x + y = 7, x − y = 2, and give the value of x.',
  label: 'x =', accept: ['3'], show: 'x = 3',
  scheme: [
    { part: 'M1', text: 'Δ = 2 × (−1) − 1 × 1 = −3' },
    { part: 'M1', text: 'Δx = 7 × (−1) − 1 × 2 = −9' },
    { part: 'A1', text: 'x = Δx/Δ = 3' }
  ],
  why: 'By Cramer’s rule, x = Δx/Δ, where Δx is the determinant with the x column replaced by the right-hand sides. Δ = −3 and Δx = −9, so x = 3. Then y = 7 − 2x = 1. Check: 3 − 1 = 2.'
},
{
  id: 'g11-mat-5', topic: 'matrices', paper: 1, n: 5, kind: 'mcq', marks: 1,
  stem: 'For which value of k is the matrix [[k, 2], [3, 6]] singular?',
  options: { A: '1', B: '2', C: '3', D: '6' }, answer: 'A',
  why: 'A matrix is singular when its determinant is 0: 6k − 6 = 0, so k = 1. A singular matrix has no inverse, and a system with it as the coefficient matrix has no solution or infinitely many.'
},
{
  id: 'g11-mat-6', topic: 'matrices', paper: 2, n: 6, kind: 'structured', marks: 6,
  stem: 'A = [[2, 1], [5, 3]]. Find det A and the inverse, then solve a system with it.',
  body: 'A = [[2, 1], [5, 3]].\n\n(a) Find det A. [1]\n(b) Find A^{−1}. [2]\n(c) Hence solve the simultaneous equations 2x + y = 4 and 5x + 3y = 11. [3]',
  scheme: [
    { part: '(a)', text: 'det A = 6 − 5 = 1  B1' },
    { part: '(b)', text: 'swaps the leading diagonal and changes the signs of the other entries  M1\nA^{−1} = [[3, −1], [−5, 2]]  A1' },
    { part: '(c)', text: 'writes the system as A times (x, y) = (4, 11)  M1\nx = 3 × 4 − 1 × 11 and y = −5 × 4 + 2 × 11  M1\nx = 1, y = 2  A1' }
  ],
  why: '(b) For [[a, b], [c, d]] the inverse is 1/(ad − bc) × [[d, −b], [−c, a]], and here ad − bc = 1.\n(c) Multiplying both sides by A^{−1} gives the solution directly: x = 12 − 11 = 1 and y = −20 + 22 = 2. Check in the original equations: 2 + 2 = 4 and 5 + 6 = 11.'
},

// ---- 11.3C  Vectors and coordinates -------------------------------------------------
{
  id: 'g11-vec-1', topic: 'vectors', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'Find the magnitude of the vector a = (1, 2, 2).',
  label: '|a| =', accept: ['3'], show: '3',
  scheme: [{ part: 'M1', text: '√(1² + 2² + 2²)' }, { part: 'A1', text: '√9 = 3' }],
  why: 'The magnitude is the square root of the sum of the squares of the components: √(1 + 4 + 4) = 3.'
},
{
  id: 'g11-vec-2', topic: 'vectors', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'a = (1, 0, 2) and b = (3, 1, −1). Find the scalar product a · b.',
  label: 'a · b =', accept: ['1'], show: '1',
  scheme: [{ part: 'M1', text: '1 × 3 + 0 × 1 + 2 × (−1)' }, { part: 'A1', text: '1' }],
  why: 'Multiply matching components and add: 3 + 0 − 2 = 1. The result is a number, not a vector. It is not zero, so a and b are not perpendicular.'
},
{
  id: 'g11-vec-3', topic: 'vectors', paper: 1, n: 3, kind: 'short', marks: 3,
  stem: 'a = (1, 2, 0) and b = (0, 1, 3). Find the vector product a × b.',
  label: 'a × b =', accept: ['(6,-3,1)', '6,-3,1', '6i-3j+k', '6i-3j+1k'], show: '(6, −3, 1)',
  hint: 'Give it as coordinates, for example (1, 2, 3).',
  scheme: [
    { part: 'M1', text: 'uses the determinant with i, j, k in the top row' },
    { part: 'A1', text: 'two components correct' },
    { part: 'A1', text: '(6, −3, 1)' }
  ],
  why: 'a × b = (a₂b₃ − a₃b₂, a₃b₁ − a₁b₃, a₁b₂ − a₂b₁) = (2 × 3 − 0 × 1, 0 × 0 − 1 × 3, 1 × 1 − 2 × 0) = (6, −3, 1). Check: it is perpendicular to both, since (6, −3, 1) · (1, 2, 0) = 0 and (6, −3, 1) · (0, 1, 3) = 0.'
},
{
  id: 'g11-vec-4', topic: 'vectors', paper: 1, n: 4, kind: 'short', marks: 3,
  stem: 'Find the distance from the point P(1, 2, 3) to the plane 2x − y + 2z − 3 = 0.',
  label: 'Distance =', accept: ['1'], show: '1',
  scheme: [
    { part: 'M1', text: 'uses |ax₀ + by₀ + cz₀ + d| / √(a² + b² + c²)' },
    { part: 'A1', text: '|2 − 2 + 6 − 3| = 3 and √(4 + 1 + 4) = 3' },
    { part: 'A1', text: '1' }
  ],
  why: 'Substitute the point into the left-hand side of the plane equation, take the absolute value, and divide by the length of the normal vector (2, −1, 2): 3 ÷ 3 = 1.'
},
{
  id: 'g11-vec-5', topic: 'vectors', paper: 1, n: 5, kind: 'mcq', marks: 2,
  stem: 'The sphere x² + y² + z² − 4x + 6y = 12 has',
  options: { A: 'centre (2, −3, 0) and radius 5', B: 'centre (−2, 3, 0) and radius 5', C: 'centre (2, −3, 0) and radius 25', D: 'centre (4, −6, 0) and radius 12' }, answer: 'A',
  why: 'Complete the square in x and y: (x − 2)² − 4 + (y + 3)² − 9 + z² = 12, so (x − 2)² + (y + 3)² + z² = 25. The centre has the opposite signs to the brackets, (2, −3, 0), and the radius is √25 = 5, not 25.'
},
{
  id: 'g11-vec-6', topic: 'vectors', paper: 2, n: 6, kind: 'structured', marks: 7,
  stem: 'A(1, 0, 2), B(3, 1, 0), C(2, 2, 1): a cross product, the area of a triangle and a plane.',
  body: 'The points A(1, 0, 2), B(3, 1, 0) and C(2, 2, 1) are given.\n\n(a) Find AB × AC. [3]\n(b) Find the area of triangle ABC. [2]\n(c) Find an equation of the plane ABC. [2]',
  scheme: [
    { part: '(a)', text: 'AB = (2, 1, −2) and AC = (1, 2, −1)  B1\nuses the vector product formula  M1\n(3, 0, 3)  A1' },
    { part: '(b)', text: '½ |AB × AC| = ½ √18  M1\n3√2/2 ≈ 2.12  A1' },
    { part: '(c)', text: 'normal (3, 0, 3), so x + z = d  M1\nx + z = 3  A1' }
  ],
  why: '(a) AB = B − A = (2, 1, −2) and AC = C − A = (1, 2, −1). The vector product is (1 × (−1) − (−2) × 2, (−2) × 1 − 2 × (−1), 2 × 2 − 1 × 1) = (3, 0, 3).\n(b) Its magnitude is the area of the parallelogram on AB and AC, so the triangle is half: ½√18 = 3√2/2.\n(c) The vector product is normal to the plane, and (3, 0, 3) is parallel to (1, 0, 1), so the plane is x + z = d. Point A gives d = 3. Check with B: 3 + 0 = 3, and with C: 2 + 1 = 3.'
},

// ---- 11.4A  Calculus III ------------------------------------------------------------------
{
  id: 'g11-calc3-1', topic: 'calculus-3', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'Find the exact value of ∫_{1}^{e} (2/x) dx.',
  label: 'Answer', accept: ['2'], show: '2',
  scheme: [{ part: 'M1', text: '[2 ln x] from 1 to e' }, { part: 'A1', text: '2 ln e − 2 ln 1 = 2' }],
  why: 'The integral of 1/x is ln x, so the integral of 2/x is 2 ln x. Since ln e = 1 and ln 1 = 0, the value is 2. Both facts turn up in almost every exact-value question.'
},
{
  id: 'g11-calc3-2', topic: 'calculus-3', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'Find lim_{x→0} (e^{3x} − 1)/x.',
  label: 'Limit =', accept: ['3'], show: '3',
  scheme: [{ part: 'M1', text: 'L’Hôpital: differentiates top and bottom to get 3e^{3x}/1' }, { part: 'A1', text: '3' }],
  why: 'At x = 0 the fraction is 0/0, so L’Hôpital’s rule applies: the limit equals the limit of the derivatives, 3e^{3x}/1, which is 3 at x = 0. Equivalently, e^{3x} − 1 behaves like 3x for small x.'
},
{
  id: 'g11-calc3-3', topic: 'calculus-3', paper: 1, n: 3, kind: 'short', marks: 2,
  stem: 'Find lim_{n→∞} (1 + 2/n)^{n}.',
  label: 'Limit =', accept: ['e^2'], show: 'e²', hint: 'Type powers with ^, for example e^3.',
  scheme: [{ part: 'M1', text: 'writes it as ((1 + 2/n)^{n/2})² and uses lim (1 + 1/m)^{m} = e' }, { part: 'A1', text: 'e²' }],
  why: 'Put m = n/2, so 2/n = 1/m and n = 2m: (1 + 1/m)^{2m} = ((1 + 1/m)^{m})², which tends to e². In general, (1 + k/n)^{n} tends to e^{k}.'
},
{
  id: 'g11-calc3-4', topic: 'calculus-3', paper: 1, n: 4, kind: 'short', marks: 3,
  stem: 'Find the area of the region enclosed between the curve y = x² and the line y = 2x.',
  label: 'Area =', accept: ['4/3', '1.33', '1.333'], show: '4/3',
  scheme: [
    { part: 'M1', text: 'intersections at x = 0 and x = 2' },
    { part: 'M1', text: '∫_{0}^{2} (2x − x²) dx' },
    { part: 'A1', text: '4 − 8/3 = 4/3' }
  ],
  why: 'The curves meet where x² = 2x, at x = 0 and x = 2. Between them the line is above the parabola, so the area is ∫_{0}^{2} (2x − x²) dx = [x² − x³/3] from 0 to 2 = 4 − 8/3 = 4/3.'
},
{
  id: 'g11-calc3-5', topic: 'calculus-3', paper: 1, n: 5, kind: 'mcq', marks: 2,
  stem: 'A curve is given by x = t², y = t³. Find dy/dx in terms of t.',
  options: { A: '3t/2', B: '2/(3t)', C: '3t²', D: '3/2' }, answer: 'A',
  why: 'For a curve given parametrically, dy/dx = (dy/dt) ÷ (dx/dt) = 3t² ÷ 2t = 3t/2, for t ≠ 0. B divides the wrong way round; C is only dy/dt.'
},
{
  id: 'g11-calc3-6', topic: 'calculus-3', paper: 1, n: 6, kind: 'short', marks: 3,
  stem: 'The region under y = √x from x = 0 to x = 4 is rotated through 360° about the x-axis. Find the volume of the solid formed, in terms of π.',
  label: 'Volume =', accept: ['8π'], show: '8π', hint: 'Type it in terms of π, for example 10π or 10pi.',
  scheme: [
    { part: 'M1', text: 'V = π ∫ y² dx = π ∫_{0}^{4} x dx' },
    { part: 'A1', text: 'π[x²/2] from 0 to 4' },
    { part: 'A1', text: '8π' }
  ],
  why: 'Each thin slice is a disc of radius y, so V = π ∫ y² dx. Here y² = x, and π ∫_{0}^{4} x dx = π × 16/2 = 8π. Squaring y first is the step most often missed.'
},
{
  id: 'g11-calc3-7', topic: 'calculus-3', paper: 3, n: 7, kind: 'structured', marks: 6,
  stem: 'The width of a river measured every 10 m: estimate the area with the trapezium rule.',
  body: 'A river runs 40 m between two bridges. Its width w metres is measured every 10 m along the bank:\n\ndistance x (m):   0    10   20   30   40\nwidth w (m):      2    6    8    7    3\n\n(a) Use the trapezium rule with these five values to estimate the area of the water surface between the bridges. [3]\n(b) Suggest how the estimate could be made more accurate. [1]\n(c) The river is 1.5 m deep throughout. Estimate the volume of water between the bridges. [2]',
  scheme: [
    { part: '(a)', text: 'h = 10  B1\n(10/2)[2 + 3 + 2(6 + 8 + 7)]  M1\n235 m²  A1' },
    { part: '(b)', text: 'measure the width at more points, using narrower strips  B1' },
    { part: '(c)', text: 'area × depth: 235 × 1.5  M1\n352.5 m³  A1' }
  ],
  why: '(a) The trapezium rule is (h/2)[first + last + 2 × (the middle values)] = 5 × (2 + 3 + 42) = 5 × 47 = 235 m².\n(b) More, narrower trapezia follow the curved bank more closely.\n(c) With a constant depth, volume = surface area × depth = 352.5 m³. In context questions, give units and say that the answers are estimates.'
},

// ---- 11.4B  Equations and inequalities -----------------------------------------------------
{
  id: 'g11-eq-1', topic: 'equations', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'Solve |2x − 3| = 5.',
  label: 'x =', set: true, accept: ['4,-1'], show: 'x = 4 or x = −1', hint: 'Give both values, separated by a comma.',
  scheme: [{ part: 'M1', text: '2x − 3 = 5 or 2x − 3 = −5' }, { part: 'A1', text: 'x = 4 or x = −1' }],
  why: 'The absolute value is 5 when the inside is 5 or −5. 2x − 3 = 5 gives x = 4, and 2x − 3 = −5 gives x = −1. Both check.'
},
{
  id: 'g11-eq-2', topic: 'equations', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'Solve the inequality |x − 1| < 3.',
  label: 'Answer', accept: ['-2<x<4', '(-2,4)', 'x∈(-2,4)'], show: '−2 < x < 4', hint: 'Write it as an inequality, for example 1 < x < 5.',
  scheme: [{ part: 'M1', text: '−3 < x − 1 < 3' }, { part: 'A1', text: '−2 < x < 4' }],
  why: '|x − 1| < 3 means x is less than 3 away from 1, so −3 < x − 1 < 3. Add 1 throughout: −2 < x < 4.'
},
{
  id: 'g11-eq-3', topic: 'equations', paper: 1, n: 3, kind: 'short', marks: 2,
  stem: 'Solve arcsin x = π/6.',
  label: 'x =', accept: ['1/2', '0.5'], show: 'x = 1/2',
  scheme: [{ part: 'M1', text: 'x = sin(π/6)' }, { part: 'A1', text: 'x = 1/2' }],
  why: 'arcsin x = π/6 means that x is the sine of π/6, so x = sin(π/6) = 1/2. Because π/6 lies in the range of arcsin, [−π/2, π/2], this is the only solution.'
},
{
  id: 'g11-eq-4', topic: 'equations', paper: 1, n: 4, kind: 'short', marks: 3,
  stem: 'Solve 2 sin x = 1 for 0 ≤ x ≤ 2π.',
  label: 'x =', set: true, accept: ['π/6,5π/6'], show: 'x = π/6 or x = 5π/6',
  hint: 'Give both values in terms of π, separated by a comma, for example π/3, 2π/3.',
  scheme: [{ part: 'M1', text: 'sin x = 1/2' }, { part: 'A1', text: 'x = π/6' }, { part: 'A1', text: 'x = 5π/6' }],
  why: 'sin x = 1/2 gives x = π/6. Sine is also positive in the second quadrant, so the other solution in the interval is π − π/6 = 5π/6.'
},
{
  id: 'g11-eq-5', topic: 'equations', paper: 1, n: 5, kind: 'short', marks: 3,
  stem: 'Solve the system 2^{x} · 2^{y} = 32, x − y = 1, and give the value of x.',
  label: 'x =', accept: ['3'], show: 'x = 3',
  scheme: [
    { part: 'M1', text: '2^{x+y} = 2⁵, so x + y = 5' },
    { part: 'M1', text: 'adds x − y = 1: 2x = 6' },
    { part: 'A1', text: 'x = 3 (and y = 2)' }
  ],
  why: 'Multiplying powers of 2 adds the exponents, so the first equation says x + y = 5. With x − y = 1, adding gives 2x = 6, so x = 3 and y = 2.'
},
{
  id: 'g11-eq-6', topic: 'equations', paper: 1, n: 6, kind: 'mcq', marks: 1,
  stem: 'arccos(−1/2) is equal to',
  options: { A: 'π/3', B: '2π/3', C: '−π/3', D: '5π/6' }, answer: 'B',
  why: 'arccos gives an angle between 0 and π. cos(π/3) = 1/2, and cosine is negative in the second quadrant, so arccos(−1/2) = π − π/3 = 2π/3. C is outside the range of arccos.'
},
{
  id: 'g11-eq-7', topic: 'equations', paper: 2, n: 7, kind: 'structured', marks: 6,
  stem: 'Solve 2cos²x − 3cos x + 1 = 0 in degrees, then the same equation in 2θ.',
  body: '(a) Solve 2cos²x − 3cos x + 1 = 0 for 0° ≤ x ≤ 360°. [4]\n(b) Hence solve 2cos²(2θ) − 3cos(2θ) + 1 = 0 for 0° ≤ θ ≤ 180°. [2]',
  scheme: [
    { part: '(a)', text: 'factorises: (2cos x − 1)(cos x − 1) = 0  M1\ncos x = 1/2 or cos x = 1  A1\nx = 60°, 300°  A1\nx = 0°, 360°  A1' },
    { part: '(b)', text: 'sets 2θ equal to each value of x, since 0° ≤ 2θ ≤ 360°  M1\nθ = 0°, 30°, 150°, 180°  A1' }
  ],
  why: '(a) It is a quadratic in cos x. cos x = 1/2 gives 60° and 360° − 60° = 300°; cos x = 1 gives 0° and 360°, both inside the interval.\n(b) With 0° ≤ θ ≤ 180°, the angle 2θ runs over 0° to 360°, exactly the interval of part (a). So 2θ = 0°, 60°, 300° or 360°, and θ = 0°, 30°, 150° or 180°.'
}

);
