package Topics;
use strict; use warnings; use utf8;

# ordered rules: first strong match wins, else best weighted score
our @RULES = (
  ['analysis', [
    qr/mass spectrum|mass spectromet|m\/z|molecular ion peak/i => 6,
    qr/\bnmr\b|proton nmr|chemical shift|tms|splitting pattern|multiplicity|singlet|triplet|quartet/i => 6,
    qr/infra-?red|\bir\b spectr|wavenumber|absorption at \d/i => 6,
    qr/chromatograph|\brf value|retention time/i => 5,
    qr/isotop|relative atomic mass from/i => 2,
  ]],
  ['atomic-structure', [
    qr/fundamental particle|number of (protons|neutrons)|nucleon|proton number|mass number|atomic symbol/i => 5,
    qr/isotope/i => 4,
    qr/relative atomic mass|relative molecular mass/i => 2,
    qr/model of the atom|plum pudding|rutherford|bohr\b|dalton|thomson/i => 6,
    qr/radioactiv|nuclear fission|nuclei can each capture|alpha particle|beta particle/i => 6,
  ]],
  ['electron-config', [
    qr/electron(ic)? configuration|electron arrangement|1s2 2s2|sub-?shell|orbital/i => 5,
    qr/ionisation energ|ionization energ|successive ionisation/i => 6,
    qr/electron affinity/i => 5,
    qr/aufbau|hund|pauli/i => 5,
  ]],
  ['moles', [
    qr/atom economy|percentage yield|theoretical yield/i => 6,
    qr/empirical formula|molecular formula from/i => 6,
    qr/ideal gas equation|molar volume|\bpV = nRT\b/i => 5,
    qr/mol dm-?3|concentration of the solution|titration calculation/i => 2,
    qr/titrat(ed|ion|ing) (against|with)|volume of .{0,25}required to (neutralise|react)/i => 5,
    qr/avogadro/i => 5,
    qr/what (is|mass|volume) .*(mass|volume|moles?) of/i => 2,
  ]],
  ['bonding', [
    qr/hydrogen bond|van der waals|dipole-?dipole|intermolecular force|london force/i => 6,
    qr/\bshape\b.*molecul|bond angle|vsepr|lone pair|trigonal|tetrahedral|pyramidal|octahedral/i => 6,
    qr/electronegativ|bond polarity|polar molecule/i => 5,
    qr/delocalised electron|sea of electrons|forces .{0,30}within solid|ionic (bond|lattice)|covalent (bond|lattice)|metallic bond|dative|co-?ordinate bond/i => 5,
    qr/hybridis|sigma.*\bpi\b|\bpi\b.*sigma|sp2|sp3/i => 5,
    qr/dot.?and.?cross/i => 5,
  ]],
  ['periodicity', [
    qr/period 3|across the period|periodic table.*trend|periodicity/i => 6,
    qr/atomic radius|ionic radius/i => 4,
    qr/oxide of.*period|melting point.*period/i => 4,
  ]],
  ['group2', [
    qr/group 2|group ii\b|alkaline earth|magnesium.*calcium|thermal (stability|decomposition) of.*(carbonate|nitrate)/i => 6,
    qr/antacid|indigestion|magnesium hydroxide|barium sulfate|solubility of.*(sulfate|hydroxide)/i => 5,
  ]],
  ['group17', [
    qr/disproportionation|group 17|group 7|halogen|halide ion|chlorine.*bromine|disproportionation of chlorine|silver nitrate.*precipitate/i => 6,
    qr/bleach|chlorate|\bHCl\b.*\bHBr\b.*\bHI\b/i => 4,
  ]],
  ['group14', [
    qr/group 14|\btin\b|lead\(|\bPbO\b|\bSnO\b|inert pair/i => 6,
  ]],
  ['nitrogen-sulfur', [
    qr/ammonia|haber process|\bNH3\b/i => 5,
    qr/nitric acid|\bHNO3\b|oxides of nitrogen|\bNOx?\b.*atmosphere|nitrate in/i => 5,
    qr/contact process|sulfuric acid|sulphuric|\bSO2\b|sulfur dioxide|acid rain|allotrop.*sulfur/i => 6,
  ]],
  ['energetics', [
    qr/enthalpy|hess|bond energ|calorimet|exothermic|endothermic|standard enthalpy|[Δ∆]H/i => 5,
    qr/lattice energ|born.?haber|electron affinity.*lattice|enthalpy of (hydration|solution|atomisation)/i => 7,
    qr/entropy|gibbs|free energy|[Δ∆][GS]\b|spontane/i => 7,
  ]],
  ['kinetics', [
    qr/maxwell.?boltzmann|activation energy|collision (theory|frequency)/i => 6,
    qr/rate equation|order of reaction|rate constant|rate-?determining|half-?life.*reaction|initial rate/i => 7,
    qr/catalys/i => 4,
    qr/rate of reaction/i => 4,
  ]],
  ['equilibria', [
    qr/\bKc\b|\bKp\b|equilibrium constant|le chatelier|position of equilibrium|reversible reaction|dynamic equilibrium/i => 6,
    qr/⇌/ => 3,
  ]],
  ['acids-bases', [
    qr/\bpH\b|\bKa\b|\bKb\b|\bKw\b|pKa|pKb|buffer|bronsted|brønsted|arrhenius|lewis acid|weak acid|strong base|titration curve|indicator|ionic product of water|zwitterion/i => 7,
    qr/neutralis|acid.?base/i => 3,
  ]],
  ['electrochemistry', [
    qr/oxidation and reduction are defined|electrode potential|standard hydrogen electrode|voltaic|galvanic|\bcell potential|\bEcell|electrolysis|electrolytic|redox couple|salt bridge|fuel cell/i => 7,
    qr/oxidation (state|number)|oxidising agent|reducing agent|redox|half-?equation|is (oxidised|reduced)/i => 3,
  ]],
  ['transition-metals', [
    qr/transition (metal|element)|complex ion|ligand|coordination number|co-?ordination number|chelate|coloured ion|d-?d transition|haemoglobin|spectrometry to determine concentration/i => 7,
    qr/\bTi\b.*\bCu\b|manganate|dichromate.*colour/i => 3,
  ]],
  ['aqueous-inorganic', [
    qr/metal-?aqua ion|hydrolysis of (salt|metal)|ligand substitution|\[Fe\(H2O\)6\]|\[Cu\(H2O\)6\]|amphoteric hydroxide/i => 7,
  ]],
  ['organic-basics', [
    qr/iupac|systematic name|nomenclature|homologous series|functional group|structural isomer|chain isomer|position(al)? isomer/i => 6,
    qr/E.Z isomer|optical isomer|enantiomer|chiral|racemi|plane.?polarised|stereoisomer|E-?Z isomer|cis-?trans|geometric(al)? isomer/i => 7,
  ]],
  ['hydrocarbons', [
    qr/alkane|alkene|cracking|free radical|photochemical chlorination|homolytic|electrophilic addition|markovnikov|unsaturation|bromine water/i => 6,
    qr/crude oil|fractional distillation|combustion of.*(propane|butane|methane)/i => 5,
  ]],
  ['polymers', [
    qr/polymer|polymeris|monomer|repeat(ing)? unit|\bPVC\b|poly\(|condensation polymer|nylon|terylene|polyester|polyamide/i => 7,
  ]],
  ['halogenoalkanes', [
    qr/halo(geno)?alkane|haloalkane|bromo(ethane|propane|butane)|chloro(ethane|propane|butane)|nucleophilic substitution|\bSN1\b|\bSN2\b|elimination.*(NaOH|KOH)|cfc|ozone layer/i => 7,
  ]],
  ['alcohols', [
    qr/alcohol|ethanol|propan-?[12]-?ol|butan-?[12]-?ol|methanol|dehydration of|oxidation of.*ol\b|primary alcohol|tertiary alcohol|fermentation|biofuel|phenol/i => 6,
  ]],
  ['carbonyl', [
    qr/propanone|butanone|propanal|butanal|pentanal|aldehyde|ketone|carbonyl|tollen|fehling|benedict|2,4-?dnph|carboxylic acid|ester(ification)?|acyl|anhydride|amide|soap|biodiesel|triglyceride|nucleophilic addition|\bHCN\b.*addition/i => 7,
  ]],
  ['aromatic', [
    qr/benzene|arene|aromatic|nitration|friedel|delocalis.*ring|electrophilic substitution|phenylamine|nitrobenzene|kekul/i => 7,
  ]],
  ['amines-amino', [
    qr/\bamine\b|amines|amino acid|peptide|protein|zwitterion|diazot|primary amine|secondary amine|dna|base pair|nitrile.*reduction|ninhydrin/i => 7,
  ]],
);

# the stem carries the topic; option text is weaker evidence, so it scores half
sub classify {
  my ($stem, $opts) = @_;
  $opts = '' unless defined $opts;
  my %score;
  for my $r (@RULES) {
    my ($topic, $pairs) = @$r;
    for (my $i = 0; $i < scalar(@$pairs); $i += 2) {
      my ($re, $w) = ($pairs->[$i], $pairs->[$i + 1]);
      if ($stem =~ $re) { $score{$topic} += $w * 2; }
      elsif ($opts =~ $re) { $score{$topic} += $w; }
    }
  }
  return ('unsorted', 0) unless %score;
  my @ranked = sort { $score{$b} <=> $score{$a} || $a cmp $b } keys %score;
  my $top = $ranked[0];
  my $second = defined $ranked[1] ? $score{$ranked[1]} : 0;
  my $conf = $score{$top} - $second;
  return ($top, $score{$top}, $conf);
}
1;
