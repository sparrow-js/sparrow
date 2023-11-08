function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import { isEqual } from 'lodash';
import { globalContext } from './di';
import { Editor } from './editor';
var MAP = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  20: 'capslock',
  27: 'esc',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'ins',
  46: 'del',
  91: 'meta',
  93: 'meta',
  224: 'meta'
};
var KEYCODE_MAP = {
  106: '*',
  107: '+',
  109: '-',
  110: '.',
  111: '/',
  186: ';',
  187: '=',
  188: ',',
  189: '-',
  190: '.',
  191: '/',
  192: '`',
  219: '[',
  220: '\\',
  221: ']',
  222: "'"
};
var SHIFT_MAP = {
  '~': '`',
  '!': '1',
  '@': '2',
  '#': '3',
  $: '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  _: '-',
  '+': '=',
  ':': ';',
  '"': "'",
  '<': ',',
  '>': '.',
  '?': '/',
  '|': '\\'
};
var SPECIAL_ALIASES = {
  option: 'alt',
  command: 'meta',
  "return": 'enter',
  escape: 'esc',
  plus: '+',
  mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
};
var REVERSE_MAP;

/**
 * loop through the f keys, f1 to f19 and add them to the map
 * programatically
 */
for (var i = 1; i < 20; ++i) {
  MAP[111 + i] = "f" + i;
}

/**
 * loop through to map numbers on the numeric keypad
 */
for (var _i = 0; _i <= 9; ++_i) {
  MAP[_i + 96] = String(_i);
}

/**
 * takes the event and returns the key character
 */
function characterFromEvent(e) {
  var keyCode = e.keyCode || e.which;
  // for keypress events we should return the character as is
  if (e.type === 'keypress') {
    var character = String.fromCharCode(keyCode);
    // if the shift key is not pressed then it is safe to assume
    // that we want the character to be lowercase.  this means if
    // you accidentally have caps lock on then your key bindings
    // will continue to work
    //
    // the only side effect that might not be desired is if you
    // bind something like 'A' cause you want to trigger an
    // event when capital A is pressed caps lock will no longer
    // trigger the event.  shift+a will though.
    if (!e.shiftKey) {
      character = character.toLowerCase();
    }
    return character;
  }
  // for non keypress events the special maps are needed
  if (MAP[keyCode]) {
    return MAP[keyCode];
  }
  if (KEYCODE_MAP[keyCode]) {
    return KEYCODE_MAP[keyCode];
  }
  // if it is not in the special map
  // with keydown and keyup events the character seems to always
  // come in as an uppercase character whether you are pressing shift
  // or not.  we should make sure it is always lowercase for comparisons
  // tips: Q29weXJpZ2h0IChjKSAyMDIwLXByZXNlbnQgQWxpYmFiYSBJbmMuIFYy
  return String.fromCharCode(keyCode).toLowerCase();
}
function isPressEvent(e) {
  return e.type === 'keypress';
}

/**
 * checks if two arrays are equal
 */
function modifiersMatch(modifiers1, modifiers2) {
  return modifiers1.sort().join(',') === modifiers2.sort().join(',');
}

/**
 * takes a key event and figures out what the modifiers are
 */
function eventModifiers(e) {
  var modifiers = [];
  if (e.shiftKey) {
    modifiers.push('shift');
  }
  if (e.altKey) {
    modifiers.push('alt');
  }
  if (e.ctrlKey) {
    modifiers.push('ctrl');
  }
  if (e.metaKey) {
    modifiers.push('meta');
  }
  return modifiers;
}

/**
 * determines if the keycode specified is a modifier key or not
 */
function isModifier(key) {
  return key === 'shift' || key === 'ctrl' || key === 'alt' || key === 'meta';
}

/**
 * reverses the map lookup so that we can look for specific keys
 * to see what can and can't use keypress
 *
 * @return {Object}
 */
function getReverseMap() {
  if (!REVERSE_MAP) {
    REVERSE_MAP = {};
    for (var _key in MAP) {
      // pull out the numeric keypad from here cause keypress should
      // be able to detect the keys from the character
      if (Number(_key) > 95 && Number(_key) < 112) {
        continue;
      }
      if (MAP.hasOwnProperty(_key)) {
        REVERSE_MAP[MAP[_key]] = _key;
      }
    }
  }
  return REVERSE_MAP;
}

/**
 * picks the best action based on the key combination
 */
function pickBestAction(key, modifiers, action) {
  // if no action was picked in we should try to pick the one
  // that we think would work best for this key
  if (!action) {
    action = getReverseMap()[key] ? 'keydown' : 'keypress';
  }
  // modifier keys don't work as expected with keypress,
  // switch to keydown
  if (action === 'keypress' && modifiers.length) {
    action = 'keydown';
  }
  return action;
}

/**
 * Converts from a string key combination to an array
 *
 * @param  {string} combination like "command+shift+l"
 * @return {Array}
 */
function keysFromString(combination) {
  if (combination === '+') {
    return ['+'];
  }
  combination = combination.replace(/\+{2}/g, '+plus');
  return combination.split('+');
}

/**
 * Gets info for a specific key combination
 *
 * @param combination key combination ("command+s" or "a" or "*")
 */
function getKeyInfo(combination, action) {
  var keys = [];
  var key = '';
  var i;
  var modifiers = [];

  // take the keys from this pattern and figure out what the actual
  // pattern is all about
  keys = keysFromString(combination);
  for (i = 0; i < keys.length; ++i) {
    key = keys[i];

    // normalize key names
    if (SPECIAL_ALIASES[key]) {
      key = SPECIAL_ALIASES[key];
    }

    // if this is not a keypress event then we should
    // be smart about using shift keys
    // this will only work for US keyboards however
    if (action && action !== 'keypress' && SHIFT_MAP[key]) {
      key = SHIFT_MAP[key];
      modifiers.push('shift');
    }

    // if this key is a modifier then add it to the list of modifiers
    if (isModifier(key)) {
      modifiers.push(key);
    }
  }

  // depending on what the key combination is
  // we will try to pick the best event for it
  action = pickBestAction(key, modifiers, action);
  return {
    key: key,
    modifiers: modifiers,
    action: action
  };
}

/**
 * actually calls the callback function
 *
 * if your callback function returns false this will use the jquery
 * convention - prevent default and stop propogation on the event
 */
function fireCallback(callback, e, combo, sequence) {
  try {
    var _designer$currentSele, _designer$currentSele2, _node$componentMeta, _node$componentMeta2;
    var editor = globalContext.get(Editor);
    var designer = editor.get('designer');
    var node = designer === null || designer === void 0 ? void 0 : (_designer$currentSele = designer.currentSelection) === null || _designer$currentSele === void 0 ? void 0 : (_designer$currentSele2 = _designer$currentSele.getNodes()) === null || _designer$currentSele2 === void 0 ? void 0 : _designer$currentSele2[0];
    var npm = node === null || node === void 0 ? void 0 : (_node$componentMeta = node.componentMeta) === null || _node$componentMeta === void 0 ? void 0 : _node$componentMeta.npm;
    var selected = [npm === null || npm === void 0 ? void 0 : npm["package"], npm === null || npm === void 0 ? void 0 : npm.componentName].filter(function (item) {
      return !!item;
    }).join('-') || (node === null || node === void 0 ? void 0 : (_node$componentMeta2 = node.componentMeta) === null || _node$componentMeta2 === void 0 ? void 0 : _node$componentMeta2.componentName) || '';
    if (callback(e, combo) === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    editor === null || editor === void 0 ? void 0 : editor.emit('hotkey.callback.call', {
      callback: callback,
      e: e,
      combo: combo,
      sequence: sequence,
      selected: selected
    });
  } catch (err) {
    console.error(err.message);
  }
}
export var Hotkey = /*#__PURE__*/function () {
  function Hotkey() {
    this.callBacks = {};
    this.directMap = {};
    this.sequenceLevels = {};
    this.resetTimer = 0;
    this.ignoreNextKeyup = false;
    this.ignoreNextKeypress = false;
    this.nextExpectedAction = false;
  }
  var _proto = Hotkey.prototype;
  _proto.mount = function mount(window) {
    var document = window.document;
    var handleKeyEvent = this.handleKeyEvent.bind(this);
    document.addEventListener('keypress', handleKeyEvent, false);
    document.addEventListener('keydown', handleKeyEvent, false);
    document.addEventListener('keyup', handleKeyEvent, false);
    return function () {
      document.removeEventListener('keypress', handleKeyEvent, false);
      document.removeEventListener('keydown', handleKeyEvent, false);
      document.removeEventListener('keyup', handleKeyEvent, false);
    };
  };
  _proto.bind = function bind(combos, callback, action) {
    this.bindMultiple(Array.isArray(combos) ? combos : [combos], callback, action);
    return this;
  };
  _proto.unbind = function unbind(combos, callback, action) {
    var _this = this;
    var combinations = Array.isArray(combos) ? combos : [combos];
    combinations.forEach(function (combination) {
      var info = getKeyInfo(combination, action);
      var key = info.key,
        modifiers = info.modifiers;
      var idx = _this.callBacks[key].findIndex(function (info) {
        return isEqual(info.modifiers, modifiers) && info.callback === callback;
      });
      if (idx !== -1) {
        _this.callBacks[key].splice(idx, 1);
      }
    });
  }

  /**
   * resets all sequence counters except for the ones passed in
   */;
  _proto.resetSequences = function resetSequences(doNotReset) {
    // doNotReset = doNotReset || {};
    var activeSequences = false;
    var key = '';
    for (key in this.sequenceLevels) {
      if (doNotReset && doNotReset[key]) {
        activeSequences = true;
      } else {
        this.sequenceLevels[key] = 0;
      }
    }
    if (!activeSequences) {
      this.nextExpectedAction = false;
    }
  }

  /**
   * finds all callbacks that match based on the keycode, modifiers,
   * and action
   */;
  _proto.getMatches = function getMatches(character, modifiers, e, sequenceName, combination, level) {
    var i;
    var callback;
    var matches = [];
    var action = e.type;

    // if there are no events related to this keycode
    if (!this.callBacks[character]) {
      return [];
    }

    // if a modifier key is coming up on its own we should allow it
    if (action === 'keyup' && isModifier(character)) {
      modifiers = [character];
    }

    // loop through all callbacks for the key that was pressed
    // and see if any of them match
    for (i = 0; i < this.callBacks[character].length; ++i) {
      callback = this.callBacks[character][i];

      // if a sequence name is not specified, but this is a sequence at
      // the wrong level then move onto the next match
      if (!sequenceName && callback.seq && this.sequenceLevels[callback.seq] !== callback.level) {
        continue;
      }

      // if the action we are looking for doesn't match the action we got
      // then we should keep going
      if (action !== callback.action) {
        continue;
      }

      // if this is a keypress event and the meta key and control key
      // are not pressed that means that we need to only look at the
      // character, otherwise check the modifiers as well
      //
      // chrome will not fire a keypress if meta or control is down
      // safari will fire a keypress if meta or meta+shift is down
      // firefox will fire a keypress if meta or control is down
      if (isPressEvent(e) && !e.metaKey && !e.ctrlKey || modifiersMatch(modifiers, callback.modifiers)) {
        var deleteCombo = !sequenceName && callback.combo === combination;
        var deleteSequence = sequenceName && callback.seq === sequenceName && callback.level === level;
        if (deleteCombo || deleteSequence) {
          this.callBacks[character].splice(i, 1);
        }
        matches.push(callback);
      }
    }
    return matches;
  };
  _proto.handleKey = function handleKey(character, modifiers, e) {
    var callbacks = this.getMatches(character, modifiers, e);
    var i;
    var doNotReset = {};
    var maxLevel = 0;
    var processedSequenceCallback = false;

    // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
    for (i = 0; i < callbacks.length; ++i) {
      if (callbacks[i].seq) {
        maxLevel = Math.max(maxLevel, callbacks[i].level || 0);
      }
    }

    // loop through matching callbacks for this key event
    for (i = 0; i < callbacks.length; ++i) {
      // fire for all sequence callbacks
      // this is because if for example you have multiple sequences
      // bound such as "g i" and "g t" they both need to fire the
      // callback for matching g cause otherwise you can only ever
      // match the first one
      if (callbacks[i].seq) {
        // only fire callbacks for the maxLevel to prevent
        // subsequences from also firing
        //
        // for example 'a option b' should not cause 'option b' to fire
        // even though 'option b' is part of the other sequence
        //
        // any sequences that do not match here will be discarded
        // below by the resetSequences call
        if (callbacks[i].level !== maxLevel) {
          continue;
        }
        processedSequenceCallback = true;

        // keep a list of which sequences were matches for later
        doNotReset[callbacks[i].seq || ''] = 1;
        fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
        continue;
      }

      // if there were no sequence matches but we are still here
      // that means this is a regular match so we should fire that
      if (!processedSequenceCallback) {
        fireCallback(callbacks[i].callback, e, callbacks[i].combo);
      }
    }
    var ignoreThisKeypress = e.type === 'keypress' && this.ignoreNextKeypress;
    if (e.type === this.nextExpectedAction && !isModifier(character) && !ignoreThisKeypress) {
      this.resetSequences(doNotReset);
    }
    this.ignoreNextKeypress = processedSequenceCallback && e.type === 'keydown';
  };
  _proto.handleKeyEvent = function handleKeyEvent(e) {
    var character = characterFromEvent(e);

    // no character found then stop
    if (!character) {
      return;
    }

    // need to use === for the character check because the character can be 0
    if (e.type === 'keyup' && this.ignoreNextKeyup === character) {
      this.ignoreNextKeyup = false;
      return;
    }
    this.handleKey(character, eventModifiers(e), e);
  };
  _proto.resetSequenceTimer = function resetSequenceTimer() {
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
    }
    this.resetTimer = window.setTimeout(this.resetSequences, 1000);
  };
  _proto.bindSequence = function bindSequence(combo, keys, callback, action) {
    var _this2 = this;
    // const self: any = this;
    this.sequenceLevels[combo] = 0;
    var increaseSequence = function increaseSequence(nextAction) {
      return function () {
        _this2.nextExpectedAction = nextAction;
        ++_this2.sequenceLevels[combo];
        _this2.resetSequenceTimer();
      };
    };
    var callbackAndReset = function callbackAndReset(e) {
      fireCallback(callback, e, combo);
      if (action !== 'keyup') {
        _this2.ignoreNextKeyup = characterFromEvent(e);
      }
      setTimeout(_this2.resetSequences, 10);
    };
    for (var _i2 = 0; _i2 < keys.length; ++_i2) {
      var isFinal = _i2 + 1 === keys.length;
      var wrappedCallback = isFinal ? callbackAndReset : increaseSequence(action || getKeyInfo(keys[_i2 + 1]).action);
      this.bindSingle(keys[_i2], wrappedCallback, action, combo, _i2);
    }
  };
  _proto.bindSingle = function bindSingle(combination, callback, action, sequenceName, level) {
    // store a direct mapped reference for use with HotKey.trigger
    this.directMap[combination + ":" + action] = callback;

    // make sure multiple spaces in a row become a single space
    combination = combination.replace(/\s+/g, ' ');
    var sequence = combination.split(' ');

    // if this pattern is a sequence of keys then run through this method
    // to reprocess each pattern one key at a time
    if (sequence.length > 1) {
      this.bindSequence(combination, sequence, callback, action);
      return;
    }
    var info = getKeyInfo(combination, action);

    // make sure to initialize array if this is the first time
    // a callback is added for this key
    this.callBacks[info.key] = this.callBacks[info.key] || [];

    // remove an existing match if there is one
    this.getMatches(info.key, info.modifiers, {
      type: info.action
    }, sequenceName, combination, level);

    // add this call back to the array
    // if it is a sequence put it at the beginning
    // if not put it at the end
    //
    // this is important because the way these are processed expects
    // the sequence ones to come first
    this.callBacks[info.key][sequenceName ? 'unshift' : 'push']({
      callback: callback,
      modifiers: info.modifiers,
      action: info.action,
      seq: sequenceName,
      level: level,
      combo: combination
    });
  };
  _proto.bindMultiple = function bindMultiple(combinations, callback, action) {
    for (var _iterator = _createForOfIteratorHelperLoose(combinations), _step; !(_step = _iterator()).done;) {
      var item = _step.value;
      this.bindSingle(item, callback, action);
    }
  };
  return Hotkey;
}();
export var hotkey = new Hotkey();
hotkey.mount(window);