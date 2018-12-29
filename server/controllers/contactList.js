const contactModel = require('../models/contactList')

const getContactList = async function(ctx) {
  const RowDataPacket = await contactModel.getUserInfo(ctx.query.user_id),
	userInfo = JSON.parse(JSON.stringify(RowDataPacket));
	ctx.body = {
		success: true,
		data: {
			userInfo: userInfo
		}
	};
}

module.exports = {
  getContactList
}
