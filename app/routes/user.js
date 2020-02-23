const express = require('express')
const router = express.Router()
const user = require('../controllers/user')


router.post('/F100100', user.F100100) // 新增用户

router.post('/F100101',user.F100101) // 查询用户by phone

router.post('/F100102',user.F100102) // 登录

module.exports = router