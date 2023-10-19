import { render } from '@testing-library/react';

import PasswordIconControl from './password-icon-control';

describe('PasswordIconControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordIconControl />);
    expect(baseElement).toBeTruthy();
  });
});
