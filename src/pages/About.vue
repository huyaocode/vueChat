<template>
  <!-- 关于我们 -->
  <div class="wrapper">
    <Header
      goback='true'
      chatTitle="关于我们"
    ></Header>
    <div class="content">
      “西科陌陌”是为西南科技大学大学生开发的异性交友APP，它提供在线聊天、教务处认证、管理好友、发送表白的功能。“西科陌陌”的开发背景是：学校单身的大学生很多，大学生交友圈子小、没有一个良好的交友平台。
    </div>
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
    }
  },
  components: {
    Header
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  padding-top: 1rem;
  .content {
    padding: 0.2rem;
    font-size: 0.3rem;
    line-height: 0.5rem;
  }
}
</style>
