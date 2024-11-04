import { render } from '@testing-library/react';

import AdminGuard from './admin-guard';

describe('AdminGuard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminGuard />);
    expect(baseElement).toBeTruthy();
  });
});
