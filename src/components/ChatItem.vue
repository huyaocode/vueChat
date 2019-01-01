<template>
  <div class="chat-item">
    <div
      v-if="!me"
      class="otherchat"
    >
      <img
        :src="img"
        alt=""
        class="img"
        @click="lookInfo"
      >
      <div class="nt"><span v-if="name">{{name}}</span><span v-if="time">{{time}}</span></div>
      <div class="msg">{{msg}}</div>
    </div>

    <div
      v-if="me"
      class="mychat"
    >

      <img
        :src="img"
        alt=""
        class="img"
        @click="lookInfo"
      >
      <div class="nt">
        <span v-if="time">{{time}}</span>
        <span v-if="name">{{name}}</span>
      </div>
      <div>
        <div
          v-show="showBtn"
          class="withdraw"
          @click="withdraw"
        >
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-undo"></use>
          </svg>
        </div>
        <div
          class="msg"
          @click="toggleShowBtn"
        >{{msg}}</div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'chat-item',
  props: ['me', 'name', 'img', 'msg', 'time', 'href', 'from_user', 'to_user', 'originTime'],
  components: {},
  data () {
    return {
      showBtn: false,
      msgTime: '--'
    };
  },

  computed: {},
  mounted() {
      this.msgTime = this.originTime;
  },

  watch: {},

  methods: {
    lookInfo () {
      this.$router.push(`/user_info/${this.href}`)
    },
    toggleShowBtn () {
      this.showBtn = !this.showBtn;
    },
    withdraw () {
        let _this = this
      if (this.from_user) {
        const { from_user, to_user, msgTime } = this;
        console.log('from_user_id:', from_user, 'to_user_id:', to_user, 'time:', msgTime)
        axios.post('api/v1/undo_message', { from_user_id: from_user, to_user_id: to_user, time: Number(msgTime) }).then(res => {
            _this.$emit('remove')
        }).catch(res => {

        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-item {
  width: 100%;
  margin: 0.7rem 0;
  .otherchat {
    width: 100%;
    position: relative;
    .img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 0.2rem;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .nt {
      font-size: 0.2rem;
      left: 1rem;
      top: -0.4rem;
      position: absolute;
      color: #686868;
      span {
        padding-right: 0.1rem;
      }
      span:nth-child(2) {
        font-size: 0.1rem;
      }
    }
    .msg {
      float: left;
      max-width: 60%;
      // margin-top: 0.2rem;
      margin-left: 1rem;
      padding: 0.12rem;
      border-radius: 0.1rem;
      font-size: 0.24rem;
      line-height: 0.34rem;
      background-color: #fff;
    }
  }
  .mychat {
    width: 100%;
    position: relative;
    .img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      right: 0;
      position: absolute;
      top: 50%;
      right: 0.2rem;
      transform: translateY(-50%);
    }
    .nt {
      font-size: 0.2rem;
      right: 1rem;
      top: -0.4rem;
      position: absolute;
      color: #686868;
      span {
        padding-left: 0.1rem;
      }
      span:nth-child(1) {
        font-size: 0.1rem;
      }
    }
    div {
      float: right;
      .withdraw {
        font-size: 0.28rem;
        float: left;
        margin-left: -0.6rem;
        margin-top: 0.1rem;
        width: 0.4rem;
        height: 0.4rem;
        text-align: center;
        border-radius: 0.2rem;
      }
      .msg {
        max-width: 60%;
        margin-right: 1rem;
        padding: 0.12rem;
        border-radius: 0.1rem;
        font-size: 0.24rem;
        line-height: 0.34rem;
        background-color: #4290f7;
        color: #fff;
      }
    }
  }
}
</style>