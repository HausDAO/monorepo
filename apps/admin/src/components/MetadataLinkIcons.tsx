import {
  RiArticleLine,
  RiDiscordFill,
  RiGithubFill,
  RiLinksFill,
  RiTelegramFill,
  RiTwitterFill,
} from 'react-icons/ri';

export const MetadataLinkIcons: { [key: string]: React.ReactNode } = {
  Github: <RiGithubFill size={'2.5rem'} />,
  Discord: <RiDiscordFill size={'2.5rem'} />,
  Twitter: <RiTwitterFill size={'2.5rem'} />,
  Telegram: <RiTelegramFill size={'2.5rem'} />,
  Blog: <RiArticleLine size={'2.5rem'} />,
  default: <RiLinksFill size={'2.5rem'} />,
};
