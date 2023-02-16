import { DaoProfileLink, MolochV3Dao } from '@daohaus/moloch-v3-data';

export const missingDaoProfileData = (dao: MolochV3Dao): boolean => {
  if (!dao?.profile || !dao.profile.length) return true;
  return dao.description === '' && dao.avatarImg === '';
};

export const daoProfileHasLinks = (
  links: MolochV3Dao['links']
): boolean | undefined => {
  return links?.some((link: DaoProfileLink) => link.url);
};
