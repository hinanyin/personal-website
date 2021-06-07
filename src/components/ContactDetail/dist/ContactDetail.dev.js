"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsSdk = _interopRequireDefault(require("@cloudbase/js-sdk"));

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

var CommentsDb =
  /*#__PURE__*/
  (function() {
    function CommentsDb(state) {
      _classCallCheck(this, CommentsDb);

      this.state = state;
      this.app = _jsSdk["default"].init({
        env: "personal-web-5gfvc908ac76abb1"
      });
      this.auth = this.app.auth({
        persistence: "local"
      });

      this._init();
    }

    _createClass(CommentsDb, [
      {
        key: "_init",
        value: function _init() {
          var _this = this;

          this.state.isLoading = true;
          this.auth.getLoginState().then(function(loginstate) {
            if (loginstate) {
              console.log("用户已经登录");
              _this.state.isLoading = false;
              var user = _this.auth.currentUser;
              _this.state.uid = user.uid;

              _this.getUserMes(user);

              _this.getComment();
            } else {
              _this.state.isLoginBox = true;
              _this.state.isLoading = false;
            }
          });
        } // 获取用户基本信息
      },
      {
        key: "getUserMes",
        value: function getUserMes(user) {
          this.state.beforeLogin = "\u8C22\u8C22\u4F60\u7684\u7559\u8A00:".concat(
            user.nickName,
            "~~~~ "
          );
          this.state.isLoginBox = false;
          this.state.isLogin = true;
        } // 提交评论
      },
      {
        key: "submitComment",
        value: function submitComment() {
          var _this2 = this;

          var db, user;
          return regeneratorRuntime.async(
            function submitComment$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    this.state.isLoading = true;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(this.app.database());

                  case 3:
                    db = _context.sent;
                    _context.next = 6;
                    return regeneratorRuntime.awrap(this.auth.currentUser);

                  case 6:
                    user = _context.sent;
                    db.collection("comments")
                      .add({
                        nickname: user.nickName,
                        email: user.email,
                        uid: user.uid,
                        commentText: this.state.commentText,
                        commentTime: new Date().toLocaleString(),
                        otherPersonComments: []
                      })
                      .then(function() {
                        _this2.state.commentText = "";

                        _this2.getComment();

                        _this2.state.isLoading = false;
                      })
                      ["catch"](function(err) {
                        console.log(err);
                      });

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            },
            null,
            this
          );
        } // 获取评论
      },
      {
        key: "getComment",
        value: function getComment() {
          var _this3 = this;

          var db, _;

          return regeneratorRuntime.async(
            function getComment$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    db = this.app.database();
                    _ = db.command;
                    db.collection("comments")
                      .where({
                        commentText: _.neq("")
                      })
                      .get()
                      .then(function(res) {
                        _this3.state.commentDetail = res.data.reverse();
                        _this3.state.isLoading = false;
                      });

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            },
            null,
            this
          );
        } // 删除评论
      },
      {
        key: "delComment",
        value: function delComment(_id) {
          var _this4 = this;

          var db;
          return regeneratorRuntime.async(
            function delComment$(_context3) {
              while (1) {
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    _context3.next = 2;
                    return regeneratorRuntime.awrap(this.app.database());

                  case 2:
                    db = _context3.sent;
                    db.collection("comments")
                      .doc(_id)
                      .remove()
                      .then(function() {
                        _this4.getComment();
                      });

                  case 4:
                  case "end":
                    return _context3.stop();
                }
              }
            },
            null,
            this
          );
        } // 回复评论
      },
      {
        key: "rebackComment",
        value: function rebackComment(_id) {
          var _this5 = this;

          return regeneratorRuntime.async(
            function rebackComment$(_context4) {
              while (1) {
                switch ((_context4.prev = _context4.next)) {
                  case 0:
                    console.log(_id);
                    this.auth.getLoginState().then(function(loginstate) {
                      if (loginstate) {
                        _this5.state.isReback = true;

                        var db = _this5.app.database();

                        db.collection("comments")
                          .doc(_id)
                          .get()
                          .then(function(res) {
                            _this5.state.rebackPersonId = res.data[0]._id;
                            _this5.state.rebackPersonName =
                              res.data[0].nickname;
                          });
                      } else {
                        alert("请先登录");
                      }
                    });

                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }
            },
            null,
            this
          );
        } // 确定回复
      },
      {
        key: "sureComment",
        value: function sureComment() {
          var _this6 = this;

          var user;
          return regeneratorRuntime.async(
            function sureComment$(_context5) {
              while (1) {
                switch ((_context5.prev = _context5.next)) {
                  case 0:
                    if (!(this.state.rebackCommentText == "")) {
                      _context5.next = 4;
                      break;
                    }

                    alert("回复不能为空!!");
                    _context5.next = 10;
                    break;

                  case 4:
                    this.state.isLoading = true;
                    _context5.next = 7;
                    return regeneratorRuntime.awrap(this.auth.currentUser);

                  case 7:
                    user = _context5.sent;
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
                      .then(function() {
                        _this6.state.isLoading = false;
                        _this6.state.isReback = false;

                        _this6.getComment();
                      });

                  case 10:
                  case "end":
                    return _context5.stop();
                }
              }
            },
            null,
            this
          );
        } // 删除自己的子评论
      },
      {
        key: "delMineComment",
        value: function delMineComment(i, _id) {
          var _this7 = this;

          var db;
          return regeneratorRuntime.async(
            function delMineComment$(_context7) {
              while (1) {
                switch ((_context7.prev = _context7.next)) {
                  case 0:
                    _context7.next = 2;
                    return regeneratorRuntime.awrap(this.app.database());

                  case 2:
                    db = _context7.sent;
                    this.state.isLoading = true;
                    db.collection("comments")
                      .doc(_id)
                      .get()
                      .then(function _callee(res) {
                        var result;
                        return regeneratorRuntime.async(function _callee$(
                          _context6
                        ) {
                          while (1) {
                            switch ((_context6.prev = _context6.next)) {
                              case 0:
                                _context6.next = 2;
                                return regeneratorRuntime.awrap(
                                  res.data[0].otherPersonComments
                                );

                              case 2:
                                result = _context6.sent;
                                result.splice(i, 1);

                                _this7.app
                                  .callFunction({
                                    name: "delMineComment",
                                    data: {
                                      _id: _id,
                                      otherPersonComments: result
                                    }
                                  })
                                  .then(function() {
                                    _this7.state.isLoading = false;

                                    _this7.getComment();
                                  });

                              case 5:
                              case "end":
                                return _context6.stop();
                            }
                          }
                        });
                      })
                      ["catch"](function(err) {
                        _this7.state.isLoading = false;
                        console.log(err);
                      });

                  case 5:
                  case "end":
                    return _context7.stop();
                }
              }
            },
            null,
            this
          );
        } // 退出登录
      },
      {
        key: "outlogin",
        value: function outlogin() {
          var _this8 = this;

          return regeneratorRuntime.async(
            function outlogin$(_context8) {
              while (1) {
                switch ((_context8.prev = _context8.next)) {
                  case 0:
                    this.auth.getLoginState().then(function(loginstate) {
                      if (loginstate) {
                        _this8.auth.signOut();

                        _this8.getComment();
                      } else {
                        console.log("登录不可用");
                      }
                    });

                  case 1:
                  case "end":
                    return _context8.stop();
                }
              }
            },
            null,
            this
          );
        } // 留言栏登录
      },
      {
        key: "signUp",
        value: function signUp() {
          var _this9 = this;

          return regeneratorRuntime.async(
            function signUp$(_context9) {
              while (1) {
                switch ((_context9.prev = _context9.next)) {
                  case 0:
                    this.auth
                      .signInWithEmailAndPassword(
                        this.state.email,
                        this.state.password
                      )
                      .then(function(loginstate) {
                        if (loginstate) {
                          var user = _this9.auth.currentUser;
                          _this9.state.isLoading = false;
                          _this9.state.isLoginBox = false;
                          _this9.state.beforeLogin = "\u8C22\u8C22\u60A8\u7684\u7559\u8A00".concat(
                            user.nickName
                          );
                          _this9.state.uid = user.uid;
                          _this9.state.isLogin = true;

                          _this9.getComment();
                        } else {
                          _this9.state.isLoading = false;
                          alert("登录失败请检查账号密码");
                        }
                      })
                      ["catch"](function() {
                        _this9.state.isLoading = false;
                        alert("请确定账号是否注册，或密码账号是否正确");
                      });

                  case 1:
                  case "end":
                    return _context9.stop();
                }
              }
            },
            null,
            this
          );
        }
      }
    ]);

    return CommentsDb;
  })();

var _default = CommentsDb;
exports["default"] = _default;
