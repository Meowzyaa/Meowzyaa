use strict; use warnings; use utf8;
use FindBin;
require "$FindBin::Bin/normalise.pl";
binmode(STDOUT, ':utf8');

my $file = $ARGV[0];
open(my $fh, '<:encoding(UTF-8)', $file) or die "$file: $!";
local $/; my $raw = <$fh>; close $fh;

$raw = Norm::text($raw);

my @pages = split /\f/, $raw;
my @rec;
for my $p (0..$#pages) {
  for my $l (split /\n/, $pages[$p]) {
    $l =~ s/\r//g;
    next if $l =~ /Center for Pedagogical Measurements/;
    next if $l =~ /AEO NIS|Nazarbayev Intellectual Schools/;
    next if $l =~ m{NIS[/_]G12[/_]CHE}i;
    next if $l =~ /BLANK PAGE/;
    next if $l =~ /^\s*\[?Turn over/;
    next if $l =~ /^\s*Examiner.s\s*$/;
    next if $l =~ /^\s*(For|Use)\s*$/;
    $l =~ s/\s{4,}(For|Examiner.s|Use)\s*$//;
    $l =~ s/\s+$//;
    next if $l =~ /^\s*\d{1,3}\s*$/;
    next if $l =~ /^\s*$/;
    push @rec, [$p+1, $l];
  }
}

my (@qs, $cur);
my $expect = 1;
my $seenD = 1;
my $flush = sub { push @qs, $cur if $cur; $cur = undef; };

my $secB = 0;
my %BOPT = (
  A => '1, 2 and 3 are correct',
  B => '1 and 2 only are correct',
  C => '2 and 3 only are correct',
  D => '1 only is correct',
);

for my $r (@rec) {
  my ($pg, $l) = @$r;

  # the cover sheet also prints "Section B" in the marks box, so only switch
  # once we are actually deep into the paper
  if (!$secB && $expect > 20 && $l =~ /^\s*Section\s+B\s*$/) {
    $flush->(); $secB = 1; $seenD = 1; next;
  }
  if ($secB) {
    next if $l =~ /^\s*(For each of the questions|Decide whether each|The responses A to D|No other combination|1, 2 and 3 are correct|1 and 2 only|2 and 3 only|1 only is correct|Use of the Data Booklet|may be correct|against the statements)/;
    my $bb = $l; $bb =~ s/\[\d+\]//g; $bb =~ s/\s+//g;
    next if $bb eq 'ABCD';
    next if $bb =~ /^[ABCD]{1,4}$/ && $bb ne '';
    next if $l =~ /^\s*\[\d+\]\s*$/;
    if ($l =~ /^\s*(\d{1,2})\s+(\S.*)$/ && $1 == $expect) {
      $flush->();
      $cur = { n => $1, page => $pg, stem => [ltidy($2)], opts => { %BOPT },
               order => ['A','B','C','D'], type => 'multi' };
      $expect++;
      next;
    }
    push @{$cur->{stem}}, ltidy($l) if $cur;
    next;
  }

  if ($l =~ /^\s*(\d{1,2})\s+(\S.*)$/) {
    my ($n, $rest) = ($1, $2);
    # a question whose options are pure diagrams never sets $seenD, so also allow
    # the next number through when the current question collected no options at all
    my $stalled = $cur && !@{$cur->{order}} && (($cur->{bare} || 0) >= 3);
    my $ok = ($n == $expect && $seenD)
          || ($n == $expect && $stalled && length(ltidy($rest)) >= 15)
          || ($n > $expect && $n <= $expect + 3 && length(ltidy($rest)) >= 15);
    if ($ok) {
      $flush->();
      $cur = { n => $n, page => $pg, stem => [ltidy($rest)], opts => {}, order => [] };
      $expect = $n + 1; $seenD = 0;
      next;
    }
  }
  next unless $cur;
  # a lone option letter means the choice itself is a picture
  $cur->{bare}++ if $l =~ /^\s*[ABCD]\s*$/;
  my $bare = $l; $bare =~ s/\[\d+\]//g; $bare =~ s/\s+//g;
  next if $bare eq 'ABCD';
  next if $l =~ /^\s*\[\d+\]\s*$/;
  if ($l =~ /^\s*([ABCD])\s+(\S.*)$/ && !exists $cur->{opts}{$1}) {
    my ($k, $v) = ($1, $2);
    my @seq = ('A','B','C','D');
    my $want = $seq[scalar @{$cur->{order}}];
    # "A piece of sodium ... ?" is stem prose, not option A
    my $prose = ($v =~ /\?/) ? 1 : 0;
    if (defined $want && $k eq $want && !$prose) {
      $cur->{opts}{$k} = ltidy($v);
      push @{$cur->{order}}, $k;
      $seenD = 1 if $k eq 'D';
      next;
    }
  }
  if (@{$cur->{order}}) {
    my $last = $cur->{order}[-1];
    $cur->{opts}{$last} .= " " . ltidy($l);
  } else {
    push @{$cur->{stem}}, ltidy($l);
  }
}
$flush->();

sub esc {
  my $s = shift;
  $s =~ s{\\}{\\\\}g;
  $s =~ s{"}{\\"}g;
  $s =~ s{\t}{ }g;
  return $s;
}
sub ltidy {
  my $s = shift;
  return '' unless defined $s;
  $s =~ s/^\s+|\s+$//g;
  $s =~ s/\s{4,}/ \x{2502} /g;
  $s =~ s/[ \t]+/ /g;
  return $s;
}
sub tidy {
  my $s = shift;
  $s =~ s/\s+/ /g;
  $s =~ s/(\x{2502}\s*)+/\x{2502} /g;
  $s =~ s/^\s*\x{2502}\s*|\s*\x{2502}\s*$//g;
  $s =~ s/^\s+|\s+$//g;
  return $s;
}

my @out;
for my $q (@qs) {
  next unless scalar(keys %{$q->{opts}}) == 4;
  # a stem sentence starting with "A ..." gets swallowed as option A; give it back
  if (defined $q->{opts}{A} && $q->{opts}{A} =~ /^(.*\?)\s*(.+)$/) {
    my ($prose, $rest) = ($1, $2);
    $rest =~ s/^A\s+//;
    push @{$q->{stem}}, "A " . $prose;
    $q->{opts}{A} = $rest;
  }
  my $stem = tidy(join(" ", @{$q->{stem}}));
  my $type = $q->{type} || 'mcq';
  my $o = join(",\n      ", map { '"' . $_ . '": "' . esc(tidy($q->{opts}{$_})) . '"' } ('A','B','C','D'));
  push @out, "  {\n    \"n\": $q->{n},\n    \"type\": \"$type\",\n    \"page\": $q->{page},\n    \"stem\": \"" . esc($stem) . "\",\n    \"options\": {\n      $o\n    }\n  }";
}
print "[\n" . join(",\n", @out) . "\n]\n";
