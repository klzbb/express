/*
 * @Descripttion: DOP
 * @version: 1.0.0
 * @Author: Author
 * @Date: 2019-12-18 10:00:17
 * @LastEditors  : konglingzhan
 * @LastEditTime : 2019-12-31 15:47:51
 */
// import { Router } from 'express'
const express = require('express')
const controllers = require('../controllers/index.js')
const router = express.Router()


router.post('/user/add', controllers.F100100) // 新增用户

router.post('/user/query',controllers.F100101) // 查询用户by phone

router.post('/user/login', controllers.F100102) // 登录

module.exports = router
