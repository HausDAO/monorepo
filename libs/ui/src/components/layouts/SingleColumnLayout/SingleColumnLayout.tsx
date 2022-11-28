import React, { useMemo } from 'react';

import { DataMd, H2 } from '../../atoms';
import { SingleColumnLayoutProps } from './SingleColumnLayout.types';
import {
  ActionButtonContainer,
  ColumnBox,
  ColumnHeader,
  ContentBox,
  TitleContainerWithActions,
} from './SingleColumnLayout.styles';

export const SingleColumnLayout = ({
  title,
  subtitle,
  description,
  actions,
  children,
}: SingleColumnLayoutProps) => {
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
    <ColumnBox>
      <ColumnHeader>
        {sectionSubtitle}
        {sectionTitle}
        {sectionDescription}
      </ColumnHeader>
      <ContentBox>{children}</ContentBox>
    </ColumnBox>
  );
};
