"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ShyftModel = void 0;

var _core = require("@material-ui/core");

var _GroupedButtons = _interopRequireDefault(require("./GroupedButtons"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShyftModel = function ShyftModel(_ref) {
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
  }, "Model")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_GroupedButtons.default, {
    defaultSettings: defaultSettings.buttonLabels
  }))));
};

exports.ShyftModel = ShyftModel;
var _default = ShyftModel;
exports.default = _default;