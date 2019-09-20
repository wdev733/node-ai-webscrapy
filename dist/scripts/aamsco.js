'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getSiteHtml = require('../utils/scraper');

var siteUrl = "https://aamsco.net";

var request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(document) {
    var name, twitterAnchor, facebookAnchor, linkedIn, phoneArr, aboutUsAnchor, aboutRequest, description;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = document('.site-title a:nth-child(1)').text();

            companyInfo.name = name;

            // Social
            twitterAnchor = document("a[href*='twitter.com']").attr("href");

            companyInfo.twitter = twitterAnchor;

            facebookAnchor = document("a[href*='facebook.com']").attr("href");

            companyInfo.facebook = facebookAnchor;

            linkedIn = document("a[href*='linkedin.com']").attr("href");

            companyInfo.linkedin = linkedIn;

            // Telephone
            phoneArr = [];

            document("a[href*='tel:']").each(function () {
              var phoneNumber = document(this).text().toLowerCase();
              phoneNumber = phoneNumber.replace("tel:", "", phoneNumber);
              phoneNumber = phoneNumber.replace(" ", "", phoneNumber);
              phoneNumber = phoneNumber.replace("call", "", phoneNumber);
              phoneArr.push(phoneNumber);
            });
            companyInfo.phone = phoneArr;

            // Get AboutUs URL
            aboutUsAnchor = document("a[href*='about-us']").attr("href");

            if (!aboutUsAnchor.toLowerCase().startsWith("http") && !aboutUsAnchor.toLowerCase().startsWith("https")) {
              aboutUsAnchor = siteUrl + aboutUsAnchor;
            }
            // Send Request to AboutUs URL to Get Company Description
            _context.next = 15;
            return getSiteHtml(aboutUsAnchor);

          case 15:
            aboutRequest = _context.sent;
            description = aboutRequest('.entry-content').text();

            companyInfo.description = description;

            console.log(companyInfo);

          case 19:
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
//# sourceMappingURL=aamsco.js.map