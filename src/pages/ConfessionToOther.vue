<template>
  <!-- 表白 -->
  <div class="wrapper">
    <Message-box
      :messageBoxEvent="this.messageBox.messageBoxEvent"
      :visible="this.messageBox.visible"
      @cancel="cancel"
      @confirm="confirm"
    >
      <p slot="content">{{this.messageBox.message}}</p>
    </Message-box>
    <Header
      goback='true'
      chatTitle="表白"
    ></Header>
    <div class="content">
      <div class="users">
        <div class="user">
          <div
            class="head-pic"
            :style="{backgroundImage: `url(${user_avator})`}"
          >
          </div>
          <div class="username">{{user_name}}</div>
        </div>
        <div class="icon">
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-Bowarrowright"></use>
          </svg>
        </div>
        <div class="user">
          <div
            class="head-pic"
            :style="{backgroundImage: `url(${to_user_avator})`}"
          >
          </div>
          <div class="username">{{to_user_name}}</div>
        </div>
      </div>
      <textarea
        class="content"
        v-model="message"
        rows="10"
      ></textarea>
      <div class="action">
        <span
          class="editor-remark"
          @click="sendConfession"
        >发送表白</span>
      </div>
    </div>
    <div class="refresh">{{pick}}</div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import axios from "axios"
import {
  mapGetters
} from 'vuex'
export default {
  name: 'About',
  data () {
    return {
      user_id: '',
      user_avator: '',
      user_name: '',
      to_user_id: '',
      to_user_name: '',
      to_user_avator: '',
      message: '',
      pick: 0,
      messageBox: {
        visible: false,
        message: "", //弹窗内容
        hasCancel: true, //弹窗是否有取消键
        messageBoxEvent: "" //弹窗事件名称
      },
    }
  },
  components: {
    Header
  },
  mounted () {
    this.to_user_id = this.$router.history.current.query.to_user_id;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.user_id = userInfo.user_id;
    this.getUsersInfo();
  },
  methods: {
    sendConfession () {
      const _this = this;
      const { user_id, to_user_id, message } = _this;
      axios.post('api/v1/confession_to_other', {
        user_id, to_user_id, message
      }).then(res => {
        let cb = res.data;
        if (!cb.success) {
          _this.messageBox.message = cb.message;
          _this.messageBox.visible = true;
        } else {
          _this.messageBox.message = '发送成功！';
          _this.messageBox.visible = true;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    cancel (value) {
      this.messageBox.visible = false;
    },
    confirm (value) {
      this.messageBox.visible = false;
    },
    getUsersInfo () {
      const _this = this;
      axios.get('api/v1/user_info?user_id=' + _this.user_id).then(res => {
        this.user_avator = res.data.data.userInfo[0].avator;
        this.user_name = res.data.data.userInfo[0].name;
        _this.pick++;
      })
      axios.get('api/v1/user_info?user_id=' + _this.to_user_id).then(res => {
        this.to_user_avator = res.data.data.userInfo[0].avator;
        this.to_user_name = res.data.data.userInfo[0].name;
        _this.pick++;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  padding-top: 1rem;
  .content {
    font-size: 0.28rem;
    padding: 0.5rem 0.3rem;
    .users {
      display: flex;
      justify-content: center;
      .icon {
        font-size: 0.5rem;
        line-height: 180%;
        color: #fb7299;
        overflow: visible;
      }
      .user {
        display: flex;
        height: 1rem;
        padding: 0.05rem 0.15rem 0.05rem;
        position: relative;
        .head-pic {
          align-self: center;
          width: 0.8rem;
          height: 0.8rem;
          background-color: #f0ecec;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .username {
          margin-left: 0.2rem;
          font-size: 0.3rem;
          align-self: center;
        }
      }
    }
    .content {
      margin-top: 0.5rem;
      padding: 0.3rem 0.15rem;
      border: 1px solid #fb7299;
      border-radius: 0.1rem;
      letter-spacing: 1px;
      font-size: 0.25rem;
      line-height: 0.4rem;
      width: 100%;
    }
    .action {
      width: 100%;
      text-align: center;
      margin-top: 0.4rem;
      span {
        display: inline-block;
        background-color: #fb7299;
        font-size: 0.26rem;
        line-height: 0.26rem;
        padding: 0.16rem 0;
        width: 40%;
        cursor: pointer;
      }
    }
  }
  .refresh{
    font-size: 0rem;
  }
}
</style>
