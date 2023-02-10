/*
 * @FilePath: goods.js
 * @Author: yu
 * @Date: 2023-02-10 11:23:59
 * @LastEditors: 
 * @LastEditTime: 2023-02-10 15:35:23
 * @Descripttion: 
 */
var express = require('express')
var router = express.Router()
var goods = require('../models/goods')

router.post('/findlist', goods.goodsList)
router.post('/create', goods.saveGoods)
router.delete('/delete', goods.delGoods)
router.post('/update', goods.updateGoods)
router.post('/detail', goods.goodsDetail)

module.exports = router