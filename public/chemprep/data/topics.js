// Syllabus taxonomy for the NIS Grade 11-12 chemistry course.
// Codes come from the yearly course calendars in /goals.
window.CHEMPREP_UNITS = [
  {
    id: 'physical',
    name: 'Physical chemistry',
    note: 'The maths-heavy half. Most of Paper 2 lives here.',
    topics: [
      { id: 'atomic-structure', name: 'Atomic structure',            code: '11.1.1', blurb: 'Subatomic particles, isotopes, atomic and mass number.' },
      { id: 'electron-config',  name: 'Electrons and ionisation',    code: '11.1.3', blurb: 'Orbitals, subshells, successive ionisation energies.' },
      { id: 'bonding',          name: 'Bonding and structure',       code: '11.1.4', blurb: 'Ionic, covalent, metallic, VSEPR shapes, intermolecular forces.' },
      { id: 'moles',            name: 'Moles and stoichiometry',     code: '11.2.2', blurb: 'Concentration, gas volumes, yield, atom economy, titration sums.' },
      { id: 'periodicity',      name: 'Periodicity',                 code: '11.2.1', blurb: 'Trends across Period 3 and down the groups.' },
      { id: 'energetics',       name: 'Energetics and entropy',      code: '11.3.1', blurb: 'Enthalpy, Hess cycles, Born-Haber, entropy and free energy.' },
      { id: 'kinetics',         name: 'Reaction kinetics',           code: '11.3.2', blurb: 'Rate equations, orders, catalysts, Boltzmann distributions.' },
      { id: 'equilibria',       name: 'Chemical equilibria',         code: '11.3.3', blurb: 'Kc, Kp, Le Chatelier, industrial compromise conditions.' },
      { id: 'acids-bases',      name: 'Acids, bases and buffers',    code: '12.3.4', blurb: 'pH, Ka and Kb, titration curves, indicators, buffering.' },
      { id: 'electrochemistry', name: 'Electrochemistry',            code: '12.3',   blurb: 'Electrode potentials, cells, electrolysis, redox bookkeeping.' }
    ]
  },
  {
    id: 'inorganic',
    name: 'Inorganic chemistry',
    note: 'Descriptive and easy to lose marks on. Learn the observations.',
    topics: [
      { id: 'group2',            name: 'Group 2',                    code: '11.2.1', blurb: 'Reactivity, solubility patterns, thermal stability.' },
      { id: 'group14',           name: 'Group 14',                   code: '12.2.1', blurb: 'Tin and lead, oxidation states II and IV, the inert pair effect.' },
      { id: 'group17',           name: 'Group 17',                   code: '11.2.1', blurb: 'Halogens, halide tests, disproportionation.' },
      { id: 'nitrogen-sulfur',   name: 'Nitrogen and sulfur',        code: '12.2.1', blurb: 'Ammonia, nitric acid, sulfur dioxide, the Contact process.' },
      { id: 'transition-metals', name: 'Transition metals',          code: '12.2.1', blurb: 'Complexes, ligands, colour, variable oxidation states, catalysis.' },
      { id: 'aqueous-inorganic', name: 'Aqueous inorganic',          code: '12.3.4', blurb: 'Metal-aqua ions, hydrolysis, ligand substitution, the chelate effect.' }
    ]
  },
  {
    id: 'organic',
    name: 'Organic chemistry',
    note: 'Mechanisms and synthesis routes. Worth drawing out by hand.',
    topics: [
      { id: 'organic-basics',   name: 'Nomenclature and isomerism',  code: '12.4.2', blurb: 'IUPAC naming, structural isomers, E/Z and optical isomerism.' },
      { id: 'hydrocarbons',     name: 'Alkanes and alkenes',         code: '11.4.2', blurb: 'Free radical substitution, electrophilic addition, cracking.' },
      { id: 'halogenoalkanes',  name: 'Halogenoalkanes',             code: '11.4.2', blurb: 'Nucleophilic substitution, elimination, ozone depletion.' },
      { id: 'alcohols',         name: 'Alcohols and phenols',        code: '11.4.2', blurb: 'Oxidation, dehydration, ethanol routes, phenol reactivity.' },
      { id: 'carbonyl',         name: 'Carbonyls, acids and esters', code: '12.4.2', blurb: 'Aldehydes, ketones, carboxylic acids, esterification, acylation.' },
      { id: 'aromatic',         name: 'Arenes',                      code: '12.4.2', blurb: 'Benzene stability, nitration, Friedel-Crafts acylation.' },
      { id: 'amines-amino',     name: 'Amines and amino acids',      code: '12.5.1', blurb: 'Basicity, zwitterions, peptide bonds, protein structure.' },
      { id: 'polymers',         name: 'Polymerisation',              code: '12.4.2', blurb: 'Addition and condensation polymers, repeat units, disposal.' }
    ]
  },
  {
    id: 'analysis',
    name: 'Analysis',
    note: 'Spectra turn up in every paper. Fast marks once the patterns click.',
    topics: [
      { id: 'analysis', name: 'Analytical techniques', code: '12.4', blurb: 'Mass spectra, NMR, infra-red, chromatography.' }
    ]
  }
];
