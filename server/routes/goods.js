var express = require('express') //加载express
var router = express.Router() //路由是通过express框架扩展出来的
var mongoose = require('mongoose')
var Goods = require('../models/goods') //加载模型表

//连接mongodb数据库
mongoose.connect('mongodb://localhost:27017/dumall')//若有账户和密码//root:pwd@localhost:27017/db

//监听数据是否连接成功
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected sucess")
})
mongoose.connection.on("error", () => {
    console.log("MongoDB connected fail")
})
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected")
})
//定义二级路由
//查询商品列表
router.get('/list', (req, res, next) => {
    //res.send('hello, goods list')
    //获取前端传入的请求数值
    let sort = req.param('sort')//获取请求的排序值
    let page = parseInt(req.param('page'))
    let pageSize = parseInt(req.param('pageSize'))
    let priceLevel = req.param("priceLevel")
    var priceGt = '', priceLte = ''
    //定义分页page=2，跳过8条，第二页从第9条开始显示
    let skip = (page - 1) * pageSize
    let params = {}
    if(priceLevel != 'all'){
        switch(priceLevel){
            case '0': priceGt = 0; priceLte = 100; break
            case '1': priceGt = 100; priceLte = 500; break
            case '2': priceGt = 500; priceLte = 1000; break
            case '3': priceGt = 1000; priceLte = 5000; break
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
    goodsModel.sort({"salePrice": sort})//在数据层面实现了排序
    //mongo里raw是document
    goodsModel.exec((err, doc) => {
        if(err){
            res.json({
                status: '1',
                msg: err.message
            })
        }else{
            //后端数据返回成功，前端进行渲染
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})
//加入购物车
//一般post都是向服务器提交数据
router.post("/addCart", (req, res, netx) => {
    let userId = '100000077'
    let productId = req.body.productId
    let User = require('../models/user')

    //findOne第一个用户
    User.findOne({userId: userId}, (err, userDoc) => {
        /**
         * 第一步拿到用户信息
         * 判断是否存在
         * 若存在，得到其商品数据
         * 若已存在商品数据，用户信息直接保存
         * 若不存在，取得该商品的新的商品数据，并插入到用户信息中*/
        if(err){
            res.json({
                status: '1',
                msg: err.message
            })
        }else{
            //console.log(`userDoc: ${userDoc}`)
            if(userDoc){
                /*这里遇到的坑，最开始使用find，返回所有数据的数组，无法插入数据库中
                这里应该使用findOne，返回单条数据（一个对象）*/
                let goodsItem = ''
                userDoc.cartList.forEach((item) => {
                    if(item.productId == productId){
                        goodsItem = item
                        item.productNum　++
                        //console.log(item.productNumber)
                    }
                });
                if (goodsItem) {
                    userDoc.save((err2,doc2) => {
                                    
                        if(err2){
                            res.json({
                                status: '1',
                                msg: err2.message
                            })
                        }else{
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'suc'
                            })
                        }
                    })
                }else{
                    Goods.findOne({productId:productId}, (err1, doc) => {
                        if(err1){
                            res.json({
                                status: '1',
                                msg: err1.message
                            })
                        }else{
                            if(doc){
                                doc.productNum = 1;
                                doc.checked = 1;
                                //console.log(`good:${doc}`)
                                userDoc.cartList.push(doc)
                                //console.log(`userDoc:${userDoc}`)
                                userDoc.save((err2,doc2) => {
                                    
                                    if(err2){
                                        res.json({
                                            status: '1',
                                            msg: err2.message
                                        })
                                    }else{
                                        res.json({
                                            status: '0',
                                            msg: '',
                                            result: 'suc'
                                        })
                                    }
                                })
                            }                        
                        }
                    })
                }
                
            }
        }
    })
})

module.exports = router