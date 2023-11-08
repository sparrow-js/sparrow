import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";
import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class, _class2, _class3, _class4, _class5, _class6, _descriptor, _class7;
import { Component, Fragment } from 'react';
import { shallowIntl, createSetterContent, observer, obx, engineConfig, runInAction, globalContext } from '@alilc/lowcode-editor-core';
import { createContent } from '@alilc/lowcode-utils';
import { isSetterConfig, isJSSlot } from '@alilc/lowcode-types';
import { isSettingField } from '@alilc/lowcode-designer';
import { createField } from '../field';
import PopupService, { PopupPipe } from '../popup';
import { SkeletonContext } from '../../context';
// import { Icon } from '@alifd/next';
import { intl } from '../../locale';
function isStandardComponent(componentMeta) {
  if (!componentMeta) return false;
  var prototype = componentMeta.prototype;
  return prototype == null;
}

/**
 * 判断 initialValue 是否为非空，非空条件：
 *  1. 当为 slot 结构时，value 为有长度的数组且 visible 不为 false
 *  2. 不为 slot 结构，为非 undefined / null 值
 * @param initialValue
 * @returns
 */
function isInitialValueNotEmpty(initialValue) {
  if (isJSSlot(initialValue)) {
    // @ts-ignore visible 为 false 代表默认不展示
    return initialValue.visible !== false && Array.isArray(initialValue.value) && initialValue.value.length > 0;
  }
  return initialValue !== undefined && initialValue !== null;
}
var SettingFieldView = observer(_class = (_class2 = /*#__PURE__*/function (_Component) {
  _inheritsLoose(SettingFieldView, _Component);
  function SettingFieldView(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.stageName = void 0;
    var field = _this.props.field;
    var extraProps = field.extraProps;
    var display = extraProps.display;
    var editor = globalContext.get('editor');
    var _ref = editor.get('skeleton'),
      stages = _ref.stages;
    var stageName;
    if (display === 'entry') {
      runInAction(function () {
        stageName = field.getNode().id + "_" + field.name.toString();
        // 清除原 stage，不然 content 引用的一直是老的 field，导致数据无法得到更新
        stages.container.remove(stageName);
        var stage = stages.add({
          type: 'Widget',
          name: stageName,
          content: /*#__PURE__*/React.createElement(Fragment, null, field.items.map(function (item, index) {
            return createSettingFieldView(item, field, index);
          })),
          props: {
            title: field.title
          }
        });
      });
    }
    _this.stageName = stageName;
    return _this;
  }
  var _proto = SettingFieldView.prototype;
  _proto.render = function render() {
    var _field$extraProps,
      _this$state,
      _field$componentMeta,
      _field$componentMeta2,
      _field$top,
      _field$top$getNode,
      _this2 = this;
    var field = this.props.field;
    var extraProps = field.extraProps,
      componentMeta = field.componentMeta;
    var condition = extraProps.condition,
      defaultValue = extraProps.defaultValue;
    var visible;
    try {
      visible = typeof condition === 'function' ? condition(field.internalToShellPropEntry()) !== false : true;
    } catch (error) {
      console.error('exception when condition (hidden) is excuted', error);
    }
    if (!visible) {
      return null;
    }
    var setter = field.setter;
    var setterProps = {};
    var setterType;
    var initialValue = null;
    if (Array.isArray(setter)) {
      setterType = 'MixedSetter';
      setterProps = {
        setters: setter
      };
    } else if (isSetterConfig(setter)) {
      setterType = setter.componentName;
      if (setter.props) {
        setterProps = setter.props;
        if (typeof setterProps === 'function') {
          setterProps = setterProps(field.internalToShellPropEntry());
        }
      }
      if (setter.initialValue != null) {
        initialValue = setter.initialValue;
      }
    } else if (setter) {
      setterType = setter;
    }

    // 根据是否支持变量配置做相应的更改
    var supportVariable = (_field$extraProps = field.extraProps) === null || _field$extraProps === void 0 ? void 0 : _field$extraProps.supportVariable;
    // supportVariableGlobally 只对标准组件生效，vc 需要单独配置
    var supportVariableGlobally = engineConfig.get('supportVariableGlobally', false) && isStandardComponent(componentMeta);
    if (supportVariable || supportVariableGlobally) {
      if (setterType === 'MixedSetter') {
        // VariableSetter 不单独使用
        if (Array.isArray(setterProps.setters) && !setterProps.setters.includes('VariableSetter')) {
          setterProps.setters.push('VariableSetter');
        }
      } else {
        setterType = 'MixedSetter';
        setterProps = {
          setters: [setter, 'VariableSetter']
        };
      }
    }
    var value = null;
    if (defaultValue != null && !('defaultValue' in setterProps)) {
      setterProps.defaultValue = defaultValue;
      if (initialValue == null) {
        initialValue = defaultValue;
      }
    }
    if (field.valueState === -1) {
      setterProps.multiValue = true;
      if (!('placeholder' in setterProps)) {
        setterProps.placeholder = intl('Multiple Value');
      }
    } else {
      value = field.getValue();
    }

    // 当前 field 没有 value 值时，将 initialValue 写入 field
    // 之所以用 initialValue，而不是 defaultValue 是为了保持跟 props.onInitial 的逻辑一致
    if (!((_this$state = this.state) !== null && _this$state !== void 0 && _this$state.fromOnChange) && value === undefined && isInitialValueNotEmpty(initialValue)) {
      var _initialValue = typeof initialValue === 'function' ? initialValue(field.internalToShellPropEntry()) : initialValue;
      field.setValue(_initialValue);
      value = _initialValue;
    }
    var _onChange = extraProps === null || extraProps === void 0 ? void 0 : extraProps.onChange;
    var stageName = this.stageName;
    return createField(_extends({
      meta: (field === null || field === void 0 ? void 0 : (_field$componentMeta = field.componentMeta) === null || _field$componentMeta === void 0 ? void 0 : _field$componentMeta.npm) || (field === null || field === void 0 ? void 0 : (_field$componentMeta2 = field.componentMeta) === null || _field$componentMeta2 === void 0 ? void 0 : _field$componentMeta2.componentName) || '',
      title: field.title,
      // editor: field.editor,
      collapsed: !field.expanded,
      valueState: field.isRequired ? 10 : field.valueState,
      onExpandChange: function onExpandChange(expandState) {
        return field.setExpanded(expandState);
      },
      onClear: function onClear() {
        return field.clearValue();
      },
      // field: field,
      // stages,
      stageName: stageName
    }, extraProps), !stageName && createSetterContent(setterType, _extends({}, shallowIntl(setterProps), {
      forceInline: extraProps.forceInline,
      key: field.id,
      // === injection
      prop: field.internalToShellPropEntry(),
      // for compatible vision
      selected: (_field$top = field.top) === null || _field$top === void 0 ? void 0 : (_field$top$getNode = _field$top.getNode()) === null || _field$top$getNode === void 0 ? void 0 : _field$top$getNode.internalToShellNode(),
      field: field.internalToShellPropEntry(),
      // === IO
      value: value,
      // reaction point
      initialValue: initialValue,
      onChange: function onChange(value) {
        _this2.setState({
          fromOnChange: true,
          // eslint-disable-next-line react/no-unused-state
          value: value
        });
        field.setValue(value, true);
        if (_onChange) _onChange(value, field);
      },
      onInitial: function onInitial() {
        if (initialValue == null) {
          return;
        }
        var value = typeof initialValue === 'function' ? initialValue(field.internalToShellPropEntry()) : initialValue;
        _this2.setState({
          // eslint-disable-next-line react/no-unused-state
          value: value
        });
        field.setValue(value, true);
      },
      removeProp: function removeProp() {
        field.parent.clearPropValue(field.name);
      }
    })), extraProps.forceInline ? 'plain' : extraProps.display);
  };
  return SettingFieldView;
}(Component), _class2.contextType = SkeletonContext, _class2)) || _class;
var SettingGroupView = observer(_class3 = (_class4 = /*#__PURE__*/function (_Component2) {
  _inheritsLoose(SettingGroupView, _Component2);
  function SettingGroupView(props) {
    var _this3;
    _this3 = _Component2.call(this, props) || this;
    _this3.stageName = void 0;
    var field = _this3.props.field;
    var extraProps = field.extraProps;
    var display = extraProps.display;
    var editor = globalContext.get('editor');
    var _ref2 = editor.get('skeleton'),
      stages = _ref2.stages;
    // const items = field.items;

    var stageName;
    if (display === 'entry') {
      runInAction(function () {
        stageName = field.getNode().id + "_" + field.name.toString();
        // 清除原 stage，不然 content 引用的一直是老的 field，导致数据无法得到更新
        stages.container.remove(stageName);
        stages.add({
          type: 'Widget',
          name: stageName,
          content: /*#__PURE__*/React.createElement(Fragment, null, field.items.map(function (item, index) {
            return createSettingFieldView(item, field, index);
          })),
          props: {
            title: field.title
          }
        });
      });
    }
    _this3.stageName = stageName;
    return _this3;
  }
  var _proto2 = SettingGroupView.prototype;
  _proto2.render = function render() {
    var _field$componentMeta3, _field$componentMeta4;
    var field = this.props.field;
    var extraProps = field.extraProps;
    var condition = extraProps.condition,
      display = extraProps.display;
    var visible = field.isSingle && typeof condition === 'function' ? condition(field.internalToShellPropEntry()) !== false : true;
    if (!visible) {
      return null;
    }

    // todo: split collapsed state | field.items for optimize
    return createField({
      meta: ((_field$componentMeta3 = field.componentMeta) === null || _field$componentMeta3 === void 0 ? void 0 : _field$componentMeta3.npm) || ((_field$componentMeta4 = field.componentMeta) === null || _field$componentMeta4 === void 0 ? void 0 : _field$componentMeta4.componentName) || '',
      title: field.title,
      // editor: field.editor,
      collapsed: !field.expanded,
      onExpandChange: function onExpandChange(expandState) {
        return field.setExpanded(expandState);
      },
      // field: field,
      // stages,
      stageName: this.stageName
    }, field.items.map(function (item, index) {
      return createSettingFieldView(item, field, index);
    }), display);
  };
  return SettingGroupView;
}(Component), _class4.contextType = SkeletonContext, _class4)) || _class3;
export function createSettingFieldView(item, field, index) {
  if (isSettingField(item)) {
    if (item.isGroup) {
      return /*#__PURE__*/React.createElement(SettingGroupView, {
        field: item,
        key: item.id
      });
    } else {
      return /*#__PURE__*/React.createElement(SettingFieldView, {
        field: item,
        key: item.id
      });
    }
  } else {
    return createContent(item, {
      key: index,
      field: field
    });
  }
}
export var SettingsPane = observer(_class5 = (_class6 = (_class7 = /*#__PURE__*/function (_Component3) {
  _inheritsLoose(SettingsPane, _Component3);
  function SettingsPane() {
    var _this4;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this4 = _Component3.call.apply(_Component3, [this].concat(args)) || this;
    _initializerDefineProperty(_this4, "currentStage", _descriptor, _assertThisInitialized(_this4));
    _this4.popupPipe = new PopupPipe();
    _this4.pipe = _this4.popupPipe.create();
    _this4.handleClick = function (e) {
      // compatiable vision stageBox
      // TODO: optimize these codes
      var _this4$props$usePopup = _this4.props.usePopup,
        usePopup = _this4$props$usePopup === void 0 ? true : _this4$props$usePopup;
      if (!usePopup) return;
      var pane = e.currentTarget;
      function getTarget(node) {
        if (!pane.contains(node) || node.nodeName === 'A' && node.getAttribute('href')) {
          return null;
        }
        var target = node.dataset ? node.dataset.stageTarget : null;
        if (target) {
          return target;
        }
        return getTarget(node.parentNode);
      }
      var target = getTarget(e.target);
      if (!target) {
        return;
      }
      var skeleton = _this4.context;
      if (!skeleton || !skeleton.stages) {
        return;
      }
      var stage = skeleton.stages.container.get(target);
      if (stage) {
        if (_this4.currentStage) {
          stage.setPrevious(_this4.currentStage);
        }
        _this4.currentStage = stage;
      }
    };
    return _this4;
  }
  var _proto3 = SettingsPane.prototype;
  _proto3.popStage = function popStage() {
    var _this$currentStage;
    this.currentStage = (_this$currentStage = this.currentStage) === null || _this$currentStage === void 0 ? void 0 : _this$currentStage.getPrevious();
  };
  _proto3.render = function render() {
    var target = this.props.target;
    var items = target.items;
    return /*#__PURE__*/React.createElement("div", {
      className: "lc-settings-pane",
      onClick: this.handleClick
    }, /*#__PURE__*/React.createElement(PopupService, {
      popupPipe: this.popupPipe
    }, /*#__PURE__*/React.createElement("div", {
      className: "lc-settings-content"
    }, items.map(function (item, index) {
      return createSettingFieldView(item, target, index);
    }))));
  };
  return SettingsPane;
}(Component), _class7.contextType = SkeletonContext, _class7), (_descriptor = _applyDecoratedDescriptor(_class6.prototype, "currentStage", [obx], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class6)) || _class5;