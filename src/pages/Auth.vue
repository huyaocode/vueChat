<template>
  <!-- 用户资料 -->
  <div class="wrapper">
    <!--弹窗-->
    <!-- <Message-box :messageBoxEvent="this.messageBox.messageBoxEvent" :visible="this.messageBox.visible" :title="	this.messageBox.title" :canInput="this.messageBox.canInput" :hasCancel="this.messageBox.hasCancel" @cancel="cancel" @confirm="confirm">
		<p slot="content">{{this.messageBox.message}}</p>
	</Message-box> -->
    <Header
      goback='true'
      chatTitle="身份认证"
    ></Header>
    <div class="content">
      
      <h2>
        你还没有通过认证
      </h2>
      <div class="pic">
          <div class="plus">
              +
          </div>
      </div>
      <p>请上传学生证或一卡通照片</p>
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
  name: 'Auth',
  data () {
    return {
      hasAuth: '',
      hasPass: '',
      currentTab: 3,
    }
  },
  computed: {
    ...mapGetters([
      'newFriendGetter'
    ])
  },
  components: {
    Header
  },
  methods: {

  },
  async created () {
    // this.myInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(this.myInfo.user_id ) 

  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  padding-top: 0.1rem;
  .content {
    top: 1rem;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    h2 {
      font-size: 0.38rem;
      line-height: 0.8rem;
    }
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin: 1rem 0 0.6rem;
    }
    .pic {
        margin: 0.2rem auto;
        width: 5rem;
        height: 3rem;
        background: #fff;
        position: relative;
        .plus{
            height: 1.5rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    p {
      font-size: 0.28rem;
      line-height: 0.8rem;
      .icon {
        font-size: 1.6em;
      }
      span {
        font-size: 0.14rem;
      }
    }
    .href {
      text-align: center;
      span {
        font-size: 0.3rem;
        cursor: pointer;
      }
    }
  }
  .action {
    position: absolute;
    width: 100%;
    top: 8.8rem;
    text-align: center;
    span {
      display: inline-block;
      font-size: 0.26rem;
      line-height: 0.26rem;
      padding: 0.16rem 0;
      width: 40%;
      cursor: pointer;
    }
    .go-chat {
      background-color: #4290f7;
      color: #fff;
    }
    .editor-remark {
      background-color: #fff;
      color: #4290f7;
    }
    .shield-it {
      background-color: #fff;
      color: #4290f7;
    }
    .de-friended {
      background-color: #e16762;
      color: #fff;
    }
    .add-as-friend,
    .editor-info {
      background-color: #4290f7;
      color: #fff;
    }
  }
}
</style>
