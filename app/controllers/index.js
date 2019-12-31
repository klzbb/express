/*
 * @Descripttion: DOP
 * @version: 1.0.0
 * @Author: Author
 * @Date: 2019-12-18 10:00:17
 * @LastEditors  : konglingzhan
 * @LastEditTime : 2019-12-31 14:58:59
 */


var user = require('./user/index.js') // 用户相关

exports.F100100 = user.F100100 // 新增用户
exports.F100101 = user.F100101 // 查询用户by phone
exports.F100102 = user.F100102 // 登录
