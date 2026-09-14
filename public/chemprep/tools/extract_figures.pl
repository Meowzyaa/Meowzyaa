use strict; use warnings; use utf8;
use FindBin;
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

# Crops the real figures out of the papers.
#
# pdftotext throws images away, so a question built on a graph or a mechanism
# arrives as prose with a hole in it. But pdftotext -bbox-layout gives the
# coordinates of every line, and a figure is exactly the tall band of a page
# that no prose line occupies. Find that band and hand it to pdftoppm.
#
# Reads tab separated "qid <tab> pdf <tab> page <tab> question number" on stdin
# and writes <outdir>/<qid>.png for every figure it can locate.

my $DPI     = 150;
my $OUT     = shift(@ARGV) or die "usage: extract_figures.pl <outdir> < jobs.tsv\n";
my $POPPLER = $ENV{POPPLER_BIN} || '';
sub tool { my $t = shift; return $POPPLER ? "$POPPLER/$t" : $t; }

my %PAGES;   # pdf => [ page => [ {x0,y0,x1,y1,text}, ... ] ]

sub load_pdf {
  my $pdf = shift;
  return $PAGES{$pdf} if $PAGES{$pdf};
  my $cmd = sprintf('%s -bbox-layout "%s" - 2>/dev/null', tool('pdftotext'), $pdf);
  open(my $h, '-|:encoding(UTF-8)', $cmd) or die "pdftotext: $!";
  my (@pages, $cur, $line);
  while (my $l = <$h>) {
    if ($l =~ /<page\b/)  { push @pages, []; $cur = $pages[-1]; next; }
    if ($l =~ /<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)"/) {
      $line = { x0 => $1, y0 => $2, x1 => $3, y1 => $4, text => '' };
      next;
    }
    if ($l =~ /<word[^>]*>(.*?)<\/word>/ && $line) { $line->{text} .= "$1 "; }
    if ($l =~ m{</line>} && $line) {
      $line->{text} =~ s/&amp;/&/g; $line->{text} =~ s/&apos;/'/g;
      $line->{text} =~ s/&quot;/"/g; $line->{text} =~ s/&lt;/</g; $line->{text} =~ s/&gt;/>/g;
      $line->{text} =~ s/\s+/ /g; $line->{text} =~ s/^\s+|\s+$//g;
      push @$cur, $line if $cur && $line->{text} ne '';
      $line = undef;
    }
  }
  close $h;
  $PAGES{$pdf} = \@pages;
  return \@pages;
}

# a line of ordinary sentence text, as opposed to an axis label or a table cell
sub is_prose {
  my $t = shift;
  my @w = split /\s+/, $t;
  return 0 if @w < 6;
  return 0 if length($t) < 30;
  my $wordy = grep { /^[A-Za-z]{4,}[.,;:?)]?$/ } @w;
  return $wordy >= 3;
}

# Anything that fences the figure off: prose, an answer option, the tick-box
# row or a mark allocation. A figure is what sits in the gap between these,
# so treating options as content is what makes a crop swallow half the page.
sub is_boundary {
  my $t = shift;
  return 1 if is_prose($t);
  # the option letter is typeset in its own column, so it arrives as a line
  # holding nothing but "A"
  return 1 if $t =~ /^[ABCD]$/;
  return 1 if $t =~ /^[ABCD][\s.)]/;                 # an option
  return 1 if $t =~ /^[ABCD](\s+[ABCD]){2,}\s*(\[\d+\])?$/;  # the tick-box row
  return 1 if $t =~ /^\[\d+\]$/;                     # mark allocation
  return 1 if $t =~ /^\d{1,2}\s+\S.{20,}/;           # the next question's stem
  return 1 if $t =~ /Pedagogical Measurements|Nazarbayev Intellectual|AEO NIS|Turn over/i;
  return 1 if $t =~ m{^NIS[/_]G12}i;                 # the running footer
  return 0;
}

# Whether a band holds a figure is decided on the rendered pixels, not on the
# PDF's drawing commands: pdftocairo puts paths in transformed coordinates that
# do not line up with the text boxes, and a figure can be an embedded image
# anyway. Rendering to a 1 bit bitmap and reading it is exact and needs nothing
# beyond poppler.
#
# Returns the fraction of rows carrying any ink. A diagram marks most rows; a
# stray line of text or a page footer marks very few.
sub ink_rows {
  my ($pdf, $page, $x0, $y0, $x1, $y1) = @_;
  my $r = 60;
  my $s = $r / 72;
  my $tmp = "$OUT/.probe";
  my $cmd = sprintf('%s -mono -f %d -l %d -r %d -x %d -y %d -W %d -H %d "%s" "%s" 2>/dev/null',
    tool('pdftoppm'), $page, $page, $r,
    int($x0 * $s), int($y0 * $s), int(($x1 - $x0) * $s), int(($y1 - $y0) * $s), $pdf, $tmp);
  system($cmd);

  my $f;
  for my $suffix ("-$page", sprintf("-%02d", $page), sprintf("-%03d", $page), '') {
    if (-f "$tmp$suffix.pbm") { $f = "$tmp$suffix.pbm"; last; }
  }
  return 0 unless $f;

  open(my $h, '<:raw', $f) or return 0;
  local $/; my $pbm = <$h>; close $h; unlink $f;

  # P4 header: magic, then width and height, skipping comments
  return 0 unless $pbm =~ /^P4\s/;
  my $pos = 2;
  my @dims;
  while (@dims < 2 && $pos < length $pbm) {
    my $ch = substr($pbm, $pos, 1);
    if ($ch eq '#') { $pos++ while substr($pbm, $pos, 1) ne "\n"; next; }
    if ($ch =~ /\s/) { $pos++; next; }
    my ($num) = substr($pbm, $pos) =~ /^(\d+)/;
    return 0 unless defined $num;
    push @dims, $num;
    $pos += length $num;
  }
  $pos++;
  my ($w, $hgt) = @dims;
  return 0 unless $w && $hgt;

  my $stride = int(($w + 7) / 8);
  my ($inked, $rightmost) = (0, 0);
  for my $row (0 .. $hgt - 1) {
    my $chunk = substr($pbm, $pos + $row * $stride, $stride);
    last if length($chunk) < $stride;
    next unless $chunk =~ /[^\x00]/;
    $inked++;
    # how far right the ink reaches separates a drawing from a column of text
    for (my $b = $stride - 1; $b >= 0; $b--) {
      next if substr($chunk, $b, 1) eq "\x00";
      my $col = ($b + 1) * 8;
      $rightmost = $col if $col > $rightmost;
      last;
    }
  }
  return (
    $hgt ? $inked / $hgt : 0,
    $w   ? $rightmost / $w : 0,
  );
}

sub crop {
  my ($pdf, $page, $qnum, $qid) = @_;
  my $pages = load_pdf($pdf);
  my $lines = $pages->[$page - 1] or return "no such page";

  # The examiner column runs down the right margin and must not fence anything.
  # The footer must, or the bottom of every page reads as one big empty gap.
  my @L = grep {
    $_->{y0} > 28 && $_->{y1} < 812
      && !($_->{x0} > 455 && $_->{text} =~ /^(For|Examiner.s|Use)$/i)
  } @$lines;
  @L = sort { $a->{y0} <=> $b->{y0} } @L;
  return "page empty" unless @L;

  # the slice of the page that belongs to this question
  my ($startY, $endY) = (undef, 806);
  for my $l (@L) {
    if (!defined $startY && $l->{text} =~ /^\Q$qnum\E\s+\S/) { $startY = $l->{y0} - 2; next; }
    if (defined $startY) {
      my $nxt = $qnum + 1;
      if ($l->{text} =~ /^\Q$nxt\E\s+\S/ && $l->{y0} > $startY + 20) { $endY = $l->{y0} - 2; last; }
    }
  }
  return "question not found on page" unless defined $startY;

  my @region = grep { $_->{y0} >= $startY && $_->{y0} < $endY } @L;
  return "region empty" unless @region;

  my @fence = grep { is_boundary($_->{text}) } @region;

  # candidate bands are the vertical gaps that no fencing line occupies
  my @bands;
  my $top = $startY;
  for my $p (@fence) {
    push @bands, [$top, $p->{y0}] if $p->{y0} - $top >= 22;
    $top = $p->{y1} if $p->{y1} > $top;
  }
  push @bands, [$top, $endY] if $endY - $top >= 22;
  return "no gap" unless @bands;

  # take the tallest band that actually has artwork in it
  my ($by0, $by1);
  for my $b (sort { ($b->[1] - $b->[0]) <=> ($a->[1] - $a->[0]) } @bands) {
    next if $b->[1] - $b->[0] < 34;
    my ($rows, $reach) = ink_rows($pdf, $page, 40, $b->[0], 470, $b->[1]);
    printf STDERR "    [dbg] %s band %.0f-%.0f rows=%.2f reach=%.2f\n",
      $qid, $b->[0], $b->[1], $rows, $reach if $ENV{FIGDEBUG};
    # a real diagram marks most rows of its band; a single displayed equation
    # or a stray label marks a third of them at best
    next if $rows < 0.45 || $reach < 0.45;
    ($by0, $by1) = @$b;
    last;
  }
  # Some questions draw the options themselves: four structures, four graphs,
  # four mechanisms. Fencing on the option letters shreds those into slivers,
  # so fall back to everything below the stem, option letters included.
  if (!defined $by0) {
    my @prose = grep { is_prose($_->{text}) } @region;
    my $after = @prose ? $prose[-1]{y1} : $startY;

    # the tick-box row is four drawn squares, so it has to be cut off or every
    # option list looks like artwork
    my %rows;
    for my $l (@region) {
      push @{ $rows{ int($l->{y0} / 4) } }, $l if $l->{text} =~ /^[ABCD]$/;
    }
    my $stop = $endY;
    for my $k (sort { $a <=> $b } keys %rows) {
      next if @{ $rows{$k} } < 3;
      my $y = $rows{$k}[0]{y0} - 4;
      $stop = $y if $y > $after && $y < $stop;
    }

    my ($rows, $reach) = $stop - $after >= 60
      ? ink_rows($pdf, $page, 40, $after, 470, $stop) : (0, 0);
    printf STDERR "    [dbg] %s fallback %.0f-%.0f rows=%.2f reach=%.2f\n",
      $qid, $after, $stop, $rows, $reach if $ENV{FIGDEBUG};
    if ($stop - $after >= 60 && $rows >= 0.45 && $reach >= 0.45) {
      ($by0, $by1) = ($after, $stop);
    }
  }
  return "no drawing in any band" unless defined $by0;

  # tighten onto whatever is actually drawn in the band
  my @inside = grep { $_->{y1} > $by0 && $_->{y0} < $by1 } @region;
  my ($x0, $x1) = (60, 520);
  if (@inside) {
    $x0 = $inside[0]{x0}; $x1 = $inside[0]{x1};
    for my $l (@inside) {
      $x0 = $l->{x0} if $l->{x0} < $x0;
      $x1 = $l->{x1} if $l->{x1} > $x1;
    }
    # option letters sit far left, the examiner column far right
    $x0 = 45 if $x0 < 45;
    $x1 = 545 if $x1 > 545;
    $x1 = $x0 + 120 if $x1 - $x0 < 120;
  }

  my $pad = 8;
  $x0 -= $pad; $x1 += $pad; $by0 -= 6; $by1 += 6;
  $x0 = 30 if $x0 < 30;
  $x1 = 566 if $x1 > 566;
  $by0 = 28 if $by0 < 28;
  $by1 = 812 if $by1 > 812;

  my $s = $DPI / 72;
  my ($px, $py) = (int($x0 * $s), int($by0 * $s));
  my ($pw, $ph) = (int(($x1 - $x0) * $s), int(($by1 - $by0) * $s));
  return "degenerate box" if $pw < 60 || $ph < 60;

  my $cmd = sprintf('%s -f %d -l %d -r %d -x %d -y %d -W %d -H %d -png "%s" "%s/%s" 2>/dev/null',
    tool('pdftoppm'), $page, $page, $DPI, $px, $py, $pw, $ph, $pdf, $OUT, $qid);
  system($cmd);

  # pdftoppm appends the page number when the file could span pages
  for my $suffix ("-$page", sprintf("-%02d", $page), sprintf("-%03d", $page), '') {
    my $f = "$OUT/$qid$suffix.png";
    next unless -f $f && -s $f > 700;
    rename($f, "$OUT/$qid.png") unless $suffix eq '';
    return { w => $pw, h => $ph };
  }
  return "pdftoppm produced nothing";
}

mkdir $OUT unless -d $OUT;
my ($ok, $fail) = (0, 0);
my @manifest;
while (my $job = <STDIN>) {
  chomp $job;
  next unless $job =~ /\S/;
  my ($qid, $pdf, $page, $qnum) = split /\t/, $job;
  my $r = crop($pdf, $page, $qnum, $qid);
  if (ref $r) {
    $ok++;
    push @manifest, sprintf('  "%s": {"w":%d,"h":%d}', $qid, $r->{w}, $r->{h});
  } else {
    $fail++;
    printf STDERR "  skip %-14s %s\n", $qid, $r;
  }
}

open(my $m, '>:encoding(UTF-8)', "$OUT/../data/figures.js") or die $!;
print $m "window.CHEMPREP_FIGURES = {\n" . join(",\n", @manifest) . "\n};\n";
close $m;

printf STDERR "figures: %d cropped, %d skipped\n", $ok, $fail;
