import { Alert } from 'antd';
import { useSearchParams } from 'next/navigation';
import * as S from './style';

const TopMsg = () => {
  const searchParams = useSearchParams();
  const required = searchParams?.get('required');
  const success = searchParams?.get('success');

  return (
    <>
      {required && (
        <S.StyledDiv className="fade">
          <Alert message="로그인 후 이용 가능한 서비스입니다." type="warning" showIcon />
        </S.StyledDiv>
      )}
      {success && (
        <S.StyledDiv className="fade">
          <Alert message="성공적으로 가입되었습니다." type="success" showIcon />
        </S.StyledDiv>
      )}
    </>
  );
};

export default TopMsg;
