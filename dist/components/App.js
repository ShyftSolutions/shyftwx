"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.App = void 0;

var _react = _interopRequireDefault(require("react"));

var _ShyftWx = _interopRequireDefault(require("./root/ShyftWx"));

var _BaseWxViewer = _interopRequireDefault(require("./viewers/BaseWxViewer"));

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var App = function App() {
  // TODO: change the defaultSettings to build everything off of index data
  return /*#__PURE__*/_react.default.createElement(_ShyftWx.default, {
    indexUrl: "https://wxchange-images.s3.us-east-2.amazonaws.com/index.json"
  }, /*#__PURE__*/_react.default.createElement(_BaseWxViewer.default, null));
};

exports.App = App;
var _default = App;
exports.default = _default;