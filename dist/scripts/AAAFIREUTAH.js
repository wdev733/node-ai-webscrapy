'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getSiteHtml = require('../utils/scraper');

var siteUrl = "https://AAAFIREUTAH.COM";

var request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(document) {
    var companyLogo, telephoneAnchor, mailAnchor, twitterAnchor, facebookAnchor, linkedIn;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // Company Logo
            companyLogo = document('a:nth-child(1) img').attr("src");

            companyInfo.companyLogo = companyLogo;

            // Mail and  Telephone
            telephoneAnchor = document("a[href*='tel:']").attr("href");

            companyInfo.phone = telephoneAnchor.replace("tel:", "", telephoneAnchor);

            mailAnchor = document("a[href*='mailto:']").attr("href");

            companyInfo.email = mailAnchor.replace("mailto:", "", mailAnchor);

            // Social
            twitterAnchor = document("a[href*='twitter.com']").attr("href");

            companyInfo.twitter = twitterAnchor;

            facebookAnchor = document("a[href*='facebook.com']").attr("href");

            companyInfo.facebook = facebookAnchor;

            linkedIn = document("a[href*='linkedin.com']").attr("href");

            companyInfo.linkedin = linkedIn;

            // About page?
            console.log(companyInfo);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
//# sourceMappingURL=AAAFIREUTAH.js.map