"use strict";

var cloudbase = require("@cloudbase/node-sdk");

var app = cloudbase.init({
  env: cloudbase.SYMBOL_CURRENT_ENV
});
var db = app.database();
var _ = db.command;

exports.main = function _callee(event, context) {
  var res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.collection("comments").doc(event.rebackPersonId).update({
            otherPersonComments: _.unshift({
              nickname: event.nickname,
              email: event.email,
              comments: event.comment,
              commentTime: event.commentTime,
              uid: event.uid
            })
          }).then(function (res) {
            return '添加评论成功';
          })["catch"](function (err) {
            console.log(err);
          }));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};