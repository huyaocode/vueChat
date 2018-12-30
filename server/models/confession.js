// 告白model

const {query} = require('../utils/db')

/**
 * 发送表白
 * @param {*} user_id
 * @param {*} to_user_id
 * @param {*} message
 */
let confession_to_other = function(user_id, to_user_id, message) {
  let _sql = 'insert into user_confession (user_id, to_user_id, message) values (?, ?, ?)'
  return query(_sql, [user_id, to_user_id, message])
}

/**
 * 获取自己收到的表白
 * @param {*} user_id
 */
let get_received_confession = function(user_id) {
  let _sql = 'select * from user_confession where to_user_id = ?'
  return query(_sql, user_id)
}

/**
 * 检查是否已告白
 * @param {*} user_id
 */
let check_confession = function(user_id) {
  let _sql = 'select * from user_confession where user_id = ?'
  return query(_sql, user_id)
}

let get_all_confession = function() {
  let _sql = 'select * from user_confession'
  return query(_sql)
}

module.exports = {
  confession_to_other,
  get_received_confession,
  check_confession,
  get_all_confession
}
