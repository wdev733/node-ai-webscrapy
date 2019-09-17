const cheerio = require("cheerio");
const axios = require("axios");

const fetchData = async (siteUrl) => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

const getSiteHtml = async (siteUrl) => {
  return await fetchData(siteUrl);
};

module.exports = getSiteHtml;
