import { render } from '@testing-library/react';

import UnauthenticatedGuard from './unauthenticated-guard';

describe('UnauthenticatedGuard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UnauthenticatedGuard />);
    expect(baseElement).toBeTruthy();
  });
});
