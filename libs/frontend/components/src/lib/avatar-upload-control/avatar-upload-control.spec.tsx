import { render } from '@testing-library/react';

import AvatarUploadControl from './avatar-upload-control';

describe('AvatarUploadControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AvatarUploadControl />);
    expect(baseElement).toBeTruthy();
  });
});
