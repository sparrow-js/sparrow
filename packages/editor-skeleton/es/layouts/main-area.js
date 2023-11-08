import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class;
import { Component } from 'react';
import classNames from 'classnames';
import { observer } from '@alilc/lowcode-editor-core';
var MainArea = observer(_class = /*#__PURE__*/function (_Component) {
  _inheritsLoose(MainArea, _Component);
  function MainArea() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = MainArea.prototype;
  _proto.render = function render() {
    var area = this.props.area;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames('lc-main-area engine-workspacepane')
    }, area.container.items.map(function (item) {
      return item.content;
    }));
  };
  return MainArea;
}(Component)) || _class;
export { MainArea as default };