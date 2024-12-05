import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';
import { generateUniqueId, mergeValidates } from '../methods';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import { TextControlProps } from '../types';
import Icon from '../icon/icon';
import { HelpIcon } from '../constants';
import './text-control.module.scss';
import { Tooltip } from '@mui/material';

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
  const uniqueId = generateUniqueId(props.name ?? props.label);
  const validates = mergeValidates(props.validates);
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
            {props.fieldset ? (
              <div className="d-flex align-items-center">
                <StyledInputLabel htmlFor={uniqueId}>
                  {props.label}
                </StyledInputLabel>
                {props.tips && (
                  <Tooltip title={props.tips ?? ''} placement="right-end" arrow>
                    <div className="d-flex" style={{ cursor: 'help' }}>
                      <Icon src={HelpIcon} />
                    </div>
                  </Tooltip>
                )}
              </div>
            ) : (
              <div className="d-flex align-items-center mb-1">
                <StyledFormLabel className="me-2" htmlFor={uniqueId}>
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
            <OutlinedInput
              {...field}
              id={uniqueId}
              placeholder={props.placeholder}
              sx={props.style}
              defaultValue={props.defaultValue}
              label={props.fieldset ? props.label : undefined}
              multiline={props.multiline}
              rows={props.rows}
              minRows={props.minRows}
              maxRows={props.maxRows}
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
        {props.fieldset ? (
          <div className="d-flex align-items-center">
            <StyledInputLabel htmlFor={uniqueId}>
              {props.label}
            </StyledInputLabel>
            {props.tips && (
              <Tooltip title={props.tips ?? ''} placement="right-end" arrow>
                <div className="d-flex" style={{ cursor: 'help' }}>
                  <Icon src={HelpIcon} />
                </div>
              </Tooltip>
            )}
          </div>
        ) : (
          <div className="d-flex align-items-center mb-1">
            <StyledFormLabel className="me-2" htmlFor={uniqueId}>
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
        <OutlinedInput
          id={uniqueId}
          placeholder={props.placeholder}
          sx={props.style}
          defaultValue={props.defaultValue}
          label={props.fieldset ? props.label : undefined}
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

export default React.memo(TextControl);
