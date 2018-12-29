const {query} = require('../utils/db')

let getContactList = function(user_id) {
  let _sql = "select id, name from user_info, (select other_user_id from user_user_relation where user_id=?) as o where o.other_user_id = user_info.id;"
  return query(_sql, user_id)
}

module.exports = {
  getContactList
}
