/* eslint-disable */
const
  express = require('express'),
  { parse } = require('querystring'),
  app = express(),
  log = true

let db2 = {}

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.all('/', (req) => {
  if (log) console.log(req.url)
  next()
})

app.get('/api/v1/db', (req, res) => {
  if (log) {
    console.log('GET')
    console.log(db2[Object.keys(db2)[0]])
  }
  res.header('Content-Type', 'application/json').status(200).send({
    todos: db2[Object.keys(db2)[0]]
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
        if (read) {
          for (let o in read) db2 = JSON.parse(o)
          const newDb = {}
          newDb[db2.stateId] = db2.todos
          db2 = newDb
        }
        if (log) console.log(db2)
        res.end()
    })
}
})

app.listen(5000, () => console.log('server running :5000'))
