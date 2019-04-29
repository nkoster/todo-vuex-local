/* eslint-disable */
const
  express = require('express'),
  { parse } = require('querystring'),
  app = express(),
  log = true

let db

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/api/v1/db', (_, res) => {
  if (log) console.log('GET')
  res.header('Content-Type', 'application/json').status(200).send(db)
})

app.post('/api/v1/db', (req, res) => {
  if (log) console.log('POST')
  if (req.method === 'POST') {
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        db = parse(body)
        if (log) {
          for (o in db) {
            console.log(JSON.parse(o))
            console.log('db updated')
          }
        }
        res.end()
    })
}
})

app.listen(5000, () => console.log('server running :5000'))
