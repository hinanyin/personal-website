<template>
  <div class="resume">
    <div class="header">
      <div class="img">
        <img src="@/assets/img/boyyang.jpg" alt />
      </div>
      <div class="nickname">boyyang</div>
    </div>
    <div class="personal-information">
      <div class="basic-information">
        <span class="title">基本信息</span>
        <div class="name">姓名: 杨志豪</div>
        <div class="sex">性别: 男</div>
        <div class="school">学校: 四川文理学院</div>
        <div class="major">专业: 机械电子工程(本科)</div>
      </div>
      <div class="contact-information">
        <span class="title">联系方式</span>
        <div class="phoneNumber">电话: 13183505856</div>
        <div class="qq">QQ: 1761617270</div>
        <div class="github">
          GitHub:
          <a
            href="https://github.com/boyyang-love"
            target="_blank"
            rel="noopener noreferrer"
            style="color: #e9e7ef"
            >https://github.com/boyyang-love</a
          >
        </div>
        <div class="gitee">
          Gitee:
          <a
            href="https://gitee.com/boyyanglove"
            target="_blank"
            rel="noopener noreferrer"
            style="color: #e9e7ef"
            >https://gitee.com/boyyanglove</a
          >
        </div>
      </div>
      <div class="skills">
        <span class="title">技能掌握</span>
        <div class="s1">1.Html,Css,Css3,Jquery,JavaScript</div>
        <div class="s2">2.Vue, Vue-cli, Vue-router, VueX</div>
        <div class="s3">3.Uni-app, node.js, express, mongodb</div>
        <div class="s4">4.Git, WebPack</div>
      </div>
      <div class="shows">
        <span class="title">个人作品以及个人博客</span>
        <div class="sh1">
          <a
            href="http://boyyanglove.gitee.io/web-music/#/findMusic"
            target="_blank"
            rel="noopener noreferrer"
            >web在线音乐</a
          >
        </div>
        <div class="sh2">
          <a
            href="http://boyyanglove.gitee.io/vue3.0study/#/"
            target="_blank"
            rel="noopener noreferrer"
            >music</a
          >
        </div>
        <div class="sh3">
          <a
            href="http://boyyanglove.gitee.io/todolist/#/"
            target="_blank"
            rel="noopener noreferrer"
            >ToDolist</a
          >
        </div>
        <div class="sh4">
          <a
            href="https://www.cnblogs.com/boyyangD/"
            target="_blank"
            rel="noopener noreferrer"
            >个人博客</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Resume"
};
</script>

<style scoped lang="less">
@center: {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
};
.resume {
  width: 100%;
  background-color: #7bcfa6;
  border-radius: 5px;
  @center();
  .header {
    width: 100%;
    @center();
    .img {
      width: 150px;
      height: 150px;
      border-radius: 100%;
      border: 3px solid whitesmoke;
      @center();
      overflow: hidden;
      img {
        width: 100%;
        transform: scale(1.9);
      }
    }
    .nickname {
      font-size: 28px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      color: rgb(161, 73, 46);
      background-color: #fff;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.6);
      border-radius: 4px;
      margin: 10px;
    }
  }
  .personal-information {
    width: 98%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .basic-information,
    .contact-information,
    .skills,
    .shows {
      width: 45%;
      height: 200px;
      background-color: #fff;
      margin: 20px;
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
      border-radius: 6px;
    }
    .basic-information,
    .contact-information,
    .skills,
    .shows {
      display: flex;
      justify-content: center;
      @center();
      overflow: hidden;
      position: relative;
      .title {
        position: absolute;
        left: 25px;
        width: 8%;
        height: 100%;
        background-color: #177cb0;
        font-size: 16px;
        text-align: center;
        @center();
      }
      div {
        width: 95%;
        height: 45px;
        border-radius: 5px;
        box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.6);
        margin: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        transform: translateX(90%);
        transition: all 2s ease;
        cursor: pointer;
        a {
          text-decoration: none;
          color: white;
        }
        a:hover {
          color: black;
        }
      }
      div:hover {
        transform: translateX(0px);
      }
      div:nth-child(5) {
        background-color: #139c73;
      }
      div:nth-child(2) {
        background-color: #00e09e;
      }
      div:nth-child(3) {
        background-color: #f35336;
      }
      div:nth-child(4) {
        background-color: #003371;
      }
    }
    .contact-information {
    }
  }
}

@media screen and (max-width: 600px) {
  .resume {
    .personal-information {
      .basic-information,
      .contact-information,
      .skills,
      .shows {
        width: 97%;
        height: 200px;
        background-color: #fff;
        margin: 20px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
        border-radius: 6px;
      }
      .basic-information,
      .contact-information,
      .skills,
      .shows {
        .title {
          width: 10%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        div {
          width: 95%;
          height: 45px;
          transform: translateX(85);
        }
      }
    }
  }
}
</style>
