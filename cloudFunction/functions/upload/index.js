// 返回 Hello World
const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});

const db = app.database();
const _ = db.command
exports.main = async (event) => {
    db.collection('register').doc(event.id).update({
        userImg: event.userImg
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}