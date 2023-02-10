/*
 * @FilePath: admin.js
 * @Author: yu
 * @Date: 2023-02-10 11:23:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-10 14:53:50
 * @Descripttion: 
 */
var express = require('express')
var router = express.Router()
var admin = require('../models/admin')

// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)

router.post('/login', admin.sigin)
router.post('/register', admin.signup)
router.post('/list', admin.list)
// router.post('/exit', admin.exit)
router.post('/update', admin.updateUser)
router.post('/del', admin.delUser)

module.exports = router