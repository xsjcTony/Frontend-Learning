(function (modules) { // webpackBootstrap
  // 1.初始化一个缓存
  var installedModules = {};
  // 2.自己实现了一个require方法
  function __webpack_require__(moduleId) { // "./src/index.js"
    // 2.1判断缓存中有没有当前需要使用的模块
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 2.2自己创建一个缓存
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
    module.l = true;
    // Return the exports of the module
    return module.exports;
  }
  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;
  // expose the module cache
  __webpack_require__.c = installedModules;
  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {enumerable: true, get: getter});
    }
  };
  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
    }
    Object.defineProperty(exports, '__esModule', {value: true});
  };
  // create a fake namespace object
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', {enumerable: true, value: value});
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    return ns;
  };
  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() {
        return module['default'];
      } :
      function getModuleExports() {
        return module;
      };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };
  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  // __webpack_public_path__
  __webpack_require__.p = "";
  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
})
({
  
  "./src/js/index.js": // key
    (function (module, exports, __webpack_require__) { // value
      __webpack_require__("./src/css/index.less");
    }),
  
  "./src/css/index.less": // key
    (function (module, exports, __webpack_require__) { // value
      const style = document.createElement('style');
style.innerHTML = "body {\n  width: 100%;\n  height: 100%;\n}\nbody div {\n  width: 200px;\n  height: 200px;\n  background: red;\n}\n";
document.head.appendChild(style);
    }),
  
});
