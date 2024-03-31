import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FieldValues, RegisterOptions } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { JsonFragment } from '@ethersproject/abi';
import { RiAddCircleLine, RiErrorWarningLine } from 'react-icons/ri';

import { FormBuilderFactory, useFormBuilder } from '@daohaus/form-builder';
import { Keychain } from '@daohaus/keychain-utils';
import { useDaoData } from '@daohaus/moloch-v3-hooks';
import {
  cacheABI,
  fetchABI,
  getCode,
  txActionToMetaTx,
} from '@daohaus/tx-builder';
import {
  AddressDisplay,
  Bold,
  Buildable,
  Button,
  Card,
  DataSm,
  ErrorMessage,
  ErrorText,
  Field,
  Icon,
  OptionType,
  ParXs,
  WarningMessage,
} from '@daohaus/ui';
import {
  ABI,
  FieldLegoBase,
  ignoreEmptyVal,
  isEthAddress,
  isJSON,
  isNumberish,
  isObject,
  isString,
  JsonFragmentType,
  LookupType,
  ValidateField,
} from '@daohaus/utils';
import { useCurrentDao } from '@daohaus/moloch-v3-hooks';

import { CollapsibleFormSegment } from '../customLayouts/CollapsibleFormSegment';

const MainContainer = styled.div`
  display: block;
`;

const WarningContainer = styled(Card)`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.warning.step3};
  border-color: ${({ theme }) => theme.warning.step7};
`;

const StyledParXs = styled(ParXs)`
  color: ${({ theme }) => theme.warning.step12};
`;

const WarningIcon = styled(RiErrorWarningLine)`
  color: ${({ theme }) => theme.warning.step9};
  height: 2.5rem;
  width: 2.5rem;
`;

const IconContainer = styled.div`
  margin-right: 1rem;
`;

const ActionsContainer = styled.div``;

const ActionContainer = styled.div`
  margin: 2rem 0;
`;

const REGEX_ARRAY_TYPE = /\[(([1-9]*)([0-9]+))?\]/g;

const mapFieldToArgType = (fieldType: string) => {
  if (fieldType.includes('address')) return 'ethAddress';
  if (fieldType.includes('int') || fieldType === 'bool') return 'number';
  if (fieldType === 'tuple') return 'object';
  return undefined; // means plain string for other cases
};

const createActionField = (
  actionId: string,
  input: JsonFragmentType
): FieldLegoBase<LookupType> => {
  if (!input.name || !input.type) return;
  const isArray = input.type?.match(REGEX_ARRAY_TYPE);
  const inputType = input.type === 'tuple' || isArray ? 'textarea' : 'input';
  const newRules: RegisterOptions = {
    required: 'Value is required',
  };
  if (input.type === 'tuple') {
    newRules['setValueAs'] = (val: string) =>
      isObject(val) && typeof val === 'string' ? JSON.parse(val) : val;
    newRules['validate'] = (val) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ignoreEmptyVal(val, (val: any) => ValidateField.object(val));
  }
  const fieldBase = {
    id: `tx.${actionId}.fields.${input.name}`,
    type: inputType,
    label: `${input.name} (${input.type})`,
    address: input.type === 'address',
    number: input.type.includes('int'),
    rules: newRules,
  };
  if (isArray) {
    const dimensions = input.type?.match(REGEX_ARRAY_TYPE);
    return {
      ...fieldBase,
      info:
        dimensions && dimensions.length > 1
          ? 'Multidimensional arguments should be separated by carriage return (Rows) and commas (Columns)'
          : 'Arguments should be separated by carriage return (Enter)',
      rules: {
        ...newRules,
        setValueAs: (response: string | Array<unknown> | undefined) => {
          if (typeof response === 'object' && response.length) return response;
          if (!dimensions || !isString(response) || response === '') return '';
          let fieldValues: Array<unknown> = [];
          for (let i = 0; i < dimensions.length; i++) {
            fieldValues =
              i === 0
                ? response
                    .split(/[\n]/)
                    .map((str) => str.trim())
                    .filter(Boolean)
                : fieldValues.map((dim) => {
                    return (dim as string)
                      .split(/[\s|,]/)
                      .map((str) => str.trim())
                      .filter(Boolean);
                  });
          }
          return fieldValues;
        },
        validate: (data: Array<string> | '') => {
          if (!dimensions || data === '') return true;
          if (dimensions[0] !== '[]') {
            const totalItems = dimensions
              .map((dim) => Number(dim.substring(1, dim.length - 1)))
              .reduce((aggr, dim) => aggr * dim, 1);
            if (totalItems !== data.flatMap((v) => v).length) {
              return 'Args size mismatch. Check field type.';
            }
          }
          if (
            data
              .flatMap((v) => v)
              .some((value) => {
                if (input.type?.includes('address')) {
                  return !isEthAddress(value);
                }
                if (input.type?.includes('int')) {
                  return !isNumberish(value);
                }
                return false;
              })
          ) {
            return 'Incorrect formatting. Check field type.';
          }
          return true;
        },
      },
    };
  }
  return {
    ...fieldBase,
    expectType: mapFieldToArgType(input.type || ''),
  };
};

const Action = ({
  actionId,
  index,
}: // onDelete, // TODO: Enable `Delete Action Button`
{
  actionId: string;
  index: number;
  onDelete?: (actionId: string) => void;
}) => {
  const contractAddressFieldId = `tx.${actionId}.to`;
  const abiFieldId = `tx.${actionId}.abi`;
  const valueFieldId = `tx.${actionId}.value`;
  const dataFieldId = `tx.${actionId}.data`;
  const customDataToggleFieldId = `tx.${actionId}.toggleCustomData`;
  const customDataFieldId = `tx.${actionId}.customData`;
  const contractMethodFieldId = `tx.${actionId}.contractMethod`;
  // const deletedFlagId = `tx.${actionId}.deleted`; // TODO: Enable `Delete Action Button`

  const {
    setValue,
    // reset, // TODO: Enable `Delete Action Button`
    resetField,
    watch,
  } = useFormBuilder();
  const { daoChain } = useCurrentDao();
  const [loading, setLoading] = useState(false);
  const [actionTitle, setActionTitle] = useState(`Action ${index}`);
  const [isEOA, setEOA] = useState<boolean>(false);
  const [abiError, setAbiError] = useState<
    ErrorMessage | WarningMessage | undefined
  >();
  const [methods, setMethods] = useState<Array<OptionType>>([]);
  const [selectedMethod, setSelectedMethod] = useState<JsonFragment>();
  const [argFieldsIds, setArgFieldsIds] = useState<Array<string>>([]);
  const [noArgs, toggleNoArgs] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string>('');

  const [
    contractAddress,
    contractAbi,
    actionValue,
    actionData,
    customDataToggle,
    customData,
    abiMethod,
  ] = watch([
    contractAddressFieldId,
    abiFieldId,
    valueFieldId,
    dataFieldId,
    customDataToggleFieldId,
    customDataFieldId,
    contractMethodFieldId,
  ]);

  const values = watch();

  const extractContractMethods = useCallback(
    (abi: ABI) => {
      setMethods([]);
      const callableMethods = abi.filter(
        (r: JsonFragment) =>
          r.type === 'function' &&
          r.stateMutability &&
          ['payable', 'nonpayable'].includes(r.stateMutability)
      );
      if (callableMethods.length) {
        setMethods(
          callableMethods.map((m: JsonFragment) => {
            const signature = `${m.name}(${m.inputs?.reduce(
              (a, b, i) => `${a}${i > 0 ? ',' : ''}${b.type}`,
              ''
            )})`;
            return {
              name: signature,
              value: JSON.stringify(m),
            };
          })
        );
        return;
      }
      setAbiError({
        type: 'error',
        message: 'Not a valid ABI',
      });
    },
    [setMethods]
  );

  const fetchContractAbi = useCallback(
    async (address: string, fallbackAbi?: ABI) => {
      setLoading(true);
      const chainId = daoChain as keyof Keychain;
      const code = await getCode({
        contractAddress: address,
        chainId,
      });
      if (code === '0x') {
        setEOA(true);
        setActionTitle('Action: Native Transfer');
        setValue(abiFieldId, '');
        setValue(contractMethodFieldId, '');
        setLoading(false);
        return;
      }
      setEOA(false);
      const fetchedAbi = await fetchABI({
        contractAddress: address,
        chainId: daoChain as keyof Keychain,
      });

      if (!fetchedAbi) {
        setAbiError({
          type: 'warning',
          message:
            'Contract not verified. You can manually paste the ABI but proceed with extreme caution!',
        });
      }
      // allow ABI to be overridden by the user
      if (
        contractAbi &&
        contractAbi !== '' &&
        contractAbi !== JSON.stringify(fetchedAbi)
      ) {
        setValue(abiFieldId, contractAbi);
        extractContractMethods(JSON.parse(contractAbi));
        setLoading(false);
        return;
      }
      if (!fetchedAbi && fallbackAbi) {
        cacheABI({
          address,
          chainId,
          abi: fallbackAbi,
        });
      }
      const abi = fetchedAbi || fallbackAbi;
      if (abi) {
        setValue(abiFieldId, JSON.stringify(abi));
        extractContractMethods(abi);
        setLoading(false);
        return;
      }
    },
    [
      abiFieldId,
      contractAbi,
      contractMethodFieldId,
      daoChain,
      extractContractMethods,
      setEOA,
      setValue,
    ]
  );

  const resetEncodedAction = useCallback(() => {
    if (values.tx?.[actionId]?.data) {
      setValue(dataFieldId, '0x');
      setValue(`tx.${actionId}.operation`, '0');
    }
  }, [actionId, dataFieldId, values, setValue]);

  const encodeAction = useCallback(
    (argValues?: FieldValues, oldData?: string) => {
      setActionError('');
      try {
        const argFields = argFieldsIds.map((id) =>
          argValues ? argValues[id.split('.').pop() || ''] : ''
        );
        const metaTx = !selectedMethod?.name
          ? {
              to: contractAddress,
              data: '0x',
              value: actionValue,
              operation: 0,
            }
          : txActionToMetaTx({
              abi: JSON.parse(contractAbi) as ABI,
              method: selectedMethod.name,
              address: contractAddress,
              args: argFields,
              value: actionValue,
              operation: 0,
            });
        if (oldData !== metaTx.data) {
          setValue(dataFieldId, metaTx.data);
          setValue(`tx.${actionId}.operation`, metaTx.operation);
        }
      } catch (error) {
        setActionError((error as Error).message);
      }
    },
    [
      actionId,
      dataFieldId,
      contractAddress,
      contractAbi,
      actionValue,
      selectedMethod,
      argFieldsIds,
      setActionError,
      setValue,
    ]
  );

  // TODO: Enable `Delete Action Button`
  // const removeAction = useCallback(() => {
  //   reset({
  //     tx: {
  //       [actionId]: values.tx[actionId],
  //     },
  //   });
  //   setValue(deletedFlagId, true);
  //   onDelete?.(actionId);
  // }, [actionId, deletedFlagId, onDelete, reset, setValue, values]);

  useEffect(() => {
    setActionTitle(`Action ${index}`);
    setAbiError(undefined);
    setMethods([]);
    if (selectedMethod) {
      resetEncodedAction();
    }
    if ((contractAbi as string)?.length && !isJSON(contractAbi)) {
      setAbiError({
        type: 'error',
        message: 'Not a valid ABI',
      });
      return;
    }
    if (isEthAddress(contractAddress)) {
      fetchContractAbi(
        contractAddress,
        isJSON(contractAbi) ? (JSON.parse(contractAbi) as ABI) : undefined
      );
    }
  }, [contractAddress, contractAbi, fetchContractAbi]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (abiMethod) {
      if (argFieldsIds?.length) {
        argFieldsIds?.forEach((a) => resetField(a));
      }
      const method = JSON.parse(abiMethod) as JsonFragment;
      setSelectedMethod(method);
      setArgFieldsIds(
        method?.inputs?.length
          ? method.inputs.map((input) => `tx.${actionId}.fields.${input.name}`)
          : []
      );
      setActionTitle(`Action: ${method?.name || 'Native Transfer'}`);
      toggleNoArgs(!method?.inputs?.length);
      return;
    }
    setSelectedMethod(undefined);
    setArgFieldsIds([]);
  }, [abiMethod]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isEOA) {
      setValue(dataFieldId, '0x');
      setValue(`tx.${actionId}.operation`, '0');
    }
  }, [isEOA]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (customDataToggle && customData) {
      setValue(dataFieldId, customData);
      setValue(`tx.${actionId}.operation`, 0);
    }
  }, [customDataToggle, customData]);

  useEffect(() => {
    if (noArgs) {
      encodeAction({ ...values.tx?.[actionId]?.fields });
    }
  }, [noArgs]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      selectedMethod &&
      values.tx?.[actionId]?.contractMethod &&
      argFieldsIds.length &&
      argFieldsIds
        .map((id) => id.split('.').reduce((data, curr) => data[curr], values))
        .every(
          (arg: unknown) =>
            (arg as string)?.length > 0 || typeof arg === 'object'
        )
    ) {
      encodeAction(
        { ...values.tx?.[actionId]?.fields },
        values.tx?.[actionId]?.data
      );
    }
  }, [encodeAction, values]); // eslint-disable-line react-hooks/exhaustive-deps

  const txFields: FieldLegoBase<LookupType>[] = [
    {
      id: contractAddressFieldId,
      type: 'input',
      label: 'Address',
      placeholder: '0x1234...5678',
      rules: {
        required: 'Address is required',
      },
      helperText: loading ? 'Fetching Contract ABI...' : '',
    },
    {
      id: abiFieldId,
      disabled: isEOA,
      type: 'textarea',
      label: 'ABI',
      placeholder: '[{...}]',
      error: abiError?.type === 'error' && abiError,
      warning: abiError?.type === 'warning' && abiError,
      rules: {
        required: !isEOA ? 'ABI is required' : false,
      },
    },
    {
      id: valueFieldId,
      type: 'input',
      label: 'Value',
      defaultValue: '0',
      placeholder: '0',
      rules: {
        required: 'Value is required',
      },
    },
    {
      id: `${customDataToggleFieldId}Wrapper`,
      type: 'switch',
      label: 'Custom data?',
      disabled: isEOA,
      switches: [
        {
          id: customDataToggleFieldId,
          fieldLabel: '',
          defaultChecked: false,
        },
      ],
    },
    {
      id: customDataFieldId,
      type: 'textarea',
      label: 'Data (Hex encoded)',
      hidden: !customDataToggle,
      placeholder: '0x1234...5678',
      rules: {
        required: customDataToggle ? 'Data is required' : false,
      },
      defaultValue: '0x',
    },
    {
      id: contractMethodFieldId,
      disabled: isEOA,
      hidden: customDataToggle,
      type: 'select',
      label: 'Contract Function',
      options: methods,
      placeholder: 'Select Function',
      rules: {
        required:
          !isEOA && !customDataToggle ? 'Contract function is required' : false,
      },
      defaultValue: selectedMethod?.name,
    },
    ...(selectedMethod?.inputs?.length
      ? selectedMethod.inputs.map((input) => createActionField(actionId, input))
      : []),
    ...['data', 'operation', 'deleted'].map((arg) => ({
      id: `tx.${actionId}.${arg}`,
      type: 'input',
      hidden: true,
    })),
    {
      id: `tx.${actionId}.index`,
      type: 'input',
      hidden: true,
      value: index,
    },
  ];

  return (
    <CollapsibleFormSegment
      collapsible
      defaultOpen
      title={actionTitle}
      // TODO: Enable `Delete Action Button`
      // actionButton={
      //   <IconButton
      //     Icon={HiOutlineTrash}
      //     color="secondary"
      //     variant="solid"
      //     size="md"
      //     disabled={!onDelete}
      //     onClick={() => removeAction()}
      //   />
      // }
      formArea={txFields.map((field) => (
        <FormBuilderFactory key={field.id} field={field} />
      ))}
      infoArea={
        actionData?.length > 2 && (
          <div>
            <DataSm className="space">
              <Bold>RAW HEX DATA</Bold>
            </DataSm>
            <AddressDisplay
              className="space"
              address={actionData}
              copy
              truncate
              txHash
            />
          </div>
        )
      }
      error={actionError && <ErrorText>{actionError}</ErrorText>}
    />
  );
};

type IAction = {
  id: string;
};

export const MultisendActions = (props: Buildable<Field>) => {
  const location = useLocation();
  const { dao } = useDaoData();
  const [actions, setActions] = useState<Array<IAction>>([
    {
      id: uuidv4().substring(0, 8),
    },
  ]);

  const sidecarSafeAddress = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const legoId = params.get('formLego');
    if (legoId !== 'MULTICALL_SIDECAR') return;
    const defaultValues = params.get('defaultValues');
    if (!defaultValues) return;
    const data = JSON.parse(defaultValues);
    return data.safeAddress;
  }, [location]);

  const vaultMessage = useMemo(() => {
    const vault = dao?.vaults.find((v) => v.safeAddress === sidecarSafeAddress);
    if (vault) {
      return `Proposal Actions will interact with ${vault.name} Vault: ${sidecarSafeAddress}`;
    }
    return `Vault ${sidecarSafeAddress} is not registered for this DAO. Proceed with caution as transaction may fail.`;
  }, [dao, sidecarSafeAddress]);

  const addAction = () => {
    setActions([
      ...actions,
      {
        id: uuidv4().substring(0, 8),
      },
    ]);
  };

  const onDelete = (actionId: string) => {
    const indexAt = actions.findIndex((a) => a.id === actionId);
    setActions(actions.splice(indexAt - 1, 1));
  };

  return (
    <MainContainer>
      {dao && sidecarSafeAddress && (
        <WarningContainer className="container">
          <IconContainer>
            <Icon label="Warning">
              <WarningIcon />
            </Icon>
          </IconContainer>
          <div>
            <StyledParXs>{vaultMessage}</StyledParXs>
          </div>
        </WarningContainer>
      )}
      <ActionsContainer>
        {actions.map((action: IAction, index: number) => (
          <ActionContainer key={action.id}>
            <Action
              actionId={action.id}
              index={index}
              onDelete={actions.length > 1 ? onDelete : undefined}
            />
          </ActionContainer>
        ))}
      </ActionsContainer>
      <Button onClick={addAction} IconLeft={RiAddCircleLine} variant="ghost">
        Add Another Action
      </Button>
    </MainContainer>
  );
};
