<template>
  <div class="content" v-show="allMes != ''">
    <div class="title">
      星座运势
      <span class="change" @click="isShowAlert = !isShowAlert"
        >({{ defauleName }})</span
      >
    </div>
    <div class="img">
      <img src="@/assets/img/黄昏星空.png" alt />
    </div>
    <div class="alert animated bounceInDown" v-show="isShowAlert">
      <ul>
        <li v-for="(item, i) in list" :key="i" @click="change(i)">
          <i :class="item.iconfont"></i>
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="mes">
      <div class="timeBtn">
        <div
          :class="{ active: active == 'today' }"
          @click="changeTime('today')"
        >
          今日运势
        </div>
        <div
          :class="{ active: active == 'tomorrow' }"
          @click="changeTime('tomorrow')"
        >
          明日运势
        </div>
        <div :class="{ active: active == 'week' }" @click="changeTime('week')">
          本周运势
        </div>
        <div
          :class="{ active: active == 'month' }"
          @click="changeTime('month')"
        >
          本月运势
        </div>
      </div>
      <div class="mesDetail">
        <div class="today_detail" v-show="active == 'today'">
          <div class="point">
            <div class="all">综合指数:{{ allMes.all }}</div>
            <div class="health">健康指数:{{ allMes.health }}</div>
            <div class="love">爱情指数:{{ allMes.love }}</div>
            <div class="money">财富指数:{{ allMes.money }}</div>
            <div class="number">幸运数字:{{ allMes.number }}</div>
            <div class="work">工作指数:{{ allMes.work }}</div>
            <div class="color">幸运颜色:{{ allMes.color }}</div>
            <div class="QFriend">速配星座:{{ allMes.QFriend }}</div>
          </div>
          <div class="summary">
            <h5>今日概述</h5>
            <p>{{ allMes.summary }}</p>
          </div>
        </div>
        <div class="tomorrow_detail" v-show="active == 'tomorrow'">
          <div class="point">
            <div class="all">综合指数:{{ allMes.all }}</div>
            <div class="health">健康指数:{{ allMes.health }}</div>
            <div class="love">爱情指数:{{ allMes.love }}</div>
            <div class="money">财富指数:{{ allMes.money }}</div>
            <div class="number">幸运数字:{{ allMes.number }}</div>
            <div class="work">工作指数:{{ allMes.work }}</div>
            <div class="color">幸运颜色:{{ allMes.color }}</div>
            <div class="QFriend">速配星座:{{ allMes.QFriend }}</div>
          </div>
          <div class="summary">
            <h5>明日概述</h5>
            <p>{{ allMes.summary }}</p>
          </div>
        </div>
        <div class="week_detail" v-show="active == 'week'">
          <div class="job">{{ allMes.job }}</div>
          <div class="love">{{ allMes.love }}</div>
          <div class="money">{{ allMes.money }}</div>
          <div class="work">{{ allMes.work }}</div>
        </div>
        <div class="month_detail" v-show="active == 'month'">
          <div class="all">{{ allMes.all }}</div>
          <div class="love">{{ allMes.love }}</div>
          <div class="health">{{ allMes.health }}</div>
          <div class="money">{{ allMes.money }}</div>
          <div class="work">{{ allMes.work }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import Http from "@/utils/http";
export default {
  name: "Constellation",
  setup() {
    const state = reactive({
      isShowAlert: false,
      defauleName: "白羊座",
      list: [
        { name: "白羊座", iconfont: "iconfont icon-aries" },
        { name: "金牛座", iconfont: "iconfont icon-taurus" },
        { name: "双子座", iconfont: "iconfont icon-gemini" },
        { name: "巨蟹座", iconfont: "iconfont icon-cancer" },
        { name: "狮子座", iconfont: "iconfont icon-leo" },
        { name: "处女座", iconfont: "iconfont icon-virgo" },
        { name: "天秤座", iconfont: "iconfont icon-libra" },
        { name: "天蝎座", iconfont: "iconfont icon-scorpio" },
        { name: "射手座", iconfont: "iconfont icon-sagittarius" },
        { name: "摩羯座", iconfont: "iconfont icon-mojiezuo" },
        { name: "水瓶座", iconfont: "iconfont icon-aquarius" },
        { name: "双鱼座", iconfont: "iconfont icon-pisces" }
      ],
      active: "today",
      allMes: ""
    });
    const http = new Http(state);

    const change = async i => {
      state.defauleName = state.list[i].name;
      state.isShowAlert = false;
      const res = await http.get(
        "http://web.juhe.cn:8080/constellation/getAll",
        {
          key: "477469c470445e5af4e6f48c957f3cec",
          consName: state.defauleName,
          type: state.active
        }
      );
      if (res.resultcode == 200) {
        state.allMes = res;
      } else {
        console.log("请求出错");
      }
    };

    const changeTime = async name => {
      state.active = name;
      const res = await http.get(
        "http://web.juhe.cn:8080/constellation/getAll",
        {
          key: "477469c470445e5af4e6f48c957f3cec",
          consName: state.defauleName,
          type: state.active
        }
      );
      if (res.resultcode == 200) {
        state.allMes = res;
      } else {
        console.log("请求出错");
      }
    };

    onMounted(async () => {
      const res = await http.get(
        "http://web.juhe.cn:8080/constellation/getAll",
        {
          key: "477469c470445e5af4e6f48c957f3cec",
          consName: state.defauleName,
          type: state.active
        }
      );
      if (res.resultcode == 200) {
        state.allMes = res;
      } else {
        console.log("请求出错");
      }
    });

    return {
      ...toRefs(state),
      change,
      changeTime
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
@start: {
  display: flex;
  align-items: center;
  justify-content: flex-start;
};
@spaceAround: {
  display: flex;
  align-items: center;
  justify-content: space-around;
};
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.active {
  background-color: pink;
  color: black;
}
.content {
  width: 100%;
  height: 100%;
  .title {
    width: 100%;
    height: 55px;
    background-color: rgb(38, 63, 73);
    border-radius: 5px 5px 0 0;
    text-align: center;
    color: whitesmoke;
    @center();
    .change {
      cursor: pointer;
      margin-left: 10px;
      &:hover {
        color: red;
      }
    }
  }
  .img {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -50px;
    right: 0;
    img {
      width: 100%;
    }
  }
  .mes {
    width: 100%;
    height: calc(100% - 55px);
    border-radius: 0 0 5px 5px;
    .timeBtn {
      width: 100%;
      height: 14%;
      background-color: #55a6db;
      margin-top: 10px;
      @center();
      div {
        flex: 1;
        height: 65%;
        margin: 0 10px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        @center();
        cursor: pointer;
        &:hover {
          background-color: pink;
        }
      }
    }
    .mesDetail {
      width: 100%;
      height: 80%;
      background-color: #fff;
      .today_detail,
      .tomorrow_detail,
      .week_detail,
      .month_detail {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 10px;
        border-radius: 5px;
        .point {
          width: 95%;
          height: 45%;
          background-color: rgb(8, 14, 102);
          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
          border-radius: 3px;
          @start();
          flex-wrap: wrap;
          div {
            width: 45%;
            padding-left: 10px;
            color: pink;
          }
        }
        .summary {
          width: 100%;
          margin-top: 25px;
          @center();
          flex-direction: column;
          h5 {
            font-size: 20px;
            color: rgb(230, 28, 28);
          }
          p {
            width: 90%;
            box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
            padding: 10px;
            border-radius: 3px;
          }
        }
      }
      .week_detail,
      .month_detail {
        .all,
        .job,
        .work,
        .health,
        .love,
        .money {
          width: 90%;
          box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.5);
          margin: 10px 0;
          border-radius: 5px;
          padding: 5px;
        }
      }
    }
  }
  .alert {
    width: 100%;
    height: calc(100% - 55px);
    border-radius: 0 0 5px 5px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    ul {
      width: 100%;
      height: 100%;
      @center();
      flex-wrap: wrap;
      li {
        width: 45%;
        height: 15%;
        background-color: #fff;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
        margin: 0 5px;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          background-color: rgb(49, 133, 87);
        }
        @center();
        i {
          margin-right: 10px;
          font-size: 30px;
          color: rgb(196, 35, 35);
        }
      }
    }
  }
}
</style>
