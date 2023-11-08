import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";
var _class, _descriptor;
import { obx, computed, makeObservable } from '@alilc/lowcode-editor-core';
var Area = (_class = /*#__PURE__*/function () {
  function Area(skeleton, name, handle, exclusive, defaultSetCurrent) {
    var _this = this;
    if (defaultSetCurrent === void 0) {
      defaultSetCurrent = false;
    }
    this.skeleton = skeleton;
    this.name = name;
    this.exclusive = exclusive;
    _initializerDefineProperty(this, "_visible", _descriptor, this);
    this.container = void 0;
    this.lastCurrent = null;
    makeObservable(this);
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
  _createClass(Area, [{
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
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_visible", [obx], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _applyDecoratedDescriptor(_class.prototype, "visible", [computed], Object.getOwnPropertyDescriptor(_class.prototype, "visible"), _class.prototype)), _class);
export { Area as default };