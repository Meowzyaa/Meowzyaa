/* Practice written against the syllabus objectives. Not past paper questions. */
CHEMPREP_PRACTICE.push(

// ---- 12.3.4.18  structure of metal-aqua ions -----------------------------
{
  id: 'p-12.3.4.18-1', goal: '12.3.4.18', kind: 'mcq', marks: 1,
  stem: 'Iron(III) chloride is dissolved in water. Which species is present in the solution?',
  options: {
    A: '[Fe(H2O)4]3+, tetrahedral',
    B: '[Fe(H2O)6]3+, octahedral',
    C: '[Fe(H2O)6]2+, octahedral',
    D: '[FeCl6]3-, octahedral'
  },
  answer: 'B',
  why: 'A 3+ transition metal ion in water pulls six water molecules around it as ligands, each donating a lone pair from oxygen into an empty orbital on the metal. Six ligands arrange themselves octahedrally. The iron came from iron(III) chloride, so the oxidation state stays +3 and the complex carries the same 3+ charge as the ion, because water is neutral. C has the wrong oxidation state, and D would need chloride in large excess, since water outnumbers chloride enormously in dilute solution.'
},
{
  id: 'p-12.3.4.18-2', goal: '12.3.4.18', kind: 'structured', marks: 4,
  stem: 'Aqueous solutions of iron(II) and iron(III) salts both contain hexaaqua ions.\n\n(a) State the type of bond formed between a water molecule and the central metal ion, and explain how it forms. [2]\n(b) Explain why a solution containing [Fe(H2O)6]3+ is more acidic than one containing [Fe(H2O)6]2+ at the same concentration. [2]',
  scheme: [
    '(a) dative covalent / co-ordinate bond [1]',
    '(a) the oxygen lone pair is donated into an empty orbital on the Fe ion [1]',
    '(b) Fe3+ has a higher charge and a smaller radius, so a higher charge density [1]',
    '(b) it polarises the O-H bonds of the ligand water more, releasing H+ more readily [1]'
  ],
  why: 'Both marks in (a) need the word "lone pair" and the word "empty": a dative bond is one atom supplying both electrons into a vacant orbital. For (b) the argument is charge density, meaning charge divided by size. Fe3+ is both more highly charged and smaller than Fe2+, so it withdraws electron density from the coordinated water much more strongly. That weakens the O-H bonds and makes the complex a better proton donor, so the solution is more acidic. Answers that just say "Fe3+ has a bigger charge" without linking to the weakening of the O-H bond usually get one mark rather than two.'
},

// ---- 12.3.4.19  reactions of metal-aqua ions -----------------------------
{
  id: 'p-12.3.4.19-1', goal: '12.3.4.19', kind: 'mcq', marks: 1,
  stem: 'Aqueous sodium hydroxide is added dropwise, then in excess, to a solution containing [Al(H2O)6]3+. What is observed?',
  options: {
    A: 'A white precipitate forms and does not dissolve in excess.',
    B: 'A white precipitate forms and dissolves in excess to give a colourless solution.',
    C: 'A green precipitate forms and dissolves in excess.',
    D: 'No precipitate forms at any stage.'
  },
  answer: 'B',
  why: 'Adding a little hydroxide removes three protons from the coordinated water and gives the neutral complex [Al(H2O)3(OH)3], which is insoluble and appears as a white precipitate. Aluminium hydroxide is amphoteric, so with excess hydroxide a fourth proton is removed to give the soluble anion [Al(H2O)2(OH)4]-, and the precipitate redissolves to a colourless solution. This redissolving is what distinguishes aluminium from, say, magnesium, whose white hydroxide stays put in excess alkali.'
},
{
  id: 'p-12.3.4.19-2', goal: '12.3.4.19', kind: 'structured', marks: 4,
  stem: 'Aqueous ammonia is added slowly, and then in excess, to a solution containing [Cu(H2O)6]2+.\n\n(a) Describe what is seen at each stage. [2]\n(b) Write an equation for the reaction with excess ammonia. [2]',
  scheme: [
    '(a) a pale blue precipitate forms [1]',
    '(a) it dissolves in excess to give a deep blue solution [1]',
    '(b) [Cu(H2O)6]2+ + 4NH3 -> [Cu(NH3)4(H2O)2]2+ + 4H2O [1]',
    '(b) correct charges and formulae throughout [1]'
  ],
  why: 'Ammonia plays two different roles here and the question is testing whether you can tell them apart. In small amounts it acts as a base, removing two protons to give the neutral, insoluble [Cu(H2O)4(OH)2], the pale blue precipitate. In excess it acts as a ligand, substituting for four of the six water molecules to give the deep blue [Cu(NH3)4(H2O)2]2+. Note that only four waters are replaced, not all six: this is the classic exam trap, and writing [Cu(NH3)6]2+ loses the mark.'
},
{
  id: 'p-12.3.4.19-3', goal: '12.3.4.19', kind: 'mcq', marks: 1,
  stem: 'Sodium carbonate solution is added to separate solutions of [Fe(H2O)6]2+ and [Fe(H2O)6]3+. Which row is correct?',
  options: {
    A: 'Fe2+ gives a green precipitate only; Fe3+ gives a brown precipitate with effervescence.',
    B: 'Both give effervescence and a metal carbonate precipitate.',
    C: 'Fe2+ gives effervescence; Fe3+ gives a green precipitate with no gas.',
    D: 'Neither reacts, because carbonate is too weak a base.'
  },
  answer: 'A',
  why: 'The 2+ ion is only weakly acidic, so carbonate simply precipitates the carbonate salt, green FeCO3, with no gas. The 3+ ion has a much higher charge density and is acidic enough to release H+ from its ligand water; that H+ reacts with the carbonate to give carbon dioxide, so you see effervescence, and the iron comes down as the brown hydroxide [Fe(H2O)3(OH)3] rather than the carbonate. This difference is a standard way of telling 2+ from 3+ aqua ions in the lab.'
},

// ---- 12.2.1.27  variable oxidation states --------------------------------
{
  id: 'p-12.2.1.27-1', goal: '12.2.1.27', kind: 'mcq', marks: 1,
  stem: 'Why do transition elements show variable oxidation states, whereas calcium shows only +2?',
  options: {
    A: 'Transition elements have larger atomic radii, so electrons are lost more easily.',
    B: 'The 4s and 3d sub-shells are close in energy, so different numbers of electrons can be lost for similar energy cost.',
    C: 'Transition elements have partly filled f sub-shells.',
    D: 'Transition elements form ions with noble gas configurations in several ways.'
  },
  answer: 'B',
  why: 'In a transition element the 3d and 4s energy levels are close together, so removing one more or one fewer electron costs roughly similar energy and several oxidation states end up being accessible and stable. In calcium the electrons after the 4s2 pair are in the much lower 3p sub-shell, so removing a third electron costs far too much and only +2 is seen. C is simply wrong: the f sub-shell belongs to the lanthanides and actinides. D is wrong because transition metal ions generally do not reach a noble gas configuration at all.'
},
{
  id: 'p-12.2.1.27-2', goal: '12.2.1.27', kind: 'structured', marks: 3,
  stem: 'Vanadium forms the ions VO2+ and VO2+.\n\n(a) Deduce the oxidation state of vanadium in each ion. [2]\n(b) Give the electronic configuration of a vanadium atom in the ground state. [1]',
  scheme: [
    '(a) in VO2+: +4 [1]',
    '(a) in VO2+ (the dioxovanadium(V) ion): +5 [1]',
    '(b) 1s2 2s2 2p6 3s2 3p6 3d3 4s2 [1]'
  ],
  why: 'Oxygen is -2 in both. For VO2+, one oxygen contributes -2 and the overall charge is +2, so vanadium must be +4. For VO2+, two oxygens contribute -4 and the overall charge is +1, so vanadium must be +5. For the configuration, vanadium is element 23, and the 4s fills before the 3d, so you get 3d3 4s2. Do not write 4s2 before 3d3 if the question asks for order of increasing energy, but either ordering is normally accepted when simply stating the configuration.'
},

// ---- 12.2.1.25  coloured ions and colour changes -------------------------
{
  id: 'p-12.2.1.25-1', goal: '12.2.1.25', kind: 'mcq', marks: 1,
  stem: 'Which ion is colourless in aqueous solution?',
  options: { A: '[Cu(H2O)6]2+', B: '[Zn(H2O)6]2+', C: '[Fe(H2O)6]3+', D: '[Cr(H2O)6]3+' },
  answer: 'B',
  why: 'Colour in these complexes comes from d-d transitions: ligands split the d sub-shell into two energy levels, an electron absorbs a photon of visible light to jump the gap, and you see the complementary colour of what was absorbed. That requires a partly filled d sub-shell. Zn2+ is 3d10, completely full, so there is no vacancy to promote an electron into and no absorption in the visible, hence colourless. Cu2+ is 3d9, Fe3+ is 3d5 and Cr3+ is 3d3, all partly filled and all coloured. This is also why zinc is not counted as a transition metal.'
},
{
  id: 'p-12.2.1.25-2', goal: '12.2.1.25', kind: 'structured', marks: 4,
  stem: 'Adding concentrated hydrochloric acid to a blue solution of [Cu(H2O)6]2+ turns it yellow-green.\n\n(a) Write an equation for this reaction. [2]\n(b) Explain, in terms of electronic transitions, why the colour changes. [2]',
  scheme: [
    '(a) [Cu(H2O)6]2+ + 4Cl- -> [CuCl4]2- + 6H2O [1]',
    '(a) correct charge on [CuCl4]2- [1]',
    '(b) the ligands change, so the size of the d orbital splitting changes [1]',
    '(b) a different frequency of light is absorbed, so a different colour is transmitted [1]'
  ],
  why: 'Chloride is a bigger ligand than water, so only four fit around the copper and the shape changes from octahedral to tetrahedral. Watch the charge: four chloride ions bring 4- to a 2+ ion, giving an overall 2-. For the explanation, the key chain is ligand change, then change in the splitting energy between the d orbitals, then a different frequency absorbed, then a different colour seen. Naming the colours alone earns nothing here, since the question asks for the electronic reason.'
},

// ---- 12.2.1.26  spectrometry to determine concentration ------------------
{
  id: 'p-12.2.1.26-1', goal: '12.2.1.26', kind: 'structured', marks: 4,
  stem: 'The concentration of copper(II) ions in a solution is found using a colorimeter.\n\n(a) Explain why a filter is chosen that transmits red light when measuring a blue copper solution. [2]\n(b) Describe how a calibration curve is used to find the unknown concentration. [2]',
  scheme: [
    '(a) the solution absorbs most strongly the colour complementary to the one it appears [1]',
    '(a) a blue solution absorbs red light, so a red filter gives the largest absorbance and the best sensitivity [1]',
    '(b) measure the absorbance of standard solutions of known concentration and plot absorbance against concentration [1]',
    '(b) read the unknown concentration from the graph at the measured absorbance [1]'
  ],
  why: 'A solution looks blue because it is transmitting blue and absorbing red, so red light is what it interacts with and red is what you should shine through it. Using a blue filter would give almost no absorbance and a useless reading. The calibration curve turns absorbance, which you can measure, into concentration, which you cannot: prepare several standards, measure each, plot the straight line through the origin, then interpolate. Always interpolate rather than extrapolate, since the linear relationship fails at high concentration.'
},

// ---- 12.2.1.31  haemoglobin and carbon monoxide --------------------------
{
  id: 'p-12.2.1.31-1', goal: '12.2.1.31', kind: 'mcq', marks: 1,
  stem: 'Why is carbon monoxide toxic?',
  options: {
    A: 'It reacts with oxygen in the lungs to form carbon dioxide, so less oxygen is available.',
    B: 'It binds to the iron in haemoglobin more strongly than oxygen does, so oxygen cannot be transported.',
    C: 'It oxidises the iron in haemoglobin from Fe2+ to Fe3+, which cannot bind oxygen.',
    D: 'It dissolves in the blood plasma and lowers the pH.'
  },
  answer: 'B',
  why: 'Haemoglobin carries oxygen by coordinating it to an Fe2+ ion held in a porphyrin ring. Carbon monoxide is a ligand too, and it binds to that same site far more strongly than oxygen does, forming carboxyhaemoglobin. The binding is effectively irreversible at ordinary concentrations, so those haemoglobin molecules are taken out of service permanently and the blood loses oxygen-carrying capacity. C describes a real chemical change but not the mechanism of carbon monoxide poisoning.'
}

);
