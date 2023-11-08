import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
// import { uniqueId } from '@alilc/lowcode-utils';
import Widget from './widget';
export var Stage = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(Stage, _Widget);
  function Stage(skeleton, config) {
    var _this;
    _this = _Widget.call(this, skeleton, config) || this;
    _this.isRoot = void 0;
    _this.previous = void 0;
    _this.refer = void 0;
    _this.isRoot = config.isRoot || false;
    return _this;
  }
  var _proto = Stage.prototype;
  _proto.setPrevious = function setPrevious(stage) {
    this.previous = stage;
  };
  _proto.getPrevious = function getPrevious() {
    return this.previous;
  };
  _proto.hasBack = function hasBack() {
    return !!(this.previous && !this.isRoot);
  };
  _proto.setRefer = function setRefer(stage, direction) {
    this.refer = {
      stage: stage,
      direction: direction
    };
  };
  _proto.setReferRight = function setReferRight(stage) {
    this.setRefer(stage, 'right');
  };
  _proto.setReferLeft = function setReferLeft(stage) {
    this.setRefer(stage, 'left');
  };
  _proto.getRefer = function getRefer() {
    var refer = this.refer;
    this.refer = undefined;
    return refer;
  };
  return Stage;
}(Widget);