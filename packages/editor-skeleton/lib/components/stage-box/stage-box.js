"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = exports.StageBoxDefaultProps = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _stageChain = _interopRequireDefault(require("./stage-chain"));
var _stage = _interopRequireDefault(require("./stage"));
var _popup = _interopRequireWildcard(require("../popup"));
var _class, _class2;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var StageBoxDefaultProps = {};
exports.StageBoxDefaultProps = StageBoxDefaultProps;
var StageBox = (0, _lowcodeEditorCore.observer)(_class = (_class2 = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(StageBox, _Component);
  function StageBox(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.stageChain = void 0;
    _this.willDetach = [];
    _this.shell = void 0;
    _this.popupPipe = new _popup.PopupPipe();
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
      _this.stageChain = new _stageChain["default"](skeleton.getStage(stateName));
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
    var className = (0, _classnames["default"])('skeleton-stagebox', this.props.className);
    var stage = this.stageChain.getCurrentStage();
    var refer = stage === null || stage === void 0 ? void 0 : stage.getRefer();
    var contentCurrent = null;
    var contentRefer = null;
    if (refer) {
      var _refer$stage;
      contentCurrent = /*#__PURE__*/_react["default"].createElement(_stage["default"], {
        key: stage.getId(),
        stage: stage,
        direction: refer.direction,
        current: true
      });
      contentRefer = /*#__PURE__*/_react["default"].createElement(_stage["default"], {
        key: refer === null || refer === void 0 ? void 0 : (_refer$stage = refer.stage) === null || _refer$stage === void 0 ? void 0 : _refer$stage.getId(),
        stage: refer === null || refer === void 0 ? void 0 : refer.stage,
        direction: refer.direction
      });
    } else {
      contentCurrent = /*#__PURE__*/_react["default"].createElement(_stage["default"], {
        key: stage.getId(),
        stage: stage,
        current: true
      });
    }
    return /*#__PURE__*/_react["default"].createElement("div", {
      ref: function ref(_ref) {
        _this3.shell = _ref;
      },
      className: className
    }, /*#__PURE__*/_react["default"].createElement(_popup["default"], {
      popupPipe: this.popupPipe
    }, contentRefer, contentCurrent));
  };
  return StageBox;
}(_react.Component), _class2.defaultProps = StageBoxDefaultProps, _class2.displayName = 'StageBox', _class2)) || _class;
exports["default"] = StageBox;