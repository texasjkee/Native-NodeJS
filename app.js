const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3033;

const server = http.createServer((req, res) => {
  console.log(req.method, req.url)
 
  if(req.url = '/') {
    fs.readFile('./index.html', (err, data) => {
      if(err) {
        console.log(err);
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    })
  }
  
  if(req.url = '/favicon.ico') {
    fs.readFile('./favicon.ico', (err, data) => {
      if(err) {
        console.log(err);
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    })
  }
});

server.listen(PORT);

