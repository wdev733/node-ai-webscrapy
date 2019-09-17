const getSiteHtml = require('./utils/scraper');

const siteUrl = "https://www.a-1sewerandsepticservice.com";

const request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(async function(document) {

  // Company Logo
  const companyLogo = document("a:nth-child(1) img").attr("src");
  companyInfo.companyLogo = companyLogo;

  // Telephone
  let phoneArr = [];
  document("a[href*='tel:']").each(function() {
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
  let description = [];
  aboutRequest('.entry__content').each(function() {
    console.log(aboutRequest(this).html());
    let title = aboutRequest(this).find('h1, h2, h3, h4, h5').text();
    let content = aboutRequest(this).find('p').text();
    
    description.push({
      'title': title,
      'content': content
    })
  });
  companyInfo.description = description;
  
  // Social
  let twitterAnchor = document("a[href*='twitter.com']").attr("href");
  companyInfo.twitter = twitterAnchor;

  let facebookAnchor = document("a[href*='facebook.com']").attr("href");
  companyInfo.facebookAnchor = facebookAnchor;

  console.log(companyInfo);
});