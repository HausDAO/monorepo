import styled from 'styled-components';
import { violet } from '@radix-ui/colors';
import { widthQuery } from '@daohaus/ui';

export const TemporaryAvatar = styled.div`
  width: 3rem;
  height: 3rem;

  background-color: ${violet.violet9};
  border-radius: 45px;
  margin-right: 0.75rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  p {
    text-align: left;
  }
  .interior {
    display: flex;
    flex-direction: column;
  }
`;
export const ButtonContainer = styled.div`
  width: 20rem;
  @media ${widthQuery.sm} {
    width: fit-content;
    .should-connect {
      button {
        padding: 0.9rem 0.2rem;
        justify-content: center;
      }
      svg {
        margin: 0;
      }
    }
  }
`;
