/* eslint-disable */
const
  express = require('express'),
  { parse } = require('querystring'),
  app = express(),
  log = false

let db

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}
app.use(allowCrossDomain)

app.get('/api/v1/db', (req, res) => {
  console.log(`GET ${req.route.path}`)
  res.header('Content-Type', 'application/json')
    .status(200).send(db)
})

app.post('/api/v1/db', (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        db = parse(body)
        if (log) {
          for (o in db) {
            console.log(JSON.parse(o));
          }
        }
        console.log('db updated')
        res.end();
    });
}
})

app.listen(5000, () => {
  console.log('server running :5000')
})
