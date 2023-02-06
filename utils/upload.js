/*
 * @FilePath: upload.js
 * @Author: yu
 * @Date: 2023-02-06 11:03:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-06 18:27:07
 * @Descripttion: 
 */
var path = require('path')


// 上传图片必备中间件和文件夹
var multer = require('multer')
// var uploadImg = multer({'dest':path.resolve(__dirname,'../uploads/images')})

var storageImg = multer.diskStorage({
    // 文件保存路径
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../static/image'))
    },
    // 保存在destination中的文件名
    filename: function (req, file, cb) {
        console.log(file, 111)
        let _originalName = file.originalname  // 原文件名
        let _extName = path.extname(_originalName) // 后缀名
        let _baseName = path.basename(_originalName, _extName) // 文件名
        let _fileName = _baseName + '_' + Date.now() + _extName // 最终的名字,盖上时间戳,防止覆盖

        // 将图片路径放入req.body中,下一个中间件就可以取用了
        req.body.file = 'images/' + _fileName
        cb(null, _fileName)
    }
})

var uploadImg = multer({storage: storageImg}).single('image')

module.exports = {
    uploadImg
}
