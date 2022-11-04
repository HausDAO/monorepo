import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button, ParMd } from '../../atoms';
import { WrappedInput } from '../index';

import { Dialog, DialogContent, DialogTrigger } from './Dialog';

export default {
  title: 'Molecules/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof DialogContent> = ({
  title,
  children,
  ...args
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Fire Dialog</Button>
      </DialogTrigger>
      <DialogContent title={title} {...args}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export const DialogMolecule = Template.bind({});

DialogMolecule.args = {
  title: 'Title goes here',
};

export const DialogDescription = Template.bind({});
DialogDescription.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
};

export const DialogOneButton = Template.bind({});
DialogOneButton.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  leftButton: {
    onClick: () => alert('Left button clicked'),
    children: 'Left Button',
  },
};

export const MoleculeDialogBothButtons = Template.bind({});
MoleculeDialogBothButtons.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  alignButtons: 'start',
  leftButton: {
    onClick: () => alert('Left button clicked'),
    children: 'Left Button',
  },
  rightButton: {
    onClick: () => alert('Right button clicked'),
    children: 'Right Button',
  },
};

export const MoleculeDialogWithComponentInside = Template.bind({});
MoleculeDialogWithComponentInside.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  alignButtons: 'end',
  leftButton: {
    onClick: () => alert('Left button clicked'),
    children: 'Left Button',
  },
  rightButton: {
    closeDialog: true,
  },
  children: [
    <div>
      <ParMd>Welcome to a Modal</ParMd>
      <WrappedInput
        id={Math.random().toString()}
        label="Test"
        full
        info="Enter a number here"
        defaultValue="0"
      />
    </div>,
  ],
};
