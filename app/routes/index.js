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
const router = express.Router()
const boom = require('boom')
const { body, validationResult } = require('express-validator')
const jwtAuth = require('./jwt.js')
const userRoutes = require('./user')

router.use(jwtAuth) // 登陆校验
router.use('/user',userRoutes)



/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则，会拦截正常请求
 */
router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))  
})


/**
 * 自定义路由异常处理中间件
 * 注意两点：
 * 第一，方法的参数不能减少
 * 第二，方法的必须放在路由最后
 */
router.use((err, req, res, next) => {
  console.log('全局异常处理')
  console.log({err})
  res.send({err})
})

module.exports = router
