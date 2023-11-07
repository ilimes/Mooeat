'use client'

import { Button, Checkbox, Form, Input, Drawer, message } from "antd";
import { LeftOutlined } from '@ant-design/icons'
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";

const onFinish = async (values: any) => {
  const result = await fetchData(values);
  if (result?.success) {
    message.success('성공적으로 로그인 되었습니다. Mooeat에 오신것을 환영합니다 🎉');
    localStorage.setItem('token', result?.token);
  } else {
    message.warning(result?.message || '로그인에 실패하였습니다.');
  }
};

const onFinishFailed = (errorInfo: any) => {
  message.error('필수 항목을 모두 입력해주세요.');
  // console.log('Failed:', errorInfo);
};

type FieldType = {
  user_id?: string;
  password?: string;
  agree?: string;
};

const EmailLogin = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div style={{ marginTop: 30 }}>
      <Title>Mooeat 로그인</Title>
      <StyledForm
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ agree: false }}
        onFinish={onFinish}
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

        {/* <Form.Item<FieldType>
          name="agree"
          valuePropName="checked"
        >
          <div style={{}}>
            <Checkbox>
              <div style={{ fontSize: 14 }}>
                개인정보 수집 및 이용에 동의합니다. <StyledDetailSpan onClick={(e) => { e.preventDefault(); setIsOpen(true); }}>(자세히보기)</StyledDetailSpan>
              </div>
            </Checkbox>
          </div>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%', height: 47, fontWeight: 'bold', fontSize: 14, marginTop: 10 }}>
            로그인
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