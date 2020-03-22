/**
 * 用户登陆前路由校验(routes check before user login)
 */
const jwt = require('express-jwt')
const { PRIVATE_KEY } = require('../utils/constant')

module.exports = jwt({
  secret: PRIVATE_KEY,
  credentialsRequired: true
}).unless({
  path: [
    '/',
    `*`,
    '/v1/user/F100100',
    '/v1/book/upload',
    '/v1/user/F100102',
    '/v1/user/F100103',
  ]
})
