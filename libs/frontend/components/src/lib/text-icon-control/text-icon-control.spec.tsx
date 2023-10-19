import { render } from '@testing-library/react';

import TextIconControl from './text-icon-control';

describe('TextIconControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextIconControl />);
    expect(baseElement).toBeTruthy();
  });
});
