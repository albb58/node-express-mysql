var express = require('express')
var router = express.Router()
var purchase = require('../models/purchase')

router.post('/list', purchase.purchaseList)
router.post('/create', purchase.addPurchase)
router.get('/detail', purchase.purchaseDetail)

module.exports = router