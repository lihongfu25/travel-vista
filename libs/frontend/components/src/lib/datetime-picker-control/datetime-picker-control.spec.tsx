import { render } from '@testing-library/react';

import DatetimePickerControl from './datetime-picker-control';

describe('DatetimePickerControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DatetimePickerControl />);
    expect(baseElement).toBeTruthy();
  });
});
