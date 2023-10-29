import { OverridesStyleRules } from '@mui/material/styles/overrides';

export const paginationTheme: OverridesStyleRules = {
  variants: [
    {
      props: { color: 'primary' },
      style: {
        '& .MuiPaginationItem-page.Mui-selected': {
          backgroundColor: 'rgb(28, 68, 86)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgb(28, 68, 86, 0.85)',
          },
        },
      },
    },
  ],
};
