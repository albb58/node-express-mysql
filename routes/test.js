var express = require('express')
var router = express.Router()
var test = require('../controllers/test')

router.get('/test', test)

module.exports = router