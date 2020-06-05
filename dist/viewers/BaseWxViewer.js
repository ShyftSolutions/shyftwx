"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BaseWxViewer = void 0;

var _core = require("@material-ui/core");

var _leaflet = require("leaflet");

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

require("leaflet/dist/leaflet.css");

var _SimpleSelect = _interopRequireDefault(require("components/dropdown/SimpleSelect"));

var _Slider = _interopRequireDefault(require("components/time/Slider"));

var _TimeControl = _interopRequireDefault(require("components/time/TimeControl"));

var _ProductMenu = _interopRequireDefault(require("components/products/ProductMenu"));

var _ShyftModel = _interopRequireDefault(require("components/buttons/ShyftModel"));

var _RegionSelector = _interopRequireDefault(require("components/regions/RegionSelector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      height: '70vh',
      width: '70vw'
    },
    paddingMiddle: {
      marginLeft: 15,
      marginBottom: 20,
      marginTop: 15
    }
  };
});

var BaseWxViewer = function BaseWxViewer(_ref) {
  var defaultSettings = _ref.defaultSettings,
      layers = _ref.layers;
  var classes = useStyles();
  var bounds = (0, _leaflet.latLngBounds)(defaultSettings.viewerKnobs.swBounds, defaultSettings.viewerKnobs.neBounds);
  console.log(defaultSettings.modelButtonKnobs);
  console.log(defaultSettings.regionButtonKnobs);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "flex-end",
    alignItems: "flex-start",
    spacing: 3
  }, /*#__PURE__*/_react.default.createElement(_ShyftModel.default, {
    defaultSettings: defaultSettings.modelButtonKnobs
  }), /*#__PURE__*/_react.default.createElement(_RegionSelector.default, {
    defaultSettings: defaultSettings.regionButtonKnobs
  }), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6"
  }, "Model Run")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_SimpleSelect.default, {
    defaultSettings: defaultSettings.selectKnobs
  }))))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    className: classes.paddingMiddle,
    direction: "row",
    alignContent: "center",
    justify: "center",
    alignItems: "flex-start",
    spacing: 3
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6"
  }, "Products")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_ProductMenu.default, {
    defaultCategories: defaultSettings.productsKnobs
  })))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 9
  }, /*#__PURE__*/_react.default.createElement(_reactLeaflet.Map, {
    zoom: 10,
    bounds: bounds,
    className: classes.root,
    dragging: false,
    zoomControl: false,
    scrollWheelZoom: false
  }, /*#__PURE__*/_react.default.createElement(_reactLeaflet.ImageOverlay, {
    url: 'https://wxchange-images.s3.us-east-2.amazonaws.com/GFS_2020-05-27T06_Temperature_US_850hPa_01.png.PNG',
    bounds: bounds,
    opacity: 0.5
  }), /*#__PURE__*/_react.default.createElement(_reactLeaflet.TileLayer, {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
  })))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "flex-end",
    alignItems: "center",
    spacing: 0
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 2
  }, /*#__PURE__*/_react.default.createElement(_TimeControl.default, null)), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement(_Slider.default, {
    defaultSettings: defaultSettings.sliderKnobs
  }))));
};

exports.BaseWxViewer = BaseWxViewer;
var _default = BaseWxViewer;
exports.default = _default;