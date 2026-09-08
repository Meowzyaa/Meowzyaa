/* Practice written against the syllabus objectives. Not past paper questions. */
CHEMPREP_PRACTICE.push(

// ---- 12.4.2.24  Friedel-Crafts acylation --------------------------------
{
  id: 'p-12.4.2.24-1', goal: '12.4.2.24', kind: 'mcq', marks: 1,
  stem: 'Benzene reacts with ethanoyl chloride in the presence of anhydrous aluminium chloride. What is the organic product, and what is the role of the aluminium chloride?',
  options: {
    A: 'Phenylethanone; the AlCl3 acts as a halogen carrier to generate the electrophile.',
    B: 'Phenylethanone; the AlCl3 acts as a nucleophile.',
    C: 'Ethylbenzene; the AlCl3 acts as a halogen carrier.',
    D: 'Chlorobenzene; the AlCl3 acts as a catalyst for substitution of chlorine.'
  },
  answer: 'A',
  why: 'Acylation puts an acyl group, here CH3CO, onto the ring, so the product is phenylethanone, C6H5COCH3. The aluminium chloride is a halogen carrier: it pulls the chloride off the ethanoyl chloride to generate the acylium ion CH3CO+, which is the electrophile that attacks the delocalised ring. C would be the product of alkylation with chloroethane, not acylation. Note the AlCl3 is regenerated at the end, so it is genuinely catalytic, but it must be anhydrous or water destroys it.'
},
{
  id: 'p-12.4.2.24-2', goal: '12.4.2.24', kind: 'structured', marks: 4,
  stem: 'Benzene undergoes a Friedel-Crafts acylation with propanoyl chloride, CH3CH2COCl, in the presence of AlCl3.\n\n(a) Write an equation showing the generation of the electrophile. [2]\n(b) Name the organic product. [1]\n(c) Explain why benzene undergoes substitution rather than addition. [1]',
  scheme: [
    '(a) CH3CH2COCl + AlCl3 -> CH3CH2CO+ + AlCl4- [1]',
    '(a) correct charges on both ions [1]',
    '(b) phenylpropan-1-one [1]',
    '(c) substitution preserves the delocalised ring and its extra stability [1]'
  ],
  why: 'The electrophile is the acylium ion, formed when AlCl3 takes the chloride. Watch the charges: the acylium ion is positive and the aluminium species becomes AlCl4-, which is negative. For (c), the delocalised pi system makes benzene about 150 kJ mol-1 more stable than the theoretical Kekule structure with three isolated double bonds. Addition would break that delocalisation permanently and lose that stability, whereas substitution restores the ring, so substitution is favoured despite benzene having what look like double bonds.'
},

// ---- 12.4.2.12  esterification and hydrolysis ---------------------------
{
  id: 'p-12.4.2.12-1', goal: '12.4.2.12', kind: 'mcq', marks: 1,
  stem: 'Ethanoic acid is heated with propan-1-ol in the presence of a few drops of concentrated sulfuric acid. What is the ester formed?',
  options: {
    A: 'propyl ethanoate, CH3COOCH2CH2CH3',
    B: 'ethyl propanoate, CH3CH2COOCH2CH3',
    C: 'propyl propanoate, CH3CH2COOCH2CH2CH3',
    D: 'ethyl ethanoate, CH3COOCH2CH3'
  },
  answer: 'A',
  why: 'The name is built alcohol first, then acid: the alkyl group from the alcohol gives the first word and the acid gives the second, ending in -oate. Propan-1-ol supplies the propyl, ethanoic acid supplies the ethanoate, so it is propyl ethanoate. Getting the two round the wrong way gives B, which is the commonest error. In the formula, the carbonyl carbon always belongs to the acid part, and the oxygen with the alkyl chain hanging off it came from the alcohol.'
},
{
  id: 'p-12.4.2.12-2', goal: '12.4.2.12', kind: 'structured', marks: 4,
  stem: 'Ethyl ethanoate can be made from ethanoic acid and ethanol.\n\nCH3COOH + CH3CH2OH equilibrium CH3COOCH2CH3 + H2O\n\n(a) State the catalyst and one other condition. [2]\n(b) Suggest two ways of increasing the equilibrium yield of the ester. [2]',
  scheme: [
    '(a) concentrated sulfuric acid (or concentrated H3PO4) [1]',
    '(a) heat under reflux [1]',
    '(b) use an excess of one reactant (the alcohol or the acid) [1]',
    '(b) remove water as it forms / distil off the ester as it forms [1]'
  ],
  why: 'Esterification is a reversible reaction, so it never goes to completion and the yield is governed by Le Chatelier. Adding excess of one reactant pushes the equilibrium right, and removing a product does the same. The concentrated sulfuric acid does two jobs at once, which is worth saying if the question gives space: it catalyses the reaction and it is a dehydrating agent, so it also absorbs the water produced. Reflux is needed because otherwise the volatile reactants boil away before they react.'
},
{
  id: 'p-12.4.2.12-3', goal: '12.4.2.12', kind: 'mcq', marks: 1,
  stem: 'Methyl propanoate is heated with aqueous sodium hydroxide. What are the products?',
  options: {
    A: 'propanoic acid and methanol',
    B: 'sodium propanoate and methanol',
    C: 'sodium propanoate and sodium methoxide',
    D: 'propanoic acid and sodium methoxide'
  },
  answer: 'B',
  why: 'Hydrolysis with alkali gives the salt of the carboxylic acid rather than the acid itself, because any acid formed is immediately neutralised by the hydroxide. So you get sodium propanoate and the free alcohol, methanol. This is why alkaline hydrolysis goes to completion whereas acid hydrolysis is reversible: removing the acid as its salt takes the product out of the equilibrium. The same reaction on a fat is saponification, which is how soap is made.'
},

// ---- 12.4.2.3  optical isomerism ----------------------------------------
{
  id: 'p-12.4.2.3-1', goal: '12.4.2.3', kind: 'mcq', marks: 1,
  stem: 'Which compound exhibits optical isomerism?',
  options: {
    A: 'CH3CH2CH2COOH',
    B: 'CH3CH(OH)COOH',
    C: 'CH3C(CH3)2COOH',
    D: 'CH3CH2CH2OH'
  },
  answer: 'B',
  why: 'Optical isomerism needs a chiral centre: a carbon with four different groups attached. In B the second carbon carries CH3, OH, COOH and H, all different, so it is chiral. In A and D every carbon has at least two hydrogens. In C the relevant carbon carries two identical methyl groups, so it is not chiral. The quickest method in an exam is to go along the chain, and at each carbon list the four groups and look for a repeat.'
},
{
  id: 'p-12.4.2.3-2', goal: '12.4.2.3', kind: 'structured', marks: 4,
  stem: '(a) State what is meant by a chiral centre. [1]\n(b) Explain what is observed when plane-polarised light is passed through a solution of a single optical isomer, and through a racemic mixture. [2]\n(c) State why the two optical isomers of a drug may have different effects in the body. [1]',
  scheme: [
    '(a) a carbon atom bonded to four different atoms or groups [1]',
    '(b) a single isomer rotates the plane of polarisation [1]',
    '(b) a racemic mixture causes no net rotation, because the two isomers rotate it equally in opposite directions [1]',
    '(c) receptors or enzymes in the body are themselves chiral, so only one isomer fits [1]'
  ],
  why: 'The two isomers are non-superimposable mirror images, so they are identical in every ordinary physical property, melting point, boiling point and density included. The one thing that tells them apart is the direction in which they rotate plane-polarised light, one clockwise and one anticlockwise by equal amounts, which is exactly why a 50:50 racemic mixture appears optically inactive. For (c) the standard example is thalidomide, where one isomer was therapeutic and the other caused birth defects.'
},

// ---- 12.4.2.26 and 12.4.2.25  polymers ----------------------------------
{
  id: 'p-12.4.2.25-1', goal: '12.4.2.25', kind: 'mcq', marks: 1,
  stem: 'Which statement about addition polymerisation is correct?',
  options: {
    A: 'A small molecule such as water is lost for each monomer added.',
    B: 'The monomer must contain a carbon to carbon double bond.',
    C: 'The polymer has a lower empirical formula mass than the monomer.',
    D: 'The monomer must contain two different functional groups.'
  },
  answer: 'B',
  why: 'In addition polymerisation the pi bond of a C=C breaks and the monomers join up end to end with nothing eliminated, so the repeat unit has exactly the same empirical formula as the monomer. A and D describe condensation polymerisation, which loses a small molecule and needs two functional groups, as in nylon or a polyester. C is wrong because no atoms are lost at all.'
},
{
  id: 'p-12.4.2.26-1', goal: '12.4.2.26', kind: 'structured', marks: 4,
  stem: 'Poly(chloroethene), PVC, is made from chloroethene, CH2=CHCl.\n\n(a) Draw or describe the repeat unit of poly(chloroethene). [1]\n(b) A sample of the polymer has an average relative molecular mass of 125 000. Calculate the average number of monomer units in a chain. (Mr of chloroethene = 62.5) [2]\n(c) State one reason why addition polymers are difficult to dispose of. [1]',
  scheme: [
    '(a) -[CH2-CHCl]- with the bonds shown extending through the brackets [1]',
    '(b) 125 000 / 62.5 [1]',
    '(b) = 2000 monomer units [1]',
    '(c) the C-C backbone is non-polar and unreactive, so the polymer is non-biodegradable [1]'
  ],
  why: 'The repeat unit keeps every atom of the monomer, with the double bond replaced by a single bond and the two bonds that continue the chain drawn through the brackets. That is why the division in (b) works so cleanly: no mass is lost. For (c), the backbone is a chain of strong, non-polar C-C and C-H bonds with nothing for enzymes or nucleophiles to attack, so the polymer persists. With PVC there is a second problem worth mentioning: burning it produces HCl.'
},

// ---- 12.5.1.3  formation of amines --------------------------------------
{
  id: 'p-12.5.1.3-1', goal: '12.5.1.3', kind: 'mcq', marks: 1,
  stem: 'Bromoethane is heated with excess ethanolic ammonia in a sealed tube. What is the main organic product, and by what mechanism?',
  options: {
    A: 'ethylamine, by nucleophilic substitution',
    B: 'ethylamine, by electrophilic substitution',
    C: 'ethanol, by nucleophilic substitution',
    D: 'ethene, by elimination'
  },
  answer: 'A',
  why: 'Ammonia has a lone pair on nitrogen and acts as the nucleophile, attacking the slightly positive carbon of the C-Br bond and displacing bromide. The immediate product is the ethylammonium ion, and a second ammonia molecule removes a proton to give ethylamine. Two conditions matter: ethanolic solvent rather than aqueous, or you get ethanol instead by the route in C, and excess ammonia, which reduces further substitution to secondary and tertiary amines.'
},
{
  id: 'p-12.5.1.3-2', goal: '12.5.1.3', kind: 'structured', marks: 4,
  stem: 'Propylamine can be made in two ways: from 1-bromopropane, or by reducing propanenitrile.\n\n(a) State the reagent and conditions for the reduction of propanenitrile, CH3CH2CN. [2]\n(b) Explain why the reaction of 1-bromopropane with ammonia often gives a poor yield of the primary amine. [2]',
  scheme: [
    '(a) LiAlH4 in dry ether, or H2 with a nickel catalyst [1]',
    '(a) correct conditions for the chosen reagent (dry ether, or heat and pressure) [1]',
    '(b) the amine product is itself a nucleophile [1]',
    '(b) it attacks further bromopropane, giving secondary and tertiary amines and the quaternary salt [1]'
  ],
  why: 'The nitrile route is preferred in synthesis precisely because it avoids the problem in (b): reduction converts the CN group to CH2NH2 in one clean step and there is nothing to over-react. In the halogenoalkane route the primary amine you make is a better nucleophile than ammonia itself, so as soon as any forms it competes for the remaining bromopropane and you end up with a mixture. Using a large excess of ammonia helps, because it makes ammonia far more likely than the amine to reach the substrate first.'
},

// ---- 12.4.2.1  IUPAC nomenclature ---------------------------------------
{
  id: 'p-12.4.2.1-1', goal: '12.4.2.1', kind: 'mcq', marks: 1,
  stem: 'What is the systematic name of (CH3)2CHCH2COOH?',
  options: {
    A: '3-methylbutanoic acid',
    B: '2-methylbutanoic acid',
    C: '3-methylbutanal',
    D: '2-methylpropanoic acid'
  },
  answer: 'A',
  why: 'Find the longest chain that includes the carboxylic acid carbon: COOH, then CH2, then CH, then CH3, which is four carbons, so butanoic acid. The carboxyl carbon is always number 1, and numbering along gives the methyl branch on carbon 3. So it is 3-methylbutanoic acid. B numbers from the wrong end, C misidentifies the functional group, and D counts the chain as three carbons by wrongly treating both methyls as branches.'
},
{
  id: 'p-12.4.2.1-2', goal: '12.4.2.1', kind: 'structured', marks: 3,
  stem: 'Give the systematic name of each compound.\n\n(a) CH3CH(OH)CH2CH2CH3 [1]\n(b) CH3CH2COCH2CH3 [1]\n(c) C6H5NH2 [1]',
  scheme: [
    '(a) pentan-2-ol [1]',
    '(b) pentan-3-one [1]',
    '(c) phenylamine (aniline is also accepted) [1]'
  ],
  why: 'Count the longest chain first, then number it so the functional group gets the lowest possible locant. In (a) the chain is five carbons and the OH sits on carbon 2 whichever way you look, giving pentan-2-ol. In (b) the chain is again five carbons with the carbonyl in the middle, so pentan-3-one. In (c) an NH2 group directly on a benzene ring is named phenylamine in the systematic system; aniline is the trivial name and is still usually accepted.'
},

// ---- 12.4.2.50  identifying functional groups ---------------------------
{
  id: 'p-12.4.2.50-1', goal: '12.4.2.50', kind: 'structured', marks: 4,
  stem: 'An unknown compound X has the molecular formula C3H6O.\n\nX gives an orange precipitate with 2,4-dinitrophenylhydrazine but no silver mirror with Tollens reagent.\n\n(a) State what each result tells you. [2]\n(b) Identify X and give its systematic name. [2]',
  scheme: [
    '(a) the 2,4-DNPH result shows a carbonyl group, so X is an aldehyde or a ketone [1]',
    '(a) the negative Tollens result rules out an aldehyde, so X is a ketone [1]',
    '(b) CH3COCH3 [1]',
    '(b) propanone [1]'
  ],
  why: 'This is the standard two-test sequence for carbonyls and the logic runs in one direction: 2,4-DNPH detects the C=O group but cannot tell an aldehyde from a ketone, then Tollens separates them because only aldehydes are oxidised further, to a carboxylic acid, reducing the silver ion to metallic silver. With C3H6O and a ketone, the carbonyl can only sit on the middle carbon, so X is propanone. Fehling or Benedict solution would work in place of Tollens, giving a brick-red precipitate with an aldehyde.'
}

);
