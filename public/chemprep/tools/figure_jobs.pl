use strict; use warnings; use utf8;
binmode(STDOUT, ':utf8');

# Emits the crop jobs for extract_figures.pl: every question flagged as needing
# a figure, as "qid <tab> source pdf <tab> page <tab> question number".
# Pass a paper number to limit to one paper.

my $only = shift(@ARGV);
open(my $h, '<:encoding(UTF-8)', 'data/questions.js') or die $!;
local $/; my $c = <$h>; close $h;

while ($c =~ /\{"id":"([^"]+)","year":(\d+),"paper":(\d+),"n":(\d+),"kind":"(\w+)","marks":(\d+),"topic":"([^"]+)","figure":(true|false),(.*?)\}(?=,\n\{"id"|\n\])/gs) {
  my ($id, $paper, $n, $fig, $tail) = ($1, $3, $4, $8, $9);
  next unless $fig eq 'true';
  next if defined $only && $paper != $only;
  my ($src)  = $tail =~ /"src":"((?:[^"\\]|\\.)*)"/;
  my ($page) = $tail =~ /"page":(\d+)/;
  next unless $src && $page;
  $src =~ s/\\(.)/$1/g;
  print join("\t", $id, $src, $page, $n), "\n";
}
