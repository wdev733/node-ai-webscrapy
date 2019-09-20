"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getSiteHtml = require('../utils/scraper');

var siteUrl = "https://absoluteaviation.com";

var request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(document) {
    var companyLogo, phoneArr, aboutUsAnchor, aboutRequest, description, twitterAnchor, facebookAnchor;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // Company Logo
            companyLogo = document("a:nth-child(1) img").attr("src");

            companyInfo.companyLogo = companyLogo;

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
            _context.next = 9;
            return getSiteHtml(aboutUsAnchor);

          case 9:
            aboutRequest = _context.sent;
            description = [];

            aboutRequest('.entry__content').each(function () {
              console.log(aboutRequest(this).html());
              var title = aboutRequest(this).find('h1, h2, h3, h4, h5').text();
              var content = aboutRequest(this).find('p').text();

              description.push({
                'title': title,
                'content': content
              });
            });
            companyInfo.description = description;

            // Social
            twitterAnchor = document("a[href*='twitter.com']").attr("href");

            companyInfo.twitter = twitterAnchor;

            facebookAnchor = document("a[href*='facebook.com']").attr("href");

            companyInfo.facebookAnchor = facebookAnchor;

            console.log(companyInfo);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
//# sourceMappingURL=absoluteaviation.js.map