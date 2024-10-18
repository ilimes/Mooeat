import { Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const TokenExpirationModalContent = ({ closeModal }: { closeModal: () => void }) => (
  <>
    <StyledModalContent>
      <div className="title">토큰이 만료되었습니다.</div>
      <div className="description">다시 로그인해주세요.</div>
    </StyledModalContent>
    <StyledModalActions>
      <Link href="/">
        <Button
          onClick={() => {
            closeModal();
          }}
        >
          확인
        </Button>
      </Link>
    </StyledModalActions>
  </>
);

export default TokenExpirationModalContent;

const StyledModalContent = styled.div`
  margin: 30px 0;

  .title {
    font-weight: 700;
    font-size: 16px;
  }

  .description {
    color: grey;
  }
`;

const StyledModalActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;
