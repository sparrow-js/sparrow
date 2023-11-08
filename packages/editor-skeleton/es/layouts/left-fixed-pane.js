import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class, _class2;
import { Component, Fragment } from 'react';
import classNames from 'classnames';
import { observer } from '@firefly/auto-editor-core';
var LeftFixedPane = observer(_class2 = /*#__PURE__*/function (_Component2) {
  _inheritsLoose(LeftFixedPane, _Component2);
  function LeftFixedPane() {
    return _Component2.apply(this, arguments) || this;
  }
  var _proto2 = LeftFixedPane.prototype;
  _proto2.componentDidUpdate = function componentDidUpdate() {
    var _this$props$area$skel;
    // FIXME: dirty fix, need deep think
    (_this$props$area$skel = this.props.area.skeleton.editor.get('designer')) === null || _this$props$area$skel === void 0 ? void 0 : _this$props$area$skel.touchOffsetObserver();
  };
  _proto2.render = function render() {
    var _area$current, _area$current$config$;
    var area = this.props.area;
    var width = (_area$current = area.current) === null || _area$current === void 0 ? void 0 : (_area$current$config$ = _area$current.config.props) === null || _area$current$config$ === void 0 ? void 0 : _area$current$config$.width;
    var style = width ? {
      width: width
    } : undefined;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames('lc-left-fixed-pane', {
        'lc-area-visible': area.visible
      }),
      style: style
    }, /*#__PURE__*/React.createElement(Contents, {
      area: area
    }));
  };
  return LeftFixedPane;
}(Component)) || _class2;
export { LeftFixedPane as default };
var Contents = observer(_class = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Contents, _Component);
  function Contents() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = Contents.prototype;
  _proto.render = function render() {
    var area = this.props.area;
    return /*#__PURE__*/React.createElement(Fragment, null, area.container.items.map(function (panel) {
      return panel.content;
    }));
  };
  return Contents;
}(Component)) || _class;