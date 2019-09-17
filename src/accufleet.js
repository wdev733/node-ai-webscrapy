const getSiteHtml = require('./utils/scraper');

const siteUrl = "https://accufleet.com";

const request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(async function(document) {

  // Company Logo
  const companyLogo = document('a:nth-child(1) img').attr("src");
  companyInfo.companyLogo = companyLogo;
  
  // Mail and  Telephone
  let telephoneAnchor = document("a[href*='tel:']").attr("href");
  companyInfo.phone = telephoneAnchor.replace("tel:", "", telephoneAnchor);

  let mailAnchor = document("a[href*='mailto:']").attr("href");
  companyInfo.email = mailAnchor.replace("mailto:", "", mailAnchor);

  // Social
  let twitterAnchor = document("a[href*='twitter.com']").attr("href");
  companyInfo.twitter = twitterAnchor;

  let facebookAnchor = document("a[href*='facebook.com']").attr("href");
  companyInfo.facebook = facebookAnchor;

  let linkedIn = document("a[href*='linkedin.com']").attr("href");
  companyInfo.linkedin = linkedIn;

  // About page?
  console.log(companyInfo);
});