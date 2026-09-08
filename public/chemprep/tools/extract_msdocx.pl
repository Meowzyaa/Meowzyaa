use strict; use warnings; use utf8;
use FindBin;
require "$FindBin::Bin/normalise.pl";
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

# Reads word/document.xml unzipped from a .docx mark scheme and groups the
# answer text under the question it belongs to. The .docx schemes keep their
# table order, unlike the PDF ones, so the labels and answers stay aligned.

my $file = $ARGV[0];
open(my $fh, '<:encoding(UTF-8)', $file) or die "$file: $!";
local $/; my $xml = <$fh>; close $fh;

$xml =~ s/(<w:p[ >])/\x{1}$1/g;               # mark paragraph starts, keep the tag
$xml =~ s{<w:tab/>}{ }g;
$xml =~ s/<[^>]+>//g;
$xml = Norm::text($xml);

my @paras;
for my $p (split /\x{1}/, $xml) {
  $p =~ s/&amp;/&/g; $p =~ s/&lt;/</g; $p =~ s/&gt;/>/g; $p =~ s/&quot;/"/g; $p =~ s/&#\d+;//g;
  $p =~ s/\s+/ /g;
  $p =~ s/^\s+|\s+$//g;
  next if $p eq '';
  next if $p =~ /^(Question|Answer|Mark|Additional guidance|PRE-STANDARDISATION|MARK SCHEME|Maximum Mark)/i;
  next if $p =~ /Nazarbayev Intellectual Schools|Pedagogical Measurements|AEO NIS|^CHEMISTRY|^Paper \d/i;
  push @paras, $p;
}

# a label looks like  1(a) (i)   2 (b)(ii)   3c   11(a)
my $LABEL = qr/^(\d{1,2})\s*\(?\s*([a-z])?\s*\)?\s*\(?\s*(i{1,3}v?|iv|vi{0,2})?\s*\)?\s*$/i;

my (@out, $cur);
for my $p (@paras) {
  if ($p =~ $LABEL && defined $1) {
    my ($n, $letter, $roman) = ($1, $2, $3);
    next unless $n >= 1 && $n <= 20;
    # the Mark column is full of bare "1", "2", "3" cells; only a label that
    # carries a part letter is a real question label
    next unless $letter;
    push @out, $cur if $cur && @{$cur->{lines}};
    my $part = $n . ($letter ? "($letter)" : '') . ($roman ? "($roman)" : '');
    $cur = { n => $n, part => $part, lines => [] };
    next;
  }
  push @{$cur->{lines}}, $p if $cur;
}
push @out, $cur if $cur && @{$cur->{lines}};

sub esc { my $s = shift; $s =~ s{\\}{\\\\}g; $s =~ s{"}{\\"}g; $s =~ s/[\r\n\t]/ /g; return $s; }

# group parts under their question number
my %byQ;
for my $e (@out) {
  push @{$byQ{$e->{n}}}, { part => $e->{part}, text => join(' | ', @{$e->{lines}}) };
}

my @j;
for my $n (sort { $a <=> $b } keys %byQ) {
  my $parts = join(",", map {
    '{"part":"' . esc($_->{part}) . '","text":"' . esc($_->{text}) . '"}'
  } @{$byQ{$n}});
  push @j, "  {\"n\":$n,\"parts\":[$parts]}";
}
print "[\n" . join(",\n", @j) . "\n]\n";
printf STDERR "%-46s questions=%d parts=%d\n", ($file =~ m{([^/]+)$})[0],
  scalar(keys %byQ), scalar(@out);
