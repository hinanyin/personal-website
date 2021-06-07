const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});

const db = app.database();
const _ = db.command

exports.main = async (event, context) => {
    let res = await db.collection("comments")
        .doc(event._id)
        .update({
            otherPersonComments: event.otherPersonComments
        })
        .then((res) => {
            return '删除评论成功'
        })
        .catch(err => {
            console.log(err);
        });

    return res
};