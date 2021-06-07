import cloudbase from "@cloudbase/js-sdk";
class Db {
  constructor(state) {
    this.state = state;
    this.app = cloudbase.init({
      env: "personal-web-5gfvc908ac76abb1"
    });
    this.auth = this.app.auth({
      persistence: "local"
    });
    this._init();
  }
  // 初始化
  _init() {
    this.state.isLoading = true;
    this.auth.getLoginState().then(loginstate => {
      if (loginstate) {
        console.log("用户已经登录");
        this.state.isLoading = false;
        const user = this.auth.currentUser;
        this.state.uid = user.uid;
        this.getUserMes(user);
        this.getComment();
      } else {
        this.state.isLoginBox = true;
        this.state.isLoading = false;
      }
    });
  }

  // 获取用户基本信息
  getUserMes(user) {
    this.state.beforeLogin = `谢谢你的留言:${user.nickName}~~~~ `;
    this.state.isLoginBox = false;
    this.state.isLogin = true;
  }
  // 提交评论
  async submitComment() {
    this.state.isLoading = true;
    const db = await this.app.database();
    const user = await this.auth.currentUser;
    db.collection("comments")
      .add({
        nickname: user.nickName,
        email: user.email,
        uid: user.uid,
        commentText: this.state.commentText,
        commentTime: new Date().toLocaleString(),
        otherPersonComments: []
      })
      .then(() => {
        this.state.commentText = "";
        this.getComment();
        this.state.isLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
  // 获取评论
  async getComment() {
    const db = this.app.database();
    const _ = db.command;
    db.collection("comments")
      .where({
        commentText: _.neq("")
      })
      .get()
      .then(res => {
        this.state.commentDetail = res.data.reverse();
        this.state.isLoading = false;
      });
  }
  // 删除评论
  async delComment(_id) {
    const db = await this.app.database();
    db.collection("comments")
      .doc(_id)
      .remove()
      .then(() => {
        this.getComment();
      });
  }
  // 回复评论
  async rebackComment(_id) {
    this.auth.getLoginState().then(loginstate => {
      if (loginstate) {
        this.state.isReback = true;
        const db = this.app.database();
        db.collection("comments")
          .doc(_id)
          .get()
          .then(res => {
            this.state.rebackPersonId = res.data[0]._id;
            this.state.rebackPersonName = res.data[0].nickname;
          });
      } else {
        alert("请先登录");
      }
    });
  }
  // 确定回复
  async sureComment() {
    if (this.state.rebackCommentText == "") {
      alert("回复不能为空!!");
    } else {
      this.state.isLoading = true;
      const user = await this.auth.currentUser;
      this.state.email = user.email;
      this.app
        .callFunction({
          name: "reback-comment",
          data: {
            rebackPersonId: this.state.rebackPersonId,
            uid: user.uid,
            nickname: user.nickName,
            email: user.email,
            comment: this.state.rebackCommentText,
            commentTime: new Date().toLocaleString()
          }
        })
        .then(() => {
          this.state.isLoading = false;
          this.state.isReback = false;
          this.getComment();
        });
    }
  }
  // 删除自己的子评论
  async delMineComment(i, _id) {
    const db = await this.app.database();
    this.state.isLoading = true;
    db.collection("comments")
      .doc(_id)
      .get()
      .then(async res => {
        let result = await res.data[0].otherPersonComments;
        result.splice(i, 1);
        this.app
          .callFunction({
            name: "delMineComment",
            data: {
              _id: _id,
              otherPersonComments: result
            }
          })
          .then(() => {
            this.state.isLoading = false;
            this.getComment();
          });
      })
      .catch(err => {
        this.state.isLoading = false;
        console.log(err);
      });
  }
  // 退出登录
  async outlogin() {
    this.auth.getLoginState().then(loginstate => {
      if (loginstate) {
        this.auth.signOut();
        this.getComment();
      } else {
        console.log("登录不可用");
      }
    });
  }
  // 留言栏登录
  async signUp() {
    this.auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(loginstate => {
        if (loginstate) {
          const user = this.auth.currentUser;
          this.state.isLoading = false;
          this.state.isLoginBox = false;
          this.state.beforeLogin = `谢谢您的留言${user.nickName}`;
          this.state.uid = user.uid;
          this.state.isLogin = true;
          this.getComment();
        } else {
          this.state.isLoading = false;
          alert("登录失败请检查账号密码");
        }
      })
      .catch(() => {
        this.state.isLoading = false;
        alert("请确定账号是否注册，或密码账号是否正确");
      });
  }
}

export default Db;