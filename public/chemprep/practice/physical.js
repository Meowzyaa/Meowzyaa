/* Practice written against the syllabus objectives. Not past paper questions. */
CHEMPREP_PRACTICE.push(

// ---- 11.3.1.3  bond making and breaking, enthalpy ------------------------
{
  id: 'p-11.3.1.3-1', goal: '11.3.1.3', kind: 'mcq', marks: 1,
  stem: 'Which statement about bond breaking and bond making is correct?',
  options: {
    A: 'Bond breaking is exothermic and bond making is endothermic.',
    B: 'Bond breaking is endothermic and bond making is exothermic.',
    C: 'Both processes are endothermic.',
    D: 'Whether a process is exothermic depends on the number of bonds, not on whether they break or form.'
  },
  answer: 'B',
  why: 'Breaking a bond means pulling apart two atoms that are attracted to each other, which always costs energy, so it is endothermic. Forming a bond releases that energy again, so it is exothermic. A reaction is exothermic overall when the energy released making the new bonds exceeds the energy absorbed breaking the old ones. That is exactly what the equation enthalpy change = bonds broken minus bonds formed encodes.'
},
{
  id: 'p-11.3.1.3-2', goal: '11.3.1.3', kind: 'structured', marks: 4,
  stem: 'Use the mean bond enthalpies below to calculate the enthalpy change for the combustion of methane.\n\nCH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)\n\nC-H = +413, O=O = +498, C=O = +805, O-H = +464 kJ mol-1. [4]',
  scheme: [
    'bonds broken = (4 x 413) + (2 x 498) = 1652 + 996 = 2648 kJ mol-1 [1]',
    'bonds formed = (2 x 805) + (4 x 464) = 1610 + 1856 = 3466 kJ mol-1 [1]',
    'enthalpy change = 2648 - 3466 [1]',
    '= -818 kJ mol-1 [1]'
  ],
  why: 'Count the bonds from the equation, not from memory: methane has four C-H bonds, two oxygen molecules give two O=O, carbon dioxide has two C=O, and two water molecules give four O-H. Then bonds broken minus bonds formed. The negative sign is a mark in itself and is the point of the calculation: more energy comes out forming the products than went in breaking the reactants, so combustion is exothermic. Note this is an estimate, because mean bond enthalpies are averages across many different compounds.'
},
{
  id: 'p-11.3.1.3-3', goal: '11.3.1.3', kind: 'mcq', marks: 1,
  stem: 'A value calculated from mean bond enthalpies rarely agrees exactly with the experimental enthalpy of reaction. What is the main reason?',
  options: {
    A: 'Mean bond enthalpies are averages taken over many different compounds.',
    B: 'Mean bond enthalpies are measured at a different pressure.',
    C: 'Some bonds do not break during the reaction.',
    D: 'Experimental values always include heat lost to the surroundings.'
  },
  answer: 'A',
  why: 'The strength of a C-H bond is not identical in methane, ethane and ethanol, because the rest of the molecule affects it. A tabulated mean bond enthalpy averages over all those environments, so applying it to one specific compound introduces an error. There is a second, related point worth knowing: bond enthalpies refer to gaseous species, so if a product such as water is liquid in the real experiment you have also missed the enthalpy of condensation.'
},

// ---- 11.3.1.6  determining enthalpy changes experimentally ---------------
{
  id: 'p-11.3.1.6-1', goal: '11.3.1.6', kind: 'structured', marks: 4,
  stem: '1.20 g of magnesium was added to 100 cm3 of excess copper(II) sulfate solution in a polystyrene cup. The temperature rose from 20.5 degrees C to 45.5 degrees C. Assume the solution has the density and specific heat capacity of water (4.18 J g-1 K-1) and that magnesium is the limiting reagent.\n\nCalculate the enthalpy change of reaction, in kJ mol-1. (Ar Mg = 24.3) [4]',
  scheme: [
    'q = m c dT = 100 x 4.18 x 25.0 = 10450 J = 10.45 kJ [1]',
    'mol Mg = 1.20 / 24.3 = 0.0494 mol [1]',
    'enthalpy change = -10.45 / 0.0494 [1]',
    '= -212 kJ mol-1 [1]'
  ],
  why: 'Three habits keep the marks here. Use the mass of the solution, not the mass of the magnesium, in q = mcdT, because it is the solution whose temperature you measured. Divide by the moles of the limiting reagent, which the question has told you is magnesium. Put the negative sign in: the temperature rose, so the reaction gave out heat, so the enthalpy change is negative. Dividing 10.45 kJ by 0.0494 mol gives 212, and the answer is -212 kJ mol-1.'
},
{
  id: 'p-11.3.1.6-2', goal: '11.3.1.6', kind: 'mcq', marks: 1,
  stem: 'In a simple calorimetry experiment the measured enthalpy of combustion of ethanol is much less exothermic than the data book value. What is the most likely reason?',
  options: {
    A: 'The ethanol was impure.',
    B: 'Heat was lost to the surroundings and to the apparatus.',
    C: 'The thermometer was reading too high.',
    D: 'Too much water was used in the calorimeter.'
  },
  answer: 'B',
  why: 'In an open calorimeter a large fraction of the heat never reaches the water: it warms the air, the glass beaker and the metal of the spirit burner, and some fuel may burn incompletely. That makes the measured temperature rise smaller than it should be, and so the calculated enthalpy change comes out less exothermic. D is a distractor: using more water gives a smaller rise but the same energy, since q = mcdT compensates exactly.'
},

// ---- 11.3.2.4  effects of temperature and concentration on rate ----------
{
  id: 'p-11.3.2.4-1', goal: '11.3.2.4', kind: 'mcq', marks: 1,
  stem: 'A reaction speeds up markedly when the temperature is raised by 10 degrees C. What is the main reason?',
  options: {
    A: 'The particles collide more often because they move faster.',
    B: 'A much larger fraction of collisions has energy greater than or equal to the activation energy.',
    C: 'The activation energy of the reaction is lowered.',
    D: 'The particles collide at more favourable orientations.'
  },
  answer: 'B',
  why: 'Both effects in A and B are real, but they are not the same size. Raising the temperature by 10 degrees increases the mean speed, and so the collision frequency, by only a few per cent. What changes dramatically is the shape of the Maxwell-Boltzmann distribution: the curve flattens and shifts right, and the area beyond the activation energy can easily double. That is why rate roughly doubles rather than rising a few per cent. C is a classic error: only a catalyst lowers activation energy, temperature never does.'
},
{
  id: 'p-11.3.2.4-2', goal: '11.3.2.4', kind: 'structured', marks: 4,
  stem: 'A Maxwell-Boltzmann distribution is drawn for a fixed amount of gas at temperature T1. A second curve is then drawn for the same sample at a higher temperature T2.\n\n(a) State two ways in which the T2 curve differs from the T1 curve. [2]\n(b) Explain, using the distribution, why a catalyst increases the rate of reaction. [2]',
  scheme: [
    '(a) the peak is lower and shifted to the right / to higher energy [1]',
    '(a) the total area under the curve is unchanged [1]',
    '(b) a catalyst provides an alternative route with a lower activation energy [1]',
    '(b) so a greater proportion of molecules has energy greater than or equal to Ea and more collisions are successful [1]'
  ],
  why: 'The area under a Maxwell-Boltzmann curve is the total number of molecules, and heating does not create molecules, so the area must stay the same. If the curve spreads out to higher energies, the peak has to drop to compensate. For the catalyst, the curve itself does not move at all: what moves is the activation energy line, to the left, which puts a bigger slice of the same curve beyond it. Saying a catalyst "gives the particles more energy" is wrong and is heavily penalised.'
},

// ---- 11.3.2.5  rate equations -------------------------------------------
{
  id: 'p-11.3.2.5-1', goal: '11.3.2.5', kind: 'structured', marks: 5,
  stem: 'The reaction between A and B was studied at constant temperature.\n\nExperiment 1: [A] = 0.10, [B] = 0.10, initial rate = 2.0 x 10-4 mol dm-3 s-1\nExperiment 2: [A] = 0.20, [B] = 0.10, initial rate = 8.0 x 10-4 mol dm-3 s-1\nExperiment 3: [A] = 0.20, [B] = 0.20, initial rate = 8.0 x 10-4 mol dm-3 s-1\n\n(a) Deduce the order with respect to A and with respect to B. [2]\n(b) Write the rate equation and state the overall order. [2]\n(c) Calculate the value of the rate constant, with units. [1]',
  scheme: [
    '(a) second order with respect to A [1]',
    '(a) zero order with respect to B [1]',
    '(b) rate = k[A]2 [1]',
    '(b) overall order = 2 [1]',
    '(c) k = 2.0 x 10-4 / (0.10)2 = 2.0 x 10-2 dm3 mol-1 s-1 [1]'
  ],
  why: 'Compare experiments that change only one concentration. From 1 to 2, [A] doubles with [B] fixed and the rate goes up four times, and 4 = 2 squared, so the order in A is 2. From 2 to 3, [B] doubles with [A] fixed and the rate does not change at all, so the order in B is 0 and B is left out of the rate equation entirely. For the units, rearrange: k = rate divided by concentration squared, which is mol dm-3 s-1 over mol2 dm-6, giving dm3 mol-1 s-1. Marks for units are given away far too often.'
},
{
  id: 'p-11.3.2.5-2', goal: '11.3.2.5', kind: 'mcq', marks: 1,
  stem: 'For a first order reaction, which statement is correct?',
  options: {
    A: 'The half-life is independent of the initial concentration.',
    B: 'The half-life doubles each time the reaction halves in concentration.',
    C: 'A graph of concentration against time is a straight line.',
    D: 'The rate constant has units of mol dm-3 s-1.'
  },
  answer: 'A',
  why: 'A constant half-life is the fingerprint of first order kinetics, and it is the usual way to identify the order from a concentration-time graph: measure the time to fall from 0.8 to 0.4, then from 0.4 to 0.2, and see whether they match. C describes zero order, where the concentration falls linearly. D gives the units of a zero order rate constant; for first order the units are s-1, because rate over concentration cancels the mol dm-3.'
},

// ---- 11.3.3.7  effect of temperature on Kc ------------------------------
{
  id: 'p-11.3.3.7-1', goal: '11.3.3.7', kind: 'mcq', marks: 1,
  stem: 'For the equilibrium 2SO2(g) + O2(g) equilibrium 2SO3(g), the forward reaction is exothermic. What happens when the temperature is raised at constant pressure?',
  options: {
    A: 'Kc increases and the yield of SO3 increases.',
    B: 'Kc decreases and the yield of SO3 decreases.',
    C: 'Kc is unchanged but the yield of SO3 decreases.',
    D: 'Kc decreases but the yield of SO3 is unchanged.'
  },
  answer: 'B',
  why: 'Raising the temperature shifts the position of equilibrium in the endothermic direction, which here is backwards, so less SO3 is present at equilibrium. Because the ratio of products to reactants has genuinely changed, Kc must change too, and since SO3 is on the top of the expression, Kc falls. The point to hold on to: temperature is the only thing that changes Kc. Changing concentration or pressure shifts the position of equilibrium but leaves Kc exactly where it was, and a catalyst changes neither.'
},
{
  id: 'p-11.3.3.7-2', goal: '11.3.3.7', kind: 'structured', marks: 4,
  stem: 'The Haber process is carried out at about 450 degrees C and 200 atmospheres with an iron catalyst.\n\nN2(g) + 3H2(g) equilibrium 2NH3(g)   enthalpy change = -92 kJ mol-1\n\n(a) Explain why a high pressure gives a better yield of ammonia. [2]\n(b) Explain why a temperature of 450 degrees C is used rather than a much lower one. [2]',
  scheme: [
    '(a) there are 4 moles of gas on the left and 2 on the right [1]',
    '(a) raising the pressure shifts the equilibrium to the side with fewer moles of gas, so towards ammonia [1]',
    '(b) the forward reaction is exothermic, so a lower temperature would give a higher yield [1]',
    '(b) but the rate would be too slow, so 450 degrees C is a compromise between yield and rate [1]',
  ],
  why: 'Part (a) needs the mole counts stated explicitly, not just "fewer moles on the right". Part (b) is the classic compromise question and both halves are needed: first concede that a low temperature would favour the yield, then explain why it is not used anyway. An answer that only says "450 is a compromise" without saying what is being traded against what gets one mark at best. The catalyst, worth remembering, changes neither the yield nor Kc: it only gets you to equilibrium faster.'
},

// ---- 11.2.3.8  standard electrode potentials and EMF --------------------
{
  id: 'p-11.2.3.8-1', goal: '11.2.3.8', kind: 'structured', marks: 4,
  stem: 'Use the standard electrode potentials below.\n\nZn2+(aq) + 2e- -> Zn(s)   E = -0.76 V\nCu2+(aq) + 2e- -> Cu(s)   E = +0.34 V\n\n(a) Calculate the standard EMF of a cell made from these two half-cells. [1]\n(b) Write the equation for the spontaneous cell reaction. [2]\n(c) State which electrode is the negative one. [1]',
  scheme: [
    '(a) EMF = +0.34 - (-0.76) = +1.10 V [1]',
    '(b) Zn(s) + Cu2+(aq) -> Zn2+(aq) + Cu(s) [1]',
    '(b) correct state symbols [1]',
    '(c) the zinc electrode [1]'
  ],
  why: 'EMF is the more positive electrode potential minus the more negative one, which always gives a positive EMF for a spontaneous cell. The half-equation with the more negative value runs backwards, so zinc is oxidised and the copper half-equation runs forwards as written. Because zinc is the one releasing electrons into the external circuit, the zinc electrode is the negative terminal. A useful check: the metal that dissolves is always the more reactive one, and here that is zinc.'
},
{
  id: 'p-11.2.3.8-2', goal: '11.2.3.8', kind: 'mcq', marks: 1,
  stem: 'What are the standard conditions for measuring an electrode potential?',
  options: {
    A: '298 K, 100 kPa, all solutions at 1.00 mol dm-3',
    B: '273 K, 100 kPa, all solutions at 1.00 mol dm-3',
    C: '298 K, 100 kPa, all solutions at 0.100 mol dm-3',
    D: '298 K, 1000 kPa, all solutions saturated'
  },
  answer: 'A',
  why: 'Standard conditions are 298 K, a pressure of 100 kPa for any gases, and 1.00 mol dm-3 for every solution involved, measured against a standard hydrogen electrode that is defined as exactly 0.00 V. B uses 273 K, which is standard temperature for gas calculations but not for electrode potentials. Concentration matters because the electrode potential shifts if you change it, which is why non-standard cells do not give the tabulated values.'
},

// ---- 11.2.3.1  oxidation and reduction ----------------------------------
{
  id: 'p-11.2.3.1-1', goal: '11.2.3.1', kind: 'mcq', marks: 1,
  stem: 'In the reaction below, which species is the oxidising agent?\n\nCl2 + 2Br- -> 2Cl- + Br2',
  options: { A: 'Cl2', B: 'Br-', C: 'Cl-', D: 'Br2' },
  answer: 'A',
  why: 'Chlorine goes from oxidation state 0 to -1, so it has gained electrons and been reduced. The species that is itself reduced is the one doing the oxidising, so chlorine is the oxidising agent. Bromide goes from -1 to 0, losing electrons, so it is oxidised and is the reducing agent. The wording trips people up constantly: the oxidising agent is always the one that gets reduced.'
},
{
  id: 'p-11.2.3.1-2', goal: '11.2.3.1', kind: 'structured', marks: 3,
  stem: 'Acidified manganate(VII) ions oxidise iron(II) ions.\n\nMnO4-(aq) + 8H+(aq) + 5e- -> Mn2+(aq) + 4H2O(l)\nFe2+(aq) -> Fe3+(aq) + e-\n\n(a) Deduce the oxidation state of manganese in MnO4-. [1]\n(b) Combine the half-equations into the overall ionic equation. [2]',
  scheme: [
    '(a) +7 [1]',
    '(b) MnO4- + 8H+ + 5Fe2+ -> Mn2+ + 4H2O + 5Fe3+ [1]',
    '(b) electrons correctly balanced (iron half-equation multiplied by 5) [1]'
  ],
  why: 'For (a), four oxygens at -2 give -8, and the whole ion is -1, so manganese must be +7. For (b) the electrons must cancel exactly: the manganese half takes 5 electrons and the iron half gives 1, so multiply the iron half-equation by 5 before adding. Then check the total charge on each side. Left: (-1) + 8(+1) + 5(+2) = +17. Right: (+2) + 5(+3) = +17. They match, so the equation is balanced.'
}

);
