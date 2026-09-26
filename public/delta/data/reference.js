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
  ]}
];
