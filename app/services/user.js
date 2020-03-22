const { querySql, queryOne } = require('../models/db.js')

function login(phone, password) {
  return querySql(`select * from t_user where phone='${phone}' and password = '${password}'`)
}

function findUser(phone) {
  return queryOne(`select * from t_user where phone='${phone}'`)
}

function userAdd (phone,password) {
  return querySql(`insert into t_user (phone,password) values (${phone},${password})`)
}

function userDel (phone) {
  return querySql(`delete from t_user where phone = ${phone}`)
}

function userAll () {
  return querySql(`select * from t_user`)
}
module.exports = {
  userAll,
  userDel,
  userAdd,
  login,
  findUser
}
