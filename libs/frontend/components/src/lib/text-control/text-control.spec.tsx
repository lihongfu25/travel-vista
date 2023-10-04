import { render } from '@testing-library/react';

import TextControl from './text-control';

describe('TextControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextControl />);
    expect(baseElement).toBeTruthy();
  });
});
