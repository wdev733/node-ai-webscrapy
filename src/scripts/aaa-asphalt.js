const getSiteHtml = require('../utils/scraper');

const siteUrl = "https://aaa-asphalt.com";

const request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(async function (document) {

  // Company Title
  const companyLogo = document('#header a:nth-child(1) img').attr("src");
  companyInfo.companyLogo = companyLogo;

  // Get AboutUs URL
  let aboutUsAnchor = document("a[href*='about-us']").attr("href");
  if (!aboutUsAnchor.toLowerCase().startsWith("http") && !aboutUsAnchor.toLowerCase().startsWith("https")) {
    aboutUsAnchor = siteUrl + aboutUsAnchor;
  }
  // Send Request to AboutUs URL to Get Company Description
  const aboutRequest = await getSiteHtml(aboutUsAnchor);
  let description = [];
  aboutRequest('#content div').each(function (index, item) {
    description.push(aboutRequest(item).text());
  });
  companyInfo.description = description;
  
  console.log(companyInfo);
});