'use client'

import { Button, Input, Spin, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { postTempPw } from '@/api/Api';

const PasswordIssue = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const pushTempPwEmail = async () => {
    setIsLoading(true);
    if (!email) {
      message.warning("이메일을 입력해주세요.")
      setIsLoading(false);
      return false;
    }

    // const result = await fetchTempPw(email);
    const result = await postTempPw({ email });
    if (result?.success) {
      message.info("메일이 성공적으로 발송되었습니다. 메일함을 확인해주세요!")
    } else {
      message.warning(result?.message)
    }
    setIsLoading(false);
  }

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      pushTempPwEmail(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Title>비밀번호 재설정</Title>
      <Explain>가입 시 입력한 이메일 주소로 임시 비밀번호를 보내드립니다.</Explain>
      <div style={{ margin: '10px 0' }}>
        <StyledTitleDiv>
          이메일
        </StyledTitleDiv>
        <Input value={email} onKeyDown={(e) => handleOnKeyPress(e)} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="이메일 주소" style={{ height: 40 }} />
      </div>
      <Button type="primary" onClick={pushTempPwEmail} style={{ width: '100%', height: 47, fontWeight: 'bold', fontSize: 14 }}>
        {
          isLoading && <StyledSpin />
        }
        {
          !isLoading && <>이메일 전송</>
        }
      </Button>
      <BtnGroup>
        <StyledSpan style={{ marginLeft: 0 }} onClick={() => router.push('/auth/login')}><LeftOutlined style={{ marginRight: 5 }} />로그인 페이지로 가기</StyledSpan>
      </BtnGroup>
    </div>
  );
};

export default PasswordIssue;

const StyledTitleDiv = styled.div`
  font-size: 13px;
  color: #606060;
  font-weight: 600;
  padding-bottom: 5px;
`

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`

const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

const BtnGroup = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #606060;
`

const StyledSpan = styled.span`
  && {
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

const StyledSpin = styled(Spin)`
    && {
        & .ant-spin-dot-item {
            background-color: white;
        }
    }
`

const fetchTempPw = async (email: string | null) => {
  const res = await fetch(`/api/user/reset/email`, {
    method: "POST",
    body: JSON.stringify(email),
  });
  const result = await res.json();

  return result?.data;
};