/*
* @Descripttion: DOP
* @version: 1.0.0
* @Author: Author
* @Date: 2019-12-18 10:00:17
* @LastEditors  : konglingzhan
* @LastEditTime : 2019-12-31 16:02:42
*/
const express = require('express')
const app = express()
const routes = require('./app/routes/index.js')
const session=require("express-session")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 20 * 60 * 1000 }, //cookie生存周期20*60秒
  resave: true,  //cookie之间的请求规则,假设每次登陆，就算会话存在也重新保存一次
  saveUninitialized: true //强制保存未初始化的会话到存储器
})); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/v1',routes)

app.listen(3000, () => console.log('Example app listening on port 3000!'))