"use strict";

var cloudbase = require("@cloudbase/node-sdk");

var app = cloudbase.init({
  env: cloudbase.SYMBOL_CURRENT_ENV
});
var db = app.database();
var _ = db.command;

exports.main = function _callee(event) {
  var res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.collection("center").doc(event._id).remove().then(function (res) {
            console.log(res);
          }));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", {
            res: res
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};