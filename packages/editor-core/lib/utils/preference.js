"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _store = _interopRequireDefault(require("store"));
var _logger = require("./logger");
var logger = (0, _logger.getLogger)({
  level: 'log',
  bizName: 'Preference'
});
var STORAGE_KEY_PREFIX = 'ale';

/**
 * used to store user preferences, such as pinned status of a pannel.
 * save to local storage.
 *
 * @class PreferenceStore
 */
var Preference = /*#__PURE__*/function () {
  function Preference() {}
  var _proto = Preference.prototype;
  _proto.getStorageKey = function getStorageKey(key, module) {
    var moduleKey = module || '__inner__';
    return STORAGE_KEY_PREFIX + "_" + moduleKey + "." + key;
  };
  _proto.set = function set(key, value, module) {
    if (!key || typeof key !== 'string' || key.length === 0) {
      logger.error('Invalid key when setting preference', key);
      return;
    }
    var storageKey = this.getStorageKey(key, module);
    logger.log('storageKey:', storageKey, 'set with value:', value);
    _store["default"].set(storageKey, value);
  };
  _proto.get = function get(key, module) {
    if (!key || typeof key !== 'string' || key.length === 0) {
      logger.error('Invalid key when getting from preference', key);
      return;
    }
    var storageKey = this.getStorageKey(key, module);
    var result = _store["default"].get(storageKey);
    logger.log('storageKey:', storageKey, 'get with result:', result);
    return result;
  }
  /**
   * check if local storage contain certain key
   *
   * @param {string} key
   * @param {string} module
   * @returns {boolean}
   * @memberof Preference
   */;
  _proto.contains = function contains(key, module) {
    if (!key || typeof key !== 'string' || key.length === 0) {
      logger.error('Invalid key when getting from preference', key);
      return false;
    }
    var storageKey = this.getStorageKey(key, module);
    var result = _store["default"].get(storageKey);
    return !(result === undefined || result === null);
  };
  return Preference;
}();
exports["default"] = Preference;