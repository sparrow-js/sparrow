"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _lowcodeUtils = require("@alilc/lowcode-utils");
var _panel = require("./panel");
var _dec, _dec2, _class, _descriptor, _descriptor2;
function isActiveable(obj) {
  return obj && obj.setActive;
}
var WidgetContainer = (_dec = _lowcodeEditorCore.obx.shallow, _dec2 = _lowcodeEditorCore.obx.ref, (_class = /*#__PURE__*/function () {
  // eslint-disable-next-line no-useless-constructor
  function WidgetContainer(name, handle, exclusive, checkVisible, defaultSetCurrent) {
    if (exclusive === void 0) {
      exclusive = false;
    }
    if (checkVisible === void 0) {
      checkVisible = function checkVisible() {
        return true;
      };
    }
    if (defaultSetCurrent === void 0) {
      defaultSetCurrent = false;
    }
    this.name = name;
    this.handle = handle;
    this.exclusive = exclusive;
    this.checkVisible = checkVisible;
    this.defaultSetCurrent = defaultSetCurrent;
    (0, _initializerDefineProperty2["default"])(this, "items", _descriptor, this);
    this.maps = {};
    (0, _initializerDefineProperty2["default"])(this, "_current", _descriptor2, this);
    (0, _lowcodeEditorCore.makeObservable)(this);
  }
  var _proto = WidgetContainer.prototype;
  _proto.active = function active(nameOrItem) {
    var item = nameOrItem;
    if (nameOrItem && typeof nameOrItem === 'string') {
      item = this.get(nameOrItem);
    }
    if (!isActiveable(item)) {
      item = null;
    }
    if (this.exclusive) {
      if (this._current === item) {
        return;
      }
      if (this._current) {
        this._current.setActive(false);
      }
      this._current = item;
    }
    if (item) {
      item.setActive(true);
    }
  };
  _proto.unactive = function unactive(nameOrItem) {
    var item = nameOrItem;
    if (nameOrItem && typeof nameOrItem === 'string') {
      item = this.get(nameOrItem);
    }
    if (!isActiveable(item)) {
      item = null;
    }
    if (this._current === item) {
      this._current = null;
    }
    if (item) {
      item.setActive(false);
    }
  };
  _proto.unactiveAll = function unactiveAll() {
    var _this = this;
    Object.keys(this.maps).forEach(function (name) {
      return _this.unactive(name);
    });
  };
  _proto.add = function add(item) {
    item = this.handle(item);
    var origin = this.get(item.name);
    if (origin === item) {
      return origin;
    }
    var i = origin ? this.items.indexOf(origin) : -1;
    if (i > -1) {
      this.items[i] = item;
    } else {
      this.items.push(item);
    }
    this.maps[item.name] = item;
    if ((0, _panel.isPanel)(item)) {
      item.setParent(this);
    }
    if (this.defaultSetCurrent) {
      if (!this._current) {
        this.active(item);
      }
    }
    return item;
  };
  _proto.get = function get(name) {
    return this.maps[name] || null;
  };
  _proto.getAt = function getAt(index) {
    return this.items[index] || null;
  };
  _proto.has = function has(name) {
    return (0, _lowcodeUtils.hasOwnProperty)(this.maps, name);
  };
  _proto.indexOf = function indexOf(item) {
    return this.items.indexOf(item);
  }

  /**
   * return indexOf the deletion
   */;
  _proto.remove = function remove(item) {
    var thing = typeof item === 'string' ? this.get(item) : item;
    if (!thing) {
      return -1;
    }
    var i = this.items.indexOf(thing);
    if (i > -1) {
      this.items.splice(i, 1);
    }
    delete this.maps[thing.name];
    if (thing === this.current) {
      this._current = null;
    }
    return i;
  };
  (0, _createClass2["default"])(WidgetContainer, [{
    key: "current",
    get: function get() {
      return this._current;
    }
  }, {
    key: "visible",
    get: function get() {
      return this.checkVisible();
    }
  }]);
  return WidgetContainer;
}(), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "items", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "_current", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "visible", [_lowcodeEditorCore.computed], Object.getOwnPropertyDescriptor(_class.prototype, "visible"), _class.prototype)), _class));
exports["default"] = WidgetContainer;