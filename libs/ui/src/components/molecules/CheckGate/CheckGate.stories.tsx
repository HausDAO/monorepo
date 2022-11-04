import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CheckGate } from './CheckGate';

import { FullWrappedInput } from '../WrappedInput/WrappedInput.stories';
import { BaseInputSelect } from '../WrappedInputSelect/WrappedInputSelect.stories';
import { FullWrappedSelect } from '../WrappedSelect/WrappedSelect.stories';
import { FullWrappedTextArea } from '../WrappedTextArea/WrappedTextArea.stories';

export default {
  title: 'Molecules/Form/CheckGate',
  component: CheckGate,
} as ComponentMeta<typeof CheckGate>;

const Template: ComponentStory<typeof CheckGate> = (args) => {
  return (
    <div style={{ margin: '4rem' }}>
      <CheckGate {...args} />
    </div>
  );
};

export const FullGatedInput = Template.bind({});
FullGatedInput.args = {
  gateLabel: 'Gated Input',
  id: 'checkGate',
  label: 'Wrapped Input',
  fields: [
    // TS does not seem to want to recognize that args
    // and type are derived from the same source
    // @ts-expect-error: explanation above
    <FullWrappedInput {...FullWrappedInput.args} />,
  ],
};

export const FullGatedInputSelect = Template.bind({});
FullGatedInputSelect.args = {
  gateLabel: 'Gated InputSelect',
  id: 'checkGate',
  label: 'Wrapped Input Select',
  fields: [
    // @ts-expect-error: explanation above
    <BaseInputSelect {...BaseInputSelect.args} />,
  ],
};

export const FullGatedSelect = Template.bind({});
FullGatedSelect.args = {
  gateLabel: 'Gated Select',
  id: 'checkGate',
  label: 'Wrapped Select',
  fields: [
    // @ts-expect-error: explanation above
    <FullWrappedSelect {...FullWrappedSelect.args} />,
  ],
};

export const FullGatedTextArea = Template.bind({});
FullGatedTextArea.args = {
  gateLabel: 'Gated TextArea',
  id: 'checkGate',
  label: 'Wrapped Text Area',
  fields: [
    // @ts-expect-error: explanation above
    <FullWrappedTextArea {...FullWrappedTextArea.args} />,
  ],
};
