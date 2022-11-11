import React from 'react';
import { Buildable, WrappedInput, Field } from '@daohaus/ui';

const presetLabels: { [key: string]: boolean } = {
  github: true,
  web: true,
  discord: true,
  twitter: true,
  telegram: true,
  blog: true,
};

export const MetadataLink = (props: Buildable<Field>) => {
  return (
    <>
      {!presetLabels[props.id] && (
        <WrappedInput id={`${props.id}Label`} label={`${props.label} Label`} />
      )}
      <WrappedInput {...props} />
    </>
  );
};
