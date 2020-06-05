"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionSelector = exports.default = void 0;

var _RegionSelector2 = _interopRequireDefault(require("components/regions/RegionSelector"));

var _addonKnobs = require("@storybook/addon-knobs");

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _theme = _interopRequireDefault(require("theme.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _RegionSelector2.default,
  title: 'Regions',
  decoration: [_addonKnobs.withKnobs]
};
exports.default = _default;
var defaultOptions = {
  regionButtonKnobs: [{
    name: "TQI Model"
  }, {
    name: "CONUS"
  }, {
    name: "Southeast"
  }]
};

var RegionSelector = function RegionSelector() {
  return /*#__PURE__*/_react.default.createElement(_core.MuiThemeProvider, {
    theme: _theme.default
  }, /*#__PURE__*/_react.default.createElement(_RegionSelector2.default, {
    defaultSettings: (0, _addonKnobs.object)('Button Labels', defaultOptions)
  }));
};

exports.RegionSelector = RegionSelector;