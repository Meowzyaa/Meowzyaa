/* Practice written against the syllabus objectives. Not past paper questions. */
CHEMPREP_PRACTICE.push(

// ---- 12.4.1.1  chemistry solving environmental problems ---------------------
{
  id: 'p-12.4.1.1-1', goal: '12.4.1.1', kind: 'structured', marks: 4,
  stem: 'Car exhaust gases contain carbon monoxide, nitrogen monoxide and unburnt hydrocarbons. A catalytic converter removes them.\n\n(a) Write an equation for the reaction between CO and NO in the converter. [1]\n(b) Name one metal used as the catalyst. [1]\n(c) Explain why the catalyst is spread as a thin layer over a ceramic honeycomb. [1]\n(d) Explain why a car with a catalytic converter must not use leaded petrol. [1]',
  scheme: [
    '(a) 2CO + 2NO -> 2CO2 + N2 [1]',
    '(b) platinum / palladium / rhodium [1]',
    '(c) gives a very large surface area for the gases to adsorb on, using little of the expensive metal [1]',
    '(d) lead adsorbs onto the active sites and poisons the catalyst [1]'
  ],
  why: 'Both pollutants are removed in one step: NO is reduced to harmless N2 and CO is oxidised to CO2, so one is the oxidising agent for the other. The catalyst is heterogeneous, so the reaction happens on its surface: the gases adsorb onto active sites, react, and the products desorb. That is why surface area matters so much and why anything that sticks permanently to the sites, like lead, ruins it. Note the converter turns CO into CO2, so it does nothing about greenhouse gas emissions.'
},
{
  id: 'p-12.4.1.1-2', goal: '12.4.1.1', kind: 'mcq', marks: 1,
  stem: 'Coal-fired power stations remove sulfur dioxide from their flue gases before release. Which reaction is used?',
  options: {
    A: 'CaO + SO2 -> CaSO3',
    B: 'SO2 + H2O -> H2SO3',
    C: '2SO2 + O2 -> 2SO3',
    D: 'S + O2 -> SO2'
  },
  answer: 'A',
  why: 'Flue gas desulfurisation passes the gases through a slurry of calcium oxide or calcium carbonate. SO2 is an acidic oxide, so it reacts with the basic CaO (or with CaCO3, releasing CO2) to form calcium sulfite, which can be oxidised on to calcium sulfate and sold as gypsum for plasterboard. B is what happens in the atmosphere to make acid rain, which is the problem, not the fix. C and D are steps of the Contact process.'
},

// ---- 12.4.1.2  using natural resources efficiently --------------------------
{
  id: 'p-12.4.1.2-1', goal: '12.4.1.2', kind: 'mcq', marks: 1,
  stem: 'Recycling aluminium uses only about 5% of the energy needed to extract the same mass from bauxite. What is the main reason?',
  options: {
    A: 'Extraction needs electrolysis of molten aluminium oxide, which uses a very large amount of electricity.',
    B: 'Recycled aluminium is purer than extracted aluminium.',
    C: 'Bauxite contains very little aluminium oxide.',
    D: 'Aluminium is too reactive to be reduced by carbon, so it must be heated to a higher temperature.'
  },
  answer: 'A',
  why: 'Aluminium is more reactive than carbon, so it cannot be extracted by heating the oxide with carbon. It is made by electrolysis of alumina dissolved in molten cryolite at around 950 °C, and both keeping the bath molten and driving the electrolysis cost enormous amounts of electrical energy. Melting scrap aluminium only needs enough heat to melt it (660 °C) with no chemical change. D names a true fact about reactivity but draws the wrong conclusion: the answer is electrolysis, not a hotter furnace.'
},
{
  id: 'p-12.4.1.2-2', goal: '12.4.1.2', kind: 'structured', marks: 4,
  stem: 'Green chemistry aims to use resources more efficiently.\n\n(a) State what is meant by the atom economy of a reaction. [1]\n(b) Explain how using a catalyst helps a process use resources more efficiently. [1]\n(c) Poly(lactic acid) can be made from lactic acid obtained from maize. Give one advantage of this over making a polymer from crude oil. [1]\n(d) Suggest one reason why the plant-based route may not be better overall. [1]',
  scheme: [
    '(a) the mass (or Mr) of the desired product as a percentage of the total mass (or Mr) of all the reactants [1]',
    '(b) lowers the activation energy so the process runs at a lower temperature / pressure, using less energy (fuel) [1]',
    '(c) renewable feedstock / the polymer is biodegradable / conserves crude oil [1]',
    '(d) land used for crops cannot grow food / energy and fertilisers used in farming / water use / deforestation [1]'
  ],
  why: 'Atom economy measures waste built into the equation itself: an addition reaction puts every reactant atom into the product (100 %), while substitution and elimination always make a by-product. It is different from percentage yield, which measures how much you actually got. Catalysts save resources indirectly, through energy: most industrial energy still comes from burning fossil fuels. For (d), examiners reward a balanced view, and the land-use argument is the most common one.'
},

// ---- 12.4.2.39  compounds with physiological action -------------------------
{
  id: 'p-12.4.2.39-1', goal: '12.4.2.39', kind: 'mcq', marks: 1,
  stem: 'Which substance does NOT have a physiological action?',
  options: {
    A: 'aspirin',
    B: 'adrenaline',
    C: 'penicillin',
    D: 'poly(ethene)'
  },
  answer: 'D',
  why: 'A compound has a physiological action when it changes how the body works, usually by binding to a receptor or an enzyme. Aspirin is a painkiller that blocks an enzyme, adrenaline is a hormone that binds to receptors, and penicillin is an antibiotic that blocks an enzyme bacteria need for their cell walls. Poly(ethene) is a long, inert, non-polar chain that the body neither absorbs nor reacts with, which is exactly why it is used for food packaging.'
},

// ---- 12.4.2.40  natural compounds that can be synthesised -------------------
{
  id: 'p-12.4.2.40-1', goal: '12.4.2.40', kind: 'structured', marks: 3,
  stem: 'Willow bark contains a compound that the body converts to salicylic acid (2-hydroxybenzoic acid), which relieves pain. Aspirin is made from salicylic acid.\n\n(a) Give two reasons why a drug found in nature is usually synthesised in a laboratory rather than extracted from its natural source. [2]\n(b) Suggest why aspirin is used as a medicine rather than salicylic acid itself. [1]',
  scheme: [
    '(a) any two: larger quantities / a reliable supply; consistent purity and dose; cheaper; protects the plant or animal source; the structure can be modified to improve it [2]',
    '(b) salicylic acid irritates / damages the stomach lining; aspirin causes less irritation [1]'
  ],
  why: 'A natural source varies from plant to plant and season to season, so the amount of active compound is unpredictable, and harvesting it on a large scale can destroy the source. Synthesis fixes both problems. The more important advantage is (a)\'s last point: once the structure is known, chemists can modify it. Aspirin is exactly that: acylating the phenol OH group of salicylic acid keeps the pain relief but makes it much less harsh on the stomach.'
},

// ---- 12.4.2.41  molecular shape and chirality -------------------------------
{
  id: 'p-12.4.2.41-1', goal: '12.4.2.41', kind: 'mcq', marks: 1,
  stem: 'The two enantiomers of a drug often have different effects in the body. What is the reason?',
  options: {
    A: 'The enantiomers have different boiling points.',
    B: 'Receptors and enzymes are chiral, so usually only one enantiomer fits the binding site.',
    C: 'One of the two enantiomers is always toxic.',
    D: 'The enantiomers have different molecular formulae.'
  },
  answer: 'B',
  why: 'Enantiomers have identical physical properties (so A is wrong) and identical formulae (D is wrong); they differ only in the three-dimensional arrangement around the chiral centre. Receptors and enzymes are built from chiral L-amino acids, so the binding site is chiral too, and like a left hand in a right-handed glove, the wrong enantiomer does not fit properly. C overstates it: often the other enantiomer is simply inactive. Thalidomide is the famous case where it was harmful.'
},
{
  id: 'p-12.4.2.41-2', goal: '12.4.2.41', kind: 'structured', marks: 3,
  stem: 'A chiral drug is made in the laboratory from reactants that are not chiral.\n\n(a) Explain why the product is a racemic mixture. [2]\n(b) Give one advantage of selling the drug as a single enantiomer. [1]',
  scheme: [
    '(a) the reaction goes through a planar intermediate (for example a carbocation or a carbonyl group) [1]',
    '(a) which is attacked equally from either side, giving equal amounts of the two enantiomers [1]',
    '(b) smaller dose needed / fewer side effects / no risk from the harmful enantiomer [1]'
  ],
  why: 'Think of the nucleophilic addition of HCN to ethanal or an SN1 reaction: the carbon being attacked is trigonal planar, and nothing in a non-chiral reaction mixture favours one face over the other, so each face is attacked half the time. A 50:50 mixture of enantiomers is racemic and optically inactive. Separating enantiomers is difficult and wasteful, which is why chemists now use chiral catalysts or enzymes, or start from a naturally chiral molecule, to make only the one they want.'
},

// ---- 12.4.2.42  structure determination in drug design ----------------------
{
  id: 'p-12.4.2.42-1', goal: '12.4.2.42', kind: 'mcq', marks: 1,
  stem: 'A drug company wants to design a molecule that fits the active site of an enzyme. Which technique shows the three-dimensional shape of the enzyme and its active site?',
  options: {
    A: 'X-ray crystallography',
    B: 'gas chromatography',
    C: 'acid-base titration',
    D: 'flame emission test'
  },
  answer: 'A',
  why: 'X-ray diffraction by a crystal of the protein gives the positions of its atoms, and so the exact shape of the active site. Chemists then use computer modelling to design molecules that fit it and bond to it through hydrogen bonds, ionic attractions and van der Waals forces. NMR and mass spectrometry are used alongside, mostly to confirm the structures of the new molecules that are made. Gas chromatography separates mixtures; it does not give shapes.'
},

// ---- 12.4.2.43  synthetic drugs ---------------------------------------------
{
  id: 'p-12.4.2.43-1', goal: '12.4.2.43', kind: 'mcq', marks: 1,
  stem: 'Which drug is correctly matched with its use?',
  options: {
    A: 'aspirin: antibiotic',
    B: 'penicillin: antibiotic',
    C: 'cisplatin: antacid',
    D: 'paracetamol: anticancer drug'
  },
  answer: 'B',
  why: 'Penicillins kill bacteria by blocking the enzyme that builds their cell walls; semi-synthetic versions such as amoxicillin were made to beat resistant strains. Aspirin is a painkiller and anti-inflammatory that also thins the blood. Cisplatin is the anticancer drug: the square planar platinum complex binds to DNA and stops cancer cells dividing. Paracetamol treats pain and fever, and an overdose damages the liver. Antacids are bases such as Mg(OH)2, CaCO3 and NaHCO3.'
},

// ---- 12.4.2.44  drug delivery ----------------------------------------------
{
  id: 'p-12.4.2.44-1', goal: '12.4.2.44', kind: 'structured', marks: 4,
  stem: '(a) Insulin is a protein. Explain why it cannot be given as a tablet. [2]\n(b) A drug is a weak carboxylic acid, RCOOH, with a low solubility in water. Suggest how it could be made more soluble, and explain why this works. [2]',
  scheme: [
    '(a) it would be hydrolysed in the stomach / digested by protease enzymes [1]',
    '(a) its peptide bonds are broken, so it no longer works / it is not absorbed intact [1]',
    '(b) convert it into its sodium salt, RCOO-Na+, by reaction with NaOH or NaHCO3 [1]',
    '(b) the salt is ionic and the ions are hydrated by (form ion-dipole attractions with) water molecules [1]'
  ],
  why: 'The gut is built to break proteins down: stomach acid and protease enzymes hydrolyse peptide bonds into amino acids. So protein drugs are injected, straight into the blood. For (b), soluble aspirin is exactly this idea: the calcium or sodium salt of the acid dissolves far better than the neutral molecule. Amine drugs are made soluble the other way round, as their hydrochloride salts, RNH3+Cl-.'
},

// ---- 12.4.2.45  properties of polymers from their structure -----------------
{
  id: 'p-12.4.2.45-1', goal: '12.4.2.45', kind: 'mcq', marks: 1,
  stem: 'Poly(ethenol) dissolves in water and is used for hospital laundry bags. Poly(ethene) does not dissolve. What explains the difference?',
  options: {
    A: 'Poly(ethenol) has OH groups that form hydrogen bonds with water molecules.',
    B: 'Poly(ethenol) has much shorter chains than poly(ethene).',
    C: 'Poly(ethenol) is an ionic compound.',
    D: 'Poly(ethene) chains are cross-linked by covalent bonds.'
  },
  answer: 'A',
  why: 'Poly(ethenol) has an OH group on every other carbon of the chain. Those OH groups hydrogen bond to water, and the energy released lets water molecules separate the chains. Poly(ethene) is a non-polar hydrocarbon with only London forces between chains, so water, which prefers its own hydrogen bonds, cannot get in. The laundry bag dissolves in the washing machine, so staff never handle the infected sheets.'
},

// ---- 12.4.2.46  the nanoscale ----------------------------------------------
{
  id: 'p-12.4.2.46-1', goal: '12.4.2.46', kind: 'mcq', marks: 1,
  stem: 'A nanoparticle has a diameter of 20 nm. What is this diameter in metres?',
  options: {
    A: '2 x 10-9 m',
    B: '2 x 10-8 m',
    C: '2 x 10-7 m',
    D: '2 x 10-6 m'
  },
  answer: 'B',
  why: '1 nm = 1 x 10-9 m, so 20 nm = 20 x 10-9 m = 2 x 10-8 m. Nanoparticles are between 1 and 100 nm across. For scale, a typical atom is about 0.1 to 0.3 nm across, so a 20 nm particle is roughly a hundred atoms wide.'
},
{
  id: 'p-12.4.2.46-2', goal: '12.4.2.46', kind: 'structured', marks: 2,
  stem: 'Explain why nanoparticles of platinum are a more effective catalyst than the same mass of ordinary platinum powder.',
  scheme: [
    'nanoparticles have a much larger surface area to volume ratio / a much larger total surface area [1]',
    'so a larger proportion of the platinum atoms are at the surface and available as active sites [1]'
  ],
  why: 'A heterogeneous catalyst works only at its surface; atoms buried inside the particle do nothing. Cutting the same mass into smaller pieces exposes more surface: halving the particle diameter doubles the surface area to volume ratio. At the nanoscale a large fraction of all the atoms are surface atoms, so far less of an expensive metal is needed for the same activity.'
},

// ---- 12.4.2.47  carbon nanoparticles ----------------------------------------
{
  id: 'p-12.4.2.47-1', goal: '12.4.2.47', kind: 'structured', marks: 4,
  stem: 'Buckminsterfullerene, C60, and graphene are forms of carbon.\n\n(a) State how many other carbon atoms each carbon atom is bonded to in C60. [1]\n(b) C60 sublimes at about 530 °C, but diamond does not melt until above 3500 °C. Explain the difference. [2]\n(c) Explain why graphene conducts electricity. [1]',
  scheme: [
    '(a) three [1]',
    '(b) C60 is simple molecular: only weak intermolecular (London) forces between C60 molecules need to be overcome [1]',
    '(b) diamond is giant covalent: many strong covalent bonds must be broken [1]',
    '(c) each carbon has one delocalised electron, free to move across the sheet [1]'
  ],
  why: 'In C60 each carbon, like each carbon in graphite, uses three electrons in sigma bonds to three neighbours, and the fourth is delocalised over the cage. The molecule is a closed sphere of 12 pentagons and 20 hexagons, so the bonding within it is strong but separate molecules are held together only by London forces, which is also why C60 dissolves in organic solvents such as methylbenzene. Graphene is a single layer of graphite, and its delocalised electrons move freely within the layer.'
},
{
  id: 'p-12.4.2.47-2', goal: '12.4.2.47', kind: 'mcq', marks: 1,
  stem: 'Carbon nanotubes are added to the frames of tennis rackets and bicycles. Which property makes them useful for this?',
  options: {
    A: 'They are very strong in tension but have a low density.',
    B: 'They are soluble in water.',
    C: 'They are electrical insulators.',
    D: 'They are soft and easily deformed.'
  },
  answer: 'A',
  why: 'A nanotube is a sheet of graphene rolled into a cylinder about 1 nm across, held together by strong covalent bonds all the way along its length. That gives enormous tensile strength for very little mass, so a small amount strengthens a composite without adding weight. They also conduct electricity along the tube through their delocalised electrons, so C is the opposite of the truth.'
},

// ---- 12.4.2.48  uses of nanoparticles ---------------------------------------
{
  id: 'p-12.4.2.48-1', goal: '12.4.2.48', kind: 'mcq', marks: 1,
  stem: 'Many sunscreens contain nanoparticles of zinc oxide instead of ordinary zinc oxide powder. Why?',
  options: {
    A: 'The nanoparticles still block UV radiation but are too small to scatter visible light, so the cream looks transparent on the skin.',
    B: 'The nanoparticles react with UV radiation to form a protective layer of ozone.',
    C: 'The nanoparticles dissolve in water, so the cream washes off easily.',
    D: 'The nanoparticles are less toxic than ordinary zinc oxide because they are smaller.'
  },
  answer: 'A',
  why: 'Ordinary zinc oxide and titanium dioxide powders block UV well but also scatter visible light, leaving a white layer on the skin. Particles much smaller than the wavelength of visible light (400 to 700 nm) hardly scatter it, so the cream goes on clear while still absorbing UV. D is the opposite of the real worry: because nanoparticles are so small, there is concern that they may pass into the body, and their long-term effects are not fully known.'
},
{
  id: 'p-12.4.2.48-2', goal: '12.4.2.48', kind: 'structured', marks: 2,
  stem: 'Silver nanoparticles are added to wound dressings and to some clothing.\n\n(a) Suggest why they are used. [1]\n(b) Give one concern about the widespread use of nanoparticles. [1]',
  scheme: [
    '(a) they are antibacterial / kill bacteria (and their large surface area makes them very effective) [1]',
    '(b) they may enter the body (lungs, skin, cells) with unknown long-term effects / they are released into the environment when washed, where their effects are unknown [1]'
  ],
  why: 'Silver ions are toxic to bacteria, and the huge surface area of nanoparticles releases them steadily, so a tiny mass gives long-lasting protection. The concern cuts the other way: particles small enough to be so effective are small enough to pass into cells, and silver washed out of socks and dressings ends up in rivers and sewage works, where it can kill useful bacteria. Any sensible, specific risk earns the mark.'
}

);
