/*
 * @FilePath: mysql.js
 * @Author: yu
 * @Date: 2023-02-01 21:47:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-02 16:07:24
 * @Descripttion: 
 */
// 1. 导入 mysql 模块
const mysql = require('mysql')
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: 'localhost', // 数据库的 IP 地址
  user: 'root', // 登录数据库的账号
  password: '123456', // 登录数据库的密码
  database: 'pet', // 指定要操作哪个数据库
})
 
module.exports = db