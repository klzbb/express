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
const jwt = require('jsonwebtoken')
const { login, findUser, userAdd, userDel, userAll } = require('../../services/user.js')
const { md5, decoded } = require('../../utils/index.js')
const types = require('../types.js')
class User {
  /**
  * 新增用户
  * @param {String} phone  
  * @param {String} password 
  */
  async [types.F100100](req, res, next) {
    let { phone, password } = req.body;
    let user = await findUser(phone);
    if (user) {
      new Result('已经存在该用户').fail(res)
    } else {
      let nUser = await userAdd(phone, password);
      new Result(nUser, '注册成功').success(res);
    }
  }
  /**
  * search user by phone
  */
  [types.F100101](req, res, next) {
    const decode = decoded(req)
    if (decode && decode.phone) {
      findUser(decode.phone).then(user => {
        if (user) {
          user.roles = [user.role]
          new Result(user, '用户信息查询成功').success(res)
        } else {
          new Result('用户信息查询失败').fail(res)
        }
      })
    } else {
      new Result('用户信息查询失败').fail(res)
    }
  }
  /**
  * des: user login
  * @params {phone} String
  * @params {password} String
  * @return {result} Object
  */
  async [types.F100102](req, res, next) {
    const { phone, password } = req.body
    const user = await login(phone, password)
    if (!user || user.length === 0) {
      new Result('登录失败').fail(res)
    } else {
      const token = jwt.sign(
        { phone },
        PRIVATE_KEY,
        { expiresIn: JWT_EXPIRED }
      )
      new Result({ token }, '登录成功').success(res)
    }
  }
  /**
  * del user
  * 
  */
  async [types.F100103](req, res, next) {
    let { phone } = req.body;
    let dUser = await userDel(phone);
    if (dUser) {
      new Result('删除成功').success(res);
    } else {
      new Result('删除error').fail(res);
    }
  }
  /**
  * search user all
  * 
  */
  async [types.F100104](req, res, next) {
    let users = await userAll();
    if (users) {
      new Result(users,'查询所有用户成功').success(res);
    } else {
      new Result('查询所有用户失败').fail(res);
    }
  }

}
module.exports = new User();
