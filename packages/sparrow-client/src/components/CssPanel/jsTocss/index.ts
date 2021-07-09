import transforms, {getPropsNameToCss} from './transforms';
import {formatCss} from './formatters/css';
const unNeedProcessingList = [
  'paddingLeft', // padding 相关key统一在padding里处理
  'paddingTop',
  'paddingRight',
  'paddingBottom',
];

export const transformRawValue = (propName, value) => {
  const transformPropName = getPropsNameToCss(propName);
  if (typeof value === 'string') {
    return [transformPropName, value];
  }

  if (value.value && value.unit) {
    return [transformPropName, `${value.value}${value.unit}`]
  }
  return null;
}

export default function generator (cssObj) {
  const cssKeys = Object.keys(cssObj).reduce((keys, currentValue)=> {
    if (!unNeedProcessingList.includes(currentValue)) {
      keys.push(currentValue)
    }
    return keys;
  },[]);

  const cssrules = cssKeys.reduce((rules, cssKey) => {
    const rule = transforms[cssKey] ? transforms[cssKey](cssObj) : transformRawValue(cssKey, cssObj[cssKey]);
    if (rule) {
      if (Array.isArray(rule[0])) {
        rules = rules.concat(rule);
      } else {
        rules.push(rule);
      }
    }
    return rules;
  }, []);

  const cssList = cssrules.reduce((total, css) => {
    if (css[1]) {
      total.push(`${css[0]}: ${css[1]};`);
    }
    return total;
  }, [])
  return formatCss(`:root{${cssList.join("\n")}}`);
}