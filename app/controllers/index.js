/*
 * @Descripttion: DOP
 * @version: 1.0.0
 * @Author: Author
 * @Date: 2019-12-18 10:00:17
 * @LastEditors  : konglingzhan
 * @LastEditTime : 2019-12-31 14:58:59
 */


const User = require('./user/index.js') // 用户相关
const userInstance = new User()
exports.F100100 = userInstance.F100100 // 新增用户
exports.F100101 = userInstance.F100101 // 查询用户by phone
exports.F100102 = userInstance.F100102 // 登录
