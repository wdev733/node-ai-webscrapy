import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';
import path from 'path';

import config from './config';

import { scrapeWebsite } from './service/scrape';

let app = express();
app.server = http.createServer(app);

//middleware
//parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Base URL test endpoint to see if API is running
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Web Scraper'
  });
});

app.post('/', async (req, res) => {
  let url = req.body.url;

  const result = await scrapeWebsite(url);
  
  console.log(result.data.logo);
  res.render('scraping_result', {
    title: 'Web Scraper',
    data: result
  });
});


app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

module.exports = {
  app
}


