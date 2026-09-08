use strict; use warnings; use utf8;
use FindBin;
require "$FindBin::Bin/normalise.pl";
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

# The OOK booklets are "collection of students' example answers": for each
# question part they print a scanned mark scheme, three real candidate answers
# graded A, C and E, and the examiner's comments on each. The scans are images
# so only the comments survive as text, and those are the useful bit anyway.

my $file = $ARGV[0];
open(my $fh, '<:encoding(UTF-8)', $file) or die "$file: $!";
local $/; my $raw = <$fh>; close $fh;
$raw = Norm::text($raw);

my @lines;
for my $l (split /\n/, $raw) {
  $l =~ s/\r//g;
  $l =~ s/\s+$//;
  next if $l =~ /\.{5,}/;                       # table of contents
  next if $l =~ /^\s*\d{1,3}\s*$/;              # page numbers
  next if $l =~ /Pedagogical Measurements|AEO NIS|Nazarbayev/i;
  next if $l =~ /^\s*$/;
  push @lines, $l;
}

my (@out, $q, $part, $grade, $collect, @buf);

sub flush {
  if ($q && $collect && @buf) {
    my $t = join(' ', @buf);
    $t =~ s/\s+/ /g;
    # the caption for the next sample runs on after the comment
    $t =~ s/\s*Example candidate response.{0,20}$//i;
    $t =~ s/^\s+|\s+$//g;
    push @out, { n => $q, part => $part, grade => ($grade || ''), text => $t }
      if length($t) > 25;
  }
  @buf = ();
  $collect = 0;
}

for my $l (@lines) {
  if ($l =~ /^\s*QUESTIONS?\s*(\d{1,2})\s*(.*)$/i) {
    flush();
    $q = $1;
    $part = $2;
    $part =~ s/\s+/ /g;
    $part =~ s/^\s+|\s+$//g;
    $grade = undef;
    next;
  }
  # the booklets switch between "A", 'A' and «A» partway through
  if ($l =~ /GRADED\s*\W{0,2}\s*([A-E])\b/i) { flush(); $grade = uc($1); next; }
  # 2024 and 2025 dropped the graded labels and just print three examiner
  # comments per part, in descending order of quality
  if ($l =~ /EXAMINER.S\s+COMMENTS?/i) { flush(); $collect = 1; next; }
  if ($l =~ /^\s*MARK\s+SCHEME\s*$/i
      || $l =~ /SAMPLE OF CANDIDATE/i
      || $l =~ /^\s*Question\s+Answer\b/i) { flush(); next; }
  push @buf, $l if $collect;
}
flush();

sub esc { my $s = shift; $s =~ s{\\}{\\\\}g; $s =~ s{"}{\\"}g; $s =~ s/[\r\n\t]/ /g; return $s; }

my %byQ;
push @{$byQ{$_->{n}}}, $_ for @out;

my @j;
for my $n (sort { $a <=> $b } keys %byQ) {
  my $notes = join(",", map {
    '{"part":"' . esc($_->{part}) . '","grade":"' . $_->{grade} . '","text":"' . esc($_->{text}) . '"}'
  } @{$byQ{$n}});
  push @j, "  {\"n\":$n,\"notes\":[$notes]}";
}
print "[\n" . join(",\n", @j) . "\n]\n";
printf STDERR "%-46s questions=%d comments=%d\n", ($file =~ m{([^/]+)$})[0],
  scalar(keys %byQ), scalar(@out);
