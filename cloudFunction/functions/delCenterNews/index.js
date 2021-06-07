const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});

const db = app.database();
const _ = db.command
exports.main = async (event) => {
    let res = await db.collection("center")
        .doc(event._id)
        .remove()
        .then((res) => {
            console.log(res)
        })

    return {
        res
    }
}