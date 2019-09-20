'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getSiteHtml = require('../utils/scraper');

var siteUrl = "https://A1Locksmith.com";

var request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(document) {
    var companyLogo, aboutUsAnchor, aboutRequest, description, telephoneAnchor, mailAnchor;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // Company Title
            companyLogo = document('.site-header .site-title a:nth-child(1)');

            companyInfo.companyName = companyLogo.text();

            // Get AboutUs URL
            aboutUsAnchor = document("a[href*='about-us']").attr("href");

            if (!aboutUsAnchor.toLowerCase().startsWith("http") && !aboutUsAnchor.toLowerCase().startsWith("https")) {
              aboutUsAnchor = siteUrl + aboutUsAnchor;
            }
            // Send Request to AboutUs URL to Get Company Description
            _context.next = 6;
            return getSiteHtml(aboutUsAnchor);

          case 6:
            aboutRequest = _context.sent;
            description = "";

            aboutRequest('.entry-content .inner p').each(function (index, item) {
              description += aboutRequest(item).text() + "\r\n\r\n";
            });
            companyInfo.description = description;

            telephoneAnchor = aboutRequest("a[href*='tel:']").attr("href");

            companyInfo.phone = telephoneAnchor.replace("tel:", "", telephoneAnchor);

            mailAnchor = aboutRequest("a[href*='mailto:']").attr("href");

            companyInfo.email = mailAnchor.replace("mailto:", "", mailAnchor);

            console.log(companyInfo);

          case 15:
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
//# sourceMappingURL=A1Locksmith.js.map