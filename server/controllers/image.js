const imageModel = require('../models/image')

const saveAvater = async function (ctx, next) {
  const imgUrl = ctx.request.body.imgUrl
  const user_id = ctx.request.body.user_id
  await imageModel.saveAvater(user_id, imgUrl)
  ctx.body = {
    success: true
  }
}

module.exports = {
  saveAvater
}
