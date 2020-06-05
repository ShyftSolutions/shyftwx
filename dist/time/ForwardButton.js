"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ForwardButton;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _NavigateNext = _interopRequireDefault(require("@material-ui/icons/NavigateNext"));

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
      ariaLabel: "forward"
    },
    icon: {
      color: theme.palette.secondary.contrastText
    }
  };
});

function ForwardButton() {
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_core.Button, {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_NavigateNext.default, {
    className: classes.icon
  }));
}