import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { Theme } from '../../../types/theming';
import { ProgressVisualFull, ProgressVisualPart } from './Progress.styles';

export type ProgressProps = {
  backgroundColor: string;
  progressSection: {
    percentage: string;
    color: string;
  }[];
};

export const Progress = ({
  backgroundColor,
  progressSection = [
    {
      percentage: '0%',
      color: 'transparent',
    },
  ],
}: ProgressProps) => {
  const theme = useTheme() as Theme;
  // Starting values needed for the animation
  // Mapped by "progressSection" so it can work with multiple values dynamically
  const [widths, setWidths] = useState(
    progressSection.map(() => {
      return '0%';
    })
  );

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidths(
        progressSection.map((item) => {
          return item.percentage;
        })
      );
    });
  }, [progressSection]);

  return (
    <ProgressVisualFull
      backgroundColor={backgroundColor || theme.neutral.step10}
    >
      {progressSection.map((item, index) => {
        // map each part into separate div where each will be animated
        return (
          <ProgressVisualPart
            key={index}
            width={widths[index]}
            backgroundColor={item.color}
          />
        );
      })}
    </ProgressVisualFull>
  );
};
