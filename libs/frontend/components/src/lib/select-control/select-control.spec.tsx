import { render } from '@testing-library/react';

import SelectControl from './select-control';

describe('SelectControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectControl />);
    expect(baseElement).toBeTruthy();
  });
});
