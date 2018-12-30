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
      </svg><span>异性同学</span>
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
      >
      <div>
        <div class="name">{{item.name}}</div>
        <!-- <div class="time">{{item.time}}</div> -->
      </div>
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
    font-size: 0.4rem;
    li {
      height: 1rem;
      border-bottom: 1px solid #ddd;
      padding: 0.01rem 0 0 0.2rem;
    }
  }
}
</style>
