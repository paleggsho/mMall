var http = require('http')
let util = require('util')

http.get("http://m.imooc.com/api/search/searchword", (res) => {
    res.setEncoding('UTF-8')
    let data = ''
    //接受数据的变化
    /*
  * res.on-->data用于监听接口返回数据，
  * 数据不是一次加载出来的，而是多次，
  * 因此需要用一个变量进行累加
  * */
    res.on("data", (chunk) => {
        data += chunk 
    })

    res.on("end", () => {
        let result = JSON.parse(data)
        util.inspect(result)
        console.log("result:" + util.inspect(result))
    })
})