/* Grade 12 tasks. AI-generated to the NIS grade 12 mathematics specification
   and the topics of the grade 12 course; not past paper questions.
   The format is the same as grade11.js. */
DELTA_QUESTIONS.push(

// ---- 12.1  Combinatorics and probability ----------------------------------------------
{
  id: 'g12-prob-1', topic: 'probability', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'How many different arrangements are there of the letters of the word BANANA?',
  label: 'Answer', accept: ['60'], show: '60',
  scheme: [{ part: 'M1', text: '6! divided by 3! for the A’s and 2! for the N’s' }, { part: 'A1', text: '720/12 = 60' }],
  why: 'Six letters give 6! = 720 orders if all were different. The three A’s can swap among themselves in 3! = 6 ways and the two N’s in 2! = 2 ways without changing the word, so divide: 720/(6 × 2) = 60.'
},
{
  id: 'g12-prob-2', topic: 'probability', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'A committee of 3 is chosen from 5 boys and 4 girls. How many different committees contain exactly 2 girls?',
  label: 'Answer', accept: ['30'], show: '30',
  scheme: [{ part: 'M1', text: '⁴C₂ × ⁵C₁' }, { part: 'A1', text: '6 × 5 = 30' }],
  why: 'Choose the 2 girls from 4: ⁴C₂ = 6 ways. The third member must be a boy, chosen from 5. Multiply: 6 × 5 = 30. The order of choosing does not matter in a committee, so these are combinations.'
},
{
  id: 'g12-prob-3', topic: 'probability', paper: 1, n: 3, kind: 'short', marks: 3,
  stem: 'P(A) = 0.5, P(B) = 0.4 and P(A ∪ B) = 0.7. Find P(A | B).',
  label: 'P(A | B) =', accept: ['0.5', '1/2'], show: '0.5',
  scheme: [
    { part: 'M1', text: 'P(A ∩ B) = P(A) + P(B) − P(A ∪ B)' },
    { part: 'A1', text: 'P(A ∩ B) = 0.2' },
    { part: 'A1', text: 'P(A | B) = 0.2/0.4 = 0.5' }
  ],
  why: 'The addition rule gives P(A ∩ B) = 0.5 + 0.4 − 0.7 = 0.2. Then P(A | B) = P(A ∩ B)/P(B) = 0.2/0.4 = 0.5. This equals P(A), so A and B are independent: knowing that B happened does not change the chance of A.'
},
{
  id: 'g12-prob-4', topic: 'probability', paper: 1, n: 4, kind: 'mcq', marks: 1,
  stem: 'A and B are independent events with P(A) = 0.3 and P(B) = 0.5. What is P(A ∪ B)?',
  options: { A: '0.8', B: '0.15', C: '0.65', D: '0.35' }, answer: 'C',
  why: 'Independent means P(A ∩ B) = 0.3 × 0.5 = 0.15, so P(A ∪ B) = 0.3 + 0.5 − 0.15 = 0.65. A forgets to take off the overlap (that only works for mutually exclusive events), B is the overlap itself and D is P(neither) = 0.7 × 0.5. Check: 1 − 0.35 = 0.65.'
},
{
  id: 'g12-prob-5', topic: 'probability', paper: 1, n: 5, kind: 'short', marks: 2,
  stem: 'A fair die is rolled 4 times. Find the probability of getting exactly two sixes.',
  label: 'Answer', accept: ['25/216', '150/1296', '0.116', '0.1157'], show: '25/216',
  scheme: [{ part: 'M1', text: '⁴C₂ (1/6)² (5/6)²' }, { part: 'A1', text: '6 × 25/1296 = 25/216' }],
  why: 'Each roll is a trial with P(six) = 1/6. One particular order, such as six, six, other, other, has probability (1/6)²(5/6)² = 25/1296. There are ⁴C₂ = 6 orders, so the answer is 150/1296 = 25/216 ≈ 0.116.'
},
{
  id: 'g12-prob-6', topic: 'probability', paper: 2, n: 6, kind: 'structured', marks: 8,
  stem: 'Arrangements of the letters of EXAMPLE: in total, with the two E’s together, the chance they are apart, and with a vowel at each end.',
  body: 'The 7 letters of the word EXAMPLE are arranged in a line.\n\n(a) Find the number of different arrangements. [1]\n(b) Find the number of arrangements in which the two E’s are next to each other. [2]\n(c) An arrangement is chosen at random. Find the probability that the two E’s are not next to each other. [2]\n(d) Find the number of arrangements that begin with a vowel and end with a vowel. [3]',
  scheme: [
    { part: '(a)', text: '7!/2! = 2520  B1' },
    { part: '(b)', text: 'treats EE as one block, giving 6 objects  M1\n6! = 720  A1' },
    { part: '(c)', text: '1 − 720/2520  M1\n= 5/7  A1' },
    { part: '(d)', text: 'considers the ends E…E, E…A and A…E  M1\n5! = 120 orders of the middle letters in each case  M1\n3 × 120 = 360  A1' }
  ],
  why: '(a) 7 letters with E twice: 7!/2! = 2520.\n(b) Glue the E’s into one block. The block and X, A, M, P, L are 6 different objects: 6! = 720. The block reads the same either way round, so there is no extra × 2.\n(c) P(together) = 720/2520 = 2/7, so P(apart) = 5/7.\n(d) The vowels are E, E and A. The ends can be E and E, E and A, or A and E: 3 cases. In each case the 5 letters left in the middle are all different, so there are 5! = 120 orders. 3 × 120 = 360.'
},
{
  id: 'g12-prob-7', topic: 'probability', paper: 3, n: 7, kind: 'structured', marks: 5,
  stem: 'A screening test: 2% of people have the condition, the test finds 95% of them and wrongly flags 10% of the rest. How likely is a positive result to be right?',
  body: 'A screening test is used for a condition that 2% of a population has. If a person has the condition, the test is positive with probability 0.95. If a person does not have it, the test is positive with probability 0.1.\n\nA person is chosen at random and tested.\n\n(a) Find the probability that the test is positive. [2]\n(b) The test is positive. Find the probability that the person has the condition. [2]\n(c) Comment on your answer to (b). [1]',
  scheme: [
    { part: '(a)', text: '0.02 × 0.95 + 0.98 × 0.1  M1\n= 0.117  A1' },
    { part: '(b)', text: '0.019/0.117  M1\n= 0.162 (3 s.f.)  A1' },
    { part: '(c)', text: 'most positive results are false alarms, because the condition is rare; a positive result needs a second test  B1' }
  ],
  why: '(a) Two paths on a tree diagram end in a positive test: has it and tests positive (0.02 × 0.95 = 0.019), or does not have it and tests positive (0.98 × 0.1 = 0.098). Total 0.117.\n(b) P(has it | positive) = 0.019/0.117 = 0.162.\n(c) Only about 16% of the people who test positive have the condition. The 10% false positive rate applies to the 98% who are healthy, which swamps the 2% who are ill. In 1000 people: about 19 true positives against 98 false ones.'
},

// ---- 12.1  Random variables ------------------------------------------------------
{
  id: 'g12-rv-1', topic: 'random-vars', paper: 1, n: 1, kind: 'short', marks: 3,
  stem: 'The discrete random variable X takes the values 1, 2, 3 and 4 with probabilities 0.1, 0.3, k and 0.2. Find E(X).',
  label: 'E(X) =', accept: ['2.7'], show: '2.7',
  scheme: [
    { part: 'B1', text: 'k = 1 − 0.6 = 0.4' },
    { part: 'M1', text: 'Σ x p = 0.1 + 0.6 + 3k + 0.8' },
    { part: 'A1', text: '2.7' }
  ],
  why: 'The probabilities add to 1, so k = 1 − (0.1 + 0.3 + 0.2) = 0.4. E(X) = 1(0.1) + 2(0.3) + 3(0.4) + 4(0.2) = 0.1 + 0.6 + 1.2 + 0.8 = 2.7.'
},
{
  id: 'g12-rv-2', topic: 'random-vars', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'E(X) = 3 and E(X²) = 11. Find Var(2X + 5).',
  label: 'Answer', accept: ['8'], show: '8',
  scheme: [{ part: 'M1', text: 'Var(X) = 11 − 3² = 2' }, { part: 'A1', text: 'Var(2X + 5) = 2² × 2 = 8' }],
  why: 'Var(X) = E(X²) − [E(X)]² = 11 − 9 = 2. Multiplying by 2 multiplies the variance by 2² = 4, and adding 5 shifts every value without changing the spread, so Var(2X + 5) = 4 × 2 = 8. The traps are 2 × 2 + 5 = 9 and 4 × 2 + 5 = 13.'
},
{
  id: 'g12-rv-3', topic: 'random-vars', paper: 1, n: 3, kind: 'short', marks: 2,
  stem: 'The continuous random variable X has probability density function f(x) = kx² for 0 ≤ x ≤ 3, and f(x) = 0 otherwise. Find k.',
  label: 'k =', accept: ['1/9', '0.111'], show: '1/9',
  scheme: [{ part: 'M1', text: '∫_{0}^{3} kx² dx = 1' }, { part: 'A1', text: '9k = 1, so k = 1/9' }],
  why: 'The total probability is the area under f, which must be 1: ∫_{0}^{3} kx² dx = k[x³/3]_{0}^{3} = 9k, and 9k = 1 gives k = 1/9.'
},
{
  id: 'g12-rv-4', topic: 'random-vars', paper: 1, n: 4, kind: 'mcq', marks: 1,
  stem: 'X has probability density function f(x) = 2x for 0 ≤ x ≤ 1, and f(x) = 0 otherwise. What is the median of X?',
  options: { A: '1/2', B: '2/3', C: '1/√2', D: '1/4' }, answer: 'C',
  why: 'The median m cuts the area in half: ∫_{0}^{m} 2x dx = m² = 1/2, so m = 1/√2 ≈ 0.707. B is the mean, ∫_{0}^{1} 2x² dx = 2/3. A is the middle of the interval, which is the median only when f is symmetric.'
},
{
  id: 'g12-rv-5', topic: 'random-vars', paper: 2, n: 5, kind: 'structured', marks: 8,
  stem: 'f(x) = k(4x − x²) on [0, 4]: find k, E(X), Var(X) and P(X < 1).',
  body: 'The continuous random variable X has probability density function\n\nf(x) = k(4x − x²) for 0 ≤ x ≤ 4, and f(x) = 0 otherwise.\n\n(a) Show that k = 3/32. [2]\n(b) State E(X), giving a reason. [1]\n(c) Find Var(X). [3]\n(d) Find P(X < 1). [2]',
  scheme: [
    { part: '(a)', text: 'k ∫_{0}^{4} (4x − x²) dx = k(32 − 64/3) = 1  M1\n(32/3)k = 1, so k = 3/32  A1' },
    { part: '(b)', text: 'E(X) = 2, because f is symmetric about x = 2  B1' },
    { part: '(c)', text: 'E(X²) = (3/32) ∫_{0}^{4} (4x³ − x⁴) dx  M1\n= (3/32)(256 − 1024/5) = 24/5  A1\nVar(X) = 24/5 − 2² = 4/5  A1' },
    { part: '(d)', text: '(3/32)[2x² − x³/3] from 0 to 1  M1\n= (3/32)(5/3) = 5/32  A1' }
  ],
  why: '(a) [2x² − x³/3]_{0}^{4} = 32 − 64/3 = 32/3, and k × 32/3 = 1.\n(b) 4x − x² = x(4 − x) is a parabola symmetric about x = 2, the middle of [0, 4], so the mean is 2. Working out ∫ x f(x) dx gives the same.\n(c) ∫_{0}^{4} (4x³ − x⁴) dx = [x⁴ − x⁵/5]_{0}^{4} = 256 − 204.8 = 51.2, and (3/32) × 51.2 = 4.8. Var(X) = 4.8 − 4 = 0.8.\n(d) (3/32)(2 − 1/3) = (3/32)(5/3) = 5/32 ≈ 0.156.'
},
{
  id: 'g12-rv-6', topic: 'random-vars', paper: 3, n: 6, kind: 'structured', marks: 8,
  stem: 'A school fair game costs 200 tenge and pays prizes of 1000 or 300 tenge. Find the expected profit, its spread, and the prize that makes the game fair.',
  body: 'At a school fair, a game costs 200 tenge to play. A player wins 1000 tenge with probability 0.1, wins 300 tenge with probability 0.3, and otherwise wins nothing. X is the player’s profit in tenge on one game: the prize minus the 200 tenge paid.\n\n(a) Write down the probability distribution of X. [2]\n(b) Find E(X) and say what it means for a player. [2]\n(c) Find the standard deviation of X. [2]\n(d) The organisers want the game to be fair, with E(X) = 0, by changing only the top prize. Find the new top prize. [2]',
  scheme: [
    { part: '(a)', text: 'values 800, 100 and −200  B1\nprobabilities 0.1, 0.3 and 0.6  B1' },
    { part: '(b)', text: 'E(X) = 80 + 30 − 120 = −10  M1\na player loses 10 tenge a game on average  A1' },
    { part: '(c)', text: 'E(X²) = 64000 + 3000 + 24000 = 91000, so Var(X) = 91000 − 100 = 90900  M1\nstandard deviation ≈ 301.5 tenge  A1' },
    { part: '(d)', text: '0.1(P − 200) + 30 − 120 = 0  M1\nP = 1100 tenge  A1' }
  ],
  why: '(a) Winning 1000 is a profit of 800, winning 300 is a profit of 100, and winning nothing is a loss of 200, with probability 1 − 0.1 − 0.3 = 0.6.\n(b) 800(0.1) + 100(0.3) − 200(0.6) = −10. Over many games a player loses 10 tenge a game, which is what the fair earns.\n(c) Var(X) = E(X²) − [E(X)]² = 91000 − 100 = 90900, so the standard deviation is √90900 ≈ 301.5 tenge. It is large next to the mean: single games vary a lot.\n(d) With top prize P the top profit is P − 200. 0.1(P − 200) + 30 − 120 = 0 gives P − 200 = 900, so P = 1100 tenge.'
},

// ---- 12.1  Binomial and Poisson distributions ---------------------------------------
{
  id: 'g12-bp-1', topic: 'binomial-poisson', paper: 2, n: 1, kind: 'short', marks: 2,
  stem: 'X ~ B(10, 0.3). Find P(X = 2), correct to 3 significant figures.',
  label: 'P(X = 2) =', accept: ['0.233', '0.2335'], show: '0.233',
  scheme: [{ part: 'M1', text: '¹⁰C₂ (0.3)² (0.7)⁸' }, { part: 'A1', text: '0.233' }],
  why: '¹⁰C₂ = 45, (0.3)² = 0.09 and (0.7)⁸ = 0.05765, so P(X = 2) = 45 × 0.09 × 0.05765 = 0.2335 ≈ 0.233. From cumulative tables: P(X ≤ 2) − P(X ≤ 1) = 0.3828 − 0.1493 = 0.2335.'
},
{
  id: 'g12-bp-2', topic: 'binomial-poisson', paper: 1, n: 2, kind: 'short', marks: 3,
  stem: 'X ~ B(n, p) has mean 6 and variance 4.2. Find n.',
  label: 'n =', accept: ['20'], show: '20',
  scheme: [
    { part: 'M1', text: 'np = 6 and np(1 − p) = 4.2' },
    { part: 'A1', text: '1 − p = 0.7, so p = 0.3' },
    { part: 'A1', text: 'n = 20' }
  ],
  why: 'Divide the variance by the mean: np(1 − p)/np = 1 − p = 4.2/6 = 0.7. So p = 0.3, and n = 6/0.3 = 20.'
},
{
  id: 'g12-bp-3', topic: 'binomial-poisson', paper: 2, n: 3, kind: 'short', marks: 3,
  stem: 'Calls reach a helpline at random, at an average rate of 3 every 10 minutes. Find the probability of exactly 2 calls in a 5-minute period, to 3 significant figures.',
  label: 'Answer', accept: ['0.251', '0.2510'], show: '0.251',
  scheme: [
    { part: 'B1', text: 'λ = 1.5 for 5 minutes' },
    { part: 'M1', text: 'e^{−1.5} × 1.5²/2!' },
    { part: 'A1', text: '0.251' }
  ],
  why: 'The rate scales with time: 3 per 10 minutes is 1.5 per 5 minutes, so X ~ Po(1.5). P(X = 2) = e^{−1.5} × 1.5²/2 = 0.22313 × 1.125 = 0.251. Using λ = 3 gives 0.224, the answer for 10 minutes.'
},
{
  id: 'g12-bp-4', topic: 'binomial-poisson', paper: 1, n: 4, kind: 'mcq', marks: 1,
  stem: 'Which of these is best modelled by a Poisson distribution?',
  options: {
    A: 'the number of heads in 20 tosses of a coin',
    B: 'the number of typing errors on a page of a long report',
    C: 'the heights of the students in a school',
    D: 'the number of red cards in a hand of 5 cards dealt from one pack'
  }, answer: 'B',
  why: 'Typing errors occur singly, at random and independently, at a roughly constant average rate per page: the conditions for Po(λ). A has a fixed number of trials with p = 0.5, so it is B(20, 0.5). C is continuous. In D the cards are dealt without replacement, so the trials are not independent.'
},
{
  id: 'g12-bp-5', topic: 'binomial-poisson', paper: 2, n: 5, kind: 'structured', marks: 7,
  stem: '1.5% of bulbs are faulty and a box holds 200. Use a Poisson approximation for the chance of at most 2, and of more than 4, faulty bulbs.',
  body: 'On average 1.5% of the light bulbs made by a factory are faulty. A box contains 200 bulbs, and X is the number of faulty bulbs in a box.\n\n(a) State the exact distribution of X. [1]\n(b) Explain why a Poisson distribution is a suitable approximation, and state its mean. [2]\n(c) Use the approximation to find P(X ≤ 2). [2]\n(d) Use the approximation to find P(X > 4). [2]',
  scheme: [
    { part: '(a)', text: 'X ~ B(200, 0.015)  B1' },
    { part: '(b)', text: 'n is large and p is small, with np < 5  B1\nλ = 200 × 0.015 = 3  B1' },
    { part: '(c)', text: 'e^{−3}(1 + 3 + 3²/2)  M1\n= 0.423  A1' },
    { part: '(d)', text: '1 − P(X ≤ 4)  M1\n= 1 − 0.815 = 0.185  A1' }
  ],
  why: '(a) Each of the 200 bulbs is faulty or not, independently, with p = 0.015.\n(b) With n = 200 large and p = 0.015 small, B(200, 0.015) is close to Po(np) = Po(3), which is much easier to work with.\n(c) e^{−3}(1 + 3 + 4.5) = 8.5 × 0.04979 = 0.423. The table gives P(X ≤ 2) = 0.4232.\n(d) P(X ≤ 4) = e^{−3}(1 + 3 + 4.5 + 4.5 + 3.375) = 16.375 × 0.04979 = 0.8153, so P(X > 4) = 0.185. "More than 4" starts at 5, so take away P(X ≤ 4), not P(X ≤ 5).'
},
{
  id: 'g12-bp-6', topic: 'binomial-poisson', paper: 3, n: 6, kind: 'structured', marks: 7,
  stem: '30% of students cycle to school. In samples of 8: exactly 3 cycle, at least 2 cycle, and at least 2 on each of 5 mornings.',
  body: 'In a large school, 30% of the students cycle to school. Each morning a random sample of 8 students is asked whether they cycled.\n\n(a) Find the probability that exactly 3 of the 8 cycled. [2]\n(b) Find the probability that at least 2 of the 8 cycled. [3]\n(c) A sample is taken on each of 5 mornings. Find the probability that at least 2 of the 8 cycled on every one of the 5 mornings. [2]',
  scheme: [
    { part: '(a)', text: '⁸C₃ (0.3)³ (0.7)⁵  M1\n= 0.254  A1' },
    { part: '(b)', text: '1 − P(X = 0) − P(X = 1)  M1\n(0.7)⁸ = 0.0576 and 8(0.3)(0.7)⁷ = 0.1977  A1\n= 0.745  A1' },
    { part: '(c)', text: '(0.7447)⁵  M1\n= 0.229  A1' }
  ],
  why: '(a) X ~ B(8, 0.3). ⁸C₃ = 56, so P(X = 3) = 56 × 0.027 × 0.16807 = 0.254.\n(b) "At least 2" is everything except 0 and 1: 1 − 0.05765 − 0.19765 = 0.745. The table gives P(X ≤ 1) = 0.2553 directly.\n(c) The mornings are independent, so multiply: 0.7447⁵ = 0.229. Keep the unrounded value from (b) for this step.'
},
{
  id: 'g12-bp-7', topic: 'binomial-poisson', paper: 1, n: 7, kind: 'short', marks: 2,
  stem: 'X ~ Po(2) and Y ~ Po(1.5) are independent. Find the exact value of P(X + Y = 0).',
  label: 'Answer', accept: ['e^-3.5', 'e^(-3.5)', 'e^{-3.5}', '1/e^3.5', 'e^(-7/2)'], show: 'e^{−3.5}',
  hint: 'Type powers with ^, for example e^-2.',
  scheme: [{ part: 'M1', text: 'X + Y ~ Po(3.5)' }, { part: 'A1', text: 'P(X + Y = 0) = e^{−3.5}' }],
  why: 'The sum of independent Poisson variables is Poisson with the means added: X + Y ~ Po(3.5), and P(X + Y = 0) = e^{−3.5} ≈ 0.0302. Or directly: both must be 0, so the answer is e^{−2} × e^{−1.5} = e^{−3.5}.'
},

// ---- 12.1  The normal distribution ---------------------------------------------------
{
  id: 'g12-norm-1', topic: 'normal', paper: 2, n: 1, kind: 'short', marks: 2,
  stem: 'X ~ N(50, 16). Find P(X < 56).',
  label: 'Answer', accept: ['0.9332', '0.933'], show: '0.9332',
  scheme: [{ part: 'M1', text: 'standardises: z = (56 − 50)/4 = 1.5' }, { part: 'A1', text: 'Φ(1.5) = 0.9332' }],
  why: 'N(50, 16) means the variance is 16, so σ = 4. z = 6/4 = 1.5, and the table gives Φ(1.5) = 0.9332. Dividing by 16 instead of 4 gives z = 0.375, the most common slip.'
},
{
  id: 'g12-norm-2', topic: 'normal', paper: 2, n: 2, kind: 'short', marks: 3,
  stem: 'X ~ N(50, 16). Find P(46 < X < 56).',
  label: 'Answer', accept: ['0.7745', '0.775', '0.774'], show: '0.7745',
  scheme: [
    { part: 'M1', text: 'z-values −1 and 1.5' },
    { part: 'M1', text: 'Φ(1.5) − Φ(−1), with Φ(−1) = 1 − Φ(1)' },
    { part: 'A1', text: '0.9332 − 0.1587 = 0.7745' }
  ],
  why: 'Standardise both ends: (46 − 50)/4 = −1 and (56 − 50)/4 = 1.5. The table has no negative z, so use symmetry: Φ(−1) = 1 − Φ(1) = 1 − 0.8413 = 0.1587. The answer is 0.9332 − 0.1587 = 0.7745.'
},
{
  id: 'g12-norm-3', topic: 'normal', paper: 1, n: 3, kind: 'mcq', marks: 1,
  stem: 'X ~ N(μ, σ²). Which of these is closest to P(X > μ + σ)?',
  options: { A: '0.34', B: '0.16', C: '0.84', D: '0.68' }, answer: 'B',
  why: 'About 68% of a normal distribution lies within one standard deviation of the mean. The other 32% is split equally between the two tails, so about 16% lies above μ + σ. Exactly: 1 − Φ(1) = 0.1587. A is the area between μ and μ + σ, and C is P(X < μ + σ).'
},
{
  id: 'g12-norm-4', topic: 'normal', paper: 2, n: 4, kind: 'short', marks: 3,
  stem: 'The heights of adults in a town are modelled as N(170, 8²), in cm. Find the height exceeded by the tallest 10%, to 1 decimal place.',
  label: 'h =', accept: ['180.3', '180.25', '180.26'], show: '180.3 cm',
  scheme: [
    { part: 'B1', text: 'z = 1.282, from Φ(z) = 0.9' },
    { part: 'M1', text: '(h − 170)/8 = 1.282' },
    { part: 'A1', text: '180.3' }
  ],
  why: 'The tallest 10% are above h, so 90% are below it: Φ(z) = 0.9 gives z = 1.282 from the table. Then h = 170 + 1.282 × 8 = 180.26 ≈ 180.3 cm. Using −1.282 gives 159.7 cm, the height below which the shortest 10% lie.'
},
{
  id: 'g12-norm-5', topic: 'normal', paper: 2, n: 5, kind: 'structured', marks: 7,
  stem: '10% of eggs weigh under 40 g and 5% over 60 g. Find the mean and standard deviation, then the proportion over 50 g.',
  body: 'The masses of eggs from a farm are modelled by a normal distribution. 10% of the eggs weigh less than 40 g and 5% weigh more than 60 g.\n\n(a) Find the mean μ and the standard deviation σ of the masses. [5]\n(b) Find the proportion of eggs that weigh more than 50 g. [2]',
  scheme: [
    { part: '(a)', text: 'z-values −1.282 and 1.645  B1 B1\n(40 − μ)/σ = −1.282 and (60 − μ)/σ = 1.645  M1\nsubtracting: 20 = 2.927σ, so σ = 6.83  A1\nμ = 48.8  A1' },
    { part: '(b)', text: 'z = (50 − 48.76)/6.833 = 0.18  M1\n1 − Φ(0.18) = 0.428 (accept 0.429)  A1' }
  ],
  why: '(a) 10% below 40 g: Φ(z) = 0.1 gives z = −1.282, so 40 is 1.282σ below the mean. 5% above 60 g: z = 1.645, so 60 is 1.645σ above it. Subtracting 40 = μ − 1.282σ from 60 = μ + 1.645σ gives 20 = 2.927σ, so σ = 6.833 g, and μ = 40 + 1.282 × 6.833 = 48.76 g.\n(b) z = (50 − 48.76)/6.833 = 0.18, and 1 − Φ(0.18) ≈ 0.428: about 43% of the eggs.'
},
{
  id: 'g12-norm-6', topic: 'normal', paper: 3, n: 6, kind: 'structured', marks: 7,
  stem: 'An airline sells 190 tickets for 180 seats, and each passenger turns up with probability 0.92. Estimate the chance that too many turn up.',
  body: 'An airline knows that 8% of passengers who book a flight do not turn up. For a flight with 180 seats it sells 190 tickets. Assume that passengers turn up independently, and let X be the number who turn up.\n\n(a) Explain why X can be approximated by a normal distribution. [1]\n(b) Find the mean and variance of that normal distribution. [2]\n(c) Use it to estimate the probability that more passengers turn up than there are seats. [4]',
  scheme: [
    { part: '(a)', text: 'X ~ B(190, 0.92) with np = 174.8 and n(1 − p) = 15.2, both more than 5  B1' },
    { part: '(b)', text: 'mean 174.8  B1\nvariance 190 × 0.92 × 0.08 = 13.984  B1' },
    { part: '(c)', text: 'P(X ≥ 181) with continuity correction: P(Y > 180.5)  M1\nz = (180.5 − 174.8)/√13.984  M1\nz = 1.524  A1\n1 − Φ(1.524) = 0.064  A1' }
  ],
  why: '(a) X is binomial, B(190, 0.92). A normal approximation is reasonable when np and n(1 − p) are both more than 5: here 174.8 and 15.2.\n(b) Mean np = 174.8 and variance np(1 − p) = 13.984, so σ = 3.740.\n(c) Too many means 181 or more. The count is discrete, so "181 or more" becomes Y > 180.5 for the continuous Y. z = 5.7/3.740 = 1.524, and 1 − Φ(1.524) = 1 − 0.9363 = 0.064. The exact binomial answer is 0.056: the approximation is rough because the distribution is lopsided with p this close to 1, but it still tells the airline that roughly 6% of these flights will be overbooked.'
},

// ---- 12.1, 12.3  Complex numbers ---------------------------------------------------
{
  id: 'g12-cx-1', topic: 'complex', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'z = 3 + 4i and w = 1 − 2i. Find zw in the form a + bi.',
  label: 'zw =', accept: ['11-2i', '-2i+11'], show: '11 − 2i', hint: 'Type it like 5 + 3i.',
  scheme: [{ part: 'M1', text: 'expands: 3 − 6i + 4i − 8i²' }, { part: 'A1', text: 'uses i² = −1: 11 − 2i' }],
  why: '(3 + 4i)(1 − 2i) = 3 − 6i + 4i − 8i². Since i² = −1, −8i² = +8, so the product is (3 + 8) + (−6 + 4)i = 11 − 2i. The usual slip is writing −8 instead of +8.'
},
{
  id: 'g12-cx-2', topic: 'complex', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'Express (1 + 5i)/(1 + i) in the form a + bi.',
  label: 'Answer', accept: ['3+2i', '2i+3'], show: '3 + 2i', hint: 'Type it like 5 + 3i.',
  scheme: [{ part: 'M1', text: 'multiplies the top and the bottom by the conjugate 1 − i' }, { part: 'A1', text: '(6 + 4i)/2 = 3 + 2i' }],
  why: 'Multiply the top and the bottom by 1 − i, the conjugate of the bottom. Top: (1 + 5i)(1 − i) = 1 − i + 5i − 5i² = 6 + 4i. Bottom: (1 + i)(1 − i) = 1 − i² = 2. So the quotient is 3 + 2i. Check: (3 + 2i)(1 + i) = 3 + 3i + 2i − 2 = 1 + 5i.'
},
{
  id: 'g12-cx-3', topic: 'complex', paper: 1, n: 3, kind: 'short', marks: 2,
  stem: 'z = −1 + √3 i. Find the exact value of arg z, where −π < arg z ≤ π.',
  label: 'arg z =', accept: ['2π/3', '2/3π', '(2π)/3'], show: '2π/3',
  scheme: [{ part: 'B1', text: 'z is in the second quadrant' }, { part: 'B1', text: 'arg z = π − π/3 = 2π/3' }],
  why: 'z has real part −1 and imaginary part √3, so it lies in the second quadrant. The angle with the negative real axis is arctan(√3/1) = π/3, so arg z = π − π/3 = 2π/3. A calculator’s arctan(√3/(−1)) gives −π/3, which points into the wrong quadrant. With |z| = 2: z = 2(cos 2π/3 + i sin 2π/3).'
},
{
  id: 'g12-cx-4', topic: 'complex', paper: 1, n: 4, kind: 'mcq', marks: 1,
  stem: 'On an Argand diagram, which of these is the locus |z − 2i| = |z + 4|?',
  options: { A: 'the line y = −2x − 3', B: 'the line y = 2x − 3', C: 'the line y = x/2 + 2', D: 'the circle with centre −4 and radius 2' }, answer: 'A',
  why: '|z − 2i| is the distance from z to the point (0, 2), and |z + 4| = |z − (−4)| is the distance to (−4, 0). Points the same distance from both lie on the perpendicular bisector. The midpoint is (−2, 1) and the segment has gradient 1/2, so the bisector has gradient −2: y − 1 = −2(x + 2), y = −2x − 3. B treats |z + 4| as the distance to +4, and C is the line through the two points.'
},
{
  id: 'g12-cx-5', topic: 'complex', paper: 1, n: 5, kind: 'short', marks: 3,
  stem: 'Use de Moivre’s theorem to find (1 + i)^{8}.',
  label: 'Answer', accept: ['16', '16+0i'], show: '16',
  scheme: [
    { part: 'M1', text: '1 + i = √2(cos π/4 + i sin π/4)' },
    { part: 'M1', text: '(√2)⁸(cos 2π + i sin 2π)' },
    { part: 'A1', text: '16' }
  ],
  why: '|1 + i| = √2 and arg(1 + i) = π/4. By de Moivre, (1 + i)⁸ = (√2)⁸(cos 8π/4 + i sin 8π/4) = 16(cos 2π + i sin 2π) = 16. A quick check: (1 + i)² = 2i, so (1 + i)⁸ = (2i)⁴ = 16i⁴ = 16.'
},
{
  id: 'g12-cx-6', topic: 'complex', paper: 2, n: 6, kind: 'structured', marks: 7,
  stem: 'z³ − 5z² + 9z − 5 = 0: show that 2 + i is a root, find the other roots, and the area of the triangle they form.',
  body: 'The cubic equation z³ − 5z² + 9z − 5 = 0 has real coefficients.\n\n(a) Show that z = 2 + i is a root. [2]\n(b) Hence find the other two roots. [3]\n(c) The three roots are plotted on an Argand diagram. Find the area of the triangle they form. [2]',
  scheme: [
    { part: '(a)', text: '(2 + i)² = 3 + 4i and (2 + i)³ = 2 + 11i  M1\n(2 + 11i) − 5(3 + 4i) + 9(2 + i) − 5 = 0, real and imaginary parts shown  A1' },
    { part: '(b)', text: '2 − i is a root, because the coefficients are real  B1\nquadratic factor (z − 2 − i)(z − 2 + i) = z² − 4z + 5  M1\nthird root z = 1  A1' },
    { part: '(c)', text: 'vertices (2, 1), (2, −1) and (1, 0): base 2, height 1  M1\narea = 1  A1' }
  ],
  why: '(a) Work out the powers first: (2 + i)² = 4 + 4i + i² = 3 + 4i and (2 + i)³ = (3 + 4i)(2 + i) = 6 + 3i + 8i + 4i² = 2 + 11i. Then 2 + 11i − 15 − 20i + 18 + 9i − 5: the real parts give 2 − 15 + 18 − 5 = 0 and the imaginary parts 11 − 20 + 9 = 0.\n(b) The coefficients are real, so the conjugate 2 − i is also a root. The two together give (z − 2)² − i² = z² − 4z + 5. Then z³ − 5z² + 9z − 5 = (z² − 4z + 5)(z − 1): compare the constant terms, 5 × (−1) = −5. The roots are 2 + i, 2 − i and 1.\n(c) The points 2 + i and 2 − i are 2 apart on the line x = 2, and the point 1 is 1 unit from that line. Area = ½ × 2 × 1 = 1.'
},
{
  id: 'g12-cx-7', topic: 'complex', paper: 3, n: 7, kind: 'structured', marks: 7,
  stem: 'Use de Moivre to show that cos 3θ ≡ 4cos³θ − 3cos θ, then solve 4cos³θ − 3cos θ = 1/2 for 0 ≤ θ ≤ π.',
  body: '(a) Use de Moivre’s theorem to show that cos 3θ ≡ 4cos³θ − 3cos θ. [4]\n(b) Hence solve the equation 4cos³θ − 3cos θ = 1/2 for 0 ≤ θ ≤ π, giving exact answers. [3]',
  scheme: [
    { part: '(a)', text: '(cos θ + i sin θ)³ = cos 3θ + i sin 3θ  B1\nexpands: cos³θ + 3i cos²θ sin θ − 3cos θ sin²θ − i sin³θ  M1\nreal parts: cos 3θ = cos³θ − 3cos θ sin²θ  A1\nreplaces sin²θ by 1 − cos²θ and reaches 4cos³θ − 3cos θ with no errors  A1' },
    { part: '(b)', text: 'cos 3θ = 1/2  M1\n3θ = π/3, 5π/3, 7π/3, because 3θ runs from 0 to 3π  M1\nθ = π/9, 5π/9, 7π/9  A1' }
  ],
  why: '(a) Write c = cos θ and s = sin θ. By de Moivre, cos 3θ + i sin 3θ = (c + is)³, and the binomial expansion gives c³ + 3c²(is) + 3c(is)² + (is)³ = c³ − 3cs² + i(3c²s − s³). The real parts are equal: cos 3θ = c³ − 3cs² = c³ − 3c(1 − c²) = 4c³ − 3c. The result is given in the question, so every step must be shown.\n(b) The left side is cos 3θ, so cos 3θ = 1/2. As θ runs over [0, π], 3θ runs over [0, 3π], which holds three solutions: π/3, 2π − π/3 = 5π/3 and 2π + π/3 = 7π/3. Dividing by 3: θ = π/9, 5π/9 and 7π/9. Stopping at π/3 and 5π/3 loses a root, so widen the interval before solving.'
},

// ---- 12.1  Series ------------------------------------------------------------------
{
  id: 'g12-ser-1', topic: 'series', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'Find the sum of the series Σ_{n=1}^{∞} 3(2/5)^{n}.',
  label: 'Sum =', accept: ['2'], show: '2',
  scheme: [{ part: 'B1', text: 'geometric with first term 6/5 and common ratio 2/5' }, { part: 'B1', text: 'S = (6/5)/(1 − 2/5) = 2' }],
  why: 'The series is geometric: the first term (n = 1) is 3 × 2/5 = 6/5, and each term is 2/5 of the one before. Since |2/5| < 1 it converges, to a/(1 − r) = (6/5)/(3/5) = 2. Taking the first term as 3 (the n = 0 term) gives 5, which starts in the wrong place.'
},
{
  id: 'g12-ser-2', topic: 'series', paper: 1, n: 2, kind: 'mcq', marks: 1,
  stem: 'Which of these series converges?',
  options: { A: 'Σ 1/n', B: 'Σ 1/n²', C: 'Σ n/(n + 1)', D: 'Σ (3/2)^{n}' }, answer: 'B',
  why: 'Σ 1/nᵖ converges only for p > 1, so Σ 1/n² converges (to π²/6), while the harmonic series Σ 1/n diverges although its terms tend to 0. In C the terms tend to 1, not 0, so it cannot converge. D is geometric with ratio 3/2 > 1.'
},
{
  id: 'g12-ser-3', topic: 'series', paper: 1, n: 3, kind: 'short', marks: 2,
  stem: 'Find the coefficient of x³ in the Maclaurin series of e^{2x}.',
  label: 'Coefficient', accept: ['4/3', '8/6'], show: '4/3',
  scheme: [{ part: 'M1', text: 'puts 2x into the series for eˣ: the x³ term is (2x)³/3!' }, { part: 'A1', text: '8/6 = 4/3' }],
  why: 'eᵘ = 1 + u + u²/2! + u³/3! + …, and with u = 2x the x³ term is (2x)³/3! = 8x³/6 = (4/3)x³. The slip to avoid is 2x³/3!, which forgets to cube the 2.'
},
{
  id: 'g12-ser-4', topic: 'series', paper: 1, n: 4, kind: 'short', marks: 3,
  stem: 'Expand √(1 − 2x) in ascending powers of x, up to and including the term in x².',
  label: 'Answer', accept: ['1-x-x^2/2', '1-x-1/2x^2', '1-x-0.5x^2', '1-x-(1/2)x^2', '1-x-x^2÷2'], show: '1 − x − x²/2',
  hint: 'Type it like 1 + 3x − 2x^2.',
  scheme: [
    { part: 'M1', text: 'binomial series with n = 1/2 and −2x in place of x' },
    { part: 'A1', text: '1 − x' },
    { part: 'A1', text: '− x²/2' }
  ],
  why: '(1 + u)^{1/2} = 1 + (1/2)u + (1/2)(−1/2)u²/2! + … = 1 + u/2 − u²/8 + …. Put u = −2x: 1 + (−2x)/2 − (−2x)²/8 = 1 − x − 4x²/8 = 1 − x − x²/2. The expansion is valid for |2x| < 1, that is |x| < 1/2.'
},
{
  id: 'g12-ser-5', topic: 'series', paper: 2, n: 5, kind: 'short', marks: 3,
  stem: 'Find the radius of convergence of the power series Σ_{n=1}^{∞} x^{n}/(n · 3^{n}).',
  label: 'R =', accept: ['3'], show: 'R = 3',
  scheme: [
    { part: 'M1', text: 'ratio |aₙ₊₁/aₙ| = |x| · n/(3(n + 1))' },
    { part: 'A1', text: 'the limit is |x|/3' },
    { part: 'A1', text: '|x|/3 < 1 gives R = 3' }
  ],
  why: 'Divide the (n + 1)th term by the nth: [x^{n+1}/((n + 1)3^{n+1})] ÷ [x^{n}/(n 3^{n})] = x · n/(3(n + 1)). As n → ∞, n/(n + 1) → 1, so the ratio tends to |x|/3. The series converges when |x|/3 < 1, that is |x| < 3. (At x = 3 it becomes Σ 1/n, which diverges; at x = −3 it converges. The radius is 3 either way.)'
},
{
  id: 'g12-ser-6', topic: 'series', paper: 2, n: 6, kind: 'structured', marks: 5,
  stem: 'Find the Maclaurin series of eˣ sin x up to the term in x³, and use it to find a limit.',
  body: '(a) Use the Maclaurin series for e^{x} and sin x to show that e^{x} sin x = x + x² + x³/3 + …. [3]\n(b) Hence find lim_{x→0} (e^{x} sin x − x)/x². [2]',
  scheme: [
    { part: '(a)', text: 'multiplies (1 + x + x²/2 + x³/6 + …)(x − x³/6 + …)  M1\nterms in x and x²: x + x²  A1\nx³ terms: x³/2 − x³/6 = x³/3  A1' },
    { part: '(b)', text: '(x² + x³/3 + …)/x² = 1 + x/3 + …  M1\nlimit 1  A1' }
  ],
  why: '(a) Only products up to x³ are needed. x × (1 + x + x²/2) gives x + x² + x³/2, and −x³/6 × 1 gives −x³/6. Together: x + x² + (1/2 − 1/6)x³ = x + x² + x³/3.\n(b) e^{x} sin x − x = x² + x³/3 + …, and dividing by x² gives 1 + x/3 + …, which tends to 1. L’Hôpital’s rule twice gives the same answer with more work.'
},
{
  id: 'g12-ser-7', topic: 'series', paper: 3, n: 7, kind: 'structured', marks: 7,
  stem: 'An engineer estimates √4.2 without a calculator from the Taylor series of √x about x = 4. Derive it and judge the error.',
  body: 'An engineer needs values of √x for x close to 4 and has no calculator.\n\n(a) Show that the Taylor series of f(x) = √x about x = 4, up to the term in (x − 4)², is\n2 + (x − 4)/4 − (x − 4)²/64. [4]\n(b) Use it to estimate √4.2, to 6 decimal places. [1]\n(c) A calculator gives √4.2 = 2.0493902 to 7 decimal places. Find the error in the estimate, and compare it with the next term of the series, (x − 4)³/512. [2]',
  scheme: [
    { part: '(a)', text: 'f(4) = 2  B1\nf′(x) = ½x^{−1/2} and f″(x) = −¼x^{−3/2}  M1\nf′(4) = 1/4 and f″(4) = −1/32  A1\nuses f(4) + f′(4)(x − 4) + f″(4)(x − 4)²/2! to reach the given result  A1' },
    { part: '(b)', text: '2 + 0.05 − 0.000625 = 2.049375  B1' },
    { part: '(c)', text: 'error = 2.0493902 − 2.049375 ≈ 1.5 × 10^{−5}  M1\nnext term (0.2)³/512 ≈ 1.6 × 10^{−5}, about the same size  A1' }
  ],
  why: '(a) f′(x) = 1/(2√x) and f″(x) = −1/(4x√x), so f′(4) = 1/4 and f″(4) = −1/32. The Taylor series about 4 is f(4) + f′(4)(x − 4) + f″(4)(x − 4)²/2!, and −1/32 ÷ 2 = −1/64.\n(b) With x − 4 = 0.2: 2 + 0.2/4 − 0.04/64 = 2 + 0.05 − 0.000625 = 2.049375.\n(c) 2.0493902 − 2.049375 = 0.0000152. The next term uses f‴(x) = 3/(8x²√x), so f‴(4) = 3/256 and the term is (3/256)(x − 4)³/3! = (x − 4)³/512, which is 0.0000156 at x = 4.2. The error is roughly the first term left out, which is why a few terms are enough close to x = 4.'
},

// ---- 12.2  Volumes of solids ---------------------------------------------------------
{
  id: 'g12-vol-1', topic: 'volumes', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'Find the volume of a cone with base radius 3 cm and height 4 cm. Leave π in your answer.',
  label: 'V =', accept: ['12π'], show: '12π cm³',
  scheme: [{ part: 'M1', text: 'V = (1/3)π × 3² × 4' }, { part: 'A1', text: '12π' }],
  why: 'V = (1/3)πr²h = (1/3) × π × 9 × 4 = 12π ≈ 37.7 cm³. Forgetting the 1/3 gives 36π, the volume of the cylinder with the same base and height: a cone is exactly a third of it.'
},
{
  id: 'g12-vol-2', topic: 'volumes', paper: 1, n: 2, kind: 'short', marks: 3,
  stem: 'A regular square pyramid has base edge 6 cm. The height of each triangular face (the slant height) is 5 cm. Find the volume of the pyramid.',
  label: 'V =', accept: ['48'], show: '48 cm³',
  scheme: [
    { part: 'M1', text: 'right triangle with half the base edge, 3, and the slant height, 5' },
    { part: 'A1', text: 'height = √(25 − 9) = 4' },
    { part: 'A1', text: 'V = (1/3) × 36 × 4 = 48' }
  ],
  why: 'The height of the pyramid, the slant height and half the base edge form a right triangle: the height runs from the apex down to the centre of the base, which is 3 cm from the middle of each base edge. h = √(5² − 3²) = 4 cm, so V = (1/3) × 6² × 4 = 48 cm³. Using 5 cm as the height gives 60, the usual mistake.'
},
{
  id: 'g12-vol-3', topic: 'volumes', paper: 1, n: 3, kind: 'mcq', marks: 1,
  stem: 'Two cones are similar, with heights in the ratio 2 : 3. The smaller cone has volume 16 cm³. What is the volume of the larger cone?',
  options: { A: '24 cm³', B: '36 cm³', C: '54 cm³', D: '81 cm³' }, answer: 'C',
  why: 'Lengths scale by k = 3/2, so volumes scale by k³ = 27/8, and 16 × 27/8 = 54 cm³. A uses k and B uses k², the scale factor for areas.'
},
{
  id: 'g12-vol-4', topic: 'volumes', paper: 1, n: 4, kind: 'short', marks: 3,
  stem: 'The region between y = √x, the x-axis and the line x = 4 is rotated through 360° about the x-axis. Find the exact volume of the solid formed.',
  label: 'V =', accept: ['8π'], show: '8π',
  scheme: [
    { part: 'M1', text: 'V = π ∫_{0}^{4} (√x)² dx = π ∫_{0}^{4} x dx' },
    { part: 'A1', text: '[x²/2] from 0 to 4 = 8' },
    { part: 'A1', text: '8π' }
  ],
  why: 'Square y first: (√x)² = x. Then π ∫_{0}^{4} x dx = π[x²/2]_{0}^{4} = 8π ≈ 25.1. The solid is a paraboloid, and its volume is half that of the cylinder around it (radius 2, length 4, volume 16π).'
},
{
  id: 'g12-vol-5', topic: 'volumes', paper: 2, n: 5, kind: 'structured', marks: 7,
  stem: 'A cylinder of height h fits inside a sphere of radius 6 cm. Find the height that gives the largest volume.',
  body: 'A cylinder of height h cm fits exactly inside a sphere of radius 6 cm, with the rims of both of its circular ends on the sphere.\n\n(a) Show that the volume of the cylinder is V = πh(36 − h²/4). [2]\n(b) Find the exact value of h for which V is greatest. [3]\n(c) Find the greatest volume, in the form kπ√3. [2]',
  scheme: [
    { part: '(a)', text: 'cross-section: r² + (h/2)² = 6²  M1\nV = πr²h = πh(36 − h²/4)  A1' },
    { part: '(b)', text: 'dV/dh = 36π − 3πh²/4  M1\n= 0 gives h² = 48  A1\nh = 4√3; d²V/dh² = −3πh/2 < 0 confirms a maximum  A1' },
    { part: '(c)', text: 'r² = 36 − 12 = 24  M1\nV = π × 24 × 4√3 = 96π√3  A1' }
  ],
  why: '(a) Cut through the axis. A radius of the sphere joins the centre to the rim of one end, making a right triangle with legs r and h/2 and hypotenuse 6. So r² = 36 − h²/4.\n(b) V = 36πh − πh³/4, and dV/dh = 36π − 3πh²/4 = 0 gives h² = 48, h = 4√3 ≈ 6.93 cm.\n(c) r² = 36 − 48/4 = 24, so V = π × 24 × 4√3 = 96π√3 ≈ 522 cm³: about 58% of the sphere’s 288π cm³.'
},
{
  id: 'g12-vol-6', topic: 'volumes', paper: 3, n: 6, kind: 'structured', marks: 6,
  stem: 'A metal cylinder is melted down and recast as small spheres. How many spheres are made, and how much does the surface area grow?',
  body: 'A workshop melts down a solid metal cylinder of radius 6 cm and height 10 cm and recasts all of the metal as solid spheres of radius 1.5 cm, to use as ball bearings.\n\n(a) Find the volume of the cylinder, in terms of π. [1]\n(b) Find the number of spheres made. [2]\n(c) Find the percentage increase in the total surface area. [3]',
  scheme: [
    { part: '(a)', text: 'πr²h = 360π cm³  B1' },
    { part: '(b)', text: 'one sphere: (4/3)π(1.5)³ = 4.5π  M1\n360π ÷ 4.5π = 80  A1' },
    { part: '(c)', text: 'cylinder: 2π(6²) + 2π(6)(10) = 192π  B1\nspheres: 80 × 4π(1.5)² = 720π  M1\n(720 − 192)/192 × 100 = 275%  A1' }
  ],
  why: '(a) π × 36 × 10 = 360π ≈ 1131 cm³.\n(b) Each sphere has volume (4/3)π × 3.375 = 4.5π. The volume of metal does not change, so 360π/4.5π = 80 spheres.\n(c) The cylinder has two ends (2 × 36π = 72π) and a curved side (2π × 6 × 10 = 120π): 192π in all. Each sphere has 4π × 2.25 = 9π, so 80 of them have 720π. The increase is 528π on 192π, which is 275%. Cutting a solid into smaller pieces always adds surface, which is why crushed ice melts faster than a block.'
},

// ---- 12.2  Second-order curves ---------------------------------------------------------
{
  id: 'g12-con-1', topic: 'conics', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'Find the eccentricity of the ellipse x²/25 + y²/9 = 1.',
  label: 'e =', accept: ['4/5', '0.8'], show: '4/5',
  scheme: [{ part: 'M1', text: 'c² = a² − b² = 25 − 9 = 16' }, { part: 'A1', text: 'e = c/a = 4/5' }],
  why: 'a = 5 and b = 3: the larger denominator is a², along the x-axis. c² = 25 − 9 = 16, so c = 4 and the foci are (±4, 0). Then e = c/a = 4/5. An ellipse always has 0 < e < 1; using c² = a² + b² (the hyperbola rule) gives √34/5 > 1, which cannot be right.'
},
{
  id: 'g12-con-2', topic: 'conics', paper: 1, n: 2, kind: 'short', marks: 2,
  stem: 'The hyperbola x²/16 − y²/9 = 1 has two asymptotes. Find the gradient of the one with a positive gradient.',
  label: 'Gradient', accept: ['3/4', '0.75'], show: '3/4',
  scheme: [{ part: 'B1', text: 'asymptotes y = ±(b/a)x with a = 4 and b = 3' }, { part: 'B1', text: '3/4' }],
  why: 'For x²/a² − y²/b² = 1 the asymptotes are y = ±(b/a)x. Here a = 4 and b = 3, so y = ±(3/4)x. The reason: for large x the 1 on the right hardly matters, and x²/16 = y²/9 gives y = ±3x/4.'
},
{
  id: 'g12-con-3', topic: 'conics', paper: 1, n: 3, kind: 'short', marks: 2,
  stem: 'Find the coordinates of the focus of the parabola y² = 12x.',
  label: 'Focus', accept: ['(3,0)', '(3;0)', '3,0'], show: '(3, 0)', hint: 'Type a point, for example (2, 5).',
  scheme: [{ part: 'B1', text: 'compares with y² = 2px, so p = 6 (or with y² = 4ax, so a = 3)' }, { part: 'B1', text: 'focus (3, 0)' }],
  why: 'In the form y² = 2px the focus is (p/2, 0). Here 2p = 12, so p = 6, the focus is (3, 0) and the directrix is x = −3. The form y² = 4ax gives the same point: a = 3 and the focus is (a, 0). A common slip is (12, 0) or (6, 0).'
},
{
  id: 'g12-con-4', topic: 'conics', paper: 1, n: 4, kind: 'mcq', marks: 1,
  stem: 'Which curve has the equation 4x² + 9y² − 16x + 18y − 11 = 0?',
  options: { A: 'an ellipse with centre (2, −1)', B: 'an ellipse with centre (−2, 1)', C: 'a hyperbola with centre (2, −1)', D: 'a circle with centre (2, −1)' }, answer: 'A',
  why: 'Complete the square: 4(x² − 4x) + 9(y² + 2y) = 11 gives 4(x − 2)² − 16 + 9(y + 1)² − 9 = 11, so 4(x − 2)² + 9(y + 1)² = 36, that is (x − 2)²/9 + (y + 1)²/4 = 1. Both squares have positive but different coefficients: an ellipse with centre (2, −1). B has the signs of the centre reversed. A circle needs equal coefficients and a hyperbola opposite signs.'
},
{
  id: 'g12-con-5', topic: 'conics', paper: 2, n: 5, kind: 'structured', marks: 8,
  stem: 'A hyperbola has foci (±5, 0) and vertices (±3, 0). Find its equation, eccentricity and asymptotes, and check the focal property at a point.',
  body: 'A hyperbola H has foci F₁(−5, 0) and F₂(5, 0), and vertices (−3, 0) and (3, 0).\n\n(a) Find the equation of H. [2]\n(b) State the eccentricity of H. [1]\n(c) Find the equations of the asymptotes of H. [1]\n(d) The point P(6, y), with y > 0, lies on H. Find y, and verify that |PF₁ − PF₂| = 6. [4]',
  scheme: [
    { part: '(a)', text: 'a = 3, c = 5, b² = c² − a² = 16  M1\nx²/9 − y²/16 = 1  A1' },
    { part: '(b)', text: 'e = 5/3  B1' },
    { part: '(c)', text: 'y = ±(4/3)x  B1' },
    { part: '(d)', text: '36/9 − y²/16 = 1, so y² = 48  M1\ny = 4√3  A1\nPF₁ = √(11² + 48) = 13 and PF₂ = √(1² + 48) = 7  M1\n13 − 7 = 6 = 2a  A1' }
  ],
  why: '(a) The vertices give a = 3 and the foci give c = 5. For a hyperbola c² = a² + b², so b² = 25 − 9 = 16.\n(b) e = c/a = 5/3, more than 1 as for every hyperbola.\n(c) y = ±(b/a)x = ±(4/3)x.\n(d) 4 − y²/16 = 1 gives y² = 48, y = 4√3. Then PF₁² = (6 + 5)² + 48 = 169 and PF₂² = (6 − 5)² + 48 = 49, so the distances are 13 and 7. They differ by 6 = 2a, the defining property of a hyperbola.'
},
{
  id: 'g12-con-6', topic: 'conics', paper: 3, n: 6, kind: 'structured', marks: 5,
  stem: 'A satellite dish has a parabolic cross-section 120 cm across and 15 cm deep. Where does the receiver go, and how wide is a deeper dish of the same shape?',
  body: 'A satellite dish has a parabolic cross-section. It is 120 cm across and 15 cm deep, and the receiver sits at the focus. Take the vertex of the dish as the origin and its axis as the x-axis, so that the cross-section is y² = 4ax.\n\n(a) Show that a = 60. [2]\n(b) State how far the receiver is from the vertex. [1]\n(c) A second dish has the same shape but is 20 cm deep. Find how wide it is, to the nearest centimetre. [2]',
  scheme: [
    { part: '(a)', text: 'the rim is at (15, 60)  M1\n60² = 4a × 15, so a = 60  A1' },
    { part: '(b)', text: '60 cm: the focus is (a, 0)  B1' },
    { part: '(c)', text: 'y² = 240 × 20 = 4800  M1\ny = 69.3, so the width is 2y ≈ 139 cm  A1' }
  ],
  why: '(a) The rim is 15 cm along the axis and 60 cm (half of 120) from it, so (15, 60) lies on the curve: 3600 = 60a and a = 60.\n(b) The focus of y² = 4ax is (a, 0), 60 cm from the vertex. Signals arriving parallel to the axis all reflect to that point.\n(c) The same shape means the same a, so y² = 240x. At x = 20, y² = 4800 and y = 69.28, so the dish is 138.6 ≈ 139 cm wide. The depth went up by a third but the width by only about 15%, because the width grows with the square root of the depth.'
},

// ---- 12.2  Differential equations -------------------------------------------------------
{
  id: 'g12-de-1', topic: 'diff-eq', paper: 1, n: 1, kind: 'short', marks: 3,
  stem: 'Solve dy/dx = 2xy, given that y = 3 when x = 0, and find the exact value of y when x = 1.',
  label: 'y =', accept: ['3e', '3e^1'], show: '3e',
  scheme: [
    { part: 'M1', text: 'separates: ∫ dy/y = ∫ 2x dx' },
    { part: 'A1', text: 'ln y = x² + C, and y(0) = 3 gives y = 3e^{x²}' },
    { part: 'A1', text: 'y(1) = 3e' }
  ],
  why: 'Divide by y and integrate: ln|y| = x² + C. At x = 0, y = 3, so C = ln 3 and y = 3e^{x²}. At x = 1, y = 3e ≈ 8.15. Check: dy/dx = 3e^{x²} × 2x = 2xy.'
},
{
  id: 'g12-de-2', topic: 'diff-eq', paper: 1, n: 2, kind: 'mcq', marks: 1,
  stem: 'Which is the general solution of dy/dx = y/x, for x > 0?',
  options: { A: 'y = Cx', B: 'y = x + C', C: 'y = Ce^{x}', D: 'y = ln x + C' }, answer: 'A',
  why: 'Separate: dy/y = dx/x, so ln|y| = ln x + c and y = Cx, with C = ±e^{c}. Check: y = Cx gives dy/dx = C = y/x. C solves dy/dx = y, and B and D come from integrating without separating the variables.'
},
{
  id: 'g12-de-3', topic: 'diff-eq', paper: 1, n: 3, kind: 'short', marks: 3,
  stem: 'Find the particular solution of dy/dx = e^{x − y} for which y = 0 when x = 0. Give y in terms of x.',
  label: 'y =', accept: ['x'], show: 'y = x',
  scheme: [
    { part: 'M1', text: 'writes e^{x − y} = e^{x}e^{−y} and separates: ∫ e^{y} dy = ∫ e^{x} dx' },
    { part: 'A1', text: 'e^{y} = e^{x} + C' },
    { part: 'A1', text: 'C = 0, so y = x' }
  ],
  why: 'e^{x − y} = e^{x}/e^{y}, so e^{y} dy = e^{x} dx and e^{y} = e^{x} + C. At (0, 0): 1 = 1 + C, so C = 0. Then e^{y} = e^{x} and y = x. Check: dy/dx = 1, and e^{x − x} = e⁰ = 1.'
},
{
  id: 'g12-de-4', topic: 'diff-eq', paper: 2, n: 4, kind: 'structured', marks: 6,
  stem: 'Solve dy/dx + y/x = x² (x > 0), with y = 1 when x = 1, using an integrating factor.',
  body: 'The differential equation\n\ndy/dx + y/x = x²,  x > 0,\n\nhas y = 1 when x = 1.\n\n(a) Find an integrating factor for the equation. [2]\n(b) Hence find y in terms of x. [4]',
  scheme: [
    { part: '(a)', text: 'μ = e^{∫(1/x) dx}  M1\nμ = e^{ln x} = x  A1' },
    { part: '(b)', text: 'multiplies through: d(xy)/dx = x³  M1\nxy = x⁴/4 + C  A1\nx = 1, y = 1 gives C = 3/4  M1\ny = x³/4 + 3/(4x)  A1' }
  ],
  why: '(a) The equation has the form dy/dx + P(x)y = Q(x) with P = 1/x, so μ = e^{ln x} = x.\n(b) Multiplied by x: x dy/dx + y = x³, and the left side is exactly the derivative of xy. Integrate: xy = x⁴/4 + C. At x = 1: 1 = 1/4 + C, so C = 3/4. Divide by x: y = x³/4 + 3/(4x). Check at x = 1: 1/4 + 3/4 = 1.'
},
{
  id: 'g12-de-5', topic: 'diff-eq', paper: 2, n: 5, kind: 'structured', marks: 7,
  stem: 'Use y = vx to solve dy/dx = (x² + y²)/(xy), with y = 2 when x = 1.',
  body: 'The differential equation\n\ndy/dx = (x² + y²)/(xy),  x > 0,\n\nhas y = 2 when x = 1.\n\n(a) Show that the substitution y = vx turns it into x dv/dx = 1/v. [3]\n(b) Hence find y² in terms of x. [4]',
  scheme: [
    { part: '(a)', text: 'dy/dx = v + x dv/dx  B1\nright side = (x² + v²x²)/(vx²) = (1 + v²)/v  M1\nv + x dv/dx = 1/v + v, so x dv/dx = 1/v  A1' },
    { part: '(b)', text: 'separates: ∫ v dv = ∫ (1/x) dx  M1\nv²/2 = ln x + C  A1\nx = 1, v = 2 gives C = 2  M1\ny² = 2x²(ln x + 2)  A1' }
  ],
  why: '(a) Differentiate y = vx with the product rule: dy/dx = v + x dv/dx. On the right every term has x², which cancels, leaving (1 + v²)/v = 1/v + v, and the v on each side cancels.\n(b) v dv = dx/x integrates to v²/2 = ln x + C. At x = 1, v = y/x = 2, so 2 = 0 + C. Then v² = 2 ln x + 4, and with v = y/x: y² = 2x² ln x + 4x² = 2x²(ln x + 2).'
},
{
  id: 'g12-de-6', topic: 'diff-eq', paper: 3, n: 6, kind: 'structured', marks: 7,
  stem: 'Water leaks from a tank with dh/dt = −k√h. Find k from the data, when the tank is empty, and the depth after 15 minutes.',
  body: 'Water leaks from a hole in the bottom of a tank. The depth of the water, h metres, t minutes after the leak starts satisfies\n\ndh/dt = −k√h,\n\nwhere k is a positive constant. At first the depth is 4 m, and after 10 minutes it is 1 m.\n\n(a) Solve the differential equation to show that 2√h = 4 − kt. [3]\n(b) Find k. [2]\n(c) Find the time at which the tank is empty. [1]\n(d) Find the depth of water after 15 minutes. [1]',
  scheme: [
    { part: '(a)', text: 'separates: ∫ h^{−1/2} dh = −∫ k dt  M1\n2√h = −kt + C  A1\nh = 4 at t = 0 gives C = 4  A1' },
    { part: '(b)', text: 't = 10, h = 1: 2 = 4 − 10k  M1\nk = 0.2  A1' },
    { part: '(c)', text: 'h = 0 when 4 − 0.2t = 0: t = 20 minutes  B1' },
    { part: '(d)', text: '2√h = 1, so h = 0.25 m  B1' }
  ],
  why: '(a) Divide by √h: h^{−1/2} dh = −k dt, and ∫ h^{−1/2} dh = 2h^{1/2}. So 2√h = −kt + C, and at t = 0, 2√4 = 4 = C.\n(b) 2√1 = 2 = 4 − 10k gives k = 0.2.\n(c) Empty means h = 0: 4 − 0.2t = 0, t = 20 minutes. The first 3 m take 10 minutes and the last 1 m takes another 10, because the water flows out more slowly as the depth, and so the pressure, falls.\n(d) At t = 15: 2√h = 4 − 3 = 1, √h = 0.5 and h = 0.25 m.'
},

// ---- 12.3  Numerical methods -----------------------------------------------------------
{
  id: 'g12-num-1', topic: 'numerical', paper: 1, n: 1, kind: 'mcq', marks: 1,
  stem: 'Which interval contains a root of x³ − 2x − 5 = 0?',
  options: { A: '[0, 1]', B: '[1, 2]', C: '[2, 3]', D: '[3, 4]' }, answer: 'C',
  why: 'Let f(x) = x³ − 2x − 5. Then f(0) = −5, f(1) = −6, f(2) = −1, f(3) = 16 and f(4) = 51. The only change of sign is between 2 and 3, and f is continuous (it is a polynomial), so the root lies in [2, 3].'
},
{
  id: 'g12-num-2', topic: 'numerical', paper: 2, n: 2, kind: 'short', marks: 2,
  stem: 'f(x) = x³ − 2x − 5 has a root in [2, 3]. Apply the bisection method twice, starting with this interval, and state the interval that then contains the root.',
  label: 'Interval', accept: ['[2,2.25]', '(2,2.25)', '2<x<2.25', '2<=x<=2.25', '[2;2.25]', '(2;2.25)'], show: '[2, 2.25]',
  hint: 'Type an interval, for example [1.5, 2].',
  scheme: [
    { part: 'M1', text: 'f(2.5) = 5.625 > 0 and f(2) < 0, so the root is in [2, 2.5]' },
    { part: 'A1', text: 'f(2.25) ≈ 1.89 > 0, so the root is in [2, 2.25]' }
  ],
  why: 'Bisection halves the interval each time and keeps the half where the sign changes. f(2) = −1 < 0. Step 1: f(2.5) = 15.625 − 5 − 5 = 5.625 > 0, so the sign changes in [2, 2.5]. Step 2: f(2.25) = 11.390625 − 4.5 − 5 ≈ 1.89 > 0, so the root is in [2, 2.25]. The root is 2.0946 to 4 decimal places, inside that interval.'
},
{
  id: 'g12-num-3', topic: 'numerical', paper: 2, n: 3, kind: 'short', marks: 3,
  stem: 'Use the iteration x_{n+1} = ∛(2x_{n} + 5), with x_{1} = 2, to find a root of x³ − 2x − 5 = 0 correct to 3 decimal places.',
  label: 'x =', accept: ['2.095'], show: '2.095',
  scheme: [
    { part: 'M1', text: 'x₂ = ∛9 = 2.0801' },
    { part: 'M1', text: 'continues: 2.0924, 2.0942, 2.0945, 2.0945' },
    { part: 'A1', text: '2.095' }
  ],
  why: 'x₂ = ∛(2 × 2 + 5) = ∛9 = 2.08008, then x₃ = 2.09235, x₄ = 2.09422, x₅ = 2.09450, x₆ = 2.09454. The values settle at 2.0945…, which is 2.095 to 3 decimal places. To be sure, check the sign change: f(2.0945) < 0 and f(2.0955) > 0. The limit α satisfies α = ∛(2α + 5), that is α³ = 2α + 5, so it is a root of the original equation.'
},
{
  id: 'g12-num-4', topic: 'numerical', paper: 2, n: 4, kind: 'structured', marks: 8,
  stem: 'eˣ = 3x: show a root lies in [1.5, 1.6], find it to 2 d.p. with xₙ₊₁ = ln(3xₙ), and explain why this iteration misses the other root.',
  body: 'The equation e^{x} = 3x has two roots, α and β, with α < β.\n\n(a) Show that β lies between 1.5 and 1.6. [2]\n(b) Show that the equation can be written as x = ln(3x). [1]\n(c) Use the iteration x_{n+1} = ln(3x_{n}) with x_{1} = 1.5 to find β correct to 2 decimal places. Give each iterate to 4 decimal places. [3]\n(d) The other root is α ≈ 0.62. Explain why this iteration cannot be used to find α. [2]',
  scheme: [
    { part: '(a)', text: 'f(x) = e^{x} − 3x: f(1.5) = −0.018 and f(1.6) = 0.153  M1\nchange of sign and f is continuous, so there is a root in [1.5, 1.6]  A1' },
    { part: '(b)', text: 'takes natural logarithms: x = ln(3x)  B1' },
    { part: '(c)', text: 'x₂ = 1.5041, x₃ = 1.5068  M1\ncontinues: 1.5086, 1.5098, 1.5106, …  M1\nβ = 1.51  A1' },
    { part: '(d)', text: 'F(x) = ln(3x) has F′(x) = 1/x  B1\n|F′(0.62)| ≈ 1.6 > 1, so the iterates move away from α  B1' }
  ],
  why: '(a) e^{1.5} = 4.4817 < 4.5 and e^{1.6} = 4.9530 > 4.8, so f changes sign.\n(b) Take ln of both sides of e^{x} = 3x.\n(c) The iterates climb slowly: 1.5041, 1.5068, 1.5086, 1.5098, 1.5106, 1.5111, … towards 1.5121, and from x₃ on they all round to 1.51. A sign-change check confirms it: f(1.505) ≈ −0.011 and f(1.515) ≈ +0.004, so β = 1.51 to 2 decimal places.\n(d) An iteration x = F(x) converges to a root only where |F′| < 1. Here F′(x) = 1/x, which is about 0.66 at β (so it converges, slowly) but about 1.6 at α. Started close to α, each step moves further away: started just above α, the sequence climbs to β instead.'
},
{
  id: 'g12-num-5', topic: 'numerical', paper: 1, n: 5, kind: 'short', marks: 3,
  stem: 'The iteration x_{n+1} = (x_{n}² + 6)/5 has two possible limits. Find them, and give the one the iteration can actually converge to.',
  label: 'Converges to', accept: ['2'], show: '2',
  scheme: [
    { part: 'M1', text: 'x = (x² + 6)/5 gives x² − 5x + 6 = 0, so x = 2 or x = 3' },
    { part: 'M1', text: 'F′(x) = 2x/5: F′(2) = 0.8 and F′(3) = 1.2' },
    { part: 'A1', text: 'only 2, since |F′(2)| < 1 < |F′(3)|' }
  ],
  why: 'A limit α must satisfy α = F(α): α² − 5α + 6 = 0, so α = 2 or α = 3. Whether the iteration settles there depends on the gradient of F(x) = (x² + 6)/5 at the root: F′(x) = 2x/5, which is 0.8 at 2 (less than 1, so the root attracts) and 1.2 at 3 (more than 1, so it repels). Starting at 2.9, for example, gives 2.882, 2.861, … drifting down to 2.'
},
{
  id: 'g12-num-6', topic: 'numerical', paper: 3, n: 6, kind: 'structured', marks: 7,
  stem: 'A hemispherical bowl of radius 10 cm holds 800 cm³ of water, with V = πh²(30 − h)/3. Find the depth by iteration.',
  body: 'A bowl is a hemisphere with inner radius 10 cm. When the water in it is h cm deep, its volume is\n\nV = πh²(30 − h)/3 cm³.\n\nThe bowl holds 800 cm³ of water.\n\n(a) Show that h satisfies h = √(2400 / (π(30 − h))). [2]\n(b) Show that 5.5 < h < 6. [2]\n(c) Use the iteration h_{n+1} = √(2400 / (π(30 − h_{n}))) with h_{1} = 6 to find the depth correct to 2 decimal places. [3]',
  scheme: [
    { part: '(a)', text: 'πh²(30 − h)/3 = 800, so h²(30 − h) = 2400/π  M1\ndivides by 30 − h and takes the positive square root  A1' },
    { part: '(b)', text: 'g(h) = h²(30 − h) − 2400/π: g(5.5) = 741.1 − 763.9 < 0 and g(6) = 864 − 763.9 > 0  M1\nchange of sign and g is continuous, so 5.5 < h < 6  A1' },
    { part: '(c)', text: 'h₂ = 5.6419  M1\nh₃ = 5.6003, h₄ = 5.5955, h₅ = 5.5949  M1\nh = 5.59 cm  A1' }
  ],
  why: '(a) Multiply by 3 and divide by π: h²(30 − h) = 2400/π. Divide by 30 − h (which is positive, as h ≤ 10) and take the positive root, since a depth is positive.\n(b) 2400/π = 763.94. At h = 5.5, h²(30 − h) = 30.25 × 24.5 = 741.1, too small; at h = 6 it is 36 × 24 = 864, too big.\n(c) The iterates are 5.6419, 5.6003, 5.5955, 5.5949, 5.5949, so the depth is 5.59 cm to 2 decimal places. Check: g(5.585) < 0 and g(5.595) > 0.'
},

// ---- 12.3  Sampling and hypothesis tests --------------------------------------------
{
  id: 'g12-hyp-1', topic: 'hypothesis', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'A sample of 5 values has Σx = 20 and Σx² = 90. Find an unbiased estimate of the population variance.',
  label: 's² =', accept: ['2.5', '5/2'], show: '2.5',
  scheme: [{ part: 'M1', text: '(Σx² − n x̄²)/(n − 1) with x̄ = 4' }, { part: 'A1', text: '(90 − 80)/4 = 2.5' }],
  why: 'x̄ = 20/5 = 4. The unbiased estimate divides by n − 1: s² = (90 − 5 × 16)/4 = 10/4 = 2.5. Dividing by n gives 2, the sample variance, which on average underestimates the population variance.'
},
{
  id: 'g12-hyp-2', topic: 'hypothesis', paper: 1, n: 2, kind: 'mcq', marks: 1,
  stem: 'In a hypothesis test, what is a Type I error?',
  options: { A: 'rejecting H₀ when H₀ is true', B: 'not rejecting H₀ when H₀ is false', C: 'rejecting H₀ when H₀ is false', D: 'using a one-tailed test when a two-tailed test was needed' }, answer: 'A',
  why: 'A Type I error is a false alarm: the result lands in the critical region by chance although H₀ is true. Its probability is the significance level, or for a discrete test the actual probability of the critical region. B is a Type II error, and C is the correct decision.'
},
{
  id: 'g12-hyp-3', topic: 'hypothesis', paper: 2, n: 3, kind: 'short', marks: 3,
  stem: 'A random sample of 64 observations has mean 52.3. The population standard deviation is 4. Find a 95% confidence interval for the population mean.',
  label: 'Interval', accept: ['(51.32,53.28)', '[51.32,53.28]', '(51.32;53.28)', '51.32<μ<53.28', '51.32to53.28', '(51.3,53.3)', '51.3<μ<53.3'], show: '(51.32, 53.28)',
  hint: 'Type an interval, for example (10.5, 12.1).',
  scheme: [
    { part: 'B1', text: 'σ/√n = 4/8 = 0.5' },
    { part: 'M1', text: '52.3 ± 1.96 × 0.5' },
    { part: 'A1', text: '(51.32, 53.28)' }
  ],
  why: 'The sample mean has standard error σ/√n = 4/√64 = 0.5. A 95% interval is x̄ ± 1.96 × 0.5 = 52.3 ± 0.98, which runs from 51.32 to 53.28. Using 1.645 would give a 90% interval.'
},
{
  id: 'g12-hyp-4', topic: 'hypothesis', paper: 2, n: 4, kind: 'short', marks: 2,
  stem: 'H₀: μ = 100 is tested against H₁: μ > 100. The population standard deviation is 15, and a sample of 36 has mean 104.5. Find the value of the test statistic z.',
  label: 'z =', accept: ['1.8'], show: '1.8',
  scheme: [{ part: 'M1', text: 'z = (104.5 − 100)/(15/√36)' }, { part: 'A1', text: '4.5/2.5 = 1.8' }],
  why: 'Under H₀, X̄ ~ N(100, 15²/36), whose standard deviation is 15/6 = 2.5. So z = 4.5/2.5 = 1.8. Since 1.8 > 1.645, the result is significant at the 5% level (one-tailed): there is evidence that μ > 100.'
},
{
  id: 'g12-hyp-5', topic: 'hypothesis', paper: 2, n: 5, kind: 'structured', marks: 8,
  stem: 'A seed company claims 80% of its seeds germinate, and 13 of 20 do. Test the claim at 5%, find the critical region and the chance of a Type I error.',
  body: 'A seed company claims that 80% of its seeds germinate. A gardener thinks the proportion is lower. She plants 20 seeds and 13 germinate.\n\n(a) State suitable null and alternative hypotheses. [1]\n(b) Test, at the 5% significance level, whether the gardener’s belief is supported. [4]\n(c) Find the critical region for this test. [2]\n(d) State the probability of a Type I error for this test. [1]',
  scheme: [
    { part: '(a)', text: 'H₀: p = 0.8,  H₁: p < 0.8  B1' },
    { part: '(b)', text: 'X ~ B(20, 0.8) under H₀  B1\nP(X ≤ 13) = 1 − P(Y ≤ 6) for Y ~ B(20, 0.2)  M1\n= 0.0867  A1\n0.0867 > 0.05: do not reject H₀; not enough evidence that fewer than 80% germinate  A1' },
    { part: '(c)', text: 'P(X ≤ 12) = 0.0321 < 0.05 and P(X ≤ 13) = 0.0867 > 0.05  M1\ncritical region X ≤ 12  A1' },
    { part: '(d)', text: '0.0321  B1' }
  ],
  why: '(a) The parameter is p, the proportion that germinate. The gardener expects it to be lower, so the test is one-tailed.\n(b) If H₀ is true, the number that germinate is X ~ B(20, 0.8). Tables rarely go past p = 0.5, so count the seeds that fail instead, Y ~ B(20, 0.2): X ≤ 13 is the same as Y ≥ 7, and P(Y ≥ 7) = 1 − 0.9133 = 0.0867. That is more than 5%, so 13 out of 20 is not unusual enough: do not reject the company’s claim.\n(c) P(X ≤ 12) = P(Y ≥ 8) = 1 − 0.9679 = 0.0321, which is under 5%, but adding 13 takes it over. So the critical region is X ≤ 12.\n(d) A Type I error means X lands in the critical region although p = 0.8. Its probability is P(X ≤ 12) = 0.0321, a little below the 5% level because X is discrete.'
},
{
  id: 'g12-hyp-6', topic: 'hypothesis', paper: 3, n: 6, kind: 'structured', marks: 7,
  stem: 'Bags of flour are filled to a mean of 1000 g with σ = 12 g. After a service, 25 bags average 994 g. Test at 5% whether the mean has changed.',
  body: 'A machine fills bags of flour. The masses are normally distributed with mean 1000 g and standard deviation 12 g. After the machine is serviced, a random sample of 25 bags has a mean mass of 994 g. Assume that the standard deviation has not changed.\n\n(a) State the null and alternative hypotheses for a test of whether the mean has changed. [1]\n(b) Carry out the test at the 5% significance level. [4]\n(c) Explain, in this context, what a Type I error would be. [1]\n(d) Explain why the test is valid although only 25 bags were weighed. [1]',
  scheme: [
    { part: '(a)', text: 'H₀: μ = 1000,  H₁: μ ≠ 1000  B1' },
    { part: '(b)', text: 'X̄ ~ N(1000, 12²/25), standard deviation 2.4  B1\nz = (994 − 1000)/2.4 = −2.5  M1\ncritical values ±1.96, or P(Z < −2.5) = 0.0062 < 0.025  B1\nreject H₀: there is evidence that the mean mass has changed  A1' },
    { part: '(c)', text: 'concluding that the mean has changed when it is still 1000 g  B1' },
    { part: '(d)', text: 'the masses are normal, so X̄ is exactly normal whatever the sample size  B1' }
  ],
  why: '(a) "Changed" can go either way, so the test is two-tailed, with 2.5% in each tail.\n(b) The sample mean has standard deviation 12/√25 = 2.4, so z = −6/2.4 = −2.5, which is beyond −1.96. The result is significant: reject H₀. There is evidence at the 5% level that the mean mass is no longer 1000 g.\n(c) A Type I error would be deciding that the machine now fills to a different mean, and perhaps stopping it, when it still fills to 1000 g.\n(d) The central limit theorem is needed only when the population is not normal. Here the masses are normal, so X̄ ~ N(μ, σ²/n) holds for any n.'
},

// ---- 12.3  Applications of calculus ---------------------------------------------------
{
  id: 'g12-app-1', topic: 'applied-calc', paper: 1, n: 1, kind: 'short', marks: 2,
  stem: 'A particle moves in a straight line. Its displacement after t seconds is s = t³ − 6t² + 9t metres. Find the times when it is at rest.',
  label: 't =', accept: ['1, 3'], set: true, show: 't = 1 and t = 3',
  hint: 'Type both values, for example 2 and 5.',
  scheme: [{ part: 'M1', text: 'v = ds/dt = 3t² − 12t + 9 = 0' }, { part: 'A1', text: '3(t − 1)(t − 3) = 0: t = 1 and t = 3' }],
  why: 'At rest means the velocity is 0. v = 3t² − 12t + 9 = 3(t² − 4t + 3) = 3(t − 1)(t − 3), so v = 0 at t = 1 s and at t = 3 s. Between those times v < 0, so the particle moves back towards its start.'
},
{
  id: 'g12-app-2', topic: 'applied-calc', paper: 1, n: 2, kind: 'short', marks: 3,
  stem: 'A spherical balloon is inflated at a constant rate of 50 cm³ per second. Find the rate at which its radius is increasing when the radius is 5 cm.',
  label: 'dr/dt =', accept: ['1/(2π)', '1/2π', '0.159', '0.1592', '0.16'], show: '1/(2π) ≈ 0.159 cm per second',
  scheme: [
    { part: 'B1', text: 'dV/dr = 4πr²' },
    { part: 'M1', text: 'dr/dt = (dV/dt) ÷ (dV/dr) = 50/(4π × 25)' },
    { part: 'A1', text: '1/(2π) cm/s' }
  ],
  why: 'V = (4/3)πr³, so dV/dr = 4πr², which is 100π when r = 5. By the chain rule dV/dt = (dV/dr)(dr/dt), so dr/dt = 50/(100π) = 1/(2π) ≈ 0.159 cm/s. The radius grows more and more slowly as the balloon gets bigger, because the same volume is spread over a larger surface.'
},
{
  id: 'g12-app-3', topic: 'applied-calc', paper: 1, n: 3, kind: 'mcq', marks: 1,
  stem: 'A particle oscillates with displacement x = 3 sin 2t. What is its greatest speed?',
  options: { A: '3', B: '6', C: '12', D: '3/2' }, answer: 'B',
  why: 'v = dx/dt = 6 cos 2t, which is largest when cos 2t = ±1, so the greatest speed is 6: the amplitude times ω, 3 × 2. A is the amplitude, C is the greatest acceleration (Aω² = 12) and D divides by ω instead of multiplying.'
},
{
  id: 'g12-app-4', topic: 'applied-calc', paper: 1, n: 4, kind: 'short', marks: 2,
  stem: 'y = x³. Use calculus to estimate the change in y when x increases from 2 to 2.01.',
  label: 'δy ≈', accept: ['0.12'], show: '0.12',
  scheme: [{ part: 'M1', text: 'δy ≈ 3x² δx' }, { part: 'A1', text: '3 × 4 × 0.01 = 0.12' }],
  why: 'dy/dx = 3x² = 12 at x = 2, and δx = 0.01, so δy ≈ 12 × 0.01 = 0.12. The exact change is 2.01³ − 8 = 0.120601, so the estimate is very close.'
},
{
  id: 'g12-app-5', topic: 'applied-calc', paper: 2, n: 5, kind: 'structured', marks: 7,
  stem: 'An open box is made from a 24 cm square of card by cutting squares of side x from the corners. Find the greatest volume.',
  body: 'An open box is made from a square sheet of card 24 cm by 24 cm. A square of side x cm is cut from each corner, and the sides are folded up.\n\n(a) Show that the volume of the box is V = 4x³ − 96x² + 576x. [2]\n(b) Find the value of x for which V is greatest, and show that it gives a maximum. [4]\n(c) Find the greatest volume. [1]',
  scheme: [
    { part: '(a)', text: 'base (24 − 2x) by (24 − 2x), height x  M1\nV = x(24 − 2x)², expanded to the given form  A1' },
    { part: '(b)', text: 'dV/dx = 12x² − 192x + 576  M1\n12(x − 4)(x − 12) = 0, so x = 4 (x = 12 leaves no box)  A1\nd²V/dx² = 24x − 192  M1\n= −96 < 0 at x = 4, so a maximum  A1' },
    { part: '(c)', text: 'V = 4 × 16² = 1024 cm³  B1' }
  ],
  why: '(a) Cutting x from both ends of each side leaves a square base of side 24 − 2x, and folding gives height x. x(576 − 96x + 4x²) = 4x³ − 96x² + 576x.\n(b) dV/dx = 12(x² − 16x + 48) = 12(x − 4)(x − 12). x must be between 0 and 12, and x = 12 gives a base of width 0, so x = 4. The second derivative there is 96 − 192 = −96, which is negative, so it is a maximum.\n(c) V = 4 × (24 − 8)² = 4 × 256 = 1024 cm³.'
},
{
  id: 'g12-app-6', topic: 'applied-calc', paper: 3, n: 6, kind: 'structured', marks: 6,
  stem: 'Water is pumped at 3 m³ per minute into a cone-shaped tank, vertex down, with top radius 3 m and height 6 m. How fast does the level rise at a depth of 4 m?',
  body: 'A tank is a cone with its vertex at the bottom. Its top radius is 3 m and its height is 6 m. Water is pumped in at 3 m³ per minute. When the water is h m deep, its volume is V m³.\n\n(a) Show that V = πh³/12. [2]\n(b) Find the rate at which the water level is rising when the depth is 4 m. Give your answer to 3 significant figures. [3]\n(c) Explain, without further calculation, why the level rises more slowly as the tank fills. [1]',
  scheme: [
    { part: '(a)', text: 'similar triangles: r/h = 3/6, so r = h/2  M1\nV = (1/3)π(h/2)²h = πh³/12  A1' },
    { part: '(b)', text: 'dV/dh = πh²/4 = 4π at h = 4  B1\ndh/dt = (dV/dt) ÷ (dV/dh) = 3/(4π)  M1\n≈ 0.239 m per minute  A1' },
    { part: '(c)', text: 'dV/dh = πh²/4 grows with h: the water surface is wider, so the same volume makes a thinner layer  B1' }
  ],
  why: '(a) The water forms a smaller cone similar to the tank, so its radius is half its depth: r = h/2. Then V = (1/3)πr²h = (1/3)π(h²/4)h = πh³/12.\n(b) dV/dh = 3πh²/12 = πh²/4, which is 4π at h = 4. dh/dt = 3 ÷ 4π = 0.2387… ≈ 0.239 m per minute.\n(c) dV/dh is the area of the water surface, πr². It grows as the water rises, so each cubic metre spreads over a larger area and raises the level less.'
}

);
