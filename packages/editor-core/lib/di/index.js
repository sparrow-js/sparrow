"use strict";

exports.__esModule = true;
var _setter = require("./setter");
Object.keys(_setter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _setter[key]) return;
  exports[key] = _setter[key];
});
var _iocContext = require("./ioc-context");
Object.keys(_iocContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _iocContext[key]) return;
  exports[key] = _iocContext[key];
});