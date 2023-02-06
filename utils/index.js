/*
 * @FilePath: index.js
 * @Author: yu
 * @Date: 2023-02-06 09:46:20
 * @LastEditors: 
 * @LastEditTime: 2023-02-06 09:54:01
 * @Descripttion: 
 */
const bcryptjs = require('bcryptjs')

const hash = (text) => {
    // 加密强度
    const saltRounds = 10
    return new Promise((resolve,reject) => {
        bcryptjs.genSalt(saltRounds, (err, salt) => {
            bcryptjs.hash(text, salt, (err, _salt) => {
                resolve(_salt)
            })
        })
    })
}

module.exports = {
    hash
}