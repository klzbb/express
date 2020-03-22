/**
 * 用户模块路由（user module routes）
 */
const express = require('express')
const router = express.Router()
const article = require('../controllers/article')

router.post('/F200100', article.F200100) //create article
router.post('/F200101', article.F200101) //search article by user_id
router.post('/F200102', article.F200102) //del article by id


module.exports = router