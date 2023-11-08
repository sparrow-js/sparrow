"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getLogger = getLogger;
var _zenLogger = _interopRequireDefault(require("zen-logger"));
exports.Logger = _zenLogger["default"];
function getLogger(config) {
  return new _zenLogger["default"](config);
}