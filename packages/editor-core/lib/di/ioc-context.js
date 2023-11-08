"use strict";

exports.__esModule = true;
var _exportNames = {
  globalContext: true
};
exports.globalContext = void 0;
var _powerDi = require("power-di");
Object.keys(_powerDi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _powerDi[key]) return;
  exports[key] = _powerDi[key];
});
var globalContext = _powerDi.IocContext.DefaultInstance;
exports.globalContext = globalContext;