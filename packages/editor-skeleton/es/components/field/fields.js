import _Icon from "@alifd/next/lib/icon";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import { Component } from 'react';
import { isObject } from 'lodash';
import classNames from 'classnames';
import { Title } from '@alilc/lowcode-editor-core';
import { PopupContext } from '../popup';
import './index.less';
import InlineTip from './inlinetip';
export var Field = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Field, _Component);
  function Field(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.state = {
      collapsed: _this.props.collapsed,
      display: _this.props.defaultDisplay || 'inline',
      hasError: false
    };
    _this.toggleExpand = function () {
      var onExpandChange = _this.props.onExpandChange;
      // eslint-disable-next-line react/no-access-state-in-setstate
      var collapsed = !_this.state.collapsed;
      _this.setState({
        collapsed: collapsed
      });
      onExpandChange && onExpandChange(!collapsed);
    };
    _this.body = null;
    _this.dispose = void 0;
    _this.handleClear = _this.handleClear.bind(_assertThisInitialized(_this));
    _this.clickHandler = _this.clickHandler.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = Field.prototype;
  _proto.deployBlockTesting = function deployBlockTesting() {
    var _this2 = this;
    if (this.dispose) {
      this.dispose();
    }
    var body = this.body;
    if (!body) {
      return;
    }
    var check = function check() {
      var setter = body.firstElementChild;
      if (setter && setter.classList.contains('lc-block-setter')) {
        _this2.setState({
          display: 'block'
        });
      } else {
        _this2.setState({
          display: 'inline'
        });
      }
    };
    var observer = new MutationObserver(check);
    check();
    observer.observe(body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
    this.dispose = function () {
      return observer.disconnect();
    };
  };
  _proto.handleClear = function handleClear(e) {
    e.stopPropagation();
    this.props.onClear && this.props.onClear();
  };
  _proto.componentDidMount = function componentDidMount() {
    var defaultDisplay = this.props.defaultDisplay;
    if (!defaultDisplay || defaultDisplay === 'inline') {
      this.deployBlockTesting();
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.dispose) {
      this.dispose();
    }
  };
  Field.getDerivedStateFromError = function getDerivedStateFromError() {
    return {
      hasError: true
    };
  };
  _proto.getTipContent = function getTipContent(propName, tip) {
    var tipContent = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "\u5C5E\u6027\uFF1A", propName));
    if (isObject(tip)) {
      tipContent = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "\u5C5E\u6027\uFF1A", propName), /*#__PURE__*/React.createElement("div", null, "\u8BF4\u660E\uFF1A", tip.content));
    } else if (tip) {
      tipContent = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "\u5C5E\u6027\uFF1A", propName), /*#__PURE__*/React.createElement("div", null, "\u8BF4\u660E\uFF1A", tip));
    }
    return tipContent;
  };
  _proto.clickHandler = function clickHandler(event) {
    var _this$props = this.props,
      editor = _this$props.editor,
      name = _this$props.name,
      title = _this$props.title,
      meta = _this$props.meta;
    editor === null || editor === void 0 ? void 0 : editor.emit('setting.setter.field.click', {
      name: name,
      title: title,
      meta: meta,
      event: event
    });
  };
  _proto.render = function render() {
    var _this3 = this;
    var hasError = this.state.hasError;
    if (hasError) {
      return null;
    }
    var _this$props2 = this.props,
      className = _this$props2.className,
      children = _this$props2.children,
      meta = _this$props2.meta,
      title = _this$props2.title,
      valueState = _this$props2.valueState,
      propName = _this$props2.name,
      tip = _this$props2.tip;
    var _this$state = this.state,
      display = _this$state.display,
      collapsed = _this$state.collapsed;
    var isAccordion = display === 'accordion';
    var hostName = '';
    if (typeof meta === 'object') {
      hostName = ((meta === null || meta === void 0 ? void 0 : meta["package"]) || '') + "-" + (meta.componentName || '');
    } else if (typeof meta === 'string') {
      hostName = meta;
    }
    var id = hostName + "-" + (propName || title['en-US'] || title['zh-CN']);
    var tipContent = this.getTipContent(propName, tip);
    return /*#__PURE__*/React.createElement("div", {
      className: classNames("lc-field lc-" + display + "-field", className, {
        'lc-field-is-collapsed': isAccordion && collapsed
      }),
      id: id
    }, display !== 'plain' && /*#__PURE__*/React.createElement("div", {
      className: "lc-field-head",
      onClick: isAccordion ? this.toggleExpand : undefined
    }, /*#__PURE__*/React.createElement("div", {
      className: "lc-field-title"
    }, createValueState(valueState, this.handleClear), /*#__PURE__*/React.createElement(Title, {
      title: title || '',
      onClick: this.clickHandler
    }), /*#__PURE__*/React.createElement(InlineTip, {
      position: "top"
    }, tipContent)), isAccordion && /*#__PURE__*/React.createElement(_Icon, {
      className: "lc-field-icon",
      type: "arrow-up",
      size: "xs"
    })), /*#__PURE__*/React.createElement("div", {
      key: "body",
      ref: function ref(shell) {
        _this3.body = shell;
      },
      className: "lc-field-body"
    }, children));
  };
  return Field;
}(Component);

/**
 * **交互专利点**
 *
 * -1 多种值
 * 0 | null 无值
 * 1 类似值，比如数组长度一样
 * 2 单一植
 * 10 必填
 *
 * TODO: turn number to enum
 */
function createValueState( /* valueState?: number, onClear?: (e: React.MouseEvent) => void */
) {
  return null;
  /*
  let tip: any = null;
  let className = 'lc-valuestate';
  let icon: any = null;
  if (valueState) {
    if (valueState < 0) {
      // multiple value 橘黄色点： tip：多种值，点击清除
      tip = intlNode('Multiple Value, Click to Clear');
      className += ' valuestate-multiple';
      icon = <IconClear size={6} />;
    } else if (valueState === 10) {
      // isset  orangered tip: 必填项
      tip = intlNode('Required');
      className += ' valuestate-required';
      onClear = undefined;
    } else if (valueState > 0) {
      // isset  蓝点 tip: 已设置值，点击清除
      tip = intlNode('Setted Value, Click to Clear');
      className += ' valuestate-isset';
      icon = <IconClear size={6} />;
    }
  } else {
    onClear = undefined;
    // unset 占位空间
  }
   return (
    <i className={className} onClick={onClear}>
      {icon}
      {tip && <Tip>{tip}</Tip>}
    </i>
  );
  */
}

export var PopupField = /*#__PURE__*/function (_Component2) {
  _inheritsLoose(PopupField, _Component2);
  function PopupField() {
    var _this4;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this4 = _Component2.call.apply(_Component2, [this].concat(args)) || this;
    _this4.pipe = void 0;
    return _this4;
  }
  var _proto2 = PopupField.prototype;
  _proto2.render = function render() {
    var _this5 = this;
    var _this$props3 = this.props,
      className = _this$props3.className,
      children = _this$props3.children,
      title = _this$props3.title,
      width = _this$props3.width;
    if (!this.pipe) {
      this.pipe = this.context.create({
        width: width
      });
    }
    var titleElement = title && /*#__PURE__*/React.createElement("div", {
      className: "lc-field-title"
    }, /*#__PURE__*/React.createElement(Title, {
      title: title
    }));
    this.pipe.send( /*#__PURE__*/React.createElement("div", {
      className: "lc-field-body"
    }, children), titleElement);
    return /*#__PURE__*/React.createElement("div", {
      className: classNames('lc-field lc-popup-field', className)
    }, title && /*#__PURE__*/React.createElement("div", {
      className: "lc-field-head",
      onClick: function onClick(e) {
        _this5.pipe.show(e.target);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "lc-field-title"
    }, /*#__PURE__*/React.createElement(Title, {
      title: title
    })), /*#__PURE__*/React.createElement(_Icon, {
      className: "lc-field-icon",
      type: "arrow-left",
      size: "xs"
    })));
  };
  return PopupField;
}(Component);
PopupField.contextType = PopupContext;
PopupField.defaultProps = {
  width: 300
};
export var EntryField = /*#__PURE__*/function (_Component3) {
  _inheritsLoose(EntryField, _Component3);
  function EntryField() {
    return _Component3.apply(this, arguments) || this;
  }
  var _proto3 = EntryField.prototype;
  _proto3.render = function render() {
    var _this$props4 = this.props,
      title = _this$props4.title,
      className = _this$props4.className,
      stageName = _this$props4.stageName;
    var classNameList = classNames('lc-field', 'lc-entry-field', className);
    return /*#__PURE__*/React.createElement("div", {
      className: classNameList
    }, /*#__PURE__*/React.createElement("div", {
      className: "lc-field-head",
      "data-stage-target": stageName
    }, /*#__PURE__*/React.createElement("div", {
      className: "lc-field-title"
    }, /*#__PURE__*/React.createElement(Title, {
      title: title || ''
    })), /*#__PURE__*/React.createElement(_Icon, {
      className: "lc-field-icon",
      type: "arrow-right",
      size: "xs"
    })));
  };
  return EntryField;
}(Component);
export var PlainField = /*#__PURE__*/function (_Component4) {
  _inheritsLoose(PlainField, _Component4);
  function PlainField() {
    return _Component4.apply(this, arguments) || this;
  }
  var _proto4 = PlainField.prototype;
  _proto4.render = function render() {
    var _this$props5 = this.props,
      className = _this$props5.className,
      children = _this$props5.children;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames('lc-field lc-plain-field', className)
    }, /*#__PURE__*/React.createElement("div", {
      className: "lc-field-body"
    }, children));
  };
  return PlainField;
}(Component);