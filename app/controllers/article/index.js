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
const { findArticleByUserId, articleAdd, articleDel } = require('../../services/article.js')
const { md5, decoded } = require('../../utils/index.js')
const types = require('../types.js')

class Article {
  /**
  * 新增article
  * @param {String} user_id  用户id
  * @param {String} title 标题
  * @param {String} content 内容
  */
  async [types.F200100](req, res, next) {
    let { user_id, title, content } = req.body;
    try {
      let result = await articleAdd({ user_id, title, content });
      new Result('新增article成功').success(res);
    } catch (e) {
      new Result(e, 'fail').fail(res);
    }

  }
  /**
  * search article by user_id
  * @param {String} user_id 用户id
  */
  async [types.F200101](req, res, next) {
    const { user_id} = req.body;
    try {
      const articles = await findArticleByUserId(user_id);
      if (articles) {
        new Result(articles, '查询所有朋友圈成功').success(res);
      } else {
        new Result(articles, '查询所有朋友圈失败').fail(res);
      }
    } catch (e) {
      new Result(e, 'fail').fail(res)
    }

  }
  /**
  * des: article del by id
  * @param {String} id
  * @return {result} Object
  */
  async [types.F200102](req, res, next) {
    const { id } = req.body;
    try {
      await articleDel(id);
      new Result('del success').success(res);
    } catch(e) {
      new Result(e,'fail').fail(res);
    }
    
  }
}
module.exports = new Article();
