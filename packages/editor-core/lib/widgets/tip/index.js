"use strict";

exports.__esModule = true;
require("./style.less");
var _tip = require("./tip");
Object.keys(_tip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tip[key]) return;
  exports[key] = _tip[key];
});
var _tipContainer = require("./tip-container");
Object.keys(_tipContainer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tipContainer[key]) return;
  exports[key] = _tipContainer[key];
});