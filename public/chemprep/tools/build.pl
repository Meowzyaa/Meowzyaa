use strict; use warnings; use utf8;
use FindBin;
require "$FindBin::Bin/topics.pl";
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

my $SP = $ENV{CHEMPREP_WORK} || "$FindBin::Bin/../.build";

# year => [ text-file-stem, source pdf relative path, ms-key-file or undef ]
my @P1 = (
  [2014, 'past_papers_2014_NIS_2014_paper1',              'past_papers/2014/NIS 2014 paper1.pdf',              undef],
  [2016, 'past_papers_2016_NIS_2016_paper_1',             'past_papers/2016/NIS 2016 paper 1.pdf',             undef],
  [2018, 'past_papers_2018_NIS_2018_paper1',              'past_papers/2018/NIS 2018 paper1.pdf',              undef],
  [2021, 'past_papers_2021_NIS_G12_CHE_01_7RP',           'past_papers/2021/NIS_G12_CHE_01_7RP.pdf',           'key_2021_NIS_G12_CHE_01_MS_3RP.json'],
  [2023, 'past_papers_2023_2023_NIS_G12_CHE_01_2RP_AFP_(1)', 'past_papers/2023/2023_NIS_G12_CHE_01_2RP_AFP (1).pdf', undef],
  [2024, 'past_papers_2024_2024_NIS_G12_CHE_01_2RP_AFP',  'past_papers/2024/2024_NIS_G12_CHE_01_2RP_AFP.pdf',  'key_2024_2024_NIS_G12_CHE_01_MS_2RP.json'],
  [2025, 'past_papers_2025_2025_NIS_G12_CHE_01_2RP_AFP',  'past_papers/2025/2025_NIS_G12_CHE_01_2RP_AFP.pdf',  'key_2025_2025_NIS_G12_CHE_01_MS_2RP.json'],
);
my %MSPDF = (
  2021 => 'past_papers/2021/NIS_G12_CHE_01_MS_3RP.pdf',
  2024 => 'past_papers/2024/2024_NIS_G12_CHE_01_MS_2RP.pdf',
  2025 => 'past_papers/2025/2025_NIS_G12_CHE_01_MS_2RP.pdf',
);

# [year, paper, text stem, question pdf, mark scheme pdf ('' when the archive has none)]
my @P23 = (
  [2014, 2, '2014_NIS_2014_paper2',                  'past_papers/2014/NIS 2014 paper2.pdf', ''],
  [2016, 2, '2016_NIS_2016_paper2',                  'past_papers/2016/NIS 2016 paper2.pdf', ''],
  [2018, 2, '2018_NIS_2018_paper2',                  'past_papers/2018/NIS 2018 paper2.pdf', ''],
  [2021, 2, '2021_NIS_G12_CHE_02_7RP',               'past_papers/2021/NIS_G12_CHE_02_7RP.pdf', 'past_papers/2021/NIS_G12_CHE_02_MS_7RP-3.0.pdf'],
  [2022, 2, '2022_2022_NIS_G12_CHE_02_2RP_AFP_(2)',  'past_papers/2022/2022_NIS_G12_CHE_02_2RP_AFP (2).pdf', 'past_papers/2022/2022_NIS_G12_CHE_02_MS_2RP (1).docx'],
  [2023, 2, '2023_2023_NIS_G12_CHE_02_RP_AFP',       'past_papers/2023/2023_NIS_G12_CHE_02_RP_AFP.pdf', 'past_papers/2023/2023_NIS_G12_CHE_02_MS_2RP_AFP Explanation.docx'],
  [2024, 2, '2024_2024_NIS_G12_CHE_02_2RP_AFP',      'past_papers/2024/2024_NIS_G12_CHE_02_2RP_AFP.pdf', 'past_papers/2024/2024_NIS_G12_CHE_02_MS_2RP.pdf'],
  [2025, 2, '2025_2025_NIS_G12_CHE_02_2RP_AFP',      'past_papers/2025/2025_NIS_G12_CHE_02_2RP_AFP.pdf', 'past_papers/2025/2025_NIS_G12_CHE_02_MS_2RP (1).pdf'],
  [2022, 3, '2022_2022_NIS_G12_CHE_03_2RP_AFP_(3)',  'past_papers/2022/2022_NIS_G12_CHE_03_2RP_AFP (3).pdf', 'past_papers/2022/2022_NIS_G12_CHE_03_MS_2RP (2).docx'],
  [2023, 3, '2023_NIS_G12_CHE_03_7RP_AFP_(1)_(1)',   'past_papers/2023/NIS_G12_CHE_03_7RP_AFP (1) (1).pdf', ''],
  [2024, 3, '2024_2024_NIS_G12_CHE_03_2RP_AFP',      'past_papers/2024/2024_NIS_G12_CHE_03_2RP_AFP.pdf', 'past_papers/2024/2024_NIS_G12_CHE_03_MS_2RP.pdf'],
  [2025, 3, '2025_2025_NIS_G12_CHE_03_2RP_AFP_(1)',  'past_papers/2025/2025_NIS_G12_CHE_03_2RP_AFP (1).pdf', 'past_papers/2025/2025_NIS_G12_CHE_03_MS_2RP.pdf'],
);

sub slurp { my $f = shift; open(my $h, '<:encoding(UTF-8)', $f) or die "$f: $!"; local $/; my $c = <$h>; close $h; return $c; }

# minimal JSON reader for the shapes we produce ourselves
sub read_key {
  my $f = shift; return undef unless $f && -f "$SP/$f";
  my %k; my $c = slurp("$SP/$f");
  while ($c =~ /"(\d+)":\s*"([ABCD])"/g) { $k{$1} = $2; }
  return \%k;
}
sub read_qs {
  my $f = shift; my $c = slurp($f);
  my @out;
  while ($c =~ /\{\s*"n":\s*(\d+),\s*"type":\s*"(\w+)",\s*"page":\s*(\d+),\s*"stem":\s*"((?:[^"\\]|\\.)*)",\s*"options":\s*\{\s*"A":\s*"((?:[^"\\]|\\.)*)",\s*"B":\s*"((?:[^"\\]|\\.)*)",\s*"C":\s*"((?:[^"\\]|\\.)*)",\s*"D":\s*"((?:[^"\\]|\\.)*)"\s*\}\s*\}/g) {
    push @out, { n => $1, type => $2, page => $3, stem => unesc($4),
                 A => unesc($5), B => unesc($6), C => unesc($7), D => unesc($8) };
  }
  return @out;
}
sub unesc { my $s = shift; $s =~ s/\\"/"/g; $s =~ s/\\\\/\\/g; return $s; }
sub esc { my $s = shift; $s =~ s/\\/\\\\/g; $s =~ s/"/\\"/g; $s =~ s/[\r\n\t]/ /g; return $s; }

sub clean_stem {
  my $s = shift;
  # the copyright block on the last page bleeds into the final question
  $s =~ s/\s*Permission to reproduce items where third-party.*$//s;
  $s =~ s/\s*Every reasonable effort has been made by the publisher.*$//s;
  $s =~ s/\s*Cambridge Assessment International Education is part of.*$//s;
  # older papers reprint the section B response key under every question; the
  # four options are already rendered, so the blurb is pure noise
  $s =~ s/\s*(\x{2502}\s*)?1,\s*2\s*and\s*3\s*are\b.*$//is;
  $s =~ s/\s*\x{2502}\s*\[\d+\]\s*/ /g;   # stray mark markers pulled in from the margin
  $s =~ s/\s*\[\d+\]\s*$//;
  $s =~ s/\s*\x{2502}\s*$//;
  $s =~ s/\s{2,}/ /g;
  $s =~ s/^\s+|\s+$//g;
  return $s;
}

# figure-dependent detection
sub needs_figure {
  my ($q) = @_;
  my $all = join(' ', $q->{stem}, $q->{A}, $q->{B}, $q->{C}, $q->{D});
  return 1 if $q->{stem} =~ /\b(fig\.?\s*\d|figure|diagram|graph|chart)\b/i;
  return 1 if $q->{stem} =~ /\b(is|are) shown\b|shown below|structure of the compound|skeletal formula/i;
  return 1 if $q->{stem} =~ /\bshows\b.*\b(spectrum|structure|curve|apparatus|mechanism|arrangement|graph|cycle)\b/i;
  # option debris: very short options that are just orphan glyphs
  my $tiny = 0;
  for my $k ('A','B','C','D') { $tiny++ if length($q->{$k}) <= 2; }
  return 1 if $tiny >= 2;
  # a drawing flattened into text leaves a trail of stranded one- and two-letter
  # tokens, e.g. "O | O N | NC | C H | H"
  my $orphan = () = ($q->{stem} =~ /(?:^|[\s\x{2502}])[A-Z]{1,2}(?=[\s\x{2502}]|$)/g);
  return 1 if $orphan >= 5;
  return 0;
}

# hand-checked topic assignments for questions the keyword rules cannot place
my %OVERRIDE = (
  '2016-p1-q5'  => 'group2',            # chlorides of beryllium and barium
  '2016-p1-q6'  => 'group17',           # chlorine with cold water and cold NaOH
  '2018-p1-q2'  => 'moles',             # moles of Cl2 reacting with sodium
  '2021-p1-q39' => 'carbonyl',          # propanoic acid + sodium carbonate
  '2014-p1-q27' => 'kinetics',            # competitive inhibition of an enzyme
  '2016-p1-q22' => 'transition-metals',   # extraction of Cr, Co, Cu, Pb
  '2016-p1-q23' => 'organic-basics',      # naming a heterocyclic compound
  '2018-p1-q21' => 'organic-basics',      # which name and structure are correct
  '2021-p1-q7'  => 'periodicity',         # spiral system of the elements
  '2021-p1-q31' => 'group2',              # Mg / Fe / Cu with steam
  '2023-p1-q2'  => 'acids-bases',         # ionic equation for HCl + NaOH
  '2023-p1-q29' => 'carbonyl',            # naming aldehydes and ketones
  '2024-p1-q1'  => 'electrochemistry',    # definitions of oxidation and reduction
  '2024-p1-q7'  => 'halogenoalkanes',     # CH2Cl2 + Cl2 -> CHCl3
  '2024-p1-q24' => 'organic-basics',      # isomers of C5H10O
  '2024-p1-q31' => 'moles',               # spectator ions / ionic equations
  '2025-p1-q21' => 'transition-metals',   # CO and haemoglobin
  '2014-p1-q4'  => 'bonding',             # ionic vs covalent chlorides
  '2014-p1-q34' => 'moles',               # atom economy of ethanol routes
  '2014-p1-q39' => 'polymers',            # which formulae are polyesters
  '2016-p1-q19' => 'hydrocarbons',        # fractionation of oil
  '2018-p1-q25' => 'carbonyl',            # phenylmethylketone chemistry
  '2021-p1-q22' => 'alcohols',            # hydration of propene
  '2021-p1-q34' => 'analysis',            # infra-red wavenumber ranges
  '2023-p1-q7'  => 'aqueous-inorganic',   # acidity of hexaaqua iron ions
  '2023-p1-q15' => 'hydrocarbons',        # methane + chlorine in sunlight
  '2023-p1-q20' => 'transition-metals',   # shape and co-ordination number
  '2023-p1-q33' => 'bonding',             # giant covalent structures
  '2023-p1-q39' => 'moles',               # empirical formula from composition
  '2024-p1-q4'  => 'bonding',             # structure from physical properties
  '2025-p1-q17' => 'periodicity',         # melting points across a period
  '2025-p1-q34' => 'organic-basics',      # identifying functional groups
  '2025-p1-q38' => 'energetics',          # entropy change of ligand exchange
);

my @records;
my %stats;

for my $p (@P1) {
  my ($year, $stem, $pdf, $keyfile) = @$p;
  my $key = read_key($keyfile);
  my @qs = read_qs("$SP/out_${stem}.json");
  for my $q (@qs) {
    $q->{stem} = clean_stem($q->{stem});
    my $optblob = join(' ', $q->{A}, $q->{B}, $q->{C}, $q->{D});
    my ($topic, $score, $conf) = Topics::classify($q->{stem}, $optblob);
    my $id = "$year-p1-q$q->{n}";
    if (exists $OVERRIDE{$id}) { $topic = $OVERRIDE{$id}; $conf = 99; }
    my $fig = needs_figure($q);
    my $ans = $key ? ($key->{$q->{n}} // '') : '';
    $stats{$topic}++;
    push @records, {
      id     => "$year-p1-q$q->{n}",
      year   => $year,
      paper  => 1,
      number => $q->{n},
      kind   => $q->{type},
      marks  => 1,
      topic  => $topic,
      conf   => $conf // 0,
      figure => $fig,
      stem   => $q->{stem},
      opts   => { A => $q->{A}, B => $q->{B}, C => $q->{C}, D => $q->{D} },
      answer => $ans,
      src    => $pdf,
      page   => $q->{page},
      mspdf  => $MSPDF{$year} // '',
    };
  }
}

# mark scheme text lifted out of the .docx schemes, keyed "year-paper-qnum"
my %MSTEXT;
for my $spec (['2022', 2], ['2022', 3], ['2023', 2]) {
  my ($year, $paper) = @$spec;
  my $f = "$SP/msdocx_${year}_p${paper}.json";
  next unless -f $f;
  my $c = slurp($f);
  while ($c =~ /\{"n":(\d+),"parts":\[(.*?)\]\}/gs) {
    my ($n, $blob) = ($1, $2);
    my @parts;
    while ($blob =~ /\{"part":"((?:[^"\\]|\\.)*)","text":"((?:[^"\\]|\\.)*)"\}/g) {
      push @parts, { part => unesc($1), text => unesc($2) };
    }
    $MSTEXT{"$year-$paper-$n"} = \@parts if @parts;
  }
}

# examiner commentary from the OOK booklets, keyed "year-paper-qnum"
my %OOK;
for my $spec (['2021', 2], ['2023', 2], ['2023', 3], ['2024', 3], ['2025', 2], ['2025', 3]) {
  my ($year, $paper) = @$spec;
  my $f = "$SP/ook_${year}_p${paper}.json";
  next unless -f $f;
  my $c = slurp($f);
  while ($c =~ /\{"n":(\d+),"notes":\[(.*?)\]\}/gs) {
    my ($n, $blob) = ($1, $2);
    my @notes;
    while ($blob =~ /\{"part":"((?:[^"\\]|\\.)*)","grade":"([A-E]?)","text":"((?:[^"\\]|\\.)*)"\}/g) {
      push @notes, { part => unesc($1), grade => $2, text => unesc($3) };
    }
    $OOK{"$year-$paper-$n"} = \@notes if @notes;
  }
}

sub read_structured {
  my $f = shift; my $c = slurp($f); my @out;
  while ($c =~ /\{"n":(\d+),"page":(\d+),"marks":(\d+),"parts":(\d+),"intro":"((?:[^"\\]|\\.)*)","body":"((?:[^"\\]|\\.)*)"\}/g) {
    push @out, { n => $1, page => $2, marks => $3, parts => $4, intro => unesc($5), body => unesc($6) };
  }
  return @out;
}

for my $p (@P23) {
  my ($year, $paper, $stem, $pdf, $ms) = @$p;
  my @qs = read_structured("$SP/s_past_papers_${stem}.json");
  for my $q (@qs) {
    my $intro = clean_stem($q->{intro});
    my $body  = clean_stem($q->{body});
    my ($topic, $score, $conf) = Topics::classify($intro, $body);
    my $id = "$year-p$paper-q$q->{n}";
    $topic = $OVERRIDE{$id} if exists $OVERRIDE{$id};
    $stats{$topic}++;
    my $fig = needs_figure({ stem => $body, A => '', B => '', C => '', D => '' });
    push @records, {
      id => $id, year => $year, paper => $paper, number => $q->{n},
      kind => 'structured', marks => $q->{marks}, topic => $topic, conf => $conf // 0,
      figure => $fig, stem => $intro, body => $body, parts => $q->{parts},
      mstext => $MSTEXT{"$year-$paper-$q->{n}"},
      ook    => $OOK{"$year-$paper-$q->{n}"},
      opts => undef, answer => '', src => $pdf, page => $q->{page}, mspdf => $ms,
    };
  }
}

if (@ARGV && $ARGV[0] eq '--report') {
  for my $r (sort { $a->{topic} cmp $b->{topic} || $a->{id} cmp $b->{id} } @records) {
    printf "%-18s c%-2d %s %-12s %s\n", $r->{topic}, $r->{conf},
      ($r->{figure} ? 'FIG' : '   '), $r->{id}, substr($r->{stem}, 0, 92);
  }
  print STDERR "\n--- topic counts ---\n";
  printf STDERR "%-20s %d\n", $_, $stats{$_} for sort { $stats{$b} <=> $stats{$a} } keys %stats;
  printf STDERR "TOTAL %d\n", scalar(@records);
  exit;
}

# emit JSON
my @j;
for my $r (@records) {
  my $head = sprintf(
    '{"id":"%s","year":%d,"paper":%d,"n":%d,"kind":"%s","marks":%d,"topic":"%s","figure":%s,"stem":"%s"',
    $r->{id}, $r->{year}, $r->{paper}, $r->{number}, $r->{kind}, $r->{marks}, $r->{topic},
    ($r->{figure} ? 'true' : 'false'), esc($r->{stem}));
  my $mid = $r->{opts}
    ? sprintf(',"options":{"A":"%s","B":"%s","C":"%s","D":"%s"},"answer":"%s"',
        esc($r->{opts}{A}), esc($r->{opts}{B}), esc($r->{opts}{C}), esc($r->{opts}{D}), $r->{answer})
    : sprintf(',"body":"%s","parts":%d%s', esc($r->{body}), $r->{parts},
        ($r->{mstext}
          ? ',"scheme":[' . join(',', map {
              '{"part":"' . esc($_->{part}) . '","text":"' . esc($_->{text}) . '"}'
            } @{$r->{mstext}}) . ']'
          : '')
        . ($r->{ook}
          ? ',"examiner":[' . join(',', map {
              '{"part":"' . esc($_->{part}) . '","grade":"' . $_->{grade} .
              '","text":"' . esc($_->{text}) . '"}'
            } @{$r->{ook}}) . ']'
          : ''));
  push @j, $head . $mid . sprintf(',"src":"%s","page":%d,"ms":"%s"}',
    esc($r->{src}), $r->{page}, esc($r->{mspdf}));
}
print "[\n" . join(",\n", @j) . "\n]\n";
