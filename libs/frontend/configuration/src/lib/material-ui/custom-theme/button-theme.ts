import { OverridesStyleRules } from '@mui/material/styles/overrides';

export const buttonTheme: OverridesStyleRules = {
  styleOverrides: {
    root: {
      borderRadius: '8px',
      '&.Mui-disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'auto',
      },
    },
  },
  variants: [
    {
      props: { variant: 'outlined' },
      style: {
        '&': {
          overflow: 'hidden',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          width: 0,
          height: '100%',
          transform: 'skew(20deg)',
          transition: 'all 0.55s',
          zIndex: -1,
        },
      },
    },
    {
      props: { size: 'small' },
      style: {
        padding: '8px 12px',
      },
    },
    {
      props: { size: 'medium' },
      style: {
        fontSize: '1rem',
        padding: '12px 16px',
      },
    },
    {
      props: { size: 'large' },
      style: {
        fontSize: '1.5rem',
        padding: '16px 24px',
      },
    },
    {
      props: { variant: 'contained', color: 'primary' },
      style: {
        '&:disabled': {
          backgroundColor: 'rgba(28, 68, 86, 0.75)',
          color: 'white',
        },
      },
    },
    {
      props: { variant: 'outlined', color: 'primary' },
      style: {
        '&': {
          borderColor: 'rgb(28, 68, 86)',
        },
        '&::before': {
          backgroundColor: 'rgb(28, 68, 86)',
        },
        '&:hover': {
          color: 'white',
          '&::before': {
            width: '200%',
          },
        },
        '&:disabled': {
          borderColor: 'rgba(28, 68, 86, 0.5)',
          color: 'rgba(28, 68, 86, 0.75)',
        },
      },
    },
  ],
};
