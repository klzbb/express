const express = require('express')
const router = express.Router()
const multer = require('multer')


router.post(
  '/upload',
  multer({ dest: 'booktest' }).single('file'),
  function (req, res, next) {
    if (!req.file || req.file.length === 0) {
      res.send({
        name: '上传失败'
      })
    } else {
      res.send({
        name: '上传成功'
      })
    }
  })
module.exports = router