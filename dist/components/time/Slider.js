"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DiscreteSlider = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Slider = _interopRequireDefault(require("@material-ui/core/Slider"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      width: 600,
      color: theme.palette.primary.dark,
      height: 20,
      margin: 0
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: theme.palette.secondary.contrastText,
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit'
      }
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)'
    },
    rail: {
      height: 5,
      borderRadius: 4
    },
    markLabelActive: {
      fontWeight: 700,
      padding: 12
    },
    markLabel: {
      fontWeight: 500,
      padding: 12
    },
    mark: {
      backgroundColor: theme.palette.primary.dark,
      height: 5
    }
  };
});

function ValueLabelComponent(props) {
  var children = props.children,
      value = props.value;
  var LightTooltip = (0, _styles.withStyles)(function (theme) {
    return {
      tooltip: {
        backgroundColor: theme.palette.primary.darkText,
        color: theme.palette.secondary.contrastText,
        boxShadow: theme.shadows[1],
        fontSize: 16
      }
    };
  })(_Tooltip.default);
  return /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(LightTooltip, {
    placement: "top",
    title: value + ' + Model Run'
  }, children));
}

var DiscreteSlider = function DiscreteSlider(_ref) {
  var settings = _ref.settings;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Slider.default, {
    classes: classes,
    valueLabelDisplay: "auto",
    "aria-label": "pretto slider",
    track: false,
    step: settings.stepValue,
    marks: settings.marks,
    defaultValue: settings.marks[0].value,
    max: settings.maxValue,
    ValueLabelComponent: ValueLabelComponent
  }));
};

exports.DiscreteSlider = DiscreteSlider;
var _default = DiscreteSlider;
exports.default = _default;