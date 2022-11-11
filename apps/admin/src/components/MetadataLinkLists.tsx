import styled from 'styled-components';
import { DaoProfileLink } from '@daohaus/moloch-v3-data';
import { DataMd, Link, ParMd } from '@daohaus/ui';
import { charLimit } from '@daohaus/utils';
import { MetadataLinkIcons } from './MetadataLinkIcons';
import { isPredefinedSettingsLink } from '../utils/settingsHelper';

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
          .map((link) => (
            <Link linkType="no-icon-external" href={link.url}>
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
        .map((link) => (
          <Link linkType="no-icon-external" href={link.url}>
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
        .map((link) => (
          <Link linkType="no-icon-external" href={link.url}>
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
