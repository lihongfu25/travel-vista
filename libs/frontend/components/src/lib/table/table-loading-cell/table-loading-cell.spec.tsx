import { render } from '@testing-library/react';

import TableLoadingCell from './table-loading-cell';

describe('TableLoadingCell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableLoadingCell />);
    expect(baseElement).toBeTruthy();
  });
});
