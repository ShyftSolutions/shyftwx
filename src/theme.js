import { createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

export default createMuiTheme({
        palette: {
          primary: {
              light: '#1c7cd6',
              main: '#329af0',
              dark: '#1c7cd6',
              contrastText: '#f8f9fa',
          },
          secondary: {
            main: '#ff922b',
            dark: '#f76707',
            contrastText: '#212529'
          },
        },
});