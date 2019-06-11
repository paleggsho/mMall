var mongoose = require('mongoose')//require默认优先在node_modules里面查找
var Schema = mongoose.Schema

//定义一个模型实例
//这里的坑，啊啊啊啊product的实例要和user里面product同步啊！！！
var productSchema = new Schema({
    "productId": {type: String},//两种方式
    "productName": String,
    "salePrice": Number,
    "productImage": String,
    "checked": String,
    "productNumber": Number,
    "checked": String
})
//默认的输出
module.exports = mongoose.model('Good', productSchema) //把前面定义的good模型输出
