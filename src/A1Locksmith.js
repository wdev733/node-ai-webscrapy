const getSiteHtml = require('./utils/scraper');

const siteUrl = "https://A1Locksmith.com";

const request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(async function (document) {

  // Company Title
  const companyLogo = document('.site-header .site-title a:nth-child(1)');
  companyInfo.companyName = companyLogo.text();

  // Get AboutUs URL
  let aboutUsAnchor = document("a[href*='about-us']").attr("href");
  if (!aboutUsAnchor.toLowerCase().startsWith("http") && !aboutUsAnchor.toLowerCase().startsWith("https")) {
    aboutUsAnchor = siteUrl + aboutUsAnchor;
  }
  // Send Request to AboutUs URL to Get Company Description
  const aboutRequest = await getSiteHtml(aboutUsAnchor);
  let description = "";
  aboutRequest('.entry-content .inner p').each(function (index, item) {
    description += aboutRequest(item).text() + "\r\n\r\n";
  });
  companyInfo.description = description;

  let telephoneAnchor = aboutRequest("a[href*='tel:']").attr("href");
  companyInfo.phone = telephoneAnchor.replace("tel:", "", telephoneAnchor);

  let mailAnchor = aboutRequest("a[href*='mailto:']").attr("href");
  companyInfo.email = mailAnchor.replace("mailto:", "", mailAnchor);

  console.log(companyInfo);
});