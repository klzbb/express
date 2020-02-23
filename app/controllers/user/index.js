/*
 * @Descripttion: DOP
 * @version: 1.0.0
 * @Author: Author
 * @Date: 2019-12-18 10:00:17
 * @LastEditors  : konglingzhan
 * @LastEditTime : 2019-12-31 16:18:09
 */
const db = require('../../models/db.js')
const validator = require('validator')
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../../utils/constant')
const Result = require('../../models/Result.js')
const jwt = require('jsonwebtoken')
const { login } = require('../../services/user.js')
const { md5, decoded } = require('../../utils/index.js')

class User {
  /**
  * 新增用户
  * @param {String} phone  
  * @param {String} password 
  */
  F100100 (req,res,next) {
    let params = req.body;
    console.log(params.password)
    let sql = `select * from t_user where phone=${params.phone}`
    db.query(sql,(err,rows,fields) => {
      if(rows.length > 0){
        res.json({
          code:1000,
          msg:'已经存在该用户0000000'
        })
      }else{
        let sql = `INSERT INTO t_user (phone,password) VALUES(${params.phone},${params.password})`;
        // let sql = `INSERT INTO t_user (phone,password) VALUES(${params.phone},${params.password})`;
        db.query(sql,(err, rows, fields) => {
          if(err){
            console.log(err);
            return false;
          }
          if (rows.affectedRows) {
            console.log(rows)
            res.json({
              result: null,
              status: true,
              msg: '注册成功'
            })
          } else {
            res.json({
              result: null,
              status: false,
              msg: '注册失败'
            })
          }
        })
      }
      
    })
    
  }
  /**
  * search user by phone
  */
  F100101 (req,res,next) {
    const decode = decoded(req)
    if (decode && decode.phone) {
      findUser(decode.phone).then(user => {
        if (user) {
          user.roles = [user.role]
          new Result(user, '用户信息查询成功').success(res)
        } else {
          new Result('用户信息查询失败').fail(res)
        }
      })
    } else {
      new Result('用户信息查询失败').fail(res)
    }
  }
  /**
  * 登录
  */
  async F100102 (req,res,next) {
    const { phone,password } = req.body
    const user = await login(phone,password)
    if (!user || user.length === 0) {
      new Result('登录失败').fail(res)
    } else {
      const token = jwt.sign(
        { phone },
        PRIVATE_KEY,
        { expiresIn: JWT_EXPIRED }
      )
      new Result({ token }, '登录成功').success(res)
    }
    // login(phone, password).then(user => {
      
    // })
  }
  /**
  * 查询所有用户
  */
  F100103 (req,res,next) {
    if(loginUser.findIndex(item => item === req.cookies.name) === -1){
      loginUser.push(req.body.name);
      res.cookie('name',req.body.name);
      res.send({
        msg:'登录成功',
        code: 0
      })
    } else {
      res.send({
        msg:'你已经登录过了',
        code: 0
      })
    }
    
  }
 
}
module.exports = new User();
