let user = require('./User')

console.log(`userName: ${user.userName}`)

console.log(`I'm ${user.userName}, I say ${user.sayHello()}`)

let http = require('http')
let url = require('url')
let util = require('util')

let server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset = UTF-8')
    console.log("url:" + req.url)//demo.html
    console.log("parse:" + url.parse(req.url))//[object]
    res.end(util.inspect(url.parse(req.url)))//把url对象解析为字符串输出
})

server.listen(3000, '127.0.0.1', () => {
    console.log("running....")
})