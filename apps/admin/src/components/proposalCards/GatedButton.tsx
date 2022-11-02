import { Button, Tooltip } from '@daohaus/ui';

import React, { ComponentProps, useMemo } from 'react';

type Rule = true | string;

export const GatedButton = ({
  rules,
  ...props
}: {
  rules: Rule[];
} & ComponentProps<typeof Button>) => {
  const error = useMemo(
    () => rules.find((rule) => typeof rule === 'string'),
    [rules]
  );

  return !error ? (
    <Button {...props} />
  ) : (
    <Tooltip
      triggerAsChild
      triggerEl={<Button {...props} disabled />}
      content={error}
      side="bottom"
      {...props}
    />
  );
};
