const isEmptyValue = function (value) {
  if (value && value !== 0) {
    return false;
  }
  return true;
}

const getCssValue = function(cssObj) {
  if (cssObj) {
    if (isEmptyValue(cssObj.value)) {
      return null;
    }
    return `${cssObj.value}${cssObj.unit}`;
  } else {
    return null;
  }
}

export const getPropsNameToCss = (key) => {
  // Convert camelCase to kebab-case
  const propsName = key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
  return propsName;
}

const padding = function (originCssObj) {
  const {paddingLeft, paddingRight, paddingTop, paddingBottom, padding} = originCssObj;
  const paddingLeftValue = getCssValue(paddingLeft);
  const paddingRightValue = getCssValue(paddingRight);
  const paddingTopValue = getCssValue(paddingTop);
  const paddingBottomValue = getCssValue(paddingBottom);
  const paddingValue = getCssValue(padding);
  if (
    !isEmptyValue(paddingLeftValue) &&
    !isEmptyValue(paddingRightValue)&&
    !isEmptyValue(paddingTopValue) &&
    !isEmptyValue(paddingBottomValue) &&
    !isEmptyValue(paddingValue)
  ) {
    // example: padding: 10px
    if (
      paddingValue === paddingBottomValue &&
      paddingValue === paddingTopValue &&
      paddingValue === paddingRightValue && 
      paddingValue === paddingLeftValue
    ) {
      return ['padding', paddingValue];
    }
    // example: padding: 10px 10px;
    if (
      paddingTopValue === paddingBottomValue &&
      paddingLeftValue === paddingRightValue
    ) {
      return ['padding', `${paddingTopValue} ${paddingLeftValue}`];
    }
    // example: padding: 10px 10px 10px 10px;
    return ['padding', `${paddingTopValue} ${paddingLeftValue} ${paddingRightValue} ${paddingBottomValue}`]
  }
  
  const partToCss = [];

  if (!isEmptyValue(paddingLeftValue)) {
    partToCss.push([getPropsNameToCss('paddingLeft'), paddingLeftValue])
  }

  if (!isEmptyValue(paddingRightValue)) {
    partToCss.push([getPropsNameToCss('paddingRight'), paddingRightValue])
  }

  if (!isEmptyValue(paddingTopValue)) {
    partToCss.push([getPropsNameToCss('paddingTop'), paddingTopValue])
  }

  if (!isEmptyValue(paddingBottomValue)) {
    partToCss.push([getPropsNameToCss('paddingBottom'), paddingBottomValue])
  }
  return partToCss;
}

export default {
  padding
}
