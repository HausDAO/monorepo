import { ComponentMeta, ComponentStory } from '@storybook/react';
import { H4, ParSm } from '../../atoms';
import { Button } from '../../atoms/Button';
import { WrappedCheckbox } from '../WrappedCheckbox';
import { WrappedInput } from '../WrappedInput';
import { CollapsibleCard } from './CollapsibleCard';

export default {
  title: 'Molecules/CollapsibleCard',
  component: CollapsibleCard,
} as ComponentMeta<typeof CollapsibleCard>;

const Template: ComponentStory<typeof CollapsibleCard> = (args) => {
  return <CollapsibleCard {...args}>{args.children}</CollapsibleCard>;
};

export const CollapsibleCardMolecule = Template.bind({});

CollapsibleCardMolecule.args = {
  children: (
    <div>
      <p>Content in a Card</p>
    </div>
  ),
};

export const ProposalCardExample = Template.bind({});

ProposalCardExample.args = {
  children: (
    <div>
      <H4>Content in a Card</H4>
      <ParSm>If you are reading this then you are on the path</ParSm>
      <WrappedCheckbox
        id={'multipleCheckboxId'}
        label={'Multiple Checkboxes'}
        helperText={'Test the action/controls'}
        info={'This is controlled by the info prop'}
        checkboxes={[
          {
            id: 'childCheckboxId1',
            title: 'Checkbox 1',
            name: 'checkbox1',
            defaultChecked: false,
            disabled: false,
            required: true,
          },
          {
            id: 'childCheckboxId2',
            title: 'Checkbox 2',
            name: 'checkbox2',
            defaultChecked: true,
            disabled: false,
            required: false,
          },
          {
            id: 'childCheckboxId3',
            title: 'Checkbox 3',
            name: 'checkbox3',
            defaultChecked: false,
            disabled: true,
            required: false,
          },
        ]}
      />
      <Button variant="outline" color="secondary">
        Click Me
      </Button>
    </div>
  ),
  collapsibleContent: (
    <div className="">
      <WrappedInput
        id={'19919'}
        label={'Test Content'}
        placeholder={'Cool stuff goes here!'}
      ></WrappedInput>
    </div>
  ),
};
