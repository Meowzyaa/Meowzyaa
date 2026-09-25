/* Practice written against the syllabus objectives. Not past paper questions. */
CHEMPREP_PRACTICE.push(

// ---- 12.4.2.49  reactions that characterise functional groups ---------------
{
  id: 'p-12.4.2.49-1', goal: '12.4.2.49', kind: 'mcq', marks: 1,
  stem: 'Which reagent would distinguish propanal from propanone?',
  options: {
    A: '2,4-dinitrophenylhydrazine',
    B: 'Tollens\' reagent',
    C: 'bromine water',
    D: 'sodium carbonate solution'
  },
  answer: 'B',
  why: 'Both compounds contain C=O, so both give an orange precipitate with 2,4-DNPH: that test shows a carbonyl group but cannot tell an aldehyde from a ketone. Tollens\' reagent is a mild oxidising agent: propanal is oxidised to propanoate and a silver mirror forms, while propanone, a ketone, cannot be oxidised and gives no change. Neither decolourises bromine water (no C=C) or fizzes with sodium carbonate (no COOH).'
},
{
  id: 'p-12.4.2.49-2', goal: '12.4.2.49', kind: 'structured', marks: 4,
  stem: 'Compound X has the molecular formula C3H6O. It gives:\n- an orange precipitate with 2,4-dinitrophenylhydrazine\n- no silver mirror when warmed with Tollens\' reagent\n- a yellow precipitate when warmed with iodine and sodium hydroxide\n\nIdentify X, and explain what each observation shows. [4]',
  scheme: [
    'orange precipitate: X contains a C=O group (aldehyde or ketone) [1]',
    'no silver mirror: X is not an aldehyde, so it is a ketone [1]',
    'yellow precipitate (CHI3): X contains the CH3CO- group [1]',
    'X is propanone, CH3COCH3 [1]'
  ],
  why: 'Work through the tests in order and let each one narrow the options. C3H6O with a carbonyl group can only be propanal or propanone. Tollens\' rules out the aldehyde. The iodoform test then confirms it: the yellow precipitate of tri-iodomethane forms with CH3CO- compounds (and with CH3CH(OH)- alcohols, which are oxidised to them first). Propanone has the CH3CO- group; propanal does not, so it would have failed this test as well as passing Tollens\'.'
},

// ---- 12.4.2.51  synthetically useful reactions ------------------------------
{
  id: 'p-12.4.2.51-1', goal: '12.4.2.51', kind: 'mcq', marks: 1,
  stem: 'Which reaction increases the length of the carbon chain by one carbon atom?',
  options: {
    A: 'bromoethane heated under reflux with KCN in ethanol',
    B: 'ethanol heated with acidified potassium dichromate(VI)',
    C: 'ethene reacted with steam over a phosphoric acid catalyst',
    D: 'ethanol heated with concentrated sulfuric acid'
  },
  answer: 'A',
  why: 'The cyanide ion is a nucleophile that brings its own carbon: CH3CH2Br + CN- -> CH3CH2CN + Br-. The product, propanenitrile, has three carbons from a two-carbon start, and it is useful because the nitrile can then be hydrolysed to a carboxylic acid or reduced to an amine. Adding HCN to an aldehyde or ketone also adds one carbon. The other three reactions change the functional group but keep two carbons.'
},
{
  id: 'p-12.4.2.51-2', goal: '12.4.2.51', kind: 'structured', marks: 2,
  stem: 'Chloroethane can be made by reacting ethane with chlorine in ultraviolet light, but this is a poor method of synthesis. Explain why. [2]',
  scheme: [
    'further substitution gives a mixture of products (CH3CHCl2, CH2ClCH2Cl and so on) / termination gives butane [1]',
    'so the yield of chloroethane is low and it must be separated from the mixture [1]'
  ],
  why: 'Free radical substitution cannot be controlled: once chloroethane forms, a chlorine radical can remove another hydrogen from it just as easily, and termination steps join radicals together to make butane. The result is a mixture that must be separated by fractional distillation. A synthetically useful reaction gives one main product: here, ethanol with PCl5 or ethene with HCl would give chloroethane cleanly.'
},

// ---- 12.4.2.52  spider diagrams ---------------------------------------------
{
  id: 'p-12.4.2.52-1', goal: '12.4.2.52', kind: 'structured', marks: 5,
  stem: 'Complete a spider diagram for ethene by giving the reagent and conditions needed to convert ethene into each of the following.\n\n(a) ethanol [1]\n(b) bromoethane [1]\n(c) 1,2-dibromoethane [1]\n(d) ethane [1]\n(e) poly(ethene) [1]',
  scheme: [
    '(a) steam, phosphoric acid catalyst, about 300 °C and 60 atm [1]',
    '(b) hydrogen bromide, room temperature [1]',
    '(c) bromine, room temperature [1]',
    '(d) hydrogen, nickel catalyst, about 150 °C [1]',
    '(e) high pressure with a trace of oxygen as initiator / Ziegler-Natta catalyst [1]'
  ],
  why: 'Every arm here is an addition across the C=C bond, which is why the alkene is such a useful starting point. Conditions carry the mark as much as the reagent: steam needs the catalyst, temperature and pressure; hydrogen needs the nickel. Learn a spider diagram for each key functional group (alkene, halogenoalkane, alcohol, carbonyl, carboxylic acid) and join them into one map: most synthesis questions are two arms of that map in a row.'
},
{
  id: 'p-12.4.2.52-2', goal: '12.4.2.52', kind: 'structured', marks: 4,
  stem: 'Give the reagent and conditions needed to convert ethanol into each of the following.\n\n(a) ethanal [1]\n(b) ethanoic acid [1]\n(c) ethene [1]\n(d) ethyl ethanoate [1]',
  scheme: [
    '(a) acidified potassium dichromate(VI); warm and distil off the ethanal as it forms [1]',
    '(b) acidified potassium dichromate(VI) in excess; heat under reflux [1]',
    '(c) concentrated sulfuric acid at about 170 °C / pass the vapour over heated aluminium oxide [1]',
    '(d) ethanoic acid with a few drops of concentrated sulfuric acid; heat under reflux [1]'
  ],
  why: 'The difference between (a) and (b) is the most tested detail in this whole area. Ethanal boils at 21 °C, so distilling it off as it forms stops it meeting more oxidising agent. Under reflux the vapour returns to the flask and the ethanal is oxidised on to ethanoic acid. The dichromate turns from orange to green in both. For (d), an acyl chloride such as ethanoyl chloride also works, faster and without an equilibrium.'
},

// ---- 12.4.2.53  multi-step synthesis, yield and purity ----------------------
{
  id: 'p-12.4.2.53-1', goal: '12.4.2.53', kind: 'structured', marks: 5,
  stem: 'Propanoic acid can be made from bromoethane in two steps.\n\n(a) Give the reagent and conditions for step 1, and name the intermediate. [2]\n(b) Give the reagent and conditions for step 2. [2]\n(c) Step 1 has a yield of 70% and step 2 a yield of 80%. Calculate the overall percentage yield. [1]',
  scheme: [
    '(a) KCN in ethanol, heat under reflux [1]',
    '(a) propanenitrile, CH3CH2CN [1]',
    '(b) dilute hydrochloric (or sulfuric) acid [1]',
    '(b) heat under reflux [1]',
    '(c) 0.70 x 0.80 x 100 = 56% [1]'
  ],
  why: 'Count the carbons first: bromoethane has two, propanoic acid has three, so one step must make a new C-C bond, and the cyanide ion is the reagent that does it. Acid hydrolysis then turns the C≡N into COOH: CH3CH2CN + 2H2O + H+ -> CH3CH2COOH + NH4+. Yields multiply, so every extra step costs product: two quite good steps give only just over half the theoretical amount. This is why short routes are preferred.'
},
{
  id: 'p-12.4.2.53-2', goal: '12.4.2.53', kind: 'structured', marks: 4,
  stem: 'Aspirin (Mr = 180) is made from 2-hydroxybenzoic acid (Mr = 138). One mole of 2-hydroxybenzoic acid gives one mole of aspirin.\n\nA student used 5.00 g of 2-hydroxybenzoic acid and obtained 4.50 g of dry, recrystallised aspirin.\n\n(a) Calculate the percentage yield. [3]\n(b) Describe how the student could check that the aspirin is pure. [1]',
  scheme: [
    '(a) moles of 2-hydroxybenzoic acid = 5.00 / 138 = 0.0362 mol [1]',
    '(a) theoretical mass of aspirin = 0.0362 x 180 = 6.52 g [1]',
    '(a) percentage yield = 4.50 / 6.52 x 100 = 69.0% [1]',
    '(b) measure the melting point: pure aspirin melts sharply at the data book value (about 136 °C); an impure sample melts lower and over a range [1]'
  ],
  why: 'Always go through moles: the theoretical yield is what the limiting reagent could make if every molecule reacted. Keep an extra figure in the middle of the calculation and round only at the end. Losses come from an incomplete reaction and from transfers, filtering and recrystallisation, which always leaves some product dissolved in the solvent. For purity, a sharp melting point at the right temperature is the classic test; a thin-layer chromatogram with a single spot also works.'
}

);
