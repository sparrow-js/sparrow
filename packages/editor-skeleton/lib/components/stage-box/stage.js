"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = exports.StageDefaultProps = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _arrow = require("../../icons/arrow");
var _exit = require("../../icons/exit");
var _lowcodeTypes = require("@alilc/lowcode-types");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// @todo 改成 hooks

var StageDefaultProps = {
  current: false
};
exports.StageDefaultProps = StageDefaultProps;
var Stage = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(Stage, _Component);
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
    var newTitle = (0, _lowcodeTypes.isTitleConfig)(title) ? title.label : title;
    if (current) {
      if (direction) {
        this.additionClassName = "skeleton-stagebox-stagein-" + direction;
      }
    } else if (direction) {
      this.additionClassName = "skeleton-stagebox-stageout-" + direction;
    }
    var className = (0, _classnames["default"])('skeleton-stagebox-stage', {
      'skeleton-stagebox-refer': !current
    }, this.additionClassName);
    var stageBacker = stage !== null && stage !== void 0 && stage.hasBack() ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "skeleton-stagebox-stagebacker"
    }, /*#__PURE__*/_react["default"].createElement(_arrow.IconArrow, {
      className: "skeleton-stagebox-stage-arrow",
      size: "medium",
      "data-stage-target": "stageback"
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: "skeleton-stagebox-stage-title"
    }, newTitle), /*#__PURE__*/_react["default"].createElement(_exit.IconExit, {
      className: "skeleton-stagebox-stage-exit",
      size: "medium",
      "data-stage-target": "stageexit"
    })) : null;
    return /*#__PURE__*/_react["default"].createElement("div", {
      ref: function ref(_ref2) {
        _this3.shell = _ref2;
      },
      className: className
    }, stageBacker, /*#__PURE__*/_react["default"].createElement("div", {
      className: "skeleton-stagebox-stage-content"
    }, content));
  };
  return Stage;
}(_react.Component);
exports["default"] = Stage;
Stage.defaultProps = StageDefaultProps;