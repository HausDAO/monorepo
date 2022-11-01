import React, { useMemo } from 'react';

import { DataMd, H2 } from '../../atoms';
import {
  ActionButtonContainer,
  BiColumnBox,
  TitleContainerWithActions,
} from './BiColumn.styles';

type BiColumnLayoutProps = {
  title?: 'string' | React.ReactNode;
  subtitle?: 'string' | React.ReactNode;
  description?: 'string' | React.ReactNode;
  actions?: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
};

export const BiColumnLayout = ({
  left,
  right,
  title,
  subtitle,
  description,
  actions,
}: BiColumnLayoutProps) => {
  const sectionSubtitle = useMemo(() => {
    if (!subtitle) return null;
    if (typeof subtitle === 'string')
      return <DataMd className="subtitle">{subtitle}</DataMd>;
    return <div className="subtitle">{subtitle}</div>;
  }, [subtitle]);

  const sectionTitle = useMemo(() => {
    if (!title) return null;

    if (!actions)
      return typeof title === 'string' ? (
        <H2 className="title">{title}</H2>
      ) : (
        <div className="title">{title}</div>
      );
    return (
      <TitleContainerWithActions>
        {typeof title === 'string' ? (
          <H2 className="title">{title}</H2>
        ) : (
          <div className="title">{title}</div>
        )}
        {actions && <ActionButtonContainer>{actions}</ActionButtonContainer>}
      </TitleContainerWithActions>
    );
  }, [title, actions]);

  const sectionDescription = useMemo(() => {
    if (!description) return null;
    if (typeof description === 'string')
      return <DataMd className="description">{description}</DataMd>;
    return <div className="description">{description}</div>;
  }, [description]);

  return (
    <BiColumnBox>
      {sectionSubtitle}
      {sectionTitle}
      {sectionDescription}
      <div className="split">
        {left}
        {right}
      </div>
    </BiColumnBox>
  );
};
