import { render } from '@testing-library/react';
import SVG from './svg';

describe('SVG', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SVG />);
    expect(baseElement).toBeTruthy();
  });
});
