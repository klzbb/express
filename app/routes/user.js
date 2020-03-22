/**
 * 用户模块路由（user module routes）
 */
const express = require('express')
const router = express.Router()
const user = require('../controllers/user')


router.post('/F100100', user.F100100) // 新增用户

router.post('/F100101',user.F100101) // 查询用户by phone

router.post('/F100102',user.F100102) // 登录

router.post('/F100103',user.F100103) // 删除用户by phone

router.post('/noauth/F100104',user.F100104) // 查询所有用户
module.exports = router