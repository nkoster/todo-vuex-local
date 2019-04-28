/* eslint-disable */

const http = require('http')
const { parse } = require('querystring')
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000,
    'Content-Type': 'application/json; charset=utf-8'
}

function collectRequestData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => body += chunk.toString())
        request.on('end', () => callback(parse(body)))
        console.log(body)
    }
    else {
        callback(null)
    }
}

http.createServer({}, (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers)
        res.end()
        return
    }    
    if (req.method === 'POST') {
        console.log(req)
        collectRequestData(req, result => {
            res.writeHead(200, headers)
            res.end(JSON.stringify(result))
        })
    }
    //  else {
    //     res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
    //     res.end(`
    //     <!doctype html>
    //     <html>
    //     <body>
    //         <form action="/" method="post">
    //             <input type="text" name="fname" /><br />
    //             <input type="number" name="age" /><br />
    //             <input type="file" name="photo" /><br />
    //             <button>Save</button>
    //         </form>
    //     </body>
    //     </html>
    //   `)
    // }
}).listen(5000, () => {
    console.log('http server started')
})
