'use client';

import { Button, Input, Spin, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { postTempPw } from '@/src/app/api/Api';
import TopTitle from '@/src/components/SharedComponents/TopTitle';

const PasswordIssue = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const pushTempPwEmail = async () => {
    setIsLoading(true);
    if (!email) {
      message.warning('이메일을 입력해주세요.');
      setIsLoading(false);
      return false;
    }

    const result = await postTempPw({ email });
    if (result?.success) {
      message.info('메일이 성공적으로 발송되었습니다. 메일함을 확인해주세요!');
    } else {
      message.warning(result?.message);
    }
    setIsLoading(false);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enter 입력이 되면 클릭 이벤트 실행
    if (e.key === 'Enter') {
      pushTempPwEmail();
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <TopTitle
        title="비밀번호 재설정"
        explain="가입 시 입력한 이메일 주소로 임시 비밀번호를 보내드립니다."
      />
      <div style={{ margin: '10px 0' }}>
        <StyledTitleDiv>이메일</StyledTitleDiv>
        <Input
          value={email}
          onKeyDown={(e) => handleOnKeyPress(e)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          style={{ height: 40 }}
        />
      </div>
      <Button
        type="primary"
        onClick={pushTempPwEmail}
        style={{ width: '100%', height: 47, fontWeight: 'bold', fontSize: 14 }}
      >
        {isLoading && <StyledSpin />}
        {!isLoading && <>이메일 전송</>}
      </Button>
      <BtnGroup>
        <StyledSpan style={{ marginLeft: 0 }} onClick={() => router.push('/auth/login')}>
          <LeftOutlined style={{ marginRight: 5 }} />
          로그인 페이지로 가기
        </StyledSpan>
      </BtnGroup>
    </div>
  );
};

export default PasswordIssue;

const StyledTitleDiv = styled.div`
  font-size: 13px;
  color: #606060;
  font-weight: 700;
  padding-bottom: 5px;
`;

const BtnGroup = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #606060;
`;

const StyledSpan = styled.span`
  && {
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const StyledSpin = styled(Spin)`
  && {
    & .ant-spin-dot-item {
      background-color: white;
    }
  }
`;
