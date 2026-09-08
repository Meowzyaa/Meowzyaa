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

sub esc { my $s = shift; $s =~ s{\\}{\\\\}g; $s =~ s{"}{\\"}g; $s =~ s/[\r\n\t]/ /g; return $s; }

# objectives whose wording defeats the keyword rules, checked by hand
my %TOPIC_FIX = (
  '11.1.1.4'  => 'moles',            '11.1.4.11' => 'bonding',
  '11.1.4.32' => 'analysis',         '11.2.1.7'  => 'periodicity',
  '11.2.1.16' => 'group2',           '11.4.2.14' => 'hydrocarbons',
  '11.3.1.12' => 'energetics',       '12.2.1.8'  => 'nitrogen-sulfur',
  '12.3.4.19' => 'aqueous-inorganic','12.4.2.1'  => 'organic-basics',
  '12.4.2.24' => 'aromatic',         '12.4.2.53' => 'organic-basics',
  '12.5.1.28' => 'transition-metals',
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
  # the objective's own wording places it far more reliably than the topics of
  # the questions that happen to match it; the matches are only a fallback
  my ($topic) = Topics::classify($o->{text}, '');
  if ($topic eq 'unsorted' && %seenTopic) {
    ($topic) = sort { $seenTopic{$b} <=> $seenTopic{$a} || $a cmp $b } keys %seenTopic;
  }
  $topic = $TOPIC_FIX{ $o->{code} } if exists $TOPIC_FIX{ $o->{code} };
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
