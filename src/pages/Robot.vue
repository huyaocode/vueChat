<template>
  <!-- 表白 -->
  <div class="wrapper">
    <Header :currentTab="currentTab"></Header>
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
              <use xlink:href="#icon-Bowarrowright"></use>
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
    <Footer :currentTab="currentTab"></Footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
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
      currentTab: 2,
      pick: 0,
      confessions: [
        {
          user_id: '爱动手',
          user_name: '男生某',
          to_user_id: 'adsfdadadsf',
          to_user_name: '女生某',
          sueccess: 0,
          message: '锋特地发出了这一则声明。除了不愿意媒体们再造谣之外，这样的行为也是非常男人的，他提到了不要伤害小孩子，其实这里既包括了自己的两个儿子也包括了张柏芝的第三胎儿子。同时这也是谢霆锋从张柏芝生完三胎后以来的第一次发声。从另一方面来讲，谢霆锋的这次发声也是向王菲证明，自己现在爱的是王菲，与前妻没有任何瓜葛。'
        },
        {
          user_id: '爱动手',
          user_name: '男生某',
          to_user_id: 'adsfdadadsf',
          to_user_name: '女生某',
          sueccess: 0,
          message: '锋特地发出了这一则声明。除了不愿意媒体们再造谣之外，这样的行为也是非常男人的，他提到了不要伤害小孩子，其实这里既包括了自己的两个儿子也包括了张柏芝的第三胎儿子。同时这也是谢霆锋从张柏芝生完三胎后以来的第一次发声。从另一方面来讲，谢霆锋的这次发声也是向王菲证明，自己现在爱的是王菲，与前妻没有任何瓜葛。'
        }, {
          user_id: '爱动手',
          user_name: '男生某',
          to_user_id: 'adsfdadadsf',
          to_user_name: '女生某',
          sueccess: 0,
          message: '锋特地发出了这一则声明。除了不愿意媒体们再造谣之外，这样的行为也是非常男人的，他提到了不要伤害小孩子，其实这里既包括了自己的两个儿子也包括了张柏芝的第三胎儿子。同时这也是谢霆锋从张柏芝生完三胎后以来的第一次发声。从另一方面来讲，谢霆锋的这次发声也是向王菲证明，自己现在爱的是王菲，与前妻没有任何瓜葛。'
        }, {
          user_id: '爱动手',
          user_name: '男生某',
          to_user_id: 'adsfdadadsf',
          to_user_name: '女生某',
          sueccess: 0,
          message: '锋特地发出了这一则声明。除了不愿意媒体们再造谣之外，这样的行为也是非常男人的，他提到了不要伤害小孩子，其实这里既包括了自己的两个儿子也包括了张柏芝的第三胎儿子。同时这也是谢霆锋从张柏芝生完三胎后以来的第一次发声。从另一方面来讲，谢霆锋的这次发声也是向王菲证明，自己现在爱的是王菲，与前妻没有任何瓜葛。'
        }
      ]
    }
  },
  components: {
    Header,
    Footer
  },
  methods: {
    getUserInfos () {
      const _this = this;
      for (let item in _this.confessions) {
        axios.get('/api/v1/user_info?user_id=' + _this.confessions[item].user_id).then(res => {
          const {avator, name} = res.data.data.userInfo[0];
          _this.confessions[item].user_avator = avator;
          _this.confessions[item].user_name = name;
          _this.pick++;
        })
        axios.get('/api/v1/user_info?user_id=' + _this.confessions[item].to_user_id).then(res => {
          const {avator, name} = res.data.data.userInfo[0];
          _this.confessions[item].to_user_avator = avator;
          _this.confessions[item].to_user_name = name;
          _this.pick++;
        })
      }
    }
  },
  created () {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  mounted () {
    const _this = this;
    axios.get('/api/v1/get_all_confession').then(
      res => {
        console.log('表白', res.data.data)
        _this.confessions = res.data.data;
        _this.getUserInfos();
      }
    ).catch(err => {

    })
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 0.6rem;
  z-index: 1;
  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 1rem;
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
    }
  }
  .refresh{
    font-size: 0rem;
  }
}
</style>
