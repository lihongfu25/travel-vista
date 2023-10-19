import { Theme, makeStyles } from '@mui/material/styles';
export const useStyles = makeStyles((theme: Theme) => ({
  primaryText: {
    color: theme.palette.primary.main,
  },
  secondaryText: {
    color: theme.palette.secondary.main,
  },
}));
