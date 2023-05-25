import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { DecodedMultiTX } from '@daohaus/tx-builder';
import { useEffect, useState } from 'react';
import {
  ProposalDataPoint,
  formatAddtionalDataPoints,
} from '../../utils/proposalDetailsHelpers';
import { DataIndicator } from '@daohaus/ui';
import { DataContainer } from './ProposalDetails.styles';
import { useDaoData } from '@daohaus/moloch-v3-hooks';
import { MemberDataPoint } from './MemberDataPoint';

type ProposalAddtionalDetailsProps = {
  daoChain: string;
  daoId: string;
  proposal: MolochV3Proposal;
  includeLinks: boolean;
  actionData?: DecodedMultiTX | null;
};

export const ProposalAddtionalDetails = ({
  daoChain,
  daoId,
  proposal,
  includeLinks = false,
  actionData,
}: ProposalAddtionalDetailsProps) => {
  const { dao } = useDaoData();

  const [addtionalData, setAddtionalData] = useState<ProposalDataPoint[]>();

  useEffect(() => {
    const fetchData = async () => {
      if (!proposal || !actionData || !dao) return;

      const addData = await formatAddtionalDataPoints(
        proposal,
        actionData,
        dao,
        daoChain
      );

      setAddtionalData(addData);
    };

    fetchData();
  }, [actionData, proposal, dao, daoChain]);

  if (!addtionalData) return null;

  return (
    <DataContainer>
      {addtionalData.map((dataPoint) => {
        if (dataPoint.displayType === 'data') {
          return (
            <DataIndicator
              label={dataPoint.label}
              data={dataPoint.value}
              size="sm"
              key={dataPoint.label}
            />
          );
        }

        if (dataPoint.displayType === 'member') {
          return (
            <MemberDataPoint
              key={dataPoint.label}
              daoId={daoId}
              daoChain={daoChain}
              dataPoint={dataPoint}
              includeLinks={includeLinks}
            />
          );
        }

        return null;
      })}
    </DataContainer>
  );
};
