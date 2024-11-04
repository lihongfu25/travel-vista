import { render } from '@testing-library/react';

import Guard from './guard';

describe('Guard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Guard />);
    expect(baseElement).toBeTruthy();
  });
});
