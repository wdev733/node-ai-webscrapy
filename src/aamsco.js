const getSiteHtml = require('./utils/scraper');

const siteUrl = "https://aamsco.net";

const request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(async function(document) {

  const name = document('.site-title a:nth-child(1)').text(); 
  companyInfo.name = name
  
  // Social
  let twitterAnchor = document("a[href*='twitter.com']").attr("href");
  companyInfo.twitter = twitterAnchor;

  let facebookAnchor = document("a[href*='facebook.com']").attr("href");
  companyInfo.facebook = facebookAnchor;

  let linkedIn = document("a[href*='linkedin.com']").attr("href");
  companyInfo.linkedin = linkedIn;

  // Telephone
  let phoneArr = [];
  document("a[href*='tel:']").each(function () {
    let phoneNumber = document(this).text().toLowerCase();
    phoneNumber = phoneNumber.replace("tel:", "", phoneNumber);
    phoneNumber = phoneNumber.replace(" ", "", phoneNumber);
    phoneNumber = phoneNumber.replace("call", "", phoneNumber);
    phoneArr.push(phoneNumber);
  });
  companyInfo.phone = phoneArr;
  
  // Get AboutUs URL
  let aboutUsAnchor = document("a[href*='about-us']").attr("href");
  if (!aboutUsAnchor.toLowerCase().startsWith("http") && !aboutUsAnchor.toLowerCase().startsWith("https")) {
    aboutUsAnchor = siteUrl + aboutUsAnchor;
  }
  // Send Request to AboutUs URL to Get Company Description
  const aboutRequest = await getSiteHtml(aboutUsAnchor);
  const description = aboutRequest('.entry-content').text();
  companyInfo.description = description;
  
  console.log(companyInfo);
});