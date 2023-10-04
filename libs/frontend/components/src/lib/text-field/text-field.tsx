import MuiTextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Controller } from 'react-hook-form';
import { TextControlProps } from '../types';
/* eslint-disable-next-line */

const StyledTextField = styled(MuiTextField)`
  .css-wgai2y-MuiFormLabel-asterisk {
    color: red;
  }
`;

export function TextField(props: TextControlProps) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.validates}
      render={({ field }) => (
        <StyledTextField
          {...field}
          fullWidth
          id={props.id}
          className={props.className}
          label={props.label}
          placeholder={props.placeholder}
          type={props.type || 'text'}
          sx={props.style}
          error={Boolean(props.errors)}
          variant={props.variant || 'outlined'}
          defaultValue={props.defaultValue}
          helperText={props.errors ? props.errors.message : ''}
          size="small"
          required={Boolean(props.validates.required)}
        />
      )}
    />
  );
}

export default TextField;
