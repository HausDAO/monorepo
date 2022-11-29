import { useFormContext } from 'react-hook-form';

import { Buildable } from '../../../types/formAndField';
import { Bold, ParSm } from '../../atoms/Typography';

import { HighlightInputTextProps } from './HighlightInputText.types';

export const HighlightInputText = ({
  color,
  description,
  highlightColor,
  highlightInputId,
}: Buildable<HighlightInputTextProps>) => {
  const { watch } = useFormContext();
  const highlightValue = highlightInputId ? watch(highlightInputId) : '';

  return (
    <ParSm color={color}>
      {description}
      {highlightValue && <Bold color={highlightColor}>{highlightValue}</Bold>}
    </ParSm>
  );
};
