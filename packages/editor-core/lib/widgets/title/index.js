"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Title = void 0;
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _lowcodeUtils = require("@alilc/lowcode-utils");
var _lowcodeTypes = require("@alilc/lowcode-types");
var _intl = require("../../intl");
var _tip = require("../tip");
require("./title.less");
/**
 * 根据 keywords 将 label 分割成文字片段
 * 示例：title = '自定义页面布局'，keywords = '页面'，返回结果为 ['自定义', '页面', '布局']
 * @param label title
 * @param keywords 关键字
 * @returns 文字片段列表
 */
function splitLabelByKeywords(label, keywords) {
  var len = keywords.length;
  var fragments = [];
  var str = label;
  while (str.length > 0) {
    var index = str.indexOf(keywords);
    if (index === 0) {
      fragments.push(keywords);
      str = str.slice(len);
    } else if (index < 0) {
      fragments.push(str);
      str = '';
    } else {
      fragments.push(str.slice(0, index));
      str = str.slice(index);
    }
  }
  return fragments;
}
var Title = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(Title, _Component);
  function Title(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.renderLabel = function (label) {
      var _this$props = _this.props,
        match = _this$props.match,
        keywords = _this$props.keywords;
      if (!label) {
        return null;
      }
      var intlLabel = (0, _intl.intl)(label);
      if (typeof intlLabel !== 'string') {
        return /*#__PURE__*/React.createElement("span", {
          className: "lc-title-txt"
        }, intlLabel);
      }
      var labelToRender = intlLabel;
      if (match && keywords) {
        var fragments = splitLabelByKeywords(intlLabel, keywords);
        labelToRender = fragments.map(function (f) {
          return /*#__PURE__*/React.createElement("span", {
            style: {
              color: f === keywords ? 'red' : 'inherit'
            }
          }, f);
        });
      }
      return /*#__PURE__*/React.createElement("span", {
        className: "lc-title-txt"
      }, labelToRender);
    };
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  var _proto = Title.prototype;
  _proto.handleClick = function handleClick(e) {
    var _ref = this.props,
      title = _ref.title,
      onClick = _ref.onClick;
    var url = title && (title.docUrl || title.url);
    if (url) {
      window.open(url);
      // 防止触发行操作（如折叠面板）
      e.stopPropagation();
    }
    // TODO: 操作交互冲突，目前 mixedSetter 仅有 2 个 setter 注册时用到了 onClick
    onClick && onClick(e);
  };
  _proto.render = function render() {
    // eslint-disable-next-line prefer-const
    var _this$props2 = this.props,
      title = _this$props2.title,
      className = _this$props2.className;
    if (title == null) {
      return null;
    }
    if ( /*#__PURE__*/(0, _react.isValidElement)(title)) {
      return title;
    }
    if (typeof title === 'string' || (0, _lowcodeTypes.isI18nData)(title)) {
      title = {
        label: title
      };
    }
    var icon = title.icon ? (0, _lowcodeUtils.createIcon)(title.icon, {
      size: 20
    }) : null;
    var tip = null;
    if (title.tip) {
      if ( /*#__PURE__*/(0, _react.isValidElement)(title.tip) && title.tip.type === _tip.Tip) {
        tip = title.tip;
      } else {
        var tipProps = typeof title.tip === 'object' && !( /*#__PURE__*/(0, _react.isValidElement)(title.tip) || (0, _lowcodeTypes.isI18nData)(title.tip)) ? title.tip : {
          children: title.tip
        };
        tip = /*#__PURE__*/React.createElement(_tip.Tip, tipProps);
      }
    }
    return /*#__PURE__*/React.createElement("span", {
      className: (0, _classnames["default"])('lc-title', className, title.className, {
        'has-tip': !!tip,
        'only-icon': !title.label
      }),
      onClick: this.handleClick
    }, icon ? /*#__PURE__*/React.createElement("b", {
      className: "lc-title-icon"
    }, icon) : null, this.renderLabel(title.label), tip);
  };
  return Title;
}(_react.Component);
exports.Title = Title;