const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});

const db = app.database();
const _ = db.command

exports.main = async (event, context) => {
    let res = await db.collection("comments")
        .doc(event.rebackPersonId)
        .update({
            otherPersonComments: _.unshift({
                nickname: event.nickname,
                email: event.email,
                comments: event.comment,
                commentTime: event.commentTime,
                uid: event.uid
            })
        })
        .then((res) => {
            return '添加评论成功'
        })
        .catch(err => {
            console.log(err);
        });

    return res
};