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

app.all('/*', (req, res, next) => {
  if (log) console.log(req.url)
  if (req.url === '/') app.use(express.static('dist'))
  next()
})

app.get('/id/:stateId', (req, res) => {
  if (log) {
    console.log('GET')
    console.log(req.params)
    console.log(db2[Object.keys(db2)[0]])
  }
  if (db2[Object.keys(db2)[0]]) {
    res.header('Content-Type', 'application/json').status(200).send({
      todos: db2[Object.keys(db2)[0]]
    })
  } else {
    res.header('Content-Type', 'application/json').status(200).send({
      todos: []
    })
  }
})

app.post('/id/:stateId', (req, res) => {
  if (log) {
    console.log('POST')
    console.log(req.params)
  }
  if (req.method === 'POST') {
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const read = parse(body)
        if (read) {
          let newObject = {}
          for (let o in read) newObject = JSON.parse(o)
          db2[newObject.stateId] = newObject.todos
        }
        if (log) console.log(db2)
        res.end()
    })
}
})

app.listen(5000, () => console.log('server running :5000'))
