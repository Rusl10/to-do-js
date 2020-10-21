// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/main.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"core/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$ = $;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dom = /*#__PURE__*/function () {
  function Dom(selector) {
    _classCallCheck(this, Dom);

    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    console.log('this.$el', this.$el);
  }

  _createClass(Dom, [{
    key: "html",
    value: function html(_html) {
      if (typeof _html === 'string') {
        this.$el.innerHTML = _html;
        return this;
      }

      return this.$el.outerHTML.trim();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.$el.innerHTML = '';
      return this;
    }
  }, {
    key: "append",
    value: function append(node) {
      if (node instanceof Dom) {
        node = node.$el;
      }

      if (Element.prototype.append) {
        this.$el.append(node);
      } else {
        this.$el.appendChild(node);
      }

      return this;
    }
  }, {
    key: "on",
    value: function on(eventType, fn) {
      this.$el.addEventListener(eventType, fn);
    }
  }, {
    key: "off",
    value: function off(eventType, fn) {
      this.$el.removeEventListener(eventType, fn);
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      this.$el.classList.add(className);
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this.$el.classList.remove(className);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(className) {
      this.$el.classList.contains(className) ? this.$el.classList.remove(className) : this.$el.classList.add(className);
    }
  }, {
    key: "find",
    value: function find(selector) {
      return this.$el.querySelector(selector);
    }
  }]);

  return Dom;
}();

function $(selector) {
  return new Dom(selector);
}

$.create = function (tagName) {
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var el = document.createElement(tagName);

  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
},{}],"components/todo/ToDo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToDo = void 0;

var _dom = require("../../core/dom");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ToDo = /*#__PURE__*/function () {
  function ToDo(selector, options) {
    _classCallCheck(this, ToDo);

    this.$el = (0, _dom.$)(selector);
    this.components = options.components || [];
  }

  _createClass(ToDo, [{
    key: "getRoot",
    value: function getRoot() {
      var $root = _dom.$.create('div', 'todo');

      this.components = this.components.map(function (Component) {
        var $el = _dom.$.create('div', Component.className);

        var component = new Component($el);
        $el.html(component.toHTML());
        $root.append($el);
        return component;
      });
      return $root;
    }
  }, {
    key: "render",
    value: function render() {
      this.$el.append(this.getRoot());
      this.components.forEach(function (component) {
        return component.init();
      });
    }
  }]);

  return ToDo;
}();

exports.ToDo = ToDo;
},{"../../core/dom":"core/dom.js"}],"core/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addOn = addOn;

function addOn(listener) {
  return 'on' + listener.charAt(0).toUpperCase() + listener.slice(1);
}
},{}],"core/DomListener.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomListener = void 0;

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DomListener = /*#__PURE__*/function () {
  function DomListener($root) {
    var listeners = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, DomListener);

    if (!$root) {
      throw new Error("No $root provided for DomListener");
    }

    this.$root = $root;
    this.listeners = listeners;
  }

  _createClass(DomListener, [{
    key: "initDOMListeners",
    value: function initDOMListeners() {
      var _this = this;

      this.listeners.forEach(function (listener) {
        console.log('this in dom listener', _this);
        var method = (0, _utils.addOn)(listener);

        if (!_this[method]) {
          var name = _this.name || '';
          throw new Error("Method ".concat(method, " is not implemented in ").concat(name, " Component"));
        }

        _this[method] = _this[method].bind(_this);

        _this.$root.on(listener, _this[method]);
      });
    }
  }, {
    key: "removeDOMListeners",
    value: function removeDOMListeners() {
      var _this2 = this;

      this.listeners.forEach(function (listener) {
        var method = (0, _utils.addOn)(listener);

        _this2.$root.off(listener, _this2[method]);
      });
    }
  }]);

  return DomListener;
}();

exports.DomListener = DomListener;
},{"./utils":"core/utils.js"}],"core/ToDoComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToDoComponent = void 0;

var _DomListener2 = require("./DomListener");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ToDoComponent = /*#__PURE__*/function (_DomListener) {
  _inherits(ToDoComponent, _DomListener);

  var _super = _createSuper(ToDoComponent);

  function ToDoComponent($root) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ToDoComponent);

    _this = _super.call(this, $root, options.listeners);
    _this.name = options.name || '';
    return _this;
  }

  _createClass(ToDoComponent, [{
    key: "toHTML",
    value: function toHTML() {
      return '';
    }
  }, {
    key: "init",
    value: function init() {
      this.initDOMListeners();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.removeDOMListeners();
    }
  }]);

  return ToDoComponent;
}(_DomListener2.DomListener);

exports.ToDoComponent = ToDoComponent;
},{"./DomListener":"core/DomListener.js"}],"components/tasklist/tasklist.template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTaskList = createTaskList;
var tasks = [{
  title: 'Заголовок задачи',
  description: 'lorem5 lorem5 v lorem5 lorem5 v',
  isResolved: false
}, {
  title: 'Заголовок задачи 2',
  description: 'lorem5 lorem5 v lorem5 lorem5 v',
  isResolved: true
}];

function row(content, index) {
  return "<div data-row=\"".concat(index, "\" class=\"row\">").concat(content, "</div>");
}

function col(content) {
  return "<div class=\"col-sm\">".concat(content, "</div>");
}
/* FIXIT index in svg */


function taskContent(task, index) {
  return "\n\t\t<h3>".concat(task.title, "</h3>\n\t\t\t<div class=\"task\">\n\t\t\t\t<p data-description=\"").concat(index, "\" class=\"task__descr ").concat(task.isResolved ? 'task__descr--resolved' : '', "\">").concat(task.description, "</p>\n\t\t\t\t<div class=\"task__controls controls\">\n\t\t\t\t\t<button class=\"controls__check\" data-resolve=\"").concat(index, "\">\n\t\t\t\t\t\t<svg data-resolve=\"").concat(index, "\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-check2\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path fill-rule=\"evenodd\" d=\"M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z\"/>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</button>\n\t\t\t\t\t<button class=\"controls__delete\" data-delete=\"").concat(index, "\">\n\t\t\t\t\t\t<svg data-delete=\"").concat(index, "\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-trash\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n\t\t\t\t\t\t\t<path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t");
}

function createTaskList() {
  var html = '';
  tasks.forEach(function (task, index) {
    html += row(col(taskContent(task, index)), index);
  });
  return html;
}
},{}],"components/tasklist/TaskList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskList = void 0;

var _ToDoComponent2 = require("../../core/ToDoComponent");

var _tasklist = require("./tasklist.template");

var _dom = require("../../core/dom");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TaskList = /*#__PURE__*/function (_ToDoComponent) {
  _inherits(TaskList, _ToDoComponent);

  var _super = _createSuper(TaskList);

  function TaskList($root) {
    _classCallCheck(this, TaskList);

    return _super.call(this, $root, {
      name: 'TaskList',
      listeners: ['click']
    });
  }

  _createClass(TaskList, [{
    key: "toHTML",
    value: function toHTML() {
      return (0, _tasklist.createTaskList)();
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      console.log('event.target.dataset.resolve', event.target.dataset.resolve);

      if (event.target.dataset.resolve) {
        (0, _dom.$)((0, _dom.$)(event.currentTarget).find(".task__descr[data-description='".concat(event.target.dataset.resolve, "']"))).toggleClass('task__descr--resolved');
      }

      if (event.target.dataset.delete) {
        (0, _dom.$)(event.currentTarget).find(".row[data-row='".concat(event.target.dataset.delete, "']")).remove();
      }
    }
  }]);

  return TaskList;
}(_ToDoComponent2.ToDoComponent);

exports.TaskList = TaskList;

_defineProperty(TaskList, "className", 'todo__tasklist');
},{"../../core/ToDoComponent":"core/ToDoComponent.js","./tasklist.template":"components/tasklist/tasklist.template.js","../../core/dom":"core/dom.js"}],"components/sidebar/Sidebar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;

var _ToDoComponent2 = require("../../core/ToDoComponent");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sidebar = /*#__PURE__*/function (_ToDoComponent) {
  _inherits(Sidebar, _ToDoComponent);

  var _super = _createSuper(Sidebar);

  function Sidebar($root) {
    var _this;

    _classCallCheck(this, Sidebar);

    _this = _super.call(this, $root, {
      name: 'Sidebar',
      listeners: ['submit', 'click']
    });
    _this.$root = $root;
    return _this;
  }

  _createClass(Sidebar, [{
    key: "toHTML",
    value: function toHTML() {
      return "\n\t\t\t<form name=\"task\">\n      <h5>task</h5>\n      <div class=\"form-group\">\n        <input class=\"form-control form-control-sm\" name=\"value\" placeholder=\"value\">\n      </div>\n      <div class=\"form-group\">\n        <input class=\"form-control form-control-sm\" name=\"styles\" placeholder=\"styles\">\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary btn-sm\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n    </form>\n    <hr />\n\t\t\t\n\t\t";
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      event.preventDefault();
      console.log('Formula: onInput', event);
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      console.log(5);
    }
  }]);

  return Sidebar;
}(_ToDoComponent2.ToDoComponent);

exports.Sidebar = Sidebar;

_defineProperty(Sidebar, "className", 'todo__sidebar');
},{"../../core/ToDoComponent":"core/ToDoComponent.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./css/main.css");

var _ToDo = require("./components/todo/ToDo");

var _TaskList = require("./components/tasklist/TaskList");

var _Sidebar = require("./components/sidebar/Sidebar");

var todo = new _ToDo.ToDo('#app', {
  components: [_Sidebar.Sidebar, _TaskList.TaskList]
});
todo.render();
},{"./css/main.css":"css/main.css","./components/todo/ToDo":"components/todo/ToDo.js","./components/tasklist/TaskList":"components/tasklist/TaskList.js","./components/sidebar/Sidebar":"components/sidebar/Sidebar.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "13230" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map