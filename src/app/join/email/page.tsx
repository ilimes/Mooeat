'use client'

import { Button, Checkbox, Form, Input } from "antd";
import styled from "styled-components";

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  email?: string;
  nickname?: string;
  password?: string;
  remember?: string;
};

const Join = () => {
  return (
    <div style={{ marginTop: 30 }}>
      <Title>이메일로 회원가입</Title>
      <StyledForm
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <StyledTitleDiv>
          이메일
        </StyledTitleDiv>
        <Form.Item<FieldType>
          // label="이메일"
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
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
        <StyledTitleDiv>
          닉네임
        </StyledTitleDiv>
        <Form.Item<FieldType>
          // label="닉네임"
          name="nickname"
          rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
          hasFeedback
          validateTrigger="onBlur"
        >
          <Input placeholder="닉네임" style={{ height: 40 }} />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>개인 정보 수집 및 이용에 동의합니다.</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%', height: 47, fontWeight: 'bold', fontSize: 14 }}>
            회원가입
          </Button>
        </Form.Item>
      </StyledForm>
    </div>
  );
};

export default Join;

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