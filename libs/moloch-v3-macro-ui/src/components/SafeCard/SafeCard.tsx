import { useMemo } from 'react';

import { Keychain, getNetwork } from '@daohaus/keychain-utils';
import { DaoSafe, MolochV3Dao } from '@daohaus/moloch-v3-data';
import {
  AddressDisplay,
  Avatar,
  Bold,
  CollapsibleCard,
  DataIndicator,
  H4,
  Link,
  ParXs,
  Tag,
} from '@daohaus/ui';
import { generateGnosisUiLink, toWholeUnits, truncValue } from '@daohaus/utils';

import { DataGrid } from '../Layout';
import { SafeActionMenu } from './SafeActionMenu';
import { SafeBalancesTable } from './SafeBalancesTable';
import {
  SafeCardHeader,
  SafeContainer,
  SafeOverviewCard,
  TagSection,
} from './SafeCard.styles';

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

  const nativeTokenSymbol = useMemo(() => {
    const network = getNetwork(daoChain);
    return network?.symbol || 'UNK';
  }, [daoChain]);

  const tokenBalances = useMemo(() => {
    const network = getNetwork(daoChain);
    return safe.tokenBalances.map((t) => {
      return {
        tokenLogo: t.token?.logoUri,
        tokenName: t.token?.name || nativeTokenSymbol,
        tokenSymbol: t.token?.symbol || nativeTokenSymbol,
        balance: truncValue(
          toWholeUnits(t.balance, t.token?.decimals || network?.tokenDecimals),
          4
        ),
      };
    });
  }, [safe]);

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
          <DataIndicator label="Tokens" data={safe.tokenBalances.length} />
        </DataGrid>
        {safe.tokenBalances.length > 0 && (
          <CollapsibleCard
            triggerLabel="Balances"
            width="auto"
            collapsibleContent={<SafeBalancesTable balances={tokenBalances} />}
          >
            <div>
              {safe.tokenBalances.map((token) => (
                <Avatar
                  alt={token.token?.name || token.tokenAddress || ''}
                  size="md"
                  src={token.token?.logoUri || ''}
                  fallback={token.token?.symbol || nativeTokenSymbol}
                />
              ))}
            </div>
          </CollapsibleCard>
        )}
      </SafeOverviewCard>
    </SafeContainer>
  );
};
