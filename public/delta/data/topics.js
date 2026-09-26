// The units of the NIS grade 11 and 12 mathematics course (10-hour programme),
// grouped by area. Codes and contents follow the long-term plans in the NIS
// course plans for mathematics, grades 11 and 12.
window.DELTA_UNITS = [
  {
    id: 'algebra',
    name: 'Algebra and functions',
    note: 'The toolkit every paper leans on. Most of paper 1 is here.',
    topics: [
      { id: 'roots',        name: 'nth roots and powers',            code: '11.1A', blurb: 'Roots of degree n, rational exponents, irrational equations and inequalities.' },
      { id: 'polynomials',  name: 'Algebraic expressions',           code: '11.1B', blurb: 'Polynomial division, the remainder and factor theorems, Horner, Vieta, rational roots.' },
      { id: 'exp-log',      name: 'Exponential and logarithmic functions', code: '11.3A', blurb: 'Graphs, logarithm laws, exponential and logarithmic equations and inequalities.' },
      { id: 'matrices',     name: 'Matrices and determinants',       code: '11.3B', blurb: 'Matrix operations, determinants, inverses, solving linear systems.' },
      { id: 'equations',    name: 'Equations and inequalities',      code: '11.4B', blurb: 'Modulus, irrational, trigonometric and inverse trigonometric equations; systems.' }
    ]
  },
  {
    id: 'calculus',
    name: 'Calculus',
    note: 'The heaviest single area. Paper 2 is built around it.',
    topics: [
      { id: 'calculus-2',   name: 'Calculus II',                     code: '11.2B', blurb: 'Derivatives of powers, stationary points, curve sketching, first integrals.' },
      { id: 'calculus-3',   name: 'Calculus III',                    code: '11.4A', blurb: 'e and the second remarkable limit, L’Hôpital, parametric and implicit derivatives, definite integrals.' }
    ]
  },
  {
    id: 'geometry',
    name: 'Geometry and vectors',
    note: 'Draw the diagram first. Most marks are lost before the algebra starts.',
    topics: [
      { id: 'solids',       name: 'Polyhedra and solids of revolution', code: '11.2A', blurb: 'Prisms, pyramids, frustums, cylinders, cones and spheres; surface area.' },
      { id: 'vectors',      name: 'Vectors and coordinates',         code: '11.3C', blurb: 'Dot, cross and triple products, lines, planes, spheres, angles and distances.' }
    ]
  },
  {
    id: 'statistics',
    name: 'Statistics and probability',
    note: 'Paper 3 sets most of these in a real context.',
    topics: [
      { id: 'statistics',   name: 'Elements of statistics',          code: '11.1C', blurb: 'Data displays, mean, median and mode, variance and standard deviation.' }
    ]
  }
];
