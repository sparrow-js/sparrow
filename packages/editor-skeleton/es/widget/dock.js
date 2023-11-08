import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";
var _dec, _dec2, _class, _descriptor, _descriptor2;
import { createElement } from 'react';
import { makeObservable, obx } from '@alilc/lowcode-editor-core';
import { uniqueId, createContent } from '@alilc/lowcode-utils';
// import { getEvent } from '@alilc/lowcode-shell';

import { DockView, WidgetView } from '../components/widget-views';
/**
 * 带图标（主要）/标题（次要）的扩展
 */
var Dock = (_dec = obx.ref, _dec2 = obx.ref, (_class = /*#__PURE__*/function () {
  function Dock(skeleton, config) {
    this.skeleton = skeleton;
    this.config = config;
    this.isWidget = true;
    this.id = uniqueId('dock');
    this.name = void 0;
    this.align = void 0;
    _initializerDefineProperty(this, "_visible", _descriptor, this);
    _initializerDefineProperty(this, "_disabled", _descriptor2, this);
    this.inited = false;
    this._body = void 0;
    makeObservable(this);
    var _config$props = config.props,
      props = _config$props === void 0 ? {} : _config$props,
      name = config.name;
    this.name = name;
    this.align = props.align;
    if (props.onInit) {
      props.onInit.call(this, this);
    }
  }
  var _proto = Dock.prototype;
  _proto.setVisible = function setVisible(flag) {
    if (flag === this._visible) {
      return;
    }
    if (flag) {
      this._visible = true;
    } else if (this.inited) {
      this._visible = false;
    }
  };
  _proto.setDisabled = function setDisabled(flag) {
    if (this._disabled === flag) return;
    this._disabled = flag;
  };
  _proto.disable = function disable() {
    this.setDisabled(true);
  };
  _proto.enable = function enable() {
    this.setDisabled(false);
  };
  _proto.getContent = function getContent() {
    return this.content;
  };
  _proto.getName = function getName() {
    return this.name;
  };
  _proto.hide = function hide() {
    this.setVisible(false);
  };
  _proto.show = function show() {
    this.setVisible(true);
  };
  _proto.toggle = function toggle() {
    this.setVisible(!this._visible);
  };
  _createClass(Dock, [{
    key: "visible",
    get: function get() {
      return this._visible;
    }
  }, {
    key: "content",
    get: function get() {
      return /*#__PURE__*/createElement(WidgetView, {
        widget: this,
        key: this.id
      });
    }
  }, {
    key: "body",
    get: function get() {
      if (this.inited) {
        return this._body;
      }
      var _this$config = this.config,
        props = _this$config.props,
        content = _this$config.content,
        contentProps = _this$config.contentProps;
      if (content) {
        this._body = createContent(content, _extends({}, contentProps, {
          config: this.config
          // editor: getEvent(this.skeleton.editor),
        }));
      } else {
        this._body = /*#__PURE__*/createElement(DockView, props);
      }
      this.inited = true;
      return this._body;
    }
  }, {
    key: "disabled",
    get: function get() {
      return this._disabled;
    }
  }]);
  return Dock;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_visible", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_disabled", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class));
export { Dock as default };