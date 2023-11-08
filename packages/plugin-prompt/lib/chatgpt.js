"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Chatgpt = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _autoEditorCore = require("@firefly/auto-editor-core");
var _api = require("../api");
var _types = require("../types");
var _dec, _dec2, _dec3, _dec4, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
var Chatgpt = (_dec = _autoEditorCore.obx.ref, _dec2 = _autoEditorCore.obx.ref, _dec3 = _autoEditorCore.obx.ref, _dec4 = _autoEditorCore.obx.ref, (_class = /*#__PURE__*/function () {
  function Chatgpt() {
    (0, _initializerDefineProperty2["default"])(this, "selection", _descriptor, this);
    (0, _initializerDefineProperty2["default"])(this, "promptList", _descriptor2, this);
    (0, _initializerDefineProperty2["default"])(this, "currentPrompt", _descriptor3, this);
    this.promptId = 'react';
    (0, _initializerDefineProperty2["default"])(this, "chatgptKey", _descriptor4, this);
    (0, _initializerDefineProperty2["default"])(this, "messages", _descriptor5, this);
    this.hasConnect = false;
    this.projectRootDir = '';
    (0, _initializerDefineProperty2["default"])(this, "changeFiles", _descriptor6, this);
    (0, _initializerDefineProperty2["default"])(this, "selectedFiles", _descriptor7, this);
    this.hasWatchFile = false;
    this.codeOperateType = 'modify';
    this.codeOperateList = [{
      label: '创建',
      value: 'create'
    }, {
      label: '修改',
      value: 'modify'
    }, {
      label: '默认',
      value: 'default'
    }];
    this.filePath = '';
    (0, _autoEditorCore.makeObservable)(this);
    this.getPromptList();
    this.getCodePromptList();
    this.init();
  }
  var _proto = Chatgpt.prototype;
  _proto.init = /*#__PURE__*/function () {
    var _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.getProjectRootPath();
          case 2:
            if (this.projectRootDir) {
              this.watchProject(this.projectRootDir);
            }
          case 3:
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
  _proto.getPromptList = /*#__PURE__*/function () {
    var _getPromptList2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var res, prompt;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _api.getPromptList)();
          case 2:
            res = _context2.sent;
            if (res.data) {
              this.promptList = res.data.prompt;
              prompt = this.promptList.find(function (item) {
                return item.value === 'react';
              });
              this.messages = prompt.messages;
            }
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function getPromptList() {
      return _getPromptList2.apply(this, arguments);
    }
    return getPromptList;
  }();
  _proto.getCodePromptList = /*#__PURE__*/function () {
    var _getCodePromptList2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _api.getCodePromptList)();
          case 2:
            res = _context3.sent;
            if (res.data) {
              this.promptCodeList = res.data.prompt;
            }
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function getCodePromptList() {
      return _getCodePromptList2.apply(this, arguments);
    }
    return getCodePromptList;
  }()
  /**
   * @description: 生成对话
   * @param {string} text
   */
  ;
  _proto.setPrompt = function setPrompt(value) {
    this.promptId = value;
    var prompt = this.promptList.find(function (item) {
      return item.value === value;
    });
    if (prompt) {
      this.currentPrompt = prompt;
      this.messages = [].concat(this.currentPrompt.messages);
    }
  };
  _proto.setCodePrompt = function setCodePrompt(value) {
    this.codeOperateType = value;
  };
  _proto.startPrompt = /*#__PURE__*/function () {
    var _startPrompt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            this.messages = [];
            _context4.next = 3;
            return (0, _api.startCodeDocument)({
              files: this.selectedFiles,
              promptType: this.operateType
            });
          case 3:
            res = _context4.sent;
            if (res.data) {
              this.messages = res.data.messages;
            }
          case 5:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function startPrompt() {
      return _startPrompt.apply(this, arguments);
    }
    return startPrompt;
  }();
  _proto.watchProject = /*#__PURE__*/function () {
    var _watchProject2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(path) {
      var res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _api.watchProject)({
              dir: path
            });
          case 2:
            res = _context5.sent;
            if (res.data) {
              this.hasWatchFile = true;
            }
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    function watchProject(_x) {
      return _watchProject2.apply(this, arguments);
    }
    return watchProject;
  }();
  _proto.getWatchChangeFiles = /*#__PURE__*/function () {
    var _getWatchChangeFiles2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _api.getWatchChangeFiles)();
          case 2:
            res = _context6.sent;
            if (res.data) {
              this.changeFiles = res.data.files.map(function (item) {
                return {
                  value: item,
                  label: item
                };
              });
            }
          case 4:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this);
    }));
    function getWatchChangeFiles() {
      return _getWatchChangeFiles2.apply(this, arguments);
    }
    return getWatchChangeFiles;
  }();
  _proto.setSelectedFiles = function setSelectedFiles(files) {
    this.selectedFiles = files;
  };
  _proto.setOperateType = function setOperateType(operateType) {
    this.operateType = operateType;
  };
  _proto.getProjectRootPath = /*#__PURE__*/function () {
    var _getProjectRootPath2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _Iframe$contentDocume;
      var Iframe, app, path, res;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            Iframe = document.getElementsByClassName('lc-simulator-content-frame')[0];
            app = (_Iframe$contentDocume = Iframe.contentDocument) === null || _Iframe$contentDocume === void 0 ? void 0 : _Iframe$contentDocume.querySelector('div[data-locatorjs-id*="/"]');
            if (!app) {
              _context7.next = 10;
              break;
            }
            path = app.dataset['locatorjsId'];
            path = path ? path.split('::')[0] : '';
            if (!path) {
              _context7.next = 10;
              break;
            }
            _context7.next = 8;
            return (0, _api.getProjectRootPath)({
              path: path
            });
          case 8:
            res = _context7.sent;
            if (res.data) {
              this.projectRootDir = res.data.rootDir;
            }
          case 10:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this);
    }));
    function getProjectRootPath() {
      return _getProjectRootPath2.apply(this, arguments);
    }
    return getProjectRootPath;
  }();
  _proto.chatgptGenerate = /*#__PURE__*/function () {
    var _chatgptGenerate2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(sendMessage) {
      var messages, codeOperateType, message, res, data, _designer$project$sim, editor, designer, urlObj, urlParam, url;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            messages = this.messages, codeOperateType = this.codeOperateType;
            if (sendMessage) {
              _context8.next = 3;
              break;
            }
            return _context8.abrupt("return");
          case 3:
            message = {
              role: _types.Role.user,
              content: sendMessage
            };
            messages.push(message);
            _context8.next = 7;
            return (0, _api.chatgptGenerate)({
              message: message,
              codeOperateType: codeOperateType,
              promptId: this.promptId,
              path: this.filePath
            });
          case 7:
            res = _context8.sent;
            data = res.data;
            if (data.url) {
              editor = _autoEditorCore.globalContext.get('editor');
              designer = editor.get('designer');
              urlObj = new URL(location.href);
              urlParam = new URL(urlObj.searchParams.get('url') || '');
              url = "" + urlParam.origin + data.url;
              (_designer$project$sim = designer.project.simulator) === null || _designer$project$sim === void 0 ? void 0 : _designer$project$sim.modifySimulatorUrl(url, urlObj.origin + "/?url=" + url);
            }
            if (data.path) {
              this.filePath = data.path;
            }
            if (!(data && data.message)) {
              _context8.next = 14;
              break;
            }
            messages.push(data.message);
            return _context8.abrupt("return", true);
          case 14:
            return _context8.abrupt("return", false);
          case 15:
          case "end":
            return _context8.stop();
        }
      }, _callee8, this);
    }));
    function chatgptGenerate(_x2) {
      return _chatgptGenerate2.apply(this, arguments);
    }
    return chatgptGenerate;
  }();
  return Chatgpt;
}(), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "selection", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "promptList", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "currentPrompt", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "chatgptKey", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "messages", [_autoEditorCore.obx], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "changeFiles", [_autoEditorCore.obx], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor7 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "selectedFiles", [_autoEditorCore.obx], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "setSelectedFiles", [_autoEditorCore.action], Object.getOwnPropertyDescriptor(_class.prototype, "setSelectedFiles"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "setOperateType", [_autoEditorCore.action], Object.getOwnPropertyDescriptor(_class.prototype, "setOperateType"), _class.prototype)), _class));
exports.Chatgpt = Chatgpt;