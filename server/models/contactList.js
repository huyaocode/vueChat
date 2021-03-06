const {
  query
} = require('../utils/db')

/**
 * 获取联系人列表
 * @param {} user_id
 */
let getContactList = function (user_id) {
  let _sql = "select id, name from user_info, (select other_user_id from user_user_relation where user_id=?) as o where o.other_user_id = user_info.id;"
  return query(_sql, user_id)
}

/**
 * 获取异性陌生人信息
 */
let getStrangerList = function (sex) {
  sex = Number(sex)
  let _sql = 'select * from user_info where sex != ? limit 10'
  return query(_sql, sex)
}

module.exports = {
  getContactList,
  getStrangerList
}
