const {
  query
} = require('../utils/db')

/**
 * 保存头像地址
 * @param {*} user_id
 * @param {*} imgURL
 */
const saveAvater = function (user_id, imgURL) {
  const _sql = 'update user_info set avator=? where id=?'
  return query(_sql, [imgURL, user_id])
}

/**
 * 保存认证图片
 * @param {*} user_id
 * @param {*} imgURL
 */
const saveApprove = function (user_id, imgURL) {
  const _sql = 'insert into approve values (?, ?, 0)'
  return query(_sql, [user_id, imgURL])
}

/**
 * 根据id获取认证信息
 * @param {*} user_id
 */
const getApprove = function (user_id) {
  const _sql = 'select * from approve where user_id=?'
  return query(_sql, user_id)
}

/**
 * 获取所有认证信息
 */
const getAllApprove = function () {
  const _sql = 'select * from approve'
  return query(_sql)
}

/**
 * 认证成功
 * @param {*} user_id
 */
const approveOK = function (user_id) {
  const _sql = 'update approve set success=1 where user_id=?'
  return query(_sql, user_id)
}

module.exports = {
  saveAvater,
  saveApprove,
  getApprove,
  getAllApprove,
  approveOK
}
