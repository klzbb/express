const db = require('../../model/db.js')

exports.login = function(req,res,next) {
  db.query(`INSERT INTO user VALUES(NULL,${params.phone},'${params.password}')`,
  (err, rows, fields) => {
    if (err) {
      throw err
    }
    if (rows.affectedRows) {
      res.json({
        result: null,
        status: true,
        msg: '登录成功'
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