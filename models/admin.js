/*
 * @FilePath: admin.js
 * @Author: yu
 * @Date: 2023-02-02 14:06:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-10 14:55:59
 * @Descripttion:
 */
const mysql = require("../utils/mysql")
const { hash } = require("../utils")
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')

// 添加账号
const signup = async (req, res, next) => {
    let jodge_name = await judgeUsername(req.body.username)
    let _password = await hash(req.body.password)
    if (jodge_name.length > 0) {
        res.send({
            code: 400,
            data: "",
            msg: "账号已存在，请重新注册",
        })
    } else {
        const registerStr = `insert into user set ?`
        mysql.query(registerStr, {
            username: req.body.username,
            password: _password,
            sex: req.body.sex
        },(err, _result) => {
            if (err) {
                res.send({
                    code: 500,
                    data: "",
                    msg: err.message,
                })
            } else {
                res.send({
                    code: 200,
                    data: "注册成功",
                    msg: "success",
                })
            }
        })
    }
}

/**
 * @description: 用户登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
const sigin = async (req, res, next) => {
    let jodge_name = await judgeUsername(req.body.username)
    if (jodge_name.length > 0) {
        let _data = bcryptjs.compareSync(req.body.password, jodge_name[0].password)
        if (_data) {
            res.send({
                code: 200,
                data: {
                    username: jodge_name[0].username,
                    token: jwt.sign({username: jodge_name[0].username}, 'pet')
                },
                msg: "登录成功",
            })
        } else {
            res.send({
                code: 203,
                data: "",
                msg: "密码错误",
            })
        }
    } else {
        res.send({
            code: 202,
            data: "",
            msg: "用户不存在",
        })
    }
}

// 判断用户名是否已存在
const judgeUsername = (username) => {
    const selectUsername = `select * from user where username = '${username}'`
    return new Promise((resolved, reject) => {
        mysql.query(selectUsername, (err, result) => {
            if (err) {
                resolved(false)
            } else {
                resolved(result)
            }
        })
    })
}
/**
 * @description: 更新用户
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
const updateUser = (req, res, next) => {
    // const selectUpdate = `select * from user where id = ${req.body.id}`
    const selectUpdate = `update user set ? where id = ?`
    mysql.query(selectUpdate, [{...req.body}, req.body.id], (err, result) => {
        if (err) {
            res.send( {
                code: 500,
                data: null,
                msg: err.message,
            })
        } else {
            res.send( {
                code: 200,
                data: '更新成功',
                msg: "success",
            })
        }
    })
}

const delUser = (req, res, next) => {
    const delStr = `delete from user where id = ${req.query.id}`
    mysql.query(delStr, (err, result) => {
        if (err) {
            res.send( {
                code: 500,
                data: null,
                msg: err.message,
            })
        } else {
            res.send( {
                code: 200,
                data: '删除成功',
                msg: "success",
            })
        }
    })
}

// 退出登录
// const exit = async (req, res) => {
//     res.send({ code: 200, data: "退出成功", msg: "success" })
// }

const list = (req, res, next) => {
    let where = ``
    if (req.body.username) {
        where = ` and username like '%${req.body.username}%'`
    }
    if (req.body.sex) {
        where = ` and sex = '${req.body.sex}'`
    }
    let sqlStr = `select username,id,sex from user where 1=1 ${where}`
    mysql.query(sqlStr, (err, result) => {
        if (err) {
            res.send({
                code: 500,
                msg: err.message
            })
        } else {
            res.send({
                code: 200,
                data: result,
                msg: 'success'
            })
        }
    })
}

module.exports = {
    signup,
    sigin,
    // exit,
    list,
    delUser,
    updateUser
}
