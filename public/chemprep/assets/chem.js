/* ============================================================
   chem.js : turn flattened past paper text back into readable
   chemistry. pdftotext drops every sub/superscript, so H2SO4
   arrives as plain "H2SO4" and mol dm-3 as "mol dm-3".
   ============================================================ */

(function (global) {
  'use strict';

  var ELEMENTS = new Set(('H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni ' +
    'Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Hf Ta W ' +
    'Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th U').split(' '));

  // words that look like formulas but are not
  var NOT_FORMULA = new Set(['NMR', 'DNPH', 'IUPAC', 'DNA', 'RNA', 'PVC', 'IR', 'UV', 'HIV', 'SI']);

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // does this token read as a chemical formula?
  function isFormula(tok) {
    var core = tok.replace(/^[("'\[]+|[)"'\].,;:?!]+$/g, '');
    if (core.length < 2 || core.length > 34) return false;
    if (NOT_FORMULA.has(core)) return false;
    if (!/[0-9]/.test(core) && !/[+−–-]$/.test(core)) return false;
    // allow a stoichiometric coefficient: 3H2(g), 2NH3(g)
    if (!/^\d{0,3}[A-Z]/.test(core)) return false;
    if (/[a-z]{4,}/.test(core)) return false;          // ordinary words
    if (!/^[A-Za-z0-9()\[\]+−–·.=≡-]+$/.test(core)) return false;

    // at least one real element symbol has to appear
    var syms = core.match(/[A-Z][a-z]?/g) || [];
    var hits = 0;
    for (var i = 0; i < syms.length; i++) {
      if (ELEMENTS.has(syms[i])) hits++;
      else if (!/^[A-Z]$/.test(syms[i])) return false; // Xy that is not an element
    }
    return hits > 0;
  }

  // H2SO4 -> H<sub>2</sub>SO<sub>4</sub>, Mg2+ -> Mg<sup>2+</sup>
  function markupFormula(tok) {
    var lead = (tok.match(/^[("'\[]+/) || [''])[0];
    var tail = (tok.match(/[)"'\].,;:?!]+$/) || [''])[0];
    var core = tok.slice(lead.length, tok.length - tail.length);

    // an unbalanced ")" belongs to the sentence, not the formula
    if (tail.indexOf(')') > -1) {
      var opens = (core.match(/\(/g) || []).length;
      var closes = (core.match(/\)/g) || []).length;
      if (closes >= opens) { /* keep as is */ } else { core += ')'; tail = tail.replace(')', ''); }
    }

    var out = '';
    var i = 0;
    while (i < core.length) {
      var ch = core[i];

      // trailing charge: 2+, 3-, +, -
      var charge = core.slice(i).match(/^(\d*)([+−–-])(?=$|[,;)\]\s])/);
      if (charge && (charge[1] || i === core.length - 1 || /[a-zA-Z)\]]/.test(core[i - 1] || ''))) {
        out += '<sup>' + charge[1] + (charge[2] === '-' ? '−' : charge[2]) + '</sup>';
        i += charge[0].length;
        continue;
      }

      if (/\d/.test(ch)) {
        var run = core.slice(i).match(/^\d+/)[0];
        var prev = core[i - 1] || '';
        // digits after an element, a bracket or another subscript are subscripts
        if (/[A-Za-z)\]]/.test(prev)) out += '<sub>' + run + '</sub>';
        else out += run;
        i += run.length;
        continue;
      }

      out += escapeHtml(ch);
      i++;
    }
    return escapeHtml(lead) + out + escapeHtml(tail);
  }

  var SUPER = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵',
                '6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻' };

  function supDigits(str) {
    return str.split('').map(function (c) { return SUPER[c] || c; }).join('');
  }

  /**
   * Format a run of past paper text as HTML.
   */
  function chem(text) {
    if (text == null) return '';
    var s = String(text);

    var parts = s.split(/(\s+)/);
    var out = parts.map(function (tok) {
      if (/^\s+$/.test(tok)) return tok;
      if (isFormula(tok)) return markupFormula(tok);
      return escapeHtml(tok);
    }).join('');

    // units: mol dm-3, kJ mol-1, cm3, dm3
    out = out.replace(/\b(mol|dm|cm|m|kJ|J|K|s|g|Pa)\s?([-−–]\d)(?!\w)/g, function (m, unit, exp) {
      return unit + supDigits(exp.replace(/[−–]/, '-'));
    });
    out = out.replace(/\b(dm|cm|m)3\b/g, function (m, unit) { return unit + '³'; });
    out = out.replace(/\b(dm|cm|m)2\b/g, function (m, unit) { return unit + '²'; });
    out = out.replace(/\bmol2 dm-6\b/g, 'mol² dm⁻⁶');

    // electron configuration: 1s2 2p6 3d10
    out = out.replace(/\b(\d[spdf])(\d{1,2})\b/g, '$1<sup>$2</sup>');

    // scientific notation, written as 1.5 × 105 or typed as 1.5 x 10-5
    out = out.replace(/(\d)\s*[x×]\s*10\s*([-−–]?\d{1,2})(?![\d.])/g, function (m, d, exp) {
      return d + ' × 10<sup>' + exp.replace(/[-–]/, '−') + '</sup>';
    });

    // degrees and standard-state symbols the extractor flattened
    out = out.replace(/\bH(θ|Ү|ү|ѳ)\b/g, 'H<sup>⊖</sup>');
    out = out.replace(/│/g, '<span class="muted">|</span>');

    return out;
  }

  /* ----------------------------------------------------------
     Axis labels, spectrum scales and table cells all flatten into
     the sentence stream: "70 | 600K 700K 60 | 800K 50 | 5 10 15 20
     25 30 35 40 equilibrium 40 | pressure / MPa". Split that off so
     the question prose reads as prose.
     ---------------------------------------------------------- */

  function isNumeric(tok) {
    if (/^[\d.,]+$/.test(tok)) return true;                    // 70, 0.15, 1,000
    if (/^\d+[A-Za-z%°⁻¹²³/]{1,4}$/.test(tok)) return true;    // 600K, 40%, 30°
    if (/^[-−–]?\d+(\.\d+)?$/.test(tok)) return true;          // -20
    return false;
  }
  function isNeutral(tok) {
    return /^[│|/,;:.\-−–+×]$/.test(tok) || tok.length <= 2;
  }
  // a token that clearly belongs to a sentence, never to an axis
  function isSentenceWord(tok) {
    return /^[A-Za-z][a-z']{3,}[.,?;:]?$/.test(tok) && !/^(the|and|of|for|per)$/i.test(tok);
  }

  function splitFigureText(text) {
    var s = String(text == null ? '' : text);
    var toks = s.split(/\s+/).filter(Boolean);
    if (toks.length < 12) return { prose: s, figure: '' };

    var num = toks.map(isNumeric);
    var dense = toks.map(function (t, i) {
      var lo = Math.max(0, i - 4), hi = Math.min(toks.length - 1, i + 4), c = 0;
      for (var j = lo; j <= hi; j++) if (num[j]) c++;
      return c >= 4;
    });

    // grow each dense core outwards over numbers, separators and stray labels,
    // but never over ordinary sentence words
    var keep = dense.slice();
    for (var i = 0; i < toks.length; i++) {
      if (!dense[i]) continue;
      for (var d = -1; d <= 1; d += 2) {
        var j = i + d;
        while (j >= 0 && j < toks.length && !keep[j] &&
               (num[j] || isNeutral(toks[j]) || !isSentenceWord(toks[j]))) {
          keep[j] = true;
          j += d;
        }
      }
    }

    // "600K" passes isFormula because K is potassium; a real formula carries
    // two element symbols, a bracket or a charge
    function isRealFormula(tok) {
      if (!isFormula(tok)) return false;
      if (/[()\[\]]/.test(tok)) return true;
      var syms = tok.match(/[A-Z][a-z]?/g) || [];
      return syms.length >= 2;
    }

    var prose = [], figure = [], run = [], runNums = 0;
    function flushRun() {
      // numbered statements made of formulas look dense but are the question
      // itself, so a run holding a real formula always stays in the prose
      var hasFormula = run.some(isRealFormula);
      if (run.length >= 6 && runNums >= 5 && !hasFormula) {
        // don't swallow the article or the capitalised word that opens the
        // next sentence
        while (run.length && /^(A|An|The)$/.test(run[0])) prose.push(run.shift());
        var tail = [];
        while (run.length && /^(?:[A-Z][a-z]+|A)$/.test(run[run.length - 1])) tail.unshift(run.pop());
        figure.push(run.join(' '));
        Array.prototype.push.apply(prose, tail);
      } else {
        Array.prototype.push.apply(prose, run);
      }
      run = []; runNums = 0;
    }
    for (var k = 0; k < toks.length; k++) {
      if (keep[k]) { run.push(toks[k]); if (num[k]) runNums++; }
      else { flushRun(); prose.push(toks[k]); }
    }
    flushRun();

    // axis titles are always "quantity / unit" and land between a full stop and
    // the next sentence, so they can be lifted out on that shape alone
    var text = prose.join(' ');
    var axis = /([.?])\s+((?:[a-z][a-z ]{0,26}\/\s*[A-Za-z%°]{1,4}\s*\d*\s*){1,3})(?=[A-Z][a-z])/g;
    text = text.replace(axis, function (m, stop, frag) {
      figure.push(frag.trim());
      return stop + ' ';
    });

    return {
      prose: text.replace(/\s+([.,?;:])/g, '$1').replace(/\s{2,}/g, ' ').trim(),
      figure: figure.join('   ').trim()
    };
  }

  /** Plain-text version, for search indexing. */
  function plain(text) {
    return String(text == null ? '' : text).toLowerCase();
  }

  global.chem = chem;
  global.chemPlain = plain;
  global.splitFigureText = splitFigureText;
})(window);
