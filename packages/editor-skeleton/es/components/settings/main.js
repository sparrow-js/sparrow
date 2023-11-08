import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";
var _dec, _class, _descriptor;
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { EventEmitter } from 'events';
import { Designer } from '@alilc/lowcode-designer';
import { obx, computed, makeObservable, action } from '@alilc/lowcode-editor-core';
function generateSessionId(nodes) {
  return nodes.map(function (node) {
    return node.id;
  }).sort().join(',');
}
export var SettingsMain = (_dec = obx.ref, (_class = /*#__PURE__*/function () {
  function SettingsMain(editor) {
    this.editor = editor;
    this.emitter = new EventEmitter();
    this._sessionId = '';
    _initializerDefineProperty(this, "_settings", _descriptor, this);
    this.disposeListener = void 0;
    this.designer = void 0;
    makeObservable(this);
    this.init();
  }
  var _proto = SettingsMain.prototype;
  _proto.init = /*#__PURE__*/function () {
    var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _this = this;
      var setupSelection, designer;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setupSelection = function setupSelection(selection) {
              if (selection) {
                _this.setup(selection.getNodes());
              } else {
                _this.setup([]);
              }
            };
            this.editor.on('designer.selection.change', setupSelection);
            this.disposeListener = function () {
              _this.editor.removeListener('designer.selection.change', setupSelection);
            };
            _context.next = 5;
            return this.editor.onceGot(Designer);
          case 5:
            designer = _context.sent;
            this.designer = designer;
            setupSelection(designer.currentSelection);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function init() {
      return _init.apply(this, arguments);
    }
    return init;
  }();
  _proto.setup = function setup(nodes) {
    // check nodes change
    var sessionId = generateSessionId(nodes);
    if (sessionId === this._sessionId) {
      return;
    }
    this._sessionId = sessionId;
    if (nodes.length < 1) {
      this._settings = undefined;
      return;
    }
    if (!this.designer) {
      this.designer = nodes[0].document.designer;
    }
    // 当节点只有一个时，复用 node 上挂载的 settingEntry，不会产生平行的两个实例，这样在整个系统中对
    // 某个节点操作的 SettingTopEntry 只有一个实例，后续的 getProp() 也会拿到相同的 SettingField 实例
    if (nodes.length === 1) {
      this._settings = nodes[0].settingEntry;
    } else {
      this._settings = this.designer.createSettingEntry(nodes);
    }
  };
  _proto.purge = function purge() {
    this.disposeListener();
    this.emitter.removeAllListeners();
  };
  _createClass(SettingsMain, [{
    key: "length",
    get: function get() {
      var _this$_settings;
      return (_this$_settings = this._settings) === null || _this$_settings === void 0 ? void 0 : _this$_settings.nodes.length;
    }
  }, {
    key: "componentMeta",
    get: function get() {
      var _this$_settings2;
      return (_this$_settings2 = this._settings) === null || _this$_settings2 === void 0 ? void 0 : _this$_settings2.componentMeta;
    }
  }, {
    key: "settings",
    get: function get() {
      return this._settings;
    }
  }]);
  return SettingsMain;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_settings", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "length", [computed], Object.getOwnPropertyDescriptor(_class.prototype, "length"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "componentMeta", [computed], Object.getOwnPropertyDescriptor(_class.prototype, "componentMeta"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setup", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setup"), _class.prototype)), _class));