import { SubTitle, StyledBoxDiv } from "@/src/app/(route)/myPage/page";
import { Avatar, Button, Divider } from "antd";
import { UserOutlined } from '@ant-design/icons';
import GoogleIcon from '@/public/svg/google.svg';
import Kakao from '@/public/svg/kakao.svg';
import { useSession } from "next-auth/react";

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
  const userInfo = session?.user?.token?.userInfo;

  return (
    <>
      <SubTitle>내 정보</SubTitle>
      <StyledBoxDiv>
        <div style={{ textAlign: 'center' }}>
          <Avatar size={150} icon={<UserOutlined />} />
          <div style={{ margin: '20px 0' }}>
            <div style={{ fontWeight: 600, fontSize: 20 }}>{userInfo?.user_nm}</div>
            <div>{userInfo?.user_id}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" style={{ height: 45 }}>수정하기</Button>
          </div>
        </div>
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
            계정 삭제 시 기존 정보를 복구하지 못할 수 있으니 주의해주세요.
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