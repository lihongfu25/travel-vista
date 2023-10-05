import InputLabel from '@mui/material/InputLabel';
import MuiTextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';
import { generateUniqueId } from '../methods';
import { TextControlProps } from '../types';
const StyledInputLabel = styled(InputLabel)`
  .MuiFormLabel-asterisk {
    color: red;
  }
`;
const StyledTextField = styled(MuiTextField)``;

export function TextControl(props: TextControlProps) {
  const uniqueId = generateUniqueId(props.name);
  return (
    <div className="">
      <StyledInputLabel
        className="mb-1"
        htmlFor={uniqueId}
        required={Boolean(props.validates.required)}
      >
        {props.label}
      </StyledInputLabel>
      <Controller
        name={props.name}
        control={props.control}
        rules={props.validates}
        render={({ field }) => (
          <StyledTextField
            {...field}
            fullWidth
            id={props.id || uniqueId}
            className={props.className}
            placeholder={props.placeholder}
            sx={props.style}
            error={Boolean(props.errors)}
            variant={props.variant || 'outlined'}
            defaultValue={props.defaultValue}
            helperText={props.errors ? props.errors.message : ''}
            size="small"
          />
        )}
      />
    </div>
  );
}

export default React.memo(TextControl);
