// 返回 Hello World
const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});

const db = app.database();
const _ = db.command
exports.main = async (event) => {
    let _id = await event._id
    let res = await db.collection('comments').doc(_id).remove()
    return res
}