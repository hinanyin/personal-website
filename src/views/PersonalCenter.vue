<template>
  <div class="personalcenter">
    <div class="header">
      <div class="welcome">
        <i class="iconfont icon-kongjian2" @click="rebackStyle"></i>
        欢迎{{ userMes.nickname }}来到你的个人空间
      </div>
      <div class="toHome">
        <i class="iconfont icon-shouye" @click="$router.push('/')"></i>
      </div>
    </div>
    <div class="content">
      <div class="userMes animated slideInRight" v-show="isShow">
        <span class="hidden iconfont icon-back" @click="changeStyle"></span>
        <span class="setting iconfont icon-shezhi3" @click="isShowChangeBox = !isShowChangeBox"></span>
        <div class="headerImg">
          <div class="img" @click="isChangeImg = !isChangeImg">
            <img :src="userMes.avatarUrl" alt />
          </div>
        </div>
        <div class="input" v-show="isChangeImg">
          <input type="file" ref="fileUrl" />
          <button @click="uploadImg">上传</button>
        </div>
        <div class="nickname">
          <div class="name">{{ userMes.nickname }}</div>
        </div>
        <div class="motto">
          <span>{{ userMes.motto }}</span>
        </div>
        <div class="contact">
          QQ:
          <span>{{ userMes.QQ }}</span>
        </div>
        <div class="card">
          <div class="card1">
            <span>添加</span>
            <i class="iconfont icon-zhongxindongtai" @click="addNews = !addNews"></i>
            <span>动态</span>
          </div>
          <div class="card2">
            <span>其它</span>
            <i class="iconfont icon-tubiaosvg-" @click="$router.push('/wechatMonents')"></i>
            <span>动态</span>
          </div>
        </div>
        <!-- alert box -->
        <div class="alertBox animated slideInDown" v-show="isShowChangeBox">
          <div class="exitLogin" @click="exitLogin">退出登录</div>
          <div class="changeNickname">
            <span>昵称:</span>
            <input type="text" v-model="userMes.nickname" />
          </div>
          <div class="changeMotto">
            <span>签名:</span>
            <input type="text" v-model="userMes.motto" />
          </div>
          <div class="changeQQ">
            <span>QQ:</span>
            <input type="text" v-model="userMes.QQ" />
          </div>
          <div class="btn">
            <div class="exitBtn" @click="isShowChangeBox = false">退出</div>
            <div class="sureBtn" @click="submitChange">确定</div>
          </div>
        </div>
      </div>
      <div class="myShows" ref="content">
        <div class="shows" v-for="(item, i) in centerNews" :key="i">
          <div class="del iconfont icon-nb-" @click="del(item._id)"></div>
          <div class="head">
            <div class="head_img">
              <img src="../assets/img/youuu.jpg" v-lazy="userMes.avatarUrl" alt />
            </div>
            <div class="head_name">{{ item.nickname }}</div>
            <div class="head_time">{{ item.time }}</div>
          </div>
          <div class="shows_content">
            <div class="text">{{ item.text }}</div>
          </div>
          <div class="shows_img">
            <div class="img" v-show="item.img != ''">
              <img src="../assets/img/mafia动漫5k壁纸_彼岸图网.jpg" v-lazy="item.img" alt />
            </div>
          </div>
          <div class="comment"></div>
        </div>
      </div>
      <!-- loading -->
      <div class="loading" v-show="isLoading">
        <div class="box">
          <div class="circle">
            <div class="movecircle"></div>
            <div class="innerCircle"></div>
          </div>
          <div class="mes">~~~~{{ loadingText }}~~~~</div>
        </div>
      </div>
      <!-- 添加动态弹窗 -->
      <div class="alert_box animated pulse" v-show="addNews">
        <div class="box_head">{{ userMes.nickname }}</div>
        <div class="box_input">
          <textarea name id cols="30" rows="10" v-model="centerText"></textarea>
        </div>
        <div class="box_img">
          添加
          <input type="file" name id ref="imgFileUrl" />
          图片
          <i class="iconfont icon--1"></i>
        </div>
        <div class="box_btn">
          <div class="btn_exit" @click="addNews = false">退出</div>
          <div class="btn_ok" @click="submitNews">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import Database from "@/utils/testDb.js";
export default {
  name: "PersonalCenter",
  components: {},
  setup() {
    const state = reactive({
      isShow: true,
      id: "",
      fileUrl: ref(null),
      imgFileUrl: ref(null),
      centerText: "",
      headImg: "",
      isChangeImg: false,
      isShowChangeBox: false,
      loadingText: "文件上传中",
      isLoading: false,
      userMes: "",
      addNews: false,
      centerNews: "",
      content: ref(null)
    });

    const database = new Database(state);
    const router = useRouter();
    state.id = router.currentRoute.value.params.id;
    // 获取基本信息
    database.getMes();
    // 获取动态内容
    database.getNews(state.id);

    // 更换头像
    const uploadImg = () => {
      database.uploadImg();
    };
    // 更新基本信息
    const submitChange = () => {
      database.changeMes();
    };
    // 提交动态
    const submitNews = () => {
      database.submitNews(
        state.id,
        state.centerText,
        state.imgFileUrl.files[0]
      );
    };
    // 改变动态栏的宽度样式
    const changeStyle = () => {
      state.isShow = false;
      state.content.style.width = "100%";
    };
    const rebackStyle = () => {
      state.isShow = true;
      if (window.innerWidth < 600) {
        state.content.style.width = "100%";
      } else {
        state.content.style.width = "70%";
      }
    };
    // 删除个人动态
    const del = _id => {
      database.delNews(_id);
    };

    const exitLogin = () => {
      database.exitLogin();
    };

    return {
      ...toRefs(state),
      uploadImg,
      submitChange,
      submitNews,
      changeStyle,
      rebackStyle,
      del,
      exitLogin
    };
  }
};
</script>

<style scoped lang="less">
@center: {
  display: flex;
  justify-content: center;
  align-items: center;
};
@spaceAround: {
  display: flex;
  justify-content: space-around;
  align-items: center;
};
@end: {
  display: flex;
  justify-content: space-between;
  align-items: center;
};
@start: {
  display: flex;
  align-items: center;
  justify-content: flex-start;
};
.personalcenter {
  z-index: 30;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #eedeb0;
  .header {
    width: 100%;
    height: 60px;
    position: sticky;
    top: 0;
    background: rgba(188, 230, 114, 0.7);
    @end();
    div {
      @center();
      margin: 0 45px;
      @media screen and(max-width: 600px) {
        margin: 0;
      }
      .iconfont {
        margin: 0 15px;
        font-size: 35px;
        color: #177cb0;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
      &.toHome {
        cursor: pointer;
        .iconfont:hover {
          color: #ed5736;
        }
      }
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    align-items: center;
    flex-direction: row;
    @media screen and(max-width: 600px) {
      height: 100%;
      height: 1000px;
      flex-direction: column;
      overflow-y: scroll;
    }
    .userMes {
      width: 25%;
      height: 95%;
      background-color: rgba(51, 83, 121, 0.8);
      box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.6);
      margin: 10px;
      border-radius: 10px;
      position: relative;
      @center();
      flex-direction: column;
      @media screen and(max-width: 600px) {
        width: 95%;
        height: 500px;
      }
      .hidden,
      .setting {
        width: 25px;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
      .setting {
        top: 10px;
        left: 10px;
      }
      .headerImg {
        width: 100%;
        height: 125px;
        @center();
        .img {
          width: 95px;
          height: 95px;
          border: 2px solid red;
          border-radius: 100%;
          overflow: hidden;
          @center();
          cursor: pointer;
          img {
            height: 95px;
          }
        }
      }
      .nickname {
        width: 100%;
        height: 45px;
        @center();
      }
      .input {
        width: 100%;
        @center();
        input {
          @center();
        }
      }
      .motto {
        width: 90%;
        height: 15%;
        font-size: 14px;
        margin: 10px 0;
        @center();
        background-color: #fff;
        box-shadow: 2px 3px 2px 0 rgba(0, 0, 0, 0.4);
        border-radius: 10px;
        span {
          margin: 4px;
          color: rgb(131, 36, 36);
        }
      }
      .contact {
        width: 90%;
        height: 5%;

        font-size: 17px;
        box-sizing: border-box;
        border-radius: 4px;
        box-sizing: border-box;
        @center();
        span {
          font-size: 15px;
          margin: 0 15px;
        }
      }
      .card {
        width: 100%;
        height: 45%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        div {
          width: 90%;
          height: 30%;
          background-color: #fff;
          box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.6);
          border-radius: 10px;
        }
        .card1,
        .card2 {
          @center();
          .iconfont {
            font-size: 35px;
            cursor: pointer;
            color: rgb(139, 204, 139);
            &:hover {
              color: red;
            }
          }
        }
      }
      .alertBox {
        width: 100%;
        height: 75%;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 10;
        background-color: rgb(69, 148, 86);
        border-radius: 0 0 10px 10px;
        @center();
        flex-direction: column;
        .exitLogin {
          position: absolute;
          top: 0;
          right: 0;
          margin: 10px;
          color: white;
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
        .changeNickname,
        .changeMotto,
        .changeQQ {
          width: 95%;
          height: 15%;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.8);
          margin: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            margin: 10px;
            font-size: 14px;
          }
          input {
            outline: none;
            border: none;
            height: 90%;
            width: 80%;
            font-size: 15px;
            margin: 2px;
          }
        }
        .btn {
          width: 100%;
          height: 15%;
          background-color: none;
          @center();
          .exitBtn,
          .sureBtn {
            width: 40%;
            height: 80%;
            margin: 0 15px;
            border-radius: 10px;
            background: #e29c45;
            cursor: pointer;
            box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
            @center();
            &:hover {
              background-color: #a78e44;
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
      z-index: 10;
      .box {
        width: 100%;
        height: 100%;
        @center();
        flex-direction: column;
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
    .myShows {
      width: 70%;
      height: 95%;
      border-radius: 10px;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
      overflow-y: scroll;
      display: flex;
      align-items: center;
      flex-direction: column;
      @media screen and(max-width: 600px) {
        width: 95%;
      }
      .shows {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.4);
        width: 75%;
        margin: 20px 0;
        position: relative;
        @media screen and(max-width: 600px) {
          width: 100%;
        }
        .del {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 24px;
          color: black;
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
        .head {
          display: flex;
          align-items: center;
          .head_img {
            width: 100px;
            height: 100px;
            border-radius: 100%;
            margin: 5px;
            border: 2px solid white;
            overflow: hidden;
            @center();
            @media screen and(max-width: 600px) {
              width: 75px;
              height: 75px;
            }
            img {
              width: 180%;
            }
          }
          .head_name {
            color: rgb(119, 27, 27);
            font-size: 24px;
            margin: 0 20px;
            @media screen and(max-width: 600px) {
              font-size: 18px;
              margin: 0 5px;
            }
          }
          .head_time {
            color: rgba(207, 121, 106, 0.671);
            font-size: 18px;
            @media screen and(max-width: 600px) {
              font-size: 15px;
            }
          }
        }
        .shows_content {
          width: 100%;
          @center();
          .text {
            width: 75%;
            margin: 25px;
            @media screen and(max-width: 600px) {
              margin: 6px 5px;
            }
          }
        }
        .shows_img {
          width: 100%;
          @center();
          .img {
            width: 90%;
            @start();
            margin: 20px 0;
            @media screen and(max-width: 600px) {
              font-size: 18px;
              margin: 10px 5px;
            }
            img {
              box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
              width: 75%;
              border-radius: 5px;
              border: 1px solid rgb(49, 155, 155);
              @media screen and(max-width: 600px) {
                width: 75%;
              }
            }
          }
        }
      }
    }
    .alert_box {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 45%;
      height: 65%;
      border-radius: 10px;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
      background-color: rgba(131, 36, 36, 0.8);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      @media screen and(max-width: 600px) {
        width: 95%;
      }
      .box_head {
        width: 100%;
        height: 15%;
        color: whitesmoke;
        @center();
      }
      .box_input {
        width: 100%;
        height: 35%;
        overflow: hidden;
        border-radius: 5px;
        @center();
        textarea {
          width: 85%;
          height: 100%;
          outline: none;
          border-radius: 5px;
        }
      }
      .box_img {
        @center();
        width: 100%;
        height: 25%;
        position: relative;
        @center();
        color: white;
        input {
          outline: none;
          opacity: 0;
          z-index: 3;
          width: 50px;
          height: 50px;
          cursor: pointer;
        }
        input:hover + .iconfont {
          color: red;
        }
        .iconfont {
          position: absolute;
          font-size: 34px;
          cursor: pointer;
        }
      }
      .box_btn {
        width: 100%;
        height: 25%;
        @center();
        div {
          width: 20%;
          height: 45%;
          background-color: #fff;
          margin: 0 25px;
          cursor: pointer;
          border-radius: 5px;
          box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.4);
          @center();
          &:hover {
            background-color: rgb(28, 161, 88);
          }
        }
      }
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
