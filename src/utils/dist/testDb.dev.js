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
      this.isRefreshLogin();
    } //  判断登录状态，用户登录有效则跳过登录，

    _createClass(Database, [
      {
        key: "isRefreshLogin",
        value: function isRefreshLogin() {
          var _this = this;

          return regeneratorRuntime.async(
            function isRefreshLogin$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    this.auth.getLoginState().then(function(loginstate) {
                      if (loginstate) {
                        var user = _this.auth.currentUser;

                        _this.router.push({
                          name: "PersonalCenter",
                          params: {
                            id: user.uid
                          }
                        });
                      } else {
                        return;
                      }
                    });

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            },
            null,
            this
          );
        } // 退出登录
      },
      {
        key: "exitLogin",
        value: function exitLogin() {
          var _this2 = this;

          return regeneratorRuntime.async(
            function exitLogin$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    this.auth.getLoginState().then(function(loginstate) {
                      if (loginstate) {
                        _this2.auth.signOut();

                        _this2.router.push("/");
                      } else {
                        return;
                      }
                    });

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            },
            null,
            this
          );
        } // 注册逻辑
      },
      {
        key: "addUsers",
        value: function addUsers() {
          var _this3 = this;

          return regeneratorRuntime.async(
            function addUsers$(_context3) {
              while (1) {
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    this.state.isLoading = true;
                    this.state.loadingText = "注册查询中";
                    this.auth
                      .signUpWithEmailAndPassword(
                        this.state.email,
                        this.state.password
                      )
                      .then(function() {
                        _this3.state.loadingText = "注册成功";
                        _this3.state.isLoading = false;
                        alert("注册成功,请前往邮箱确定");
                        _this3.state.isLogined = true;
                      })
                      ["catch"](function(err) {
                        if (err) {
                          console.log(err);
                          _this3.state.loadingText = "注册失败";
                          _this3.state.isLoading = false;
                          alert("注册失败!该邮箱或许已经被注册,前往登录");
                          _this3.state.isLogined = true;
                        }
                      });

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            },
            null,
            this
          );
        } // 登录逻辑
      },
      {
        key: "userLogin",
        value: function userLogin() {
          var _this4 = this;

          return regeneratorRuntime.async(
            function userLogin$(_context4) {
              while (1) {
                switch ((_context4.prev = _context4.next)) {
                  case 0:
                    this.state.isLoading = true;
                    this.state.loadingText = "登录中，请稍等！";
                    this.auth
                      .signInWithEmailAndPassword(
                        this.state.email,
                        this.state.password
                      )
                      .then(function(res) {
                        _this4.state.loadingText = "登录成功";
                        _this4.state.isLoading = false;
                        _this4.state.id = res.user.uid;
                        var Mes = res.user;

                        var db = _this4.app.database();

                        db.collection("register")
                          .where({
                            uid: res.user.uid
                          })
                          .get()
                          .then(function(res) {
                            if (res.data.length != 0) {
                              console.log("用户存在");

                              _this4.router.push({
                                name: "PersonalCenter",
                                params: {
                                  id: _this4.state.id
                                }
                              });
                            } else {
                              db.collection("register")
                                .add({
                                  avatarUrl: Mes.avatarUrl,
                                  email: Mes.email,
                                  uid: Mes.uid,
                                  nickname: _this4.state.nickname,
                                  location: Mes.location
                                })
                                .then(function() {
                                  _this4.router.push({
                                    name: "PersonalCenter",
                                    params: {
                                      id: _this4.state.id
                                    }
                                  });
                                });
                            }
                          });
                      })
                      ["catch"](function(err) {
                        if (err) {
                          _this4.state.loadingText = "登录失败";
                          _this4.state.isLoading = false;
                          console.log(err);
                          alert("账号或者密码错误,或者用户不存在");
                        }
                      });

                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }
            },
            null,
            this
          );
        } // 获取基本信息
      },
      {
        key: "getMes",
        value: function getMes() {
          var _this5 = this;

          var db;
          return regeneratorRuntime.async(
            function getMes$(_context5) {
              while (1) {
                switch ((_context5.prev = _context5.next)) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(this.app.database());

                  case 2:
                    db = _context5.sent;
                    db.collection("register")
                      .where({
                        uid: this.state.id
                      })
                      .get()
                      .then(function(res) {
                        _this5.state.userMes = res.data[0];
                      })
                      ["catch"](function(err) {
                        console.log(err);
                      });

                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }
            },
            null,
            this
          );
        } // 改变基本信息
      },
      {
        key: "changeMes",
        value: function changeMes() {
          var _this6 = this;

          var db;
          return regeneratorRuntime.async(
            function changeMes$(_context6) {
              while (1) {
                switch ((_context6.prev = _context6.next)) {
                  case 0:
                    this.state.isLoading = true;
                    this.state.loadingText = "数据提交中";
                    _context6.next = 4;
                    return regeneratorRuntime.awrap(this.app.database());

                  case 4:
                    db = _context6.sent;
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
                      .then(function() {
                        _this6.state.loadingText = "数据提交成功";
                        _this6.state.isLoading = false;
                        var user = _this6.auth.currentUser;
                        user.update({
                          nickName: _this6.state.userMes.nickname
                        });
                      })
                      ["catch"](function(err) {
                        _this6.state.loadingText = "数据提交失败";
                        _this6.state.isLoading = false;
                        console.log(err);
                      });

                  case 6:
                  case "end":
                    return _context6.stop();
                }
              }
            },
            null,
            this
          );
        } // 更换头像
      },
      {
        key: "uploadImg",
        value: function uploadImg() {
          var _this7 = this;

          var db;
          return regeneratorRuntime.async(
            function uploadImg$(_context7) {
              while (1) {
                switch ((_context7.prev = _context7.next)) {
                  case 0:
                    if (!(this.state.fileUrl.files.length == 0)) {
                      _context7.next = 4;
                      break;
                    }

                    alert("请选择要上传的图片");
                    _context7.next = 10;
                    break;

                  case 4:
                    this.state.isLoading = true;
                    this.state.loadingText = "头像更改中，请稍后";
                    _context7.next = 8;
                    return regeneratorRuntime.awrap(this.app.database());

                  case 8:
                    db = _context7.sent;
                    this.app
                      .uploadFile({
                        cloudPath: ""
                          .concat(this.state.id, "/headerImg/")
                          .concat(this.state.fileUrl.files[0].name),
                        filePath: this.state.fileUrl.files[0]
                      })
                      .then(function(res) {
                        _this7.app
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
                            var avatarurl = res.fileList[0].tempFileURL;
                            db.collection("register")
                              .where({
                                uid: _this7.state.id
                              })
                              .update({
                                avatarUrl: res.fileList[0].tempFileURL
                              })
                              .then(function() {
                                _this7.getMes();

                                _this7.state.loadingText =
                                  "头像更改成功，请刷新页面";
                                _this7.state.isLoading = false;
                                _this7.state.isChangeImg = false;
                                var user = _this7.auth.currentUser;
                                user.update({
                                  avatarUrl: avatarurl
                                });
                              });
                          });
                      });

                  case 10:
                  case "end":
                    return _context7.stop();
                }
              }
            },
            null,
            this
          );
        } // 发布动态
      },
      {
        key: "submitNews",
        value: function submitNews(id, text, file) {
          var _this8 = this;

          var db, user;
          return regeneratorRuntime.async(
            function submitNews$(_context8) {
              while (1) {
                switch ((_context8.prev = _context8.next)) {
                  case 0:
                    _context8.next = 2;
                    return regeneratorRuntime.awrap(this.app.database());

                  case 2:
                    db = _context8.sent;

                    if (text.length == 0) {
                      alert("请输入动态内容");
                    } else {
                      this.state.loadingText = "动态上传中";

                      if (!file) {
                        this.state.isLoading = true;
                        user = this.auth.currentUser;
                        db.collection("center")
                          .add({
                            ID: id,
                            text: text,
                            img: "",
                            nickname: user.nickName,
                            time: new Date().toLocaleString()
                          })
                          .then(function() {
                            _this8.state.loadingText = "发布动态成功";
                            _this8.state.isLoading = false;
                            _this8.state.addNews = false;
                            _this8.state.centerText = "";

                            _this8.getNews(_this8.state.id);
                          });
                      } else {
                        this.state.loadingText = "动态发布中";
                        this.state.isLoading = true;
                        this.app
                          .uploadFile({
                            cloudPath: ""
                              .concat(id, "/center/")
                              .concat(file.name),
                            filePath: file
                          })
                          .then(function(res) {
                            var DownloadId = res.fileID;

                            _this8.app
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
                                db.collection("center")
                                  .add({
                                    ID: id,
                                    text: text,
                                    img: res.fileList[0].tempFileURL,
                                    nickname: _this8.state.userMes.nickname,
                                    time: new Date().toLocaleString(),
                                    DownloadId: DownloadId
                                  })
                                  .then(function() {
                                    _this8.state.loadingText = "动态发布成功";
                                    _this8.state.isLoading = false;
                                    _this8.state.addNews = false;
                                    _this8.state.centerText = "";

                                    _this8.getNews(_this8.state.id);
                                  });
                              });
                          });
                      }
                    }

                  case 4:
                  case "end":
                    return _context8.stop();
                }
              }
            },
            null,
            this
          );
        } // 获取动态
      },
      {
        key: "getNews",
        value: function getNews(id) {
          var _this9 = this;

          var db;
          return regeneratorRuntime.async(
            function getNews$(_context9) {
              while (1) {
                switch ((_context9.prev = _context9.next)) {
                  case 0:
                    _context9.next = 2;
                    return regeneratorRuntime.awrap(this.app.database());

                  case 2:
                    db = _context9.sent;
                    db.collection("center")
                      .where({
                        ID: id
                      })
                      .get()
                      .then(function(res) {
                        _this9.state.centerNews = res.data.reverse();
                      });

                  case 4:
                  case "end":
                    return _context9.stop();
                }
              }
            },
            null,
            this
          );
        } // 删除动态
      },
      {
        key: "delNews",
        value: function delNews(_id) {
          var _this10 = this;

          var db;
          return regeneratorRuntime.async(
            function delNews$(_context10) {
              while (1) {
                switch ((_context10.prev = _context10.next)) {
                  case 0:
                    _context10.next = 2;
                    return regeneratorRuntime.awrap(this.app.database());

                  case 2:
                    db = _context10.sent;
                    this.state.isLoading = true;
                    this.state.loadingText = "删除动态中";
                    db.collection("center")
                      .doc(_id)
                      .remove()
                      .then(function() {
                        _this10.state.isLoading = false;

                        _this10.getNews(_this10.state.id);
                      })
                      ["catch"](function(err) {
                        return [console.log(err)];
                      });

                  case 6:
                  case "end":
                    return _context10.stop();
                }
              }
            },
            null,
            this
          );
        }
      }
    ]);

    return Database;
  })();

var _default = Database;
exports["default"] = _default;
