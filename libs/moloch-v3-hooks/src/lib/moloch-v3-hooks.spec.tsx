import { render } from '@testing-library/react';

import MolochV3Hooks from './moloch-v3-hooks';

describe('MolochV3Hooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MolochV3Hooks />);
    expect(baseElement).toBeTruthy();
  });
});
