// The units of the NIS grade 11 and 12 mathematics course (10-hour programme),
// grouped by area. Grade 11 codes and contents follow the long-term plan in the
// NIS course plan for grade 11. Grade 12 units are coded by grade and term
// (12.1 = grade 12, term 1) and follow the order the grade 12 course teaches
// them in; they will be matched to the codes of the official grade 12 plan.
window.DELTA_UNITS = [
  {
    id: 'algebra',
    name: 'Algebra and functions',
    note: 'The toolkit every paper leans on, and most of the short paper 1 questions.',
    topics: [
      { id: 'roots',        name: 'nth roots and powers',            code: '11.1A', blurb: 'Roots of degree n, rational exponents, irrational equations and inequalities.' },
      { id: 'polynomials',  name: 'Algebraic expressions',           code: '11.1B', blurb: 'Polynomial division, the remainder and factor theorems, Horner, Vieta, rational roots.' },
      { id: 'exp-log',      name: 'Exponential and logarithmic functions', code: '11.3A', blurb: 'Graphs, logarithm laws, exponential and logarithmic equations and inequalities.' },
      { id: 'matrices',     name: 'Matrices and determinants',       code: '11.3B', blurb: 'Matrix operations, determinants, inverses, solving linear systems.' },
      { id: 'equations',    name: 'Equations and inequalities',      code: '11.4B', blurb: 'Modulus, irrational, trigonometric and inverse trigonometric equations; systems.' },
      { id: 'complex',      name: 'Complex numbers',                 code: '12.1, 12.3', blurb: 'Arithmetic in a + bi, conjugate roots, the Argand diagram and loci, modulus-argument form, de Moivre, nth roots.' },
      { id: 'numerical',    name: 'Numerical methods',               code: '12.3',  blurb: 'Locating roots by a change of sign, bisection, fixed-point iteration and when it converges.' }
    ]
  },
  {
    id: 'calculus',
    name: 'Calculus',
    note: 'Calculus turns up on all three of the specification’s sample papers.',
    topics: [
      { id: 'calculus-2',   name: 'Calculus II',                     code: '11.2B', blurb: 'Derivatives of powers, stationary points, curve sketching, first integrals.' },
      { id: 'calculus-3',   name: 'Calculus III',                    code: '11.4A', blurb: 'e and the second remarkable limit, L’Hôpital, parametric and implicit derivatives, definite integrals.' },
      { id: 'series',       name: 'Series',                          code: '12.1',  blurb: 'Convergence, geometric and power series, Maclaurin and Taylor expansions, the binomial series, approximations.' },
      { id: 'diff-eq',      name: 'Differential equations',          code: '12.2',  blurb: 'First-order equations: separable, homogeneous and linear; initial conditions; growth, decay and cooling models.' },
      { id: 'applied-calc', name: 'Applications of calculus',        code: '12.3',  blurb: 'Optimisation, connected rates of change, small changes, motion and oscillations.' }
    ]
  },
  {
    id: 'geometry',
    name: 'Geometry and vectors',
    note: 'Draw the diagram first, then do the algebra.',
    topics: [
      { id: 'solids',       name: 'Polyhedra and solids of revolution', code: '11.2A', blurb: 'Prisms, pyramids, frustums, cylinders, cones and spheres; surface area.' },
      { id: 'vectors',      name: 'Vectors and coordinates',         code: '11.3C', blurb: 'Dot, cross and triple products, lines, planes, spheres, angles and distances.' },
      { id: 'volumes',      name: 'Volumes of solids',               code: '12.2',  blurb: 'Prisms, pyramids, cones, cylinders and spheres, similar and combined solids, volumes of revolution.' },
      { id: 'conics',       name: 'Second-order curves',             code: '12.2',  blurb: 'Ellipse, hyperbola and parabola: canonical equations, foci, eccentricity, directrices and asymptotes.' }
    ]
  },
  {
    id: 'statistics',
    name: 'Statistics and probability',
    note: 'Paper 3 sets most of these in a real context. Binomial, Poisson and normal tables are provided.',
    topics: [
      { id: 'statistics',   name: 'Elements of statistics',          code: '11.1C', blurb: 'Data displays, mean, median and mode, variance and standard deviation.' },
      { id: 'probability',  name: 'Combinatorics and probability',   code: '12.1',  blurb: 'Permutations and combinations with repeats and restrictions, probability rules, conditional probability, Bernoulli trials.' },
      { id: 'random-vars',  name: 'Random variables',                code: '12.1',  blurb: 'Discrete and continuous random variables: distributions, density functions, expectation, variance, the median.' },
      { id: 'binomial-poisson', name: 'Binomial and Poisson distributions', code: '12.1', blurb: 'B(n, p) and Po(λ): probabilities, mean and variance, tables, and the Poisson approximation to the binomial.' },
      { id: 'normal',       name: 'The normal distribution',         code: '12.1',  blurb: 'Standardising, the table in both directions, finding μ and σ, the normal approximation to the binomial.' },
      { id: 'hypothesis',   name: 'Sampling and hypothesis tests',   code: '12.3',  blurb: 'Unbiased estimates, the sample mean, confidence intervals, binomial and normal tests, Type I and II errors.' }
    ]
  }
];
