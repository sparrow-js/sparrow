import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import { Component } from 'react';
import classNames from 'classnames';
import './index.less';
var DraggableLine = /*#__PURE__*/function (_Component) {
  _inheritsLoose(DraggableLine, _Component);
  function DraggableLine(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.startDrag = void 0;
    _this.canDrag = void 0;
    _this.offset = void 0;
    _this.currentOffset = void 0;
    _this.offEvent = void 0;
    _this.offDragEvent = void 0;
    _this.startOffset = void 0;
    _this.shell = null;
    _this.startDrag = false;
    _this.canDrag = false;
    _this.offset = 0;
    _this.currentOffset = 0;
    return _this;
  }
  var _proto = DraggableLine.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.offEvent = this.initEvent();
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.offEvent) {
      this.offEvent();
    }
  };
  _proto.onSelectStart = function onSelectStart(e) {
    if (this.startDrag) {
      e.preventDefault();
    }
  };
  _proto.onStartMove = function onStartMove(e) {
    var onDragStart = this.props.onDragStart;
    if (!this.startDrag) {
      onDragStart && onDragStart();
    }
    this.startDrag = true;
    this.canDrag = true;
    this.currentOffset = 0;
    this.offDragEvent = this.initDragEvent();
    this.startOffset = this.getClientPosition(e);
  };
  _proto.onEndMove = function onEndMove() {
    var onDragEnd = this.props.onDragEnd;
    if (this.startDrag) {
      if (this.offDragEvent) {
        this.offDragEvent();
      }
      this.startDrag = false;
      this.offset = this.currentOffset;
    }
    onDragEnd && onDragEnd();
  };
  _proto.onDrag = function onDrag(e) {
    var _this$props = this.props,
      position = _this$props.position,
      onDrag = _this$props.onDrag,
      _this$props$maxIncrem = _this$props.maxIncrement,
      maxIncrement = _this$props$maxIncrem === void 0 ? 100 : _this$props$maxIncrem,
      _this$props$maxDecrem = _this$props.maxDecrement,
      maxDecrement = _this$props$maxDecrem === void 0 ? 0 : _this$props$maxDecrem;
    if (this.startDrag) {
      if (position === 'left' || position === 'top') {
        this.currentOffset = this.offset + this.startOffset - this.getClientPosition(e);
      } else {
        this.currentOffset = this.offset + this.getClientPosition(e) - this.startOffset;
      }
      if (this.currentOffset < -maxDecrement) {
        this.currentOffset = -maxDecrement;
      } else if (this.currentOffset > maxIncrement) {
        this.currentOffset = maxIncrement;
      }
      onDrag(this.currentOffset, e);
    }
  };
  _proto.getClientPosition = function getClientPosition(e) {
    var position = this.props.position;
    return position === 'left' || position === 'right' ? e.clientX : e.clientY;
  };
  _proto.initEvent = function initEvent() {
    var selectStart = this.onSelectStart.bind(this);
    document.addEventListener('selectstart', selectStart);
    return function () {
      return document.removeEventListener('selectstart', selectStart);
    };
  };
  _proto.initDragEvent = function initDragEvent() {
    var onDrag = this.onDrag.bind(this);
    var onEndMove = this.onEndMove.bind(this);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onEndMove);
    return function () {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onEndMove);
    };
  };
  _proto.getParent = function getParent() {
    var _this$shell;
    return (_this$shell = this.shell) === null || _this$shell === void 0 ? void 0 : _this$shell.parentElement;
  };
  _proto.render = function render() {
    var _this2 = this,
      _classNames;
    var _this$props2 = this.props,
      _this$props2$classNam = _this$props2.className,
      className = _this$props2$classNam === void 0 ? '' : _this$props2$classNam,
      position = _this$props2.position;
    return /*#__PURE__*/React.createElement("div", {
      ref: function ref(_ref) {
        _this2.shell = _ref;
      },
      className: classNames(position === 'left' || position === 'right' ? 'lc-draggable-line-vertical' : 'lc-draggable-line-horizontal', (_classNames = {}, _classNames[className] = !!className, _classNames)),
      onMouseDown: function onMouseDown(e) {
        return _this2.onStartMove(e);
      }
    });
  };
  return DraggableLine;
}(Component);
DraggableLine.displayName = 'DraggableLine';
DraggableLine.defaultProps = {
  onDrag: function onDrag() {},
  position: 'right',
  className: '',
  maxIncrement: 100,
  maxDecrement: 0
};
export { DraggableLine as default };