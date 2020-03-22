/**
 * comment module routes
 */
const express = require('express')
const router = express.Router()
const comment = require('../controllers/comment')

router.post('/F300100', comment.F300100) //create comment
router.post('/F300101', comment.F300101) //del comment by id
router.post('/F300102', comment.F300102) //search by article_id
router.post('/F300103', comment.F300103) //search all
router.post('/F300104', comment.F300104) //full comment

module.exports = router