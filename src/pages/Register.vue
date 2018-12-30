<template>
  <!--  注册 -->
  <div class="login">
    <Message-box
      :visible="this.messageBox.visible"
      :messageBoxEvent="this.messageBox.messageBoxEvent"
      @confirm="confirm"
      :hasCancel=false
    >
      <p slot="content">{{this.messageBox.message}}</p>
    </Message-box>
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <router-link to="/login">
          <h2 class="inactive"> 登录 </h2>
        </router-link>
        <h2 class="active">注册 </h2>

        <form>
          <input
            type="text"
            class="fadeIn second"
            v-model="name"
            placeholder="教务处账号"
          />
					<input
            type="text"
            class="fadeIn third"
            v-model="username"
            placeholder="昵称"
          />
          <input
            type="password"
            class="fadeIn third"
            v-model="password"
            placeholder="密码"
          />
          <input
            type="password"
            class="fadeIn third"
            v-model="repeatPsw"
            placeholder="重复密码"
          />
          <div>
            <input
              type="radio"
              value="0"
              name="sex"
              id="man"
              v-model="sex"
            ><label for="man">男</label>
            <input
              type="radio"
              value="1"
              name="sex"
              id="woman"
              v-model="sex"
            ><label for="woman">女</label>
          </div>
          <input
            type="button"
            @click="register"
            class="fadeIn fourth"
            value="注册"
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
			name: '',
			username: '',
      password: '',
      repeatPsw: '',
      sex: 1,
      messageBox: {
        visible: false,
        message: "", //弹窗内容
        hasCancel: true, //弹窗是否有取消键
        messageBoxEvent: "" // 弹窗事件名称
      }
    }
  },
  methods: {
    register () {
      if (this.name !== "" && this.password !== "") {
        axios.post(
          '/api/v1/register', {
            name: this.name,
            password: this.password,
            sex: this.sex
          }).then(res => {
            console.log(res);
            if (res) {
              if (res.data.success) {
                //弹窗
                this.messageBox.messageBoxEvent = 'register'
                this.messageBox.visible = true;
                this.messageBox.message = "您已注册成功";
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              }
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '服务器出错啦',
              type: "error"
            });
          })
      } else {
        const message = this.name === "" ? "请输入用户名" : "请输入密码";
        this.$message({
          message: message,
          type: "warn"
        });
      }

    },
    confirm (value) {
      if (value === 'register') {
        this.messageBox.visible = false;
        this.$router.push("/login");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/loginregister.scss";
</style>
