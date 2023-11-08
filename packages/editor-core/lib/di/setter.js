"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.createSetterContent = createSetterContent;
exports.getSetter = getSetter;
exports.getSettersMap = getSettersMap;
exports.registerSetter = registerSetter;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _lowcodeTypes = require("@alilc/lowcode-types");
var _lowcodeUtils = require("@alilc/lowcode-utils");
var settersMap = new Map();
function registerSetter(typeOrMaps, setter) {
  if (typeof typeOrMaps === 'object') {
    Object.keys(typeOrMaps).forEach(function (type) {
      registerSetter(type, typeOrMaps[type]);
    });
    return;
  }
  if (!setter) {
    return;
  }
  if ((0, _lowcodeTypes.isCustomView)(setter)) {
    setter = {
      component: setter,
      // todo: intl
      title: setter.displayName || setter.name || 'CustomSetter'
    };
  }
  if (!setter.initialValue) {
    var initial = getInitialFromSetter(setter.component);
    if (initial) {
      setter.initialValue = function (field) {
        return initial.call(field, field.getValue());
      };
    }
  }
  settersMap.set(typeOrMaps, (0, _extends2["default"])({
    type: typeOrMaps
  }, setter));
}
function getInitialFromSetter(setter) {
  return setter && (setter.initial || setter.Initial || setter.type && (setter.type.initial || setter.type.Initial)) || null; // eslint-disable-line
}

function getSetter(type) {
  return settersMap.get(type) || null;
}
function getSettersMap() {
  return settersMap;
}
function createSetterContent(setter, props) {
  if (typeof setter === 'string') {
    setter = getSetter(setter);
    if (!setter) {
      return null;
    }
    if (setter.defaultProps) {
      props = (0, _extends2["default"])({}, setter.defaultProps, props);
    }
    setter = setter.component;
  }

  // Fusion的表单组件都是通过 'value' in props 来判断是否使用 defaultValue
  if ('value' in props && typeof props.value === 'undefined') {
    delete props.value;
  }
  return (0, _lowcodeUtils.createContent)(setter, props);
}