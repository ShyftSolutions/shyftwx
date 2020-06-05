"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BackButton;

var _react = _interopRequireDefault(require("react"));

var _NavigateBefore = _interopRequireDefault(require("@material-ui/icons/NavigateBefore"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      maxWidth: '35px',
      maxHeight: '30px',
      minWidth: '35px',
      minHeight: '30px',
      variant: 'contained',
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[3],
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      },
      ariaLabel: "back"
    },
    icon: {
      color: theme.palette.secondary.contrastText
    }
  };
});

function BackButton() {
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_NavigateBefore.default, {
    className: classes.icon
  }));
}