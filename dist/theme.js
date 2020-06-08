"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _blue = _interopRequireDefault(require("@material-ui/core/colors/blue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _core.createMuiTheme)({
  palette: {
    primary: {
      light: '#72c3fc',
      main: '#329af0',
      dark: '#1c7cd6',
      contrastText: '#f8f9fa',
      darkText: '#474545'
    },
    secondary: {
      light: '#e9ecef',
      main: '#ff922b',
      dark: '#f76707',
      contrastText: '#f8f9fa'
    },
    selected: {
      text: '#868e96'
    }
  },
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": {
          margin: 10,
          backgroundColor: '#72c3fc',
          '&:hover': {
            backgroundColor: '#72c3fc'
          }
        }
      }
    },
    MuiListItemIcon: {
      root: {
        color: '#000000'
      }
    }
  },
  spacing: 8
});

exports.default = _default;