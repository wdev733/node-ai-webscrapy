import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import config from './config';

let app = express();
app.server = http.createServer(app);

//middleware
//parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

// Base URL test endpoint to see if API is running
app.get('/', (req, res) => {
  res.json({ message: 'Scrapy!!!' })
});

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

module.exports = {
  app
}


