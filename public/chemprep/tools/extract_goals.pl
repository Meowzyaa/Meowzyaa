use strict; use warnings; use utf8;
use FindBin;
require "$FindBin::Bin/normalise.pl";
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

# The yearly course calendars are two-column tables: lesson topics on the left,
# learning objectives on the right. pdftotext -layout keeps the columns, so an
# objective is its code line plus every following line that starts in the same
# column and does not open a new code.

my $file = $ARGV[0];
open(my $fh, '<:encoding(UTF-8)', $file) or die "$file: $!";
local $/; my $raw = <$fh>; close $fh;
$raw = Norm::text($raw);

my $CODE = qr/\b(1[12]\.\d+\.\d+\.\d+)\b/;

my (@objs, $cur, $col);
for my $line (split /\n/, $raw) {
  $line =~ s/\r//g;
  next if $line =~ /^\s*$/;
  next if $line =~ /Topic of the Lesson|Learning Objectives|Yearly course calendar/i;

  if ($line =~ /$CODE/) {
    my $at = $-[1];
    my $rest = substr($line, $at);
    $rest =~ s/^$CODE\s*//;
    push @objs, $cur if $cur;
    $cur = { code => $1, at => $at, lines => [$rest] };
    $col = $at;
    next;
  }

  next unless $cur;
  # a continuation sits in the right column, at or near the code's indent
  next if length($line) <= $col;
  my $tail = substr($line, $col);
  $tail =~ s/^\s+|\s+$//g;
  next if $tail eq '';
  # a new left-column lesson title bleeding across means the objective ended
  last if 0;
  push @{$cur->{lines}}, $tail if length($tail) > 2;
}
push @objs, $cur if $cur;

# the same code appears in several week rows; keep the longest rendering
my %best;
for my $o (@objs) {
  my $t = join(' ', @{$o->{lines}});
  $t =~ s/\s+/ /g;
  $t =~ s/^[\s\-\x{2022}]+|\s+$//g;
  $t =~ s/\s*\|\s*/ /g;
  next if length($t) < 8;
  $best{$o->{code}} = $t if !exists $best{$o->{code}} || length($t) > length($best{$o->{code}});
}

sub esc { my $s = shift; $s =~ s{\\}{\\\\}g; $s =~ s{"}{\\"}g; $s =~ s/[\r\n\t]/ /g; return $s; }

sub sortkey {
  my @p = split /\./, shift;
  return sprintf("%02d%02d%02d%03d", @p);
}

my @j;
for my $c (sort { sortkey($a) cmp sortkey($b) } keys %best) {
  my $t = $best{$c};
  $t = substr($t, 0, 320);
  push @j, sprintf('  {"code":"%s","text":"%s"}', $c, esc($t));
}
print "[\n" . join(",\n", @j) . "\n]\n";
printf STDERR "%-24s objectives=%d\n", ($file =~ m{([^/]+)$})[0], scalar(keys %best);
