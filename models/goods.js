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

// module.exports = {
//     upload
// }
