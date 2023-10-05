import styles from './datetime-picker-control.module.scss';

/* eslint-disable-next-line */
export interface DatetimePickerControlProps {}

export function DatetimePickerControl(props: DatetimePickerControlProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DatetimePickerControl!</h1>
    </div>
  );
}

export default DatetimePickerControl;
