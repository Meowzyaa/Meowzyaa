use strict; use warnings; use utf8;
use FindBin;
require "$FindBin::Bin/normalise.pl";
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

my $file = $ARGV[0];
open(my $fh, '<:encoding(UTF-8)', $file) or die "$file: $!";
local $/; my $raw = <$fh>; close $fh;

$raw = Norm::text($raw);

my @pages = split /\f/, $raw;
my @rec;
for my $p (0 .. $#pages) {
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
    push @rec, [$p + 1, $l];
  }
}

sub ltidy {
  my $s = shift; return '' unless defined $s;
  $s =~ s/^\s+|\s+$//g;
  $s =~ s/\s{4,}/ \x{2502} /g;
  $s =~ s/[ \t]+/ /g;
  return $s;
}

my (@qs, $cur);
my $expect = 1;
my $started = 0;

for my $r (@rec) {
  my ($pg, $l) = @$r;
  next unless $started || $l =~ /^\s*1\s+\S/;
  if ($l =~ /^\s*(\d{1,2})\s+(\S.*)$/ && $1 == $expect && length(ltidy($2)) >= 12) {
    push @qs, $cur if $cur;
    $cur = { n => $1, page => $pg, lines => [ltidy($2)], total => 0, parts => [] };
    $expect++; $started = 1;
    next;
  }
  next unless $cur;
  my $t = ltidy($l);
  if ($t =~ /\[Total:\s*(\d+)\]/) { $cur->{total} = $1; }
  push @{$cur->{parts}}, $1 while $t =~ /(\([a-z]\)(?:\s*\((?:i|ii|iii|iv|v|vi)\))?)/g;
  push @{$cur->{lines}}, $t;
}
push @qs, $cur if $cur;

sub esc { my $s = shift; $s =~ s{\\}{\\\\}g; $s =~ s{"}{\\"}g; $s =~ s/[\r\n\t]/ /g; return $s; }

my @out;
for my $q (@qs) {
  my $body = join(' ', @{$q->{lines}});
  $body =~ s/\s{2,}/ /g;
  # intro = the setup before the first lettered part
  my $intro = $body;
  $intro =~ s/\s*\(a\).*$//s;
  $intro = $body if length($intro) < 20;
  $intro = substr($intro, 0, 400);
  my $marks = $q->{total};
  if (!$marks) { $marks += $1 while $body =~ /\[(\d+)\]/g; }
  my %seen; my @parts = grep { !$seen{$_}++ } @{$q->{parts}};
  next if $marks < 3;
  push @out, sprintf('  {"n":%d,"page":%d,"marks":%d,"parts":%d,"intro":"%s","body":"%s"}',
    $q->{n}, $q->{page}, $marks, scalar(@parts), esc($intro), esc(substr($body, 0, 3000)));
}
print "[\n" . join(",\n", @out) . "\n]\n";
printf STDERR "%-46s questions=%d\n", ($file =~ m{([^/]+)$})[0], scalar(@out);
