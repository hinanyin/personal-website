import cloudbase from "@cloudbase/js-sdk";
import {
  useRouter
} from "vue-router";
class ChangBg {
  constructor(state) {
    this.state = state;
    this.router = useRouter();
    this.app = cloudbase.init({
      env: "personal-web-5gfvc908ac76abb1"
    });
    this.auth = this.app.auth({
      persistence: "local"
    });
    this._init_();
  }

  _init_() {
    this.auth.getLoginState().then(async loginstate => {
      if (loginstate) {
        const user = await this.auth.currentUser;
        const db = await this.app.database();
        db.collection("register")
          .where({
            uid: user.uid
          })
          .get()
          .then(res => {
            if (!res.data[0].background) {
              const app = document.getElementById("app");
              app.style.cssText = `background-image: url(${this.state.bg[0]}); background-size:cover;background-position:center; z-index:1`;
            } else {
              this.state.bg[0] = res.data[0].background;
              const app = document.getElementById("app");
              app.style.cssText = `background-image: url(${this.state.bg[0]}); background-size:cover;background-position:center; z-index:1;`;
            }
          });
      } else {
        const app = document.getElementById("app");
        app.style.cssText = `background-image: url(${this.state.bg[0]}); background-size:cover;background-position:center;z-index:1`;
      }
    });
  }

  // 用户手动更改背景
  userChangeBg() {
    this.auth.getLoginState().then(loginstate => {
      if (loginstate) {
        this.state.isAlert = !this.state.isAlert;
      } else {
        alert("您还未登录不能修改背景图片");
        this.router.push("/center");
      }
    });
  }
  // 上传背景图
  async submitBg(file) {
    this.state.isLoading = true;
    const db = await this.app.database();
    const user = await this.auth.currentUser;
    console.log(name);
    this.app
      .uploadFile({
        cloudPath: `${user.uid}/background/${file.name.replace(/\s+/g, "")}`,
        filePath: file
      })
      .then(res => {
        this.app
          .getTempFileURL({
            fileList: [{
              fileID: res.fileID,
              tempFileURL: "",
              maxAge: 120 * 60 * 10000
            }]
          })
          .then(res => {
            db.collection("register")
              .where({
                uid: user.uid
              })
              .update({
                background: res.fileList[0].tempFileURL
              })
              .then(() => {
                this.state.isAlert = false;
                self.location.reload();
                this.state.isLoading = false;
              })
              .catch(err => {
                console.log(err);
              });
          });
      });
  }
}

export default ChangBg;