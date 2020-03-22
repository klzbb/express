const { querySql, queryOne } = require('../models/db.js')

function findCommentById(id) {
  return querySql(`select * from t_comment where id='${id}'`)
}
function findCommentFull(article_id) {
  const sql = `
    select 
      a.*,
      b.phone as user_phone,
      c.phone as ohter_user_phone
    from
      t_comment a
      left join t_user b on a.user_id = b.id
      left join t_user c on a.to_user = c.id
      where a.article_id = ${article_id}
  `
  return querySql(sql);
}
function findCommentByArticleId(articleId) {
  return querySql(`select * from t_comment where article_id='${articleId}'`)
}

function findCommentAll() {
  return querySql(`select * from t_comment`)
}

function commentAdd(data) {
  const { content, article_id, user_id, to_user } = data;
  return querySql(`insert into t_comment (content,article_id,user_id,to_user) values ("${content}",${article_id},${user_id},${to_user})`)
}

function commentDel(id) {
  return querySql(`delete from t_comment where id = ${id}`)
}


module.exports = {
  commentDel,
  commentAdd,
  findCommentById,
  findCommentByArticleId,
  findCommentAll,
  findCommentFull
}
