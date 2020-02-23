const { querySql, queryOne } = require('../models/db.js')

function login(phone, password) {
  return querySql(`select * from t_user where phone='${phone}' and password = '${password}'`)
}

function findUser(username) {
  return queryOne(`select id, username, nickname, role, avatar from admin_user where username='${username}'`)
}

module.exports = {
  login,
  findUser
}
