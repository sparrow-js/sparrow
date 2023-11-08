import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class, _class2;
import React, { Component } from 'react';
import classNames from 'classnames';
import { observer } from '@alilc/lowcode-editor-core';
import StageChain from './stage-chain';
import Stage from './stage';
import PopupService, { PopupPipe } from '../popup';
export var StageBoxDefaultProps = {};
var StageBox = observer(_class = (_class2 = /*#__PURE__*/function (_Component) {
  _inheritsLoose(StageBox, _Component);
  function StageBox(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.stageChain = void 0;
    _this.willDetach = [];
    _this.shell = void 0;
    _this.popupPipe = new PopupPipe();
    _this.pipe = _this.popupPipe.create();
    var _this$props = _this.props,
      stageChain = _this$props.stageChain,
      children = _this$props.children,
      skeleton = _this$props.skeleton;
    if (stageChain) {
      _this.stageChain = stageChain;
    } else {
      var stateName = skeleton.createStage({
        content: children,
        isRoot: true
      });
      _this.stageChain = new StageChain(skeleton.getStage(stateName));
    }
    _this.willDetach.push(_this.stageChain.onStageChange(function () {
      return _this.forceUpdate();
    }));
    return _this;
  }
  var _proto = StageBox.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;
    var shell = this.shell;

    /**
     * 向上层递归寻找 target
     * @param node 节点
     * @returns 节点的 dataset.stageTarget 信息
     */
    var getTarget = function getTarget(node) {
      if (!node || !(shell !== null && shell !== void 0 && shell.contains(node)) || node.nodeName === 'A' && node.getAttribute('href')) {
        return null;
      }
      var target = node.dataset ? node.dataset.stageTarget : null;
      if (target) {
        return target;
      }
      return getTarget(node.parentNode);
    };
    var click = function click(e) {
      var target = getTarget(e.target);
      if (!target) {
        return;
      }
      if (target === 'stageback') {
        _this2.stageChain.stageBack();
      } else if (target === 'stageexit') {
        _this2.stageChain.stageBackToRoot();
      } else {
        var skeleton = _this2.props.skeleton;
        _this2.stageChain.stagePush(skeleton.getStage(target));
      }
    };
    shell === null || shell === void 0 ? void 0 : shell.addEventListener('click', click, false);
    this.willDetach.push(function () {
      return shell === null || shell === void 0 ? void 0 : shell.removeEventListener('click', click, false);
    });
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.willDetach) {
      this.willDetach.forEach(function (off) {
        return off();
      });
    }
  };
  _proto.render = function render() {
    var _this3 = this;
    var className = classNames('skeleton-stagebox', this.props.className);
    var stage = this.stageChain.getCurrentStage();
    var refer = stage === null || stage === void 0 ? void 0 : stage.getRefer();
    var contentCurrent = null;
    var contentRefer = null;
    if (refer) {
      var _refer$stage;
      contentCurrent = /*#__PURE__*/React.createElement(Stage, {
        key: stage.getId(),
        stage: stage,
        direction: refer.direction,
        current: true
      });
      contentRefer = /*#__PURE__*/React.createElement(Stage, {
        key: refer === null || refer === void 0 ? void 0 : (_refer$stage = refer.stage) === null || _refer$stage === void 0 ? void 0 : _refer$stage.getId(),
        stage: refer === null || refer === void 0 ? void 0 : refer.stage,
        direction: refer.direction
      });
    } else {
      contentCurrent = /*#__PURE__*/React.createElement(Stage, {
        key: stage.getId(),
        stage: stage,
        current: true
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      ref: function ref(_ref) {
        _this3.shell = _ref;
      },
      className: className
    }, /*#__PURE__*/React.createElement(PopupService, {
      popupPipe: this.popupPipe
    }, contentRefer, contentCurrent));
  };
  return StageBox;
}(Component), _class2.defaultProps = StageBoxDefaultProps, _class2.displayName = 'StageBox', _class2)) || _class;
export { StageBox as default };