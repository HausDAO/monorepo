import { render } from '@testing-library/react';

import FormBuilderBase from './form-builder-base';

describe('FormBuilderBase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormBuilderBase />);
    expect(baseElement).toBeTruthy();
  });
});
