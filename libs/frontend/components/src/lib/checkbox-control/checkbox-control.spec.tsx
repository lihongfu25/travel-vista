import { render } from '@testing-library/react';

import CheckboxControl from './checkbox-control';

describe('CheckboxControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckboxControl />);
    expect(baseElement).toBeTruthy();
  });
});
