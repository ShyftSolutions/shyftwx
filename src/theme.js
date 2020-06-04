import { createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

export default createMuiTheme({
    palette: {
        primary: {
            light: '#72c3fc',
            main: '#329af0',
            dark: '#1c7cd6',
            contrastText: '#000000',
            darkText: '#474545',
        },
        secondary: {
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
                    color: '#868e96',
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