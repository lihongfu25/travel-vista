import { Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';
import { mergeValidates } from '../methods';
import { ControlProps } from '../types';

const StyledFormControlLabel = styled(FormControlLabel)(({ color, theme }) => ({
  color: theme.palette[color as keyof typeof theme.palette].main,
  margin: 0,
}));

const StyledCheckbox = styled(Checkbox)(({ color, theme }) => ({
  color: theme.palette[color as keyof typeof theme.palette].main,
  padding: 0,
  marginRight: '0.75rem',
}));

export function CheckboxControl(props: ControlProps) {
  const validates = mergeValidates(props.validates);
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={validates}
      render={({ field }) => (
        <StyledFormControlLabel
          {...field}
          control={<StyledCheckbox color={props.color} />}
          label={props.label}
          color={props.color}
          className={props.className}
        />
      )}
    />
  );
}

export default React.memo(CheckboxControl);
