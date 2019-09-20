import fetchHtml from './fetch';

import { pattern } from '../../constants'

const scrapeWebsite = async (url) => {
  
  var result = {
    success: true,
    data: {

    }
  };

  let siteUrl = url;
  if (!siteUrl.toLowerCase().startsWith("https")) {
    siteUrl = 'https://' + siteUrl;
  }

  const homeDocument = await fetchHtml(siteUrl);

  let pageUrl = homeDocument(pattern.description.page).attr('href');
  if (!pageUrl.toLowerCase().startsWith("http") && !pageUrl.toLowerCase().startsWith("https")) {
    pageUrl = siteUrl + pageUrl;
  }
  const aboutDocument = await fetchHtml(pageUrl);

  await Object.keys(pattern).forEach(async (key) => {
    
    let page = pattern[key].page;
    if (page !== 'self') {
      var $ = aboutDocument;
    } else {
      var $ = homeDocument;
    }

    // get pattern list
    const patternArray = pattern[key].pattern;

    // for each patterns .....
    for (let i = 0; i < patternArray.length; i++) {

      let patternElement = patternArray[i];

      let value = '';

      // console.log(patternElement);

      if (pattern[key].get === 'one') {   // if get data from only first matched element 
        
        if (pattern[key].selector === 'text') {   // $(xxx).text()
          value = $(patternElement).text();
        }
        if (pattern[key].selector === 'attribute') {
          value = $(patternElement).attr(pattern[key].target);
          if (value !== '' && value !== 'undefined') {
            if (!value.toLowerCase().startsWith("http") && !value.toLowerCase().startsWith("https")) {
              value = siteUrl + value;
            }
          }
        }

      } else if (pattern[key].get === 'many') {   // get all value from elements which are matched by pattern
        
        let manyValue = [];
        $(patternElement).each((index, item) => {
          
          if (pattern[key].selector === 'text') {
            if ($(item).text() !== '' && $(item).text() != 'undefined') {
              manyValue.push($(item).text());
            }
          }
          
          if (pattern[key].selector === 'attribute') {
            manyValue.push($(item).attr(pattern[key].target));
          }

        });
        // console.log(manyValue);
        value = manyValue;
      }

      if (value !== 'undefined' && value !== '') {    // if get data ?
        result.data[key] = value;
        break;
      }

    }
  })
  return result;
}

export default scrapeWebsite;