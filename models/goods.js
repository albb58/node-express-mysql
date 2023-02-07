const mysql = require('../utils/mysql')


const savegoods = (req,res,next) => {
    const create_goods_str = `INSERT INTO goods VALUES (null, ${req.body.title}, ${req.body.price}, ${req.body.cost}, ${req.body.goods_img}, ${req.body.classify}, ${req.body.title}, ${req.body.title},)`

    mysql.query(create_goods_str, (err, result) => {
        if (err) {
            res.send({
                code: 500,
                msg: err.message
            })
        } else {
            res.send({
                
            })
        }
    })
}

const dataCount = () => {
    return new Promise((reslove, reject) => {
        mysql.query('select FOUND_ROWS() from goods', (err, result) => {
            if (err) {
                reslove(false)
            } else {
                reslove(result.length)
            }
        })
    })
}

const goodsList = async (req, res, next) => {
    let count = await dataCount()
    let size = req.body.size ? req.body.size : null
    let page = req.body.page
    let findStr = `select * from goods where title='${req.body.title ? req.body.title : null}' or classify='${req.body.classify ? req.body.classify : null}' limit ${(page - 1) * size}, ${size}`
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
                        count
                    }
                },
                msg: 'success'
            })
        }
    })
}

module.exports = {
    goodsList
}
