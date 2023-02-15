import React, { useMemo } from 'react';

import { DaoSafe, MolochV3Dao } from '@daohaus/moloch-v3-data';
import {
  AddressDisplay,
  Bold,
  DataIndicator,
  H4,
  Link,
  ParXs,
  Tag,
} from '@daohaus/ui';
import { formatValueTo, generateGnosisUiLink } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';
import { DataGrid } from '../Layout';
import {
  SafeCardHeader,
  SafeContainer,
  SafeOverviewCard,
  TagSection,
} from './SafeCard.styles';
import { SafeActionMenu } from './SafeActionMenu';

type SafeCardProps = {
  dao: MolochV3Dao;
  safe: DaoSafe;
  daoChain: string;
  includeLinks?: boolean;
};

export const SafeCard = ({
  dao,
  safe,
  daoChain,
  includeLinks = false,
}: SafeCardProps) => {
  const isTreasury = useMemo(() => {
    return safe.safeAddress === dao.safeAddress;
  }, [safe, dao]);

  return (
    <SafeContainer>
      <SafeOverviewCard>
        <SafeCardHeader>
          <div>
            <H4>{safe.name}</H4>
            <TagSection>
              <AddressDisplay
                address={safe.safeAddress}
                truncate
                copy
                explorerNetworkId={daoChain as keyof Keychain}
              />
              {isTreasury && <Tag tagColor="pink">Ragequittable</Tag>}
            </TagSection>
          </div>
          <div className="right-section">
            <div className="safe-link">
              <Link
                linkType="external"
                href={generateGnosisUiLink({
                  chainId: daoChain as keyof Keychain,
                  address: safe.safeAddress,
                })}
              >
                <ParXs>
                  <Bold>Gnosis Safe</Bold>
                </ParXs>
              </Link>
            </div>
            {includeLinks && (
              <SafeActionMenu
                ragequittable={safe.ragequittable}
                safeAddress={safe.safeAddress}
                daoChain={daoChain}
                daoId={dao.id}
              />
            )}
          </div>
        </SafeCardHeader>
        <DataGrid>
          <DataIndicator
            label="Balance"
            data={formatValueTo({
              value: safe.fiatTotal,
              decimals: 2,
              format: 'currencyShort',
            })}
          />
          <DataIndicator label="Tokens" data={safe.tokenBalances.length} />
        </DataGrid>
      </SafeOverviewCard>
    </SafeContainer>
  );
};
