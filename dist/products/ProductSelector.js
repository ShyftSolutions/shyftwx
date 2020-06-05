"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductSelector = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _ProductMenu = _interopRequireDefault(require("./ProductMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductSelector = function ProductSelector(_ref) {
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
  }, "Products")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_ProductMenu.default, {
    defaultCategories: options,
    onCategoryClick: function onCategoryClick() {}
  }))));
};

exports.ProductSelector = ProductSelector;