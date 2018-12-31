const {
  query
} = require('../utils/db')

const saveAvater = function (user_id, imgURL) {
  const _sql = 'update user_info set avator=? where id=?'
  return query(_sql, [imgURL, user_id])
}

module.exports = {
  saveAvater
}
