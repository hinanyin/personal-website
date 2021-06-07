import Database from "@/utils/testDb.js";
// 登录注册逻辑
class Login {
  constructor(state) {
    this.state = state;
    this.database = new Database(this.state);
  }
  // 注册
  SignUp() {
    //昵称验证规则
    let nickname_Reg = /^.{2,8}$/;
    // 邮箱验证
    let email_Reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // 密码验证
    let password_Reg = /^.{6,18}$/;
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
  }
  // 登录
  SignIn() {
    if (this.state.email != "" && this.state.password != "") {
      this.database.userLogin();
    } else {
      alert("请输入账号和密码");
    }
  }
}
export default Login;
