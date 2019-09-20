import cheerio from 'cheerio';
import axios from 'axios';

const sendHttpRequest = async (siteUrl) => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

const fetchHtml = async (siteUrl) => {
  return await sendHttpRequest(siteUrl);
};

export default fetchHtml;
