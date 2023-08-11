import { ComponentMeta, ComponentStory } from '@storybook/react';
import styled from 'styled-components';
import { FieldWrapper } from './FieldWrapper';
import { field } from '../../../theme';
import { border } from '../../../theme/global/border';
import { Button } from '../../atoms/Button';
import { ParXs } from '../../atoms/Typography';

export default {
  title: 'Molecules/Form/FieldWrapper',
  component: FieldWrapper,
} as ComponentMeta<typeof FieldWrapper>;
const Template: ComponentStory<typeof FieldWrapper> = (args) => (
  <FieldWrapper {...args} />
);

const DummyField = styled.div`
  background-color: ${({ theme }) => theme.secondary.step3};
  width: 100%;
  max-width: ${field.size.md};
  border-radius: ${border.radius};
  height: 4.8rem;
`;

export const FieldWrapperComponent = Template.bind({});
FieldWrapperComponent.args = {
  children: <DummyField>Sample dummy component</DummyField>,
  label: 'Label',
  success: {
    type: 'success',
    message: 'This is Success helper text',
  },
  info: 'Cooltip text',
};

export const FieldWrapperWithButtonComponent = Template.bind({});
FieldWrapperWithButtonComponent.args = {
  children: <DummyField>Sample dummy component</DummyField>,
  label: 'Label',
  info: 'Cooltip text',
  rightAddon: (
    <Button color="secondary" variant="outline" size="sm">
      Button Label
    </Button>
  ),
};

export const HelperTextPriority = Template.bind({});
HelperTextPriority.args = {
  children: (
    <DummyField>
      <ParXs>
        Helper text factory prioritizes error, warning, success, then helper
      </ParXs>
    </DummyField>
  ),
  label: 'Read code in docs section',
  helperText: 'This should not appear',
  hidden: false,
  success: {
    type: 'success',
    message: 'This should not appear',
  },
  warning: {
    type: 'warning',
    message: 'This should not appear',
  },
  error: {
    type: 'error',
    message: 'This should appear',
  },
  info: 'Just do it, ok?',
};
