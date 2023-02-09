var express = require('express')
var router = express.Router()
var statistic = require('../models/statistic')

router.post('/data', statistic.profitData)

module.exports = router