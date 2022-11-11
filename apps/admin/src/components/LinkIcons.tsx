import {
  RiDiscordFill,
  RiGithubFill,
  RiLinksFill,
  RiTelegramFill,
  RiTwitterFill,
} from 'react-icons/ri';

export const LinkIcons: { [key: string]: React.ReactNode } = {
  Github: <RiGithubFill />,
  Discord: <RiDiscordFill />,
  Twitter: <RiTwitterFill />,
  Telegram: <RiTelegramFill />,
  default: <RiLinksFill />,
};
