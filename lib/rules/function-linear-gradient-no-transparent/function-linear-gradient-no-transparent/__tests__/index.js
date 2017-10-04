"use strict";

const messages = require("..").messages;
const ruleName = require("..").ruleName;
const rules = require("../../../rules");

const rule = rules[ruleName];

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: ".foo { background: linear-gradient(to top, #fff, transparentize(white, 1) )}"
    },
    {
      code: ".foo { background: lInEaR-gRaDiEnT(to top, #fff, transparentize(white, 0) )}"
    },
    {
      code: ".foo { background: LINEAR-GRADIENT(to top, transparentize(black, 0), #000; )}"
    },
    {
      code: ".foo { background: linear-gradient(to bottom, transparentize(black, 1), #000; )}"
    },
    {
      code: ".foo { background: linear-gradient(  to right, #fff, #000; )}"
    },
    {
      code: ".foo { background: linear-gradient(to left  , #fff, #000; )}"
    },
    {
      code: ".foo { background: linear-gradient( to top left, #fff, #000; )}"
    },
    {
      code:
        ".foo { background: linear-gradient(\n\tto left top, \n\t#fff, #000; )}"
    },
    {
      code: ".foo { background: linear-gradient(to bottom right, #fff, #000; )}"
    },
    {
      code: ".foo { background: linear-gradient(to right bottom, #fff, #000; )}"
    },
    {
      code: ".foo { background: linear-gradient(45deg, #fff, #000); }"
    },
    {
      code: ".foo { background: linear-gradient(100grad, #fff, #000); }"
    },
    {
      code: ".foo { background: linear-gradient(0.25turn, #fff, #000); }"
    },
    {
      code: ".foo { background: linear-gradient(1.57rad, #fff, #000); }"
    },
    {
      code: ".foo { background: linear-gradient(#fff, #000); }"
    },
    {
      code: ".foo { background: linear-gradient(black, white); }"
    },
    {
      code:
        ".foo { background: linear-gradient(rgba(255, 255, 255, 0.5) 0%, #000); }"
    },
    {
      code: ".foo { background: -webkit-linear-gradient(top, #fff, #000); }"
    },
    {
      code: ".foo { background: -moz-linear-gradient(top, #fff, #000); }"
    },
    {
      code: ".foo { background: -o-linear-gradient(top, #fff, #000); }"
    },
    {
      code:
        ".foo { background: url(foo.png), -webkit-linear-gradient(bottom, #fff, #000 ); }"
    },
    {
      code:
        ".foo { background: -webkit-linear-gradient(bottom, #fff, #000 ), url(foo.png); }"
    },
    {
      code:
        ".foo { background: url(foo.png), -moz-linear-gradient(bottom, #fff, #000 ); }"
    },
    {
      code:
        ".foo { background: -moz-linear-gradient(bottom, #fff, #000 ), url(foo.png); }"
    },
    {
      code:
        ".foo { background: url(foo.png), -o-linear-gradient(bottom, #fff, #000 ); }"
    },
    {
      code:
        ".foo { background: -o-linear-gradient(bottom, #fff, #000 ), url(foo.png); }"
    },
    {
      code:
        ".foo { background: url(foo.png), -webkit-linear-gradient(bottom, #fff, #000 ), url(bar.png); }"
    },
    {
      code:
        ".foo { background: url(foo.png), -moz-linear-gradient(bottom, #fff, #000 ), url(bar.png); }"
    },
    {
      code:
        ".foo { background: url(foo.png), -o-linear-gradient(bottom, #fff, #000 ), url(bar.png); }"
    }
  ],

  reject: [
    {
      code: ".foo { background: linear-gradient(bottom, #fff, transparent )}",
      message: messages.rejected,
      line: 1,
      column: 36
    },
    {
      code: ".foo { background: lInEaR-gRaDiEnT(bottom, transparent, #000; )}",
      message: messages.rejected,
      line: 1,
      column: 36
    },
    {
      code: ".foo { background: LINEAR-GRADIENT(bottom, #fff, transparent)}",
      message: messages.rejected,
      line: 1,
      column: 36
    },
    {
      code: ".foo { background: linear-gradient(bOtToM,transparent, #000; )}",
      message: messages.rejected,
      line: 1,
      column: 36
    },
    {
      code: ".foo { background: linear-gradient(BOTTOM, transparent , #000; )}",
      message: messages.rejected,
      line: 1,
      column: 36
    },
  ]
});
