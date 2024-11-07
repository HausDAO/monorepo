import styled from 'styled-components';
import {
  RiArticleLine,
  RiDiscordFill,
  RiGithubFill,
  RiLinksFill,
  RiTelegramFill,
  RiTwitterFill,
} from 'react-icons/ri/index.js';

import { DaoProfileLink } from '@daohaus/moloch-v3-data';
import { DataMd, Link, ParMd } from '@daohaus/ui';
import { charLimit, getFarcastleFramemUrl } from '@daohaus/utils';
import FarcasterLogo from '../../assets/farcaster-logo-yellow.svg';

export const isPredefinedSettingsLink = (link: DaoProfileLink) => {
  return (
    link.label &&
    ['Github', 'Discord', 'Telegram', 'Twitter', 'Blog', 'Web'].indexOf(
      link.label
    ) >= 0
  );
};

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const LinkContents = styled.div`
  display: flex;
  align-items: self-start;
  gap: 0.5rem;
`;

const IconLinkContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const FarcasterLinkContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0;
  padding-left: 0.5rem;
`;

const FarcasterLinkContents = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MetadataLinkIcons: { [key: string]: React.ReactNode } = {
  Github: <RiGithubFill size={'2.5rem'} />,
  Discord: <RiDiscordFill size={'2.5rem'} />,
  Twitter: <RiTwitterFill size={'2.5rem'} />,
  Telegram: <RiTelegramFill size={'2.5rem'} />,
  Blog: <RiArticleLine size={'2.5rem'} />,
  default: <RiLinksFill size={'2.5rem'} />,
};

type LinkListsProps = {
  links?: DaoProfileLink[];
};

export const SettingsLinkList = ({ links }: LinkListsProps) => {
  if (!links) {
    return null;
  }
  return (
    <>
      <ParMd>Links</ParMd>
      <LinkContainer>
        {links
          .filter((link) => link.url)
          .map((link, i) => (
            <Link showExternalIcon={false} href={link.url} key={i}>
              <LinkContents>
                {(link.label && MetadataLinkIcons[link.label]) ||
                  MetadataLinkIcons['default']}
                <DataMd>{charLimit(link.url, 28)}</DataMd>
              </LinkContents>
            </Link>
          ))}
      </LinkContainer>
    </>
  );
};

export const OverviewIconLinkList = ({ links }: LinkListsProps) => {
  if (!links) {
    return null;
  }
  return (
    <IconLinkContainer>
      {links
        .filter((link) => link.url && isPredefinedSettingsLink(link))
        .map((link, i) => (
          <Link showExternalIcon={false} href={link.url} key={i}>
            <LinkContents>
              {(link.label && MetadataLinkIcons[link.label]) ||
                MetadataLinkIcons['default']}
            </LinkContents>
          </Link>
        ))}
    </IconLinkContainer>
  );
};

export const OverviewLinkList = ({ links }: LinkListsProps) => {
  if (!links) {
    return null;
  }
  return (
    <LinkContainer>
      {links
        .filter((link) => link.url && !isPredefinedSettingsLink(link))
        .map((link, i) => (
          <Link showExternalIcon={false} href={link.url} key={i}>
            <LinkContents>
              {(link.label && MetadataLinkIcons[link.label]) ||
                MetadataLinkIcons['default']}
              <DataMd>{charLimit(link.label, 45)}</DataMd>
            </LinkContents>
          </Link>
        ))}
    </LinkContainer>
  );
};

export const FarcasterShareLink = ({
  daoId,
  daoChain,
  location,
}: {
  daoId?: string;
  daoChain?: string;
  location?: string;
}) => {
  if (!daoId || !daoChain) return null;
  const url = getFarcastleFramemUrl({ daoId, daoChain, location });
  return (
    <FarcasterLinkContainer>
      <Link showExternalIcon={false} href={url}>
        <FarcasterLinkContents>
          <img src={FarcasterLogo} alt="farcaster" width="22px" />
          <DataMd>Cast Farcastle Frame</DataMd>
        </FarcasterLinkContents>
      </Link>
    </FarcasterLinkContainer>
  );
};
