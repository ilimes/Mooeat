import { SubTitle, StyledBoxDiv } from "@/src/app/(route)/myPage/page";
import { Avatar, Button, Divider, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';
import GoogleIcon from '@/public/svg/google.svg';
import Kakao from '@/public/svg/kakao.svg';
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";

const AccountManagement = () => {
  return (
    <>
      <MyInfo />
      <Password />
      <AccountLinking />
      <DeleteAccount />
    </>
  )
}

const MyInfo = () => {
  const { data: session, status } = useSession();
  const [isEdit, setIsEdit] = useState(false);
  const userInfo = session?.user?.token?.userInfo;

  const Title = ({name, required} : {name: string, required: boolean}) => {
    return (
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 7 }}>
        <span>{name}</span> {required && <span style={{ color: 'red' }}>(*)</span>}
      </div>
    )
  }

  const EditForm = () => {
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <Avatar size={130} icon={<UserOutlined />} />
        </div>
        <div>
          <div style={{ margin: '20px 0' }}>
            <Title name="이름" required={true} />
            <StyledInput placeholder="이름을 입력해주세요." defaultValue={userInfo?.user_nm}/>
            <Title name="이메일" required={true} />
            <StyledInput placeholder="이메일을 입력해주세요." defaultValue={userInfo?.user_id}/>
            <Title name="휴대폰 번호" required={true} />
            <StyledInput placeholder="휴대폰 번호를 입력해주세요."/>
            <Title name="자기소개" required={true} />
            <StyledInput placeholder="자기소개를 입력해주세요."/>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button type="default" style={{ height: 45 }} onClick={() => setIsEdit(false)}>취소하기</Button>
            <Button type="primary" style={{ height: 45, marginLeft: 10 }} onClick={() => setIsEdit(false)}>저장하기</Button>
          </div>
        </div>
      </>
    )
  }

  const ShowForm = () => {
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <Avatar size={130} icon={<UserOutlined />} />
          <div style={{ margin: '20px 0' }}>
            <div style={{ fontWeight: 600, fontSize: 20 }}>{userInfo?.user_nm}</div>
            <div>{userInfo?.user_id}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" style={{ height: 45 }} onClick={() => setIsEdit(!isEdit)}>수정하기</Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SubTitle>내 정보</SubTitle>
      <StyledBoxDiv>
        {isEdit && <EditForm />}
        {!isEdit && <ShowForm />}
      </StyledBoxDiv>
    </>
  )
}

const Password = () => {
  return (
    <>
      <SubTitle>비밀번호</SubTitle>
      <StyledBoxDiv>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 14 }}>
            최근 업데이트: 없음
          </div>
          <div>
            <Button style={{ height: 45 }}>비밀번호 변경</Button>
          </div>
        </div>
      </StyledBoxDiv>
    </>
  )
}

const AccountLinking = () => {
  return (
    <>
      <SubTitle>계정 연동 정보</SubTitle>
      <StyledBoxDiv>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15, margin: '10px 0' }}>
          <div style={{ color: 'grey', fontSize: 14 }}>계정 연동 서비스는 현재 준비중입니다.</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <GoogleIcon style={{ width: 38, height: 38, margin: '0 10px', verticalAlign: 'middle' }} /> Google
            </div>
            <div>
              <Button type='primary' style={{ height: 45 }} disabled>연결하기</Button>
            </div>
          </div>
          <Divider style={{ margin: '5px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Kakao style={{ width: 38, height: 38, margin: '0 10px', verticalAlign: 'middle' }} /> Kakao
            </div>
            <div>
              <Button type='primary' style={{ height: 45 }} disabled>연결하기</Button>
            </div>
          </div>
        </div>
      </StyledBoxDiv>
    </>
  )
}

const DeleteAccount = () => {
  return (
    <>
      <SubTitle>계정 삭제</SubTitle>
      <StyledBoxDiv>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 14 }}>
            현재 접속된 계정을 삭제합니다.
          </div>
          <div>
            <Button style={{ height: 45 }}>계정 삭제하기</Button>
          </div>
        </div>
      </StyledBoxDiv>
    </>
  )
}

export default AccountManagement;

export const StyledInput = styled(Input)`
  && {
    height: 40px;
    margin-bottom: 10px;
  }
`