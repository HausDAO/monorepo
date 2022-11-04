import { useFormContext } from 'react-hook-form';

import { Bold, ParSm } from '../../atoms/Typography';
import { Buildable } from '../../../types/formAndField';

type HighlightTextProps = {
  color?: string;
  description: string;
  highlightColor?: string;
  highlightInputId?: string;
};

export const HighlightInputText = ({
  color,
  description,
  highlightColor,
  highlightInputId,
}: Buildable<HighlightTextProps>) => {
  const { watch } = useFormContext();
  const highlightValue = highlightInputId ? watch(highlightInputId) : '';

  return (
    <ParSm color={color}>
      {description}
      {highlightValue && <Bold color={highlightColor}>{highlightValue}</Bold>}
    </ParSm>
  );
};
