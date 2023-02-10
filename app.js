/*
 * @FilePath: app.js
 * @Author: yu
 * @Date: 2023-02-01 21:26:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-10 14:38:33
 * @Descripttion: 
 */
var express = require('express');
var path = require('path');
var session = require('express-session');
var jwt = require('jsonwebtoken')

// 路由接口
var indexRoute = require('./routes/index')
var test = require('./routes/test')
var student = require('./routes/student')
var admin = require('./routes/admin')
var upload = require('./routes/upload')
var goods = require('./routes/goods')
var order = require('./routes/order')
var purchase = require('./routes/purchase')
var statistic = require('./routes/statistic')

var app = express()
// express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: false, secure: false, maxAge: 1000 * 60 * 5 }
}))

//测试
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'static')))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
  /*让options请求快速返回*/ else next()
})

//  拦截 /api 下的所有请求 验证 token
app.use('/api', (req, res, next) => {
  // 判断是否是 注册接口 或 登陆接口 如果是 直接放行
  if (req.url == '/admin/login') {
    next()
    return
  }
  // 接收客户端传递过来的 token
  const token = String(req.headers.authorization)
  // 根据 客户端传递过来的 token 进行 解密，解密成功返回一个对象，解密失败直接返回 null
  // 第一个参数是 token 第二个是 私钥 自己定义 
  const username = jwt.decode(token, 'pet')
  // 判断是否传递 token 和 判断 token 是否 正确
  if (token == 'undefined' || username == null) {
    res.send({
      code: 400,
      data: null,
      msg: '无效token，请重新登录',
    })
    return
  }
  // token 正确 放行
  next()
})
// 接口
app.use('/', indexRoute)
app.use('/test', test)
app.use('/api/student', student)
app.use('/api/admin', admin)
app.use('/api/upload', upload)
app.use('/api/goods', goods)
app.use('/api/order', order)
app.use('/api/purchase', purchase)
app.use('/api/statistic', statistic)


module.exports = app