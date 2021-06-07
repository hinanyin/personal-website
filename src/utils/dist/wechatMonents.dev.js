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

var WechatMonents =
  /*#__PURE__*/
  (function() {
    function WechatMonents(state) {
      _classCallCheck(this, WechatMonents);

      this.state = state;
      this.app = _jsSdk["default"].init({
        env: "personal-web-5gfvc908ac76abb1"
      });
      this.auth = this.app.auth({
        persistence: "local"
      });
    }

    _createClass(WechatMonents, [
      {
        key: "getAllNews",
        value: function getAllNews() {
          var _this = this;

          this.auth.getLoginState().then(function(loginstate) {
            if (loginstate) {
              var db = _this.app.database();

              db.collection("center")
                .get()
                .then(function(res) {
                  _this.state.news = res.data.reverse();
                });
            } else {
              console.log("登录无效");
            }
          });
        }
      },
      {
        key: "download",
        value: function download(id) {
          this.app
            .downloadFile({
              fileID: id
            })
            .then(function(res) {
              console.log(res);
            })
            ["catch"](function(err) {
              console.log(err);
            });
        }
      }
    ]);

    return WechatMonents;
  })();

var _default = WechatMonents;
exports["default"] = _default;
