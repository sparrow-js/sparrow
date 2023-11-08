import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";
var _dec, _dec2, _class, _descriptor, _descriptor2;
import { obx, computed, makeObservable } from '@alilc/lowcode-editor-core';
import { hasOwnProperty } from '@alilc/lowcode-utils';
import { isPanel } from './panel';
function isActiveable(obj) {
  return obj && obj.setActive;
}
var WidgetContainer = (_dec = obx.shallow, _dec2 = obx.ref, (_class = /*#__PURE__*/function () {
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
    _initializerDefineProperty(this, "items", _descriptor, this);
    this.maps = {};
    _initializerDefineProperty(this, "_current", _descriptor2, this);
    makeObservable(this);
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
    if (isPanel(item)) {
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
    return hasOwnProperty(this.maps, name);
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
  _createClass(WidgetContainer, [{
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
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "items", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_current", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class.prototype, "visible", [computed], Object.getOwnPropertyDescriptor(_class.prototype, "visible"), _class.prototype)), _class));
export { WidgetContainer as default };