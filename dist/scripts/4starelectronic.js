'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getSiteHtml = require('../utils/scraper');

var siteUrl = "https://4starelectronics.com";

var request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(document) {
    var companyLogo, aboutUsAnchor, contactUSAnchor, aboutRequest, description;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // Company Logo
            companyLogo = document('#header img:nth-child(1)').attr("src");

            companyInfo.companyLogo = companyLogo;

            // Get AboutUs URL
            aboutUsAnchor = document("a[href*='about_us']").attr("href");

            if (!aboutUsAnchor.toLowerCase().startsWith("http") && !aboutUsAnchor.toLowerCase().startsWith("https")) {
              aboutUsAnchor = siteUrl + aboutUsAnchor;
            }

            // Get ContactUs URL
            contactUSAnchor = document("a[href*='contact_us']").attr("href");

            if (!contactUSAnchor.toLowerCase().startsWith("http") && !contactUSAnchor.toLowerCase().startsWith("https")) {
              contactUSAnchor = siteUrl + contactUSAnchor;
            }

            // Send Request to AboutUs URL to Get Company Description
            _context.next = 8;
            return getSiteHtml(aboutUsAnchor);

          case 8:
            aboutRequest = _context.sent;
            description = "";

            aboutRequest('#page-container > div:nth-child(1) > div:nth-child(1) > p').each(function (index, item) {
              description += aboutRequest(item).text() + "\r\n\n";
            });
            companyInfo.description = description;

            // Company Name, Leadership team names, images, bios
            // Company address /location, LinkedIn/ Twitter/ Facebook, PhoneNumber & Email
            // Todo Codes....

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
//# sourceMappingURL=4starelectronic.js.map