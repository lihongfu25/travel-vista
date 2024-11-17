import { render } from '@testing-library/react';

import MenuItemComponent from './menu-item';

describe('MenuItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MenuItemComponent />);
    expect(baseElement).toBeTruthy();
  });
});
