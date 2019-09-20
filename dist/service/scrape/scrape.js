'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var scrapeWebsite = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    var result, siteUrl, homeDocument, pageUrl, aboutDocument;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = {
              success: true,
              data: {}
            };
            siteUrl = url;

            if (!siteUrl.toLowerCase().startsWith("https")) {
              siteUrl = 'https://' + siteUrl;
            }

            _context2.next = 5;
            return (0, _fetch2.default)(siteUrl);

          case 5:
            homeDocument = _context2.sent;
            pageUrl = homeDocument(_constants.pattern.description.page).attr('href');

            if (!pageUrl.toLowerCase().startsWith("http") && !pageUrl.toLowerCase().startsWith("https")) {
              pageUrl = siteUrl + pageUrl;
            }
            _context2.next = 10;
            return (0, _fetch2.default)(pageUrl);

          case 10:
            aboutDocument = _context2.sent;
            _context2.next = 13;
            return Object.keys(_constants.pattern).forEach(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
                var page, $, patternArray, i, patternElement, value;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        page = _constants.pattern[key].page;

                        if (page !== 'self') {
                          $ = aboutDocument;
                        } else {
                          $ = homeDocument;
                        }

                        // get pattern list
                        patternArray = _constants.pattern[key].pattern;

                        // for each patterns .....

                        i = 0;

                      case 4:
                        if (!(i < patternArray.length)) {
                          _context.next = 14;
                          break;
                        }

                        patternElement = patternArray[i];
                        value = '';

                        // console.log(patternElement);

                        if (_constants.pattern[key].get === 'one') {
                          // if get data from only first matched element 

                          if (_constants.pattern[key].selector === 'text') {
                            // $(xxx).text()
                            value = $(patternElement).text();
                          }
                          if (_constants.pattern[key].selector === 'attribute') {
                            value = $(patternElement).attr(_constants.pattern[key].target);
                            if (value !== '' && value !== 'undefined') {
                              if (!value.toLowerCase().startsWith("http") && !value.toLowerCase().startsWith("https")) {
                                value = siteUrl + value;
                              }
                            }
                          }
                        } else if (_constants.pattern[key].get === 'many') {
                          (function () {
                            // get all value from elements which are matched by pattern

                            var manyValue = [];
                            $(patternElement).each(function (index, item) {

                              if (_constants.pattern[key].selector === 'text') {
                                if ($(item).text() !== '' && $(item).text() != 'undefined') {
                                  manyValue.push($(item).text());
                                }
                              }

                              if (_constants.pattern[key].selector === 'attribute') {
                                manyValue.push($(item).attr(_constants.pattern[key].target));
                              }
                            });
                            // console.log(manyValue);
                            value = manyValue;
                          })();
                        }

                        if (!(value !== 'undefined' && value !== '')) {
                          _context.next = 11;
                          break;
                        }

                        // if get data ?
                        result.data[key] = value;
                        return _context.abrupt('break', 14);

                      case 11:
                        i++;
                        _context.next = 4;
                        break;

                      case 14:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 13:
            return _context2.abrupt('return', result);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function scrapeWebsite(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = scrapeWebsite;
//# sourceMappingURL=scrape.js.map