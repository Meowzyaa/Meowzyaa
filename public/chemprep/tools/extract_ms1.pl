use strict; use warnings; use utf8;
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

my $file = $ARGV[0];
open(my $fh, '<:encoding(UTF-8)', $file) or die "$file: $!";
local $/; my $raw = <$fh>; close $fh;

my %H = ("\x{0410}"=>'A', "\x{0412}"=>'B', "\x{0421}"=>'C', "\x{0415}"=>'E');
$raw =~ s/([\x{0410}\x{0412}\x{0421}\x{0415}])/$H{$1}/g;

my (%direct, @lets);
for my $l (split /\n/, $raw) {
  $l =~ s/\r//g;
  next if $l =~ /Pedagogical|AEO|BLANK|Turn over|MARK SCHEME|Maximum Mark|consists of|PRE-STANDARD/;
  my $c = $l;
  $c =~ s/\[\d+\]//g;
  $c =~ s/\bMark\b|\bAnswer\b|\bQuestion\b|\bGuidance\b|\bAdditional\b//g;
  if ($c =~ /^\s*(\d{1,2})\s{2,}([ABCD])(?:\s|$)/) {
    my ($n, $a) = ($1, $2);
    $direct{$n} = $a if $n >= 1 && $n <= 40 && !exists $direct{$n};
  }
  for my $t ($c =~ /(?:^|\s)([ABCD])(?=\s|$)/g) { push @lets, $t; }
}

my %key;
my $mode;
my $fullDirect = 1;
for my $n (1 .. 40) { $fullDirect = 0 unless exists $direct{$n}; }
if ($fullDirect) {
  %key = %direct;
  $mode = 'direct';
} elsif (scalar(@lets) >= 40) {
  # letters appear in document order, one per question
  my @L = @lets;
  @L = @L[0 .. 39] if scalar(@L) > 40;
  for my $i (0 .. 39) { $key{$i + 1} = $L[$i]; }
  $mode = 'positional';
} else {
  $mode = 'failed';
}

print "{\n";
print join(",\n", map { "  \"$_\": \"$key{$_}\"" } sort { $a <=> $b } keys %key);
print "\n}\n";
printf STDERR "%-52s mode=%-10s direct=%-3d letters=%-3d resolved=%d\n",
  ($file =~ m{([^/]+)$})[0], $mode, scalar(keys %direct), scalar(@lets), scalar(keys %key);
