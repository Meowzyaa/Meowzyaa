/* Practice written against the syllabus objectives. Not past paper questions.
   Every answer carries a worked solution. */
CHEMPREP_PRACTICE.push(

// ---- 12.3.4.8  weak acids and bases dissociate slightly in water ----------
{
  id: 'p-12.3.4.8-1', goal: '12.3.4.8', kind: 'mcq', marks: 1,
  stem: 'Two solutions both have a concentration of 0.100 mol dm-3. One is hydrochloric acid, the other is ethanoic acid. Which statement is correct?',
  options: {
    A: 'Both solutions have the same pH because their concentrations are equal.',
    B: 'The ethanoic acid has the higher pH because it is only partially dissociated.',
    C: 'The hydrochloric acid has the higher pH because it is fully dissociated.',
    D: 'The ethanoic acid has the higher pH because it contains fewer acidic hydrogen atoms.'
  },
  answer: 'B',
  why: 'pH depends on the concentration of H+ in solution, not on the concentration of acid you started with. HCl is strong, so it dissociates fully and [H+] = 0.100 mol dm-3, giving pH 1.00. Ethanoic acid is weak, so only a small fraction of the molecules donate a proton and [H+] is around 1.3 x 10-3 mol dm-3, giving pH 2.88. A lower [H+] means a higher pH, so the weak acid has the higher pH. D is wrong for a different reason: both are monobasic, and in any case the number of hydrogen atoms in the formula is not what decides acidity.'
},
{
  id: 'p-12.3.4.8-2', goal: '12.3.4.8', kind: 'structured', marks: 4,
  stem: 'Ethanoic acid, CH3COOH, is a weak acid with Ka = 1.74 x 10-5 mol dm-3 at 298 K.\n\n(a) Write the expression for Ka for ethanoic acid. [1]\n(b) Calculate the pH of a 0.100 mol dm-3 solution of ethanoic acid. [3]',
  scheme: [
    '(a) Ka = [CH3COO-][H+] / [CH3COOH] [1]',
    '(b) [H+] = sqrt(Ka x c) = sqrt(1.74 x 10-5 x 0.100) [1]',
    '(b) [H+] = 1.32 x 10-3 mol dm-3 [1]',
    '(b) pH = 2.88 [1]'
  ],
  why: 'Water is left out of the Ka expression because it is in large excess and its concentration is effectively constant. For the calculation you make the two standard approximations: that [H+] = [CH3COO-] because each molecule that dissociates gives one of each, and that the ethanoic acid concentration at equilibrium is still close to 0.100 because so little of it dissociates. That turns Ka = [H+]2 / c into [H+] = sqrt(Ka x c). So [H+] = sqrt(1.74 x 10-6) = 1.319 x 10-3 mol dm-3, and pH = -log10(1.319 x 10-3) = 2.88. Quote pH to two decimal places: the digits after the point are the significant figures.'
},
{
  id: 'p-12.3.4.8-3', goal: '12.3.4.8', kind: 'mcq', marks: 1,
  stem: 'A 0.0100 mol dm-3 solution of a weak monobasic acid HA has a pH of 3.40. What is the value of Ka for HA?',
  options: {
    A: '1.6 x 10-5 mol dm-3',
    B: '4.0 x 10-4 mol dm-3',
    C: '3.4 x 10-3 mol dm-3',
    D: '1.6 x 10-7 mol dm-3'
  },
  answer: 'A',
  why: 'First get [H+] from the pH: [H+] = 10-3.40 = 3.98 x 10-4 mol dm-3. For a weak monobasic acid, [H+] = [A-], so Ka = [H+]2 / [HA] = (3.98 x 10-4)2 / 0.0100 = 1.58 x 10-7 / 0.0100 = 1.58 x 10-5 mol dm-3. Option D is the trap: it is [H+]2 without dividing by the acid concentration.'
},

// ---- 12.3.4.7  be able to calculate the pH of a strong base --------------
{
  id: 'p-12.3.4.7-1', goal: '12.3.4.7', kind: 'mcq', marks: 1,
  stem: 'What is the pH of a 0.0500 mol dm-3 solution of sodium hydroxide at 298 K? (Kw = 1.00 x 10-14 mol2 dm-6)',
  options: { A: '1.30', B: '11.30', C: '12.70', D: '13.30' },
  answer: 'C',
  why: 'NaOH is a strong base and gives one OH- per formula unit, so [OH-] = 0.0500 mol dm-3. Use Kw to get [H+]: [H+] = Kw / [OH-] = 1.00 x 10-14 / 0.0500 = 2.00 x 10-13 mol dm-3. pH = -log10(2.00 x 10-13) = 12.70. Option A is what you get if you take -log10 of the base concentration by mistake, and B if you subtract that from 14 incorrectly.'
},
{
  id: 'p-12.3.4.7-2', goal: '12.3.4.7', kind: 'mcq', marks: 1,
  stem: 'Solutions of sodium hydroxide and barium hydroxide both have a concentration of 0.100 mol dm-3. Which statement about their pH values at 298 K is correct?',
  options: {
    A: 'They are equal, because both are strong bases.',
    B: 'The barium hydroxide has a pH one unit higher, because it releases twice as many hydroxide ions.',
    C: 'The barium hydroxide has a pH 0.30 higher, because it releases twice as many hydroxide ions.',
    D: 'The sodium hydroxide has the higher pH, because sodium is more reactive than barium.'
  },
  answer: 'C',
  why: 'Ba(OH)2 is dibasic, so 0.100 mol dm-3 gives [OH-] = 0.200 mol dm-3, twice that of the NaOH. Doubling [OH-] halves [H+], and log10(2) = 0.30, so the pH rises by 0.30, not by a whole unit. In numbers: NaOH gives pH 13.00 and Ba(OH)2 gives pH 13.30. A whole unit would need ten times the hydroxide, not twice.'
},
{
  id: 'p-12.3.4.7-3', goal: '12.3.4.7', kind: 'structured', marks: 4,
  stem: '25.0 cm3 of 0.200 mol dm-3 sodium hydroxide is added to 25.0 cm3 of 0.100 mol dm-3 hydrochloric acid.\n\nCalculate the pH of the resulting solution at 298 K. [4]',
  scheme: [
    'mol NaOH = 0.0250 x 0.200 = 5.00 x 10-3; mol HCl = 0.0250 x 0.100 = 2.50 x 10-3 [1]',
    'excess OH- = 5.00 x 10-3 - 2.50 x 10-3 = 2.50 x 10-3 mol [1]',
    '[OH-] = 2.50 x 10-3 / 0.0500 = 0.0500 mol dm-3 [1]',
    '[H+] = 1.00 x 10-14 / 0.0500 = 2.00 x 10-13, pH = 12.70 [1]'
  ],
  why: 'The base is in excess, so after neutralisation you have leftover hydroxide and the pH is set by that. The step people lose marks on is the total volume: the two 25.0 cm3 portions make 50.0 cm3, so divide the leftover moles by 0.0500 dm3, not 0.0250. From there it is the standard strong base route through Kw.'
},

// ---- 12.3.4.16  buffer solutions -----------------------------------------
{
  id: 'p-12.3.4.16-1', goal: '12.3.4.16', kind: 'mcq', marks: 1,
  stem: 'Which mixture, when dissolved in water, does NOT act as a buffer solution?',
  options: {
    A: '0.10 mol of CH3COOH and 0.10 mol of CH3COONa',
    B: '0.20 mol of CH3COOH and 0.10 mol of NaOH',
    C: '0.10 mol of NH3 and 0.05 mol of HCl',
    D: '0.10 mol of CH3COOH and 0.10 mol of NaOH'
  },
  answer: 'D',
  why: 'A buffer needs a weak acid together with its conjugate base, both present in appreciable amounts. A is that mixture directly. In B the NaOH converts half the ethanoic acid to ethanoate and leaves 0.10 mol of acid, so you end with equal amounts of both. In C the HCl converts half the ammonia to ammonium, leaving a weak base with its conjugate acid. In D the NaOH is exactly enough to neutralise all the ethanoic acid, so nothing but ethanoate remains, and with no reservoir of undissociated acid the mixture cannot mop up added alkali.'
},
{
  id: 'p-12.3.4.16-2', goal: '12.3.4.16', kind: 'structured', marks: 3,
  stem: 'A buffer is made by mixing 0.200 mol dm-3 ethanoic acid with 0.100 mol dm-3 sodium ethanoate in equal volumes. Ka(CH3COOH) = 1.74 x 10-5 mol dm-3.\n\nCalculate the pH of the buffer. [3]',
  scheme: [
    '[H+] = Ka x [CH3COOH] / [CH3COO-] [1]',
    '[H+] = 1.74 x 10-5 x (0.100 / 0.0500) = 3.48 x 10-5 mol dm-3 [1]',
    'pH = 4.46 [1]'
  ],
  why: 'Mixing equal volumes halves both concentrations, to 0.100 and 0.0500 mol dm-3, but only the ratio matters and the ratio is unchanged at 2:1. So [H+] = Ka x 2 = 3.48 x 10-5 and pH = -log10(3.48 x 10-5) = 4.46. Notice the pH sits just below pKa (4.76): there is more acid than conjugate base, so the buffer is on the acidic side of the midpoint. If the two were equal, pH would equal pKa exactly.'
},
{
  id: 'p-12.3.4.16-3', goal: '12.3.4.16', kind: 'structured', marks: 4,
  stem: 'Blood is buffered by the carbonic acid and hydrogencarbonate system.\n\nH2CO3(aq) equilibrium H+(aq) + HCO3-(aq)\n\n(a) Explain, in terms of this equilibrium, how the buffer resists a fall in pH when a small amount of acid enters the blood. [2]\n(b) Explain how it resists a rise in pH when a small amount of alkali enters the blood. [2]',
  scheme: [
    '(a) added H+ is removed by reaction with HCO3- [1]',
    '(a) the equilibrium shifts to the left, so [H+] stays almost unchanged [1]',
    '(b) added OH- reacts with H+ / with H2CO3 [1]',
    '(b) H2CO3 dissociates further, shifting the equilibrium right and replacing the H+ removed [1]'
  ],
  why: 'The whole idea is that a buffer holds a large reservoir of both species, so it can absorb whichever ion is added. Adding acid: the hydrogencarbonate ion is the reserve of base and it takes up the added H+, pushing the position of equilibrium to the left. Adding alkali: the OH- removes H+ from the solution, and the reservoir of undissociated H2CO3 dissociates to replace it, pushing the equilibrium right. Say what reacts with what and then which way the equilibrium moves. Answers that only say "the equilibrium shifts" without naming the species that reacts do not get both marks.'
},

// ---- 12.3.4.13  titrations and the associated calculations ---------------
{
  id: 'p-12.3.4.13-1', goal: '12.3.4.13', kind: 'structured', marks: 3,
  stem: '25.0 cm3 of a sodium hydroxide solution of unknown concentration was titrated against 0.100 mol dm-3 hydrochloric acid. The mean titre was 22.40 cm3.\n\nCalculate the concentration of the sodium hydroxide solution. [3]',
  scheme: [
    'mol HCl = 0.02240 x 0.100 = 2.24 x 10-3 mol [1]',
    'NaOH : HCl is 1 : 1, so mol NaOH = 2.24 x 10-3 mol [1]',
    'c(NaOH) = 2.24 x 10-3 / 0.0250 = 0.0896 mol dm-3 [1]'
  ],
  why: 'Always start from the solution you know everything about, which here is the acid in the burette. Convert cm3 to dm3 by dividing by 1000, so 22.40 cm3 is 0.02240 dm3. NaOH + HCl gives NaCl + H2O, a 1:1 ratio, so the moles carry straight across. Then divide by the volume of the solution you are finding, which is the 25.0 cm3 in the flask. Three significant figures matches the data given.'
},
{
  id: 'p-12.3.4.13-2', goal: '12.3.4.13', kind: 'mcq', marks: 1,
  stem: 'Ethanoic acid is titrated with sodium hydroxide. Which indicator is most suitable, and why?',
  options: {
    A: 'Methyl orange, because its colour change spans pH 3.1 to 4.4.',
    B: 'Phenolphthalein, because its colour change spans pH 8.3 to 10.0.',
    C: 'Methyl orange, because the salt formed is neutral.',
    D: 'Phenolphthalein, because ethanoic acid is a weak acid, so the curve is vertical below pH 7.'
  },
  answer: 'B',
  why: 'A weak acid titrated with a strong base gives an equivalence point above pH 7, because the salt formed (sodium ethanoate) hydrolyses to give a slightly alkaline solution. The vertical section of the curve runs roughly from pH 7 to pH 11, so the indicator must change colour inside that range: phenolphthalein does, methyl orange does not. D picks the right indicator but gives the wrong reason, and in an exam that reasoning mark is lost.'
},
{
  id: 'p-12.3.4.13-3', goal: '12.3.4.13', kind: 'structured', marks: 4,
  stem: 'A student titrates 25.0 cm3 of 0.100 mol dm-3 ethanedioic acid, HOOCCOOH, against sodium hydroxide of concentration 0.150 mol dm-3. Ethanedioic acid is dibasic.\n\n(a) Write the equation for the complete neutralisation. [1]\n(b) Calculate the volume of sodium hydroxide needed to reach the second equivalence point. [3]',
  scheme: [
    '(a) HOOCCOOH + 2NaOH -> NaOOCCOONa + 2H2O [1]',
    '(b) mol acid = 0.0250 x 0.100 = 2.50 x 10-3 mol [1]',
    '(b) mol NaOH = 2 x 2.50 x 10-3 = 5.00 x 10-3 mol [1]',
    '(b) V = 5.00 x 10-3 / 0.150 = 0.0333 dm3 = 33.3 cm3 [1]'
  ],
  why: 'The word "dibasic" is doing the work here: each molecule donates two protons, so the ratio is 1 acid to 2 NaOH and you must double the moles before dividing by the base concentration. Forgetting that gives 16.7 cm3, which is the first equivalence point rather than the second. Convert back to cm3 at the end by multiplying by 1000.'
}

);
