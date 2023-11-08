"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = _default;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
function propConfigToFieldConfig(propConfig) {
  var name = propConfig.name,
    description = propConfig.description;
  var title = {
    label: {
      type: 'i18n',
      'en-US': name,
      'zh-CN': (description === null || description === void 0 ? void 0 : description.slice(0, 10)) || name
    },
    tip: description ? name + " | " + description : undefined
  };
  return (0, _extends2["default"])({
    title: title
  }, propConfig, {
    // TODO 这边直接用propConfig，将setter丢在propconfig里，需要确认是否在PropConfig扩展还是换实现
    setter: propConfig.setter ? propConfig.setter : propTypeToSetter(propConfig.propType)
  });
}
function propTypeToSetter(propType) {
  var typeName;
  var isRequired = false;
  if (typeof propType === 'string') {
    typeName = propType;
  } else if (typeof propType === 'object') {
    typeName = propType.type;
    isRequired = propType.isRequired;
  } else {
    typeName = 'string';
  }
  // TODO: use mixinSetter wrapper
  switch (typeName) {
    case 'string':
      return {
        componentName: 'StringSetter',
        isRequired: isRequired,
        initialValue: ''
      };
    case 'number':
      return {
        componentName: 'NumberSetter',
        isRequired: isRequired,
        initialValue: 0
      };
    case 'bool':
      return {
        componentName: 'BoolSetter',
        isRequired: isRequired,
        initialValue: false
      };
    case 'oneOf':
      var dataSource = (propType.value || []).map(function (value, index) {
        var t = typeof value;
        return {
          label: t === 'string' || t === 'number' || t === 'boolean' ? String(value) : "value " + index,
          value: value
        };
      });
      var componentName = dataSource.length >= 4 ? 'SelectSetter' : 'RadioGroupSetter';
      return {
        componentName: componentName,
        props: {
          dataSource: dataSource,
          options: dataSource
        },
        isRequired: isRequired,
        initialValue: dataSource[0] ? dataSource[0].value : null
      };
    case 'element':
    case 'node':
      // TODO: use Mixin
      return {
        // slotSetter
        componentName: 'SlotSetter',
        props: {
          mode: typeName
        },
        isRequired: isRequired,
        initialValue: {
          type: 'JSSlot',
          value: []
        }
      };
    case 'shape':
    case 'exact':
      var items = (propType.value || []).map(function (item) {
        return propConfigToFieldConfig(item);
      });
      return {
        componentName: 'ObjectSetter',
        props: {
          config: {
            items: items,
            extraSetter: typeName === 'shape' ? propTypeToSetter('any') : null
          }
        },
        isRequired: isRequired,
        initialValue: function initialValue(field) {
          var data = {};
          items.forEach(function (item) {
            var initial = item.defaultValue;
            if (initial == null && item.setter && typeof item.setter === 'object') {
              initial = item.setter.initialValue;
            }
            data[item.name] = initial ? typeof initial === 'function' ? initial(field) : initial : null;
          });
          return data;
        }
      };
    case 'object':
    case 'objectOf':
      return {
        componentName: 'ObjectSetter',
        props: {
          config: {
            extraSetter: propTypeToSetter(typeName === 'objectOf' ? propType.value : 'any')
          }
        },
        isRequired: isRequired,
        initialValue: {}
      };
    case 'array':
    case 'arrayOf':
      return {
        componentName: 'ArraySetter',
        props: {
          itemSetter: propTypeToSetter(typeName === 'arrayOf' ? propType.value : 'any')
        },
        isRequired: isRequired,
        initialValue: []
      };
    case 'func':
      return {
        componentName: 'FunctionSetter',
        isRequired: isRequired
      };
    case 'color':
      return {
        componentName: 'ColorSetter',
        isRequired: isRequired
      };
    case 'oneOfType':
      return {
        componentName: 'MixedSetter',
        props: {
          // TODO:
          setters: propType.value.map(function (item) {
            return propTypeToSetter(item);
          })
        },
        isRequired: isRequired
      };
    default:
    // do nothing
  }

  return {
    componentName: 'MixedSetter',
    isRequired: isRequired,
    props: {}
  };
}
var EVENT_RE = /^on|after|before[A-Z][\w]*$/;
function _default(metadata) {
  var _metadata$configure = metadata.configure,
    configure = _metadata$configure === void 0 ? {} : _metadata$configure;
  // TODO types后续补充
  var extendsProps = null;
  if (configure.props) {
    if (Array.isArray(configure.props)) {
      return metadata;
    }
    var _configure$props = configure.props,
      isExtends = _configure$props.isExtends,
      _configure$props$over = _configure$props.override,
      override = _configure$props$over === void 0 ? [] : _configure$props$over;
    // 不开启继承时，直接返回configure配置
    if (!isExtends) {
      return (0, _extends2["default"])({}, metadata, {
        configure: (0, _extends2["default"])({}, configure, {
          props: [].concat(override)
        })
      });
    }
    extendsProps = {};
    // 开启继承后，缓存重写内容的配置
    override.forEach(function (prop) {
      extendsProps[prop.name] = prop;
    });
  }
  if (!metadata.props) {
    return (0, _extends2["default"])({}, metadata, {
      configure: (0, _extends2["default"])({}, configure, {
        props: []
      })
    });
  }
  var _configure$component = configure.component,
    component = _configure$component === void 0 ? {} : _configure$component,
    _configure$supports = configure.supports,
    supports = _configure$supports === void 0 ? {} : _configure$supports;
  var supportedEvents = supports.events ? null : [];
  var props = [];
  metadata.props.forEach(function (prop) {
    var _prop = prop,
      name = _prop.name,
      propType = _prop.propType,
      description = _prop.description;
    if (name === 'children' && (component.isContainer || propType === 'node' || propType === 'element' || propType === 'any')) {
      if (component.isContainer !== false) {
        component.isContainer = true;
        props.push(propConfigToFieldConfig(prop));
        return;
      }
    }
    if (EVENT_RE.test(name) && (propType === 'func' || propType === 'any')) {
      if (supportedEvents) {
        supportedEvents.push({
          name: name,
          description: description
        });
        supports.events = supportedEvents;
      }
      return;
    }
    if (name === 'className' && (propType === 'string' || propType === 'any')) {
      if (supports.className == null) {
        supports.className = true;
      }
      return;
    }
    if (name === 'style' && (propType === 'object' || propType === 'any')) {
      if (supports.style == null) {
        supports.style = true;
      }
      return;
    }

    // 存在覆盖配置时
    if (extendsProps) {
      if (name in extendsProps) {
        prop = extendsProps[name];
      }
    }
    props.push(propConfigToFieldConfig(prop));
  });
  return (0, _extends2["default"])({}, metadata, {
    configure: (0, _extends2["default"])({}, configure, {
      props: props,
      supports: supports,
      component: component
    })
  });
}