const getSiteHtml = require('../utils/scraper');

const siteUrl = "https://abalmh.theonlinecatalog.com/";

const request = getSiteHtml(siteUrl);

var companyInfo = {};

request.then(async function (document) {
  
  // Company logo
  const companyLogo = document('.headerTop a:nth-child(1) img').attr("src");
  companyInfo.companyLogo = companyLogo;

  console.log(companyInfo);
});