import { render } from '@testing-library/react';

import SimplePagination from './simple-pagination';

describe('SimplePagination', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SimplePagination />);
    expect(baseElement).toBeTruthy();
  });
});
