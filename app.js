const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3033;

const server = http.createServer((req, res) => {

  const exp = req.url;
 
  switch(exp) {
    case '/':
      fs.readFile(('./index.html'), (err, data) => { err ? res.end() : res.write(data), res.end()});
    case '/favicon.ico':
      fs.readFile(('./favicon.ico'), (err, data) => { err ? res.end() : res.write(data), res.end()});
  }
});

server.listen(PORT);

