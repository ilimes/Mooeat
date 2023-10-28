'use client'

import { Button, Checkbox, Form, Input, Drawer, message } from "antd";
import styled from "styled-components";
import { useState } from "react";

const onFinish = (values: any) => {
  if (!values?.agree) {
    message.warning('개인정보 수집 및 이용에 동의하신 후 가입이 가능합니다.');
    return;
  }
  message.success('가입 완료');
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  message.error('필수 항목을 모두 입력해주세요.');
  console.log('Failed:', errorInfo);
};

type FieldType = {
  email?: string;
  nickname?: string;
  password?: string;
  agree?: string;
};

const Join = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div style={{ marginTop: 30 }}>
      <Title>이메일로 회원가입</Title>
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
          이메일 <Req>(필수)</Req>
        </StyledTitleDiv>
        <Form.Item<FieldType>
          // label="이메일"
          name="email"
          rules={[{ required: true, message: '형식에 맞게 이메일을 입력해주세요.', type: 'email' }]}
          hasFeedback
          validateTrigger="onBlur"
        >
          <Input placeholder="이메일 주소" style={{ height: 40 }} />
        </Form.Item>
        <StyledTitleDiv>
          비밀번호 <Req>(필수)</Req>
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
          닉네임 <Req>(필수)</Req>
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
        </Form.Item>

        <Form.Item>
          
          <Button type="primary" htmlType="submit" style={{ width: '100%', height: 47, fontWeight: 'bold', fontSize: 14 }}>
            회원가입
          </Button>
        </Form.Item>
      </StyledForm>
      <Drawer
        height={'80%'}
        title="개인정보 처리방침"
        placement={'bottom'}
        closable={true}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        key={'bottom'}
      >
        <p>Mooeat 은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>
        <p>해당 개인정보 처리방침은 서비스 이용 가입시 적용됩니다.</p>
        <p><b>제1조 (개인정보의 처리 목적)</b></p>
        <p>Mooeat 이용약관 은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
        <p>1. 홈페이지 회원가입 및 관리 : 회원 가입 의사 확인 목적으로 개인정보를 처리합니다.</p>
        <p>2. 의뢰 및 채용 공고 : 게시한 공고가 신용이 있는지에 대한 확인 목적으로 개인정보를 처리합니다.</p>
        <p>3. “Mooeat”은 소셜 SNS (카카오톡 , 구글) 회원 가입 방식을 취급하고 있으며, 이에 대해 제공받는 정보는 해당 소셜SNS에 대한 개인정보인 이메일, 쿠키 만 제공받고 있으며 이에 대해 서비스 유지를 위해 개인정보를 처리합니다.</p>
        <p><b>제2조(개인정보의 처리 및 보유 기간)</b></p>
        <p>① Mooeat 이용약관 은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
        <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
        <p>- 서비스 회원가입 및 관리 와 관련한 개인정보는 수집.이용에 관한 동의일로부터 10년 까지 위 이용목적을 위하여 보유.이용됩니다.</p>
        <p>- 보유근거 : 서비스 이용 및 제공을 위해 개인정보를 보유하게 됩니다.</p>
        <p>- 관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다. 해당 개인정보처리방침은 서비스 이용 가입시 적용됩니다.</p>
      </Drawer>
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

export const Req = styled.span`
  color: red;
  font-size: 12px;
`

export const StyledDetailSpan = styled.span`
  &:hover {
    text-decoration: underline;
  }
`