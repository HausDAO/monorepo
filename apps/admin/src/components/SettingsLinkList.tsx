import { DaoProfileLink } from '@daohaus/moloch-v3-data';
import { DataMd, Link, ParMd } from '@daohaus/ui';
import {
  RiDiscordFill,
  RiGithubFill,
  RiLinksFill,
  RiTelegramFill,
  RiTwitterFill,
} from 'react-icons/ri';
import styled from 'styled-components';
import { LinkIcons } from './LinkIcons';

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.5rem;
`;

const LinkContents = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

type SettingsLinkListProps = {
  links?: DaoProfileLink[];
};

export const SettingsLinkList = ({ links }: SettingsLinkListProps) => {
  if (!links) {
    return null;
  }
  return (
    <>
      <ParMd>Links</ParMd>
      <LinkContainer>
        {links
          .filter((link) => link.url)
          .map((link) => (
            <Link linkType="no-icon-external" href={link.url}>
              <LinkContents>
                {(link.label && LinkIcons[link.label]) || LinkIcons['default']}
                <DataMd>{link.url}</DataMd>
              </LinkContents>
            </Link>
          ))}
      </LinkContainer>
    </>
  );
};
