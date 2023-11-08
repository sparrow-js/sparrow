import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class;
import { Component } from 'react';
import { TipContainer, observer } from '@alilc/lowcode-editor-core';
import classNames from 'classnames';
import LeftArea from './left-area';
import LeftFixedPane from './left-fixed-pane';
import LeftFloatPane from './left-float-pane';
import MainArea from './main-area';
import './workbench.less';
import { SkeletonContext } from '../context';
export var Workbench = observer(_class = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Workbench, _Component);
  function Workbench(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    var _this$props = _this.props,
      config = _this$props.config,
      components = _this$props.components,
      skeleton = _this$props.skeleton;
    skeleton.buildFromConfig(config, components);
    return _this;
  }

  // componentDidCatch(error: any) {
  //   globalContext.get(Editor).emit('editor.skeleton.workbench.error', error);
  // }
  var _proto = Workbench.prototype;
  _proto.render = function render() {
    var _this$props2 = this.props,
      skeleton = _this$props2.skeleton,
      className = _this$props2.className,
      topAreaItemClassName = _this$props2.topAreaItemClassName;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames('lc-workbench', className)
    }, /*#__PURE__*/React.createElement(SkeletonContext.Provider, {
      value: this.props.skeleton
    }, /*#__PURE__*/React.createElement("div", {
      className: "lc-workbench-body"
    }, /*#__PURE__*/React.createElement(LeftArea, {
      area: skeleton.leftArea
    }), /*#__PURE__*/React.createElement(LeftFloatPane, {
      area: skeleton.leftFloatArea
    }), /*#__PURE__*/React.createElement(LeftFixedPane, {
      area: skeleton.leftFixedArea
    }), /*#__PURE__*/React.createElement("div", {
      className: "lc-workbench-center"
    }, /*#__PURE__*/React.createElement(MainArea, {
      area: skeleton.mainArea
    }))), /*#__PURE__*/React.createElement(TipContainer, null)));
  };
  return Workbench;
}(Component)) || _class;