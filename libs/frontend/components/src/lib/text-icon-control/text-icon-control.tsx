import { InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { Controller } from 'react-hook-form';
import { generateUniqueId, mergeValidates } from '../methods';
import { TextIconControlProps } from '../types';
import React from 'react';

const StyledOutlinedInput = styled(OutlinedInput)(({ color, theme }) => ({
  color: theme.palette[color as keyof typeof theme.palette].main,
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette[color as keyof typeof theme.palette].main,
  },
}));

export function TextIconControl(props: TextIconControlProps) {
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
          >
            <StyledOutlinedInput
              {...field}
              id={uniqueId}
              placeholder={props.label}
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
      >
        <StyledOutlinedInput
          id={uniqueId}
          placeholder={props.label}
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

export default React.memo(TextIconControl);
