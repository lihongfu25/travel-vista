import { Control, FieldError } from 'react-hook-form';

export interface ControlProps {
  name: string;
  label: string;
  id?: string;
  className?: string;
  fullWidth?: boolean;
  style?: any;
  type?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  defaultValue?: any;
  control: Control<any>;
  validates?: any;
  errors?: FieldError;
}

export interface TextControlProps extends ControlProps {
  placeholder?: string;
}

export interface SelectControlProps extends ControlProps {
  options?: Array<{ label: string; value: any }>;
}
