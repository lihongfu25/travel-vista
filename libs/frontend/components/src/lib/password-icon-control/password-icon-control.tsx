import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';
import { generateUniqueId, mergeValidates } from '../methods';
import { TextIconControlProps } from '../types';

const StyledOutlinedInput = styled(OutlinedInput)(({ color, theme }) => ({
  color: theme.palette[color as keyof typeof theme.palette].main,
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette[color as keyof typeof theme.palette].main,
  },
}));

export function PasswordIconControl(props: TextIconControlProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const uniqueId = generateUniqueId(props.name ?? props.label);
  const validates = mergeValidates(props.validates);
  const Icon = props.icon;
  if (props.control && props.name)
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
            disabled={props.disabled}
          >
            <StyledOutlinedInput
              {...field}
              id={uniqueId}
              placeholder={props.label}
              type={showPassword ? 'text' : 'password'}
              sx={{
                ...props.style,
              }}
              defaultValue={props.defaultValue}
              label={props.fieldset ? props.label : undefined}
              color={props.color}
              startAdornment={
                <InputAdornment position="start">
                  <Icon color={props.errors ? 'error' : props.color} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size={props.size || 'small'}
                  >
                    {showPassword ? (
                      <VisibilityOff
                        color={props.errors ? 'error' : props.color}
                      />
                    ) : (
                      <Visibility
                        color={props.errors ? 'error' : props.color}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText
              sx={{
                fontSize: '12px',
              }}
            >
              {props.errors?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
    );
  else
    return (
      <FormControl
        variant={props.variant || 'outlined'}
        fullWidth
        className={props.className}
        required={Boolean(validates.required)}
        error={Boolean(props.errors)}
        size={props.size || 'small'}
        disabled={props.disabled}
      >
        <StyledOutlinedInput
          id={uniqueId}
          placeholder={props.label}
          type={showPassword ? 'text' : 'password'}
          sx={{
            ...props.style,
          }}
          defaultValue={props.defaultValue}
          label={props.fieldset ? props.label : undefined}
          color={props.color}
          startAdornment={
            <InputAdornment position="start">
              <Icon color={props.errors ? 'error' : props.color} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size={props.size || 'small'}
              >
                {showPassword ? (
                  <VisibilityOff color={props.errors ? 'error' : props.color} />
                ) : (
                  <Visibility color={props.errors ? 'error' : props.color} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText
          sx={{
            fontSize: '12px',
          }}
        >
          {props.errors?.message}
        </FormHelperText>
      </FormControl>
    );
}

export default React.memo(PasswordIconControl);
