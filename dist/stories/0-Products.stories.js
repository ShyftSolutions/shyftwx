"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductMenu = exports.default = void 0;

var _ProductMenu2 = _interopRequireDefault(require("components/products/ProductMenu"));

var _addonKnobs = require("@storybook/addon-knobs");

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _theme = _interopRequireDefault(require("theme.js"));

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _ProductMenu2.default,
  title: 'Products',
  decoration: [_addonKnobs.withKnobs]
};
exports.default = _default;
var defaultCategories = [{
  name: 'Surface',
  open: true,
  products: [{
    name: 'Wind and Temperature',
    icon: _freeSolidSvgIcons.faWind
  }, {
    name: 'Relative Humidity',
    icon: _freeSolidSvgIcons.faPercent
  }]
}, {
  name: '850MB',
  open: false,
  products: [{
    name: 'Relative Humidity',
    icon: _freeSolidSvgIcons.faTint
  }, {
    name: 'Precipitation Type',
    icon: _freeSolidSvgIcons.faCloudShowersHeavy
  }]
}, {
  name: '700MB',
  open: false,
  products: [{
    name: 'Wind and Temperature',
    icon: _freeSolidSvgIcons.faWind
  }]
}];

var ProductMenu = function ProductMenu() {
  return /*#__PURE__*/_react.default.createElement(_core.MuiThemeProvider, {
    theme: _theme.default
  }, /*#__PURE__*/_react.default.createElement(_ProductMenu2.default, {
    defaultCategories: (0, _addonKnobs.object)('Product Categories', defaultCategories)
  }));
};

exports.ProductMenu = ProductMenu;