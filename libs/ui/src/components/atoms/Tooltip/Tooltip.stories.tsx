import { grass } from '@radix-ui/colors';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { H1, ParLg } from '../Typography';
import { Tooltip } from './Tooltip';
import { LgTooltipIcon, SmTooltipIcon } from './TooltipTriggers';

export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args} />
);

export const AtomTooltip = Template.bind({});

AtomTooltip.args = {
  content: "Oh boy! It's content!",
};

export const BaseIcons = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div>
      <ParLg>Large Icon</ParLg>
      <LgTooltipIcon />
    </div>
    <div>
      <ParLg>Small Icon</ParLg>
      <SmTooltipIcon />
    </div>
  </div>
);

export const LargeIconTooltip = Template.bind({});
LargeIconTooltip.args = {
  content: 'Oh boy! Large Icons!',
  triggerEl: <LgTooltipIcon />,
};
export const CustomIconTrigger = Template.bind({});
CustomIconTrigger.args = {
  content: "Oh-eeee! That's a custom icon!",
  triggerEl: <RiCheckboxCircleFill color={grass.grass9} size="2rem" />,
};
export const CustomContent = Template.bind({});
CustomContent.args = {
  content: <H1>Whoaaa, an H1!!!!!</H1>,
};
