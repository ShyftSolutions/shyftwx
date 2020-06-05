"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicWxViewer = exports.StaticWxViewer = exports.WxViewer = exports.BaseWxViewer = exports.default = void 0;

var _addonKnobs = require("@storybook/addon-knobs");

var _BaseWxViewer2 = _interopRequireDefault(require("components/viewers/BaseWxViewer"));

var _DynamicWxViewer2 = _interopRequireDefault(require("components/viewers/DynamicWxViewer"));

var _StaticWxViewer2 = _interopRequireDefault(require("components/viewers/StaticWxViewer"));

var _WxViewer2 = _interopRequireDefault(require("components/viewers/WxViewer"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _theme = _interopRequireDefault(require("theme.js"));

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Viewer',
  decorators: [_addonKnobs.withKnobs]
};
exports.default = _default;
var defaultViewerKnobs = {
  viewerKnobs: {
    swBounds: [23.81, -65.69],
    neBounds: [49.38, -129.17]
  },
  modelButtonKnobs: {
    label: "Model",
    buttonLabels: [{
      name: "TQI Model"
    }, {
      name: "GFS"
    }, {
      name: "HRRR"
    }]
  },
  sliderKnobs: {
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
  },
  regionButtonKnobs: {
    label: "Region",
    buttonLabels: [{
      name: "TQI Model"
    }, {
      name: "CONUS"
    }, {
      name: "Southeast"
    }]
  },
  selectKnobs: [{
    name: "2020-05-27T 12:00:00Z"
  }, {
    name: "2020-05-27T 06:00:00Z"
  }, {
    name: "2020-05-27T 11:00:00Z"
  }, {
    name: "2020-05-27T 02:00:00Z"
  }],
  productsKnobs: [{
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
    }]
  }, {
    name: '700MB',
    open: false,
    products: [{
      name: 'Wind and Temperature',
      icon: _freeSolidSvgIcons.faWind
    }]
  }]
};

var BaseWxViewer = function BaseWxViewer() {
  return /*#__PURE__*/_react.default.createElement(_core.MuiThemeProvider, {
    theme: _theme.default
  }, /*#__PURE__*/_react.default.createElement(_BaseWxViewer2.default, {
    defaultSettings: (0, _addonKnobs.object)('Settings', defaultViewerKnobs)
  }));
};

exports.BaseWxViewer = BaseWxViewer;

var WxViewer = function WxViewer() {
  return /*#__PURE__*/_react.default.createElement(_WxViewer2.default, null);
};

exports.WxViewer = WxViewer;

var StaticWxViewer = function StaticWxViewer() {
  return /*#__PURE__*/_react.default.createElement(_StaticWxViewer2.default, null);
};

exports.StaticWxViewer = StaticWxViewer;

var DynamicWxViewer = function DynamicWxViewer() {
  return /*#__PURE__*/_react.default.createElement(_DynamicWxViewer2.default, null);
};

exports.DynamicWxViewer = DynamicWxViewer;