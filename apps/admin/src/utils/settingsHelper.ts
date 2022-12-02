import { DaoProfileLink, MolochV3Dao } from '@daohaus/moloch-v3-data';

export const formatDaoProfileForForm = (dao: MolochV3Dao) => {
  const links = dao?.links || [];

  return {
    name: dao?.name,
    icon: dao?.avatarImg,
    tags: dao?.tags?.join(', '),
    description: dao?.description,
    long_description: dao?.longDescription,
    discord: links.find((link) => link.label === 'Discord')?.url,
    github: links.find((link) => link.label === 'Github')?.url,
    telegram: links.find((link) => link.label === 'Telegram')?.url,
    twitter: links.find((link) => link.label === 'Twitter')?.url,
    blog: links.find((link) => link.label === 'Blog')?.url,
    web: links.find((link) => link.label === 'Web')?.url,
    custom1: links[6]?.url,
    custom1Label: links[6]?.label,
    custom2: links[7]?.url,
    custom2Label: links[7]?.label,
    custom3: links[8]?.url,
    custom3Label: links[8]?.label,
  };
};

export const randFromArray = <T>(items: T[]) => {
  return items[(items.length * Math.random()) | 0];
};

export const daoProfileHasLinks = (
  links: MolochV3Dao['links']
): boolean | undefined => {
  return links?.some((link: DaoProfileLink) => link.url);
};

export const isPredefinedSettingsLink = (link: DaoProfileLink) => {
  return (
    link.label &&
    ['Github', 'Discord', 'Telegram', 'Twitter', 'Blog', 'Web'].indexOf(
      link.label
    ) >= 0
  );
};
