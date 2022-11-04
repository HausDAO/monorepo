import { ComponentMeta, ComponentStory } from '@storybook/react';

import { HighlightInputText } from './HighlightInputText';
import { WrappedInput } from '../WrappedInput';

export default {
  title: 'Molecules/Form/HightlightText',
  component: HighlightInputText,
} as ComponentMeta<typeof HighlightInputText>;

const Template: ComponentStory<typeof HighlightInputText> = (args) => {

  return (
    <div style={{ margin: '4rem' }}>
      {args.highlightInputId && (
        <WrappedInput
          id={args.highlightInputId}
          label='Sample Input'
          placeholder='Type something'
        />
      )}
      <HighlightInputText {...args} />
    </div>
  );
};
export const BaseHighlightInputText = Template.bind({});
BaseHighlightInputText.args = {
  id: 'highlightInput',
  color: '#007C6C',
  description: 'Input value should be highlighted here:',
  highlightColor: '#B4D7CE',
  highlightInputId: 'input',
};
