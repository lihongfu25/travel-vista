import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';
import { generateUniqueId } from '../methods';
import { TextControlProps } from '../types';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

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

export function TextControl(props: TextControlProps) {
  const uniqueId = generateUniqueId(props.name);
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.validates}
      render={({ field }) => (
        <FormControl
          variant={props.variant || 'outlined'}
          fullWidth
          className={props.className}
          required={Boolean(props.validates.required)}
          error={Boolean(props.errors)}
          size="small"
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
            placeholder={props.placeholder}
            sx={props.style}
            defaultValue={props.defaultValue}
            label={props.fieldset ? props.label : undefined}
          />
          <FormHelperText>{props.errors?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default React.memo(TextControl);
