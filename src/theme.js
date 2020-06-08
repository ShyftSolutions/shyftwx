import { createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

export default createMuiTheme({
    palette: {
        primary: {
            light: '#72c3fc',
            main: '#329af0',
            dark: '#1c7cd6',
            contrastText: '#f8f9fa',
            darkText: '#474545',
        },
        secondary: {
            light: '#e9ecef',
            main: '#ff922b',
            dark: '#f76707',
            contrastText: '#f8f9fa'
        },
        selected: {
            text: '#868e96',
        }
    },
    overrides: {
        MuiListItem: {
            root: {
                "&$selected": {
                    backgroundColor: '#E9ECEF',
                    '&:hover': {
                        backgroundColor: '#E9ECEF'
                    },
                    color: '#868e96'
                },
            },
        },
        MuiListItemIcon: {
            root: {
                color: '#000000',
            }
        }
    },
    spacing: 8
});