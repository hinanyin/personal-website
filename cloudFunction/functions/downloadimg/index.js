// 返回 Hello World
const cloudbase = require('@cloudbase/node-sdk');
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});

exports.main = async (event) => {
    const res = await app.downloadFile({
        fileID: event.fileID
    }).then((res) => {
        return res.fileContent
    });

    return res
}