/*
 * @FilePath: app.js
 * @Author: yu
 * @Date: 2023-02-01 21:26:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-07 17:27:37
 * @Descripttion: 
 */
var express = require('express');
var path = require('path');
var session = require('express-session');

// 路由接口
var indexRoute = require('./routes/index')
var test = require('./routes/test')
var student = require('./routes/student')
var admin = require('./routes/admin')
var upload = require('./routes/upload')
var goods = require('./routes/goods')

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

// 接口
app.use('/', indexRoute)
app.use('/test', test)
app.use('/api/student', student)
app.use('/api/admin', admin)
app.use('/api/upload', upload)
app.use('/api/goods', goods)

module.exports = app