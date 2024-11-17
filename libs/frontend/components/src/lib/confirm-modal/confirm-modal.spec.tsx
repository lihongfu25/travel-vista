import { render } from '@testing-library/react';

import ConfirmModal from './confirm-modal';

describe('ConfirmModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfirmModal />);
    expect(baseElement).toBeTruthy();
  });
});
