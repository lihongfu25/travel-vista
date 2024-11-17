import { render } from '@testing-library/react';

import TableActions from './table-actions';

describe('TableActions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableActions />);
    expect(baseElement).toBeTruthy();
  });
});
