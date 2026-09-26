// Reference (справочник): the formulas, definitions and methods for each unit.
// Hand-written; in the exam a formula list and statistical tables are provided,
// so learn what is not on them as well as how to use what is.
//
// Each item: t = term, f = formula (optional), d = what it means or how to use it.
// Text may use x^{n}, a_{n} and [[1, 2], [3, 4]] (see assets/maths.js).
window.DELTA_REFERENCE = [

  { id: 'roots', title: 'nth roots and powers', area: 'algebra', topic: 'roots', items: [
    { t: 'nth root', f: 'ⁿ√a = b  means  bⁿ = a', d: 'For even n, a must be ≥ 0 and ⁿ√a means the non-negative root. For odd n every real a has exactly one root: ∛(−8) = −2.' },
    { t: 'Rules for roots', f: 'ⁿ√(ab) = ⁿ√a · ⁿ√b;   ⁿ√(a/b) = ⁿ√a / ⁿ√b;   (ⁿ√a)^{m} = ⁿ√(a^{m})', d: 'For a, b ≥ 0 when n is even.' },
    { t: 'Rational exponent', f: 'a^{m/n} = ⁿ√(a^{m}) = (ⁿ√a)^{m};   a^{−p} = 1/a^{p};   a⁰ = 1', d: 'Take the root first when working by hand: 16^{3/4} = (⁴√16)³ = 8.' },
    { t: 'Laws of indices', f: 'a^{p} · a^{q} = a^{p+q};   a^{p} ÷ a^{q} = a^{p−q};   (a^{p})^{q} = a^{pq};   (ab)^{p} = a^{p}b^{p}', d: 'Valid for any real p, q when a, b > 0.' },
    { t: 'Power function', f: 'y = x^{n}', d: 'Even n: graph symmetric about the y-axis (even function). Odd n: symmetric about the origin (odd function). Negative n: undefined at 0, with the axes as asymptotes.' },
    { t: 'Irrational equations', d: 'Isolate the root, raise both sides to the power n, solve, then check every root in the original equation: squaring creates extra roots. A square root is never negative, so √(…) = negative has no solution.' },
    { t: 'Irrational inequalities', f: '√f < g  ⇔  f ≥ 0, g > 0, f < g²', d: 'Always write the domain condition (what is under the root is ≥ 0) before squaring.' }
  ]},

  { id: 'polynomials', title: 'Algebraic expressions', area: 'algebra', topic: 'polynomials', items: [
    { t: 'Remainder theorem', f: 'f(x) ÷ (x − a) leaves remainder f(a)', d: 'For division by (ax − b) the remainder is f(b/a).' },
    { t: 'Factor theorem', f: '(x − a) is a factor of f(x)  ⇔  f(a) = 0', d: '"Show that (x − a) is a factor" means: substitute, and show the result is exactly 0.' },
    { t: 'Horner’s scheme', d: 'Synthetic division by (x − a): bring down the first coefficient, multiply by a, add to the next coefficient, repeat. The last number is the remainder; the others are the coefficients of the quotient.' },
    { t: 'Rational root theorem', d: 'For a polynomial with integer coefficients, any rational root p/q in lowest terms has p dividing the constant term and q dividing the leading coefficient. Test those candidates with the factor theorem.' },
    { t: 'Vieta’s formulas, quadratic', f: 'ax² + bx + c = 0:   α + β = −b/a,   αβ = c/a', d: '' },
    { t: 'Vieta’s formulas, cubic', f: 'ax³ + bx² + cx + d = 0:   α + β + γ = −b/a,   αβ + βγ + γα = c/a,   αβγ = −d/a', d: 'Useful identity: α² + β² + γ² = (α + β + γ)² − 2(αβ + βγ + γα).' },
    { t: 'Identities', f: 'a³ + b³ = (a + b)(a² − ab + b²);   a³ − b³ = (a − b)(a² + ab + b²);   (a + b)³ = a³ + 3a²b + 3ab² + b³', d: '' },
    { t: 'Undetermined coefficients', d: 'Write the unknown factor or quotient with letters for its coefficients, expand, and compare coefficients of each power of x.' }
  ]},

  { id: 'statistics', title: 'Elements of statistics', area: 'statistics', topic: 'statistics', items: [
    { t: 'Mean', f: 'x̄ = Σx / n;   for a frequency table x̄ = Σfx / Σf', d: 'Divide by the total frequency, not by the number of different values.' },
    { t: 'Median', d: 'The middle value once the data are in order; for an even number of values, the mean of the two middle ones. Its position is (n + 1)/2.' },
    { t: 'Mode and range', d: 'The mode is the most frequent value; the range is largest minus smallest.' },
    { t: 'Variance', f: 'σ² = Σ(x − x̄)² / n = Σx²/n − x̄²', d: 'With frequencies: Σf(x − x̄)² / Σf = Σfx²/Σf − x̄². The second form is quicker with a calculator.' },
    { t: 'Standard deviation', f: 'σ = √(variance)', d: 'Same units as the data. Measures spread about the mean.' },
    { t: 'Quartiles and IQR', f: 'IQR = Q₃ − Q₁', d: 'The spread of the middle half of the data. Like the median, it is not affected by extreme values.' },
    { t: 'Changing the data', d: 'Adding a constant k to every value adds k to the mean and median but leaves the variance unchanged. Multiplying by k multiplies the mean by k and the variance by k².' },
    { t: 'Which average', d: 'The mean uses every value but is pulled by outliers; the median resists outliers and suits skewed data; the mode suits categories.' }
  ]},

  { id: 'solids', title: 'Polyhedra and solids of revolution', area: 'geometry', topic: 'solids', items: [
    { t: 'Prism', f: 'lateral area = perimeter of base × height;   V = base area × height', d: '' },
    { t: 'Regular pyramid', f: 'lateral area = ½ × perimeter of base × apothem;   V = ⅓ × base area × height', d: 'The apothem is the height of a triangular face, not the height of the pyramid.' },
    { t: 'Frustum of a pyramid', f: 'lateral area = ½ (P₁ + P₂) × apothem', d: 'P₁ and P₂ are the perimeters of the two bases.' },
    { t: 'Cylinder', f: 'curved area = 2πrh;   total = 2πr(r + h);   V = πr²h', d: '' },
    { t: 'Cone', f: 'curved area = πrl;   total = πr(r + l);   V = ⅓πr²h;   l² = r² + h²', d: 'l is the slant height. Mixing up l and h is the commonest slip.' },
    { t: 'Frustum of a cone', f: 'curved area = π(R + r)l;   V = ⅓πh(R² + Rr + r²)', d: 'The slant height comes from a right triangle with legs h and R − r.' },
    { t: 'Sphere', f: 'S = 4πr²;   V = (4/3)πr³', d: '' },
    { t: 'Inscribed and circumscribed solids', d: 'Draw the cross-section through the axis: a sphere in a cylinder or cone becomes a circle in a rectangle or triangle, and the radii follow from plane geometry.' }
  ]},

  { id: 'calculus-2', title: 'Calculus II', area: 'calculus', topic: 'calculus-2', items: [
    { t: 'Power rule', f: 'd/dx (x^{n}) = nx^{n−1}', d: 'For any real n, including fractions and negatives. Rewrite roots and fractions as powers first: 1/√x = x^{−1/2}.' },
    { t: 'Sums and constants', f: '(f + g)′ = f′ + g′;   (kf)′ = kf′', d: '' },
    { t: 'Higher derivatives', f: 'f″(x) = d/dx (f′(x))', d: '' },
    { t: 'Tangent line', f: 'y − f(a) = f′(a)(x − a)', d: 'The gradient of the tangent at x = a is f′(a).' },
    { t: 'Increasing and decreasing', d: 'f is increasing where f′(x) > 0 and decreasing where f′(x) < 0.' },
    { t: 'Stationary points', f: 'f′(x) = 0', d: 'Nature: f″ < 0 maximum, f″ > 0 minimum; if f″ = 0, check the sign of f′ on either side.' },
    { t: 'Greatest and least values', d: 'On a closed interval, compare the values at the stationary points inside it with the values at both ends.' },
    { t: 'Antiderivative', f: '∫ ax^{n} dx = a x^{n+1}/(n + 1) + C,   n ≠ −1', d: 'Always add the constant C to an indefinite integral.' }
  ]},

  { id: 'exp-log', title: 'Exponential and logarithmic functions', area: 'algebra', topic: 'exp-log', items: [
    { t: 'Exponential function', f: 'y = a^{x},  a > 0, a ≠ 1', d: 'Always positive; passes through (0, 1); increasing for a > 1, decreasing for 0 < a < 1; the x-axis is an asymptote.' },
    { t: 'Logarithm', f: 'log_{a} b = c  ⇔  a^{c} = b', d: 'Defined for b > 0, a > 0, a ≠ 1. lg is base 10, ln is base e.' },
    { t: 'Log laws', f: 'log_{a}(xy) = log_{a} x + log_{a} y;   log_{a}(x/y) = log_{a} x − log_{a} y;   log_{a} x^{k} = k log_{a} x', d: '' },
    { t: 'Change of base', f: 'log_{a} b = log_{c} b / log_{c} a', d: 'Also log_{a} b = 1 / log_{b} a.' },
    { t: 'Logarithmic function', f: 'y = log_{a} x', d: 'The inverse of a^{x}: its mirror image in y = x. Passes through (1, 0); the y-axis is an asymptote.' },
    { t: 'Exponential equations', d: 'Write both sides as powers of one base, or substitute t = a^{x} to get a quadratic. Reject any t ≤ 0, since a^{x} is always positive.' },
    { t: 'Logarithmic equations', d: 'Combine into a single log, remove it, solve, then check every root makes each original log’s argument positive.' },
    { t: 'Inequalities', d: 'For a > 1 the direction is kept when removing a^{x} or log_{a}; for 0 < a < 1 it is reversed. Include the domain condition for logs.' }
  ]},

  { id: 'matrices', title: 'Matrices and determinants', area: 'algebra', topic: 'matrices', items: [
    { t: 'Matrix product', d: 'The entry in row i, column j of AB is row i of A times column j of B. AB exists only if A has as many columns as B has rows, and in general AB ≠ BA.' },
    { t: 'Identity', f: 'I = [[1, 0], [0, 1]];   AI = IA = A', d: '' },
    { t: '2 × 2 determinant', f: 'det [[a, b], [c, d]] = ad − bc', d: '' },
    { t: '3 × 3 determinant', f: 'det = a₁₁(a₂₂a₃₃ − a₂₃a₃₂) − a₁₂(a₂₁a₃₃ − a₂₃a₃₁) + a₁₃(a₂₁a₃₂ − a₂₂a₃₁)', d: 'Expansion along the first row, with signs + − +. Any row or column works; choose one with zeros.' },
    { t: 'Inverse of a 2 × 2 matrix', f: '[[a, b], [c, d]]^{−1} = 1/(ad − bc) × [[d, −b], [−c, a]]', d: 'Exists only when det ≠ 0. Check: AA^{−1} = I.' },
    { t: 'Singular matrix', d: 'det A = 0: no inverse. The system AX = B then has no solution or infinitely many.' },
    { t: 'Cramer’s rule', f: 'x = Δₓ/Δ,   y = Δᵧ/Δ', d: 'Δ is the determinant of the coefficients; Δₓ replaces the x column with the right-hand sides. Works when Δ ≠ 0.' },
    { t: 'Solving with the inverse', f: 'AX = B  ⇒  X = A^{−1}B', d: 'Multiply on the left: the order matters.' }
  ]},

  { id: 'vectors', title: 'Vectors and coordinates', area: 'geometry', topic: 'vectors', items: [
    { t: 'Magnitude', f: '|a| = √(a₁² + a₂² + a₃²)', d: '' },
    { t: 'Vector between points', f: 'AB = B − A', d: 'The midpoint of AB is (A + B)/2.' },
    { t: 'Scalar product', f: 'a · b = a₁b₁ + a₂b₂ + a₃b₃ = |a||b| cos θ', d: 'a · b = 0 means perpendicular. Gives the angle between two vectors.' },
    { t: 'Vector product', f: 'a × b = (a₂b₃ − a₃b₂, a₃b₁ − a₁b₃, a₁b₂ − a₂b₁)', d: 'Perpendicular to both a and b; |a × b| = |a||b| sin θ is the area of the parallelogram on a and b, so a triangle has half of it. b × a = −(a × b).' },
    { t: 'Scalar triple product', f: '(a × b) · c = det [[a₁, a₂, a₃], [b₁, b₂, b₃], [c₁, c₂, c₃]]', d: 'Its absolute value is the volume of the parallelepiped on a, b, c; zero means the three vectors are coplanar.' },
    { t: 'Line', f: 'r = a + t d;   (x − x₀)/d₁ = (y − y₀)/d₂ = (z − z₀)/d₃', d: 'a is a point on the line, d its direction.' },
    { t: 'Plane', f: 'ax + by + cz + d = 0', d: '(a, b, c) is a normal vector. Through three points: take the vector product of two edge vectors as the normal.' },
    { t: 'Distance from a point to a plane', f: '|ax₀ + by₀ + cz₀ + d| / √(a² + b² + c²)', d: '' },
    { t: 'Angles', d: 'Between lines: the angle between their directions (use cos). Between planes: the angle between their normals. Between a line and a plane: sin φ = |d · n| / (|d||n|).' },
    { t: 'Sphere', f: '(x − a)² + (y − b)² + (z − c)² = R²', d: 'Centre (a, b, c), radius R. From the expanded form, complete the square in each variable.' }
  ]},

  { id: 'calculus-3', title: 'Calculus III', area: 'calculus', topic: 'calculus-3', items: [
    { t: 'The number e', f: 'lim_{n→∞} (1 + 1/n)^{n} = e ≈ 2.718;   lim_{n→∞} (1 + k/n)^{n} = e^{k}', d: 'The second remarkable limit.' },
    { t: 'Exponential and log derivatives', f: '(e^{x})′ = e^{x};   (a^{x})′ = a^{x} ln a;   (ln x)′ = 1/x;   (log_{a} x)′ = 1/(x ln a)', d: '' },
    { t: 'Chain rule', f: 'd/dx f(g(x)) = f′(g(x)) · g′(x)', d: 'Example: (e^{3x})′ = 3e^{3x}; (ln(x² + 1))′ = 2x/(x² + 1).' },
    { t: 'L’Hôpital’s rule', f: 'lim f/g = lim f′/g′', d: 'Only for the forms 0/0 or ∞/∞. Differentiate top and bottom separately, not as a quotient.' },
    { t: 'Parametric derivative', f: 'dy/dx = (dy/dt) / (dx/dt)', d: '' },
    { t: 'Implicit differentiation', d: 'Differentiate both sides with respect to x, treating y as a function of x: d/dx (y²) = 2y dy/dx. Then solve for dy/dx.' },
    { t: 'Standard integrals', f: '∫ 1/x dx = ln|x| + C;   ∫ e^{kx} dx = e^{kx}/k + C;   ∫ a^{x} dx = a^{x}/ln a + C', d: '' },
    { t: 'Integration by substitution', d: 'Set u = g(x), replace dx by du/g′(x), integrate in u, and change the limits (or substitute back).' },
    { t: 'Integration by parts', f: '∫ u dv = uv − ∫ v du', d: 'Choose u to become simpler when differentiated: for x e^{x} or x ln x, u = x and u = ln x respectively.' },
    { t: 'Definite integral and area', f: '∫_{a}^{b} f(x) dx = F(b) − F(a);   area between curves = ∫_{a}^{b} (upper − lower) dx', d: 'Area below the x-axis comes out negative: split the integral at the roots.' },
    { t: 'Volume of revolution', f: 'V = π ∫_{a}^{b} y² dx', d: 'About the x-axis. Square y before integrating.' },
    { t: 'Arc length', f: 'L = ∫_{a}^{b} √(1 + (y′)²) dx', d: '' },
    { t: 'Trapezium rule', f: '∫_{a}^{b} y dx ≈ (h/2)[y₀ + yₙ + 2(y₁ + … + yₙ₋₁)],   h = (b − a)/n', d: 'Overestimates where the curve bends upwards (concave up), underestimates where it bends downwards. More strips give a better estimate.' },
    { t: 'Improper integral', f: '∫_{a}^{∞} f(x) dx = lim_{t→∞} ∫_{a}^{t} f(x) dx', d: 'Converges if the limit is finite: ∫_{1}^{∞} 1/x² dx = 1, but ∫_{1}^{∞} 1/x dx diverges.' }
  ]},

  { id: 'equations', title: 'Equations and inequalities', area: 'algebra', topic: 'equations', items: [
    { t: 'Modulus', f: '|a| = a for a ≥ 0,  −a for a < 0', d: 'The distance of a from 0. |f(x)| = a (a ≥ 0) gives f(x) = a or f(x) = −a.' },
    { t: 'Modulus inequalities', f: '|f| < a  ⇔  −a < f < a;   |f| > a  ⇔  f < −a or f > a', d: '' },
    { t: 'Inverse trigonometric functions', f: 'arcsin x ∈ [−π/2, π/2];   arccos x ∈ [0, π];   arctan x ∈ (−π/2, π/2)', d: 'arcsin(−x) = −arcsin x, but arccos(−x) = π − arccos x.' },
    { t: 'General solutions', f: 'sin x = a: x = (−1)^{n} arcsin a + πn;   cos x = a: x = ±arccos a + 2πn;   tan x = a: x = arctan a + πn', d: 'Then pick out the values that lie in the interval asked for.' },
    { t: 'Key identities', f: 'sin²x + cos²x = 1;   sin 2x = 2 sin x cos x;   cos 2x = cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x', d: 'Use them to turn an equation into one trigonometric function, often a quadratic in it.' },
    { t: 'Exact values', f: 'sin 30° = 1/2,   sin 45° = √2/2,   sin 60° = √3/2;   tan 30° = √3/3,   tan 45° = 1,   tan 60° = √3', d: 'Cosine takes the same values in the reverse order: cos 30° = √3/2, cos 60° = 1/2.' },
    { t: 'Systems of equations', d: 'Substitute, or use new variables (u = 2^{x}, v = log y) to reach a system you know. For irrational and logarithmic systems, check the answers against the original domain.' }
  ]},

  // ---- grade 12 ----

  { id: 'probability', title: 'Combinatorics and probability', area: 'statistics', topic: 'probability', items: [
    { t: 'Counting principle', d: 'If one choice can be made in m ways and then a second in n ways, the two together can be made in mn ways.' },
    { t: 'Permutations', f: 'n objects in a row: n!;   r of n in order: ⁿPᵣ = n!/(n − r)!', d: '0! = 1. Order matters: ABC and CBA are different.' },
    { t: 'Repeated objects', f: 'n!/(p! q! …)', d: 'For n objects of which p are alike, q are alike, and so on. BANANA: 6!/(3! 2!) = 60.' },
    { t: 'Combinations', f: 'ⁿCᵣ = n!/(r!(n − r)!)', d: 'Order does not matter: choosing a team, a committee, a hand of cards. ⁿCᵣ = ⁿCₙ₋ᵣ.' },
    { t: 'Restrictions', d: 'Objects together: glue them into one block, arrange the blocks, then multiply by the arrangements inside the block. Objects apart: total minus together, or arrange the others first and place the separated ones in the gaps.' },
    { t: 'Arrangements in a circle', f: '(n − 1)!', d: 'Fix one person and arrange the rest relative to them.' },
    { t: 'Probability rules', f: 'P(A′) = 1 − P(A);   P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', d: 'Mutually exclusive: P(A ∩ B) = 0. "At least one" is usually quickest as 1 − P(none).' },
    { t: 'Independent events', f: 'P(A ∩ B) = P(A) · P(B)', d: 'To show independence, check this equation with numbers. Independent is not the same as mutually exclusive.' },
    { t: 'Conditional probability', f: 'P(A | B) = P(A ∩ B) / P(B)', d: 'The probability of A given that B has happened. On a tree diagram, divide the path to "A and B" by the total of the paths through B.' },
    { t: 'Bernoulli trials', f: 'P(k successes in n trials) = ⁿCₖ pᵏ (1 − p)ⁿ⁻ᵏ', d: 'For n independent trials, each a success with the same probability p.' }
  ]},

  { id: 'random-vars', title: 'Random variables', area: 'statistics', topic: 'random-vars', items: [
    { t: 'Discrete random variable', d: 'Given by a table of values x and probabilities P(X = x). The probabilities add up to 1, which is how an unknown k is usually found.' },
    { t: 'Expectation and variance', f: 'E(X) = Σ x p;   E(X²) = Σ x² p;   Var(X) = E(X²) − [E(X)]²', d: 'Standard deviation = √Var(X). Variance is never negative: a negative answer means a slip.' },
    { t: 'Linear change', f: 'E(aX + b) = aE(X) + b;   Var(aX + b) = a² Var(X)', d: 'Adding a constant shifts the mean but not the spread.' },
    { t: 'Sums of independent variables', f: 'E(X ± Y) = E(X) ± E(Y);   Var(X ± Y) = Var(X) + Var(Y)', d: 'Variances add even for X − Y. For n independent copies: Var(X₁ + … + Xₙ) = n Var(X), but Var(nX) = n² Var(X).' },
    { t: 'Probability density function', f: 'f(x) ≥ 0,   ∫ f(x) dx = 1 over all x;   P(a < X < b) = ∫_{a}^{b} f(x) dx', d: 'For a continuous variable P(X = a) = 0, so < and ≤ give the same probability.' },
    { t: 'Cumulative distribution function', f: 'F(x) = P(X ≤ x) = ∫_{−∞}^{x} f(t) dt;   f(x) = F′(x)', d: 'F rises from 0 to 1.' },
    { t: 'Mean and variance, continuous', f: 'E(X) = ∫ x f(x) dx;   Var(X) = ∫ x² f(x) dx − μ²', d: 'If f is symmetric about x = a, then E(X) = a without integrating.' },
    { t: 'Median, quartiles, mode', f: 'median m: F(m) = 1/2;   lower quartile: F(q) = 1/4', d: 'The mode is where f(x) is greatest: use f′(x) = 0, or the end of the interval.' },
    { t: 'Uniform distribution', f: 'f(x) = 1/(b − a) on [a, b];   E(X) = (a + b)/2;   Var(X) = (b − a)²/12', d: '' }
  ]},

  { id: 'binomial-poisson', title: 'Binomial and Poisson distributions', area: 'statistics', topic: 'binomial-poisson', items: [
    { t: 'When to use B(n, p)', d: 'A fixed number n of independent trials, each with two outcomes and the same probability p of success. X counts the successes.' },
    { t: 'Binomial distribution', f: 'P(X = r) = ⁿCᵣ pʳ (1 − p)ⁿ⁻ʳ;   E(X) = np;   Var(X) = np(1 − p)', d: '' },
    { t: 'Using cumulative tables', f: 'P(X ≥ r) = 1 − P(X ≤ r − 1);   P(X > r) = 1 − P(X ≤ r);   P(X = r) = P(X ≤ r) − P(X ≤ r − 1)', d: 'Tables give P(X ≤ r). Rewrite every question in that form. For p > 0.5, count failures instead: failures ~ B(n, 1 − p).' },
    { t: 'When to use Po(λ)', d: 'Events that happen singly, at random, independently of each other, at a constant average rate in time or space: calls per hour, flaws per metre.' },
    { t: 'Poisson distribution', f: 'P(X = r) = e^{−λ} λʳ / r!;   E(X) = Var(X) = λ', d: 'Mean ≈ variance in data is a sign that a Poisson model fits.' },
    { t: 'Changing the interval', d: 'λ scales with the interval: 3 calls per 10 minutes means λ = 1.5 for 5 minutes and λ = 18 for an hour.' },
    { t: 'Sum of Poisson variables', f: 'X ~ Po(λ), Y ~ Po(μ) independent  ⇒  X + Y ~ Po(λ + μ)', d: '' },
    { t: 'Poisson approximation to the binomial', f: 'B(n, p) ≈ Po(np)', d: 'When n is large (n > 50) and p is small (np < 5). Say why it is suitable before using it.' }
  ]},

  { id: 'normal', title: 'The normal distribution', area: 'statistics', topic: 'normal', items: [
    { t: 'X ~ N(μ, σ²)', d: 'Continuous, bell-shaped and symmetric about μ. The second number is the variance, not the standard deviation: N(50, 16) has σ = 4.' },
    { t: 'Rough proportions', f: 'within μ ± σ: 68%;   μ ± 2σ: 95%;   μ ± 3σ: 99.7%', d: 'Use them to check that a table answer is sensible.' },
    { t: 'Standardising', f: 'Z = (X − μ)/σ ~ N(0, 1);   P(X < x) = Φ((x − μ)/σ)', d: 'Draw the curve and shade the region before looking anything up.' },
    { t: 'Using Φ', f: 'Φ(−z) = 1 − Φ(z);   P(Z > z) = 1 − Φ(z);   P(a < Z < b) = Φ(b) − Φ(a)', d: 'The table gives Φ(z) = P(Z < z) for z ≥ 0 only; the rest comes from symmetry.' },
    { t: 'Working backwards', f: 'x = μ + zσ', d: 'Given a probability, find z from the table first: Φ(z) = 0.9 gives z = 1.282, Φ(z) = 0.95 gives 1.645, Φ(z) = 0.975 gives 1.960. If the probability is below 0.5, z is negative.' },
    { t: 'Finding μ and σ', d: 'Each known percentage gives one equation (x − μ)/σ = z. Two percentages give two simultaneous equations in μ and σ.' },
    { t: 'Normal approximation to the binomial', f: 'B(n, p) ≈ N(np, np(1 − p))', d: 'When np > 5 and n(1 − p) > 5.' },
    { t: 'Continuity correction', f: 'P(X ≤ 10) → P(Y < 10.5);   P(X < 10) → P(Y < 9.5);   P(X = 10) → P(9.5 < Y < 10.5)', d: 'Needed whenever a discrete count is replaced by a continuous normal variable.' },
    { t: 'Combinations of normal variables', f: 'aX + bY ~ N(aμ_{X} + bμ_{Y}, a²σ_{X}² + b²σ_{Y}²)', d: 'For independent normal X and Y.' }
  ]},

  { id: 'hypothesis', title: 'Sampling and hypothesis tests', area: 'statistics', topic: 'hypothesis', items: [
    { t: 'Population and sample', d: 'A sample is used when testing the whole population is too slow, too expensive or destroys the items. A random sample gives every member the same chance of being chosen, which avoids bias.' },
    { t: 'Unbiased estimates', f: 'x̄ = Σx/n;   s² = Σ(x − x̄)²/(n − 1) = (Σx² − n x̄²)/(n − 1)', d: 'Divide by n − 1, not n, for the unbiased estimate of the population variance.' },
    { t: 'Distribution of the sample mean', f: 'X̄ ~ N(μ, σ²/n)', d: 'Exact when X is normal. For any X with n large (about 30 or more) it holds approximately: the central limit theorem.' },
    { t: 'Confidence interval for μ', f: 'x̄ ± z σ/√n;   90%: z = 1.645,   95%: z = 1.96,   99%: z = 2.576', d: 'A 95% interval: in the long run, 95% of intervals built this way contain μ.' },
    { t: 'Hypotheses', d: 'H₀ gives the parameter one value (p = 0.3, μ = 50). H₁ says how it differs: < or > (one-tailed) or ≠ (two-tailed, split the significance level between the tails). Write them in terms of the parameter, not the sample.' },
    { t: 'Carrying out a test', d: 'Assume H₀ is true. Find the probability of a result at least as extreme as the one observed, and compare it with the significance level; or compare the test statistic with the critical value. Finish with a conclusion in the words of the question, never "H₀ is true".' },
    { t: 'Critical region', d: 'The values of the test statistic that lead to rejecting H₀. For a binomial test, find the most extreme values whose total probability is still at most the significance level.' },
    { t: 'Normal test for a mean', f: 'z = (x̄ − μ₀)/(σ/√n)', d: 'Compare with 1.645 (5%, one-tailed) or ±1.96 (5%, two-tailed).' },
    { t: 'Type I and Type II errors', d: 'Type I: rejecting H₀ when it is true. Its probability is the actual significance level. Type II: not rejecting H₀ when it is false. Lowering the chance of one raises the chance of the other.' }
  ]},

  { id: 'complex', title: 'Complex numbers', area: 'algebra', topic: 'complex', items: [
    { t: 'Imaginary unit', f: 'i² = −1;   z = a + bi,   Re z = a,   Im z = b', d: 'Two complex numbers are equal only when both real parts and both imaginary parts are equal: that gives two equations.' },
    { t: 'Arithmetic', f: '(a + bi)(c + di) = (ac − bd) + (ad + bc)i', d: 'Multiply out as brackets and replace i² by −1.' },
    { t: 'Conjugate and division', f: 'z* = a − bi;   z z* = |z|² = a² + b²', d: 'To divide, multiply the top and the bottom by the conjugate of the bottom. The bottom becomes real.' },
    { t: 'Square roots', d: 'To find √(a + bi), set (x + yi)² = a + bi and compare parts: x² − y² = a and 2xy = b. Solve for real x and y.' },
    { t: 'Conjugate root theorem', d: 'A polynomial with real coefficients has its non-real roots in conjugate pairs: if 2 + i is a root, so is 2 − i, and (z − 2)² + 1 = z² − 4z + 5 is a factor.' },
    { t: 'Modulus and argument', f: '|z| = √(a² + b²);   arg z = θ with −π < θ ≤ π, tan θ = b/a', d: 'Mark z on the Argand diagram first: tan θ = b/a gives the right angle only in the first and fourth quadrants.' },
    { t: 'Modulus-argument form', f: 'z = r(cos θ + i sin θ) = r e^{iθ}', d: 'Multiplying multiplies the moduli and adds the arguments; dividing divides the moduli and subtracts the arguments.' },
    { t: 'Loci on the Argand diagram', f: '|z − a| = r: circle;   |z − a| = |z − b|: perpendicular bisector;   arg(z − a) = θ: half-line', d: 'The circle has centre a and radius r. The bisector is of the segment from a to b. The half-line starts at a (not included) at angle θ.' },
    { t: 'De Moivre’s theorem', f: '(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ', d: 'For powers: [r(cos θ + i sin θ)]ⁿ = rⁿ(cos nθ + i sin nθ). For multiple angles: expand the left side with the binomial theorem and compare real or imaginary parts.' },
    { t: 'nth roots', f: 'zⁿ = r e^{iθ}:   z = r^{1/n} e^{i(θ + 2πk)/n},   k = 0, 1, …, n − 1', d: 'The n roots lie on a circle of radius r^{1/n}, spaced 2π/n apart, so they add up to 0 (for n ≥ 2).' }
  ]},

  { id: 'series', title: 'Series', area: 'calculus', topic: 'series', items: [
    { t: 'Series and partial sums', f: 'Sₙ = a₁ + a₂ + … + aₙ', d: 'The series converges if Sₙ tends to a finite limit S as n → ∞, and S is its sum.' },
    { t: 'Necessary condition', d: 'If Σaₙ converges, then aₙ → 0. The converse is false: 1 + 1/2 + 1/3 + … (the harmonic series) diverges although its terms tend to 0.' },
    { t: 'Geometric series', f: 'a + ar + ar² + … = a/(1 − r)   for |r| < 1', d: 'For |r| ≥ 1 it diverges.' },
    { t: 'Tests for convergence', f: 'Σ 1/nᵖ converges ⇔ p > 1;   ratio test: L = lim |aₙ₊₁/aₙ|', d: 'Ratio test: L < 1 converges, L > 1 diverges, L = 1 decides nothing. Comparison: a series smaller term by term than a convergent one of positive terms also converges.' },
    { t: 'Radius of convergence', f: 'Σ cₙ xⁿ converges for |x| < R,   R = lim |cₙ/cₙ₊₁|', d: 'Check the end points x = ±R separately.' },
    { t: 'Maclaurin series', f: 'f(x) = f(0) + f′(0)x + f″(0)x²/2! + f‴(0)x³/3! + …', d: '' },
    { t: 'Standard expansions', f: 'eˣ = 1 + x + x²/2! + x³/3! + …;   sin x = x − x³/3! + x⁵/5! − …;   cos x = 1 − x²/2! + x⁴/4! − …;   ln(1 + x) = x − x²/2 + x³/3 − …', d: 'eˣ, sin x and cos x for all x; ln(1 + x) for −1 < x ≤ 1. Substitute into them (2x for x, say) instead of differentiating again.' },
    { t: 'Binomial series', f: '(1 + x)ⁿ = 1 + nx + n(n − 1)x²/2! + n(n − 1)(n − 2)x³/3! + …', d: 'For n not a positive whole number the series is infinite and valid only for |x| < 1. For (a + bx)ⁿ take out aⁿ first: aⁿ(1 + bx/a)ⁿ, valid for |x| < |a/b|.' },
    { t: 'Taylor series', f: 'f(x) = f(a) + f′(a)(x − a) + f″(a)(x − a)²/2! + …', d: 'An expansion about x = a, accurate near a. Maclaurin is the case a = 0.' },
    { t: 'Using series', d: 'Approximate values (√1.02, e^{0.1}), find limits (replace sin x by x − x³/6 in (sin x − x)/x³), and estimate integrals that have no neat antiderivative.' }
  ]},

  { id: 'volumes', title: 'Volumes of solids', area: 'geometry', topic: 'volumes', items: [
    { t: 'Prism and cylinder', f: 'V = S_{base} · h;   cylinder: V = πr²h', d: 'h is the perpendicular height. For an oblique prism also V = S_{⊥} · l, the perpendicular cross-section times the lateral edge.' },
    { t: 'Pyramid and cone', f: 'V = (1/3) S_{base} · h;   cone: V = (1/3)πr²h', d: 'In a regular pyramid the foot of the height is the centre of the base: use it to find h by Pythagoras.' },
    { t: 'Frustum', f: 'V = (h/3)(S₁ + √(S₁S₂) + S₂);   cone frustum: V = (πh/3)(R² + Rr + r²)', d: 'Or: the big pyramid (cone) minus the small one cut off.' },
    { t: 'Sphere and its parts', f: 'V = (4/3)πR³;   cap of height h: V = πh²(R − h/3);   sector: V = (2/3)πR²h', d: 'Surface area of a sphere: 4πR².' },
    { t: 'Similar solids', f: 'lengths × k  ⇒  areas × k²,  volumes × k³', d: 'Find k from the lengths first; from volumes, k is the cube root of the ratio.' },
    { t: 'Equal volumes', d: 'Melting and recasting keeps the volume: set the volumes equal. Cavalieri’s principle: solids with equal cross-sections at every height have equal volumes.' },
    { t: 'Inscribed and circumscribed solids', d: 'Draw the cross-section through the axis: it turns a sphere in a cone into a circle in a triangle. Cube of edge a: inscribed sphere R = a/2, circumscribed sphere R = a√3/2.' },
    { t: 'Volume of revolution', f: 'about Ox: V = π ∫_{a}^{b} y² dx;   about Oy: V = π ∫_{c}^{d} x² dy', d: 'Between two curves: π ∫ (y₁² − y₂²) dx, not π ∫ (y₁ − y₂)² dx.' }
  ]},

  { id: 'conics', title: 'Second-order curves', area: 'geometry', topic: 'conics', items: [
    { t: 'Second-order curve', f: 'Ax² + Bxy + Cy² + Dx + Ey + F = 0', d: 'With B = 0, complete the square in x and in y to reach one of the canonical forms below and read off the centre.' },
    { t: 'Circle', f: '(x − a)² + (y − b)² = R²', d: 'Centre (a, b), radius R.' },
    { t: 'Ellipse', f: 'x²/a² + y²/b² = 1,   a > b > 0;   c² = a² − b²', d: 'Foci (±c, 0), vertices (±a, 0). For any point on it, the distances to the two foci add up to 2a.' },
    { t: 'Hyperbola', f: 'x²/a² − y²/b² = 1;   c² = a² + b²;   asymptotes y = ±(b/a)x', d: 'Foci (±c, 0), vertices (±a, 0). For any point on it, the distances to the two foci differ by 2a.' },
    { t: 'Parabola', f: 'y² = 2px:   focus (p/2, 0),   directrix x = −p/2', d: 'Written y² = 4ax in some books: focus (a, 0), directrix x = −a. Every point is as far from the focus as from the directrix.' },
    { t: 'Eccentricity', f: 'e = c/a', d: 'Circle e = 0, ellipse 0 < e < 1, parabola e = 1, hyperbola e > 1. The distance to a focus divided by the distance to the matching directrix x = ±a/e equals e.' },
    { t: 'Shifted curves', f: '(x − x₀)²/a² + (y − y₀)²/b² = 1', d: 'The same curve moved so its centre is (x₀, y₀). Foci and vertices move with it.' },
    { t: 'Tangent at (x₀, y₀)', f: 'ellipse: x x₀/a² + y y₀/b² = 1;   hyperbola: x x₀/a² − y y₀/b² = 1', d: 'Or differentiate implicitly.' }
  ]},

  { id: 'diff-eq', title: 'Differential equations', area: 'calculus', topic: 'diff-eq', items: [
    { t: 'Vocabulary', d: 'The order is the highest derivative. The general solution contains an arbitrary constant; a particular solution uses an initial condition (the Cauchy problem) to fix it. Each solution is an integral curve.' },
    { t: 'Separable equations', f: 'dy/dx = f(x) g(y)  ⇒  ∫ dy/g(y) = ∫ f(x) dx', d: 'Get every y on one side with dy and every x on the other with dx. Add + C once, straight after integrating, and find C before rearranging.' },
    { t: 'Homogeneous equations', f: 'dy/dx = F(y/x):   y = vx,   dy/dx = v + x dv/dx', d: 'The substitution always leads to a separable equation in v and x. Replace v by y/x at the end.' },
    { t: 'Linear first-order equations', f: 'dy/dx + P(x) y = Q(x):   μ = e^{∫P dx},   (μy)′ = μQ', d: 'Multiply through by the integrating factor μ; the left side becomes the derivative of μy. Integrate both sides, then divide by μ.' },
    { t: 'Growth and decay', f: 'dN/dt = kN  ⇒  N = N₀ e^{kt}', d: 'k > 0 growth, k < 0 decay. Half-life: t = ln 2/|k|.' },
    { t: 'Newton’s law of cooling', f: 'dT/dt = −k(T − Tₛ)  ⇒  T = Tₛ + (T₀ − Tₛ) e^{−kt}', d: 'Tₛ is the temperature of the surroundings.' },
    { t: 'Forming an equation', d: '"The rate of change of V" is dV/dt. "Proportional to" brings in a constant k. A decreasing quantity needs a minus sign, or a negative k.' },
    { t: 'Checking a solution', d: 'Differentiate your answer and substitute it back into the equation and the initial condition. Both must hold.' }
  ]},

  { id: 'numerical', title: 'Numerical methods', area: 'algebra', topic: 'numerical', items: [
    { t: 'Change of sign', d: 'If f is continuous on [a, b] and f(a), f(b) have opposite signs, then f(x) = 0 has a root between a and b. State both values, their signs and that f is continuous.' },
    { t: 'When a sign change misleads', d: 'A discontinuity gives a sign change with no root (1/x at 0). Two roots close together, or a repeated root, give no sign change.' },
    { t: 'Showing a root to a given accuracy', d: 'To show α = 1.53 to 2 decimal places, show a change of sign between 1.525 and 1.535.' },
    { t: 'Bisection', d: 'Evaluate f at the midpoint and keep the half-interval with the sign change. After n steps the interval is (b − a)/2ⁿ wide, so each step gains about one binary digit.' },
    { t: 'Fixed-point iteration', f: 'f(x) = 0  rearranged as  x = F(x);   xₙ₊₁ = F(xₙ)', d: 'If the sequence converges, its limit α satisfies α = F(α), so α is a root. Keep calculator values unrounded between steps.' },
    { t: 'When iteration converges', f: '|F′(x)| < 1 near the root', d: 'If |F′(α)| > 1 the iterates move away from α whatever the start. Different rearrangements of the same equation can behave differently.' },
    { t: 'Staircase and cobweb', d: 'On a graph of y = F(x) and y = x: 0 < F′(α) < 1 gives a staircase towards the root, −1 < F′(α) < 0 a cobweb spiralling in.' },
    { t: 'Errors', f: 'absolute error = |approximation − true value|;   relative error = absolute error / |true value|', d: '' }
  ]},

  { id: 'applied-calc', title: 'Applications of calculus', area: 'calculus', topic: 'applied-calc', items: [
    { t: 'Optimisation', d: 'Name the variable, write the quantity to maximise or minimise in that one variable (use the constraint to remove the other), differentiate, solve = 0, show it is a maximum or minimum, check the end points, then answer the question with units.' },
    { t: 'Maximum or minimum', f: 'f′(a) = 0 and f″(a) < 0: maximum;   f″(a) > 0: minimum', d: 'If f″(a) = 0, check the sign of f′ on both sides of a.' },
    { t: 'Connected rates of change', f: 'dy/dt = (dy/dx) · (dx/dt)', d: 'Write the formula linking the two quantities, differentiate it with respect to the one it is written in, then chain. Rates of decrease are negative.' },
    { t: 'Small changes', f: 'δy ≈ (dy/dx) δx', d: 'Percentage change in y ≈ (δy/y) × 100. For y = kxⁿ, a p% change in x gives about an np% change in y.' },
    { t: 'Motion in a line', f: 'v = ds/dt,   a = dv/dt = d²s/dt²;   s = ∫ v dt,   v = ∫ a dt', d: 'At rest: v = 0. Distance travelled: split the integral of v where v changes sign and add the absolute values.' },
    { t: 'Oscillations', f: 'x = A sin(ωt + φ):   amplitude A,   period 2π/ω;   v = Aω cos(ωt + φ);   a = −ω²x', d: 'Greatest speed Aω at the centre (x = 0); greatest acceleration Aω² at the ends.' },
    { t: 'Rate of change in context', d: 'The derivative has units: cm³ per second, °C per minute. A negative dT/dt means the temperature is falling.' }
  ]}

];
