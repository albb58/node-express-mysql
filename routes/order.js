var express = require('express')
var router = express.Router()
var order = require('../models/order')

router.post('/orderlist', order.orderList)
router.post('/create', order.addOrder)
router.get('/detail', order.ordertDetail)

module.exports = router