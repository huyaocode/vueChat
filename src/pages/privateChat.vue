<template>
  <!--  私聊 -->
  <div class="wrapper">
    <Header
      goback='true'
      userInfo='true'
      :chatTitle="someOneInfoGetter.name"
    ></Header>
    <ul>
      <li
        v-for="(item, index) in privateDetail"
        :key="index"
      >
        <ChatItem
          v-if="fromUserInfo.user_id === item.from_user"
          :href="item.from_user"
          :img="item.avator"
          me="true"
          :msg="decodeMsg(item.message)"
          :name="item.name"
          :time="item.time"
          :originTime="item.originTime"
          :from_user="item.from_user"
          :to_user="item.to_user"
          @remove="getPrivateMsg"
        ></ChatItem>
        <ChatItem
          v-else
          :img="item.avator"
          :msg="decodeMsg(item.message)"
          :href=" item.from_user "
          :name="item.name"
          :time="item.time"
          :from_user=false
          :to_user=false
        ></ChatItem>
      </li>
    </ul>
    <div class="bottom">
      <div class="input-msg">
        <textarea
          v-model="inputMsg"
          @keydown.enter.prevent="sendMessage"
          ref="message"
        ></textarea>
        <p
          class="btn"
          :class="{'enable':inputMsg!=''}"
          @click="sendMessage"
        >{{btnInfo}}</p>
        <p
          @click="chooseEmoji"
          class="btn emoji"
        >🙂</p>
      </div>
      <ul class="emojiplan" v-show="showEmojis">
        <li
          class="item"
          v-for="(e,index) in emojiArr"
          :key="index"
          @click="() => addEmoji(e)"
        >{{e}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import ChatItem from '../components/ChatItem.vue'
import axios from "axios"
import {
  toNomalTime
} from "../utils/transformTime";
import {
  mapGetters
} from 'vuex'
export default {
  components: {
    Header,
    ChatItem
  },
  data () {
    return {
      inputMsg: '',
      privateDetail: [], //私聊相关
      toUserInfo: { //被私聊者
        to_user: '',
        avator: '',
        sex: '',
        place: '',
        status: ''
      },
      showEmojis: false,
      emojis: '😀 😃 😄 😁 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😛 😜 🤪 🤨 🧐 🤓 😎 🤩 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 👅 👈 😈 👿 🧦 👟 👞 👓 👠 👡 🐮 🐷 🐵 🐛 🐝 🦄 🦐 🐸 🦐 🦔 🌖 🌜 ☘ ️🌚 🌞 💦 🍭 ❤ ️🧡 💛 💚 💙 💜 🖤 💔 👩 👨 🧑 👧 👦 👶 👌 🙏 👍 🙆‍',
      isMyFriend: false, //他是否是我的好友
      isHisFriend: false, //我是否是他的好友
      fromUserInfo: {}, //用户自己
      btnInfo: "发送"
    }
  },

  computed: {
    ...mapGetters([
      'someOneInfoGetter'
    ]),
    emojiArr () {
      return this.emojis.split(' ');
    }
  },

  watch: {
    privateDetail () {
      this.refresh();
    }
  },

  methods: {
    decodeMsg(msg) {
      return decodeURIComponent(msg)
    },
    chooseEmoji () {
      this.showEmojis = !this.showEmojis;
    },
    addEmoji(e) {
      console.log(e)
      
      this.inputMsg += e;
    },
    //获取数据库的消息
    getPrivateMsg () {
      axios.get(
        '/api/v1/private_detail', {
          params: {
            to_user: this.toUserInfo.to_user
            // from_user: this.fromUserInfo.user_id
          }
        })
        .then(res => {
          if (res.data.success) {
            this.privateDetail = res.data.data.privateDetail;
            if (this.privateDetail.length == 0) return
            this.privateDetail.forEach(element => {
              element.originTime = element.time
              element.time = toNomalTime(element.time);
              element.message = element.message.split(':')[1];
            });
          }
        })
        .catch(err => {
          const errorMsg = err.response.data.error
          this.$message({
            message: errorMsg,
            type: "error"
          });
        })
    },
    //发送信息
    sendMessage () {
      if (this.inputMsg.trim() == '') return
      if (!this.isMyFriend) {
        console.log('isnotMyFriend')
        this.$message({
          message: 'ta不是您的好友，请先加ta为好友',
          type: "error"
        });
        return
      }
      if (!this.isHisFriend) {
        console.log('isnoHisFriend')
        this.$message({
          message: '您不是ta的好友，请先加ta为好友',
          type: "error"
        });
        return
      }
      this.sendMsgBySocket();
      this.saveMsgByDB();
    },
    //用socket发消息
    sendMsgBySocket () {
      let time = Date.parse(new Date())
      const data = {
        from_user: this.fromUserInfo.user_id, //自己的id
        to_user: this.toUserInfo.to_user, //对方id
        name: this.fromUserInfo.name, //自己的昵称
        avator: this.fromUserInfo.avator, //自己的头像
        message: this.inputMsg, //消息内容
        type: 'private',
        status: '1', //是否在线 0为不在线 1为在线
        time: time / 1000 //时间
      };
      socket.emit('sendPrivateMsg', data)
      this.$store.commit('updateListMutation', data);
    },
    //用数据库存消息
    saveMsgByDB () {
      let msg = encodeURIComponent(this.inputMsg);
      let time = Date.parse(new Date())
      const data = {
        from_user: this.fromUserInfo.user_id, //自己的id
        to_user: this.toUserInfo.to_user, //对方的id
        name: this.fromUserInfo.name, //自己的昵称
        avator: this.fromUserInfo.avator, //自己的头像
        message: msg, //消息内容
        status: '1', //是否在线 0为不在线 1为在线
        time: time / 1000, //时间,
        originTime: time / 1000
      }
      // 存此条私聊信息到数据库
      axios.post('/api/v1/private_save_msg', data)
        .then(res => {
          this.inputMsg = '';
          // 存此条私聊信息到本地
          data.time = toNomalTime(data.time)
          this.privateDetail.push(data);
        })
    },
    // 获取socket消息
    getMsgBySocket () {
      socket.removeAllListeners('getPrivateMsg');
      socket.on('getPrivateMsg', (data) => {
        //如果收到的soket信息不是发给自己的 放弃这条soket 没必要了 因为私聊是点对点发送的
        // if(data.to_user != this.fromUserInfo.user_id) return
        //如果收到的soket信息不是来自当前聊天者 写入首页信息列表 并return

        // console.log(data.from_user, '!=', this.toUserInfo.to_user)
        // 	//soket信息不是来自当前聊天者 vuex添加此条信息 有未读提示
        if (data.from_user != this.toUserInfo.to_user) {
          data.chatOfNow = false;
          this.$store.commit('updateListMutation', data)
          return
        } else {
          //soket信息来自当前聊天者 vuex添加此条信息 没未读提示
          data.chatOfNow = true;
          this.$store.commit('updateListMutation', data)
        }
        //本地添加此条信息
        this.privateDetail.push(data);
      })
    },
    // 查询此用户与我的关系
    isFriend () {
      axios.get('/api/v1/is_friend', {
        params: {
          // user_id: this.fromUserInfo.user_id,
          other_user_id: this.toUserInfo.to_user
        }
      }).then(res => {
        this.isMyFriend = res.data.data.isMyFriend.length !== 0 ? true : false;
        this.isHisFriend = res.data.data.isHisFriend.length !== 0 ? true : false;
      }).catch(err => {
        const errorMsg = err.response.data.error
        this.$message({
          message: errorMsg,
          type: "error"
        });
      })
    },
    //将未读信息归零
    resetUnred () {
      this.$store.commit('resetUnredMutation', this.toUserInfo.to_user)
    },
    // 消息置底
    refresh () {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight + 10000)
      }, 0)
    }
  },
  created () {
    this.toUserInfo.to_user = this.$route.params.user_id;
    this.fromUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.isFriend();
    this.resetUnred();
    this.getPrivateMsg();
    this.getMsgBySocket();
    this.$store.dispatch('someOneInfoAction', this.toUserInfo.to_user)
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/chat.scss";
</style>
