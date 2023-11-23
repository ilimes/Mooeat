'use client'

import { signIn } from 'next-auth/react'
import { Button, Checkbox, Form, Input, Drawer, message, Spin } from "antd";
import { LeftOutlined } from '@ant-design/icons'
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserInfoData } from "@/components/CustomLayout/CustomLayout";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "@/recoil/states";

const onFinish = async (values: any, setIsLoading: any, setUserInfo: any, router: any) => {
  setIsLoading(true);
  const res = await signIn('credentials', {
    user_id: values?.user_id,
    password: values?.password,
    redirect: false,
  })

  if (res?.ok) {
    // 로딩 스피너 종료
    setIsLoading(false);
  } else {
    setIsLoading(false);
  }

  // 에러 핸들링
  if (res?.status === 401) {
    message.warning(res?.error || '아이디 혹은 비밀번호가 일치하지 않습니다.');
    router.push('/auth/login/email');
  } else {
    router.refresh('/')
  }
};

const onFinishFailed = (errorInfo: any) => {
  message.error('필수 항목을 모두 입력해주세요.');
};

type FieldType = {
  user_id?: string;
  password?: string;
  agree?: string;
};

const EmailLogin = () => {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userInfoState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div style={{ marginTop: 30 }}>
      <Title>Mooeat 로그인</Title>
      <StyledForm
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ agree: false }}
        onFinish={(values) => onFinish(values, setIsLoading, setUserInfo, router)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <StyledTitleDiv>
          이메일
        </StyledTitleDiv>
        <Form.Item<FieldType>
          // label="이메일"
          name="user_id"
          rules={[{ required: true, message: '형식에 맞게 이메일을 입력해주세요.', type: 'email' }]}
          hasFeedback
          validateTrigger="onBlur"
        >
          <Input placeholder="이메일 주소" style={{ height: 40 }} />
        </Form.Item>
        <StyledTitleDiv>
          비밀번호
        </StyledTitleDiv>
        <Form.Item<FieldType>
          // label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
          hasFeedback
          validateTrigger="onBlur"
        >
          <Input.Password placeholder="비밀번호" style={{ height: 40 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%', height: 47, fontWeight: 'bold', fontSize: 14, marginTop: 10 }}>
            {
              isLoading && <StyledSpin />
            }
            {
              !isLoading && <>로그인</>
            }
          </Button>
        </Form.Item>
      </StyledForm>
      <BtnGroup>
        <StyledSpan style={{ marginLeft: 0 }} onClick={() => router.push('/auth/login')}><LeftOutlined style={{ marginRight: 5 }} />다른 방식으로 로그인</StyledSpan>
      </BtnGroup>
    </div>
  );
};

export default EmailLogin;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 15px;
`

export const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`

export const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

export const BtnGroup = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #606060;
`

export const StyledTitleDiv = styled.div`
  font-size: 13px;
  color: #606060;
  padding-bottom: 5px;
`

export const StyledForm = styled(Form)`
  && {
    .ant-form-item-explain-error {
      font-size: 13px;
    }
  }
`

export const Req = styled.span`
  color: red;
  font-size: 12px;
`

export const StyledDetailSpan = styled.span`
  &:hover {
    text-decoration: underline;
  }
`

export const StyledSpan = styled.span`
  && {
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

export const fetchData = async (formData: object) => {
  const res = await fetch(`/api/login`, {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  const result = await res.json();
  
  return result?.data;
}

export const StyledSpin = styled(Spin)`
    && {
        & .ant-spin-dot-item {
            background-color: white;
        }
    }
`