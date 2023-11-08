import _extends from "@babel/runtime/helpers/extends";
import { isCustomView } from '@alilc/lowcode-types';
import { createContent } from '@alilc/lowcode-utils';
var settersMap = new Map();
export function registerSetter(typeOrMaps, setter) {
  if (typeof typeOrMaps === 'object') {
    Object.keys(typeOrMaps).forEach(function (type) {
      registerSetter(type, typeOrMaps[type]);
    });
    return;
  }
  if (!setter) {
    return;
  }
  if (isCustomView(setter)) {
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
  settersMap.set(typeOrMaps, _extends({
    type: typeOrMaps
  }, setter));
}
function getInitialFromSetter(setter) {
  return setter && (setter.initial || setter.Initial || setter.type && (setter.type.initial || setter.type.Initial)) || null; // eslint-disable-line
}

export function getSetter(type) {
  return settersMap.get(type) || null;
}
export function getSettersMap() {
  return settersMap;
}
export function createSetterContent(setter, props) {
  if (typeof setter === 'string') {
    setter = getSetter(setter);
    if (!setter) {
      return null;
    }
    if (setter.defaultProps) {
      props = _extends({}, setter.defaultProps, props);
    }
    setter = setter.component;
  }

  // Fusion的表单组件都是通过 'value' in props 来判断是否使用 defaultValue
  if ('value' in props && typeof props.value === 'undefined') {
    delete props.value;
  }
  return createContent(setter, props);
}