"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var pattern = {
  name: {
    page: 'self',
    pattern: [".site-header .site-title a:nth-child(1)", ".site-title a:nth-child(1)"],
    get: 'one',
    selector: 'text'
  },
  logo: {
    page: 'self',
    pattern: ["a:nth-child(1) img", "#header a:nth-child(1) img", "#header img:nth-child(1)", ".headerTop a:nth-child(1) img"],
    get: 'one',
    selector: 'attribute',
    target: 'src'
  },
  twitter: {
    page: "self",
    pattern: ["a[href*='twitter.com']"],
    get: 'one',
    selector: 'attribute',
    target: 'href'
  },
  facebook: {
    page: "self",
    pattern: ["a[href*='facebook.com']"],
    get: 'one',
    selector: 'attribute',
    target: 'href'
  },
  linkedin: {
    page: "self",
    pattern: ["a[href*='facebook.com']"],
    get: 'one',
    selector: 'attribute',
    target: 'href'
  },
  telephone: {
    page: "self",
    pattern: ["a[href*='tel:']"],
    get: 'many',
    selector: 'attribute',
    target: 'href'
  },
  email: {
    page: "self",
    pattern: ["a[href*='mailto:']"],
    get: 'many',
    selector: 'attribute',
    target: 'href'
  },
  description: {
    page: "a[href*='about']",
    pattern: ["p"],
    get: 'many',
    selector: 'text'
  }
};

exports.default = pattern;
//# sourceMappingURL=pattern.js.map