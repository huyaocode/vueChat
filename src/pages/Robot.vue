<template>
  <!-- 机器人聊天 -->
  <div class="wrapper">
    <Header :currentTab="currentTab"></Header>
    <ul>
      <li>
        这里是表白动态
      </li>
      <li>
        这里是表白动态
      </li>
      <li>
        这里是表白动态
      </li>
    </ul>
    <!-- <ul>
		<li v-for="msg in robotMsgGetter">
			<ChatItem v-if="msg.user" img="http://ooytyiziz.bkt.clouddn.com/robot.gif" :msg="msg.message" :name="msg.user" :time="time"></ChatItem>
			<ChatItem v-if="!msg.user" me="true" :img=img :msg="msg.message" :time="time"></ChatItem>
		</li>
	</ul> -->

    <Footer :currentTab="currentTab"></Footer>

  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ChatItem from '../components/ChatItem.vue'
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
      time: toNomalTime(Date.parse(new Date()) / 1000),
      inputMsg: "",
      img: "",
      isScrollToBottom: true
    }
  },
  components: {
    Header,
    Footer,
    ChatItem
  },
  methods: {
    async sendMessage () {
      if (this.inputMsg.trim() == '') return;
      this.$store.commit('robotMsgMutation', { //提交自己的内容
        message: this.inputMsg
      })
      await this.$store.dispatch('robatMsgAction', { //提交由自己输入内容作为参数请求接口异步得来的内容（机器人的回复）
        message: this.inputMsg
      })
      this.inputMsg = '';
    },
    refresh () {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight + 10000)
      }, 0)
    }
  },
  watch: {
    robotMsgGetter () { //当数据改变了,则自动刷新
      this.refresh();
    }
  },
  computed: {
    ...mapGetters([
      'robotMsgGetter'
    ])
  },
  created () {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.img = userInfo.avator;
  },
  mounted () {
    // const date = Date.parse(new Date());
    // console.log('date', date)
    // this.time = ;
    setTimeout(() => {
      this.refresh();
    }, 200)
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  // height: 100vh;
  padding-top: 0.6rem;
  z-index: 1;
  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 1.6rem;
    // touch-action:none !important;
    li {
      margin-top: 0.1rem;
      padding: 0;
      font-size: 0.28rem;
    }
  }
}
</style>
