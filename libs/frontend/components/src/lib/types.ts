import { Control, FieldError, UseFormClearErrors } from 'react-hook-form';

export interface SelectOptions {
  label: string;
  value: any;
}

interface PaginationOptions {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface PaginationProps {
  pagination: PaginationOptions;
  color?: 'primary' | 'secondary' | 'standard';
}

export interface ControlProps {
  name?: string;
  label: string;
  id?: string;
  className?: string;
  fullWidth?: boolean;
  size?: 'medium' | 'small';
  style?: any;
  variant?: 'outlined' | 'filled' | 'standard';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  defaultValue?: any;
  control?: Control<any>;
  validates?: Array<{
    [key: string]: { value: boolean | number | RegExp; message: string };
  }>;
  errors?: FieldError;
  fieldset?: boolean;
  clearErrors?: UseFormClearErrors<any>;
  disabled?: boolean;
}

export interface TextControlProps extends ControlProps {
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
}

export interface TextIconControlProps extends ControlProps {
  placeholder?: string;
  icon?: any;
}

export interface SelectControlProps extends ControlProps {
  options?: Array<SelectOptions>;
}

export interface DatetimePickerControlProps extends ControlProps {
  type?: 'datetime' | 'date' | 'time' | 'calendar';
}

export interface ImageUploadControlProps extends ControlProps {
  apiEndpoint?: string;
  multiple?: boolean;
}

export interface ColorPickerControlProps extends ControlProps {
  showCode?: boolean;
}

export interface CheckboxControlProps extends ControlProps {
  checked?: boolean;
  onChange?: () => void;
}
