import styles from './color-picker-control.module.scss';

/* eslint-disable-next-line */
export interface ColorPickerControlProps {}

export function ColorPickerControl(props: ColorPickerControlProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ColorPickerControl!</h1>
    </div>
  );
}

export default ColorPickerControl;
