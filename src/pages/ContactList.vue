<template>
  <div class="wrapper">
    <Header :currentTab="currentTab"></Header>
    <router-link
      class="new-friend"
      to="contact_list/new_friends"
    >
      <svg
        class="icon img"
        aria-hidden="true"
      >
        <use xlink:href="#icon-pengyouquan"></use>
      </svg><span>好友申请</span>
      <svg
        class="icon enter"
        aria-hidden="true"
      >
        <use xlink:href="#icon-right"></use>
      </svg>
    </router-link>
    <ul class="userlist">
      <li
        v-for="item in userList"
        :key="item.id"
         @click="enterChat(item.id)"
      >
        <div class="head-pic">
        </div>
        <div class="username">{{item.name}}</div>
      </li>
    </ul>
    <Footer :currentTab="currentTab"></Footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import axios from "axios"
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      currentTab: 3,
      friend: "hover",
      group: "",
      userList: []
    }
  },
  created () {
    const _this = this;
    const user_info = JSON.parse(localStorage.getItem('userInfo'));
    axios.get(`api/v1/get_contact_list?user_id=${user_info.user_id}`).then(res => {
      _this.userList = res.data.data.userInfo;
    }).catch(e => {
    })
  },
  computed: {},

  watch: {},

  methods: {
    showFriends () {
      this.friend = "hover";
      this.group = '';
    },
    showGroups () {
      this.friend = '';
      this.group = "hover";
    },
    enterChat (chatId) {
      this.$router.push(`/private_chat/${chatId}`)
    },
  },

  mounted () {
    // this.getMsgBySocket();
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 1rem;
  .new-friend {
    background-color: #fff;
    color: #333;
    display: flex;
    display: -webkit-flex;
    padding: 0.16rem;
    margin-bottom: 0.16rem;
    text-decoration: none;
    .icon {
      font-size: 0.4rem;
      line-height: 0.4rem;
    }
    .enter {
      position: absolute;
      right: 0.2rem;
    }
    span {
      font-size: 0.28rem;
      line-height: 0.5rem;
      margin-left: 0.2rem;
      // overflow: hidden;
    }
  }
  .tab {
    font-size: 0.3rem;
    background-color: #fff;
    color: #333;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    // border: red;
    span {
      padding: 0.16rem;
    }
    .hover {
      color: #1e90ff;
      border-bottom: 0.03rem solid #1e90ff;
    }
  }
  .userlist {
    width: 100%;
    li {
      display: flex;
      border-top: 1px solid #eee;
      border-top: 1px solid #eee;
      background: #fff;
      height: 1rem;
      padding: 0.05rem 0.15rem 0.05rem;
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
}
</style>
