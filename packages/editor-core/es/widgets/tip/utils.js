function resolveEdge(popup, target, arrow, bounds) {
  var sx = arrow.width > target.width ? (arrow.width - target.width) / 2 : 0;
  var sy = arrow.width > target.height ? (arrow.width - target.height) / 2 : 0;
  var top = Math.max(target.top - popup.height + arrow.width - sy, bounds.top);
  var right = Math.min(target.right + popup.width - arrow.width + sx, bounds.right);
  var bottom = Math.min(target.bottom + popup.height - arrow.width + sy, bounds.bottom);
  var left = Math.max(target.left - popup.width + arrow.width - sx, bounds.left);
  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
}
function resolveDirection(popup, target, edge, bounds, prefers) {
  if (prefers.forceDirection) {
    return prefers.dir;
  }
  var extendWidth = popup.width + popup.extraOffset;
  var extendHeight = popup.height + popup.extraOffset;
  var SY = popup.width * extendHeight;
  var SX = popup.height * extendWidth;
  var mw = Math.min(edge.right - edge.left, popup.width);
  var mh = Math.min(edge.bottom - edge.top, popup.height);
  var mat = {
    top: function top() {
      var s = mw * Math.min(target.top - bounds.top, extendHeight);
      return {
        s: s,
        enough: s >= SY
      };
    },
    bottom: function bottom() {
      var s = mw * Math.min(bounds.bottom - target.bottom, extendHeight);
      return {
        s: s,
        enough: s >= SY
      };
    },
    left: function left() {
      var s = mh * Math.min(target.left - bounds.left, extendWidth);
      return {
        s: s,
        enough: s >= SX
      };
    },
    right: function right() {
      var s = mh * Math.min(bounds.right - target.right, extendWidth);
      return {
        s: s,
        enough: s >= SX
      };
    }
  };
  var orders = ['top', 'right', 'bottom', 'left'];
  if (prefers.dir) {
    var i = orders.indexOf(prefers.dir);
    if (i > -1) {
      orders.splice(i, 1);
      orders.unshift(prefers.dir);
    }
  }
  var ms = 0;
  var prefer = orders[0];
  for (var _i = 0, l = orders.length; _i < l; _i++) {
    var dir = orders[_i];
    var _mat$dir = mat[dir](),
      s = _mat$dir.s,
      enough = _mat$dir.enough;
    if (enough) {
      return dir;
    }
    if (s > ms) {
      ms = s;
      prefer = dir;
    }
  }
  return prefer;
}
function resolvePrefer(prefer, targetRect, bounds) {
  if (!prefer) {
    if (targetRect.left - bounds.left < 10) {
      return {
        dir: 'right'
      };
    } else if (targetRect.top - bounds.top < 10) {
      return {
        dir: 'bottom'
      };
    } else if (bounds.bottom - targetRect.bottom < 10) {
      return {
        dir: 'top'
      };
    } else if (bounds.right - targetRect.right < 10) {
      return {
        dir: 'left'
      };
    }
    return {};
  }
  var force = prefer[0] === '!';
  if (force) {
    prefer = prefer.slice(1);
  }
  var _prefer$split = prefer.split(/\s+/),
    dir = _prefer$split[0],
    offset = _prefer$split[1];
  var forceDirection = false;
  var forceOffset = false;
  if (dir === 'center') {
    dir = 'auto';
    if (!offset) {
      offset = 'center';
    }
  }
  if (force) {
    if (dir && dir !== 'auto') {
      forceDirection = true;
    }
    if (offset && offset !== 'auto') {
      forceOffset = true;
    }
  }
  return {
    dir: dir,
    offset: offset,
    forceDirection: forceDirection,
    forceOffset: forceOffset
  };
}
export function resolvePosition(popup, target, arrow, bounds, prefer) {
  popup = {
    extraOffset: arrow.height,
    top: popup.top,
    right: popup.right,
    left: popup.left,
    bottom: popup.bottom,
    height: popup.height,
    width: popup.width
  };
  var prefers = resolvePrefer(prefer, target, bounds);
  var edge = resolveEdge(popup, target, arrow, bounds);

  // 选择方向
  var dir = resolveDirection(popup, target, edge, bounds, prefers);
  var top;
  var left;
  var arrowTop;
  var arrowLeft;

  // 或得该方位上横向 或 纵向的 偏移
  if (dir === 'top' || dir === 'bottom') {
    if (dir === 'top') {
      top = target.top - popup.extraOffset - popup.height;
    } else {
      top = target.bottom + popup.extraOffset;
    }

    // 解决横向偏移
    var offset = arrow.width > target.width ? (arrow.width - target.width) / 2 : 0;
    var minLeft = target.left + arrow.width - offset - popup.width;
    var maxLeft = target.right - arrow.width + offset;
    var centerLeft = target.left - (popup.width - target.width) / 2;
    if (prefers.offset === 'left') {
      left = minLeft;
    } else if (prefers.offset === 'right') {
      left = maxLeft;
    } else {
      left = centerLeft;
    }
    if (!prefers.forceOffset) {
      left = Math.max(Math.min(edge.right - popup.width, left), minLeft);
      left = Math.min(Math.max(edge.left, left), maxLeft);
    }
    arrowLeft = Math.min(popup.width - arrow.width, Math.max(target.left - (arrow.width - target.width) / 2 - left, 0));
  } else {
    if (dir === 'left') {
      left = target.left - popup.extraOffset - popup.width;
    } else {
      left = target.right + popup.extraOffset;
    }

    // 解决纵向偏移
    var _offset = arrow.width > target.height ? (arrow.width - target.height) / 2 : 0;
    var minTop = target.top + arrow.width - _offset - popup.height;
    var maxTop = target.bottom - arrow.width + _offset;
    var centerTop = target.top - (popup.height - target.height) / 2;
    if (prefers.offset === 'top') {
      top = minTop;
    } else if (prefers.offset === 'bottom') {
      top = maxTop;
    } else {
      top = centerTop;
    }
    if (!prefers.forceOffset) {
      top = Math.max(Math.min(edge.bottom - popup.height, top), minTop);
      top = Math.min(Math.max(edge.top, top), maxTop);
    }
    arrowTop = Math.min(popup.height - arrow.height, Math.max(target.top - (arrow.width - target.height) / 2 - top, 0));
  }
  return {
    dir: dir,
    left: left,
    top: top,
    arrowLeft: arrowLeft,
    arrowTop: arrowTop
  };
}
var percentPresets = {
  right: 1,
  left: 0,
  top: 0,
  bottom: 1,
  center: 0.5
};
function isPercent(val) {
  return /^[\d.]+%$/.test(val);
}
function resolveRelativeValue(val, offset, total) {
  if (!val) {
    val = 0;
  } else if (isPercent(val)) {
    val = parseFloat(val) / 100 * total;
  } else if (percentPresets.hasOwnProperty(val)) {
    val = percentPresets[val] * total;
  } else {
    val = parseFloat(val);
    if (isNaN(val)) {
      val = 0;
    }
  }
  return val + offset + "px";
}
export function resolveRelativePosition(align, popup, bounds) {
  if (!align) {
    // return default position
    return {
      top: '38.2%',
      left: 'calc(50% - 110px)'
    };
  }
  var _align$trim$split = align.trim().split(/\s+/),
    xAlign = _align$trim$split[0],
    yAlign = _align$trim$split[1];
  if (xAlign === 'top' || xAlign === 'bottom' || yAlign === 'left' || yAlign === 'right') {
    var tmp = xAlign;
    xAlign = yAlign;
    yAlign = tmp;
  }
  if (xAlign === 'center' && !yAlign) {
    yAlign = 'center';
  }
  return {
    left: resolveRelativeValue(xAlign, 0, bounds.right - bounds.left - popup.width),
    top: resolveRelativeValue(yAlign, 0, bounds.bottom - bounds.top - popup.height)
  };
}