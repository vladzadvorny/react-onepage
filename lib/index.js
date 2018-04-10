'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slider = require('./slider.js');

var _slider2 = _interopRequireDefault(_slider);

var _supportTouchDevice = require('./supportTouchDevice');

var _supportTouchDevice2 = _interopRequireDefault(_supportTouchDevice);

var _supportMouseAndKeyboard = require('./supportMouseAndKeyboard');

var _supportMouseAndKeyboard2 = _interopRequireDefault(_supportMouseAndKeyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _supportMouseAndKeyboard2.default)((0, _supportTouchDevice2.default)(_slider2.default));