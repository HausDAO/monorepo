import React from 'react';
import { RiDiscordFill, RiToolsLine } from 'react-icons/ri/index.js';

import { Link, ParMd } from '../../atoms';

import { BannerProps } from './Banner.types';
import { StyledBanner } from './Banner.styles';

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
          showExternalIcon={false}
          className="banner--link-item"
        >
          Give Feedback
        </Link>
        <Link showExternalIcon={false} href="https://discord.gg/kJaVkXtsXA">
          <RiDiscordFill />
          Support
        </Link>
      </div>
    </StyledBanner>
  );
};
