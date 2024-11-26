import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { TextControlProps } from '../types';
import { generateUniqueId, mergeValidates } from '../methods';
import { Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/system';
import FormLabel from '@mui/material/FormLabel';
import Icon from '../icon/icon';
import { HelpIcon, VisibilityIcon, VisibilityOffIcon } from '../constants';
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

export function PasswordControl(props: TextControlProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
              type={showPassword ? 'text' : 'password'}
              placeholder={props.placeholder}
              sx={props.style}
              defaultValue={props.defaultValue}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size={props.size || 'small'}
                  >
                    <Icon
                      src={showPassword ? VisibilityOffIcon : VisibilityIcon}
                    />
                  </IconButton>
                </InputAdornment>
              }
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
          type={showPassword ? 'text' : 'password'}
          placeholder={props.placeholder}
          sx={props.style}
          defaultValue={props.defaultValue}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size={props.size || 'small'}
              >
                <Icon src={showPassword ? VisibilityOffIcon : VisibilityIcon} />
              </IconButton>
            </InputAdornment>
          }
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

export default PasswordControl;
