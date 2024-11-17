import { OverridesStyleRules } from '@mui/material/styles/overrides';

export const formControlTheme: OverridesStyleRules = {
  variants: [
    {
      props: { size: 'medium' },
      style: {
        '& .MuiInputBase-input': {
          padding: '0.875rem 1rem',
        },
        '& .MuiInputBase-root.MuiInputBase-multiline': {
          padding: '0',
        },
      },
    },
  ],
};
