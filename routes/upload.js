var express = require('express')
var router = express.Router()
var upload = require('../utils/upload')

// 抽离响应头的设置 中间件
// const resApplicationJson = (req, res, next) => {
//     res.set('content-type', 'multipart/form-data; charset=utf8')
//     next()
// }
// // 为/position中所有的路由都使用这个中间件
// router.use(resApplicationJson)

router.post('/img', upload.uploadImg.single('image'), (req, res) => {
    let file = req.body.file
    // console.log(req,222)
    if (file === undefined) {
        res.send({
            code: 500,
            msg: '上传失败, 参数缺失'
        })
    } else {
        res.send({
            code: 200,
            data: file,
            msg: 'success'
        })
    }
})

module.exports = router