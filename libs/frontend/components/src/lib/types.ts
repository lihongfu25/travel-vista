import { Control, FieldError } from 'react-hook-form';

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
}

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
