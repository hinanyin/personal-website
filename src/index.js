/* eslint-disable prettier/prettier */
/**
 * @description 快捷键绑定
 * @author 徐凌志
 * @example
 * // 1. 先创建Shortcuts实例，可挂载到任何地方（Window、Vue组件等，但是得确保调用一致性）
 * window.shortcuts = new Shortcuts()
 * // 2. 使用 at 方法调整快捷键到适合的调用层，链式调用 add 方法注册对应事件，事件名称参看底部 shortcutsMap 的 value 值
 * window.shortcuts.at('level1')
 *  .add(['ctrl', 's'], saveExample)
 *  .add('ctrl|z', redoExample)
 * // 3. 如果有新的调用层，比如打开一个新的弹窗，需要再次使用 at 方法到弹窗命名空间，关闭时调用 back 方法返回 level1
 * window.shortcuts.at('modal')
 *  .add('esc', () => {
 *    window.shortcuts.back();
 *  });
 * // 4. 如果不想影响其他页面，请在合适的时候销毁 Shortcuts 实例或者调用 destroy 解绑事件
 * window.shortcuts.destroy();
 * delete window.shortcuts;
 * // 如果进入了新的弹层，请务必将当前的层级调整至合适命名空间！
 * // 看各方法注释可了解更多，如发现bug可直接钉钉找我
 */
let uid = 0;
export default class ShortcutsManager {
  constructor() {
    // 按下按键Set
    this.pressKeyCodesSet = new Set();
    // 松开按键Set
    this.looseKeyCodesSet = new Set();
    // 不同调用层事件表
    this.eventsMap = {
      global: {},
    };
    // 多调用层的共用方法
    this.provideFuncs = {};
    // 共用方法调用层名称集合
    this.provideNames = new Set();
    // 阻止默认事件
    this.prevent = false;
    // 开启console.log标识
    this.logging = false;
    // 开启记录标识
    this.recording = false;
    // 记录回调
    this.recordCallback = () => {};
    // 调用层命名空间栈
    this.namespaceStack = ['global'];
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    // 排除在mac系统下control组合件的问题
    if (this._isMacOS()) {
      delete shortcutsMap.ControlLeft;
      delete shortcutsMap.ControlRight;
    }
  }
  // 当前命名空间
  get namespace() {
    const length = this.namespaceStack.length;
    return this.namespaceStack[length - 1];
  }
  /**
     * @description 绑定事件
     */
  bindingEvent() {
    document.addEventListener('keydown', this.keyDownHandler, true);
    document.addEventListener('keyup', this.keyUpHandler, true);
  }
  /**
     * @description 获取元素类型
     * @param {any} obj 传入的元素
     * @returns {string} 元素类型
     */
  _getType(obj) {
    const class2type = {};
    for (let i = 0, len = typeNameStr.length; i < len; i++) {
      const item = typeNameStr[i];
      class2type['[object ' + item + ']'] = item.toLowerCase();
    }
    if (typeof obj === 'object' || typeof obj === 'function') {
      if (obj.nodeType && obj.nodeType === 1) {
        return 'html';
      } else {
        return class2type[Object.prototype.toString.call(obj)];
      }
    } else {
      return typeof obj;
    }
  }
  /**
     * @description 判断是否在mac系统下
     * @returns {boolean}
     */
  _isMacOS() {
    const av = window.navigator.appVersion;
    if (av.indexOf('Mac') > -1) {
      return true;
    }
    return false;
  }
  /**
     * @description 键盘按下处理函数
     */
  keyDownHandler(e) {
    if (this.prevent) {
      e.preventDefault();
    }
    const { code } = e;
    this.pressKeyCodesSet.add(shortcutsMap[code] || code);
    if (this.logging) {
      console.log(
        `%c You have pressed:
        ${Array.from(this.pressKeyCodesSet).map((k) => k).join(' ')}
      `,
        'font-size: 14px; color: green;'
      );
    }
    if (this.recording) {
      this.recordCallback(Array.from(this.pressKeyCodesSet));
    }
    const keyCodes = Array.from(this.pressKeyCodesSet).join('|');
    for (const key in this.eventsMap[this.namespace]) {
      const events = this.eventsMap[this.namespace][key];
      if (key === keyCodes) {
        // this.pressKeyCodesSet.clear();
        // e.preventDefault();
        events.forEach((event) => {
          if (event.excludeFunc && event.excludeFunc(e)) {
            if (this.logging) {
              console.log('default event');
            }
          } else {
            e.preventDefault();
            event(e);
          }
        });
      }
    }
    if (this.provideNames.has(this.namespace)) {
      if (this.provideFuncs[keyCodes]) {
        e.preventDefault();
        this.provideFuncs[keyCodes].forEach((event) => event());
      }
    }
  }
  /**
     * @description 键盘松开处理函数
     */
  keyUpHandler(e) {
    const { code } = e;
    this.looseKeyCodesSet.add(shortcutsMap[code] || code);
    if (this.logging) {
      console.log(
        `%c You have loosed:
        ${Array.from(this.looseKeyCodesSet).map((k) => k).join(' ')}
      `,
        'font-size: 14px; color: red;'
      );
    }
    if (this.pressKeyCodesSet.has('ctrl') && this.pressKeyCodesSet.size > 1) {
      // const pressArr = Array.from(this.pressKeyCodesSet);
      // const filter = pressArr.filter(name => name === 'ctrl');
      this.pressKeyCodesSet = new Set(['ctrl']);
      this.looseKeyCodesSet.clear();
    } else if (
      this.pressKeyCodesSet.has('shift') &&
      this.pressKeyCodesSet.size > 1
    ) {
      this.pressKeyCodesSet = new Set(['shift']);
      this.looseKeyCodesSet.clear();
    } else {
      this.pressKeyCodesSet.clear();
      this.looseKeyCodesSet.clear();
    }
    // this.pressKeyCodesSet.clear();
    // if (this.pressKeyCodesSet.has('ctrl')) {
    // } else {
    //   this.pressKeyCodesSet.clear();
    // }
  }
  /**
     * @description 设置指定事件调用层，丢弃中间层级
     * @param {string} namespace 调用层名称
     * @returns {ShortcutsManager} 实例
     */
  at(namespace = 'global') {
    if (!this.eventsMap[namespace]) {
      this.eventsMap[namespace] = {};
    }
    const index = this.namespaceStack.indexOf(namespace);
    const length = this.namespaceStack.length;
    if (index > -1) {
      const left = this.namespaceStack.splice(index, length - index);
      left.shift();
      left.forEach((name) => {
        delete this.eventsMap[name];
      });
    }
    this.namespaceStack.push(namespace);
    if (this.logging) {
      console.log(
        `快捷键当前处于：%c${this.namespace}`,
        'font-size: 14px; color: blue; font-weight: bold'
      );
    }
    return this;
  }
  /**
     * @description 切换事件调用层，保留其他层级
     * @param {string} namespace 调用层名称
     * @returns {ShortcutsManager} 实例
     */
  toggle(namespace = 'global') {
    if (!this.eventsMap[namespace]) {
      this.eventsMap[namespace] = {};
    }
    const index = this.namespaceStack.indexOf(namespace);
    if (index > -1) {
      const left = this.namespaceStack.splice(index, 1);
      this.namespaceStack.push(left[0]);
    } else {
      this.namespaceStack.push(namespace);
    }
    if (this.logging) {
      console.log(
        `快捷键当前处于：%c${this.namespace}`,
        'font-size: 14px; color: blue; font-weight: bold'
      );
    }
    return this;
  }
  /**
     * @description 开启console.log，在控制台打印信息
     * @param {boolean} status 调用状态，不传status多次调用相当于来回切换显示/隐藏
     * @returns {ShortcutsManager} 实例
     */
  log(status) {
    if (status && this._getType(status) === 'boolean') {
      this.logging = status;
    } else {
      this.logging = !this.logging;
    }
    return this;
  }
  /**
     * @description 记录按键行为
     * @returns {Function} start(callback: Function)，传入记录回调函数，开启记录
     * @returns {Function} stop，停止记录
     */
  record() {
    return {
      start: (callback) => {
        this.recording = true;
        this.recordCallback = callback;
        return this;
      },
      stop: () => {
        this.recording = false;
        this.recordCallback = () => {};
        return this;
      },
    };
  }
  /**
     * @description 切换是否阻止默认事件
     * @param {boolean} status 调用状态，不传status多次调用相当于来回切换阻止/不阻止
     * @returns {ShortcutsManager} 实例
     */
  togglePrevent(status = false) {
    if (status && this._getType(status) === 'boolean') {
      this.prevent = status;
    } else {
      this.prevent = !this.prevent;
    }
    return this;
  }
  /**
     * @description 提供不同调用层的共用处理方法
     * @param {string | string[]} provideNames 需要使用该方法的调用层名称
     * @param {string | string[]} keys 触发的按键
     * @param {EventBinderFunc} callback 按键回调函数
     * @param {any} excludeFunc 排除默认事件的特殊方法，可根据 e 在外层决定调用默认事件(返回true)或者不调用（返回false）
     * @param {any} context 上下文
     * @returns {ShortcutsManager} 实例
     */
  provide(provideNames, keys, callback, excludeFunc, context) {
    /* eslint-disable no-param-reassign */
    if (
      excludeFunc &&
      (this._getType(excludeFunc) === 'object' ||
        this._getType(excludeFunc) === 'window')
    ) {
      context = excludeFunc;
      excludeFunc = null;
    }
    /* eslint-enable no-param-reassign */
    const id = ++uid;
    callback._uid = id;
    const fn = (...args) => {
      callback.call(context || this, ...args);
    };
    fn._uid = id;
    if (excludeFunc && this._getType(excludeFunc) === 'function') {
      fn.excludeFunc = excludeFunc;
    }
    let eventNameStr = '';
    if (Array.isArray(keys)) {
      eventNameStr = keys.reduce((s, n) => `${s}|${n}`).toLowerCase();
    } else {
      eventNameStr = keys.toLowerCase();
    }
    if (this.provideFuncs[eventNameStr]) {
      this.provideFuncs[eventNameStr].push(fn);
    } else {
      this.provideFuncs[eventNameStr] = [fn];
    }
    if (Array.isArray(provideNames)) {
      provideNames.forEach((name) => {
        this.provideNames.add(name);
      });
    } else {
      this.provideNames.add(provideNames);
    }
    return this;
  }
  /**
     * @description 添加当前调用层的事件处理方法
     * @param {string | string[]} keys 触发的按键
     * @param {EventBinderFunc} callback 按键回调函数
     * @param {any} excludeFunc 排除默认事件的特殊方法，可根据 e 在外层决定调用默认事件(返回true)或者不调用（返回false）
     * @param {any} context 上下文
     * @returns {ShortcutsManager} 实例
     */
  add(keys, callback, excludeFunc, context) {
    /* eslint-disable no-param-reassign */
    if (
      excludeFunc &&
      (this._getType(excludeFunc) === 'object' ||
        this._getType(excludeFunc) === 'window')
    ) {
      context = excludeFunc;
      excludeFunc = null;
    }
    /* eslint-enable no-param-reassign */
    this.bindingEvent();
    const id = ++uid;
    callback._uid = id;
    const fn = (...args) => {
      callback.call(context || this, ...args);
    };
    fn._uid = id;
    if (excludeFunc && this._getType(excludeFunc) === 'function') {
      fn.excludeFunc = excludeFunc;
    }
    let eventNameStr = '';
    if (Array.isArray(keys)) {
      eventNameStr = keys.reduce((s, n) => `${s}|${n}`).toLowerCase();
    } else {
      eventNameStr = keys.toLowerCase();
    }
    if (this.eventsMap[this.namespace][eventNameStr]) {
      this.eventsMap[this.namespace][eventNameStr].push(fn);
    } else {
      this.eventsMap[this.namespace][eventNameStr] = [fn];
    }
    return this;
  }
  /**
     * @description 清空指定调用层，同时清空该调用层的事件集合
     * @param {string} namespace 调用层名称
     * @returns {ShortcutsManager} 实例
     */
  clear(namespace) {
    try {
      const index = this.namespaceStack.indexOf(namespace);
      if (index > 0) {
        this.namespaceStack.splice(index, 1);
      }
      delete this.eventsMap[namespace];
    } catch (error) {
      console.error(error);
    }
    return this;
  }
  /**
     * @description 清空当前调用层的指定按键方法
     * @param {string | string[]} keys 触发的按键
     * @param {EventBinderFunc} callback 按键回调函数
     * @returns {ShortcutsManager} 实例
     */
  remove(keys, callback) {
    const id = callback._uid;
    let eventNameStr = '';
    if (Array.isArray(keys)) {
      eventNameStr = keys.reduce((s, n) => `${s}|${n}`).toLowerCase();
    } else {
      eventNameStr = keys.toLowerCase();
    }
    const fnQuene = this.eventsMap[this.namespace][eventNameStr];
    if (!fnQuene) {
      return;
    }
    if (fnQuene && fnQuene.length > 0) {
      for (let i = fnQuene.length - 1; i >= 0; i--) {
        const fn = fnQuene[i];
        if (fn._uid === id) {
          fnQuene.splice(i, 1);
          if (fnQuene.length === 0) {
            delete this.eventsMap[this.namespace][eventNameStr];
            // if (Object.keys(this.eventsMap[this.namespace]).length === 0) {
            //   delete this.eventsMap[this.namespace];
            //   this.namespace = this.defaultNamespace;
            // }
          }
        }
      }
    } else if (fnQuene.length === 0) {
      delete this.eventsMap[this.namespace][eventNameStr];
      // if (Object.keys(this.eventsMap[this.namespace]).length === 0) {
      //   delete this.eventsMap[this.namespace];
      //   this.namespace = this.defaultNamespace;
      // }
    } else {
      return;
    }
    return this;
  }
  /**
     * @description 抛弃当前调用层，快速返回至上一调用层
     * @returns {ShortcutsManager} 实例
     */
  back() {
    if (this.namespaceStack.length > 1) {
      const name = this.namespaceStack.pop();
      if (name) {
        delete this.eventsMap[name];
      }
    }
    if (this.logging) {
      console.log(
        `快捷键当前处于：%c${this.namespace}`,
        'font-size: 14px; color: blue; font-weight: bold'
      );
    }
    return this;
  }
  /**
     * @description 当前命名空间是否含有某种按键事件
     * @returns {boolean}
     */
  has(keyName) {
    return this.eventsMap[this.namespace][keyName];
  }
  /**
     * @description 重置某调用层的事件集合
     * @param {string} namespace 调用层名称
     * @returns {ShortcutsManager} 实例
     */
  reset(namespace = 'global') {
    this.eventsMap[namespace] = {};
    return this;
  }
  /**
     * @description 所有状态重置，解绑事件
     */
  destroy() {
    this.eventsMap = {
      global: {},
    };
    // this.provideFuncs = {};
    // this.provideNames = new Set<string>();
    this.recording = false;
    this.recordCallback = () => {};
    this.namespaceStack = ['global'];
    this.removeEvent();
  }
  /**
     * @description 解绑事件
     */
  removeEvent() {
    document.removeEventListener('keydown', this.keyDownHandler, true);
    document.removeEventListener('keyup', this.keyUpHandler, true);
  }
}
// 按键映射表（添加的按键映射以对象 value 值为准）
const shortcutsMap = {
  Control: 'ctrl',
  ControlLeft: 'ctrl',
  ControlRight: 'ctrl',
  MetaLeft: 'ctrl',
  MetaRight: 'ctrl',
  Shift: 'shift',
  ShiftLeft: 'shift',
  ShiftRight: 'shift',
  Alt: 'alt',
  AltLeft: 'alt',
  AltRight: 'alt',
  Escape: 'esc',
  Enter: 'enter',
  NumpadEnter: 'enter',
  Tab: 'tab',
  Delete: 'del',
  Backspace: 'backspace',
  Space: 'space',
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ContextMenu: 'contextmenu',
  Home: 'home',
  End: 'end',
  PageUp: 'pageup',
  PageDown: 'pagedown',
  Slash: '?',
  Comma: ',',
  Period: '.',
  Equal: '=',
  Minus: '-',
  KeyA: 'a',
  KeyB: 'b',
  KeyC: 'c',
  KeyD: 'd',
  KeyE: 'e',
  KeyF: 'f',
  KeyG: 'g',
  KeyH: 'h',
  KeyI: 'i',
  KeyJ: 'j',
  KeyK: 'k',
  KeyL: 'l',
  KeyM: 'm',
  KeyN: 'n',
  KeyO: 'o',
  KeyP: 'p',
  KeyQ: 'q',
  KeyR: 'r',
  KeyS: 's',
  KeyT: 'T',
  KeyU: 'u',
  KeyV: 'v',
  KeyW: 'w',
  KeyX: 'x',
  KeyY: 'y',
  KeyZ: 'z',
  Digit0: '0',
  Digit1: '1',
  Digit2: '2',
  Digit3: '3',
  Digit4: '4',
  Digit5: '5',
  Digit6: '6',
  Digit7: '7',
  Digit8: '8',
  Digit9: '9',
  F1: 'f1',
  F2: 'f2',
  F3: 'f3',
  F4: 'f4',
  F5: 'f5',
  F6: 'f6',
  F7: 'f7',
  F8: 'f8',
  F9: 'f9',
  F10: 'f10',
  F11: 'f11',
  F12: 'f12',
};
// 元素类型数组
// eslint-disable-next-line
export const typeNameStr = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined Symbol Window'.split(
  ' '
);
