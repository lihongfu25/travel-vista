import { Control, FieldError } from 'react-hook-form';

export interface ControlProps {
  name: string;
  label: string;
  id?: string;
  className?: string;
  fullWidth?: boolean;
  style?: any;
  variant?: 'outlined' | 'filled' | 'standard';
  defaultValue?: any;
  control: Control<any>;
  validates?: any;
  errors?: FieldError;
  fieldset?: boolean;
}

export interface TextControlProps extends ControlProps {
  placeholder?: string;
}

export interface SelectOptions {
  label: string;
  value: any;
}

export interface SelectControlProps extends ControlProps {
  options?: Array<SelectOptions>;
}
