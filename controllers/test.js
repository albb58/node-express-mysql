/*
 * @FilePath: test.js
 * @Author: yu
 * @Date: 2023-02-01 21:31:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-02 10:06:00
 * @Descripttion: 
 */
var test = require('../models/test')
var _t = (req, res, next)=>{
    res.send({data:test.a})
}
module.exports = _t