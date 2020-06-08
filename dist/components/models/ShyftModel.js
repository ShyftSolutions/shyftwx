"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ShyftModel = void 0;

var _core = require("@material-ui/core");

var _GroupedButtons = _interopRequireDefault(require("../buttons/GroupedButtons"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a Material UI Grid Item for a Model and its button group
 * 
 * @param {Array[String]} options
 */
var ShyftModel = function ShyftModel(_ref) {
  var options = _ref.options;
  console.log(options);
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
    options: options
  }))));
};

exports.ShyftModel = ShyftModel;
var _default = ShyftModel;
exports.default = _default;