const http = require('http')
const { parse } = require('querystring')

function log(msg) {
    console.log((new Date()) + ' -- ' + msg)
}

function collectRequestData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => body += chunk.toString())
        request.on('end', () => callback(parse(body)));
    }
    else {
        callback(null)
    }
}

http.createServer({}, (req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            res.writeHeader(200, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(result))
        })
    } else {
        res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(`
        <!doctype html>
        <html>
        <body>
            <form action="/" method="post">
                <input type="text" name="fname" /><br />
                <input type="number" name="age" /><br />
                <input type="file" name="photo" /><br />
                <button>Save</button>
            </form>
        </body>
        </html>
      `)
    }
}).listen(5000, () => {
    log('http server started')
})
