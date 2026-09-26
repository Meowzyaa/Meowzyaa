/* ============================================================
   maths.js : turn the plain text the tasks are written in into
   readable maths. Tasks are authored with Unicode (x², log₂, √, π)
   plus three small markups:

     x^{2n+1}           superscript
     a_{n+1}            subscript
     [[1, 2], [3, 4]]   a matrix, one bracket per row

   The app calls chem() for every piece of task text; the name is
   kept from chemprep so the two apps stay easy to compare.
   ============================================================ */

(function (global) {
  'use strict';

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // [[1, 2], [3, 4]] -> an inline grid with bracket sides; runs before the
  // text is escaped so the cells can be formatted on their own
  function matrix(src) {
    var rows = src.slice(1, -1).match(/\[[^\[\]]*\]/g) || [];
    var cells = rows.map(function (r) {
      return r.slice(1, -1).split(',').map(function (c) { return c.trim(); });
    });
    var cols = cells.reduce(function (m, r) { return Math.max(m, r.length); }, 0);
    return '<span class="mx" style="grid-template-columns:repeat(' + cols + ',auto)">' +
      cells.map(function (r) {
        return r.map(function (c) { return '<span>' + inline(escapeHtml(c)) + '</span>'; }).join('');
      }).join('') + '</span>';
  }

  function inline(html) {
    return html
      .replace(/\^\{([^{}]*)\}/g, '<sup>$1</sup>')
      .replace(/_\{([^{}]*)\}/g, '<sub>$1</sub>');
  }

  function chem(text) {
    if (text == null) return '';
    var s = String(text);
    var out = '';
    var re = /\[\[[^\[\]]*\](?:\s*,\s*\[[^\[\]]*\])*\]/g;
    var last = 0, m;
    while ((m = re.exec(s))) {
      out += inline(escapeHtml(s.slice(last, m.index))) + matrix(m[0]);
      last = m.index + m[0].length;
    }
    return out + inline(escapeHtml(s.slice(last)));
  }

  function plain(text) {
    return String(text == null ? '' : text).toLowerCase();
  }

  // chemprep splits chart numbers out of past paper text; tasks here are
  // written by hand, so the text is always prose
  function splitFigureText(text) {
    return { prose: String(text == null ? '' : text), figure: '' };
  }

  global.chem = chem;
  global.chemPlain = plain;
  global.splitFigureText = splitFigureText;
})(window);
