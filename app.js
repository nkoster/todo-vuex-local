/* eslint-disable */
const
  express = require('express'),
  { parse } = require('querystring'),
  app = express(),
  log = true

let db = {
  stateId: 0,
  todos: []
}

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/api/v1/db', (_, res) => {
  if (log) {
    console.log('GET')
    if (log) {
      for (let o in db) {
        try {
          console.log(JSON.parse(o))
          db = JSON.parse(o)
        }
        catch(err) {
          console.log(err)
        }
      }
    }
  }
  if (db.todos) res.header('Content-Type', 'application/json').status(200).send({
    todos: db.todos
  })
})

app.post('/api/v1/db', (req, res) => {
  if (log) console.log('POST')
  if (req.method === 'POST') {
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const read = parse(body)
        if (read) db = read
        if (log) {
          for (let o in db) {
            console.log(JSON.parse(o))
            console.log('db updated')
          }
        }
        res.end()
    })
}
})

app.listen(5000, () => console.log('server running :5000'))
