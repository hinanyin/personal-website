<template>
  <div class="center animated fadeInRight">
    <router-view />
    <div class="header">
      <i class="iconfont icon-cuowu" @click="$router.push('/')"></i>
    </div>
    <div class="content">
      <div class="login" v-show="isLogined">
        <div>登录</div>
        <div class="signup" @click="isLogined = !isLogined">注册</div>
        <div class="email">
          <span>邮箱</span>
          <input type="text" v-model="email" placeholder="请输入注册邮箱" />
        </div>
        <div class="password">
          <span>密码</span>
          <input type="password" v-model="password" placeholder="请输入密码" />
        </div>
        <div class="makeSure">
          <div class="btnExit" @click="$router.push('/')">退出</div>
          <div class="btnLogin" @click="signin">登录</div>
        </div>
      </div>
      <div class="signIn" v-show="!isLogined">
        <div>注册</div>
        <div class="signin" @click="isLogined = !isLogined">登录</div>
        <div class="nickname">
          <span>昵称</span>
          <input type="text" v-model="nickname" placeholder="2~8位任意字符" />
          <span class="iconfont icon-zhengque3" v-show="nickname_Reg.test(nickname)"></span>
        </div>
        <div class="email">
          <span>邮箱</span>
          <input type="text" v-model="email" placeholder="xxx@xxx.com" />
          <span class="iconfont icon-zhengque3" v-show="email_Reg.test(email)"></span>
        </div>
        <div class="password">
          <span>密码</span>
          <input type="password" v-model="password" placeholder="6~18位任意字符" />
          <span
            class="iconfont icon-zhengque3"
            v-show="password_Reg.test(password) && password === repassword"
          ></span>
        </div>
        <div class="repassword">
          <span>确认</span>
          <input type="password" v-model="repassword" placeholder="确认密码是否一致" />
          <span
            class="iconfont icon-zhengque3"
            v-show="password_Reg.test(password) && password === repassword"
          ></span>
        </div>
        <div class="makeSure">
          <div class="btnExit" @click="$router.push('/')">退出</div>
          <div class="btnLogin" @click="signup">注册</div>
        </div>
      </div>
    </div>
    <!-- loading动画 -->
    <div class="loading" v-show="isLoading">
      <div class="box">
        <div class="circle">
          <div class="movecircle"></div>
          <div class="innerCircle"></div>
        </div>
        <div class="mes">~~~~{{ loadingText }}~~~~</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Login from "./login";
export default {
  name: "Center",
  setup() {
    const state = reactive({
      isLogined: true,
      nickname: "",
      email: "",
      password: "",
      repassword: "",
      isLoading: false,
      loadingText: "疯狂加载中",
      id: ""
    });

    //昵称验证规则
    let nickname_Reg = /^.{2,8}$/;
    // 邮箱验证
    let email_Reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // 密码验证
    let password_Reg = /^.{6,18}$/;

    let login = new Login(state);
    // 登录，点击事件
    const signin = () => {
      login.SignIn();
    };
    const signup = () => {
      login.SignUp();
    };
    // 判断登录状态

    return {
      ...toRefs(state),
      nickname_Reg,
      email_Reg,
      password_Reg,
      signin,
      signup
    };
  }
};
</script>

<style scoped lang="less">
@center : {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
};
@right: {
  display: flex;
  justify-content: flex-end;
  align-items: center;
};
.center {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  background-image: url("../../assets/img/2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media screen and(max-width: 600px) {
    width: 100%;
    max-height: 100vh;
  }
  .header {
    width: 100%;
    height: 75px;
    background: rgba(84, 150, 136, 0.5);
    @right();
    .iconfont {
      font-size: 30px;
      color: rgb(0, 0, 0);
      margin-right: 25px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 75px);
    @center();
    .login,
    .signIn {
      width: 45%;
      height: 75%;
      margin-top: 25px;
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
      position: relative;
      color: white;
      background: rgba(0, 0, 0, 0.4);
      @center();
      @media screen and(max-width: 600px) {
        width: 95%;
      }
      .signin,
      .signup {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 15%;
        height: 25px;
        background-color: #ff4777;
        border-radius: 3px;
        box-shadow: 0 3px 4px 1px rgba(136, 129, 129, 0.3);
        cursor: pointer;
        @center();
        &:hover {
          background-color: #f20c00;
        }
      }
      .email,
      .password,
      .repassword,
      .nickname {
        width: 75%;
        height: 45px;
        margin: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 1px solid rgb(136, 129, 129);
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
        border-radius: 4px;
        background: rgba(36, 119, 158, 0.3);
        span {
          @center();
          flex-direction: row;
          margin: 0 12px;
        }
        .iconfont {
          font-size: 30px;
          color: rgb(13, 236, 99);
        }
        input {
          width: 90%;
          height: 99%;
          outline: none;
          border: none;
          font-size: 20px;
          background: none;
          @center();
          &::placeholder {
            color: honeydew;
            font-size: 16px;
            text-align: center;
            padding-right: 35px;
          }
        }
      }
      .makeSure {
        width: 100%;
        @center();
        flex-direction: row;
        .btnExit,
        .btnLogin {
          width: 25%;
          height: 35px;
          background-color: rgba(65, 109, 89, 0.6);
          margin: 20px;
          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
          cursor: pointer;
          border-radius: 5px;
          color: whitesmoke;
          @center();
          &:hover {
            background-color: rgba(199, 17, 17, 0.4);
          }
        }
      }
    }
  }
}
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(113, 81, 131, 0.7);
  .box {
    width: 100%;
    height: 100%;
    @center();
    .circle {
      width: 125px;
      height: 125px;
      border-radius: 100%;
      box-sizing: border-box;
      border: 4px solid white;
      position: relative;
      animation: circle 3s ease;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      @center();
      .innerCircle {
        width: 75px;
        height: 75px;
        border: 3px solid rgb(14, 175, 54);
        border-radius: 100%;
      }
      .movecircle {
        width: 20px;
        height: 20px;
        background-color: #ff3300;
        border-radius: 100%;
        position: absolute;
        top: 0;
        box-shadow: 2px 1px 2px 0 rgba(0, 0, 0, 0.4);
      }
    }
    .mes {
      font-size: 20px;
      color: #f7f7f7;
      margin-top: 30px;
    }
  }
}

@keyframes circle {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
