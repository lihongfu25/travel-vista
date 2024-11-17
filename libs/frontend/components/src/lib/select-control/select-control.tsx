import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import { styled } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';
import { SelectControlProps } from '../types';
import { mergeValidates } from '../methods';

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

const StyledSelectField = styled(MuiSelect)``;

export function SelectControl(props: SelectControlProps) {
  const validates = mergeValidates(props.validates);
  if (props.control && props.name)
    return (
      <Controller
        name={props.name}
        control={props.control}
        rules={validates}
        render={({ field }) => (
          <FormControl
            fullWidth
            size={props.size || 'small'}
            className={props.className}
            error={Boolean(props.errors)}
            required={Boolean(validates.required)}
            disabled={props.disabled}
          >
            {props.fieldset ? (
              <StyledInputLabel className="mb-1">
                {props.label}
              </StyledInputLabel>
            ) : (
              <StyledFormLabel className="mb-1">{props.label}</StyledFormLabel>
            )}
            <StyledSelectField
              {...field}
              id={props.id}
              label={props.fieldset ? props.label : undefined}
            >
              {props.options?.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledSelectField>
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
        fullWidth
        size={props.size || 'small'}
        className={props.className}
        error={Boolean(props.errors)}
        required={Boolean(validates.required)}
      >
        {props.fieldset ? (
          <StyledInputLabel className="mb-1">{props.label}</StyledInputLabel>
        ) : (
          <StyledFormLabel className="mb-1">{props.label}</StyledFormLabel>
        )}
        <StyledSelectField
          id={props.id}
          label={props.fieldset ? props.label : undefined}
        >
          {props.options?.map((option, i) => (
            <MenuItem key={i} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelectField>
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

export default React.memo(SelectControl);
