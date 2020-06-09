import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
    palette: {
        primary: {
            light: '#72c3fc',
            main: '#329af0',
            dark: '#1c7cd6',
            contrastText: '#f8f9fa',
        },
        secondary: {
            light: '#e9ecef',
            main: '#ff922b',
            dark: '#868e96',
            contrastText: '#474545'
        },
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