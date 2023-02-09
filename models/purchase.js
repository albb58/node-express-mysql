/*
 * @FilePath: purchase.js
 * @Author: yu
 * @Date: 2023-02-09 13:49:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-09 18:23:51
 * @Descripttion: 
 */
var mysql = require('../utils/mysql')

const orderLength = new Promise((resolve, reject) => {
    let sqlStr = `select count(1) from order`
    mysql.query(sqlStr, (err, result) => {
        if (err) {
            resolve(false)
        } else {
            resolve(result)
        }
    })
})

const orderList = async (req, res, next) => {
    let page = req.body.page
    let size = req.body.size ? req.body.size : 10
    let count = await orderLength()
    let where = ``
    if (req.body.id) {
        where += ` and id = ${req.body.id}`
    }
    if (req.body.startTime && req.body.endTime) {
        where += ` and createTime between '${req.body.startTime}' and '${req.body.endTime}'`
    }
    let sqlStr = `select * from order where 1 = 1 and status = 2 ${where} limit ${(page - 1) * size}, ${size}`
    mysql.query(sqlStr, (err, result) => {
        if (err) {
            res.send({
                code: 500,
                msg: err.message
            })
        } else {
            res.send({
                code: 200,
                data: {
                    list: result,
                    page: {
                        size,
                        page,
                        count: count[0]['count(1)']
                    }
                }
            })
        }
    })
}

const addOrder = (req, res, next) => {
    let sqlStr = `insert into order set ?`
    mysql.query(sqlStr, req.body, (err, result) => {
        if (err) {
            res.send({
                code: 500,
                msg: err.message
            })
        } else {
            res.send({
                code: 200,
                data: '添加成功',
                msg: 'success'
            })
        }
    })
}

const ordertDetail = (req, res, next) => {
    let sqlStr = `select * from order where id = ${req.query.id}`
    mysql.query(sqlStr, (err, result) => {
        if (err) {
            res.send({
                code: 500,
                msg: err.message
            })
        } else {
            res.send({
                code: 200,
                data: result[0],
                msg: 'success'
            })
        }
    })
}

module.exports = {
    orderList,
    addOrder,
    ordertDetail
}