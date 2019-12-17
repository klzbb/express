// import { Router } from 'express'
const express = require('express')
const controllers = require('../controllers/index.js')
const router = express.Router()


router.post('/user/add', controllers.F100100) // 新增用户

router.post('/user/query',controllers.F100102) // 查询用户by phone

module.exports = router
