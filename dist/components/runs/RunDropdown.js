"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RunDropdown = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _SimpleSelect = _interopRequireDefault(require("components/dropdown/SimpleSelect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RunDropdown = function RunDropdown(_ref) {
  var options = _ref.options;
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
  }, "Model Run")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_SimpleSelect.default, {
    options: options
  }))));
};

exports.RunDropdown = RunDropdown;