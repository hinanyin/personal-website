<template>
  <div class="contactdetail">
    <div class="contactMe">
      <div class="header">
        <img src="@/assets/img/不知火.jpg" alt />
      </div>
      <div class="name">
        <h4>boyyang</h4>
      </div>
      <h6 style="font-size: 18px">留言板</h6>
      <div class="textarea">
        <div class="login">
          <div class="logFirst">
            <i class="iconfont icon-kongjianjianmo"></i>
            {{ beforeLogin }}
          </div>
          <div class="toLogin" @click="login" v-show="!isLogin">登录</div>
          <div class="outLogin" @click="outlogin" v-show="isLogin">退出</div>
        </div>
        <textarea name="comment" id cols="20" rows="10" v-model="commentText"></textarea>
      </div>
      <div class="submit" @click="submit" v-show="isLogin">提交</div>
      <div class="comment" v-for="(item, i) in commentDetail" :key="i">
        <div class="userIcon">{{ item.nickname.slice(0, 1) }}</div>
        <div class="commentMes">
          <div class="commentUser">
            {{ item.nickname }}
            <span class="time">{{ item.commentTime }}</span>
          </div>
          <div class="commentText">{{ item.commentText }}</div>
          <div class="reback">
            <span @click="rebackComment(item._id)">回复</span>
            <span v-show="item.uid == uid" @click="delComment(item._id)">删除</span>
          </div>
          <!-- 其它评论 -->
          <div class="otherComment" v-for="(comment, i) in item.otherPersonComments" :key="i">
            <div class="personName">
              <div class="commentheader">{{ comment.nickname.slice(0, 1) }}</div>
              <div class="commentNickname">{{ comment.nickname }}</div>
              <div class="commentTime">{{ comment.commentTime }}</div>
            </div>
            <div class="otherComments">{{ comment.comments }}</div>
            <div class="otherCommentsDel">
              <span
                v-show="comment.uid == uid"
                class="iconfont icon-cuowu11"
                @click="delMineComment(i, item._id)"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="github">
        <a
          class="iconfont icon-github4"
          href="https://github.com/boyyang-love"
          target="_blank"
          rel="noopener noreferrer"
          title="我的GitHub"
        ></a>
      </div>
      <div class="qq">
        <a
          class="iconfont icon-qq1"
          href
          target="_blank"
          rel="noopener noreferrer"
          title="QQ:1761617270"
        ></a>
      </div>
      <div class="email">
        <a
          class="iconfont icon-youxiang"
          href
          target="_blank"
          rel="noopener noreferrer"
          title="Email:1761617270@qq.com"
        ></a>
      </div>
    </div>
  </div>
  <!-- 登录界面 -->
  <div class="loginbox" v-show="isLoginBox">
    <div class="logBox animated swing">
      <div class="login-head">
        <div class="login-text">登录</div>
        <div class="iconfont icon-cuowu11" @click="isLoginBox = false"></div>
      </div>
      <div class="input-box">
        <div class="nickname">
          邮箱:
          <input type="text" name="email" v-model="email" placeholder="注册时邮箱" />
          <i class="iconfont icon-tuichu2" :style="{ color: Reg_email.test(email) ? '' : 'red' }"></i>
        </div>
        <div class="email">
          密码:
          <input type="password" name="password" v-model="password" placeholder="邮箱密码" />
          <i
            class="iconfont icon-tuichu2"
            :style="{ color: Reg_password.test(password) ? '' : 'red' }"
          ></i>
        </div>
      </div>
      <div class="message-submit">
        <div class="exit-submit" @click="isLoginBox = false">退出</div>
        <div class="login-submit" @click="logined">登录</div>
      </div>
    </div>
  </div>
  <!-- 评论回复模块 -->
  <div class="mask" v-show="isReback">
    <div class="alertBox">
      <div class="head">{{ rebackPersonName }}</div>
      <div class="reback">
        <textarea cols="30" rows="8" v-model="rebackCommentText"></textarea>
      </div>
      <div class="btn">
        <div class="back" @click="exitComment">退出</div>
        <div class="ok" @click="sureComment">回复</div>
      </div>
    </div>
  </div>
  <!-- 加载loading -->
  <div class="loading" v-show="isLoading">
    <Loading />
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import { reactive, toRefs } from "vue";
import Db from "./Db";
export default {
  name: "ContactDetail",
  components: {
    Loading
  },
  setup() {
    const state = reactive({
      beforeLogin: "先登录哦！！",
      commentText: "",
      isLogin: false,
      isLoginBox: false,
      nickname: "",
      password: "",
      email: "",
      commentDetail: [],
      isReback: false,
      rebackPersonName: "",
      rebackCommentText: "",
      rebackPersonId: "",
      isLoading: false,
      uid: ""
    });
    const db = new Db(state);

    // 昵称验证
    var Reg_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // 邮箱验证
    var Reg_password = /^.{6,18}$/;
    // 评论提交
    const submit = () => {
      if (state.commentText !== "") {
        db.submitComment();
      } else {
        alert("评论不能为空");
      }
    };
    // 点击登录事件
    const login = () => {
      state.isLoginBox = true;
    };
    // 退出登录事件
    const outlogin = () => {
      state.beforeLogin = "先登录哦！！";
      state.isLogin = false;
      db.outlogin();
    };
    // 登录事件
    const logined = () => {
      if (state.email !== "" && state.password !== "") {
        // 昵称以及邮箱验证
        if (Reg_email.test(state.email) && Reg_password.test(state.password)) {
          state.isLoading = true;
          db.signUp();
        } else {
          alert("请正确填写");
        }
      } else {
        alert("输入不能为空");
      }
    };
    // 删除评论事件
    const delComment = _id => {
      let r = confirm("是否删除该条评论");
      if (r == true) {
        db.delComment(_id);
      } else {
        return;
      }
    };
    // 回复评论事件
    const rebackComment = async _id => {
      db.rebackComment(_id);
    };
    // 退出回复界面
    const exitComment = () => {
      state.isReback = false;
    };
    // 回复确定事件
    const sureComment = () => {
      db.sureComment();
    };
    // 删除自己的子评论
    const delMineComment = (i, _id) => {
      // console.log(i, _id);
      db.delMineComment(i, _id);
    };

    return {
      ...toRefs(state),
      submit,
      login,
      logined,
      outlogin,
      Reg_email,
      Reg_password,
      delComment,
      rebackComment,
      exitComment,
      sureComment,
      delMineComment
    };
  }
};
</script>

<style scoped lang="less">
@center : {
  display: flex;
  justify-content: center;
  align-items: center;
};
@spacearound : {
  display: flex;
  justify-content: space-around;
  align-items: center;
};
@space: {
  display: flex;
  align-items: center;
};
.contactdetail {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #665757;
  border-radius: 10px;
  h1 {
    color: turquoise;
    justify-self: flex-start;
  }
  .contactMe {
    width: 100%;
    flex-direction: column;
    @center();
    .header {
      width: 150px;
      height: 150px;
      border-radius: 100%;
      margin-top: 30px;
      @center();
      border-radius: 100%;
      overflow: hidden;
      border: 3px solid whitesmoke;
      img {
        width: 200%;
      }
    }
    .name {
      font-size: 24px;
      color: white;
    }
    .textarea {
      width: 70%;
      height: 300px;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      box-sizing: border-box;
      overflow-y: hidden;
      position: relative;
      .login {
        width: 90%;
        height: 45px;
        @space();
        justify-content: space-between;
        border-bottom: 1px solid pink;
        .logFirst {
          @center();
          i {
            font-size: 45px;
            margin: 5px;
            color: plum;
          }
        }
        .toLogin,
        .outLogin {
          cursor: pointer;
        }

        .toLogin:hover,
        .outLogin:hover {
          color: red;
          text-decoration: underline;
        }
      }
      textarea {
        width: 90%;
        height: 170px;
        border: 1px solid pink;
        outline-color: #edd1d8;
      }
    }
    .submit {
      width: 15%;
      height: 40px;
      background-color: #fff;
      margin: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.6);
      cursor: pointer;
      @center();
    }
    .submit:hover {
      background-color: #21a675;
    }
    .comment {
      width: 75%;
      min-height: 160px;
      margin: 10px;
      display: flex;
      border-bottom: 2px solid #4c221b;
      .userIcon {
        width: 45px;
        height: 40px;
        border-radius: 100%;
        overflow: hidden;
        background-color: rgb(216, 114, 114);
        @center();
      }
      .commentMes {
        width: 100%;
        margin-left: 25px;
        .commentUser {
          font-size: 15px;
          color: #88ada6;
          .time {
            font-size: 14px;
            color: #808080;
            margin-left: 15px;
          }
        }
        .commentText {
          margin-top: 14px;
          font-size: 16px;
        }
        .reback {
          width: 145px;
          font-size: 13px;
          color: #4c8dae;
          margin: 15px;
          cursor: pointer;
          display: flex;
          justify-content: flex-start;
          span {
            margin-left: 25px;
          }
          span:hover {
            color: red;
          }
        }
        .otherComment {
          background-color: #f2ecde;
          border-radius: 10px;
          margin: 10px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.6);
          .personName {
            font-size: 15px;
            width: 100%;
            color: #003371;
            display: flex;

            .commentheader {
              width: 40px;
              height: 40px;
              background-color: #e29c45;
              border-radius: 100%;
              margin-top: 10px;
              @center();
            }
            div {
              margin-left: 15px;
              @center();
            }
          }
          .otherComments {
            margin: 10px 55px;
          }
          .otherCommentsDel {
            display: flex;
            justify-content: flex-end;
            padding: 15px;
            cursor: pointer;
            .iconfont {
              font-size: 20px;
              color: black;
            }
            .iconfont:hover {
              color: red;
            }
          }
        }
      }
    }
  }
  .content {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    div {
      margin-bottom: 45px;
      a {
        font-size: 50px;
        margin: 40px 40px;
        cursor: pointer;
        text-decoration: none;
        color: whitesmoke;
      }
      a:hover {
        color: burlywood;
      }
    }
  }
}
// 登录样式
.loginbox {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  @center();
  .logBox {
    width: 45%;
    height: 90%;
    background-color: #a4e2c6;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .login-head {
      width: 100%;
      height: 10%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        margin: 15px;
      }
      .iconfont {
        font-size: 24px;
        cursor: pointer;
      }
      .iconfont:hover {
        color: red;
      }
    }
    .input-box {
      width: 95%;
      height: 50%;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.6);
      @center();
      flex-direction: column;
      div {
        width: 95%;
        height: 20%;
        border: 1px solid #bacac6;
        margin: 10px;
        @center();
        input {
          width: 75%;
          height: 95%;
          border: none;
          outline: none;
          margin-left: 25px;
          font-size: 20px;
        }
        i {
          font-size: 24px;
          color: seagreen;
        }
      }
      // .nickname {
      // }
      // .email {
      // }
    }
    .message-submit {
      width: 95%;
      height: 60px;
      margin-top: 25px;
      @spacearound();
      div {
        width: 45%;
        height: 100%;
        border-radius: 10px;
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.6);
        cursor: pointer;
        @center();
      }
      div:hover {
        background-color: salmon;
      }
      .exit-submit {
        background-color: #1bd1a5;
      }
      .login-submit {
        background-color: #2add9c;
      }
    }
  }
}
// 评论回复样式
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  @center();
  background: rgba(0, 0, 0, 0.6);
  .alertBox {
    width: 30%;
    height: 200px;
    background-color: #88ada6;
    position: fixed;
    top: 200px;
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .head {
      width: 100%;
      height: 20px;
      margin: 10px 0;
      @center();
    }
    textarea {
      width: 100%;
    }
    .btn {
      width: 90%;
      display: flex;
      justify-content: space-around;
      div {
        width: 25%;
        height: 25px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.6);
        border-radius: 4px;
        cursor: pointer;
        @center();
      }
      div:hover {
        background-color: #ff4777;
      }
    }
  }
}
//loading 样式

.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  @center();
}
@media screen and(max-width: 600px) {
  .contactdetail {
    .contactMe {
      .header {
        img {
          width: 200%;
        }
      }
      .textarea {
        height: 200px;
        width: 100%;
        textarea {
          width: 85%;
          height: 60%;
        }
      }
      .submit {
        width: 45%;
      }
      .comment {
        width: 99%;
        .userIcon {
          width: 40px;
          height: 40px;
        }
        .commentMes {
          width: 85%;
          margin-left: 5px;
          .otherComment {
            margin: 5px 0;
            .personName {
              .commentheader {
                margin: 2px;
              }
              .commentNickname {
                margin-left: 3px;
              }
            }
            .otherComments {
              margin: 2px 5px;
              word-break: break-word;
            }
          }
        }
      }
    }
  }
  .loginbox {
    .logBox {
      width: 97%;
    }
  }
  .mask {
    .alertBox {
      width: 90%;
    }
  }
}
</style>
