const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const msgModel = require("../models/message");

module.exports = async (ctx, next) => {
  try {
    const res1 = await msgModel.getPrivateList(ctx.user_id);
    const privateList = JSON.parse(JSON.stringify(res1));
    const res2 = await msgModel.getGroupList(ctx.user_id);
    const groupList = JSON.parse(JSON.stringify(res2));
    ctx.body = {
      success: true,
      data: {
        privateList: privateList,
        groupList: groupList
      }
    };
  } catch (error) {
    console.log(error);
  }
};

/**
 * 撤销消息
 */
module.exports.undoMessage = async function(ctx) {
  const {from_user_id, to_user_id, time} = ctx.request.body
  await msgModel.undoMessage(from_user_id, to_user_id, time)
  ctx.body = {
    success: true,
    message: "撤销成功"
  }
}
