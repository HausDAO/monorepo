import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { useFormBuilder } from '../hooks/useFormBuilder';
import { generateRules } from '../utils/rules';
import { FieldLego } from '../utils/types';

export const FormBuilderFactory = ({ field }: { field: FieldLego }) => {
  const { type } = field;
  const {
    formState: { errors },
  } = useFormContext();
  const formState = errors;
  const {
    formDisabled,
    requiredFields,
    fieldObj,
    fieldSpacing,
    applyToEach,
    submitDisabled,
  } = useFormBuilder();

  const GeneratedField = useMemo(
    () => {
      const Field = fieldObj[type];

      // somehow, generarte rules will need to be become extendable as well
      const newRules = generateRules({
        field: field,
        requiredFields: requiredFields || {},
      });

      return (
        <Field
          {...field}
          rules={newRules}
          disabled={formDisabled || field.disabled || submitDisabled}
          {...applyToEach}
        />
      );
    },
    // Ignoring exhaustive deps here so that I can update this component
    // formState change

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      type,
      formDisabled,
      field,
      requiredFields,
      fieldObj,
      formState,
      submitDisabled,
    ]
  );

  return <Spacer fieldSpacing={fieldSpacing}>{GeneratedField}</Spacer>;
};

const Spacer = styled.div<{ fieldSpacing?: string }>`
  margin-bottom: ${({ fieldSpacing }) => fieldSpacing || '0'};
`;
