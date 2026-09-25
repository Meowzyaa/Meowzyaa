/* Practice written against the syllabus objectives. Not past paper questions. */
CHEMPREP_PRACTICE.push(

// ---- 12.5.1.13  proteins as polymers, sequence ------------------------------
{
  id: 'p-12.5.1.13-1', goal: '12.5.1.13', kind: 'mcq', marks: 1,
  stem: 'How many different tripeptides can be made using one molecule each of glycine, alanine and serine?',
  options: { A: '3', B: '6', C: '9', D: '27' },
  answer: 'B',
  why: 'Each tripeptide uses all three amino acids once, so the question is how many orders there are: 3 x 2 x 1 = 6. Order matters because the chain has two different ends, a free NH2 at one end and a free COOH at the other, so Gly-Ala-Ser is a different molecule from Ser-Ala-Gly. The same logic explains why a protein\'s properties depend on its sequence: twenty amino acids in a chain of hundreds give an astronomical number of possible proteins. 27 would be the answer if each amino acid could be used more than once.'
},

// ---- 12.5.1.14  structure from hydrolysis data ------------------------------
{
  id: 'p-12.5.1.14-1', goal: '12.5.1.14', kind: 'structured', marks: 3,
  stem: 'Complete hydrolysis of a pentapeptide gave five different amino acids: Ala, Gly, Leu, Ser and Val. Partial hydrolysis gave three fragments:\n\nGly-Ser-Val    Ala-Gly    Val-Leu\n\n(a) Deduce the sequence of the pentapeptide. [2]\n(b) State the reagent and conditions for complete hydrolysis of a protein. [1]',
  scheme: [
    '(a) the fragments overlap at Gly and at Val [1]',
    '(a) Ala-Gly-Ser-Val-Leu [1]',
    '(b) 6 mol dm-3 hydrochloric acid, heat under reflux for about 24 hours [1]'
  ],
  why: 'Complete hydrolysis only tells you which amino acids are present. Partial hydrolysis breaks only some peptide bonds, so each fragment is a genuine piece of the chain in the right order. Line the fragments up where they share an amino acid: Ala-Gly joins Gly-Ser-Val at Gly, and Gly-Ser-Val joins Val-Leu at Val. Check your answer uses each amino acid exactly once and contains every fragment.'
},

// ---- 12.5.1.15  primary, secondary and tertiary structure -------------------
{
  id: 'p-12.5.1.15-1', goal: '12.5.1.15', kind: 'mcq', marks: 1,
  stem: 'Which interaction holds an alpha-helix in shape?',
  options: {
    A: 'hydrogen bonds between the C=O and N-H groups of the polypeptide backbone',
    B: 'disulfide bridges between cysteine side chains',
    C: 'ionic attractions between charged side chains',
    D: 'peptide bonds between neighbouring amino acids'
  },
  answer: 'A',
  why: 'Secondary structure, both the alpha-helix and the beta-pleated sheet, comes from hydrogen bonds between the backbone itself: the C=O of one peptide link and the N-H of another four amino acids along. Side chains are not involved, which is why the same helix appears in very different proteins. B and C are interactions between side chains, which hold the tertiary structure. D, the peptide bonds, make up the primary structure: the sequence.'
},

// ---- 12.5.1.16  forces holding the tertiary structure -----------------------
{
  id: 'p-12.5.1.16-1', goal: '12.5.1.16', kind: 'structured', marks: 3,
  stem: 'Name three types of interaction between amino acid side chains that hold the tertiary structure of a protein. For each, give an example of a side chain involved. [3]',
  scheme: [
    'disulfide bridges, -S-S-, between two cysteine side chains (-CH2SH) [1]',
    'ionic attractions between -COO- (aspartic or glutamic acid) and -NH3+ (lysine) [1]',
    'hydrogen bonds, for example between -OH groups of serine / van der Waals (hydrophobic) interactions between non-polar side chains such as valine or leucine [1]'
  ],
  why: 'The tertiary structure is the folding of the whole chain, held by attractions between side chains that may be far apart in the sequence but close in space. Disulfide bridges are covalent and the strongest; ionic attractions depend on pH, which is why pH changes can unfold a protein; hydrogen bonds and van der Waals forces are weaker but very numerous. Non-polar side chains tend to cluster in the middle, away from water.'
},

// ---- 12.5.1.17  enzyme catalysis, lock and key ------------------------------
{
  id: 'p-12.5.1.17-1', goal: '12.5.1.17', kind: 'mcq', marks: 1,
  stem: 'In the lock and key model, why does an enzyme catalyse only one reaction?',
  options: {
    A: 'The active site has a shape complementary to one particular substrate.',
    B: 'The enzyme is used up after one reaction.',
    C: 'The enzyme raises the activation energy of every other reaction.',
    D: 'The enzyme can only work at one temperature.'
  },
  answer: 'A',
  why: 'The active site is a pocket formed by the folding of the chain, and its shape and the groups lining it match one substrate, as a lock matches one key. The substrate binds to form an enzyme-substrate complex, reacts by a route with a lower activation energy, and the products leave. B is wrong because a catalyst is not used up. D confuses specificity with the effect of temperature: enzymes do have an optimum temperature, but that is not why they are specific.'
},

// ---- 12.5.1.18  competitive inhibition --------------------------------------
{
  id: 'p-12.5.1.18-1', goal: '12.5.1.18', kind: 'structured', marks: 3,
  stem: 'The enzyme succinate dehydrogenase acts on succinate, -OOCCH2CH2COO-. Malonate, -OOCCH2COO-, inhibits the enzyme.\n\n(a) Explain how malonate inhibits the enzyme. [2]\n(b) Explain why the inhibition becomes less when the concentration of succinate is increased. [1]',
  scheme: [
    '(a) malonate has a similar shape and charge to succinate, so it binds to the active site [1]',
    '(a) it does not react, so it blocks the active site and substrate cannot bind [1]',
    '(b) the inhibitor and substrate compete for the active site; with more substrate, substrate molecules occupy more of the sites [1]'
  ],
  why: 'This is competitive inhibition: the inhibitor looks enough like the substrate to fit the active site but cannot be converted, so while it sits there that enzyme molecule is out of action. Binding is reversible, so the substrate and inhibitor compete, and flooding the enzyme with substrate wins most sites back. A non-competitive inhibitor, such as a heavy metal ion, binds somewhere else and changes the shape of the active site, so adding more substrate does not help.'
},

// ---- 12.5.1.19  denaturation -----------------------------------------------
{
  id: 'p-12.5.1.19-1', goal: '12.5.1.19', kind: 'mcq', marks: 1,
  stem: 'An enzyme is denatured by heating. Which change does NOT happen?',
  options: {
    A: 'Hydrogen bonds in the protein are broken.',
    B: 'The tertiary structure is lost.',
    C: 'Peptide bonds between the amino acids are broken.',
    D: 'The shape of the active site changes.'
  },
  answer: 'C',
  why: 'Denaturation unfolds the protein: heat, extremes of pH or heavy metal ions break the weaker interactions holding the secondary and tertiary structure, so the active site loses its shape and the enzyme stops working. The peptide bonds of the primary structure are strong covalent bonds and stay intact; breaking them is hydrolysis, which needs acid and hours of refluxing, or a protease enzyme.'
},

// ---- 12.5.1.20  structure of DNA -------------------------------------------
{
  id: 'p-12.5.1.20-1', goal: '12.5.1.20', kind: 'mcq', marks: 1,
  stem: 'How many hydrogen bonds join a cytosine base to a guanine base in DNA?',
  options: { A: '1', B: '2', C: '3', D: '4' },
  answer: 'C',
  why: 'C-G pairs are held by three hydrogen bonds and A-T pairs by two. The bases pair only one way because only those combinations line up the hydrogen bond donors (N-H) with the acceptors (C=O and ring N) at the right distances. That complementary pairing is what lets each strand act as a template when DNA is copied.'
},

// ---- 12.5.1.21  DNA encoding -----------------------------------------------
{
  id: 'p-12.5.1.21-1', goal: '12.5.1.21', kind: 'mcq', marks: 1,
  stem: 'A section of mRNA that codes for part of a protein is 36 bases long. How many amino acids does it code for?',
  options: { A: '6', B: '12', C: '36', D: '108' },
  answer: 'B',
  why: 'The genetic code is a triplet code: each codon of three bases codes for one amino acid, so 36 / 3 = 12. Four bases taken three at a time give 4 x 4 x 4 = 64 codons, more than enough for the 20 amino acids, so most amino acids have several codons and three codons mean stop.'
},

// ---- 12.5.1.22  chemistry of DNA mutation ----------------------------------
{
  id: 'p-12.5.1.22-1', goal: '12.5.1.22', kind: 'mcq', marks: 1,
  stem: 'Why does the deletion of one base from a gene usually have a much bigger effect on the protein than the substitution of one base?',
  options: {
    A: 'A deletion shifts the reading frame, so every codon after it is changed.',
    B: 'A deletion always creates a stop codon at that point.',
    C: 'A substitution never changes the amino acid.',
    D: 'A deletion breaks the hydrogen bonds between the two strands.'
  },
  answer: 'A',
  why: 'The code is read three bases at a time from a fixed start, with no gaps. Delete one base and every triplet from that point on is read out of step, so the amino acid sequence after it is changed completely, usually giving a useless protein. A substitution changes only one codon, so at most one amino acid, and sometimes none, because several codons code for the same amino acid. C is too strong: sickle-cell anaemia is caused by a single substitution.'
},

// ---- 12.5.1.23  genetic basis of disease ------------------------------------
{
  id: 'p-12.5.1.23-1', goal: '12.5.1.23', kind: 'structured', marks: 3,
  stem: 'In sickle-cell anaemia, a change of one base in the gene for haemoglobin replaces glutamic acid (side chain -CH2CH2COOH) with valine (side chain -CH(CH3)2).\n\n(a) Name this type of mutation. [1]\n(b) Explain how this change affects the haemoglobin molecules. [2]',
  scheme: [
    '(a) substitution (point mutation) [1]',
    '(b) a polar, ionised (hydrophilic) side chain is replaced by a non-polar (hydrophobic) one [1]',
    '(b) the haemoglobin molecules stick together (the shape and solubility change), distorting the red blood cells into a sickle shape [1]'
  ],
  why: 'One altered base changes one codon and so one amino acid out of about 150 in the chain. That is enough because of where it is and what it is: glutamic acid on the surface carries a charged -COO- group that interacts well with water, while valine is non-polar. The non-polar patch on one molecule fits a pocket on another, so deoxygenated haemoglobin clumps into long fibres that bend the cell. It is the textbook example of a change in primary structure changing function.'
},

// ---- 12.5.1.24  modifying primary structure --------------------------------
{
  id: 'p-12.5.1.24-1', goal: '12.5.1.24', kind: 'mcq', marks: 1,
  stem: 'A mutation changes one amino acid far away from the active site of an enzyme, yet the enzyme stops working. What is the best explanation?',
  options: {
    A: 'The new side chain changes how the chain folds, which changes the shape of the active site.',
    B: 'The new amino acid breaks the peptide bonds next to it.',
    C: 'The enzyme now has a different molecular formula, so it cannot catalyse the reaction.',
    D: 'Only amino acids in the active site affect an enzyme.'
  },
  answer: 'A',
  why: 'The tertiary structure depends on interactions between side chains all along the chain: hydrogen bonds, ionic attractions, disulfide bridges and hydrophobic interactions. Change one side chain and some of those interactions are lost or new ones form, so the chain can fold differently, and the active site, which is made by that folding, changes shape. This is also how enzymes can be engineered on purpose to work better or to catalyse something new.'
},

// ---- 12.5.1.25  ATP --------------------------------------------------------
{
  id: 'p-12.5.1.25-1', goal: '12.5.1.25', kind: 'structured', marks: 3,
  stem: '(a) Name the three components of a molecule of ATP. [1]\n(b) Write an equation for the hydrolysis of ATP. [1]\n(c) Explain why this hydrolysis is important in living cells. [1]',
  scheme: [
    '(a) adenine, ribose and three phosphate groups (all three needed) [1]',
    '(b) ATP + H2O -> ADP + Pi (inorganic phosphate) [1]',
    '(c) it releases energy (about 30 kJ mol-1) that the cell uses for muscle contraction, active transport and making molecules [1]'
  ],
  why: 'Draw ATP as a block diagram: adenine joined to ribose, joined to a chain of three phosphates. Hydrolysis removes the end phosphate, giving adenosine diphosphate. The energy is released because the products, with the phosphate hydrated in water, are more stable than ATP; the bond is not a store of energy that is released on breaking, since breaking any bond takes energy in. Respiration of glucose supplies the energy to turn ADP and phosphate back into ATP.'
},

// ---- 12.5.1.26  metals essential to life -----------------------------------
{
  id: 'p-12.5.1.26-1', goal: '12.5.1.26', kind: 'mcq', marks: 1,
  stem: 'Which metal is correctly matched with its role in the body?',
  options: {
    A: 'iron: carrying oxygen in haemoglobin',
    B: 'zinc: the central ion of chlorophyll',
    C: 'calcium: carrying oxygen in the blood',
    D: 'cobalt: carrying nerve impulses'
  },
  answer: 'A',
  why: 'Fe2+ at the centre of each haem group binds an O2 molecule as a ligand. Magnesium, not zinc, sits at the centre of chlorophyll; zinc is found at the active site of many enzymes. Calcium builds bones and teeth and is needed for muscle contraction and blood clotting. Sodium and potassium ions carry nerve impulses, and cobalt is part of vitamin B12.'
},

// ---- 12.5.1.27  heavy metal pollution --------------------------------------
{
  id: 'p-12.5.1.27-1', goal: '12.5.1.27', kind: 'structured', marks: 3,
  stem: 'Mercury compounds released into a river are found at much higher concentrations in fish-eating birds than in the river water.\n\n(a) Give one source of mercury pollution. [1]\n(b) Explain why the concentration in the birds is so much higher than in the water. [2]',
  scheme: [
    '(a) gold mining / burning coal / chemical plants that used mercury (chlor-alkali cells, acetaldehyde plants) / discarded batteries or thermometers [1]',
    '(b) mercury is not excreted, so it builds up in the tissues of each organism (bioaccumulation) [1]',
    '(b) each animal eats many organisms from the level below, so the concentration increases at each step up the food chain [1]'
  ],
  why: 'Plankton take up dissolved mercury, small fish eat a lot of plankton, larger fish eat many small fish, and birds eat many large fish. Because the metal stays in the body instead of being excreted, the concentration multiplies at every level. In water bacteria convert mercury into methylmercury, which is especially easily absorbed; this caused Minamata disease in Japan. In Kazakhstan the Nura river was polluted by mercury from the acetaldehyde plant at Temirtau.'
},

// ---- 12.5.1.28  toxic metals and proteins ----------------------------------
{
  id: 'p-12.5.1.28-1', goal: '12.5.1.28', kind: 'mcq', marks: 1,
  stem: 'Why are Pb2+ and Hg2+ ions toxic to enzymes?',
  options: {
    A: 'They bond to the -SH groups of cysteine, changing the tertiary structure of the enzyme.',
    B: 'They break the peptide bonds of the enzyme.',
    C: 'They oxidise the substrate before it reaches the enzyme.',
    D: 'They are radioactive and damage the enzyme.'
  },
  answer: 'A',
  why: 'Heavy metal ions bond very strongly to sulfur, so they attach to the thiol (-SH) groups of cysteine side chains, breaking disulfide bridges and other interactions that hold the folded shape. The active site changes shape, so the enzyme is inactivated: this is non-competitive inhibition. They can also displace essential ions such as Zn2+ from active sites. Treatment uses a chelating agent such as EDTA, which binds the metal ion so it can be excreted.'
}

);
