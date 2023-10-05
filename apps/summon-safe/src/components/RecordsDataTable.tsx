import React, { useCallback, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormRegister,
} from 'react-hook-form';
import { Container, Grid } from '@material-ui/core';
import { GridDensityTypes, GridRowsProp } from '@mui/x-data-grid';
import {
  Button,
  DataTable,
  Icon,
  Switch,
  Text,
} from '@gnosis.pm/safe-react-components';
import styled from 'styled-components';

import { StyledTextFieldInput as InputText } from './InputText';

export type Column = {
  field: string;
  headerName: string;
  flex: number;
  sortable: boolean;
  placeholder: string;
};

interface RecordsProps {
  id: string;
  label: string;
  description: string;
  placeholder: string;
  tooltip: string;
  columns: Array<Column>;
  required?: boolean;
  disabled?: boolean;
  shouldUnregister: boolean;
  control: Control;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  registerOptions: {
    transform: (rawData: string) => Record<string, string[]> | string;
    validate: (rawData: Record<string, string[]>) => boolean | string;
  };
}

const RecordsDataTable: React.FC<RecordsProps> = (props: RecordsProps) => {
  const {
    id,
    label,
    description,
    placeholder,
    tooltip,
    columns,
    required,
    disabled,
    shouldUnregister,
    control,
    register,
    registerOptions,
    setValue,
  } = props;
  const gridSize = columns.length % 2;
  const [record, setRecord] = useState<Array<string>>(Array(columns.length));
  const [data, setData] = useState<Array<GridRowsProp>>([]);
  const [hardMode, setHardMode] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    register(id);
  }, [id, register]);

  const clearData = useCallback(() => {
    setValue(id, '');
    setValue(`${id}_input`, '');
    setData([]);
    setError('');
  }, [id, setValue]);

  useEffect(() => {
    clearData();
  }, [hardMode, clearData]);

  const updateInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    record[idx] = e.target.value;
    setRecord([...record]);
  };

  const formatData = (rawData: string) => {
    const transformedData = registerOptions.transform(rawData);
    const valid = registerOptions.validate(
      transformedData as Record<string, string[]>
    );
    if (valid === true) {
      setValue(id, transformedData);
      setError('');
      return;
    }
    setError(valid as string);
  };

  const addRecord = () => {
    const newRecord: { [id: string]: string | number } = {
      id: data.length,
    };
    record.forEach((value: string, i: number) => {
      newRecord[columns[i].field] = value;
    });
    const updatedDataset = [...data, newRecord];
    setData(updatedDataset as GridRowsProp[]);
    formatData(
      updatedDataset.map((v) => Object.values(v).slice(1).join(' ')).join('\n')
    );
    setRecord(Array(columns.length));
  };

  const isDisabled = () => {
    return [...record].some((data: string | undefined) => !data);
  };

  const updateDataFromTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    field.onChange(event);
    formatData(event.target.value);
  };

  return (
    <StyledContainer container>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Switch key="hardMode" checked={hardMode} onChange={setHardMode} />
        <Text size="md">{`${hardMode ? 'Bulk' : 'Easy'} Mode`}</Text>
      </Grid>
      {hardMode ? (
        <Controller
          name={`${id}_input` as string}
          control={control}
          defaultValue={''}
          shouldUnregister={shouldUnregister}
          rules={{
            required: {
              value: required !== undefined ? hardMode && required : false,
              message: 'Required',
            },
          }}
          render={({ field, fieldState }) => (
            <Grid container direction="row">
              <StyledFlexContainer>
                <Text size="lg">{description}</Text>
                <StyledIcon
                  type="info"
                  size="sm"
                  color="secondary"
                  tooltip={tooltip}
                />
              </StyledFlexContainer>
              <InputText
                multiline
                minRows={3}
                disabled={disabled}
                label={label}
                placeholder={placeholder}
                autoComplete="off"
                name={field.name}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => updateDataFromTextField(event, field)}
                onBlur={field.onBlur}
                value={field.value}
                error={error || fieldState.error?.message}
                required={hardMode && required}
              />
            </Grid>
          )}
        />
      ) : (
        <>
          <Grid container direction="column">
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              {columns.map((column, idx) => (
                <Grid
                  key={`${id}_${column.field}`}
                  item
                  xs={columns.length === 1 ? 12 : gridSize === 0 ? 6 : 4}
                >
                  <InputText
                    id={column.field}
                    name={column.field}
                    label={column.headerName}
                    placeholder={column.placeholder}
                    required
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => updateInput(e, idx)}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              size="md"
              textSize="md"
              color="primary"
              onClick={addRecord}
              disabled={isDisabled()}
            >
              Add
            </Button>
          </Grid>
          <StyledTableContainer container direction="column">
            <DataTable
              columns={columns}
              rows={data}
              hideFooter
              density={GridDensityTypes.Comfortable}
              disableColumnFilter
            />
            {data.length ? (
              <Button size="md" textSize="md" color="error" onClick={clearData}>
                Clear Data
              </Button>
            ) : null}
            {error && (
              <StyledFlexContainer>
                <StyledIcon type="error" size="sm" color="error" />
                <Text size="lg" color="error" strong>
                  {error}
                </Text>
              </StyledFlexContainer>
            )}
          </StyledTableContainer>
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)`
  margin-top: 20px;
`;

const StyledTableContainer = styled(Grid)`
  min-height: 300px;
`;

const StyledFlexContainer = styled(Container)`
  && {
    display: flex;
    padding: 0;
    margin-bottom: 5px;
  }
`;

const StyledIcon = styled(Icon)`
  margin-left: 5px;
`;

export default RecordsDataTable;
