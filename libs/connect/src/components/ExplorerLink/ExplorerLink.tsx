import React, { useMemo } from 'react';

import {
  generateExplorerLink,
  isValidNetwork,
  ValidNetwork,
} from '@daohaus/keychain-utils';
import { Link } from '@daohaus/ui';

import { useDHConnect } from '../../HausConnectContext';

type ExplorerLinkProps = {
  children?: React.ReactNode;
  chainId?: ValidNetwork;
  address?: string;
  className?: string;
  type?: string;
};

export const ExplorerLink = ({
  children,
  chainId,
  address,
  className,
  type,
}: ExplorerLinkProps) => {
  const { chainId: contextChainId } = useDHConnect();

  console.log('chainId', chainId);

  const explorerLink = useMemo(() => {
    if (chainId) {
      return generateExplorerLink({ chainId, address, type });
    }
    if (contextChainId && isValidNetwork(contextChainId)) {
      return generateExplorerLink({ chainId: contextChainId, address, type });
    }
    return '/';
  }, [contextChainId, chainId, address, type]);

  return (
    <Link href={explorerLink} className={className}>
      {children}
    </Link>
  );
};
