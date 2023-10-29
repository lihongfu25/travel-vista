import { OverridesStyleRules } from '@mui/material/styles/overrides';

export const inputLabelTheme: OverridesStyleRules = {
  variants: [
    {
      props: { size: 'medium' },
      style: {
        '&:not(.MuiInputLabel-shrink)': {
          transform: 'translate(1rem, 0.875rem) scale(1)',
        },
      },
    },
  ],
};
