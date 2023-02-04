/*
 * @FilePath: student.js
 * @Author: yu
 * @Date: 2023-02-02 11:12:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-02 13:57:56
 * @Descripttion: 
 */
var student = require('../models/student')

var _s = async (req, res, next) => {
    let _result = await student.findStudent()
    console.log(_result)
    res.send({
        code: 200,
        data: _result
    })
}

module.exports = {
    _s
}