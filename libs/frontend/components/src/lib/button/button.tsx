import MuiButton from '@mui/material/Button';
import React from 'react';
import { ButtonProps as MuiButtonProps } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
interface ButtonProps extends MuiButtonProps {
  children: any;
  loading?: boolean;
}

export function Button({ children, loading, ...props }: ButtonProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <MuiButton {...props} disabled={loading || props.disabled}>
        {children}
      </MuiButton>
      {loading && (
        <CircularProgress
          size={24}
          color={props.color}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
}

export default React.memo(Button);
