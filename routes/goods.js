var express = require('express')
var router = express.Router()
var goods = require('../models/goods')

router.post('/findlist', goods.goodsList)
router.post('/create', goods.saveGoods)
router.delete('/delete', goods.delGoods)
router.post('/update', goods.updateGoods)

module.exports = router