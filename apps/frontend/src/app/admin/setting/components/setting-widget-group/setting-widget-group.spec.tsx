import { render } from '@testing-library/react';

import SettingWidgetGroup from './setting-widget-group';

describe('SettingWidgetGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingWidgetGroup />);
    expect(baseElement).toBeTruthy();
  });
});
