import { Controller } from 'react-hook-form';
import { SelectControlProps } from '../types';
import { styled } from '@mui/system';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import React from 'react';

const StyledSelectField = styled(MuiSelect)`
  .css-wgai2y-MuiFormLabel-asterisk {
    color: red;
  }
`;

export function SelectField(props: SelectControlProps) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.validates}
      render={({ field }) => (
        <FormControl fullWidth size="small">
          <InputLabel>{props.label}</InputLabel>
          <StyledSelectField
            {...field}
            id={props.id}
            value={age}
            label={props.label}
            className={props.className}
            // onChange={handleChange}
            renderValue={(value) => `  - ${value}`}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </StyledSelectField>
          <FormHelperText>Error</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default SelectField;
