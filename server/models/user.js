var mongoose = require('mongoose')

//定义一个模型实例
var userSchema = new mongoose.Schema({
    //定义模型的字段
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [
        {
        "productId": String,
        "productName": String,
        "salePrice": Number,
        "productImage": String,
        "checked": String,
        "productNum": Number
    }],
    "addressList": [
        {
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault": Boolean
        }
    ]
})
//通过common规范导出
module.exports = mongoose.model("User", userSchema)