import { render } from '@testing-library/react';

import ColorPickerControl from './color-picker-control';

describe('ColorPickerControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ColorPickerControl />);
    expect(baseElement).toBeTruthy();
  });
});
