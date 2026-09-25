use strict; use warnings; use utf8;
use FindBin;
require "$FindBin::Bin/topics.pl";
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

# Ranks learning objectives by how heavily the past paper archive tests them.
#
# Each objective is reduced to its distinctive terms (the syllabus verbs and
# ordinary English are stripped, and any term that turns up in more than a
# quarter of the archive is too generic to be evidence). An archive question
# counts towards an objective when it carries at least two of those terms.

my ($objFile, $qFile) = @ARGV;

sub slurp {
  my $f = shift;
  open(my $h, '<:encoding(UTF-8)', $f) or die "$f: $!";
  local $/; my $c = <$h>; close $h; return $c;
}

my @STOP = qw(
  know knows knowing understand understands understanding recall recalls recognise
  recognises recognize appreciate able being have has had this that these those with
  from into their there they them then than when what which where while will would
  should must can could may might also such some any all both each other more most
  many much very just only same different various given using use uses used usable
  about above after again against along among around because been before below
  between during further here however itself once other over same still such through
  under until upon what whom whose your ability terms term general specific include
  including includes example examples appropriate suitable simple various
  and the for are was were its it in of to a an as at be by is on or if not no
);
my %STOP = map { $_ => 1 } @STOP;

sub terms {
  my $s = lc shift;
  $s =~ s/[^a-z0-9+\-\.\s]/ /g;
  my @t;
  for my $w (split /\s+/, $s) {
    $w =~ s/^[\-\.]+|[\-\.]+$//g;
    next if $w eq '' || $STOP{$w};
    next if length($w) < 4 && $w !~ /^(ph|ka|kb|kc|kp|kw|nmr|ion|mol|sp2|sp3|pka|pkb)$/;
    push @t, $w;
  }
  my %seen; return grep { !$seen{$_}++ } @t;
}

# ---- archive questions -------------------------------------------------

my $qraw = slurp($qFile);
my (@docs, @meta);
while ($qraw =~ /\{"id":"([^"]+)".*?"topic":"([^"]+)".*?"stem":"((?:[^"\\]|\\.)*)"(.*?)(?=\n\{"id":|\n\]|$)/gs) {
  my ($id, $topic, $stem, $tail) = ($1, $2, $3, $4);
  my $body = $stem;
  $body .= ' ' . $1 while $tail =~ /"(?:A|B|C|D|body)":"((?:[^"\\]|\\.)*)"/g;
  push @docs, lc $body;
  push @meta, { id => $id, topic => $topic };
}
die "no questions parsed\n" unless @docs;

my %df;
for my $d (@docs) {
  my %seen;
  for my $w (terms($d)) { $df{$w}++ unless $seen{$w}++; }
}
my $maxdf  = int(scalar(@docs) * 0.12);   # anything commoner is not evidence
my $raredf = int(scalar(@docs) * 0.08);   # a match needs one term at least this rare

# ---- objectives --------------------------------------------------------

my $oraw = slurp($objFile);
my @objs;
while ($oraw =~ /\{"code":"([^"]+)","text":"((?:[^"\\]|\\.)*)"\}/g) {
  push @objs, { code => $1, text => $2 };
}

# Objectives the subject programme lists but the course calendars leave out.
# Source: NIS Subject Programme "Chemistry" (advanced level), Issue 12, 2025.
my %PROGRAMME_ONLY = (
  '12.4.2.18' => 'understand, be able to describe and be able to draw the bonding in benzene',
);
my %have = map { $_->{code} => 1 } @objs;
for my $c (sort keys %PROGRAMME_ONLY) {
  push @objs, { code => $c, text => $PROGRAMME_ONLY{$c} } unless $have{$c};
}
sub codekey { sprintf('%02d%02d%02d%03d', split /\./, shift) }
@objs = sort { codekey($a->{code}) cmp codekey($b->{code}) } @objs;

sub esc { my $s = shift; $s =~ s{\\}{\\\\}g; $s =~ s{"}{\\"}g; $s =~ s/[\r\n\t]/ /g; return $s; }

# The code places an objective exactly: the subject programme's long-term plan
# (pp. 42-53) fixes which code range belongs to which unit. Keyword matching on
# the wording filed Group 14 oxidation states under electrochemistry and ionic
# bonding under energetics, so it is no longer used for this.
sub unit_topic {
  my ($g, $u, $s, $n) = split /\./, shift;
  my $k = "$g.$u.$s";
  return $n <= 3 ? 'atomic-structure' : 'moles'        if $k eq '11.1.1';
  return 'atomic-structure'                             if $k eq '11.1.2';
  return 'electron-config'                              if $k eq '11.1.3';
  return $n <= 27 ? 'bonding' : 'analysis'              if $k eq '11.1.4';
  return $n <= 7 ? 'periodicity' : $n <= 13 ? 'group17' : 'group2' if $k eq '11.2.1';
  return 'moles'                                        if $k eq '11.2.2';
  return 'electrochemistry'                             if $k eq '11.2.3';
  return 'energetics'                                   if $k eq '11.3.1';
  return 'kinetics'                                     if $k eq '11.3.2';
  return 'equilibria'                                   if $k eq '11.3.3';
  if ($k eq '11.4.2') {
    return 'organic-basics' if $n <= 7;
    return 'hydrocarbons'   if $n <= 24;
    return 'alcohols'       if $n <= 30;
    return 'halogenoalkanes';
  }
  return $n <= 6 ? 'group14' : $n <= 19 ? 'nitrogen-sulfur' : 'transition-metals' if $k eq '12.2.1';
  return $n <= 16 ? 'acids-bases' : 'aqueous-inorganic' if $k eq '12.3.4';
  return 'materials'                                    if $k eq '12.4.1';
  if ($k eq '12.4.2') {
    return 'organic-basics' if $n <= 5;
    return 'carbonyl'       if $n <= 17;
    return 'aromatic'       if $n <= 24;
    return 'polymers'       if $n <= 38;
    return 'materials'      if $n <= 48;
    return 'synthesis';
  }
  return 'amines-amino'                                 if $k eq '12.5.1';
  return '';
}

# where the site files a programme topic somewhere else on purpose
my %TOPIC_FIX = (
  '11.2.1.2'  => 'electron-config',   # the Aufbau principle and the table's shape
  '11.2.1.4'  => 'electron-config',   # reading configurations off the table
  '11.3.2.2'  => 'moles',             # the ideal gas equation and molar volume
  '11.4.2.7'  => 'bonding',           # sigma and pi bonds, hybridisation
  '11.4.2.16' => 'organic-basics',    # E/Z isomerism sits with the other isomerism
  '11.4.2.17' => 'organic-basics',    # electrophile and nucleophile, used everywhere
  '11.4.2.21' => 'polymers',          # addition polymerisation
  '11.4.2.22' => 'polymers',
  '11.4.2.24' => 'polymers',          # uses of poly(alkenes) and recycling
  '12.3.4.17' => 'acids-bases',       # Arrhenius, Bronsted-Lowry and Lewis
  '12.4.2.45' => 'polymers',          # properties of polymers from their structure
  '12.5.1.28' => 'transition-metals', # toxic metals
);

my @rows;
for my $o (@objs) {
  my @t = grep { ($df{$_} || 0) > 0 && ($df{$_} || 0) <= $maxdf } terms($o->{text});
  my (@ids, %seenTopic);
  if (@t) {
    for my $i (0 .. $#docs) {
      my ($n, $rare) = (0, 0);
      for my $w (@t) {
        next unless index($docs[$i], $w) >= 0;
        $n++;
        $rare++ if ($df{$w} || 0) <= $raredf;
      }
      next unless $n >= 2 && $rare >= 1;
      push @ids, $meta[$i]{id};
      $seenTopic{ $meta[$i]{topic} }++;
    }
  }
  # the code decides; the wording and the matched questions are only a fallback
  # for a code outside the programme's ranges
  my $topic = exists $TOPIC_FIX{ $o->{code} } ? $TOPIC_FIX{ $o->{code} } : unit_topic($o->{code});
  if ($topic eq '') {
    ($topic) = Topics::classify($o->{text}, '');
    if ($topic eq 'unsorted' && %seenTopic) {
      ($topic) = sort { $seenTopic{$b} <=> $seenTopic{$a} || $a cmp $b } keys %seenTopic;
    }
  }
  push @rows, {
    code  => $o->{code},
    text  => $o->{text},
    hits  => scalar(@ids),
    ids   => \@ids,
    topic => ($topic eq 'unsorted' ? '' : $topic),
    terms => join(' ', @t[0 .. ($#t > 5 ? 5 : $#t)]),
  };
}

if (@ARGV > 2 && $ARGV[2] eq '--report') {
  @rows = sort { $b->{hits} <=> $a->{hits} } @rows;
  printf "%-12s %4d  %-20s %s\n", $_->{code}, $_->{hits}, $_->{topic}, substr($_->{text}, 0, 84) for @rows;
  exit;
}

my @j = map {
  sprintf('  {"code":"%s","grade":%d,"hits":%d,"topic":"%s","text":"%s","qs":[%s]}',
    $_->{code}, (substr($_->{code}, 0, 2) + 0), $_->{hits}, $_->{topic}, esc($_->{text}),
    join(',', map { '"' . $_ . '"' } @{$_->{ids}}))
} @rows;
print "[\n" . join(",\n", @j) . "\n]\n";
printf STDERR "objectives=%d  tested=%d  corpus=%d\n",
  scalar(@rows), scalar(grep { $_->{hits} > 0 } @rows), scalar(@docs);
