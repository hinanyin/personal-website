"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== "object" && typeof obj !== "function")
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

var routes = [
  {
    path: "/",
    name: "Home",
    component: function component() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard(require("@/views/Home.vue"));
      });
    }
  },
  {
    path: "/music",
    name: "Music",
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    component: function component() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard(require("@/views/Music.vue"));
      });
    }
  },
  {
    path: "/about",
    name: "About",
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    component: function component() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard(require("@/views/About.vue"));
      });
    }
  },
  {
    path: "/contact",
    name: "Contact",
    component: function component() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard(require("@/views/Contact.vue"));
      });
    }
  },
  {
    path: "/listDetail/:id",
    name: "ListDetail",
    component: function component() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard(require("@/components/ListDetail"));
      });
    }
  },
  {
    path: "/MvListDetail/:id",
    name: "MvListDetail",
    component: function component() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard(require("@/components/MvListDetail"));
      });
    }
  },
  {
    path: "/center",
    name: "Center",
    component: function component() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard(require("@/components/Center"));
      });
    },
    children: [
      {
        path: "personalCenter/:id",
        name: "PersonalCenter",
        component: function component() {
          return Promise.resolve().then(function() {
            return _interopRequireWildcard(require("@/views/PersonalCenter"));
          });
        }
      }
    ]
  },
  {
    path: "/chatRoom",
    name: "ChatRoom",
    component: function component() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard(require("@/views/ChatRoom"));
      });
    }
  },
  {
    path: "/wechatMonents",
    name: "WechatMonents",
    component: function component() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard(require("@/views/WechatMonents"));
      });
    }
  }
];
var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHashHistory)(),
  routes: routes
});
var _default = router;
exports["default"] = _default;
