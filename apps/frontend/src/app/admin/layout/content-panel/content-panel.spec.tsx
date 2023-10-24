import { render } from '@testing-library/react';

import ContentPanel from './content-panel';

describe('ContentPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentPanel />);
    expect(baseElement).toBeTruthy();
  });
});
