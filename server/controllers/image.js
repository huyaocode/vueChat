const imageModel = require('../models/image')

/**
 * 保存头像地址
 * @param {*} ctx
 * @param {*} next
 */
const saveAvater = async function (ctx, next) {
  const imgUrl = ctx.request.body.imgUrl
  const user_id = ctx.request.body.user_id
  await imageModel.saveAvater(user_id, imgUrl)
  ctx.body = {
    success: true
  }
}

/**
 * 保存认证图片
 * @param {*} ctx
 * @param {*} next
 */
const saveApprove = async function (ctx, next) {
  const imgUrl = ctx.request.body.imgUrl
  const user_id = ctx.request.body.user_id
  await imageModel.saveApprove(user_id, imgUrl)
  ctx.body = {
    success: true
  }
}

/**
 * 根据id获取认证信息
 * @param {*} ctx
 * @param {*} next
 */
const getApprove = async function (ctx, next) {
  const user_id = ctx.query.user_id
  let RowDataPacket = await imageModel.getApprove(user_id)
  let res = JSON.parse(JSON.stringify(RowDataPacket))
  ctx.body = {
    success: true,
    data: res
  }
}

/**
 * 获取所有认证信息
 * @param {*} ctx
 * @param {*} next
 */
const getAllApprove = async function (ctx, next) {
  let RowDataPacket = await imageModel.getAllApprove()
  let res = JSON.parse(JSON.stringify(RowDataPacket))
  ctx.body = {
    success: true,
    data: res
  }
}

module.exports = {
  saveAvater,
  saveApprove,
  getApprove,
  getAllApprove
}
