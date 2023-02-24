import { Card, ParLg, widthQuery } from '@daohaus/ui';
import { ReactNode, useMemo } from 'react';
import styled from 'styled-components';

const AlertContainer = styled(Card)`
  display: flex;
  gap: 3rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  padding: 2.3rem 2.5rem;
  border: none;
  min-height: 23.8rem;

  @media ${widthQuery.sm} {
    gap: 2rem;
    height: auto;
    margin-bottom: 2rem;
  }
`;

export const ListAlert = ({ children }: { children: ReactNode }) => {
  const message = useMemo(() => {
    return typeof children === 'string' ? (
      <div>
        <ParLg className="warn">{children}</ParLg>
      </div>
    ) : (
      children
    );
  }, [children]);

  return <AlertContainer>{message}</AlertContainer>;
};
