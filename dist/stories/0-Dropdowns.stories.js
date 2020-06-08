"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleSelect = exports.default = void 0;

var _SimpleSelect2 = _interopRequireDefault(require("components/dropdown/SimpleSelect"));

var _react = require("@storybook/addon-knobs/react");

var _react2 = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _theme = _interopRequireDefault(require("theme.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _SimpleSelect2.default,
  title: 'Dropdowns',
  decorators: [_react.withKnobs]
};
exports.default = _default;
var defaultOptions = ["2020-05-27T 02:00:00Z", "2020-05-27T 06:00:00Z", "2020-05-27T 11:00:00Z", "2020-05-27T 12:00:00Z"];

var SimpleSelect = function SimpleSelect() {
  return /*#__PURE__*/_react2.default.createElement(_core.MuiThemeProvider, {
    theme: _theme.default
  }, /*#__PURE__*/_react2.default.createElement(_SimpleSelect2.default, {
    options: (0, _react.object)('Select Options', defaultOptions)
  }));
};

exports.SimpleSelect = SimpleSelect;