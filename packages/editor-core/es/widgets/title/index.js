import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import { Component, isValidElement } from 'react';
import classNames from 'classnames';
import { createIcon } from '@alilc/lowcode-utils';
import { isI18nData } from '@alilc/lowcode-types';
import { intl } from '../../intl';
import { Tip } from '../tip';
import './title.less';

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
export var Title = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Title, _Component);
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
      var intlLabel = intl(label);
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
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
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
    if ( /*#__PURE__*/isValidElement(title)) {
      return title;
    }
    if (typeof title === 'string' || isI18nData(title)) {
      title = {
        label: title
      };
    }
    var icon = title.icon ? createIcon(title.icon, {
      size: 20
    }) : null;
    var tip = null;
    if (title.tip) {
      if ( /*#__PURE__*/isValidElement(title.tip) && title.tip.type === Tip) {
        tip = title.tip;
      } else {
        var tipProps = typeof title.tip === 'object' && !( /*#__PURE__*/isValidElement(title.tip) || isI18nData(title.tip)) ? title.tip : {
          children: title.tip
        };
        tip = /*#__PURE__*/React.createElement(Tip, tipProps);
      }
    }
    return /*#__PURE__*/React.createElement("span", {
      className: classNames('lc-title', className, title.className, {
        'has-tip': !!tip,
        'only-icon': !title.label
      }),
      onClick: this.handleClick
    }, icon ? /*#__PURE__*/React.createElement("b", {
      className: "lc-title-icon"
    }, icon) : null, this.renderLabel(title.label), tip);
  };
  return Title;
}(Component);