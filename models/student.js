/*
 * @FilePath: student.js
 * @Author: yu
 * @Date: 2023-02-02 11:06:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-03 15:37:13
 * @Descripttion:
 */
const mysql = require("../utils/mysql");

const findStudent = (req, res, next) => {
  const selsctData = "select * from students";
  // return new Promise((resolved, reject) => {
  //     mysql.query(selsctData, (err, res) => {
  //         if (err) {
  //             resolved(err.message)
  //         }
  //         resolved(res)
  //     })
  // })
  mysql.query(selsctData, (err, _result) => {
    if (err) {
      res.send({
        code: 500,
        data: '',
        msg: err.message
      });
    } else {
        res.send({
          code: 200,
          data: _result,
          msg: 'success'
        });
    }
  });
};

module.exports = {
  findStudent,
};
