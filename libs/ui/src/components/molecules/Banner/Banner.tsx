import React from 'react';
import { RiDiscordFill, RiToolsLine } from 'react-icons/ri';
import { Link, ParMd } from '../../atoms';

import { StyledBanner } from './Banner.styles';

export type BannerProps = {
  bannerText?: string;
  className?: string;
};

export const Banner = ({
  className,
  bannerText = 'DAOhaus v3 is currently in beta. Please report bugs, request features or provide feedback.',
}: BannerProps) => {
  return (
    <StyledBanner className={className}>
      <div className="banner--text-container">
        <RiToolsLine />
        <ParMd>{bannerText}</ParMd>
      </div>
      <div className="banner--link-container">
        <Link
          href="https://github.com/HausDAO/daohaus-monorepo/issues/new/choose"
          linkType="no-icon-external"
          className="banner--link-item"
        >
          Give Feedback
        </Link>
        <Link linkType="no-icon-external" href="https://discord.gg/daohaus">
          <RiDiscordFill />
          Support
        </Link>
      </div>
    </StyledBanner>
  );
};
