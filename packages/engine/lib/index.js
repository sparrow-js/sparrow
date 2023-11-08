"use strict";

exports.__esModule = true;
var _engineCore = require("./engine-core");
Object.keys(_engineCore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _engineCore[key]) return;
  exports[key] = _engineCore[key];
});