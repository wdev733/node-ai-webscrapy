const getSiteHtml = require('../utils/scraper');

const siteUrl = "https://4starelectronics.com";

const request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(async function(document) {

  // Company Logo
  const companyLogo = document('#header img:nth-child(1)').attr("src");
  companyInfo.companyLogo = companyLogo;

  // Get AboutUs URL
  let aboutUsAnchor = document("a[href*='about_us']").attr("href");
  if (!aboutUsAnchor.toLowerCase().startsWith("http") && !aboutUsAnchor.toLowerCase().startsWith("https")) {
    aboutUsAnchor = siteUrl + aboutUsAnchor;
  }
  
  // Get ContactUs URL
  let contactUSAnchor = document("a[href*='contact_us']").attr("href");
  if (!contactUSAnchor.toLowerCase().startsWith("http") && !contactUSAnchor.toLowerCase().startsWith("https")) {
    contactUSAnchor = siteUrl + contactUSAnchor;
  }
  
  // Send Request to AboutUs URL to Get Company Description
  const aboutRequest = await getSiteHtml(aboutUsAnchor);
  let description = "";
  aboutRequest('#page-container > div:nth-child(1) > div:nth-child(1) > p').each(function(index, item) {
    description += aboutRequest(item).text() + "\r\n\n";
  });
  companyInfo.description = description;

  // Company Name, Leadership team names, images, bios
  // Company address /location, LinkedIn/ Twitter/ Facebook, PhoneNumber & Email
  // Todo Codes....

  console.log(companyInfo);
});