"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShyftModel = exports.default = void 0;

var _ShyftModel2 = _interopRequireDefault(require("components/models/ShyftModel"));

var _react = _interopRequireDefault(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _theme = _interopRequireDefault(require("theme.js"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _ShyftModel2.default,
  title: 'Buttons',
  decorators: [_addonKnobs.withKnobs]
};
exports.default = _default;
var modelButtonKnobs = {
  label: "Model",
  buttonLabels: [{
    name: "TQI Model"
  }, {
    name: "GFS"
  }, {
    name: "HRRR"
  }]
};

var ShyftModel = function ShyftModel() {
  return /*#__PURE__*/_react.default.createElement(_core.MuiThemeProvider, {
    theme: _theme.default
  }, /*#__PURE__*/_react.default.createElement(_ShyftModel2.default, {
    defaultSettings: (0, _addonKnobs.object)('Settings', modelButtonKnobs)
  }));
};

exports.ShyftModel = ShyftModel;