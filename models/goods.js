const mysql = require('../utils/mysql')


const saveGoods = (req,res,next) => {
    // const create_goods_str = `INSERT INTO goods VALUES (null, ${req.body.title}, ${req.body.price}, ${req.body.cost}, ${req.body.goods_img}, ${req.body.classify}, ${req.body.title}, ${req.body.title},)`
    const sqlStr = `insert into goods set ?`
    mysql.query(sqlStr, {
        ...req.body,
        createTime: Date.now(),
        updateTime: Date.now()
    }, (err, result) => {
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

const dataCount = () => {
    return new Promise((reslove, reject) => {
        mysql.query('select count(1) from goods', (err, result) => {
            if (err) {
                reslove(false)
            } else {
                reslove(result)
            }
        })
    })
}

const goodsList = async (req, res, next) => {
    let count = await dataCount()
    let size = req.body.size ? req.body.size : 10
    let page = req.body.page
    let where = ``
    if (req.body.title) {
        where += ` and title like '%${req.body.title}%'`
    }
    if (req.body.classify) {
        where += ` and classify = '${req.body.classify}'`
    }
    let findStr = `select * from goods where 1 = 1 ${where} limit ${(page - 1) * size}, ${size}`
    mysql.query(findStr, (err, result) => {
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
                },
                msg: 'success'
            })
        }
    })
}

const updateGoods = (req,res,next) => {
    let sqlStr = `update goods set ? where id = ?`
    mysql.query(sqlStr, [{...req.body, updateTime: Date.now()}, req.body.id],(err, result) => {
        if (err) {
            res.send({
                code: 500,
                msg: err.message
            })
        } else {
            res.send({
                code: 200,
                data: '更新成功',
                msg: 'success'
            })
        }
    })
}

const delGoods = (req,res,next) => {
    let sqlStr = `delete from goods where id = ${req.query.id}`
    mysql.query(sqlStr,(err, result) => {
        if (err) {
            res.send({
                code: 500,
                msg: err.message
            })
        } else {
            res.send({
                code: 200,
                data: '删除成功',
                msg: 'success'
            })
        }
    })
}
const goodsDetail = (req, res, next) => {
    let sqlStr = `select * from goods where id = ${req.query.id}`
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
    goodsList,
    saveGoods,
    delGoods,
    updateGoods,
    goodsDetail
}
