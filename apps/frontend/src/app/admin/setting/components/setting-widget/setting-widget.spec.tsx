import { render } from '@testing-library/react';

import SettingWidget from './setting-widget';

describe('SettingWidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingWidget />);
    expect(baseElement).toBeTruthy();
  });
});
