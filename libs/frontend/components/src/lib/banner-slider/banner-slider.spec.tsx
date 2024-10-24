import { render } from '@testing-library/react';

import BannerSlider from './banner-slider';

describe('BannerSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BannerSlider />);
    expect(baseElement).toBeTruthy();
  });
});
