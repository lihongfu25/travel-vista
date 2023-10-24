import { createTheme } from '@mui/material/styles';
import { buttonTheme } from './custom-theme/button-theme';
export const theme = createTheme({
  typography: {
    fontFamily: ['"M PLUS Rounded 1c"', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: buttonTheme,
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1C4456',
    },
    secondary: {
      main: '#FFC107',
    },
    error: {
      main: '#f44336',
    },
  },
});
