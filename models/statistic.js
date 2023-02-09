const mysql = require('mysql')

const profitData = (req, res, next) => {
    let sqlStr = `select * from order where status = 1 and createTime between '${req.body.startTime}' and '${req.body.endTime}'`
    let _result = {}
    mysql.query(sqlStr, (err, result) => {
        if (err) { 
            res.send({
                code: 500,
                msg: err.message
            })
        } else {
            result.forEach(item => {
                if (item.classiyf == 1) {
                    _result.pet += item.pay
                } else {
                    _result.petSup += item.pay
                }
            })
            res.send({
                code: 200,
                data: {
                    count: _result
                },
                msg: 'success'
            })
        }
    })
}

const expendData = (req, res, nex) => {

    let sqlStr = `select * from order where status = 2 and createTime between '${req.body.startTime}' and '${req.body.endTime}'`
    let _result = {}
    mysql.query(sqlStr, (err, result) => {
        if (err) { 
            res.send({
                code: 500,
                msg: err.message
            })
        } else {
            result.forEach(item => {
                if (item.classiyf == 1) {
                    _result.pet += item.pay
                } else {
                    _result.petSup += item.pay
                }
            })
            res.send({
                code: 200,
                data: {
                    count: _result
                },
                msg: 'success'
            })
        }
    })
}

module.exports = {
    profitData
}