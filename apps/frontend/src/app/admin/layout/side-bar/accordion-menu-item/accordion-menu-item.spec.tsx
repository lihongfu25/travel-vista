import { render } from '@testing-library/react';

import AccordionMenuItem from './accordion-menu-item';

describe('AccordionMenuItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccordionMenuItem />);
    expect(baseElement).toBeTruthy();
  });
});
