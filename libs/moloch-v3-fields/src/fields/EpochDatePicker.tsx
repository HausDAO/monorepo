import React, { forwardRef, useState } from 'react';

import { Buildable, Button, Field, FieldWrapper } from '@daohaus/ui';
import { useFormContext } from 'react-hook-form';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { RiArrowDropDownFill, RiCalendar2Fill } from 'react-icons/ri';
import { createGlobalStyle } from 'styled-components';

/**
 * @name EpochDatePicker
 * @param props
 * @note props.className === "lg" will show a larger popper
 * @returns
 * @example <EpochDatePicker id="startDate" label="Start Date" />
 * @note this is to be used with form builder.  It will return the epoch time in seconds
 * fields: { ...FIELD.EPOCH_DATE_FIELD, id: "endDate", label: "End Date",className: "lg"},
 * @example FIELD { EPOCH_DATE_FIELD: {id: "epochDate",type: "epochDateField",label: "Epoch Date Field",}},
 */

// TODO: set the default somehow and enforce required

export const EpochDatePicker = (props: Buildable<Field>) => {
  const { setValue } = useFormContext();
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date) => {
    setStartDate(date);
    setValue(props.id, +date / 1000);
  };

  const DatePickerWrapperStylesLg = createGlobalStyle`

  .react-datepicker {
    font-size: 2rem;
    font-family: inherit;
  }
  .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
    width: 5rem;
    height: 3rem;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box, .react-datepicker__time-container {
    width: 150px;
    height: 200px;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
    height: 200px;
  }


`;
  interface Props {
    onClick?: () => void;
    value?: string | number;
  }
  const CustomInput = forwardRef<HTMLButtonElement, Props>(
    ({ value, onClick }, ref) => (
      <Button
        IconLeft={RiCalendar2Fill}
        IconRight={RiArrowDropDownFill}
        className="custom-button-input"
        onClick={onClick}
        ref={ref}
      >
        {value}
      </Button>
    )
  );

  // TODO: how to check if required?
  return (
    <FieldWrapper
      id={props.id}
      label={props?.label}
      rules={props?.rules}
      helperText={props?.helperText}
    >
      <DatePicker
        id={props.id}
        selected={startDate}
        onChange={(date: Date) => handleChange(date)}
        showTimeSelect
        customInput={<CustomInput />}
        wrapperClassName={props?.className}
        dateFormat="Pp"
      />
      {props?.className === 'lg' && <DatePickerWrapperStylesLg />}
    </FieldWrapper>
  );
};
