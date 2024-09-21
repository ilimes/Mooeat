'use client';

import { signIn, getSession } from 'next-auth/react';
import { Button, Checkbox, Form, Input, Drawer, message, Spin } from 'antd';
import { LeftOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ValuesTypes } from '@/types/User/User.interface';
import TopTitle from '@/components/SharedComponents/TopTitle';

const onFinish = async (
  values: ValuesTypes,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  router: AppRouterInstance | any,
) => {
  setIsLoading(true);

  try {
    // 로그인 시도
    const res = await signIn('credentials', {
      user_id: values?.user_id,
      password: values?.password,
      redirect: false, // 리다이렉트는 false로 설정
    });

    // 로딩 스피너 종료
    setIsLoading(false);

    // 로그인 실패 시
    if (res?.status === 401) {
      message.warning(res?.error || '아이디 혹은 비밀번호가 일치하지 않습니다.');
      return router.push('/auth/login/email');
    }

    // 로그인 성공 시
    if (res?.ok) {
      // 세션을 강제로 갱신하여 최신 세션 정보를 가져옴
      await getSession();

      // 세션 갱신 후 홈으로 리다이렉트
      router.push('/');
    }
  } catch (error) {
    // 에러 핸들링
    setIsLoading(false);
    console.error('로그인 에러:', error);
    message.error('로그인 중 문제가 발생했습니다. 다시 시도해 주세요.');
  }
};

type FieldType = {
  user_id?: string;
  password?: string;
  agree?: string;
};

const EmailLogin = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div style={{ marginTop: 30 }}>
      <TopTitle title="Mooeat 로그인" />
      <StyledForm
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ agree: false }}
        onFinish={(values: any) => onFinish(values, setIsLoading, router)}
        autoComplete="off"
      >
        <StyledTitleDiv>이메일</StyledTitleDiv>
        <Form.Item<FieldType>
          name="user_id"
          rules={[{ required: true, message: '형식에 맞게 이메일을 입력해주세요.', type: 'email' }]}
          hasFeedback
          validateTrigger="onBlur"
        >
          <Input placeholder="이메일 주소" style={{ height: 40 }} />
        </Form.Item>
        <StyledTitleDiv>비밀번호</StyledTitleDiv>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
          hasFeedback
          validateTrigger="onBlur"
        >
          <Input.Password placeholder="비밀번호" style={{ height: 40 }} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%', height: 47, fontWeight: 'bold', fontSize: 15, marginTop: 10 }}
          >
            {isLoading && <StyledSpin />}
            {!isLoading && <>로그인</>}
          </Button>
        </Form.Item>
      </StyledForm>
      <BtnGroup>
        <StyledSpan style={{ marginLeft: 0 }} onClick={() => router.push('/auth/login')}>
          <LeftOutlined style={{ marginRight: 5 }} />
          다른 방식으로 로그인
        </StyledSpan>
      </BtnGroup>
    </div>
  );
};

export default EmailLogin;

const BtnGroup = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #606060;
`;

const StyledTitleDiv = styled.div`
  font-size: 13px;
  color: #606060;
  font-weight: 700;
  padding-bottom: 5px;
`;

const StyledForm = styled(Form)`
  && {
    .ant-form-item-explain-error {
      font-size: 13px;
    }
  }
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
