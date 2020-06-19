import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

let theme = createMuiTheme({
    palette: {
        primary: {
            light: '#72c3fc',
            main: '#329af0',
            dark: '#1c7cd6',
            contrastText: '#f8f9fa'
        },
        secondary: {
            light: '#ffffff',
            main: '#e9ecef',
            dark: '#868e96',
            contrastText: '#474545'
        }
    },
    overrides: {
        MuiTypography: {
            body2: {
                fontWeight: 500,
                fontSize: 16
            }
        },
        MuiListItem: {
            root: {
                '&$selected': {
                    backgroundColor: '#868e96',
                    '&:hover': {
                        backgroundColor: '#868e96'
                    },
                    color: '#f8f9fa'
                },
                paddingTop: '6px',
                paddingBottom: '6px'
            },
            gutters: {
                paddingLeft: '6px',
                paddingRight: '6px'
            }
        },
        MuiListItemIcon: {
            root: {
                color: '#000000'
            }
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: '#329af0',
                color: '#f8f9fa',
                fontSize: 16
            }
        },
    },

    spacing: 8
});

const options = {
    disableAlign: true,
    factor: 5
};

theme = responsiveFontSizes(theme, options);
export default theme;
