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
const { commentAdd, commentDel, findCommentByArticleId, findCommentAll, findCommentFull } = require('../../services/comment.js')
const { md5, decoded } = require('../../utils/index.js')
const types = require('../types.js')

class Comment {
  /**
  * 新增comment
  * @param {String} content  评论内容
  * @param {String} article_id 
  * @param {String} user_id
  * @param {String} to_user 
  */
  async [types.F300100](req, res, next) {
    let { content, article_id, user_id, to_user } = req.body;
    try {
      await commentAdd({ content, article_id, user_id, to_user });
      new Result('add success').success(res);
    } catch (e) {
      new Result(e, 'fail').fail(res);
    }

  }
  /**
  * des: comment del by id
  * @param {String} id
  * @return {result} Object
  */
  async [types.F300101](req, res, next) {
    const { id } = req.body;
    try {
      await commentDel(id);
      new Result('del success').success(res);
    } catch (e) {
      new Result(e, 'fail').fail(res);
    }
  }
  /**
  * des: search comments by article_id
  * @param {String} article_id
  * @return {Array} 
  */
  async [types.F300102](req, res, next) {
    const { article_id } = req.body;
    try {
      let comments = await findCommentByArticleId(article_id);
      new Result(comments, 'success').success(res);
    } catch (e) {
      new Result(e, 'fail').fail(res);
    }
  }
  /**
   * des: search comments all
   * @param {String} article_id
   * @return {Array} 
   */
  async [types.F300103](req, res, next) {
    try {
      let comments = await findCommentAll();
      new Result(comments, 'success').success(res);
    } catch (e) {
      new Result(e, 'fail').fail(res);
    }
  }
  /**
   * des: full comment
   * @param {String} article_id
   * @return {Array} 
   */
  async [types.F300104](req, res, next) {
    const { article_id } = req.body;
    try {
      let comments = await findCommentFull(article_id);
      new Result(comments, 'success').success(res);
    } catch (e) {
      new Result(e, 'fail').fail(res);
    }
  }

}
module.exports = new Comment();
