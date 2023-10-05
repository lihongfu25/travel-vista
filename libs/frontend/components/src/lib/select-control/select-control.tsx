import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';
import { SelectControlProps } from '../types';
const StyledFormLabel = styled(FormLabel)`
  .MuiFormLabel-asterisk {
    color: red;
  }
`;

const StyledSelectField = styled(MuiSelect)``;

export function SelectControl(props: SelectControlProps) {
  const [value, setValue] = React.useState(props.defaultValue || '');

  const handleChange = (event: SelectChangeEvent<any>) => {
    setValue(event.target.value);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.validates}
      render={({ field }) => (
        <FormControl
          fullWidth
          size="small"
          className={props.className}
          error={Boolean(props.errors)}
          required={Boolean(props.validates.required)}
        >
          <StyledFormLabel className="mb-1">{props.label}</StyledFormLabel>
          <StyledSelectField
            {...field}
            id={props.id}
            value={value}
            onChange={(e) => {
              handleChange(e);
              field.onChange(e.target.value);
            }}
          >
            {props.options?.map((option, i) => (
              <MenuItem key={i} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </StyledSelectField>
          <FormHelperText>{props.errors?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default React.memo(SelectControl);
