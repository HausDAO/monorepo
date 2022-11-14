import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';

import { ParXs } from '../../atoms/Typography';
import { Button } from '../../atoms/Button/Button';
import { Dropdown, DropdownMenu, DropdownTrigger } from './Dropdown';
import { DropdownMenuItem, DropdownMenuLabel } from './Dropdown.styles';

export default {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  subcomponents: { DropdownMenuItem },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
    {/* <Dropdown {...args} /> */}
    <DropdownMenu>
      <DropdownTrigger>Button</DropdownTrigger>
    </DropdownMenu>
  </div>
);

export const BaseDropdown = Template.bind({});

BaseDropdown.args = {
  children: 'Button',
  color: 'primary',
};

// const networkPanels = [
//   'Mainnet',
//   'Arbitrum',
//   'Celo',
//   'Gnosis',
//   'Optimism',
//   'Gnosis',
//   'Polygon',
//   'Kovan',
//   'Rinkeby',
// ].map((item, index) => (
//   <DropdownMenuItem key={index} spacing="0.7rem">
//     <Button color="secondary" fullWidth>
//       {item}
//     </Button>
//   </DropdownMenuItem>
// ));

// export const FullDropdown = Template.bind({});

// FullDropdown.args = {
//   menuMinWidth: '26rem',
//   align: 'end',
//   trigger: (
//     <Button IconLeft={RiAlertLine} variant="outline">
//       Network Unavailable
//     </Button>
//   ),
//   children: [
//     <DropdownMenuLabel key={uuidv4()}>
//       <ParXs>Switch to available network</ParXs>
//     </DropdownMenuLabel>,
//     ...networkPanels,
//   ],
// };
