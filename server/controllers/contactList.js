const contactModel = require('../models/contactList')

/**
 * 获取联系人列表
 * @param {*} ctx
 */
const getContactList = async function (ctx) {
  const RowDataPacket = await contactModel.getContactList(ctx.query.user_id),
    userInfo = JSON.parse(JSON.stringify(RowDataPacket));
  ctx.body = {
    success: true,
    data: {
      userInfo: userInfo
    }
  };
}

/**
 * 获取异性陌生人列表
 * @param {*} ctx
 */
const getStrangerList = async function (ctx) {
  const RowDataPacket = await contactModel.getStrangerList(ctx.query.sex),
    userInfo = JSON.parse(JSON.stringify(RowDataPacket));
  userInfo.sort(() => {
    return Math.random > 0.5 ? -1 : 1;
  })
  ctx.body = {
    success: true,
    data: {
      userInfo: userInfo
    }
  };
}

module.exports = {
  getContactList,
  getStrangerList
}
