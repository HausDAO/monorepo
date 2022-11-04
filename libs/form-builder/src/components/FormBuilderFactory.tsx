import { useMemo } from 'react';
import { FieldLego } from '../types/formLegoTypes';
import { generateRules } from '../utils/rules';
import { CoreFieldLookup } from './CoreFieldLookup';
import { FieldSpacer } from './FieldSpacer';
import { useFormBuilder } from './FormBuilder';

export const FormBuilderFactory = ({
  spacing = true,
  field,
}: {
  field: FieldLego;
  spacing?: boolean;
}) => {
  const { type } = field;
  const {
    formState: { errors },
  } = useFormBuilder();

  const formState = errors;

  const { formDisabled, requiredFields, customFields } = useFormBuilder();

  //  Memoizing solves the 'switch-away' mega-bug that was
  //  occuring because of the enumerator patttern selecting
  //  a new instance of the component each render.
  const GeneratedField = useMemo(
    () => {
      const Component = customFields
        ? customFields[type]
        : CoreFieldLookup[type];

      const newRules = generateRules({
        field,
        requiredFields: requiredFields || {},
      });

      return (
        <Component
          {...field}
          full
          disabled={formDisabled || field.disabled}
          rules={newRules}
        />
      );
    },
    // Ignoring exhaustive deps here so that I can update this component
    // formState change

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type, formDisabled, field, requiredFields, formState]
  );

  return spacing ? <FieldSpacer>{GeneratedField}</FieldSpacer> : GeneratedField;
};

// Simiplified example of TS problem here.
/*https://www.typescriptlang.org/play#code/MYewdgzgLgBAZmAjDAvDAFAb3iEAaGAIwEMAnGAXwC4Zs5cbpSBLMAcwG4iyawBXALaEApuQoBKVAD5aAWABQMGKWFQ+pMDAAGAEkz0QFALR6SpClo4KKV+QtCRYCAEyoMdXARIAvSjQ8gjFAs7Fw+NIS4ADbCxJoS0nKKyqrqmrr6uMamxN4WtjYK9uDQ8GAAzG5Y3KReuX60NbyCIqRhuRHRsfGSKDKYCkoqahraOeYmmD751rbFjmUAMrgA1nwADm4DyXB8YMBQzOCINAiIeIPwewdHYM6ndxc714fg5Q-lT4V28lAAnuthDAAGJgACSjlIfBuJS2lwA2qCANLCP4wVgwFaokBwGD-QE4parDYAXRoAAUyMQBKpRBAADz44SEhDLEBrdaIsAov4kqTwgAMJJgADIkkolEyaMjUbYlN8KPCsX9CUyWWA2RySXN5Lt9q9NFCwABBUiEUEAdWYUAAFgBhECkFQHU1sCDVJkEAB0PrIboaoIhTGhBogkm2SgcpQgwhiB2EABNQW5WcTOUztUVksM0jAY3GoInQeg-WGClmAPQVmAACRAAHcYAmQDAwTA2KoYMQ+FAQKABOsYoWYDbRECIC3bcRYG3gHEiEDiBAIOpE3ibdOm8IAG4QBRVrsqdFgdY9w7sddA0BO4QHGDrUggdYQHDkWLAG0wADkTK-MBZLy3AA-PMpTAgAcgAyjQABKt6Ogm9JMKwbAEIGkIhrcEAyGgEYwMIAAe1KDsIJzihKUrfnqMJIF+TwSjggTfn8wgQHRlxKGYNDnJcFD0fhREDjE9zkZKALCDQX7UQazjsckSgGJJLFsfxnEdHiULCPxfGXIRxExO8ol4uJknSbcsmqdw3inMQUQxpZinMcI6xyfKXy2EAA*/
