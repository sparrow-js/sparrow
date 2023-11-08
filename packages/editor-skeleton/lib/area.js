"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _class, _descriptor;
var Area = (_class = /*#__PURE__*/function () {
  function Area(skeleton, name, handle, exclusive, defaultSetCurrent) {
    var _this = this;
    if (defaultSetCurrent === void 0) {
      defaultSetCurrent = false;
    }
    this.skeleton = skeleton;
    this.name = name;
    this.exclusive = exclusive;
    (0, _initializerDefineProperty2["default"])(this, "_visible", _descriptor, this);
    this.container = void 0;
    this.lastCurrent = null;
    (0, _lowcodeEditorCore.makeObservable)(this);
    this.container = skeleton.createContainer(name, handle, exclusive, function () {
      return _this.visible;
    }, defaultSetCurrent);
  }
  var _proto = Area.prototype;
  _proto.isEmpty = function isEmpty() {
    return this.container.items.length < 1;
  };
  _proto.add = function add(config) {
    var item = this.container.get(config.name);
    if (item) {
      return item;
    }
    return this.container.add(config);
  };
  _proto.remove = function remove(config) {
    return this.container.remove(config);
  };
  _proto.setVisible = function setVisible(flag) {
    if (this.exclusive) {
      var current = this.container.current;
      if (flag && !current) {
        this.container.active(this.lastCurrent || this.container.getAt(0));
      } else if (current) {
        this.lastCurrent = current;
        this.container.unactive(current);
      }
      return;
    }
    this._visible = flag;
  };
  _proto.hide = function hide() {
    this.setVisible(false);
  };
  _proto.show = function show() {
    this.setVisible(true);
  }

  // ========== compatible for vision ========
  /**
   * @deprecated
   */;
  _proto.removeAction = function removeAction(config) {
    return this.remove(config);
  };
  (0, _createClass2["default"])(Area, [{
    key: "visible",
    get: function get() {
      if (this.exclusive) {
        return this.container.current != null;
      }
      return this._visible;
    }
  }, {
    key: "current",
    get: function get() {
      if (this.exclusive) {
        return this.container.current;
      }
      return null;
    }
  }]);
  return Area;
}(), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "_visible", [_lowcodeEditorCore.obx], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "visible", [_lowcodeEditorCore.computed], Object.getOwnPropertyDescriptor(_class.prototype, "visible"), _class.prototype)), _class);
exports["default"] = Area;