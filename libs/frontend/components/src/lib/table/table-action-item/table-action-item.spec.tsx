import { render } from '@testing-library/react';

import TableActionItem from './table-action-item';

describe('TableActionItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableActionItem />);
    expect(baseElement).toBeTruthy();
  });
});
