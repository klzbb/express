const express = require('express')
const app = express()
const routes = require('./app/routes/index.js')

let bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/v1',routes)

app.listen(3000, () => console.log('Example app listening on port 3000!'))