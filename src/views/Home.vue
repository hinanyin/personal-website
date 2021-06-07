<template>
  <div class="home">
    <div class="loading" v-show="isLoading">
      <Loading />
    </div>
    <div class="exit iconfont icon-icon1" @click="hiddenNav"></div>
    <div class="nav" v-show="isShow">
      <ul>
        <li @click="routeJumb('/')" class="active">
          <i class="iconfont icon-shouye3"></i>Home
        </li>
        <li @click="routeJumb('music')">
          <i class="iconfont icon-yinle"></i>Music
        </li>
        <li @click="routeJumb('center')">
          <i class="iconfont icon-tubiaosvg-"></i>Center
        </li>
        <li @click="routeJumb('contact')">
          <i class="iconfont icon-41shuoshuo"></i>Contact
        </li>
        <li @click="routeJumb('about')">
          <i class="iconfont icon-guanyuwomen"></i>About
        </li>
      </ul>
    </div>
    <div class="other">
      <div class="blog">
        <a href="https://www.cnblogs.com/boyyangD/" target="_blank" rel="noopener noreferrer">我的博客</a>
      </div>
      <div class="github">
        <a
          href="https://github.com/boyyang-love"
          target="_blank"
          rel="noopener noreferrer"
          class="iconfont icon-github"
        >GitHub</a>
      </div>
      <!-- <div class="chatRoom" @click="routeJumb('chatRoom')">聊天室</div> -->
      <div class="chatRoom" @click="openMess">聊天室</div>
      <test-modal :dialogVisible="openmess" @close="closeMess"></test-modal>
    </div>
    <div class="changeBg">
      <i class="iconfont icon-shezhi3" @click="changeBg"></i>
    </div>
    <div class="alert animated tada" v-show="isAlert">
      <div class="alert_title">更改背景图片</div>
      <div class="alert_icon">
        <i class="iconfont icon-tianjia"></i>
        <input type="file" ref="file" />
      </div>
      <div class="alert_btn">
        <div class="btnExit" @click="isAlert = flase">取消</div>
        <div class="btnSure" @click="submitFile">确定</div>
      </div>
    </div>
    <div class="todolist" @click="isShowTodolist = !isShowTodolist">TODO</div>
    <div class="todolistBox animated fadeInUp" v-show="isShowTodolist">
      <div class="controller">
        <i class="iconfont icon-xiangxiajiantou1" @click="isShowTodolist = false"></i>
      </div>
      <div class="lists">
        <ul>
          <li v-for="(item, i) in todolists" :key="i">
            <div class="checkbox">
              <input type="checkbox" v-model="item.checked" @click="doOver(i)" />
            </div>
            <div :class="['content',{hasDone:item.checked}]">{{item.text}}</div>
            <div class="del">
              <i class="iconfont icon-nb-" @click="del(i)"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="addLists">
        <input type="text" placeholder="New Todo" v-model="todotext" @keyup.enter="add" />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import { reactive, toRefs, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ChangBg from "@/utils/changeBg.js";
import Todo from "@/utils/todolist.js";
import testModal from "./testModal";
export default {
  name: "Home",
  components: {
    Loading,
    testModal
  },
  setup() {
    const state = reactive({
      isShow: true,
      isAlert: false,
      isLoading: false,
      isShowTodolist: false,
      file: ref(null),
      todotext: "",
      bg: [
        require("../assets/img/鬼灭之刃蝴蝶忍4k高清电脑壁纸3840x2160_彼岸图网.jpg")
      ],
      todolists: [
        { checked: true, text: "吃饭" },
        { checked: false, text: "睡觉" },
        { checked: false, text: "打豆豆" },
        { checked: false, text: "睡觉" }
      ],
      openmess: false
    });
    const router = useRouter();
    const CB = new ChangBg(state);
    const todolist = new Todo(state);

    // 路由跳转
    let routeJumb = path => {
      router.push(path);
    };
    // 隐藏菜单栏
    const hiddenNav = () => {
      state.isShow = !state.isShow;
    };
    // 更改背景
    const changeBg = () => {
      CB.userChangeBg();
    };

    // 提交图片
    const submitFile = () => {
      if (state.file.files[0] == undefined) {
        alert("图片不能为空");
      } else {
        CB.submitBg(state.file.files[0]);
      }
    };
    // 添加待做事件
    const add = () => {
      if (state.todotext.trim() == "") {
        alert("输入不能为空");
      } else {
        todolist.addTodo(state.todotext);
      }
    };
    // 删除待做事件
    const del = i => {
      todolist.delTodo(i);
    };
    // 做完
    const doOver = i => {
      todolist.doOver(i);
    };

    onMounted(() => {
      window.shortcuts.at("home");
      window.shortcuts.add(['ctrl', 's'], ctrls);
      window.shortcuts.add('tab', tab);
    });

    const tab = () => {
      routeJumb('music');
    };

    const ctrls = () => {
      console.log("ctrls");
    };

    const openMess = () => {
      state.openmess = true;
    };

    const closeMess = () => {
      state.openmess = false;
    };

    return {
      ...toRefs(state),
      routeJumb,
      hiddenNav,
      changeBg,
      submitFile,
      add,
      del,
      doOver,
      openMess,
      closeMess
    };
  }
};
</script>

<style scoped lang="less">
.active {
  background-color: rgba(185, 31, 31, 0.6);
}
.hasDone {
  background-color: rgba(233, 233, 233, 0.6);
  text-decoration-line: line-through;
  text-decoration-color: red;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
@center: {
  display: flex;
  justify-content: center;
  align-items: center;
};
.home {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  @media screen and(max-width: 600px) {
    height: 660px;
  }
  .loading {
    z-index: 4;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(133, 125, 115, 0.6);
  }
  .todolist {
    position: absolute;
    left: 65px;
    bottom: 15px;
    font-weight: bold;
    cursor: pointer;
    color: chartreuse;
    &:hover {
      color: red;
    }
  }
  .todolistBox {
    width: 350px;
    min-height: 138px;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 15px;
    bottom: 45px;
    border-radius: 6px;
    .controller {
      width: 100%;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .iconfont {
        color: whitesmoke;
        font-size: 20px;
        margin: 0 10px;
        cursor: pointer;
        &:hover {
          color: pink;
        }
      }
    }
    .lists {
      width: 100%;
      ul {
        width: 100%;
        margin-bottom: 35px;
        li {
          padding: 0 10px;
          display: flex;
          align-items: center;
          margin: 5px 0;
          position: relative;
          &:hover {
            background: rgba(0, 0, 0, 0.8);
          }
          &:hover > .del > .iconfont {
            display: block;
          }
          .checkbox {
            width: 12px;
            height: 12px;
            margin: 0 5px;
            cursor: pointer;
            @center();
          }
          .content {
            color: whitesmoke;
            padding: 0 15px;
          }
          .del {
            height: 100%;
            position: absolute;
            right: 10px;
            color: whitesmoke;
            @center();
            .iconfont {
              display: none;
              font-size: 20px;
              cursor: pointer;
              &:hover {
                color: red;
              }
            }
          }
        }
      }
    }
    .addLists {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      @center();
      input {
        width: 85%;
        height: 100%;
        padding: 0 15px;
        border: none;
        outline: none;
        background: none;
        color: white;
      }
    }
  }

  .exit {
    display: none;
    @media screen and(max-width: 600px) {
      width: 100%;
      height: 50px;
      display: block;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .nav {
    width: 95%;
    height: 75px;
    background: rgba(133, 86, 86, 0.6);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.6);
    margin-top: 10px;
    border-radius: 5px;
    @media screen and(max-width: 600px) {
      height: 60%;
    }
    ul {
      width: 100%;
      height: 100%;
      @center();
      @media screen and(max-width: 600px) {
        flex-direction: column;
      }
      li {
        flex: 1;
        height: 100%;
        font-size: 20px;
        cursor: pointer;
        border-radius: 5px;
        color: whitesmoke;
        @center();
        &:hover {
          background-color: rgba(24, 21, 21, 0.6);
        }
        @media screen and(max-width: 600px) {
          width: 100%;
        }
        i {
          font-size: 24px;
          margin: 5px;
        }
      }
    }
  }
  .other {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
    height: 40%;
    @center();
    flex-direction: column;
    @media screen and(max-width: 600px) {
      height: 25%;
      width: 100%;
      bottom: 55px;
    }
    div {
      width: 45%;
      height: 20%;
      background-color: #fff;
      margin: 10px;
      box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.6);
      border-radius: 10px;
      cursor: pointer;
      @center();
      a {
        font-size: 18px;
        margin: 3px;
        text-decoration: none;
        @media screen and(max-width: 600px) {
          font-size: 16px;
        }
      }
      &:hover {
        background-color: rgb(48, 129, 84);
      }
    }
  }
  .changeBg {
    position: absolute;
    bottom: 10px;
    .iconfont {
      font-size: 35px;
      color: orange;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .alert {
    position: absolute;
    bottom: 75px;
    width: 400px;
    height: 200px;
    background-color: #fff;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .alert_title {
      width: 100%;
      height: 20%;
      background-color: rgb(12, 98, 168);
      border-radius: 10px 10px 0 0;
      @center();
    }
    .alert_icon {
      width: 100%;
      height: 50%;
      position: relative;
      @center();
      .iconfont {
        font-size: 40px;
      }
      input {
        width: 40px;
        height: 40px;
        cursor: pointer;
        overflow: hidden;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        z-index: 2;
        &:hover + .iconfont {
          color: red;
        }
      }
    }
    .alert_btn {
      width: 100%;
      height: 35%;
      @center();
      div {
        width: 30%;
        height: 65%;
        background-color: rgb(77, 1, 1);
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.6);
        cursor: pointer;
        margin: 0 10px;
        color: white;
        border-radius: 5px;
        @center();
        &:hover {
          background-color: rgb(85, 165, 85);
        }
      }
    }
  }
}
</style>
