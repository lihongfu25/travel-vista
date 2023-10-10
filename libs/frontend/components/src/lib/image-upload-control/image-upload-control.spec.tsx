import { render } from '@testing-library/react';

import ImageUploadControl from './image-upload-control';

describe('ImageUploadControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageUploadControl />);
    expect(baseElement).toBeTruthy();
  });
});
