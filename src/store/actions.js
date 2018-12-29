import axios from "axios";
import {
	toNomalTime
} from "../utils/transformTime";


const actions = {
  //机器人
  robatMsgAction({
    commit
  }, data) {
    // console.log(data + "  robatMsgAction");
    axios.get("/api/v1/robot", {
        params: data
      }).then(res => {
        if (res) {
          if (res.data.data.code === 100000) {
            commit("robotMsgMutation", {
              message: res.data.data.text,
              user: "robot"
            });
          } else if (res.data.data.code === 200000) {
            let data = res.data.data.text + res.data.data.url;
            commit("robotMsgMutation", {
              message: data,
              user: "robot"
            });
          } else if (res.data.data.code === 302000) {
            commit("robotMsgMutation", {
              message: "暂不支持此类对话",
              user: "robot"
            });
          } else {
            commit("robotMsgMutation", {
              message: "暂不支持此类对话",
              user: "robot"
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 消息首页列表
  async msgListAction({
    commit
  }) {
    // console.log('msgListAction')
    const res = await axios.get("/api/v1/message");
    console.log("res", res);
    if (res.data.success) {
      const groupList = res.data.data.groupList;
      const privateList = res.data.data.privateList;
      groupList.forEach(element => {
        element.type = "group";
        element.time = element.time ? toNomalTime(element.time) : toNomalTime(element.creater_time);
        element.id = element.group_id;
      });
      privateList.forEach(element => {
        element.type = "private";
        element.time = element.time ? toNomalTime(element.time) : toNomalTime(element.be_friend_time);
        element.id = element.other_user_id;
        // element.unread = 0;
      });
      const allMsgList = groupList.concat(privateList);
      allMsgList.sort((a, b) => {
        return b.time - a.time;
      });
      commit("msgListMutation", allMsgList);
    }
  },
  //某个用户的用户资料
  async someOneInfoAction({
    commit
  }, user_id) {
    // console.log("user_id666", user_id);
    const res = await axios.get("/api/v1/user_info", {
      params: {
        user_id: user_id
      }
    });
    commit("someOneInfoMutation", res.data.data.userInfo[0]);
  },
  //获取新朋友列表
  async newFriendAction({
    commit
  }, user_id) {
    // console.log("user_id666", user_id);
    const res = await axios.get("/api/v1/get_newfriends");
    // console.log('newFriendAction', res)
    commit("newFriendMutation", res.data.data.newFriends);
  }
}

export default actions
