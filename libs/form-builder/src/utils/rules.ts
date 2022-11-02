import { FieldValidationType, ValidateField, ValueOf } from '@daohaus/utils';
import { RegisterOptions } from 'react-hook-form';
import { FieldLego } from '../types';

const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value);

export const createUpdaterFn =
  (option: keyof RegisterOptions) =>
  (newOptions: RegisterOptions) =>
  (oldOptions: RegisterOptions) =>
    newOptions[option]
      ? { ...oldOptions, [option]: newOptions[option] }
      : oldOptions;

const updateRequired = createUpdaterFn('required');
const updateValidate = createUpdaterFn('validate');

export const isRequiredField = (
  field: FieldLego,
  requiredFields: Record<string, boolean>
) => requiredFields[field.id];

export const generateRequiredRule = (field: Record<string, unknown>) => {
  const { label } = field;
  if (typeof label === 'string') {
    return { required: `${label} is required` };
  }
  return { required: `Field is required` };
};
export const handleRequiredField = (
  field: FieldLego,
  requiredFields: Record<string, boolean>
) =>
  isRequiredField(field, requiredFields) ? generateRequiredRule(field) : {};

// VALIDATION UTILS

const allowEmpty = (
  value: unknown,
  validateFn: ValueOf<typeof ValidateField>
) => {
  if (!value) {
    return true;
  }
  return validateFn(value);
};

export const hasTypeValidation = (field: FieldLego) =>
  field.expectType !== undefined;
export const handleTypeValidation = (field: FieldLego) =>
  hasTypeValidation(field)
    ? {
        validate: (val: unknown) =>
          allowEmpty(
            val,
            ValidateField[field.expectType as FieldValidationType]
          ),
      }
    : {};

export const generateRules = ({
  field,
  requiredFields = {},
}: {
  field: FieldLego;
  requiredFields: Record<string, boolean>;
}) => {
  const oldRules = field.rules || {};

  return pipe(
    updateRequired(handleRequiredField(field, requiredFields)),
    updateValidate(handleTypeValidation(field))
  )(oldRules);
};
