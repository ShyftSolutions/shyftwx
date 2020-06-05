"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RegionSelector = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

var _GroupedButtons = _interopRequireDefault(require("../buttons/GroupedButtons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegionSelector = function RegionSelector(_ref) {
  var defaultSettings = _ref.defaultSettings;
  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6"
  }, " Region")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_GroupedButtons.default, {
    defaultSettings: defaultSettings.regionButtonKnobs
  }))));
};

exports.RegionSelector = RegionSelector;
var _default = RegionSelector;
exports.default = _default;