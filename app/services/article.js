const { querySql, queryOne } = require('../models/db.js')

function findArticleByUserId(user_id) {
  return querySql(`select * from t_article where user_id='${user_id}'`)
}

function articleAdd (data) {
  const {user_id,title,content} = data;
  return querySql(`insert into t_article (user_id,title,content) values (${user_id},"${title}","${content}")`)
}

function articleDel (id) {
  return querySql(`delete from t_article where id = ${id}`)
}


module.exports = {
  articleDel,
  articleAdd,
  findArticleByUserId
}
