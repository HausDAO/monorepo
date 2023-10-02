import { ethers } from 'ethers';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import {
  assembleTxArgs,
  handleKeychains,
  SummonParams,
} from '@daohaus/contract-utils';
import { getNonce, toBaseUnits } from '@daohaus/utils';
import {
  Accordion,
  AccordionSummary,
  Button,
  Divider,
  ExplorerButton,
  GenericModal,
  Icon,
  IconText,
  Loader,
  Text,
  Title,
} from '@gnosis.pm/safe-react-components';
import { MultisigExecutionDetails } from '@gnosis.pm/safe-react-gateway-sdk';
import { AccordionDetails, Container, Grid } from '@material-ui/core';
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';

import InputText from '../components/InputText';
import RecordsDataTable, { Column } from '../components/RecordsDataTable';
import SwitchText from '../components/SwitchText';
import TimePicker from '../components/TimePicker';
import Toggle from '../components/Toggle';
import { VALID_NETWORKS } from '../utils/chain';
import {
  transformAddressData,
  transformMemberData,
  transformShamans,
  validateAddressData,
  validateMemberData,
  validateShamanData,
} from '../utils/common';
import {
  calculateBaalAddress,
  calculateModuleAddress,
  encodeAddModule,
  encodeSummonBaal,
  encodeSummonModule,
  pollSafeTx,
} from '../utils/txHelpers';
import { ModuleTemplate, Param } from '../utils/types';

const SHAMAN_PROPS: Array<Column> = [
  {
    field: 'shamanAddress',
    headerName: 'Shaman Address',
    flex: 1,
    sortable: false,
    placeholder: '0x123...',
  },
  {
    field: 'shamanPermissions',
    headerName: 'Permissions',
    flex: 0,
    sortable: false,
    placeholder: '3',
  },
];

const MEMBER_PROPS: Array<Column> = [
  {
    field: 'memberAddress',
    headerName: 'Address',
    flex: 1,
    sortable: false,
    placeholder: '0x123...',
  },
  {
    field: 'memberShares',
    headerName: 'Voting Stake',
    flex: 0,
    sortable: false,
    placeholder: '10',
  },
  {
    field: 'memberLoot',
    headerName: 'Non-Voting Stake',
    flex: 0,
    sortable: false,
    placeholder: '10',
  },
];

type SummonFormProps = {
  moduleTemplate: ModuleTemplate;
  onBackClicked: (sucess?: boolean, requireSignature?: boolean) => void;
};

type BaseTransaction = {
  to: string;
  value: string;
  data: string;
};

const WizardForm: React.FC<SummonFormProps> = (props: SummonFormProps) => {
  const { moduleTemplate, onBackClicked } = props;
  const [error, setError] = useState('');
  const [advancedMode, toggleAdvancedMode] = useState(false);
  const [expandedModule, toggleExpandedModule] = useState(true);
  const [expandedDAOSetup, toggleExpandedDAOSetup] = useState(true);
  const [txExplorerURI, setTxExplorerURI] = useState('');
  const [requireSignatures, setRequireSignatures] = useState(false);
  const { sdk, safe } = useSafeAppsSDK();
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      ...moduleTemplate.daoSettings?.daoName.defaultValues,
      ...moduleTemplate.daoSettings?.tokenSettings.defaultValues,
      ...moduleTemplate.daoSettings?.proposalTiming.defaultValues,
      ...moduleTemplate.daoSettings?.advancedGovernance.defaultValues,
      ...moduleTemplate.daoSettings?.shamans.defaultValues,
      ...moduleTemplate.daoSettings?.startingMembers.defaultValues,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formDisabled = isSubmitting;

  const buildDaoSummonTx = async (formValues: SummonParams) => {
    const { members } = formValues;
    if (members === '') {
      setError('You musty specify at least one dao member');
      return { txs: [] };
    }
    try {
      setError('');
      const chainId = VALID_NETWORKS[safe.chainId];
      const summonArgs = assembleTxArgs(
        {
          ...formValues,
          sponsorThreshold: formValues.sponsorThreshold
            ? toBaseUnits(formValues.sponsorThreshold)
            : '0',
          newOffering: formValues.newOffering
            ? toBaseUnits(formValues.newOffering)
            : '0',
        },
        chainId,
        safe.safeAddress
      );
      const [, , saltNonce] = summonArgs;
      const expectedBaalAddress = await calculateBaalAddress(
        chainId,
        sdk,
        saltNonce as string
      );
      const { V3_FACTORY_ADV_TOKEN } = handleKeychains(chainId);

      return {
        txs: [
          {
            to: safe.safeAddress,
            value: '0',
            data: encodeAddModule(expectedBaalAddress),
          },
          {
            to: V3_FACTORY_ADV_TOKEN,
            value: '0',
            data: encodeSummonBaal(summonArgs.map((a) => a as string)),
          },
        ],
        baalAddress: expectedBaalAddress,
      };
    } catch (error) {
      console.error(error);
      setError('An error has occurred. Please try again');
    }
    return { txs: [] };
  };

  const handleFormSubmit: SubmitHandler<SummonParams> = async (formValues) => {
    const defaultValues: { [key: string]: string } = {
      safeAddress: safe.safeAddress,
    };
    let baalTxs: Array<BaseTransaction> = [];
    if (moduleTemplate.daoSettings) {
      const daoSetup = await buildDaoSummonTx(formValues);
      baalTxs = daoSetup.txs;
      if (!baalTxs.length || !daoSetup.baalAddress) {
        return;
      }
      defaultValues['baalAddress'] = daoSetup.baalAddress;
    }

    let currentTx;
    let signaturesRequired = false;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vals = formValues as any;

      const moduleParams = [...moduleTemplate.params]
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((param) => {
          if (param.defaultValue) return defaultValues[param.defaultValue];
          const value =
            vals[param.id] === '0x0'
              ? ethers.constants.AddressZero
              : vals[param.id];
          return param.multipleValues ? vals[param.id][param.id] : value;
        });

      console.log('moduleParams', moduleParams);
      if (
        !moduleParams.every((val) => typeof val === 'boolean' || val?.length)
      ) {
        setError('Please fill all required parameters.');
        return;
      }

      const chainId = VALID_NETWORKS[safe.chainId];
      const factoryConfig = moduleTemplate.factory;
      const moduleFactory = moduleTemplate.chain[chainId].moduleFactory;
      if (!moduleFactory) {
        setError('This module is not supported in the current network.');
        return;
      }

      const initializerParams = ethers.utils.defaultAbiCoder.encode(
        factoryConfig.initializationParams,
        moduleParams
      );
      const iface = new ethers.utils.Interface(factoryConfig.singletonAbi);
      const initializer = iface.encodeFunctionData('setUp', [
        initializerParams,
      ]); // TODO: parametrize method
      const saltNonce = getNonce();

      const expectedModuleAddress = await calculateModuleAddress(
        chainId,
        moduleFactory.singletonAddress,
        initializer,
        saltNonce
      );
      const summonerIface = new ethers.utils.Interface(factoryConfig.abi);

      // Donation set to zero by default
      const donationToken = ethers.constants.AddressZero;
      const donationAmount = '0';

      setError('');
      const { safeTxHash } = await sdk.txs.send({
        txs: [
          ...baalTxs,
          {
            to: safe.safeAddress,
            value: '0',
            data: encodeAddModule(expectedModuleAddress),
          },
          {
            to: moduleFactory.address,
            value: '0',
            data: encodeSummonModule(
              summonerIface,
              'summonCookieJar', // TODO: parametrize method
              [
                moduleFactory.singletonAddress,
                initializer,
                vals['moduleDetails'] || 'New Module',
                donationToken,
                donationAmount,
                saltNonce,
              ].map((a) => a as string)
            ),
          },
        ],
      });
      setIsSubmitting(true);
      currentTx = await sdk.txs.getBySafeTxHash(safeTxHash);
      signaturesRequired =
        (currentTx.detailedExecutionInfo as MultisigExecutionDetails)
          ?.confirmationsRequired > 1;
      setRequireSignatures(signaturesRequired);
      // returns safeTxStatus
      await pollSafeTx(chainId, sdk, safeTxHash, setTxExplorerURI);
    } catch (error) {
      console.error(error);
      setError('An error has occurred. Please try again');
    } finally {
      if (currentTx) {
        methods.reset();
        onBackClicked(true, signaturesRequired);
      }
      setIsSubmitting(false);
      setTxExplorerURI('');
    }
  };

  return (
    <FormProvider {...methods}>
      <StyledHeader>
        <Title size="sm">Create a new {moduleTemplate.name} Module</Title>
        <Text size="lg">{moduleTemplate.description}</Text>
      </StyledHeader>
      <StyledHeaderOpts>
        <Button size="md" variant="bordered" onClick={() => onBackClicked()}>
          <IconText
            iconSize="sm"
            margin="xs"
            textSize="xl"
            iconType="arrowLeft"
            text="Back"
          />
        </Button>
        {moduleTemplate.daoSettings && (
          <SwitchText
            label="Advanced Mode?"
            onChange={(active: boolean) => toggleAdvancedMode(active)}
          />
        )}
      </StyledHeaderOpts>
      <Divider />
      <form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
        <Accordion
          compact
          expanded={expandedModule}
          onChange={() => toggleExpandedModule(!expandedModule)}
        >
          <AccordionSummary>
            <IconText
              iconSize="sm"
              textSize="xl"
              iconType="code"
              text="Module Setup"
            />
          </AccordionSummary>
          <AccordionDetails>
            <StyledContainer
              container
              direction="row"
              justifyContent="space-between"
              spacing={2}
            >
              <Grid container direction="column">
                <InputText
                  id="moduleDetails"
                  label="Module Name"
                  placeholder={moduleTemplate.name}
                  required
                  control={methods.control}
                  shouldUnregister={false}
                />
                <Divider />
              </Grid>

              {moduleTemplate.params
                .filter((param) => !param.defaultValue)
                .map((param: Param, idx: number) => {
                  if (param.type === 'bool') {
                    return (
                      <Grid item xs={6} key={idx}>
                        <Toggle
                          id={param.id}
                          label={param.label || param.id}
                          required
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                    );
                  }
                  if (param.multipleValues) {
                    return (
                      <Grid
                        container
                        direction="column"
                        style={{ paddingTop: '20px' }}
                        key={idx}
                      >
                        <Text size="xl" strong>
                          {param.label}
                        </Text>
                        <RecordsDataTable
                          id={param.id}
                          label={param.label || param.id}
                          description=""
                          placeholder={param.type}
                          tooltip=""
                          columns={[
                            {
                              field: param.id,
                              headerName:
                                param.headerLabel || param.type || 'Record',
                              flex: 1,
                              sortable: false,
                              placeholder: param.placeholder || param.type,
                            },
                          ]}
                          required={false}
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                          register={methods.register}
                          registerOptions={{
                            transform: transformAddressData(param.id),
                            validate: validateAddressData,
                          }}
                          setValue={methods.setValue}
                          getValues={methods.getValues}
                        />
                      </Grid>
                    );
                  }
                  return (
                    <Grid item xs={6} key={idx}>
                      <InputText
                        id={param.id}
                        label={param.label || param.id}
                        placeholder={param.placeholder || param.type}
                        required
                        control={methods.control}
                        shouldUnregister={false}
                      />
                    </Grid>
                  );
                })}
            </StyledContainer>
          </AccordionDetails>
        </Accordion>
        {moduleTemplate.daoSettings && (
          <Accordion
            compact
            expanded={expandedDAOSetup}
            onChange={() => toggleExpandedDAOSetup(!expandedDAOSetup)}
          >
            <AccordionSummary>
              <IconText
                iconSize="sm"
                textSize="xl"
                iconType="code"
                text="DAO Setup"
              />
            </AccordionSummary>
            <AccordionDetails>
              <StyledContainer
                container
                direction="column"
                justifyContent="center"
                spacing={3}
              >
                <InputText
                  id="daoName"
                  label="DAO Name"
                  placeholder="DAO Name"
                  required
                  disabled={formDisabled}
                  control={methods.control}
                  shouldUnregister={false}
                />
                <Divider />
                {(moduleTemplate.daoSettings.tokenSettings.show ||
                  advancedMode) && (
                  <>
                    <Title size="sm" withoutMargin>
                      Stake Tokens
                    </Title>
                    <Text size="md">
                      The Stake tokens represent both voting weight and economic
                      stake within the DAO.
                    </Text>
                    <StyledPairInputContainer
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item xs={5}>
                        <InputText
                          id="tokenName"
                          label="Voting Token Name"
                          placeholder="Voting Stake"
                          required
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <InputText
                          id="tokenSymbol"
                          label="Voting Token Symbol"
                          placeholder="vSTK"
                          required
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                    </StyledPairInputContainer>
                    <StyledPairInputContainer
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item xs={5}>
                        <InputText
                          id="lootTokenName"
                          label="Non-Voting Token Name"
                          placeholder="Non-Voting Stake"
                          required
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <InputText
                          id="lootTokenSymbol"
                          label="Non-Voting Token Symbol"
                          placeholder="nvSTK"
                          required
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                    </StyledPairInputContainer>
                    <StyledPairInputContainer
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item xs={5}>
                        <Toggle
                          id="votingTransferable"
                          label="Voting Stake"
                          required
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Toggle
                          id="nvTransferable"
                          label="Non-Voting Stake"
                          required
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                    </StyledPairInputContainer>
                    <Divider />
                  </>
                )}
                {(moduleTemplate.daoSettings.proposalTiming.show ||
                  advancedMode) && (
                  <>
                    <Title size="sm" withoutMargin>
                      Proposal Timing
                    </Title>
                    <Text size="md">
                      Define your timing for voting and grace periods. These
                      settings can be updated later through a proposal.
                    </Text>
                    <StyledPairInputContainer
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item xs={5}>
                        <TimePicker
                          id="votingPeriodInSeconds"
                          label="Voting Period"
                          defaultValue="days"
                          placeholder="0"
                          required
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                          register={methods.register}
                          setValue={methods.setValue}
                          getValues={methods.getValues}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TimePicker
                          id="gracePeriodInSeconds"
                          label="Grace Period"
                          defaultValue="days"
                          placeholder="0"
                          required
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                          register={methods.register}
                          setValue={methods.setValue}
                          getValues={methods.getValues}
                        />
                      </Grid>
                    </StyledPairInputContainer>
                    <Divider />
                  </>
                )}
                {(moduleTemplate.daoSettings.advancedGovernance.show ||
                  advancedMode) && (
                  <>
                    <Title size="sm" withoutMargin>
                      Advanced Governance
                    </Title>
                    <Text size="md">
                      Customize advanced governance features.
                    </Text>
                    <StyledPairInputContainer
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item xs={5}>
                        <InputText
                          id="quorum"
                          label="Quorum %"
                          placeholder="0"
                          required
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <InputText
                          id="minRetention"
                          label="Min. Retention %"
                          placeholder="66"
                          required
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                    </StyledPairInputContainer>
                    <StyledPairInputContainer
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item xs={5}>
                        <InputText
                          id="sponsorThreshold"
                          label="Sponsor Threshold"
                          placeholder="0"
                          required
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <InputText
                          id="newOffering"
                          label="New Offering (ETH)"
                          placeholder="0"
                          required
                          disabled={formDisabled}
                          control={methods.control}
                          shouldUnregister={false}
                        />
                      </Grid>
                    </StyledPairInputContainer>
                    <Divider />
                  </>
                )}

                {(moduleTemplate.daoSettings.shamans.show || advancedMode) && (
                  <>
                    <Title size="sm" withoutMargin>
                      Starting Shamans
                    </Title>
                    <Text size="md">
                      Shamans are powerful and have control over key components
                      of the DAO. Use caution in the spirit world.
                    </Text>
                    <RecordsDataTable
                      id="shamans"
                      label="Shamans"
                      description="Addresses & Permissions"
                      placeholder="0xbeef 3"
                      tooltip="Input Shaman list with contract address and permission level per row using spaces. E.g. 0xbeef 3"
                      columns={SHAMAN_PROPS}
                      required={false}
                      disabled={formDisabled}
                      control={methods.control}
                      shouldUnregister={false}
                      register={methods.register}
                      registerOptions={{
                        transform: transformShamans,
                        validate: validateShamanData,
                      }}
                      setValue={methods.setValue}
                      getValues={methods.getValues}
                    />
                    <Divider />
                  </>
                )}

                {(moduleTemplate.daoSettings.startingMembers.show ||
                  advancedMode) && (
                  <>
                    <Title size="sm" withoutMargin>
                      Starting Members
                    </Title>
                    <Text size="md">
                      You must have at least one member to summon. Add other
                      summoning members as desired. Members can be added later
                      through a proposal.
                    </Text>
                    <RecordsDataTable
                      id="members"
                      label="Members"
                      description="Addresses & Stake Amounts"
                      placeholder="0xbeef 10 10"
                      tooltip="Input member list with member address, voting stake amount, and no-voting stake amount per row using spaces. E.g. 0xdeed 10 10 \n0xbeef 0 10"
                      columns={MEMBER_PROPS}
                      required
                      disabled={formDisabled}
                      control={methods.control}
                      shouldUnregister={false}
                      register={methods.register}
                      registerOptions={{
                        transform: transformMemberData,
                        validate: validateMemberData,
                      }}
                      setValue={methods.setValue}
                      getValues={methods.getValues}
                    />
                  </>
                )}
              </StyledContainer>
            </AccordionDetails>
          </Accordion>
        )}
        <Grid container direction="column" justifyContent="center">
          <Divider />
          <Button size="lg" textSize="xl" color="primary" type="submit">
            SUMMON MODULE
          </Button>
        </Grid>
      </form>
      {isSubmitting && (
        <GenericModal
          onClose={() => setIsSubmitting(false)}
          title="Summoning Module"
          body={
            <LoaderContainer>
              <Loader size="md" />
              {txExplorerURI && (
                <>
                  <ExplorerButton
                    explorerUrl={() => ({
                      alt: 'Summoner Tx Hash',
                      url: txExplorerURI,
                    })}
                  />
                  <Text size="md">View Tx in Explorer</Text>
                </>
              )}
              {requireSignatures && (
                <Text size="md" strong>
                  Tx will be queued for signatures confirmation
                </Text>
              )}
            </LoaderContainer>
          }
        />
      )}
      {error && (
        <StyledErrorContainer>
          <Icon type="error" size="sm" color="error" />
          <Text size="lg" color="error" strong>
            {error}
          </Text>
        </StyledErrorContainer>
      )}
    </FormProvider>
  );
};

const StyledContainer = styled(Grid)`
  padding: 10px 30px 45px 30px;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const StyledHeaderOpts = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledPairInputContainer = styled(Grid)`
  margin-top: 20px;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const StyledErrorContainer = styled(Container)`
  && {
    display: flex;
    justify-content: center;
  }
`;

export default WizardForm;
