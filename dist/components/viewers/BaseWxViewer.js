"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BaseWxViewer = void 0;

var _core = require("@material-ui/core");

var _leaflet = require("leaflet");

require("leaflet/dist/leaflet.css");

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

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
  var layers = _ref.layers,
      neBounds = _ref.neBounds,
      swBounds = _ref.swBounds;
  var classes = useStyles();
  var bounds = (0, _leaflet.latLngBounds)(swBounds, neBounds);
  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
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
  })));
};

exports.BaseWxViewer = BaseWxViewer;
var _default = BaseWxViewer;
exports.default = _default;