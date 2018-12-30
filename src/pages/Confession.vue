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
            <div class="head-pic">
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
            <div class="head-pic">
            </div>
            <div class="username">{{bb.to_user_name}}</div>
          </div>
        </div>
        <div class="content">
          {{bb.message}}
        </div>
      </li>
    </ul>

    <h2>我发出的表白</h2>
    <ul>
      <li>
        <div class="users">
          <div class="user">
            <div class="head-pic">
            </div>
            <div class="username">{{myConfessions.user_name}}</div>
          </div>
          <div class="icon">
            <svg
              class="icon"
              aria-hidden="true"
            >
              <use v-show="myConfessions.sueccess === 0" xlink:href="#icon-Bowarrowright"></use>
              <use v-show="myConfessions.sueccess === 1" xlink:href="#icon-heart1"></use>
            </svg>
          </div>

          <div class="user">
            <div class="head-pic">
            </div>
            <div class="username">{{myConfessions.to_user_name}}</div>
          </div>
        </div>
        <div class="content">
          {{myConfessions.message}}
        </div>
      </li>
    </ul>
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
      confessions: [
        {
          user_id: '爱动手',
          user_name: '一个同学',
          to_user_id: 'adsfdadadsf',
          to_user_name: '本用户',
          sueccess: 0,
          message: '这又是什么套路？表白之前还要倒数321？你不说你喜欢他我还以为接下来要开始唱歌了呢“爱就像蓝天白云，晴空万里，突然暴风雨~”多好听啊是吧。明明是小学生一个一个成熟的跟啥似的'
        },
        {
          user_id: '爱动手',
          user_name: '一个同学',
          to_user_id: 'adsfdadadsf',
          to_user_name: '本用户',
          sueccess: 0,
          message: '这又是什么套路？表白之前还要倒数321？你不说你喜欢他我还以为接下来要开始唱歌了呢“爱就像蓝天白云，晴空万里，突然暴风雨~”多好听啊是吧。明明是小学生一个一个成熟的跟啥似的'
        }
      ],
      myConfessions: {
        user_id: '爱动手',
        user_name: '本用户',
        to_user_id: 'adsfdadadsf',
        to_user_name: '其他同学',
        sueccess: 1,
        message: '“你今天有点儿怪。”“哪怪了？”“怪可爱的。”不是我说，是不是有点儿牵强突兀？但是不知道为啥很多人都说觉得超级撩人，难道我真的老了，欣赏不了年轻人的梗了吗？'
      }
    }
  },
  components: {
    Header
  },
  methods: {
    getUserInfos () {
      for (let item in this.confessions) {
        axios.get('/api/v1/user_info?user_id=' + item.user_id).then(res => {
          this.confessions[item].res = res.data
        })
      }
    }
  },
  created () {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  mounted () {
    axios.get('/api/v1/get_all_confession').then(
      res => {
        console.log('表白', res.data.data)
        const confessions = res.data.data;
        confessions.user_name = '';
        confessions.to_user_name = '';
        getUserInfos();
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
}
</style>
