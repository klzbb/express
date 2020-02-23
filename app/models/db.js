const mysql      = require('mysql');
const setting = require('./setting.js');

// 填写数据库连接信息，
const option = {
  host: setting.host,
  port: setting.port,
  user: setting.username,
  password: setting.password,
  database: setting.database
}
// 建立连接池
const pool = mysql.createPool(option)

function connect() {
  return mysql.createConnection({
    host: setting.host,
    port: setting.port,
    user: setting.username,
    password: setting.password,
    database: setting.database,
    multipleStatements: true
  })
}



/**
 * select和delete操作
 * @param  {string}   sql      sql语句
 * @param  {Function} callback 回调函数
 * @return {none}
 * */
const __selsctDelete = (sql, callback) => {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log('CONNECT ERROR:', err.message)
      callback(err, null, null)
    } else {
      conn.query(sql, function (err, rows, fields) {
        // 释放连接
        conn.release()
        // 事件驱动回调
        callback(err, rows, fields)
      })
    }
  })
}

/**
 * update和insert操作
 * @param  {string}   sql      sql语句
 * @param  {array}    params   参数数组
 * @param  {Function} callback 回调函数
 * @return {none}
 */
const __updateInsert = function (sql, params, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log('CONNECT ERROR:', err.message)
      callback(err, null, null)
    } else {
      conn.query(sql, params, function (err, rows, fields) {
        // 释放连接
        conn.release()
        // 事件驱动回调
        callback(err, rows, fields)
      })
    }
  })
}

/**
 * query函数重载
 * @return {none}
 */
exports.query = function () {
  var length = arguments.length
  var sql = ''
  var cb = ''
  if (length === 2) {
    sql = arguments[0]
    cb = arguments[1]
    __selsctDelete(sql, cb)
  } else if (length === 3) {
    sql = arguments[0]
    var params = arguments[1]
    cb = arguments[2]
    __updateInsert(sql, params, cb)
  } else {
    console.log('ERROR:', '参数不对呀？亲～～')
  }
}

exports.querySql = function (sql) {
  const conn = connect()
  setting.debug && console.log(sql)
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, results) => {
        if (err) {
          setting.debug && console.log('查询失败，原因:' + JSON.stringify(err))
          reject(err)
        } else {
          setting.debug && console.log('查询成功', JSON.stringify(results))
          resolve(results)
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      conn.end()
    }
  })

  // pool.getConnection(function(error,conn){
  //   if(error) {
  //     setting.debug && console.log('CONNECT ERROR:',error.message)
  //   } else {
  //     setting.debug && console.log(sql)
  //     return new Promise((resolve, reject) => {
  //       try {
  //         conn.query(sql, (err, results) => {
  //           conn.release()
  //           if (err) {
  //             setting.debug && console.log('查询失败，原因:' + JSON.stringify(err))
  //             reject(err)
  //           } else {
  //             setting.debug && console.log('查询成功', JSON.stringify(results))
  //             resolve(results)
  //           }
  //         })
  //       } catch (e) {
  //         reject(e)
  //       }
  //     })
  //   }
  // })  
}


exports.queryOne = function (sql) {
  return new Promise((resolve, reject) => {
    querySql(sql).then(results => {
      if (results && results.length > 0) {
        resolve(results[0])
      } else {
        resolve(null)
      }
    }).catch(err => {
      reject(err)
    })
  })
}