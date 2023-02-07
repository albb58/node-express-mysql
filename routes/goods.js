var express = require('express')
var router = express.Router()
var goods = require('../models/goods')

router.post('/findlist', goods.goodsList)

module.exports = router