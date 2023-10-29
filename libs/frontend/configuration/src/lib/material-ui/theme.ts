import { createTheme } from '@mui/material/styles';
import { buttonTheme } from './custom-theme/button-theme';
import { outlinedInputTheme } from './custom-theme/outlined-input-theme';
import { paginationTheme } from './custom-theme/pagination-theme';
import { tableCellTheme } from './custom-theme/table-cell-theme';
import { formControlTheme } from './custom-theme/form-control-theme';
import { inputLabelTheme } from './custom-theme/input-label-theme';
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
    MuiOutlinedInput: outlinedInputTheme,
    MuiPagination: paginationTheme,
    MuiTableCell: tableCellTheme,
    MuiFormControl: formControlTheme,
    MuiInputLabel: inputLabelTheme,
  },
  palette: {
    primary: {
      main: '#1C4456',
    },
    secondary: {
      main: '#424242',
    },
    error: {
      main: '#f44336',
    },
  },
});
