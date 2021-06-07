import cloudbase from "@cloudbase/js-sdk";
import { useRouter } from "vue-router";
class Database {
  constructor(state) {
    this.state = state;
    this.router = useRouter();
    this.app = cloudbase.init({
      env: "personal-web-5gfvc908ac76abb1"
    });
    this.auth = this.app.auth({
      persistence: "local"
    });
    this.isRefreshLogin();
  }

  //  判断登录状态，用户登录有效则跳过登录，
  async isRefreshLogin() {
    this.auth.getLoginState().then(loginstate => {
      if (loginstate) {
        const user = this.auth.currentUser;
        this.router.push({
          name: "PersonalCenter",
          params: {
            id: user.uid
          }
        });
      } else {
        return;
      }
    });
  }
  // 退出登录
  async exitLogin() {
    this.auth.getLoginState().then(loginstate => {
      if (loginstate) {
        this.auth.signOut();
        this.router.push("/");
      } else {
        return;
      }
    });
  }
  // 注册逻辑
  async addUsers() {
    this.state.isLoading = true;
    this.state.loadingText = "注册查询中";
    this.auth
      .signUpWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.state.loadingText = "注册成功";
        this.state.isLoading = false;
        alert("注册成功,请前往邮箱确定");
        this.state.isLogined = true;
      })
      .catch(err => {
        if (err) {
          console.log(err);
          this.state.loadingText = "注册失败";
          this.state.isLoading = false;
          alert("注册失败!该邮箱或许已经被注册,前往登录");
          this.state.isLogined = true;
        }
      });
  }
  // 登录逻辑
  async userLogin() {
    this.state.isLoading = true;
    this.state.loadingText = "登录中，请稍等！";
    this.auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.state.loadingText = "登录成功";
        this.state.isLoading = false;
        this.state.id = res.user.uid;
        const Mes = res.user;
        const db = this.app.database();
        db.collection("register")
          .where({
            uid: res.user.uid
          })
          .get()
          .then(res => {
            if (res.data.length != 0) {
              console.log("用户存在");
              this.router.push({
                name: "PersonalCenter",
                params: {
                  id: this.state.id
                }
              });
            } else {
              db.collection("register")
                .add({
                  avatarUrl: Mes.avatarUrl,
                  email: Mes.email,
                  uid: Mes.uid,
                  nickname: this.state.nickname,
                  location: Mes.location
                })
                .then(() => {
                  this.router.push({
                    name: "PersonalCenter",
                    params: {
                      id: this.state.id
                    }
                  });
                });
            }
          });
      })
      .catch(err => {
        if (err) {
          this.state.loadingText = "登录失败";
          this.state.isLoading = false;

          console.log(err);
          alert("账号或者密码错误,或者用户不存在");
        }
      });
  }
  // 获取基本信息
  async getMes() {
    const db = await this.app.database();
    db.collection("register")
      .where({
        uid: this.state.id
      })
      .get()
      .then(res => {
        this.state.userMes = res.data[0];
      })
      .catch(err => {
        console.log(err);
      });
  }
  // 改变基本信息
  async changeMes() {
    this.state.isLoading = true;
    this.state.loadingText = "数据提交中";
    const db = await this.app.database();
    // console.log(this.state.userMes)
    db.collection("register")
      .where({
        uid: this.state.id
      })
      .update({
        nickname: this.state.userMes.nickname,
        motto: this.state.userMes.motto,
        QQ: this.state.userMes.QQ
      })
      .then(() => {
        this.state.loadingText = "数据提交成功";
        this.state.isLoading = false;
        const user = this.auth.currentUser;
        user.update({
          nickName: this.state.userMes.nickname
        });
      })
      .catch(err => {
        this.state.loadingText = "数据提交失败";
        this.state.isLoading = false;
        console.log(err);
      });
  }
  // 更换头像
  async uploadImg() {
    if (this.state.fileUrl.files.length == 0) {
      alert("请选择要上传的图片");
    } else {
      this.state.isLoading = true;
      this.state.loadingText = "头像更改中，请稍后";
      const db = await this.app.database();
      this.app
        .uploadFile({
          cloudPath: `${this.state.id}/headerImg/${this.state.fileUrl.files[0].name}`,
          filePath: this.state.fileUrl.files[0]
        })
        .then(res => {
          this.app
            .getTempFileURL({
              fileList: [
                {
                  fileID: res.fileID,
                  tempFileURL: "",
                  maxAge: 120 * 60 * 10000
                }
              ]
            })
            .then(res => {
              const avatarurl = res.fileList[0].tempFileURL;
              db.collection("register")
                .where({
                  uid: this.state.id
                })
                .update({
                  avatarUrl: res.fileList[0].tempFileURL
                })
                .then(() => {
                  this.getMes();
                  this.state.loadingText = "头像更改成功，请刷新页面";
                  this.state.isLoading = false;
                  this.state.isChangeImg = false;
                  const user = this.auth.currentUser;
                  user.update({
                    avatarUrl: avatarurl
                  });
                });
            });
        });
    }
  }
  // 发布动态
  async submitNews(id, text, file) {
    const db = await this.app.database();
    if (text.length == 0) {
      alert("请输入动态内容");
    } else {
      this.state.loadingText = "动态上传中";
      if (!file) {
        this.state.isLoading = true;
        const user = this.auth.currentUser;
        db.collection("center")
          .add({
            ID: id,
            text: text,
            img: "",
            nickname: user.nickName,
            time: new Date().toLocaleString()
          })
          .then(() => {
            this.state.loadingText = "发布动态成功";
            this.state.isLoading = false;
            this.state.addNews = false;
            this.state.centerText = "";
            this.getNews(this.state.id);
          });
      } else {
        this.state.loadingText = "动态发布中";
        this.state.isLoading = true;
        this.app
          .uploadFile({
            cloudPath: `${id}/center/${file.name}`,
            filePath: file
          })
          .then(res => {
            let DownloadId = res.fileID;
            this.app
              .getTempFileURL({
                fileList: [
                  {
                    fileID: res.fileID,
                    tempFileURL: "",
                    maxAge: 120 * 60 * 10000
                  }
                ]
              })
              .then(res => {
                db.collection("center")
                  .add({
                    ID: id,
                    text: text,
                    img: res.fileList[0].tempFileURL,
                    nickname: this.state.userMes.nickname,
                    time: new Date().toLocaleString(),
                    DownloadId: DownloadId
                  })
                  .then(() => {
                    this.state.loadingText = "动态发布成功";
                    this.state.isLoading = false;
                    this.state.addNews = false;
                    this.state.centerText = "";
                    this.getNews(this.state.id);
                  });
              });
          });
      }
    }
  }
  // 获取动态
  async getNews(id) {
    const db = await this.app.database();
    db.collection("center")
      .where({
        ID: id
      })
      .get()
      .then(res => {
        this.state.centerNews = res.data.reverse();
      });
  }
  // 删除动态
  async delNews(_id) {
    const db = await this.app.database();
    this.state.isLoading = true;
    this.state.loadingText = "删除动态中";
    db.collection("center")
      .doc(_id)
      .remove()
      .then(() => {
        this.state.isLoading = false;
        this.getNews(this.state.id);
      })
      .catch(err => [console.log(err)]);
  }
}

export default Database;
