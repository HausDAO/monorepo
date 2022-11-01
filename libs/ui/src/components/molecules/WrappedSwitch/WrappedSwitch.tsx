import { Controller, useFormContext } from 'react-hook-form';
import type {
  Buildable,
  ConditionLabel,
  Switchable,
} from '../../../types/formAndField';
import { Switch } from '../../atoms/Switch';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

const handleFieldLabel = (
  fieldLabel: string | ConditionLabel,
  switchOn: boolean
) => {
  if (typeof fieldLabel === 'string') {
    return fieldLabel;
  }
  if (switchOn) {
    return fieldLabel.on;
  }
  return fieldLabel.off;
};

export const WrappedSwitch = (props: Buildable<Switchable>) => {
  const {
    id,
    helperText,
    info,
    label,
    error,
    success,
    warning,
    switches,
    disabled,
    rules,
  } = props;
  const { control, watch } = useFormContext();

  return (
    <FieldWrapper
      id={id}
      helperText={helperText}
      info={info}
      label={label}
      error={error}
      success={success}
      warning={warning}
    >
      {switches.map((switchProps) => {
        const switchValue = watch(switchProps.id);
        return (
          <Controller
            key={switchProps.id}
            name={switchProps.id}
            rules={rules}
            control={control}
            defaultValue={switchProps.defaultChecked || false}
            render={({ field }) => {
              return (
                <Switch
                  {...field}
                  {...switchProps}
                  switchOn={field.value}
                  onCheckedChange={field.onChange}
                  fieldLabel={handleFieldLabel(
                    switchProps.fieldLabel,
                    switchValue
                  )}
                  disabled={disabled}
                  ref={field.ref}
                />
              );
            }}
          />
        );
      })}
    </FieldWrapper>
  );
};
