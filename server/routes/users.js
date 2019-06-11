var express = require('express');
var router = express.Router();
var User = require('./../models/user')
var md5 = require('./../util/md5')
require('./../util/util')
/* GET users listing. 二级路由*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('test');
});

//登入
router.post('/login', (req, res, next) => {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  //console.log(param)
  User.findOne(param, (err, doc) => {
    if(err){
      res.json({
        status: '1',
        msg: err.message
      })
    }else{
      if(doc){
        /** cookie(name, value,{其他属性})*/
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        //req.session.user = doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
        
      }
      
    }
  })
})

//登出
//凡是服务器发送出去，尽量用post
router.post('/logout', (req, res, next) => {
  //把cookie清空
  res.cookie("userId", "", {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

router.get('/checkLogin', (req, res, next) => {
  //console.log(req.cookies)
  if(req.cookies.userId){
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  }else{
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

//购物车查询
router.get('/CartList', (req, res, next) => {
  var userId = req.cookies.userId
  User.findOne({userId: userId}, (err, doc) => {
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})

//购物车删除
router.post('/cartDele', (req, res, next) => {
  var userId = req.cookies.userId
  var productId = req.body.productId
  User.update({
    userId:userId //查询条件
  }, {
    $pull:{'cartList': { //$pull删除语言
      'productId': productId
      }
    }
  },(err, doc) => {
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})

//购物车数据修改
router.post('/cartEdit', (req, res, next) => {
  var userId = req.cookies.userId
  var productId = req.body.productId
  var productNum = req.body.productNum
  var checked = req.body.checked
  User.update({
    "userId": userId,
    "cartList.productId": productId
  },{
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked
  }, (err, doc) => {
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({
          status: '0',
          msg: '',
          result: 'suc'
        })
      }
    }
  })
})

router.post('/cartEditAll', (req, res, next) => {
  var userId = req.cookies.userId
  var checkAll = req.body.checkAll ? '1' : '0'
  //在fine和findOne两个中间栽了无数次
  User.findOne({userId: userId}, (err, user) => {
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(user.cartList){
        //console.log(user.cartList)
        user.cartList.forEach((item) => {
          item.checked = checkAll
        });
        user.save((err1, doc) => {
          if(err1){
            res.json({
              status: '1',
              msg: err1.message,
              result: ''
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
})

//查询用户地址接口用get
router.get('/address', (req, res, next) => {
  var userId = req.cookies.userId
  User.findOne({userId: userId}, (err, doc) => {
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({
          status: '0',
          msg: '',
          result: doc.addressList
        })
      }
      
    }
  })
})

//设置默认地址
router.post('/setDefault', (req, res, next) => {
  var userId = req.cookies.userId,
      addressId = req.body.addressId
  if(!addressId){
    res.json({
      status: '1003',
      msg: 'addressId is null',
      result: ''
    })
  }else{
    User.findOne({userId: userId}, (err, doc) => {
      if(err){
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }else{
        var addressList = doc.addressList
        addressList.forEach((item) => {
          if(item.addressId == addressId){
            item.isDefault = true
          }else{
            item.isDefault = false
          }
        })
        //保存
        doc.save((err1, doc1) => {
            if(err1){
              res.json({
                status: '1',
                msg: err1.message,
                result: ''
              })
            }else{
              res.json({
                status: '0',
                msg: '',
                result: doc1.addressList
              })
            }
        })
        
      }
    })
  }
})

//地址删除
router.post('/deleAddress', (req, res, next) => {
  var userId = req.cookies.userId
  var addressId = req.body.addressId
  User.update({
    userId: userId
  },{
    $pull: {
      'addressList': {
        'addressId': addressId
      }
    }
  }, (err, doc) => {
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  })
})

//订单支付
router.post('/payMent', (req, res, next) => {
  var userId = req.cookies.userId,
      orderTotal = req.body.orderTotal,
      addressId = req.body.addressId
  User.findOne({userId:userId}, (err, doc) => {
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      var goodList = [],
          address = ''
      //获取当前用户的地址信息
      doc.addressList.forEach((item) => {
        
        if(item.addressId == addressId){
          address = item
        }
      })
      //获取当前用户购物车的购买信息
      doc.cartList.filter((item) => {
        if(item.checked == '1'){
          goodList.push(item)
        }
      })
      //创建订单id，利用随机生成数，创建订单时间，利用util/util.js
      var platform = '622'
      var r1 = Math.floor(Math.random() * 10)
      var r2 = Math.floor(Math.random() * 10)
      var sysDate = new Date().Format('yyyyMMddhhmmss')
      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')

      var orderId = platform + r1 + sysDate + r2

      //订单信息
      var order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodList: goodList,
        orderStatus: '1',
        createDate: createDate
      }
      doc.orderList.push(order)
      //保存
      doc.save((err1, doc1) => {
        if(err1){
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        }else{
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          })
        }
      })
      
    }
  })
})

//根据订单id查询订单信息
router.get('/orderDetail', (req, res, next) => {
  var userId = req.cookies.userId,
      orderId = req.param('orderId')
  User.findOne({userId: userId}, (err, userInfo) => {
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      var orderList = userInfo.orderList
      if(orderList.length > 0){
        var orderTotal = 0
        orderList.forEach((item) => {
          if(item.orderId == orderId){
            orderTotal = item.orderTotal
          }          
        })
        if(orderTotal > 0){
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          })
        }else{
          res.json({
            status: '12002',
            msg: '无此订单',
            result: ''
          })
        }
      }else{
        res.json({
          status: '12001',
          msg: '当前用户未创建订单',
          result: ''
        })
      }

      
    }
  })
})
module.exports = router;
