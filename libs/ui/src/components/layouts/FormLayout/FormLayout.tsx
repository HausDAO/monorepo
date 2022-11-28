import React, { useMemo } from 'react';

import { DataMd, H2 } from '../../atoms';
import { FormLayoutProps } from './FormLayout.types';
import { FormContainer } from './FormLayout.styles';

export const FormLayout = ({
  title,
  subtitle,
  description,
  children,
}: FormLayoutProps) => {
  const formSubtitle = useMemo(() => {
    if (!subtitle) return null;
    if (typeof subtitle === 'string')
      return <DataMd className="subtitle">{subtitle}</DataMd>;
    return <div className="subtitle">{subtitle}</div>;
  }, [subtitle]);

  const formTitle = useMemo(() => {
    if (!title) return null;
    if (typeof title === 'string') return <H2 className="title">{title}</H2>;
    return <div className="title">{title}</div>;
  }, [title]);

  const formDescription = useMemo(() => {
    if (!description) return null;
    if (typeof description === 'string')
      return <DataMd className="description">{description}</DataMd>;
    return <div className="description">{description}</div>;
  }, [description]);

  return (
    <FormContainer>
      {formSubtitle}
      {formTitle}
      {formDescription}
      {children}
    </FormContainer>
  );
};
