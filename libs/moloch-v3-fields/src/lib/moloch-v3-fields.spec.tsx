import { render } from '@testing-library/react';

import MolochV3Fields from './moloch-v3-fields';

describe('MolochV3Fields', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MolochV3Fields />);
    expect(baseElement).toBeTruthy();
  });
});
