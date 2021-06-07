// 返回 Hello World
const cloudbase = require("./node_modules/@cloudbase/node-sdk");
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});

const db = app.database();
const _ = db.command
exports.main = async (event) => {
    db.collection('register').doc(event.id).update({
        nickname: event.nickname,
        motto: event.motto,
        QQ: event.QQ
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}