import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Container, Grid } from '@material-ui/core';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { MultisigExecutionDetails } from '@gnosis.pm/safe-react-gateway-sdk';
import {
  Button,
  Divider,
  ExplorerButton,
  GenericModal,
  Icon,
  Loader,
  Text,
  Title,
} from '@gnosis.pm/safe-react-components';
import styled from 'styled-components';

import InputText from '../components/InputText';
import RecordsDataTable, { Column } from '../components/RecordsDataTable';
import TimePicker from '../components/TimePicker';
import Toggle from '../components/Toggle';

import { FormValues } from '../types/form';
import { VALID_NETWORKS } from '../utils/chain';
import {
  transformMemberData,
  transformShamans,
  validateMemberData,
  validateShamanData,
} from '../utils/common';
import { assembleTxArgs, handleKeychains } from '../utils/summonTx';
import {
  calculateBaalAddress,
  encodeAddModule,
  encodeSummonBaal,
  pollSafeTx,
} from '../utils/txHelpers';

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
  resetTab: () => void;
};

const SummonForm: React.FC<SummonFormProps> = (props: SummonFormProps) => {
  const { resetTab } = props;
  const [error, setError] = useState('');
  const [txExplorerURI, setTxExplorerURI] = useState('');
  const [requireSignatures, setRequireSignatures] = useState(false);
  const { sdk, safe } = useSafeAppsSDK();
  // const { sdk, safe, connected } = useSafeAppsSDK()
  const methods = useForm({ mode: 'onTouched' });
  // const {
  //   formState: { isValid },
  // } = methods
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const submitDisabled = !isValid || isSubmitting || !connected
  const formDisabled = isSubmitting;

  const handleFormSubmit: SubmitHandler<FormValues> = async (formValues) => {
    const { members } = formValues;
    if (members === '') {
      setError('You musty specify at least one dao member');
      return;
    }
    let currentTx;
    try {
      setError('');
      const chainId = VALID_NETWORKS[safe.chainId];
      const summonArgs = assembleTxArgs(formValues, chainId, safe.safeAddress);
      const [, , saltNonce] = summonArgs;
      const expectedBaalAddress = await calculateBaalAddress(
        chainId,
        sdk,
        saltNonce as string
      );
      const { V3_FACTORY } = handleKeychains(chainId);

      const { safeTxHash } = await sdk.txs.send({
        txs: [
          {
            to: safe.safeAddress,
            value: '0',
            data: encodeAddModule(expectedBaalAddress),
          },
          {
            to: V3_FACTORY,
            value: '0',
            data: encodeSummonBaal(summonArgs.map((a) => a as string)),
          },
        ],
      });
      currentTx = await sdk.txs.getBySafeTxHash(safeTxHash);
      if (
        (currentTx.detailedExecutionInfo as MultisigExecutionDetails)
          ?.confirmationsRequired > 1
      ) {
        setRequireSignatures(true);
      }
      setIsSubmitting(true);
      // returns safeTxStatus
      await pollSafeTx(chainId, sdk, safeTxHash, setTxExplorerURI);
    } catch (error) {
      console.error(error);
      setError('An error has occurred. Please try again');
    } finally {
      if (currentTx) {
        methods.reset();
        resetTab();
      }
      setIsSubmitting(false);
      setTxExplorerURI('');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
        <Title size="md">Summon a Baal</Title>
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

          <Title size="sm" withoutMargin>
            Stake Tokens
          </Title>
          <Text size="md">
            The Stake tokens represent both voting weight and economic stake
            within the DAO.
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
                id="nonVotingTransferable"
                label="Non-Voting Stake"
                required
                control={methods.control}
                shouldUnregister={false}
              />
            </Grid>
          </StyledPairInputContainer>
          <Divider />

          <Title size="sm" withoutMargin>
            Proposal Timing
          </Title>
          <Text size="md">
            Define your timing for voting and grace periods. These settings can
            be updated later through a proposal.
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

          <Title size="sm" withoutMargin>
            Advanced Governance
          </Title>
          <Text size="md">Customize advanced governance features.</Text>
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

          <Title size="sm" withoutMargin>
            Starting Shamans
          </Title>
          <Text size="md">
            Shamans are powerful and have control over key components of the
            DAO. Use caution in the spirit world.
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

          <Title size="sm" withoutMargin>
            Starting Members
          </Title>
          <Text size="md">
            You must have at least one member to summon. Add other summoning
            members as desired. Members can be added later through a proposal.
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
          <Divider />

          <Button size="lg" textSize="xl" color="primary" type="submit">
            SUMMON DAO
          </Button>
        </StyledContainer>
      </form>
      {isSubmitting && (
        <GenericModal
          onClose={() => setIsSubmitting(false)}
          title="Summoning DAO"
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
  padding: 38px 30px 45px 30px;
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

export default SummonForm;
