package Norm;
use strict; use warnings; use utf8;

# Shared text repair for pdftotext output.
#
# Two things go wrong in these papers:
#
#  1. Symbol-font glyphs come out as private-use codepoints (U+F0xx = Symbol
#     byte 0xXX), so "+" arrives as U+F02B and the reaction arrow as U+F0E0.
#  2. Cyrillic homoglyphs leak into the English papers, most visibly as the
#     option letters А, В and С.

my %PUA = (
  "\x{F020}" => ' ',        # unmapped glyph, fell back to space
  "\x{F02B}" => '+',
  "\x{F02D}" => '-',
  "\x{F061}" => "\x{03B1}", # alpha
  "\x{F062}" => "\x{03B2}", # beta
  "\x{F070}" => "\x{03C0}", # pi
  "\x{F073}" => "\x{03C3}", # sigma
  "\x{F0B0}" => "\x{00B0}", # degree
  "\x{F0B1}" => "\x{00B1}",
  "\x{F0B7}" => "\x{2022}", # bullet
  "\x{F0AE}" => "\x{2192}", # arrow
  "\x{F0E0}" => "\x{2192}", # arrow
  "\x{F0DE}" => "\x{21D2}",
  "\x{F0FC}" => "\x{2713}", # tick
  "\x{F0D6}" => "\x{221A}",
);

my %HOMO = (
  "\x{0410}"=>'A', "\x{0412}"=>'B', "\x{0421}"=>'C', "\x{0415}"=>'E', "\x{041D}"=>'H',
  "\x{041A}"=>'K', "\x{041C}"=>'M', "\x{041E}"=>'O', "\x{0420}"=>'P', "\x{0422}"=>'T',
  "\x{0425}"=>'X', "\x{0406}"=>'I', "\x{0430}"=>'a', "\x{0435}"=>'e', "\x{043E}"=>'o',
  "\x{0440}"=>'p', "\x{0441}"=>'c', "\x{0445}"=>'x', "\x{0443}"=>'y', "\x{0456}"=>'i',
);

sub text {
  my ($s) = @_;
  return $s unless defined $s;

  # Delta and multiply are reused by the typesetter for other glyphs, so read
  # them from their surroundings before falling back to the usual meaning.
  $s =~ s/(\d)\x{F044}/$1+/g;               # ]2Δ  -> ]2+
  $s =~ s/(\s)\x{F044}(\s)/$1+$2/g;         # A Δ B -> A + B
  $s =~ s/=\s*\x{F044}(\d)/= \x{2212}$1/g;  # = Δ92 -> = -92
  $s =~ s/\x{F044}/\x{0394}/g;              # everything else is a real delta

  $s =~ s/10\x{F0B4}(\d)/10$1/g;            # 10×6 was a superscript marker
  $s =~ s/\x{F0B4}/\x{00D7}/g;

  $s =~ s/([\x{E000}-\x{F8FF}])/exists $PUA{$1} ? $PUA{$1} : ' '/ge;
  $s =~ s/([\x{0400}-\x{04FF}])/exists $HOMO{$1} ? $HOMO{$1} : $1/ge;

  return $s;
}

1;
