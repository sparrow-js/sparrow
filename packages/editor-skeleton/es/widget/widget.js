import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";
var _dec, _dec2, _dec3, _class, _descriptor, _descriptor2, _descriptor3;
import { createElement } from 'react';
import { makeObservable, obx } from '@alilc/lowcode-editor-core';
import { createContent, uniqueId } from '@alilc/lowcode-utils';
// import { getEvent } from '@alilc/lowcode-shell';

import { WidgetView } from '../components/widget-views';
var Widget = (_dec = obx.ref, _dec2 = obx.ref, _dec3 = obx.ref, (_class = /*#__PURE__*/function () {
  function Widget(skeleton, config) {
    this.skeleton = skeleton;
    this.config = config;
    this.isWidget = true;
    this.id = uniqueId('widget');
    this.name = void 0;
    this.align = void 0;
    _initializerDefineProperty(this, "_visible", _descriptor, this);
    _initializerDefineProperty(this, "inited", _descriptor2, this);
    _initializerDefineProperty(this, "_disabled", _descriptor3, this);
    this._body = void 0;
    this.title = void 0;
    makeObservable(this);
    var _config$props = config.props,
      props = _config$props === void 0 ? {} : _config$props,
      name = config.name;
    this.name = name;
    this.align = props.align;
    this.title = props.title || name;
    if (props.onInit) {
      props.onInit.call(this, this);
    }
  }
  var _proto = Widget.prototype;
  _proto.getId = function getId() {
    return this.id;
  };
  _proto.getName = function getName() {
    return this.name;
  };
  _proto.getContent = function getContent() {
    return this.content;
  };
  _proto.hide = function hide() {
    this.setVisible(false);
  };
  _proto.show = function show() {
    this.setVisible(true);
  };
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
  _proto.toggle = function toggle() {
    this.setVisible(!this._visible);
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
  _createClass(Widget, [{
    key: "visible",
    get: function get() {
      return this._visible;
    }
  }, {
    key: "body",
    get: function get() {
      if (this.inited) {
        return this._body;
      }
      this.inited = true;
      var _this$config = this.config,
        content = _this$config.content,
        contentProps = _this$config.contentProps;
      this._body = createContent(content, _extends({}, contentProps, {
        config: this.config
        // editor: getEvent(this.skeleton.editor),
      }));

      return this._body;
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
    key: "disabled",
    get: function get() {
      return this._disabled;
    }
  }]);
  return Widget;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_visible", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "inited", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class));
export { Widget as default };
export function isWidget(obj) {
  return obj && obj.isWidget;
}