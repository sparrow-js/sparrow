"use strict";

exports.__esModule = true;
var _editor = require("./editor");
Object.keys(_editor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _editor[key]) return;
  exports[key] = _editor[key];
});
var _config = require("./config");
Object.keys(_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _config[key]) return;
  exports[key] = _config[key];
});
var _utils = require("./utils");
Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _utils[key]) return;
  exports[key] = _utils[key];
});
var _di = require("./di");
Object.keys(_di).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _di[key]) return;
  exports[key] = _di[key];
});
var _hotkey = require("./hotkey");
Object.keys(_hotkey).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hotkey[key]) return;
  exports[key] = _hotkey[key];
});
var _widgets = require("./widgets");
Object.keys(_widgets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _widgets[key]) return;
  exports[key] = _widgets[key];
});