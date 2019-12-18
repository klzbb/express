/*
 * @Descripttion: DOP
 * @version: 1.0.0
 * @Author: Author
 * @Date: 2019-12-18 10:00:17
 * @LastEditors  : konglingzhan
 * @LastEditTime : 2019-12-18 10:41:41
 */
const express = require('express')
const app = express()
const routes = require('./app/routes/index.js')

let bodyParser = require('body-parser')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/v1',routes)

app.listen(3000, () => console.log('Example app listening on port 3000!'))