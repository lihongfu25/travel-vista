import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/system';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment, { Moment } from 'moment';
import React from 'react';
import { Controller } from 'react-hook-form';
import { mergeValidates } from '../methods';
import { DatetimePickerControlProps } from '../types';
import { Tooltip } from '@mui/material';
import Icon from '../icon/icon';
import { HelpIcon } from '../constants';
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
  const [value, setValue] = React.useState<string | null>(null);
  const [PickerComponent, setPickerComponent] =
    React.useState<any>(DateTimePicker);

  const validates = mergeValidates(props.validates);

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
  if (props.control && props.name)
    return (
      <Controller
        name={props.name}
        control={props.control}
        rules={validates}
        render={({ field }) => (
          <StyledFormControl
            fullWidth
            size={props.size || 'small'}
            className={`date-time-picker ${props.className}`}
            error={Boolean(props.errors)}
            required={Boolean(validates.required)}
            disabled={props.disabled}
          >
            {!props.fieldset && (
              <div className="d-flex align-items-center mb-1">
                <StyledFormLabel className="me-2">
                  {props.label}
                </StyledFormLabel>
                {props.tips && (
                  <Tooltip title={props.tips ?? ''} placement="right-end" arrow>
                    <div className="d-flex" style={{ cursor: 'help' }}>
                      <Icon src={HelpIcon} />
                    </div>
                  </Tooltip>
                )}
              </div>
            )}
            <PickerComponent
              {...field}
              value={moment(field.value)}
              onChange={(e: Moment) => {
                field.onChange(e.format('YYYY-MM-DD HH:mm:ss'));
              }}
              slotProps={{
                textField: {
                  size: props.size || 'small',
                  label: props.fieldset ? props.label : undefined,
                  error: Boolean(props.errors),
                  required: Boolean(validates.required),
                },
              }}
              sx={{
                borderRadius: '8px',
              }}
            />
            <FormHelperText
              sx={{
                fontSize: '12px',
              }}
            >
              {props.errors?.message}
            </FormHelperText>
          </StyledFormControl>
        )}
      />
    );
  else
    return (
      <StyledFormControl
        fullWidth
        size={props.size || 'small'}
        className={`date-time-picker ${props.className}`}
        error={Boolean(props.errors)}
        required={Boolean(validates.required)}
        disabled={props.disabled}
      >
        {!props.fieldset && (
          <div className="d-flex align-items-center mb-1">
            <StyledFormLabel className="me-2">{props.label}</StyledFormLabel>
            {props.tips && (
              <Tooltip title={props.tips ?? ''} placement="right-end" arrow>
                <div className="d-flex" style={{ cursor: 'help' }}>
                  <Icon src={HelpIcon} />
                </div>
              </Tooltip>
            )}
          </div>
        )}
        <PickerComponent
          value={moment(value)}
          onChange={(e: Moment) => {
            setValue(e.format('YYYY-MM-DD HH:mm:ss'));
          }}
          slotProps={{
            textField: {
              size: props.size || 'small',
              label: props.fieldset ? props.label : undefined,
              error: Boolean(props.errors),
              required: Boolean(validates.required),
            },
          }}
          sx={{
            borderRadius: '8px',
          }}
        />
        <FormHelperText
          sx={{
            fontSize: '12px',
          }}
        >
          {props.errors?.message}
        </FormHelperText>
      </StyledFormControl>
    );
}

export default React.memo(DatetimePickerControl);
