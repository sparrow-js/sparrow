import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
// @todo 改成 hooks
import React, { Component } from 'react';
import classNames from 'classnames';
import { IconArrow } from '../../icons/arrow';
import { IconExit } from '../../icons/exit';
import { isTitleConfig } from '@alilc/lowcode-types';
export var StageDefaultProps = {
  current: false
};
var Stage = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Stage, _Component);
  function Stage() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.timer = void 0;
    _this.additionClassName = void 0;
    _this.shell = void 0;
    return _this;
  }
  var _proto = Stage.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.doSkate();
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.doSkate();
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    window.clearTimeout(this.timer);
  };
  _proto.doSkate = function doSkate() {
    var _this2 = this;
    window.clearTimeout(this.timer);
    if (this.additionClassName) {
      this.timer = window.setTimeout(function () {
        var elem = _this2.shell;
        if (elem) {
          if (_this2.props.current) {
            elem.classList.remove(_this2.additionClassName);
          } else {
            elem.classList.add(_this2.additionClassName);
          }
          _this2.additionClassName = null;
        }
      }, 15);
    }
  };
  _proto.render = function render() {
    var _this3 = this;
    var _this$props = this.props,
      stage = _this$props.stage,
      current = _this$props.current,
      direction = _this$props.direction;
    var content = stage === null || stage === void 0 ? void 0 : stage.getContent();
    var _ref = stage,
      title = _ref.title;
    var newTitle = isTitleConfig(title) ? title.label : title;
    if (current) {
      if (direction) {
        this.additionClassName = "skeleton-stagebox-stagein-" + direction;
      }
    } else if (direction) {
      this.additionClassName = "skeleton-stagebox-stageout-" + direction;
    }
    var className = classNames('skeleton-stagebox-stage', {
      'skeleton-stagebox-refer': !current
    }, this.additionClassName);
    var stageBacker = stage !== null && stage !== void 0 && stage.hasBack() ? /*#__PURE__*/React.createElement("div", {
      className: "skeleton-stagebox-stagebacker"
    }, /*#__PURE__*/React.createElement(IconArrow, {
      className: "skeleton-stagebox-stage-arrow",
      size: "medium",
      "data-stage-target": "stageback"
    }), /*#__PURE__*/React.createElement("span", {
      className: "skeleton-stagebox-stage-title"
    }, newTitle), /*#__PURE__*/React.createElement(IconExit, {
      className: "skeleton-stagebox-stage-exit",
      size: "medium",
      "data-stage-target": "stageexit"
    })) : null;
    return /*#__PURE__*/React.createElement("div", {
      ref: function ref(_ref2) {
        _this3.shell = _ref2;
      },
      className: className
    }, stageBacker, /*#__PURE__*/React.createElement("div", {
      className: "skeleton-stagebox-stage-content"
    }, content));
  };
  return Stage;
}(Component);
Stage.defaultProps = StageDefaultProps;
export { Stage as default };