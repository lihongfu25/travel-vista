import { render } from '@testing-library/react';

import PasswordControl from './password-control';

describe('PasswordControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordControl />);
    expect(baseElement).toBeTruthy();
  });
});
