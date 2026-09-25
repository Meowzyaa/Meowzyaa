/* Practice written against the syllabus objectives. Not past paper questions. */
CHEMPREP_PRACTICE.push(

// ---- 11.2.1.1  forms of the Periodic Table ----------------------------------
{
  id: 'p-11.2.1.1-1', goal: '11.2.1.1', kind: 'mcq', marks: 1,
  stem: 'Mendeleev left gaps in his Periodic Table of 1869. Why?',
  options: {
    A: 'He left them for elements not yet discovered, and predicted their properties.',
    B: 'He left them for the noble gases, which he knew were unreactive.',
    C: 'He arranged the elements by proton number, and some proton numbers were missing.',
    D: 'He left them for isotopes of the elements already in the table.'
  },
  answer: 'A',
  why: 'Mendeleev ordered the elements by atomic mass but put grouping by properties first, so where the next known element did not fit the pattern he left a space. He predicted the properties of the missing elements, and gallium and germanium (his eka-aluminium and eka-silicon) were later found to match. The noble gases were not known in 1869, and proton numbers were only established by Moseley in 1913: the modern table is ordered by them, which fixes pairs such as tellurium and iodine that are out of order by mass.'
},

// ---- 11.2.1.3  s, p, d and f blocks ----------------------------------------
{
  id: 'p-11.2.1.3-1', goal: '11.2.1.3', kind: 'mcq', marks: 1,
  stem: 'An element has the electron configuration 1s2 2s2 2p6 3s2 3p6 3d5 4s2. In which block of the Periodic Table is it?',
  options: { A: 's block', B: 'p block', C: 'd block', D: 'f block' },
  answer: 'C',
  why: 'The block is named after the subshell that is being filled by the element\'s highest-energy electron. Following the filling order, 4s fills before 3d, so this element (manganese) is adding its last electrons to the 3d subshell and is in the d block, even though the configuration is often written ending in 4s2. The s block is groups 1 and 2, the p block groups 13 to 18, and the f block the lanthanides and actinides.'
},

// ---- 11.2.1.13  chlorine in water treatment ---------------------------------
{
  id: 'p-11.2.1.13-1', goal: '11.2.1.13', kind: 'structured', marks: 3,
  stem: '(a) Write an equation for the reaction of chlorine with water. [1]\n(b) Give one benefit and one risk of adding chlorine to drinking water. [2]',
  scheme: [
    '(a) Cl2 + H2O -> HCl + HClO (equilibrium arrow accepted) [1]',
    '(b) benefit: kills bacteria, preventing diseases such as cholera and typhoid [1]',
    '(b) risk: chlorine is toxic / it reacts with organic matter to form chlorinated hydrocarbons that may cause cancer [1]'
  ],
  why: 'The reaction is a disproportionation: chlorine (0) goes to -1 in HCl and +1 in HClO. Chloric(I) acid is the species that kills bacteria. The risk-benefit judgement is what the objective asks for: the chlorinated organic compounds formed, such as trichloromethane, carry a small long-term risk, while untreated water carries a large and immediate risk of disease, so chlorination is judged worth it.'
},

// ---- 11.2.1.17  BaCl2 and BaSO4 --------------------------------------------
{
  id: 'p-11.2.1.17-1', goal: '11.2.1.17', kind: 'mcq', marks: 1,
  stem: 'Barium ions are toxic, yet patients swallow barium sulfate before an X-ray of the digestive system. Why is this safe?',
  options: {
    A: 'Barium sulfate is insoluble, so barium ions are not absorbed into the body.',
    B: 'Barium sulfate reacts with stomach acid to form harmless barium chloride.',
    C: 'The sulfate ions neutralise the toxic effect of barium.',
    D: 'Barium sulfate is broken down by X-rays.'
  },
  answer: 'A',
  why: 'Group 2 sulfates become less soluble down the group, and barium sulfate is so insoluble that almost no Ba2+ ions dissolve to be absorbed. Barium is a heavy atom that absorbs X-rays strongly, so the coated gut shows up clearly. B is dangerous nonsense: barium chloride is soluble and toxic. The same insolubility is why acidified BaCl2 solution is the test for sulfate ions: a white precipitate of BaSO4 forms.'
},

// ---- 11.2.3.9  commercial cells --------------------------------------------
{
  id: 'p-11.2.3.9-1', goal: '11.2.3.9', kind: 'mcq', marks: 1,
  stem: 'In an alkaline cell (an ordinary AA battery), which substance is the negative electrode?',
  options: {
    A: 'zinc',
    B: 'manganese(IV) oxide',
    C: 'potassium hydroxide',
    D: 'graphite'
  },
  answer: 'A',
  why: 'The negative electrode is where oxidation happens and electrons are released into the circuit, so it is the reducing agent: zinc, which is oxidised to zinc oxide or hydroxide. Manganese(IV) oxide is the positive electrode, where reduction happens. Potassium hydroxide is the electrolyte, which is why the cell is called alkaline. The cell gives about 1.5 V and is not rechargeable, unlike lead-acid and lithium-ion cells.'
},

// ---- 12.2.1.1  occurrence and extraction of group 14 ------------------------
{
  id: 'p-12.2.1.1-1', goal: '12.2.1.1', kind: 'structured', marks: 4,
  stem: '(a) Silicon is extracted by heating silica with carbon in an electric furnace. Write an equation for the reaction. [1]\n(b) Lead is extracted from galena, PbS, in two stages. Write an equation for each stage. [2]\n(c) State one environmental problem caused by extracting lead. [1]',
  scheme: [
    '(a) SiO2 + 2C -> Si + 2CO [1]',
    '(b) roasting: 2PbS + 3O2 -> 2PbO + 2SO2 [1]',
    '(b) reduction: PbO + C -> Pb + CO (or 2PbO + C -> 2Pb + CO2) [1]',
    '(c) SO2 released causes acid rain / lead dust and fumes are toxic [1]'
  ],
  why: 'Most metals down group 14 occur as oxides or sulfides and are reduced by carbon. A sulfide is roasted in air first, because carbon reduces oxides, not sulfides; that step is what releases SO2, which has to be captured, often to make sulfuric acid. Tin is extracted in the same way from cassiterite, SnO2. Silicon needs an electric furnace at about 2000 °C because SiO2 is a very stable giant covalent structure.'
},

// ---- 12.2.1.13  occurrence of sulfur ---------------------------------------
{
  id: 'p-12.2.1.13-1', goal: '12.2.1.13', kind: 'mcq', marks: 1,
  stem: 'Where does most of the sulfur produced today come from?',
  options: {
    A: 'removing hydrogen sulfide and sulfur compounds from natural gas and crude oil',
    B: 'mining native sulfur from volcanic deposits',
    C: 'heating gypsum, CaSO4.2H2O',
    D: 'electrolysis of molten metal sulfides'
  },
  answer: 'A',
  why: 'Natural gas and crude oil contain H2S and organic sulfur compounds that must be removed anyway, because burning them would release SO2. The H2S is partly burnt to SO2, and the two react to give sulfur: 2H2S + SO2 -> 3S + 2H2O. So sulfur is now mostly a by-product of cleaning fuels. It also occurs as the element near volcanoes, in sulfide ores such as galena (PbS) and pyrite (FeS2), and in sulfates such as gypsum.'
},

// ---- 12.2.1.14  structure and allotropy of sulfur ---------------------------
{
  id: 'p-12.2.1.14-1', goal: '12.2.1.14', kind: 'mcq', marks: 1,
  stem: 'Which statement about rhombic and monoclinic sulfur is correct?',
  options: {
    A: 'Both are made of S8 rings, packed in different ways.',
    B: 'Rhombic sulfur is made of S8 rings and monoclinic sulfur of S2 molecules.',
    C: 'Monoclinic sulfur is the stable form at room temperature.',
    D: 'They have different chemical properties because they are different elements.'
  },
  answer: 'A',
  why: 'Allotropes are different structural forms of the same element in the same physical state. Both crystalline forms of sulfur consist of crown-shaped S8 rings; they differ only in how the rings pack in the crystal. Rhombic is the stable form below about 96 °C and monoclinic above it. Pouring molten sulfur into cold water gives plastic sulfur, made of long chains, which slowly reverts to rhombic. The chemical properties are the same, because it is all sulfur.'
},

// ---- 12.3.4.17  acid-base theories -----------------------------------------
{
  id: 'p-12.3.4.17-1', goal: '12.3.4.17', kind: 'mcq', marks: 1,
  stem: 'Boron trifluoride reacts with ammonia: BF3 + NH3 -> F3B-NH3. Which theory describes BF3 as an acid in this reaction?',
  options: {
    A: 'the Lewis theory only',
    B: 'the Arrhenius theory only',
    C: 'the Bronsted-Lowry theory only',
    D: 'all three theories'
  },
  answer: 'A',
  why: 'No proton is transferred and there is no water, so neither the Arrhenius theory (acids give H+ ions in water) nor the Bronsted-Lowry theory (acids donate protons) applies. In Lewis terms, the lone pair on the nitrogen of NH3 forms a dative bond to the boron, which has only six outer electrons and an empty orbital: BF3 accepts an electron pair, so it is a Lewis acid, and NH3 is a Lewis base.'
},
{
  id: 'p-12.3.4.17-2', goal: '12.3.4.17', kind: 'structured', marks: 3,
  stem: 'Ammonia gas reacts with hydrogen chloride gas: NH3(g) + HCl(g) -> NH4Cl(s).\n\n(a) Explain why this is an acid-base reaction according to the Bronsted-Lowry theory but not according to the Arrhenius theory. [2]\n(b) Identify the Lewis base in the reaction, giving a reason. [1]',
  scheme: [
    '(a) Bronsted-Lowry: HCl donates a proton to NH3, which accepts it [1]',
    '(a) Arrhenius needs H+ and OH- ions in aqueous solution; this reaction happens in the gas phase with no water and no OH- [1]',
    '(b) NH3, because it donates its lone pair to the H+ (forming a dative bond) [1]'
  ],
  why: 'Each theory widens the one before. Arrhenius works only in water. Bronsted-Lowry keeps the proton but drops the water, so it covers this gas-phase reaction. Lewis drops the proton too and looks only at the electron pair, so it also covers BF3 with NH3 and metal ions with ligands. In the NH4+ ion formed here, one N-H bond is a dative bond made from the nitrogen lone pair, but once formed it is identical to the other three.'
}

);
