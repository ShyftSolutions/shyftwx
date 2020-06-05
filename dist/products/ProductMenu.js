"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProductMenu = void 0;

var _react = _interopRequireDefault(require("react"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      width: '100%',
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1.5)
    },
    paper: {
      width: '95%',
      backgroundColor: theme.palette.primary.main
    },
    category: {
      color: theme.palette.primary.contrastText
    },
    nested: {
      paddingLeft: theme.spacing(4),
      color: theme.palette.primary.contrastText,
      width: '95%'
    },
    icon: {},
    selectedIcon: {
      color: theme.palette.selected.text
    }
  };
});

var ProductMenu = function ProductMenu(_ref) {
  var defaultCategories = _ref.defaultCategories,
      onCategoryClick = _ref.onCategoryClick;
  var classes = useStyles();

  var _React$useState = _react.default.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selectedProduct = _React$useState2[0],
      setSelectedProduct = _React$useState2[1];

  var _React$useState3 = _react.default.useState(defaultCategories || []),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      categories = _React$useState4[0],
      setCategories = _React$useState4[1];

  var handleClick = function handleClick(cat) {
    if (onCategoryClick) {
      onCategoryClick(cat);
    }

    var newCategories = categories.map(function (item, index) {
      if (item !== cat) {
        return item;
      }

      return _objectSpread(_objectSpread({}, item), {}, {
        open: !cat.open
      });
    });
    setCategories(newCategories);
  };

  var handleListItemClick = function handleListItemClick(event, product) {
    setSelectedProduct(product);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, categories.map(function (cat, index) {
    return /*#__PURE__*/_react.default.createElement(_core.List, {
      key: index
    }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
      className: classes.paper
    }, /*#__PURE__*/_react.default.createElement(_core.ListItem, {
      button: true,
      className: classes.category,
      onClick: function onClick() {
        return handleClick(cat);
      }
    }, /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
      disableTypography: true,
      primary: /*#__PURE__*/_react.default.createElement(_core.Typography, null, /*#__PURE__*/_react.default.createElement(_core.Box, {
        fontWeight: "fontWeightBold",
        m: 1,
        fontSize: 16
      }, cat.name))
    }), cat.open ? /*#__PURE__*/_react.default.createElement(_icons.ExpandLess, null) : /*#__PURE__*/_react.default.createElement(_icons.ExpandMore, null))), /*#__PURE__*/_react.default.createElement(_core.Collapse, {
      in: cat.open,
      timeout: "auto",
      unmountOnExit: true
    }, cat.products.map(function (product) {
      return /*#__PURE__*/_react.default.createElement(_core.ListItem, {
        button: true,
        className: classes.nested,
        selected: selectedProduct === cat.name + ' ' + product.name,
        onClick: function onClick(event) {
          return handleListItemClick(event, cat.name + ' ' + product.name);
        }
      }, /*#__PURE__*/_react.default.createElement(_core.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        className: selectedProduct === cat.name + ' ' + product.name ? classes.selectedIcon : classes.icon,
        icon: product.icon
      })), /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
        primary: product.name
      }));
    })));
  }));
};

exports.ProductMenu = ProductMenu;
var _default = ProductMenu;
exports.default = _default;