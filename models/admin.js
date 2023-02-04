/*
 * @FilePath: admin.js
 * @Author: yu
 * @Date: 2023-02-02 14:06:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-03 18:08:42
 * @Descripttion:
 */
const mysql = require("../utils/mysql");
const bcryptjs = require('bcryptjs')

// 注册账号
const signup = async (req, res, next) => {
  let jodge_name = await judgeUsername(req.body.username);
  if (jodge_name.length > 0) {
    res.send({
      code: 400,
      data: "",
      msg: "账号已存在，请重新注册",
    });
  } else {
    const registerStr = `insert into user(username, password) values('${req.body.username}','${req.body.password}')`;
    mysql.query(registerStr, (err, _result) => {
      if (err) {
        res.send({
          code: 500,
          data: "",
          msg: err.message,
        });
      } else {
        res.send({
          code: 200,
          data: '注册成功',
          msg: "success",
        });
      }
    });
  }
};

/**
 * @description: 用户登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
const sigin = async (req, res, next) => {
  let jodge_name = await judgeUsername(req.body.username);
  if (jodge_name.length > 0) {
    let _data = jodge_name[0].password === req.body.password;
    if (_data) {
      res.send({
        code: 200,
        data: "",
        msg: "登录成功",
      });
    } else {
      res.send({
        code: 203,
        data: "",
        msg: "密码错误",
      });
    }
  } else {
    res.send({
      code: 202,
      data: "",
      msg: "用户不存在",
    });
  }
};

// 判断用户名是否已存在
const judgeUsername = (username) => {
  const selectUsername = `select * from user where username = '${username}'`;
  return new Promise((resolved, reject) => {
    mysql.query(selectUsername, (err, result) => {
      if (err) {
        resolved(false);
      } else {
        resolved(result);
      }
    });
  });
};
/**
 * @description: 更新用户
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
const updateUser = (req,res,next) => {
    // const selectUpdate = `select * from user where id = ${req.body.id}`
    const selectUpdate = `undate user set password='${req.body.password}' where id = ${req.body.id}`
    mysql.query(selectUpdate, (err, result) => {
        if (err) {
            res.send('admin', {
                code: 500,
                data: null,
                msg: err.message
            })
        } else {
            res.send('admin', {
                code: 200,
                data: null,
                msg: 'success'
            })
        }
    })
}

const delUser = (req,res,next) => {
    const delStr = `delete from user where id = ${req.query.id}`
    mysql.query(delStr, (err, result) => {
        if (err) {
            res.send('admin', {
                code: 500,
                data: null,
                msg: err.message
            })
        } else {
            res.send('admin', {
                code: 200,
                data: null,
                msg: 'success'
            })
        }
    })
}

// 退出登录
const exit = async (req, res) => {
    
    req.session.userinfo = null

    res.send('admin', { code: 200, data: '删除成功', msg: 'success' })

}
module.exports = {
  signup,
  sigin,
  exit
};
