"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = exports.TimeControl = exports.default = void 0;

var _TimeControl2 = _interopRequireDefault(require("components/time/TimeControl.jsx"));

var _Slider2 = _interopRequireDefault(require("components/time/Slider.jsx"));

var _addonKnobs = require("@storybook/addon-knobs");

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _theme = _interopRequireDefault(require("theme.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Time',
  decoration: [_addonKnobs.withKnobs]
};
exports.default = _default;

var TimeControl = function TimeControl() {
  return /*#__PURE__*/_react.default.createElement(_core.MuiThemeProvider, {
    theme: _theme.default
  }, /*#__PURE__*/_react.default.createElement(_TimeControl2.default, null));
};

exports.TimeControl = TimeControl;
var defaultSliderKnobs = {
  maxValue: 12,
  stepValue: 1,
  marks: [{
    value: 0,
    label: '0H'
  }, {
    value: 1,
    label: '1H'
  }, {
    value: 2,
    label: '2H'
  }, {
    value: 3,
    label: '3H'
  }, {
    value: 4,
    label: '4H'
  }, {
    value: 5,
    label: '5H'
  }, {
    value: 6,
    label: '6H'
  }, {
    value: 7,
    label: '7H'
  }, {
    value: 8,
    label: '8H'
  }, {
    value: 9,
    label: '9H'
  }, {
    value: 10,
    label: '10H'
  }, {
    value: 11,
    label: '11H'
  }, {
    value: 12,
    label: '12H'
  }]
};

var Slider = function Slider() {
  return /*#__PURE__*/_react.default.createElement(_core.MuiThemeProvider, {
    theme: _theme.default
  }, /*#__PURE__*/_react.default.createElement(_Slider2.default, {
    defaultSettings: (0, _addonKnobs.object)('Settings', defaultSliderKnobs)
  }));
  ;
};

exports.Slider = Slider;