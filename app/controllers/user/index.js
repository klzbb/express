const db = require('../../models/db.js')
class User {
  /**
  * 新增用户
  * @param {String} phone  
  * @param {String} password 
  */
  F100100 (req,res,next) {
    let params = req.body;
    let sql = `select * from user where phone=${params.phone}`
    db.query(sql,(err,rows,fields) => {
      if(rows.length > 0){
        res.json({
          code:1000,
          msg:'已经存在该用户'
        })
      }else{
        let sql = `INSERT INTO user (phone,password) VALUES(${params.phone},${params.password})`;
        db.query(sql,(err, rows, fields) => {
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
    let sql = `select * from user where phone=${params.phone}`
    db.query(sql,(err,rows,fields) => {
      res.json(rows)
    })
  }
}
module.exports = new User();