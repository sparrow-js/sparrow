"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
exports.isPanel = isPanel;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _events = require("events");
var _react = require("react");
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _lowcodeUtils = require("@alilc/lowcode-utils");
var _widgetViews = require("../components/widget-views");
var _utils = require("./utils");
var _panelDock = require("./panel-dock");
var _dec, _dec2, _dec3, _class, _descriptor, _descriptor2, _descriptor3; // import { getEvent } from '@alilc/lowcode-shell';
var Panel = (_dec = _lowcodeEditorCore.obx.ref, _dec2 = _lowcodeEditorCore.obx.ref, _dec3 = _lowcodeEditorCore.obx.ref, (_class = /*#__PURE__*/function () {
  function Panel(skeleton, config) {
    var _this = this;
    this.skeleton = skeleton;
    this.config = config;
    this.isWidget = true;
    this.name = void 0;
    this.id = void 0;
    (0, _initializerDefineProperty2["default"])(this, "inited", _descriptor, this);
    (0, _initializerDefineProperty2["default"])(this, "_actived", _descriptor2, this);
    this.emitter = new _events.EventEmitter();
    this.isPanel = true;
    this.title = void 0;
    this.help = void 0;
    this.plain = false;
    this.container = void 0;
    (0, _initializerDefineProperty2["default"])(this, "parent", _descriptor3, this);
    (0, _lowcodeEditorCore.makeObservable)(this);
    var name = config.name,
      content = config.content,
      _config$props = config.props,
      props = _config$props === void 0 ? {} : _config$props;
    var hideTitleBar = props.hideTitleBar,
      title = props.title,
      icon = props.icon,
      description = props.description,
      help = props.help;
    this.name = name;
    this.id = (0, _lowcodeUtils.uniqueId)("pane:" + name + "$");
    this.title = (0, _utils.composeTitle)(title || name, icon, description);
    this.plain = hideTitleBar || !title;
    this.help = help;
    if (Array.isArray(content)) {
      if (content.length === 1) {
        // todo: not show tabs
      }
      this.container = this.skeleton.createContainer(name, function (item) {
        if (isPanel(item)) {
          return item;
        }
        return _this.skeleton.createPanel(item);
      }, true, function () {
        return _this.visible;
      }, true);
      content.forEach(function (item) {
        return _this.add(item);
      });
    }
    if (props.onInit) {
      props.onInit.call(this, this);
    }
    if (content.onInit) {
      content.onInit.call(this, this);
    }
    // todo: process shortcut
  }
  var _proto = Panel.prototype;
  _proto.setParent = function setParent(parent) {
    if (parent === this.parent) {
      return;
    }
    if (this.parent) {
      this.parent.remove(this);
    }
    this.parent = parent;
  };
  _proto.add = function add(item) {
    var _this$container;
    return (_this$container = this.container) === null || _this$container === void 0 ? void 0 : _this$container.add(item);
  };
  _proto.getPane = function getPane(name) {
    var _this$container2;
    return ((_this$container2 = this.container) === null || _this$container2 === void 0 ? void 0 : _this$container2.get(name)) || null;
  };
  _proto.remove = function remove(item) {
    var _this$container3;
    return (_this$container3 = this.container) === null || _this$container3 === void 0 ? void 0 : _this$container3.remove(item);
  };
  _proto.active = function active(item) {
    if (item) {
      var _this$container4;
      (_this$container4 = this.container) === null || _this$container4 === void 0 ? void 0 : _this$container4.active(item);
    } else {
      this.setActive(true);
    }
  };
  _proto.getName = function getName() {
    return this.name;
  };
  _proto.getContent = function getContent() {
    return this.content;
  }

  /**
   * check is current panel is in float area or not
   *
   * @returns {boolean}
   * @memberof Panel
   */;
  _proto.isChildOfFloatArea = function isChildOfFloatArea() {
    var _this$parent;
    return ((_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.name) === 'leftFloatArea';
  }

  /**
   * check is current panel is in fixed area or not
   *
   * @returns {boolean}
   * @memberof Panel
   */;
  _proto.isChildOfFixedArea = function isChildOfFixedArea() {
    var _this$parent2;
    return ((_this$parent2 = this.parent) === null || _this$parent2 === void 0 ? void 0 : _this$parent2.name) === 'leftFixedArea';
  };
  _proto.setActive = function setActive(flag) {
    if (flag === this._actived) {
      // TODO: 如果移动到另外一个 container，会有问题
      return;
    }
    if (flag) {
      var _this$parent3;
      // 对于 Area 的直接 Child，要专门处理 Float & Fixed 分组切换, 其他情况不需要
      this._actived = true;
      (_this$parent3 = this.parent) === null || _this$parent3 === void 0 ? void 0 : _this$parent3.active(this);
      if (!this.inited) {
        this.inited = true;
      }
      this.emitter.emit('activechange', true);
    } else if (this.inited) {
      var _this$parent4, _this$parent5;
      if ((_this$parent4 = this.parent) !== null && _this$parent4 !== void 0 && _this$parent4.name && this.name.startsWith(this.parent.name)) {
        this.inited = false;
      }
      this._actived = false;
      (_this$parent5 = this.parent) === null || _this$parent5 === void 0 ? void 0 : _this$parent5.unactive(this);
      this.emitter.emit('activechange', false);
    }
  };
  _proto.toggle = function toggle() {
    this.setActive(!this._actived);
  };
  _proto.hide = function hide() {
    this.setActive(false);
  };
  _proto.show = function show() {
    this.setActive(true);
  };
  _proto.getAssocDocks = function getAssocDocks() {
    var _this2 = this;
    return this.skeleton.widgets.filter(function (item) {
      return (0, _panelDock.isPanelDock)(item) && item.panelName === _this2.name;
    });
  }

  /**
   * @deprecated
   */;
  _proto.getSupportedPositions = function getSupportedPositions() {
    return ['default'];
  }

  /**
   * @deprecated
   */;
  _proto.getCurrentPosition = function getCurrentPosition() {
    return 'default';
  }

  /**
   * @deprecated
   */;
  _proto.setPosition = function setPosition( /* position: string */
  ) {
    // noop
  }

  /**
   * @deprecated
   */;
  _proto.onActiveChange = function onActiveChange(fn) {
    var _this3 = this;
    this.emitter.on('activechange', fn);
    return function () {
      _this3.emitter.removeListener('activechange', fn);
    };
  };
  (0, _createClass2["default"])(Panel, [{
    key: "actived",
    get: function get() {
      return this._actived;
    }
  }, {
    key: "visible",
    get: function get() {
      if (!this.parent || this.parent.visible) {
        var props = this.config.props;
        if (props !== null && props !== void 0 && props.condition) {
          return props.condition(this);
        }
        return this._actived;
      }
      return false;
    }
  }, {
    key: "body",
    get: function get() {
      if (this.container) {
        return /*#__PURE__*/(0, _react.createElement)(_widgetViews.TabsPanelView, {
          container: this.container
        });
      }
      var _this$config = this.config,
        content = _this$config.content,
        contentProps = _this$config.contentProps;
      return (0, _lowcodeUtils.createContent)(content, (0, _extends2["default"])({}, contentProps, {
        // editor: getEvent(this.skeleton.editor),
        config: this.config,
        panel: this,
        pane: this
      }));
    }
  }, {
    key: "content",
    get: function get() {
      var _this$config2, _this$parent6;
      var area = ((_this$config2 = this.config) === null || _this$config2 === void 0 ? void 0 : _this$config2.area) || ((_this$parent6 = this.parent) === null || _this$parent6 === void 0 ? void 0 : _this$parent6.name);
      if (this.plain) {
        return /*#__PURE__*/(0, _react.createElement)(_widgetViews.PanelView, {
          panel: this,
          key: this.id,
          area: area
        });
      }
      return /*#__PURE__*/(0, _react.createElement)(_widgetViews.TitledPanelView, {
        panel: this,
        key: this.id,
        area: area
      });
    }
  }]);
  return Panel;
}(), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "inited", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "_actived", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "actived", [_lowcodeEditorCore.computed], Object.getOwnPropertyDescriptor(_class.prototype, "actived"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "visible", [_lowcodeEditorCore.computed], Object.getOwnPropertyDescriptor(_class.prototype, "visible"), _class.prototype), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "parent", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class));
exports["default"] = Panel;
function isPanel(obj) {
  return obj && obj.isPanel;
}