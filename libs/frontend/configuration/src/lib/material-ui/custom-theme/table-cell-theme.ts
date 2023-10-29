import { grey } from '@mui/material/colors';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

export const tableCellTheme: OverridesStyleRules = {
  styleOverrides: {
    root: {
      fontSize: '1rem',
    },
    head: {
      backgroundColor: grey[100],
    },
    body: {
      paddingTop: '8px',
      paddingBottom: '8px',
    },
  },
};
