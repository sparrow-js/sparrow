"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.postTip = postTip;
exports.tipHandler = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _events = require("events");
var TipHandler = /*#__PURE__*/function () {
  function TipHandler() {
    this.tip = null;
    this.showDelay = null;
    this.hideDelay = null;
    this.emitter = new _events.EventEmitter();
  }
  var _proto = TipHandler.prototype;
  _proto.setTarget = function setTarget(target) {
    var _this = this;
    var tip = findTip(target);
    if (tip) {
      if (this.tip) {
        // the some target should return
        if (this.tip.target === tip.target) {
          this.tip = tip;
          return;
        }
        // not show already, reset show delay
        if (this.showDelay) {
          clearTimeout(this.showDelay);
          this.showDelay = null;
          this.tip = null;
        } else {
          if (this.hideDelay) {
            clearTimeout(this.hideDelay);
            this.hideDelay = null;
          }
          this.tip = tip;
          this.emitter.emit('tipchange');
          return;
        }
      }
      this.tip = tip;
      if (this.hideDelay) {
        clearTimeout(this.hideDelay);
        this.hideDelay = null;
        this.emitter.emit('tipchange');
      } else {
        this.showDelay = setTimeout(function () {
          _this.showDelay = null;
          _this.emitter.emit('tipchange');
        }, 350);
      }
    } else {
      if (this.showDelay) {
        clearTimeout(this.showDelay);
        this.showDelay = null;
      } else {
        this.hideDelay = setTimeout(function () {
          _this.hideDelay = null;
        }, 100);
      }
      this.tip = null;
      this.emitter.emit('tipchange');
    }
  };
  _proto.hideImmediately = function hideImmediately() {
    if (this.hideDelay) {
      clearTimeout(this.hideDelay);
      this.hideDelay = null;
    }
    if (this.showDelay) {
      clearTimeout(this.showDelay);
      this.showDelay = null;
    }
    this.tip = null;
    this.emitter.emit('tipchange');
  };
  _proto.onChange = function onChange(func) {
    var _this2 = this;
    this.emitter.on('tipchange', func);
    return function () {
      _this2.emitter.removeListener('tipchange', func);
    };
  };
  return TipHandler;
}();
var tipHandler = new TipHandler();
exports.tipHandler = tipHandler;
function findTip(target) {
  if (!target) {
    return null;
  }
  // optimize deep finding on mouseover
  var loopupLimit = 10;
  while (target && loopupLimit-- > 0) {
    // get tip from target node
    if (target.dataset && target.dataset.tip) {
      return {
        children: target.dataset.tip,
        direction: target.dataset.direction || target.dataset.dir,
        theme: target.dataset.theme,
        target: target
      };
    }

    // or get tip from child nodes
    var child = target.lastElementChild;
    while (child) {
      if (child.dataset && child.dataset.role === 'tip') {
        var tipId = child.dataset.tipId;
        if (!tipId) {
          return null;
        }
        var tipProps = tipsMap.get(tipId);
        if (!tipProps) {
          return null;
        }
        return (0, _extends2["default"])({}, tipProps, {
          target: target
        });
      }
      child = child.previousElementSibling;
    }
    target = target.parentNode;
  }
  return null;
}
var tipsMap = new Map();
function postTip(id, props) {
  if (props) {
    tipsMap.set(id, props);
  } else {
    tipsMap["delete"](id);
  }
}