"use strict";

exports.__esModule = true;
var _exportNames = {
  Workbench: true
};
exports.Workbench = void 0;
var _skeleton = require("./skeleton");
Object.keys(_skeleton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _skeleton[key]) return;
  exports[key] = _skeleton[key];
});
var _workbench = require("./layouts/workbench");
exports.Workbench = _workbench.Workbench;