import { violet } from '@radix-ui/colors';
import styled from 'styled-components';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiUserAddLine, RiAlertLine } from 'react-icons/ri/index.js';
import { BiError } from 'react-icons/bi/index.js';

import { ButtonProps, Button } from '../../atoms/Button/';
import { Bold, ParMd, ParXs } from '../../atoms/Typography';
import { DropdownMenuLabel, DropdownMenuItem } from '../../molecules';

// export default {
//   title: 'Recipes/DaoHausConnect',
//   component: Button,
// } as ComponentMeta<typeof Button>;

// export const WarningButton: ComponentStory<typeof Button> = ({
//   children,
//   ...props
// }: ButtonProps) => (
//   <Button color="secondary" variant="outline" IconLeft={BiError} {...props}>
//     {children}
//   </Button>
// );

// WarningButton.args = {
//   children: 'Example',
// };

// const ExitButton = (props: ButtonProps) => (
//   <Button color="secondary" variant="outline" size="sm" fullWidth {...props} />
// );

// export const ExitButtonExample: ComponentStory<typeof Button> = (
//   props: ButtonProps
// ) => (
//   <div style={{ width: '20rem' }}>
//     <ParMd style={{ marginBottom: '2rem' }}>
//       Exit Button takes the width of its container
//     </ParMd>
//     <ExitButton {...props} />
//   </div>
// );

// ExitButtonExample.args = {
//   children: 'Exit Button',
// };

// export const ConnectWalletButton: ComponentStory<typeof Button> = (
//   props: Omit<ButtonProps, 'children'>
// ) => (
//   <Button
//     IconLeft={RiUserAddLine}
//     className="menu-button"
//     onClick={() => {
//       console.log('functionality goes here');
//     }}
//     {...props}
//   >
//     Connect Wallet
//   </Button>
// );

// export const ConnectWalletButtonMoblile: ComponentStory<typeof Button> = (
//   props: Omit<ButtonProps, 'children'>
// ) => (
//   <Button
//     size="sm"
//     IconLeft={RiUserAddLine}
//     className="menu-button"
//     onClick={() => {
//       console.log('functionality goes here');
//     }}
//     {...props}
//   >
//     Connect
//   </Button>
// );

// export const NetworkUnavailable: ComponentStory<typeof Button> = () => (
//   <WarningButton>Network Unavailable</WarningButton>
// );

// export const WrongNetworkButton: ComponentStory<typeof Button> = ({
//   ...props
// }: Omit<ButtonProps, 'children'>) => {
//   const networkName = 'Gnosis'; /*derive dao network name from url or context*/
//   return (
//     <WarningButton
//       onClick={() => {
//         console.log('functionality goes here');
//       }}
//       {...props}
//     >
//       Switch to {networkName}
//     </WarningButton>
//   );
// };

// export const WrongNetworkMobile: ComponentStory<typeof Button> = ({
//   ...props
// }: Omit<ButtonProps, 'children'>) => {
//   return (
//     <WarningButton
//       onClick={() => {
//         console.log('functionality goes here');
//       }}
//       {...props}
//     />
//   );
// };

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   .interior {
//     display: flex;
//     flex-direction: column;
//   }
// `;

// const TemporaryAvatar = styled.div`
//   width: 3rem;
//   height: 3rem;

//   background-color: ${violet.violet9};
//   border-radius: 45px;
//   margin-right: 0.75rem;
// `;

// const Template: ComponentStory<typeof Dropdown> = (props) => {
//   return <Dropdown {...props} />;
// };

// export const UserConnectedDropdown = Template.bind({});

// UserConnectedDropdown.args = {
//   trigger: (
//     <Button>
//       <Container>
//         <TemporaryAvatar />
//         <div className="interior">
//           <ParMd>Kagahara</ParMd>
//           <ParXs>@Ethereum</ParXs>
//         </div>
//       </Container>
//     </Button>
//   ),
//   children: [
//     <DropdownMenuLabel key={Math.random() * 10000}>
//       <ParXs>
//         Connected to <Bold>Ethereum</Bold>
//       </ParXs>
//     </DropdownMenuLabel>,
//     <DropdownMenuItem key={Math.random() * 10000} spacing="0.7rem">
//       <ExitButton>Disconnect</ExitButton>
//     </DropdownMenuItem>,
//   ],
// };

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
//     <Button color="secondary" justify="flex-start" fullWidth>
//       {item}
//     </Button>
//   </DropdownMenuItem>
// ));

// export const NetworkUnavailableDropdown = Template.bind({});

// NetworkUnavailableDropdown.args = {
//   spacing: '0.7rem',
//   align: 'end',
//   menuMinWidth: '26rem',
//   trigger: (
//     <Button IconLeft={RiAlertLine} color="secondary" variant="outline">
//       Network Unavailable
//     </Button>
//   ),
//   children: [
//     <DropdownMenuLabel key={Math.random(10000)}>
//       <ParXs>Switch to available network</ParXs>
//     </DropdownMenuLabel>,
//     ...networkPanels,
//   ],
// };
