/* eslint-disable */
const
  express = require('express'),
  { parse } = require('querystring'),
  //bodyParser = require('body-parser'),
  //cors = require('cors'),
  app = express(),
  fs = require('fs'),
  util = require('util')

let db;

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(cors({
//   'allowedHeaders': ['Content-Type'],
//   'origin': '*',
//   'preflightContinue': true
// }))

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

app.get('/api/v1/db', (req, res) => {
  console.log(`GET ${req.route.path}`);
  res.status(200).send(JSON.stringify(db))
})

function collectRequestData(request, callback) {
  if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
      let body = '';
      request.on('data', chunk => {
          body += chunk.toString();
      });
      request.on('end', () => {
          callback(parse(body));
      });
  }
  else {
      callback(null);
  }
}

app.post('/api/v1/db', (req, res) => {

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        db = parse(body)
        // console.log(db)
        res.end();
    });
}
})

app.listen(5000, () => {
  console.log('server running :5000')
})
