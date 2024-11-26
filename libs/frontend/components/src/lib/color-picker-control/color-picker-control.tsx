import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/system';
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { Controller } from 'react-hook-form';
import { mergeValidates } from '../methods';
import { ColorPickerControlProps } from '../types';
import styles from './color-picker-control.module.scss';
import { Tooltip } from '@mui/material';
import Icon from '../icon/icon';
import { HelpIcon } from '../constants';
const StyledInputLabel = styled(InputLabel)`
  .MuiFormLabel-asterisk {
    color: red;
  }
`;
/* eslint-disable-next-line */

export function ColorPickerControl(props: ColorPickerControlProps) {
  const [color, setColor] = React.useState<string>(
    props.defaultValue || '#aabbcc'
  );
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const validates = mergeValidates(props.validates);

  React.useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (e.target instanceof Element) {
        if (
          !e.target.classList.contains('react-colorful__interactive') &&
          !e.target.classList.contains('color-picker__btn')
        ) {
          setIsOpen(false);
        }
      }
    };
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isOpen]);
  if (props.control && props.name)
    return (
      <Controller
        name={props.name}
        control={props.control}
        rules={validates}
        render={({ field }) => (
          <div className={`${styles['color-picker']} ${props.className}`}>
            <div className="d-flex align-items-center mb-1">
              <StyledInputLabel
                className="me-2"
                required={Boolean(validates.required)}
              >
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
            <div className="d-flex align-items-center">
              <button
                type="button"
                className={`${styles['color-picker__swatch']} color-picker__btn`}
                style={{ backgroundColor: color }}
                onClick={(e) => setIsOpen(!isOpen)}
              ></button>
              {props.showCode && (
                <InputLabel className="ms-2">{color}</InputLabel>
              )}
            </div>
            {isOpen && (
              <div className={styles['color-picker__popover']}>
                <HexColorPicker
                  color={color}
                  onChange={(e) => {
                    setColor(e);
                    field.onChange(e);
                  }}
                />
              </div>
            )}
          </div>
        )}
      />
    );
  else
    return (
      <div className={`${styles['color-picker']} ${props.className}`}>
        <div className="d-flex align-items-center mb-1">
          <StyledInputLabel
            className="me-2"
            required={Boolean(validates.required)}
          >
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
        <div className="d-flex align-items-center">
          <button
            type="button"
            className={`${styles['color-picker__swatch']} color-picker__btn`}
            style={{ backgroundColor: color }}
            onClick={(e) => setIsOpen(!isOpen)}
          ></button>
          {props.showCode && <InputLabel className="ms-2">{color}</InputLabel>}
        </div>
        {isOpen && (
          <div className={styles['color-picker__popover']}>
            <HexColorPicker
              color={color}
              onChange={(e) => {
                setColor(e);
              }}
            />
          </div>
        )}
      </div>
    );
}

export default ColorPickerControl;
