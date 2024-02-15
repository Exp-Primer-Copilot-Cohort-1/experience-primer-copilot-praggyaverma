// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments.js');
var querystring = require('querystring');

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  if (pathname == '/') {
    pathname = 'index.html';
  }
  if (pathname == '/comment') {
    var data = '';
    req.on('data', function (chunk) {
      data += chunk;
    });
    req.on('end', function () {
      data = querystring.parse(data);
      comments.push(data);
      res.end(JSON.stringify(comments));
    });
  } else {
    fs.readFile(path.join(__dirname, pathname), function (err, file) {
      if (err) {
        res.writeHead(404);
        res.end('找不到相关文件');
      } else {
        res.end(file);
      }
    });
  }
}).listen(3000);
console.log('Server running at http://localhost:3000/');