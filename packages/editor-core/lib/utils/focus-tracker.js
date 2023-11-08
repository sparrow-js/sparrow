"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.focusTracker = exports.Focusable = exports.FocusTracker = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var FocusTracker = /*#__PURE__*/function () {
  function FocusTracker() {
    this.actives = [];
    this.modals = [];
  }
  var _proto = FocusTracker.prototype;
  _proto.mount = function mount(win) {
    var _this = this;
    var checkDown = function checkDown(e) {
      if (_this.checkModalDown(e)) {
        return;
      }
      var first = _this.first;
      if (first && !first.internalCheckInRange(e)) {
        _this.internalSuspenseItem(first);
        first.internalTriggerBlur();
      }
    };
    win.document.addEventListener('click', checkDown, true);
    return function () {
      win.document.removeEventListener('click', checkDown, true);
    };
  };
  _proto.addModal = function addModal(checkDown, checkOpen) {
    this.modals.push({
      checkDown: checkDown,
      checkOpen: checkOpen
    });
  };
  _proto.checkModalOpen = function checkModalOpen() {
    return this.modals.some(function (item) {
      return item.checkOpen();
    });
  };
  _proto.checkModalDown = function checkModalDown(e) {
    return this.modals.some(function (item) {
      return item.checkDown(e);
    });
  };
  _proto.execSave = function execSave() {
    // has Modal return;
    if (this.checkModalOpen()) {
      return;
    }
    // catch
    if (this.first) {
      this.first.internalTriggerSave();
    }
  };
  _proto.execEsc = function execEsc() {
    var first = this.first;
    if (first) {
      this.internalSuspenseItem(first);
      first.internalTriggerEsc();
    }
  };
  _proto.create = function create(config) {
    return new Focusable(this, config);
  };
  _proto.internalActiveItem = function internalActiveItem(item) {
    var first = this.actives[0];
    if (first === item) {
      return;
    }
    var i = this.actives.indexOf(item);
    if (i > -1) {
      this.actives.splice(i, 1);
    }
    this.actives.unshift(item);
    if (!item.isModal && first) {
      // trigger Blur
      first.internalTriggerBlur();
    }
    // trigger onActive
    item.internalTriggerActive();
  };
  _proto.internalSuspenseItem = function internalSuspenseItem(item) {
    var i = this.actives.indexOf(item);
    if (i > -1) {
      var _this$first;
      this.actives.splice(i, 1);
      (_this$first = this.first) === null || _this$first === void 0 ? void 0 : _this$first.internalTriggerActive();
    }
  };
  (0, _createClass2["default"])(FocusTracker, [{
    key: "first",
    get: function get() {
      return this.actives[0];
    }
  }]);
  return FocusTracker;
}();
exports.FocusTracker = FocusTracker;
var Focusable = /*#__PURE__*/function () {
  function Focusable(tracker, config) {
    this.tracker = tracker;
    this.config = config;
    this.isModal = void 0;
    this.isModal = config.modal == null ? false : config.modal;
  }
  var _proto2 = Focusable.prototype;
  _proto2.active = function active() {
    this.tracker.internalActiveItem(this);
  };
  _proto2.suspense = function suspense() {
    this.tracker.internalSuspenseItem(this);
  };
  _proto2.purge = function purge() {
    this.tracker.internalSuspenseItem(this);
  };
  _proto2.internalCheckInRange = function internalCheckInRange(e) {
    var range = this.config.range;
    if (!range) {
      return false;
    }
    if (typeof range === 'function') {
      return range(e);
    }
    return range.contains(e.target);
  };
  _proto2.internalTriggerBlur = function internalTriggerBlur() {
    if (this.config.onBlur) {
      this.config.onBlur();
    }
  };
  _proto2.internalTriggerSave = function internalTriggerSave() {
    if (this.config.onSave) {
      this.config.onSave();
      return true;
    }
    return false;
  };
  _proto2.internalTriggerEsc = function internalTriggerEsc() {
    if (this.config.onEsc) {
      this.config.onEsc();
    }
  };
  _proto2.internalTriggerActive = function internalTriggerActive() {
    if (this.config.onActive) {
      this.config.onActive();
    }
  };
  return Focusable;
}();
exports.Focusable = Focusable;
var focusTracker = new FocusTracker();
exports.focusTracker = focusTracker;
focusTracker.mount(window);