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

// todo 这里和padding基本一样，待封装
const margin = function (originCssObj) {
  const {marginLeft,marginRight, marginTop, marginBottom, margin} = originCssObj;
  const marginLeftValue = getCssValue(marginLeft);
  const marginRightValue = getCssValue(marginRight);
  const marginTopValue = getCssValue(marginTop);
  const marginBottomValue = getCssValue(marginBottom);
  const marginValue = getCssValue(margin);
  if (
    !isEmptyValue(marginLeftValue) &&
    !isEmptyValue(marginRightValue)&&
    !isEmptyValue(marginTopValue) &&
    !isEmptyValue(marginBottomValue) &&
    !isEmptyValue(marginValue)
  ) {
    // example: margin: 10px
    if (
      marginValue === marginBottomValue &&
      marginValue === marginTopValue &&
      marginValue === marginRightValue && 
      marginValue === marginLeftValue
    ) {
      return ['margin', marginValue];
    }
    // example: margin: 10px 10px;
    if (
      marginTopValue === marginBottomValue &&
      marginLeftValue === marginRightValue
    ) {
      return ['margin', `${marginTopValue} ${marginLeftValue}`];
    }
    // example: margin: 10px 10px 10px 10px;
    return ['margin', `${marginTopValue} ${marginLeftValue} ${marginRightValue} ${marginBottomValue}`]
  }

  const partToCss = [];

  if (!isEmptyValue(marginLeftValue)) {
    partToCss.push([getPropsNameToCss('marginLeft'), marginLeftValue])
  }

  if (!isEmptyValue(marginRightValue)) {
    partToCss.push([getPropsNameToCss('marginRight'), marginRightValue])
  }

  if (!isEmptyValue(marginTopValue)) {
    partToCss.push([getPropsNameToCss('marginTop'), marginTopValue])
  }

  if (!isEmptyValue(marginBottomValue)) {
    partToCss.push([getPropsNameToCss('marginBottom'), marginBottomValue])
  }
  return partToCss;
}

const shadowColor = function (originCssObj) {
  const {shadowOffsetX, shadowOffsetY, shadowBlur, shadowSpread, shadowColor} = originCssObj;
  const shadowOffsetXValue = getCssValue(shadowOffsetX);
  const shadowOffsetYValue = getCssValue(shadowOffsetY);
  const shadowBlurValue = getCssValue(shadowBlur);
  const shadowSpreadValue = getCssValue(shadowSpread);
  if (isEmptyValue(shadowOffsetXValue) || isEmptyValue(shadowOffsetYValue)) {
    return [];
  }
  return ['box-shadow', `${shadowOffsetXValue} ${shadowOffsetYValue} ${shadowBlurValue} ${shadowSpreadValue} ${shadowColor}`]
}

const borderDirection = function (originCssObj) {
  const {borderDirection, borderWidth, borderStyle, borderColor} = originCssObj;
  const borderWidthValue = getCssValue(borderWidth);
  if (isEmptyValue(borderWidthValue) || !borderStyle || !borderColor) {
    const partToCss = [];
    if(!isEmptyValue(borderWidthValue)) {
      partToCss.push(['border-width', borderWidthValue]);
    }

    if (borderStyle) {
      partToCss.push(['border-style', borderStyle]);
    }

    if (borderColor) {
      partToCss.push(['border-color', borderColor]);
    }

    return partToCss;
  }
  return [`border${borderDirection === '' ? '' : `-${borderDirection}`}`, `${borderWidthValue} ${borderStyle} ${borderColor}`]
}

const borderRadiusDirection = function (originCssObj) {
  const {borderRadiusDirection, borderRadiusWidth} = originCssObj;
  const borderWidthValue = getCssValue(borderRadiusWidth);
  if (isEmptyValue(borderWidthValue)) {
    return []
  }

  return [`border-radius${borderRadiusDirection === '' ? '' : `-${borderRadiusDirection}`}`, `${borderWidthValue}`]
}


export default {
  padding,
  margin,
  shadowColor,
  borderDirection,
  borderRadiusDirection
}
