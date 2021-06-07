"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _testDb = _interopRequireDefault(require("@/utils/testDb.js"));

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

// 登录注册逻辑
var Login =
  /*#__PURE__*/
  (function() {
    function Login(state) {
      _classCallCheck(this, Login);

      this.state = state;
      this.database = new _testDb["default"](this.state);
    } // 注册

    _createClass(Login, [
      {
        key: "SignUp",
        value: function SignUp() {
          //昵称验证规则
          var nickname_Reg = /^.{2,8}$/; // 邮箱验证

          var email_Reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // 密码验证

          var password_Reg = /^.{6,18}$/;

          if (
            this.state.nickname == "" ||
            this.state.email == "" ||
            this.state.password == "" ||
            this.state.repassword == ""
          ) {
            alert("输入不能为空");
          } else {
            if (
              nickname_Reg.test(this.state.nickname) &&
              email_Reg.test(this.state.email) &&
              password_Reg.test(this.state.password)
            ) {
              if (this.state.password === this.state.repassword) {
                this.database.addUsers();
              } else {
                alert("密码不一致");
              }
            } else {
              alert("请按照要求填写");
            }
          }
        } // 登录
      },
      {
        key: "SignIn",
        value: function SignIn() {
          if (this.state.email != "" && this.state.password != "") {
            this.database.userLogin();
          } else {
            alert("请输入账号和密码");
          }
        }
      }
    ]);

    return Login;
  })();

var _default = Login;
exports["default"] = _default;
