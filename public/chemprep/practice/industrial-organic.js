/* Practice written against the syllabus objectives. Not past paper questions. */
CHEMPREP_PRACTICE.push(

// ---- 11.4.2.10  fractionation of crude oil ----------------------------------
{
  id: 'p-11.4.2.10-1', goal: '11.4.2.10', kind: 'mcq', marks: 1,
  stem: 'Which fraction from the distillation of crude oil has the highest boiling range and is used to surface roads?',
  options: { A: 'kerosene', B: 'naphtha', C: 'bitumen', D: 'refinery gas' },
  answer: 'C',
  why: 'Bitumen is the residue at the bottom of the column: the longest chains (about 40 carbons and more), the strongest London forces, so the highest boiling points; it is thick and sticky, which suits roads and roofing. Refinery gases (C1 to C4) come off the top and are sold as bottled gas. Naphtha is the chemical feedstock that is cracked to make alkenes, and kerosene is jet fuel.'
},
{
  id: 'p-11.4.2.10-2', goal: '11.4.2.10', kind: 'structured', marks: 2,
  stem: 'Explain how crude oil is separated into fractions in a fractionating column. [2]',
  scheme: [
    'crude oil is heated until it vaporises and the vapour rises up a column that is hotter at the bottom and cooler at the top [1]',
    'each fraction condenses where the temperature falls below its boiling point, so fractions with different boiling ranges are collected at different heights [1]'
  ],
  why: 'Boiling point rises with chain length because longer molecules have more electrons and more contact, so stronger London forces. So as the vapour rises and cools, the longest molecules condense first, low down, and the shortest stay as gas right to the top. A fraction is still a mixture, of alkanes with similar numbers of carbon atoms, not a pure compound.'
},

// ---- 11.4.2.12  thermal and catalytic cracking ------------------------------
{
  id: 'p-11.4.2.12-1', goal: '11.4.2.12', kind: 'structured', marks: 4,
  stem: 'Decane, C10H22, can be cracked.\n\n(a) Write an equation for the cracking of decane into octane and one other product. [1]\n(b) State the conditions used in catalytic cracking. [1]\n(c) In thermal cracking, C-C bonds break by homolytic fission. State what this produces. [1]\n(d) Explain why at least one product of cracking an alkane must be an alkene. [1]',
  scheme: [
    '(a) C10H22 -> C8H18 + C2H4 [1]',
    '(b) zeolite catalyst, about 450 °C, slight pressure [1]',
    '(c) free radicals (each fragment keeps one electron of the bond) [1]',
    '(d) there are not enough hydrogen atoms for all the products to be alkanes (CnH2n+2) [1]'
  ],
  why: 'Balance the equation by carbon and hydrogen: 10 - 8 leaves 2 carbons and 22 - 18 leaves 4 hydrogens, so the other product is C2H4, ethene. Part (d) is why: an alkane CnH2n+2 has just enough hydrogen to be one saturated molecule; split it in two and there are two fewer hydrogens than two alkanes would need, so a C=C must form. Thermal cracking, at high temperature and pressure, goes through free radicals and gives a lot of alkenes; catalytic cracking, on a zeolite, gives the branched alkanes and aromatics that make better petrol.'
},

// ---- 11.4.2.28  two routes to ethanol ---------------------------------------
{
  id: 'p-11.4.2.28-1', goal: '11.4.2.28', kind: 'structured', marks: 4,
  stem: 'Ethanol is made industrially by the hydration of ethene or by the fermentation of sugars.\n\n(a) Give two advantages of making ethanol by hydration of ethene. [2]\n(b) Give two advantages of making ethanol by fermentation. [2]',
  scheme: [
    '(a) any two: fast / continuous process; produces pure ethanol; 100% atom economy; high yield (with recycling of unreacted ethene) [2]',
    '(b) any two: renewable raw material (sugar from plants); low temperature and atmospheric pressure, so less energy; simple, cheap equipment [2]'
  ],
  why: 'Hydration: C2H4 + H2O -> C2H5OH with a phosphoric acid catalyst at about 300 °C and 60 atm. Its weakness is the raw material: ethene comes from crude oil, which is finite, and the conditions need a lot of energy. Fermentation: C6H12O6 -> 2C2H5OH + 2CO2 with yeast at about 35 °C and no air. Its weaknesses are speed and purity: it is a slow batch process, it stops at about 15% ethanol when the yeast die, and the ethanol must be separated by fractional distillation. Only one mark per point: do not give "fast" and "continuous" as two separate reasons.'
},

// ---- 11.4.2.29  carbon neutrality -------------------------------------------
{
  id: 'p-11.4.2.29-1', goal: '11.4.2.29', kind: 'structured', marks: 3,
  stem: 'Bioethanol is made by fermenting glucose from sugar cane, and is burnt as a fuel.\n\n(a) Use equations for photosynthesis, fermentation and combustion to explain why bioethanol is described as carbon neutral. [2]\n(b) Explain why it is not completely carbon neutral in practice. [1]',
  scheme: [
    '(a) photosynthesis: 6CO2 + 6H2O -> C6H12O6 + 6O2; fermentation: C6H12O6 -> 2C2H5OH + 2CO2; combustion: 2C2H5OH + 6O2 -> 4CO2 + 6H2O [1]',
    '(a) the 6 CO2 absorbed by the plant equals the 2 + 4 = 6 CO2 released [1]',
    '(b) fossil fuels are burnt for farming machinery, fertiliser manufacture, transport and distillation, releasing extra CO2 [1]'
  ],
  why: 'Carbon neutral means no net change in atmospheric CO2 over the whole cycle. Scale the equations to one glucose: photosynthesis takes in six CO2, fermentation gives two back and burning the two ethanol molecules gives four, so the carbon simply goes round. The argument breaks down because of everything around the chemistry: most of the energy for growing, processing and moving the crop still comes from fossil fuels.'
},

// ---- 11.4.2.30  biofuels and the environment --------------------------------
{
  id: 'p-11.4.2.30-1', goal: '11.4.2.30', kind: 'mcq', marks: 1,
  stem: 'Which is a genuine environmental disadvantage of biofuels?',
  options: {
    A: 'Land used to grow fuel crops cannot be used to grow food, and forests may be cleared for it.',
    B: 'They are made from a finite resource.',
    C: 'Burning them releases more CO2 than the crops absorbed while growing.',
    D: 'They cannot be burnt in car engines.'
  },
  answer: 'A',
  why: 'Biofuels are renewable (so B is wrong), and burning them releases the carbon the plants took in (so C is wrong in principle, even if the process is not perfectly neutral). Bioethanol is blended into petrol and biodiesel into diesel, so D is wrong. The real trade-offs are land, water and fertiliser: growing fuel crops competes with food production, can raise food prices and can drive deforestation, which releases the carbon stored in the trees.'
},

// ---- 12.4.2.13  uses of esters, soaps and biodiesel -------------------------
{
  id: 'p-12.4.2.13-1', goal: '12.4.2.13', kind: 'structured', marks: 4,
  stem: '(a) A fat, glyceryl tristearate, is boiled with aqueous sodium hydroxide. Name the two products. [2]\n(b) Biodiesel is made by heating a vegetable oil with an alcohol and a catalyst. Name the alcohol and the catalyst usually used. [2]',
  scheme: [
    '(a) propane-1,2,3-triol (glycerol) [1]',
    '(a) sodium stearate (the sodium salt of the fatty acid), which is soap [1]',
    '(b) methanol [1]',
    '(b) potassium hydroxide or sodium hydroxide [1]'
  ],
  why: 'Fats and oils are triesters of glycerol with long-chain fatty acids. Alkaline hydrolysis (saponification) goes to completion because the acid ends up as its carboxylate salt, and the sodium salt of a long-chain acid is a soap: an ionic head that dissolves in water and a long hydrocarbon tail that dissolves in grease. Biodiesel swaps the glycerol for methanol (transesterification), giving methyl esters of the fatty acids, which are runny enough to use as fuel, with glycerol as the by-product.'
},

// ---- 12.4.2.14  acid chlorides and acid anhydrides -------------------------
{
  id: 'p-12.4.2.14-1', goal: '12.4.2.14', kind: 'mcq', marks: 1,
  stem: 'Which compound is an acid anhydride?',
  options: {
    A: '(CH3CO)2O',
    B: 'CH3COCl',
    C: 'CH3COOCH3',
    D: 'CH3CONH2'
  },
  answer: 'A',
  why: 'An acid anhydride is two acyl groups joined through one oxygen atom, CH3CO-O-COCH3, formally two acid molecules minus one water. B is an acyl (acid) chloride, C an ester (methyl ethanoate) and D an amide (ethanamide). Anhydrides and acyl chlorides are the two reactive acid derivatives: both acylate water, alcohols, ammonia and amines, but the anhydride reacts more slowly and releases a carboxylic acid instead of HCl.'
},
{
  id: 'p-12.4.2.14-2', goal: '12.4.2.14', kind: 'structured', marks: 2,
  stem: 'Write an equation for the reaction of ethanoic anhydride with methanol, and name both organic products. [2]',
  scheme: [
    '(CH3CO)2O + CH3OH -> CH3COOCH3 + CH3COOH [1]',
    'methyl ethanoate and ethanoic acid [1]'
  ],
  why: 'One acyl group goes to the methanol to make the ester and the other leaves with the bridging oxygen as ethanoic acid. With ethanoyl chloride the by-product would be HCl instead. Compared with making the same ester from ethanoic acid and methanol with an acid catalyst, this reaction is not reversible, so it goes to completion.'
},

// ---- 12.4.2.17  acylation in the manufacture of aspirin ---------------------
{
  id: 'p-12.4.2.17-1', goal: '12.4.2.17', kind: 'structured', marks: 4,
  stem: 'Aspirin is made by reacting 2-hydroxybenzoic acid with ethanoic anhydride.\n\n(a) Which functional group of 2-hydroxybenzoic acid is acylated? [1]\n(b) Give two reasons why industry uses ethanoic anhydride rather than ethanoyl chloride. [2]\n(c) Describe a test showing that a sample of aspirin contains no unreacted 2-hydroxybenzoic acid. [1]',
  scheme: [
    '(a) the phenol (-OH on the ring) group [1]',
    '(b) any two: cheaper; less corrosive; reacts less violently / is easier to control; not hydrolysed so readily by moisture; by-product is ethanoic acid, not toxic HCl fumes [2]',
    '(c) add neutral iron(III) chloride solution: no violet (purple) colour means no phenol group is present [1]'
  ],
  why: 'HOC6H4COOH + (CH3CO)2O -> CH3COOC6H4COOH + CH3COOH. The phenol OH becomes an ester group, while the carboxylic acid group is left alone. The reasons in (b) are the practical ones that matter on an industrial scale: cost and safety. The iron(III) chloride test works because 2-hydroxybenzoic acid still has a phenol group and gives a violet colour; aspirin does not. A sharp melting point at about 136 °C is the other purity check.'
},

// ---- 11.1.4.38  infrared and global warming ---------------------------------
{
  id: 'p-11.1.4.38-1', goal: '11.1.4.38', kind: 'mcq', marks: 1,
  stem: 'Why do carbon dioxide molecules absorb infrared radiation while nitrogen molecules do not?',
  options: {
    A: 'Some vibrations of CO2 change the dipole of the molecule; no vibration of N2 does.',
    B: 'CO2 is a polar molecule and N2 is not.',
    C: 'The triple bond in N2 is too strong to vibrate.',
    D: 'CO2 molecules are heavier than N2 molecules.'
  },
  answer: 'A',
  why: 'A molecule absorbs infrared only if the vibration changes its dipole. In N2 the two atoms are identical, so stretching the bond never creates a dipole. CO2 is linear and non-polar overall (so B is wrong), but when one C=O bond stretches while the other shortens, or when the molecule bends, the charges no longer cancel and a dipole appears, so those vibrations absorb. That is why CO2, H2O and CH4 are greenhouse gases and N2 and O2, most of the atmosphere, are not.'
},
{
  id: 'p-11.1.4.38-2', goal: '11.1.4.38', kind: 'structured', marks: 3,
  stem: 'Explain how carbon dioxide in the atmosphere contributes to global warming. [3]',
  scheme: [
    'the Earth absorbs radiation from the Sun and re-emits it as infrared [1]',
    'CO2 molecules absorb this infrared, which makes their bonds vibrate [1]',
    'they re-emit the energy in all directions, some back towards the Earth, so the lower atmosphere warms [1]'
  ],
  why: 'Sunlight is mostly visible and UV, which passes through the atmosphere. The warmed surface emits at much longer, infrared, wavelengths, and those are the wavelengths that greenhouse gases absorb. Without any greenhouse effect the Earth would be well below freezing; the problem is the enhanced effect from the extra CO2 released by burning fossil fuels. How much a gas contributes depends on how strongly it absorbs, its concentration and how long it stays in the atmosphere.'
},

// ---- 11.1.4.42  magnetic resonance imaging ---------------------------------
{
  id: 'p-11.1.4.42-1', goal: '11.1.4.42', kind: 'mcq', marks: 1,
  stem: 'Magnetic resonance imaging (MRI) uses the same principle as NMR spectroscopy. Which nuclei give the signal in a body scan?',
  options: {
    A: 'hydrogen nuclei, mostly in water and fat',
    B: 'carbon-13 nuclei in proteins',
    C: 'oxygen-16 nuclei in water',
    D: 'the electrons in all the atoms'
  },
  answer: 'A',
  why: 'The body is mostly water, and fat is rich in hydrogen too, so there are plenty of 1H nuclei. In a strong magnetic field they absorb radio waves, and different tissues give different signals because they differ in water content and chemical environment, which a computer turns into an image of soft tissue. Carbon-13 is only 1% of carbon, and oxygen-16 has no nuclear spin, so it gives no NMR signal. Radio waves are not ionising radiation, which makes MRI safer than X-rays for repeated scans.'
}

);
