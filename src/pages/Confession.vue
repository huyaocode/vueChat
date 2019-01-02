<template>
  <!-- 表白 -->
  <div class="wrapper">
    <Header
      goback='true'
      chatTitle="关于我的表白"
    ></Header>
    <h2>我收到的表白</h2>
    <ul>
      <li
        v-for="(bb, index) in confessions"
        :key="index"
      >
        <div class="users">
          <div class="user">
            <div
              class="head-pic"
              :style="{backgroundImage: `url(${bb.user_avator})`}"
            >
            </div>
            <div class="username">{{bb.user_name}}</div>
          </div>
          <div class="icon">
            <svg
              class="icon"
              aria-hidden="true"
            >
              <use v-show="bb.sueccess === 0" xlink:href="#icon-Bowarrowright"></use>
              <use v-show="bb.sueccess === 1" xlink:href="#icon-heart1"></use>
            </svg>
          </div>

          <div class="user">
            <div
              class="head-pic"
              :style="{backgroundImage: `url(${bb.to_user_avator})`}"
            >
            </div>
            <div class="username">{{bb.to_user_name}}</div>
          </div>
        </div>
        <div class="content">
          {{bb.message}}
        </div>
        <div v-show="bb.sueccess === 0" class="confirm" @click="()=>confirmConfession(bb.user_id, bb.to_user_id)">好, 在一起</div>
      </li>
    </ul>

    <h2>我发出的表白</h2>
    <ul>
      <li
        v-for="(bb, index) in myConfessions"
        :key="index"
      >
        <div class="users">
          <div class="user">
            <div
              class="head-pic"
              :style="{backgroundImage: `url(${bb.user_avator})`}"
            >
            </div>
            <div class="username">{{bb.user_name}}</div>
          </div>
          <div class="icon">
            <svg
              class="icon"
              aria-hidden="true"
            >
              <use v-show="bb.sueccess === 0" xlink:href="#icon-Bowarrowright"></use>
              <use v-show="bb.sueccess === 1" xlink:href="#icon-heart1"></use>
            </svg>
          </div>

          <div class="user">
            <div
              class="head-pic"
              :style="{backgroundImage: `url(${bb.to_user_avator})`}"
            >
            </div>
            <div class="username">{{bb.to_user_name}}</div>
          </div>
        </div>
        <div class="content">
          {{bb.message}}
        </div>
      </li>
    </ul>
    <div class="refresh">{{pick}}</div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import axios from "axios";
import {
  mapGetters
} from 'vuex';
import {
  toNomalTime
} from "../utils/transformTime";
export default {
  name: 'Robot',
  data () {
    return {
      user_id: '',
      pick: 0,
      confessions: [],
      myConfessions: [],
    }
  },
  components: {
    Header
  },
  methods: {
    getUserInfos (confessions) {
      const _this = this;
      for (let item in confessions) {
        axios.get('/api/v1/user_info?user_id=' + confessions[item].user_id).then(res => {
          const {avator, name} = res.data.data.userInfo[0];
          confessions[item].user_avator = avator;
          confessions[item].user_name = name;
          _this.pick++;
        })
        axios.get('/api/v1/user_info?user_id=' + confessions[item].to_user_id).then(res => {
          const {avator, name} = res.data.data.userInfo[0];
          confessions[item].to_user_avator = avator;
          confessions[item].to_user_name = name;
          _this.pick++;
        })
      }
    },
    get_received_confession() {
      const _this = this;
      axios.get('api/v1/get_received_confession?user_id=' + _this.user_id).then(res => {
        _this.confessions = res.data.data;
        _this.getUserInfos(_this.confessions);
      })
    },
    get_one_confession() {
      const _this = this;
      axios.get('api/v1/get_one_confession?user_id=' + _this.user_id).then(res => {
         _this.myConfessions = res.data.data;
        _this.getUserInfos(_this.myConfessions);
      })
    },
    confirmConfession(user_id, to_user_id) {
      console.log(user_id, to_user_id);
      const _this = this;
      axios.post('api/v1/confirm_confession', {user_id, to_user_id}).then(res => {
        _this.get_received_confession();
      })
    }
  },
  created () {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  mounted () {
    this.to_user_id = this.$router.history.current.query.to_user_id;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.user_id = userInfo.user_id;
    this.get_received_confession();
    this.get_one_confession();
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 0.6rem;
  z-index: 1;
  h2 {
    font-size: 0.3rem;
    text-align: center;
    margin: 0.3rem 0 0.2rem 0;
    color: #555;
    font-weight: 100;
  }
  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    li {
      font-size: 0.28rem;
      padding: 0.5rem 0.3rem;
      border-top: 1px solid #ccc;
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
        letter-spacing: 1px;
        font-size: 0.29rem;
        line-height: 0.4rem;
      }
      .confirm {
        text-align: right;
        background: #fb7299;
        float: right;
        padding: 0.15rem 0.1rem;
        border-radius: 0.2rem;
        color: #fff;
        margin-top: 0.1rem;
      }
    }
  }
  .refresh{
    font-size: 0rem;
  }
}
</style>
