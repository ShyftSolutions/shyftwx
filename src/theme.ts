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
            main: '#F76707',
            dark: '#868e96',
            contrastText: '#212529'
        }
    },
    overrides: {
        MuiTypography: {
            body2: {
                fontWeight: 500,
                fontSize: 16
            },
            button: {
                color: '#FFFFFF',
                fontWeight: 800
            }
        },
        MuiListItem: {
            root: {
                '&$selected': {
                    backgroundColor: '#329af0',
                    '&:hover': {
                        backgroundColor: '#329af0'
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
                color: '#329af0',
                minWidth: 30
            }
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: '#F76707',
                color: '#f8f9fa',
                fontSize: 16
            }
        }
    },

    spacing: 8
});

const options = {
    disableAlign: true,
    factor: 5
};

theme = responsiveFontSizes(theme, options);
export default theme;
