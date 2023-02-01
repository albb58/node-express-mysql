/*
 * @FilePath: test.js
 * @Author: yu
 * @Date: 2023-02-01 21:31:08
 * @LastEditors: 
 * @LastEditTime: 2023-02-01 21:46:47
 * @Descripttion: 
 */
var test = require('../models/test')
var test = (req, res, next)=>{
    res.render('test',{data:test})
}
module.exports = test