import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextControlProps } from '../types';
import { generateUniqueId, mergeValidates } from '../methods';
import { Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/system';
import FormLabel from '@mui/material/FormLabel';

const StyledInputLabel = styled(InputLabel)`
  .MuiFormLabel-asterisk {
    color: red;
  }
`;
const StyledFormLabel = styled(FormLabel)`
  .MuiFormLabel-asterisk {
    color: red;
  }
`;

export function PasswordControl(props: TextControlProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const uniqueId = generateUniqueId(props.name);
  const validates = mergeValidates(props.validates);

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={validates}
      render={({ field }) => (
        <FormControl
          variant={props.variant || 'outlined'}
          fullWidth
          className={props.className}
          required={Boolean(validates.required)}
          error={Boolean(props.errors)}
          size={props.size || 'small'}
        >
          {props.fieldset ? (
            <StyledInputLabel htmlFor={uniqueId}>
              {props.label}
            </StyledInputLabel>
          ) : (
            <StyledFormLabel className="mb-1" htmlFor={uniqueId}>
              {props.label}
            </StyledFormLabel>
          )}
          <OutlinedInput
            {...field}
            id={uniqueId}
            type={showPassword ? 'text' : 'password'}
            placeholder={props.placeholder}
            sx={props.style}
            defaultValue={props.defaultValue}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size={props.size || 'small'}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={props.fieldset ? props.label : undefined}
          />
          <FormHelperText>{props.errors?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default PasswordControl;
