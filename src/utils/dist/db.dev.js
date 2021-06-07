"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsSdk = _interopRequireDefault(require("@cloudbase/js-sdk"));

var _vueRouter = require("vue-router");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Database =
  /*#__PURE__*/
  (function() {
    function Database(state) {
      _classCallCheck(this, Database);

      this.state = state;
      this.router = (0, _vueRouter.useRouter)();
      this.app = _jsSdk["default"].init({
        env: "personal-web-5gfvc908ac76abb1"
      });
      this.auth = this.app.auth({
        persistence: "local"
      });
      this.auth
        .anonymousAuthProvider()
        .signIn()
        .then(function() {
          console.log("匿名登录成功");
        });
      this.db = this.app.database();
    } // 添加用户

    _createClass(Database, [
      {
        key: "addUsers",
        value: function addUsers() {
          var _this = this;

          this.state.isLoading = true;
          this.state.loadingText = "用户数据加载中";
          this.db
            .collection("register")
            .where({
              email: this.state.email
            })
            .get()
            .then(function(res) {
              if (res.data.length !== 0) {
                _this.state.loadingText = "存在该用户";
                _this.state.isLoading = false;
                alert("用户已经存在,请登录");
                setTimeout(function() {
                  _this.state.isLogined = true;
                }, 2000);
              } else {
                _this.state.loadingText = "用户数据写入中";

                _this.db
                  .collection("register")
                  .add({
                    nickname: _this.state.nickname,
                    email: _this.state.email,
                    password: _this.state.password
                  })
                  .then(function() {
                    _this.state.isLoading = false;
                    alert("注册成功,请前往登录");
                    _this.state.isLogined = true;
                  })
                  ["catch"](function(err) {
                    console.log(err);
                  });
              }
            });
        } // 查询登录
      },
      {
        key: "userLogin",
        value: function userLogin() {
          var _this2 = this;

          this.state.isLoading = true;
          this.state.loadingText = "用户查询中";
          this.db
            .collection("register")
            .where({
              email: this.state.email
            })
            .get()
            .then(function(res) {
              if (res.data.length != 0) {
                _this2.db
                  .collection("register")
                  .where({
                    email: _this2.state.email,
                    password: _this2.state.password
                  })
                  .get()
                  .then(function(res) {
                    if (res.data.length == 0) {
                      _this2.state.isLoading = false;
                      alert("密码错误,请重新输入密码");
                    } else {
                      _this2.state.loadingText = "用户查询成功";
                      _this2.state.isLoading = false;

                      _this2.router.push({
                        name: "PersonalCenter",
                        params: {
                          id: res.data[0]._id
                        }
                      });
                    }
                  });
              } else {
                _this2.state.isLoading = false;
                alert("没有该账号,请注册");
                setTimeout(function() {
                  _this2.state.isLogined = false;
                }, 2000);
              }
            });
        } // 获取用户数据
      },
      {
        key: "getMes",
        value: function getMes() {
          var _this3 = this;

          this.db
            .collection("register")
            .doc(this.state.id)
            .get()
            .then(function(res) {
              _this3.state.userMes = res.data[0];
            })
            ["catch"](function(err) {
              console.log(err);
            });
        } // 头像上传函数
      },
      {
        key: "uploadImg",
        value: function uploadImg() {
          var _this4 = this;

          if (this.state.fileUrl.files.length == 0) {
            alert("请选择要上传的图片");
          } else {
            this.state.isLoading = true;
            this.app
              .uploadFile({
                cloudPath: ""
                  .concat(this.state.id, "/headerImg/")
                  .concat(this.state.fileUrl.files[0].name),
                filePath: this.state.fileUrl.files[0]
              })
              .then(function(res) {
                _this4.app
                  .getTempFileURL({
                    fileList: [
                      {
                        fileID: res.fileID,
                        tempFileURL: "",
                        maxAge: 120 * 60 * 10000
                      }
                    ]
                  })
                  .then(function(res) {
                    _this4.app
                      .callFunction({
                        name: "upload",
                        data: {
                          id: _this4.state.id,
                          userImg: res.fileList[0].tempFileURL
                        }
                      })
                      .then(function() {
                        _this4.getMes(_this4.state.id);

                        _this4.state.isLoading = false;
                        _this4.state.isChangeImg = false;
                      });
                  });
              });
          }
        } // 更改基本信息
      },
      {
        key: "changeMes",
        value: function changeMes() {
          var _this5 = this;

          this.state.isLoading = true;
          this.app
            .callFunction({
              name: "uploadmes",
              data: {
                id: this.state.id,
                nickname: this.state.userMes.nickname,
                motto: this.state.userMes.motto,
                QQ: this.state.userMes.QQ
              }
            })
            .then(function() {
              _this5.getMes();

              _this5.state.isLoading = false;
              _this5.state.isShowChangeBox = false;
            });
        } // 上传动态
      },
      {
        key: "submitNews",
        value: function submitNews(id, text, file) {
          var _this6 = this;

          if (text.length == 0) {
            alert("请输入动态内容");
          } else {
            this.state.loadingText = "动态上传中";

            if (!file) {
              this.state.isLoading = true;
              this.db
                .collection("center")
                .add({
                  ID: id,
                  text: text,
                  img: "",
                  nickname: this.state.userMes.nickname,
                  time: new Date().toLocaleString()
                })
                .then(function() {
                  _this6.state.isLoading = false;
                  _this6.state.addNews = false;
                  _this6.state.imgFileUrl = null;
                  _this6.state.centerText = "";

                  _this6.getNews(_this6.state.id);
                });
            } else {
              this.state.isLoading = true;
              this.app
                .uploadFile({
                  cloudPath: "".concat(id, "/center/").concat(file.name),
                  filePath: file
                })
                .then(function(res) {
                  _this6.app
                    .getTempFileURL({
                      fileList: [
                        {
                          fileID: res.fileID,
                          tempFileURL: "",
                          maxAge: 120 * 60 * 10000
                        }
                      ]
                    })
                    .then(function(res) {
                      _this6.db
                        .collection("center")
                        .add({
                          ID: id,
                          text: text,
                          img: res.fileList[0].tempFileURL,
                          nickname: _this6.state.userMes.nickname,
                          time: new Date().toLocaleString()
                        })
                        .then(function() {
                          _this6.state.isLoading = false;
                          _this6.state.addNews = false;
                          _this6.state.imgFileUrl = null;
                          _this6.state.centerText = "";

                          _this6.getNews(_this6.state.id);
                        });
                    });
                });
            }
          } // 上传图片
        } // 获取动态内容
      },
      {
        key: "getNews",
        value: function getNews(id) {
          var _this7 = this;

          this.db
            .collection("center")
            .where({
              ID: id
            })
            .get()
            .then(function(res) {
              _this7.state.centerNews = res.data.reverse();
            });
        } // 删除动态
      },
      {
        key: "delNews",
        value: function delNews(_id) {
          var _this8 = this;

          this.state.isLoading = true;
          this.state.loadingText = "删除动态中";
          this.app
            .callFunction({
              name: "delCenterNews",
              data: {
                _id: _id
              }
            })
            .then(function() {
              _this8.state.isLoading = false;

              _this8.getNews(_this8.state.id);
            })
            ["catch"](function(err) {
              return [console.log(err)];
            });
        }
      }
    ]);

    return Database;
  })();

var _default = Database;
exports["default"] = _default;
