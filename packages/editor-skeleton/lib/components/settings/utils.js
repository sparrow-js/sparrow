"use strict";

exports.__esModule = true;
exports.Transducer = void 0;
function getHotterFromSetter(setter) {
  return setter && (setter.Hotter || setter.type && setter.type.Hotter) || []; // eslint-disable-line
}

function getTransducerFromSetter(setter) {
  return setter && (setter.transducer || setter.Transducer || setter.type && (setter.type.transducer || setter.type.Transducer)) || null; // eslint-disable-line
}

function combineTransducer(transducer, arr, context) {
  if (!transducer && Array.isArray(arr)) {
    var toHot = arr[0],
      toNative = arr[1];
    transducer = {
      toHot: toHot,
      toNative: toNative
    };
  }
  return {
    toHot: (transducer && transducer.toHot || function (x) {
      return x;
    }).bind(context),
    // eslint-disable-line
    toNative: (transducer && transducer.toNative || function (x) {
      return x;
    }).bind(context) // eslint-disable-line
  };
}
var Transducer = /*#__PURE__*/function () {
  function Transducer(context, config) {
    this.setterTransducer = combineTransducer(getTransducerFromSetter(config.setter), getHotterFromSetter(config.setter), context);
    this.context = context;
  }
  var _proto = Transducer.prototype;
  _proto.toHot = function toHot(data) {
    return this.setterTransducer.toHot(data);
  };
  _proto.toNative = function toNative(data) {
    return this.setterTransducer.toNative(data);
  };
  return Transducer;
}();
exports.Transducer = Transducer;