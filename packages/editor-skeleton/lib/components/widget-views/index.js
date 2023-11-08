"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.DialogDockView = void 0;
exports.DockView = DockView;
exports.WidgetView = exports.TitledPanelView = exports.TabsPanelView = exports.PanelView = exports.PanelDockView = exports.DraggableLineView = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _icon = _interopRequireDefault(require("@alifd/next/lib/icon"));
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _autoEditorCore = require("@firefly/auto-editor-core");
var _utils = require("../../widget/utils");
var _skeleton = require("../../skeleton");
var _draggableLine = _interopRequireDefault(require("../draggable-line"));
var _panelOperationRow = _interopRequireDefault(require("./panel-operation-row"));
require("./index.less");
var _excluded = ["dock", "className", "onClick"];
var _class, _class3, _class5, _class7, _class8, _class9;
function DockView(_ref) {
  var _classNames;
  var title = _ref.title,
    icon = _ref.icon,
    description = _ref.description,
    size = _ref.size,
    className = _ref.className,
    onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement(_autoEditorCore.Title, {
    title: (0, _utils.composeTitle)(title, icon, description),
    className: (0, _classnames["default"])('lc-dock', className, (_classNames = {}, _classNames["lc-dock-" + size] = size, _classNames)),
    onClick: onClick
  });
}
function HelpTip(_ref2) {
  var tip = _ref2.tip;
  if (tip && tip.url) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
      href: tip.url,
      target: "_blank",
      rel: "noopener noreferrer"
    }, /*#__PURE__*/React.createElement(_icon["default"], {
      type: "help",
      size: "small",
      className: "lc-help-tip"
    })), /*#__PURE__*/React.createElement(_autoEditorCore.Tip, null, tip.content));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_icon["default"], {
    type: "help",
    size: "small",
    className: "lc-help-tip"
  }), /*#__PURE__*/React.createElement(_autoEditorCore.Tip, null, tip.content));
}
var PanelDockView = (0, _autoEditorCore.observer)(_class = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(PanelDockView, _Component);
  function PanelDockView() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.lastActived = false;
    return _this;
  }
  var _proto = PanelDockView.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.checkActived();
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.checkActived();
  };
  _proto.checkActived = function checkActived() {
    var dock = this.props.dock;
    if (dock.actived !== this.lastActived) {
      this.lastActived = dock.actived;
      if (this.lastActived) {
        dock.skeleton.postEvent(_skeleton.SkeletonEvents.PANEL_DOCK_ACTIVE, dock.name, dock);
      } else {
        dock.skeleton.postEvent(_skeleton.SkeletonEvents.PANEL_DOCK_UNACTIVE, dock.name, dock);
      }
    }
  };
  _proto.render = function render() {
    var _this$props = this.props,
      dock = _this$props.dock,
      className = _this$props.className,
      _onClick = _this$props.onClick,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded);
    return DockView((0, _extends2["default"])({}, props, {
      className: (0, _classnames["default"])(className, {
        actived: dock.actived
      }),
      onClick: function onClick() {
        _onClick && _onClick();
        dock.togglePanel();
      }
    }));
  };
  return PanelDockView;
}(_react.Component)) || _class;
exports.PanelDockView = PanelDockView;
var DialogDockView = /*#__PURE__*/function (_Component2) {
  (0, _inheritsLoose2["default"])(DialogDockView, _Component2);
  function DialogDockView() {
    return _Component2.apply(this, arguments) || this;
  }
  return DialogDockView;
}(_react.Component);
exports.DialogDockView = DialogDockView;
var DraggableLineView = /*#__PURE__*/function (_Component3) {
  (0, _inheritsLoose2["default"])(DraggableLineView, _Component3);
  function DraggableLineView() {
    var _this2;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this2 = _Component3.call.apply(_Component3, [this].concat(args)) || this;
    _this2.shell = void 0;
    _this2.defaultWidth = void 0;
    return _this2;
  }
  var _proto2 = DraggableLineView.prototype;
  _proto2.getDefaultWidth = function getDefaultWidth() {
    var _this$props$panel, _this$props$panel$con, _this$shell;
    var configWidth = (_this$props$panel = this.props.panel) === null || _this$props$panel === void 0 ? void 0 : (_this$props$panel$con = _this$props$panel.config.props) === null || _this$props$panel$con === void 0 ? void 0 : _this$props$panel$con.width;
    if (configWidth) {
      return configWidth;
    }
    if (this.defaultWidth) {
      return this.defaultWidth;
    }
    var containerRef = (_this$shell = this.shell) === null || _this$shell === void 0 ? void 0 : _this$shell.getParent();
    if (containerRef) {
      this.defaultWidth = containerRef.offsetWidth;
      return this.defaultWidth;
    }
    return 300;
  };
  _proto2.onDrag = function onDrag(value) {
    var _this$shell2;
    var defaultWidth = this.getDefaultWidth();
    var width = defaultWidth + value;
    var containerRef = (_this$shell2 = this.shell) === null || _this$shell2 === void 0 ? void 0 : _this$shell2.getParent();
    if (containerRef) {
      containerRef.style.width = width + "px";
    }

    // 抛出事件，对于有些需要 panel 插件随着 度变化进行再次渲染的，由panel插件内部监听事件实现
    var editor = _autoEditorCore.globalContext.get(_autoEditorCore.Editor);
    editor === null || editor === void 0 ? void 0 : editor.emit('dockpane.drag', width);
  };
  _proto2.onDragChange = function onDragChange(type) {
    var editor = _autoEditorCore.globalContext.get(_autoEditorCore.Editor);
    editor === null || editor === void 0 ? void 0 : editor.emit('dockpane.dragchange', type);
    // builtinSimulator 屏蔽掉 鼠标事件
    editor === null || editor === void 0 ? void 0 : editor.emit('designer.builtinSimulator.disabledEvents', type === 'start');
  };
  _proto2.render = function render() {
    var _this$props$panel$con2,
      _this$props$panel$con3,
      _this$props$panel2,
      _this3 = this;
    // left fixed 下不允许改变宽度
    // 默认 关闭，通过配置开启
    var enableDrag = (_this$props$panel$con2 = this.props.panel.config.props) === null || _this$props$panel$con2 === void 0 ? void 0 : _this$props$panel$con2.enableDrag;
    var isRightArea = ((_this$props$panel$con3 = this.props.panel.config) === null || _this$props$panel$con3 === void 0 ? void 0 : _this$props$panel$con3.area) === 'rightArea';
    if (isRightArea || !enableDrag || ((_this$props$panel2 = this.props.panel) === null || _this$props$panel2 === void 0 ? void 0 : _this$props$panel2.parent.name) === 'leftFixedArea') {
      return null;
    }
    return /*#__PURE__*/React.createElement(_draggableLine["default"], {
      ref: function ref(_ref3) {
        _this3.shell = _ref3;
      },
      position: "right",
      className: "lc-engine-slate-draggable-line-right",
      onDrag: function onDrag(e) {
        return _this3.onDrag(e);
      },
      onDragStart: function onDragStart() {
        return _this3.onDragChange('start');
      },
      onDragEnd: function onDragEnd() {
        return _this3.onDragChange('end');
      },
      maxIncrement: 500,
      maxDecrement: 0
      // TODO: 优化
      // maxIncrement={dock.getMaxWidth() - this.cachedSize.width}
      // maxDecrement={this.cachedSize.width - dock.getWidth()}
    });
  };
  return DraggableLineView;
}(_react.Component);
exports.DraggableLineView = DraggableLineView;
var TitledPanelView = (0, _autoEditorCore.observer)(_class3 = /*#__PURE__*/function (_Component4) {
  (0, _inheritsLoose2["default"])(TitledPanelView, _Component4);
  function TitledPanelView() {
    var _this4;
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    _this4 = _Component4.call.apply(_Component4, [this].concat(args)) || this;
    _this4.lastVisible = false;
    return _this4;
  }
  var _proto3 = TitledPanelView.prototype;
  _proto3.componentDidMount = function componentDidMount() {
    this.checkVisible();
  };
  _proto3.componentDidUpdate = function componentDidUpdate() {
    this.checkVisible();
  };
  _proto3.checkVisible = function checkVisible() {
    var panel = this.props.panel;
    var currentVisible = panel.inited && panel.visible;
    if (currentVisible !== this.lastVisible) {
      this.lastVisible = currentVisible;
      if (this.lastVisible) {
        panel.skeleton.postEvent(_skeleton.SkeletonEvents.PANEL_SHOW, panel.name, panel);
      } else {
        panel.skeleton.postEvent(_skeleton.SkeletonEvents.PANEL_HIDE, panel.name, panel);
      }
    }
  };
  _proto3.render = function render() {
    var _panel$config$props;
    var _this$props2 = this.props,
      panel = _this$props2.panel,
      area = _this$props2.area;
    if (!panel.inited) {
      return null;
    }
    var editor = _autoEditorCore.globalContext.get(_autoEditorCore.Editor);
    var panelName = area ? area + "-" + panel.name : panel.name;
    editor === null || editor === void 0 ? void 0 : editor.emit('skeleton.panel.toggle', {
      name: panelName || '',
      status: panel.visible ? 'show' : 'hide'
    });
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames["default"])('lc-titled-panel', {
        hidden: !panel.visible
      }),
      id: panelName,
      "data-keep-visible-while-dragging": (_panel$config$props = panel.config.props) === null || _panel$config$props === void 0 ? void 0 : _panel$config$props.keepVisibleWhileDragging
    }, /*#__PURE__*/React.createElement(_panelOperationRow["default"], {
      panel: panel
    }), /*#__PURE__*/React.createElement(PanelTitle, {
      panel: panel
    }), /*#__PURE__*/React.createElement("div", {
      className: "lc-panel-body"
    }, panel.body), /*#__PURE__*/React.createElement(DraggableLineView, {
      panel: panel
    }));
  };
  return TitledPanelView;
}(_react.Component)) || _class3;
exports.TitledPanelView = TitledPanelView;
var PanelView = (0, _autoEditorCore.observer)(_class5 = /*#__PURE__*/function (_Component5) {
  (0, _inheritsLoose2["default"])(PanelView, _Component5);
  function PanelView() {
    var _this5;
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    _this5 = _Component5.call.apply(_Component5, [this].concat(args)) || this;
    _this5.lastVisible = false;
    return _this5;
  }
  var _proto4 = PanelView.prototype;
  _proto4.componentDidMount = function componentDidMount() {
    this.checkVisible();
  };
  _proto4.componentDidUpdate = function componentDidUpdate() {
    this.checkVisible();
  };
  _proto4.checkVisible = function checkVisible() {
    var panel = this.props.panel;
    var currentVisible = panel.inited && panel.visible;
    if (currentVisible !== this.lastVisible) {
      this.lastVisible = currentVisible;
      if (this.lastVisible) {
        panel.skeleton.postEvent(_skeleton.SkeletonEvents.PANEL_SHOW, panel.name, panel);
        // FIXME! remove this line
        panel.skeleton.postEvent('leftPanel.show', panel.name, panel);
      } else {
        panel.skeleton.postEvent(_skeleton.SkeletonEvents.PANEL_HIDE, panel.name, panel);
        // FIXME! remove this line
        panel.skeleton.postEvent('leftPanel.hide', panel.name, panel);
      }
    }
  };
  _proto4.render = function render() {
    var _panel$config$props2;
    var _this$props3 = this.props,
      panel = _this$props3.panel,
      area = _this$props3.area,
      hideOperationRow = _this$props3.hideOperationRow,
      hideDragLine = _this$props3.hideDragLine;
    if (!panel.inited) {
      return null;
    }
    var editor = _autoEditorCore.globalContext.get(_autoEditorCore.Editor);
    var panelName = area ? area + "-" + panel.name : panel.name;
    editor === null || editor === void 0 ? void 0 : editor.emit('skeleton.panel.toggle', {
      name: panelName || '',
      status: panel.visible ? 'show' : 'hide'
    });
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames["default"])('lc-panel', {
        hidden: !panel.visible
      }),
      id: panelName,
      "data-keep-visible-while-dragging": (_panel$config$props2 = panel.config.props) === null || _panel$config$props2 === void 0 ? void 0 : _panel$config$props2.keepVisibleWhileDragging
    }, !hideOperationRow && /*#__PURE__*/React.createElement(_panelOperationRow["default"], {
      panel: panel
    }), panel.body, !hideDragLine && /*#__PURE__*/React.createElement(DraggableLineView, {
      panel: panel
    }));
  };
  return PanelView;
}(_react.Component)) || _class5;
exports.PanelView = PanelView;
var TabsPanelView = (0, _autoEditorCore.observer)(_class7 = /*#__PURE__*/function (_Component6) {
  (0, _inheritsLoose2["default"])(TabsPanelView, _Component6);
  function TabsPanelView() {
    return _Component6.apply(this, arguments) || this;
  }
  var _proto5 = TabsPanelView.prototype;
  _proto5.render = function render() {
    var container = this.props.container;
    var titles = [];
    var contents = [];
    container.items.forEach(function (item) {
      titles.push( /*#__PURE__*/React.createElement(PanelTitle, {
        key: item.id,
        panel: item,
        className: "lc-tab-title"
      }));
      contents.push( /*#__PURE__*/React.createElement(PanelView, {
        key: item.id,
        panel: item,
        hideOperationRow: true,
        hideDragLine: true
      }));
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "lc-tabs"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lc-tabs-title",
      onClick: function onClick(e) {
        var shell = e.currentTarget;
        var t = e.target;
        var elt = shell.firstElementChild;
        while (elt) {
          if (elt.contains(t)) {
            break;
          }
          elt = elt.nextElementSibling;
        }
        if (elt) {
          container.active(elt.dataset.name);
        }
      }
    }, titles), /*#__PURE__*/React.createElement("div", {
      className: "lc-tabs-content"
    }, contents));
  };
  return TabsPanelView;
}(_react.Component)) || _class7;
exports.TabsPanelView = TabsPanelView;
var PanelTitle = (0, _autoEditorCore.observer)(_class8 = /*#__PURE__*/function (_Component7) {
  (0, _inheritsLoose2["default"])(PanelTitle, _Component7);
  function PanelTitle() {
    return _Component7.apply(this, arguments) || this;
  }
  var _proto6 = PanelTitle.prototype;
  _proto6.render = function render() {
    var _this$props4 = this.props,
      panel = _this$props4.panel,
      className = _this$props4.className;
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames["default"])('lc-panel-title', className, {
        actived: panel.actived
      }),
      "data-name": panel.name
    }, /*#__PURE__*/React.createElement(_autoEditorCore.Title, {
      title: panel.title || panel.name
    }), panel.help ? /*#__PURE__*/React.createElement(HelpTip, {
      tip: panel.help
    }) : null);
  };
  return PanelTitle;
}(_react.Component)) || _class8;
var WidgetView = (0, _autoEditorCore.observer)(_class9 = /*#__PURE__*/function (_Component8) {
  (0, _inheritsLoose2["default"])(WidgetView, _Component8);
  function WidgetView() {
    var _this6;
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    _this6 = _Component8.call.apply(_Component8, [this].concat(args)) || this;
    _this6.lastVisible = false;
    _this6.lastDisabled = false;
    return _this6;
  }
  var _proto7 = WidgetView.prototype;
  _proto7.componentDidMount = function componentDidMount() {
    this.checkVisible();
    this.checkDisabled();
  };
  _proto7.componentDidUpdate = function componentDidUpdate() {
    this.checkVisible();
    this.checkDisabled();
  };
  _proto7.checkVisible = function checkVisible() {
    var widget = this.props.widget;
    var currentVisible = widget.visible;
    if (currentVisible !== this.lastVisible) {
      this.lastVisible = currentVisible;
      if (this.lastVisible) {
        widget.skeleton.postEvent(_skeleton.SkeletonEvents.WIDGET_SHOW, widget.name, widget);
      } else {
        widget.skeleton.postEvent(_skeleton.SkeletonEvents.WIDGET_SHOW, widget.name, widget);
      }
    }
  };
  _proto7.checkDisabled = function checkDisabled() {
    var widget = this.props.widget;
    var currentDisabled = widget.disabled;
    if (currentDisabled !== this.lastDisabled) {
      this.lastDisabled = currentDisabled;
      if (this.lastDisabled) {
        widget.skeleton.postEvent(_skeleton.SkeletonEvents.WIDGET_DISABLE, widget.name, widget);
      } else {
        widget.skeleton.postEvent(_skeleton.SkeletonEvents.WIDGET_ENABLE, widget.name, widget);
      }
    }
  };
  _proto7.render = function render() {
    var widget = this.props.widget;
    if (!widget.visible) {
      return null;
    }
    if (widget.disabled) {
      return /*#__PURE__*/React.createElement("div", {
        className: "lc-widget-disabled"
      }, widget.body);
    }
    return widget.body;
  };
  return WidgetView;
}(_react.Component)) || _class9;
exports.WidgetView = WidgetView;