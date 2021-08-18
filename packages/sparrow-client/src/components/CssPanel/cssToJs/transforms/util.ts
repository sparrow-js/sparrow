import {
  LENGTH,
  UNSUPPORTED_LENGTH_UNIT,
  PERCENT,
  COLOR,
  SPACE,
  NONE,
  LENGTHUNIT,
} from '../tokenTypes'

export const directionFactory = ({
  types = [LENGTHUNIT, LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT],
  directions = ['Top', 'Right', 'Bottom', 'Left'],
  prefix = '',
  suffix = '',
}) => tokenStream => {
  const values = []
  // borderWidth doesn't currently allow a percent value, but may do in the future
  values.push(tokenStream.expect(...types))

  while (values.length < 4 && tokenStream.hasTokens()) {
    tokenStream.expect(SPACE)
    values.push(tokenStream.expect(...types))
  }

  tokenStream.expectEmpty()

  const [top, right = top, bottom = top, left = right] = values

  const keyFor = n => `${prefix}${directions[n]}${suffix}`;
  // todo prefix 修改
  return {
    [prefix]: values.length === 1 ? values[0] : {value: '', unit: ''},
    [keyFor(0)]: top,
    [keyFor(1)]: right,
    [keyFor(2)]: bottom,
    [keyFor(3)]: left,
  }
}

export const parseShadowOffset = tokenStream => {
  const width = tokenStream.expect(LENGTH)
  const height = tokenStream.matches(SPACE) ? tokenStream.expect(LENGTH) : width
  tokenStream.expectEmpty()
  return { width, height }
}

export const parseShadow = tokenStream => {
  let shadowOffsetX
  let shadowOffsetY
  let shadowBlur
  let shadowSpread
  let color

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty()
    return {
      offset: { width: 0, height: 0 },
      radius: 0,
      color: 'black',
    }
  }

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE)
    if (
      shadowOffsetX === undefined &&
      tokenStream.matches(LENGTHUNIT, LENGTH, UNSUPPORTED_LENGTH_UNIT)
    ) {
      shadowOffsetX = tokenStream.lastValue
      tokenStream.expect(SPACE)
      shadowOffsetY = tokenStream.expect(LENGTHUNIT, LENGTH, UNSUPPORTED_LENGTH_UNIT)
      tokenStream.expect(SPACE)
      shadowBlur = tokenStream.expect(LENGTHUNIT, LENGTH, UNSUPPORTED_LENGTH_UNIT)
      tokenStream.saveRewindPoint();

      if (
        tokenStream.matches(SPACE) &&
        tokenStream.matches(LENGTHUNIT, LENGTH, UNSUPPORTED_LENGTH_UNIT)
      ) {
        shadowSpread = tokenStream.lastValue
      } else {
        tokenStream.rewind()
      }
    } else if (color === undefined && tokenStream.matches(COLOR)) {
      color = tokenStream.lastValue
    } else {
      tokenStream.throw()
    }

    didParseFirst = true
  }

  if (shadowOffsetX === undefined) tokenStream.throw()

  return {
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowSpread: shadowSpread !== undefined ? shadowSpread : 0,
    shadowColor: color !== undefined ? color : 'black',
  }
}
