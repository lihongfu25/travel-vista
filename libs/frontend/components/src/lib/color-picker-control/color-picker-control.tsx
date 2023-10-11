import React from 'react';
import styles from './color-picker-control.module.scss';
import { HexColorPicker } from 'react-colorful';
import { Button, Popover, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { ControlProps } from '../types';

/* eslint-disable-next-line */

export function ColorPickerControl(props: ControlProps) {
  const [color, setColor] = React.useState<string>('#aabbcc');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
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

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.validates}
      render={({ field }) => (
        <div className={styles['color-picker']}>
          <button
            type="button"
            className={`${styles['color-picker__swatch']} color-picker__btn`}
            style={{ backgroundColor: color }}
            onClick={(e) => setIsOpen(!isOpen)}
          />
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
      )}
    />
  );
}

export default ColorPickerControl;
