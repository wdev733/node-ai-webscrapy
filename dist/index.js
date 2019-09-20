'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

//middleware
//parse application/json
app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

// Base URL test endpoint to see if API is running
app.get('/', function (req, res) {
  res.json({ message: 'Scrapy!!!' });
});

app.server.listen(_config2.default.port);
console.log('Started on port ' + app.server.address().port);

module.exports = {
  app: app
};
//# sourceMappingURL=index.js.map