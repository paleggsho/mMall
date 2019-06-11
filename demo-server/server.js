let user = require('./User')


let http = require('http')
let url = require('url')
//let util = require('util')
let fs = require('fs')

let server = http.createServer((req, res) => {
    // res.statusCode = 200
    
    // res.setHeader('Content-Type', 'text/plain; charset = UTF-8')
    var pathName = url.parse(req.url).pathname
    fs.readFile(pathName.substring(1), (err, data) => {
        if(err){
            res.writeHead(404, {
                'Content-Type': 'text/html'
            })
        }else{
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data.toString())
        }
        res.end()
    })
    
    
})

server.listen(3000, '127.0.0.1', () => {
    console.log("running....")
})