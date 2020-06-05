"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimeControl;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _BackButton = _interopRequireDefault(require("./BackButton"));

var _ForwardButton = _interopRequireDefault(require("./ForwardButton"));

var _StartStopButton = _interopRequireDefault(require("./StartStopButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TimeControl() {
  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null)), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_StartStopButton.default, null)), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_ForwardButton.default, null)));
}