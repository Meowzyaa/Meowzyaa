/* Practice written against the syllabus objectives. Not past paper questions. */
CHEMPREP_PRACTICE.push(

// ---- 11.1.4.11  dot and cross diagrams ----------------------------------
{
  id: 'p-11.1.4.11-1', goal: '11.1.4.11', kind: 'mcq', marks: 1,
  stem: 'How many electrons are shown in the outer shell of each atom in a completed dot and cross diagram of carbon dioxide, CO2?',
  options: {
    A: 'carbon 4, each oxygen 6',
    B: 'carbon 8, each oxygen 8',
    C: 'carbon 8, each oxygen 6',
    D: 'carbon 4, each oxygen 8'
  },
  answer: 'B',
  why: 'A dot and cross diagram shows the arrangement after bonding, not before. Carbon forms two double bonds, sharing four pairs in total, so its outer shell contains eight electrons. Each oxygen shares two pairs in its double bond and keeps two lone pairs, which is four bonding electrons plus four lone pair electrons, again eight. Every atom in CO2 ends with a full octet, which is the point of drawing the diagram.'
},
{
  id: 'p-11.1.4.11-2', goal: '11.1.4.11', kind: 'structured', marks: 4,
  stem: '(a) Describe the bonding in magnesium chloride, including the electron transfer that takes place. [2]\n(b) State two differences between the dot and cross diagram of an ionic compound and that of a covalent compound. [2]',
  scheme: [
    '(a) magnesium loses two electrons to form Mg2+ [1]',
    '(a) each of two chlorine atoms gains one electron to form Cl-, giving MgCl2 [1]',
    '(b) ionic diagrams show separate ions in square brackets with the charge shown [1]',
    '(b) covalent diagrams show shared pairs in the overlap between the atoms [1]'
  ],
  why: 'The stoichiometry falls out of the electron count: magnesium has two outer electrons to give away and each chlorine can accept only one, so two chlorines are needed per magnesium. The bracket and charge notation matters in (b), because it is what shows the electrons have been transferred rather than shared. Using dots for one element and crosses for the other is only a bookkeeping device to show where each electron came from; the electrons themselves are identical.'
},

// ---- 11.1.4.24 and 11.1.4.26  lone pairs and VSEPR ----------------------
{
  id: 'p-11.1.4.26-1', goal: '11.1.4.26', kind: 'mcq', marks: 1,
  stem: 'What are the shape and bond angle of the ammonia molecule, NH3?',
  options: {
    A: 'trigonal planar, 120 degrees',
    B: 'trigonal pyramidal, 107 degrees',
    C: 'tetrahedral, 109.5 degrees',
    D: 'bent, 104.5 degrees'
  },
  answer: 'B',
  why: 'Nitrogen has four electron pairs around it, three bonding and one lone pair. Four pairs arrange themselves tetrahedrally, but the shape is named from the positions of the atoms only, so with one position occupied by a lone pair the molecule is trigonal pyramidal. The lone pair repels more strongly than a bonding pair, squeezing the H-N-H angle down from 109.5 to about 107 degrees. Each lone pair costs roughly 2.5 degrees, which is why water, with two lone pairs, comes in at 104.5.'
},
{
  id: 'p-11.1.4.26-2', goal: '11.1.4.26', kind: 'structured', marks: 4,
  stem: 'Predict the shape and bond angle of each species, and justify one of your answers using VSEPR theory.\n\n(a) BF3 [1]\n(b) SF6 [1]\n(c) H2O, with justification [2]',
  scheme: [
    '(a) trigonal planar, 120 degrees [1]',
    '(b) octahedral, 90 degrees [1]',
    '(c) bent or V-shaped, 104.5 degrees [1]',
    '(c) four electron pairs, two bonding and two lone pairs; lone pairs repel more, closing the angle [1]'
  ],
  why: 'The method is always the same: count the electron pairs around the central atom, arrange them as far apart as possible, then name the shape from the atom positions alone. Boron in BF3 has only three pairs and no lone pair, so it is trigonal planar at 120 degrees and is one of the common exceptions to the octet rule. Sulfur in SF6 has six bonding pairs, giving octahedral at 90 degrees. Oxygen in water has four pairs but only two bonded atoms, so bent, with the two lone pairs pushing the angle to 104.5.'
},

// ---- 11.2.1.11  identifying halide ions ---------------------------------
{
  id: 'p-11.2.1.11-1', goal: '11.2.1.11', kind: 'mcq', marks: 1,
  stem: 'Silver nitrate solution is added to a halide solution and a cream precipitate forms, which dissolves in concentrated but not dilute aqueous ammonia. Which halide is present?',
  options: { A: 'fluoride', B: 'chloride', C: 'bromide', D: 'iodide' },
  answer: 'C',
  why: 'The colours run white for chloride, cream for bromide and pale yellow for iodide, and the solubility in ammonia falls in the same order. Silver chloride dissolves even in dilute ammonia, silver bromide needs concentrated ammonia, and silver iodide will not dissolve in either. Cream plus soluble in concentrated ammonia only is therefore bromide. Fluoride gives no precipitate at all, because silver fluoride is soluble, so a negative result rules it in rather than out.'
},
{
  id: 'p-11.2.1.11-2', goal: '11.2.1.11', kind: 'structured', marks: 4,
  stem: 'A solution is thought to contain sodium iodide.\n\n(a) Describe the test with acidified silver nitrate and the expected result. [2]\n(b) Explain why the silver nitrate is acidified with dilute nitric acid before the test. [2]',
  scheme: [
    '(a) add dilute nitric acid, then aqueous silver nitrate [1]',
    '(a) a pale yellow precipitate forms, insoluble in concentrated ammonia [1]',
    '(b) other anions such as carbonate would also give a precipitate with silver ions [1]',
    '(b) the nitric acid reacts with and removes them, so the test is specific to halides [1]'
  ],
  why: 'The acid step is the part most often left out, and examiners ask for it precisely because it shows you understand what could go wrong. Silver carbonate, silver hydroxide and silver sulfite are all insoluble, so without the acid a carbonate-containing sample gives a false positive. Nitric acid is used rather than hydrochloric for an obvious reason: hydrochloric acid would introduce chloride ions and guarantee a white precipitate whatever the sample contained.'
},

// ---- 11.2.1.6  trends across a period -----------------------------------
{
  id: 'p-11.2.1.6-1', goal: '11.2.1.6', kind: 'mcq', marks: 1,
  stem: 'Which element in Period 3 has the highest melting point, and why?',
  options: {
    A: 'sodium, because metallic bonding is strongest at the start of the period',
    B: 'silicon, because it has a giant covalent structure with strong bonds throughout',
    C: 'phosphorus, because P4 molecules are large',
    D: 'argon, because it has the most electrons'
  },
  answer: 'B',
  why: 'Melting point across Period 3 rises from sodium to aluminium as metallic bonding strengthens, peaks sharply at silicon, then collapses. Silicon is the peak because it is macromolecular: melting it means breaking strong covalent bonds throughout a giant lattice. After silicon the elements are simple molecules held together only by weak van der Waals forces, so phosphorus, sulfur and chlorine all melt low, and argon, with single atoms and the weakest forces of all, melts lowest. The size of the trend is the giveaway: silicon melts above 1400 degrees C.'
},
{
  id: 'p-11.2.1.6-2', goal: '11.2.1.6', kind: 'structured', marks: 4,
  stem: '(a) State and explain the trend in atomic radius across Period 3 from sodium to chlorine. [2]\n(b) State and explain the trend in first ionisation energy across the same period. [2]',
  scheme: [
    '(a) the atomic radius decreases [1]',
    '(a) the nuclear charge increases while the electrons enter the same shell, so shielding is similar and the attraction on the outer electrons increases [1]',
    '(b) the first ionisation energy generally increases [1]',
    '(b) for the same reason: greater nuclear charge with similar shielding holds the outer electron more tightly [1]'
  ],
  why: 'Both trends come from one idea, so learn the sentence once: nuclear charge increases, electrons are added to the same shell, shielding stays about the same, so the effective nuclear charge on the outer electrons rises. Two dips are worth knowing for the ionisation energy trend: aluminium is lower than magnesium because its outer electron is in a 3p rather than a 3s orbital and is slightly higher in energy, and sulfur is lower than phosphorus because sulfur has a paired 3p electron that is repelled by its partner.'
},

// ---- 11.1.1.4  relative atomic and molecular mass ------------------------
{
  id: 'p-11.1.1.4-1', goal: '11.1.1.4', kind: 'structured', marks: 3,
  stem: 'A sample of chlorine contains 75.8 per cent of 35Cl and 24.2 per cent of 37Cl.\n\n(a) Calculate the relative atomic mass of this sample, to three significant figures. [2]\n(b) State what is meant by relative atomic mass. [1]',
  scheme: [
    '(a) Ar = ((75.8 x 35) + (24.2 x 37)) / 100 [1]',
    '(a) = 35.5 [1]',
    '(b) the weighted mean mass of an atom of the element compared with one twelfth the mass of an atom of carbon-12 [1]'
  ],
  why: 'A relative atomic mass is a weighted mean, so multiply each isotope mass by its abundance, add, then divide by the total abundance, which here is 100. That gives (2653 + 895.4) / 100 = 35.48, so 35.5 to three significant figures, which is the value you will find in the data booklet. For (b) the definition needs both halves: it is a weighted mean, and the standard it is compared against is one twelfth of a carbon-12 atom. Saying only "the mass compared to carbon-12" usually does not get the mark.'
},

// ---- 12.2.1.18  manufacture of sulfuric acid ----------------------------
{
  id: 'p-12.2.1.18-1', goal: '12.2.1.18', kind: 'structured', marks: 4,
  stem: 'Sulfuric acid is manufactured by the Contact process. The key equilibrium is\n\n2SO2(g) + O2(g) equilibrium 2SO3(g)   enthalpy change = -196 kJ mol-1\n\n(a) State the catalyst and the temperature normally used. [2]\n(b) Explain why the sulfur trioxide is not simply added to water. [2]',
  scheme: [
    '(a) vanadium(V) oxide, V2O5 [1]',
    '(a) about 450 degrees C (accept 400 to 500) [1]',
    '(b) the reaction with water is violent and highly exothermic [1]',
    '(b) it forms an uncontrollable mist of sulfuric acid, so the SO3 is absorbed in concentrated H2SO4 to form oleum, which is then diluted [1]'
  ],
  why: 'The temperature is another compromise: the forward reaction is exothermic so a lower temperature would give a better yield, but the rate would be impractical, and 450 degrees C with a catalyst gets around 96 per cent conversion at a workable speed. The water question is a favourite because the obvious answer is wrong. Direct hydration is so exothermic that it boils the acid into a fine mist that is both dangerous and impossible to condense, so the SO3 is dissolved in existing concentrated acid to make oleum, H2S2O7, which is then diluted safely.'
},

// ---- 12.3.4.21  ligand substitution and stability -----------------------
{
  id: 'p-12.3.4.21-1', goal: '12.3.4.21', kind: 'structured', marks: 4,
  stem: 'When 1,2-diaminoethane, NH2CH2CH2NH2, is added to a solution containing [Ni(NH3)6]2+, substitution occurs.\n\n(a) Write an equation for the reaction. [2]\n(b) Explain, in terms of entropy, why this substitution is favourable. [2]',
  scheme: [
    '(a) [Ni(NH3)6]2+ + 3NH2CH2CH2NH2 -> [Ni(NH2CH2CH2NH2)3]2+ + 6NH3 [1]',
    '(a) correct charge and balancing [1]',
    '(b) 4 particles become 7 / more particles are produced [1]',
    '(b) the entropy change is positive, which makes the free energy change more negative [1]'
  ],
  why: 'This is the chelate effect. 1,2-diaminoethane is bidentate, so each molecule uses two nitrogen lone pairs and occupies two coordination sites, meaning three of them displace all six ammonia molecules. Count the particles on each side: four go in and seven come out. More particles means more ways of arranging the system, so the entropy change is positive, and since free energy change equals enthalpy change minus temperature times entropy change, a positive entropy change drives the free energy change negative. The enthalpy change is close to zero here, because you are swapping one nitrogen donor for another, so entropy is doing essentially all the work.'
}

);
