import { render } from '@testing-library/react';

import SimpleSearch from './simple-search';

describe('SimpleSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SimpleSearch />);
    expect(baseElement).toBeTruthy();
  });
});
