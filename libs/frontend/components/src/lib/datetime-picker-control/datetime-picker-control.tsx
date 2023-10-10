import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import React from 'react';
import { Controller } from 'react-hook-form';
import { DatetimePickerControlProps } from '../types';
const StyledFormControl = styled(FormControl)`
  .MuiFormLabel-asterisk {
    color: red;
  }
`;
const StyledFormLabel = styled(FormLabel)`
  .MuiFormLabel-asterisk {
    color: red;
  }
`;

export function DatetimePickerControl(props: DatetimePickerControlProps) {
  const [PickerComponent, setPickerComponent] =
    React.useState<any>(DateTimePicker);

  React.useEffect(() => {
    if (props.type === 'datetime') {
      setPickerComponent(DateTimePicker);
    } else if (props.type === 'date') {
      setPickerComponent(DatePicker);
    } else if (props.type === 'time') {
      setPickerComponent(TimePicker);
    } else if (props.type === 'calendar') {
      setPickerComponent(DateCalendar);
    }
  }, [props.type]);

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.validates}
      render={({ field }) => (
        <StyledFormControl
          fullWidth
          size="small"
          className={`date-time-picker ${props.className}`}
          error={Boolean(props.errors)}
          required={Boolean(props.validates.required)}
        >
          {!props.fieldset && (
            <StyledFormLabel className="mb-1">{props.label}</StyledFormLabel>
          )}
          <PickerComponent
            {...field}
            slotProps={{
              textField: {
                size: 'small',
                label: props.fieldset ? props.label : undefined,
                error: Boolean(props.errors),
                required: Boolean(props.validates.required),
              },
            }}
          />
          <FormHelperText>{props.errors?.message}</FormHelperText>
        </StyledFormControl>
      )}
    />
  );
}

export default React.memo(DatetimePickerControl);
