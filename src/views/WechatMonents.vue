<template>
  <div class="wechatmonents">
    <div class="exit">
      <i class="iconfont icon-tuichu_huaban1" @click="$router.back(1)"></i>
    </div>
    <div class="content">
      <div class="shows" v-for="item in news" :key="item._id" v-show="item.img">
        <div class="header">
          <span>{{ item.nickname }}</span>
          <span>{{ item.time }}</span>
        </div>
        <div class="text_img">
          <div class="text">{{ item.text }}</div>
          <div class="img">
            <img src="../assets/img/鬼灭之刃蝴蝶忍4k高清电脑壁纸3840x2160_彼岸图网.jpg" v-lazy="item.img" alt />
          </div>
        </div>
        <!-- <div class="download">
          <i
            class="iconfont icon-xiazai11"
            @click="download(item.DownloadId)"
          ></i>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import WechatMonents from "@/utils/wechatMonents";
import { onMounted, reactive, toRefs } from "vue";
export default {
  name: "WechatMonents",
  setup() {
    const state = reactive({
      news: ""
    });
    const wm = new WechatMonents(state);

    onMounted(() => {
      wm.getAllNews();
    });

    // const download = id => {
    //   wm.download(id);
    // };

    return {
      ...toRefs(state)
      // download
    };
  }
};
</script>

<style lang="less" scoped>
@center: {
  display: flex;
  justify-content: center;
  align-items: center;
};
@right: {
  display: flex;
  justify-content: flex-end;
  align-items: center;
};
.wechatmonents {
  width: 100%;
  height: 100vh;
  .exit {
    width: 100%;
    height: 10%;
    background: rgba(0, 0, 0, 0.5);
    @right();
    .iconfont {
      font-size: 28px;
      margin: 0 25px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .content {
    width: 100%;
    height: 500px;
    overflow-y: scroll;
    // @center();
    display: flex;
    align-items: center;
    flex-direction: column;
    .shows {
      margin: 25px 0;
      width: 75%;
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.5);
      position: relative;
      @media screen and(max-width: 600px) {
        width: 100%;
      }
      .header {
        width: 100%;
        height: 45px;
        @center();
        margin: 25px 0;
        @media screen and(max-width: 600px) {
          margin: 10px 0;
        }
        span {
          margin: 0 45px;
          @media screen and(max-width: 600px) {
            margin: 0 10px;
          }
        }
      }
      .text_img {
        width: 100%;
        @center();
        flex-direction: column;
        .text {
          width: 100%;
          margin: 10px 0;
          @center();
        }
        .img {
          width: 100%;
          margin: 20px 0;
          @center();
          img {
            width: 75%;
          }
        }
      }
      .download {
        position: absolute;
        right: 10px;
        bottom: 15px;
        .iconfont {
          font-size: 34px;
          cursor: pointer;
          @media screen and(max-width: 600px) {
            font-size: 24;
          }
          &:hover {
            color: red;
          }
        }
      }
    }
  }
}
</style>
