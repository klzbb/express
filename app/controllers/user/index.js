/*
 * @Descripttion: DOP
 * @version: 1.0.0
 * @Author: Author
 * @Date: 2019-12-18 10:00:17
 * @LastEditors  : konglingzhan
 * @LastEditTime : 2019-12-31 16:18:09
 */
const db = require('../../models/db.js')
const loginUser = []
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
          msg:'已经存在该用户'
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
  * 查询用户
  */
  F100101 (req,res,next) {
    let params = req.body;
    console.log(req.cookies);
    console.log(loginUser);
    if(loginUser.findIndex(item => item === req.cookies.name) === -1){
      res.send({
        code:-3,
        msg:'登录态失效'
      })
    } else {
      let sql = `select * from t_user`
      db.query(sql,(err,rows,fields) => {
        res.json(rows)
      })
    }
    
  }
  /**
  * 登录
  */
  F100102 (req,res,next) {
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
  F100105(req,res,next){
    
  }
  
  F100104 (req,res,next){}
  F100106 (req,res,next){}
}
module.exports = new User();
