"use strict";

exports.__esModule = true;
require("./style.less");
var _settingsPrimaryPane = require("./settings-primary-pane");
Object.keys(_settingsPrimaryPane).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _settingsPrimaryPane[key]) return;
  exports[key] = _settingsPrimaryPane[key];
});
var _settingsPane = require("./settings-pane");
Object.keys(_settingsPane).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _settingsPane[key]) return;
  exports[key] = _settingsPane[key];
});