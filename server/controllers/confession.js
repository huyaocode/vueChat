const confessionModel = require('../models/confession')

/**
 * 向他人表白
 * @param {*} ctx
 */
let confession_to_other = async function (ctx) {
  let {
    user_id,
    to_user_id,
    message
  } = ctx.request.body
  message = message || ' '
  let RowDataPacket = await confessionModel.check_confession(user_id)
  let res = JSON.parse(JSON.stringify(RowDataPacket))
  if (res.length > 0) {
    ctx.body = {
      success: false,
      message: '你已经告白过了'
    }
  } else {
    await confessionModel.confession_to_other(user_id, to_user_id, message)
    ctx.body = {
      success: true,
      message: '成功发起告白'
    }
  }
}
/**
 * 获取收到的表白
 * @param {*} ctx
 */
let get_received_confession = async function (ctx) {
  let {
    user_id
  } = ctx.query
  let RowDataPacket = await confessionModel.get_received_confession(user_id)
  let res = JSON.parse(JSON.stringify(RowDataPacket))
  ctx.body = {
    success: true,
    data: res
  }
}

/**
 * 获取所有的告白
 * @param {*} ctx
 */
let get_all_confession = async function (ctx) {
  let RowDataPacket = await confessionModel.get_all_confession()
  let res = JSON.parse(JSON.stringify(RowDataPacket))
  ctx.body = {
    success: true,
    data: res
  }
}

/**
 * 获取某人告白信息
 * @param {*} ctx
 */
let get_one_confession = async function (ctx) {
  let {
    user_id
  } = ctx.query
  let RowDataPacket = await confessionModel.check_confession(user_id)
  let res = JSON.parse(JSON.stringify(RowDataPacket))
  ctx.body = {
    success: true,
    data: res
  }
}

/**
 * 确认表白
 * @param {*} ctx
 */
let confirm_confession = async function(ctx) {
  let {user_id, to_user_id} = ctx.request.body
  await confessionModel.confirm_confession(user_id, to_user_id)
  ctx.body = {
    success: true,
  }
}

module.exports = {
  confession_to_other,
  get_received_confession,
  get_all_confession,
  get_one_confession,
  confirm_confession
}
