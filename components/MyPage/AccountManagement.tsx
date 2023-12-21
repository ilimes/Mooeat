import { Avatar, Badge, Button, Divider, Input } from "antd";
import { UserOutlined, EditOutlined } from '@ant-design/icons';
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
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 7 }}>
        <span>{name}</span> {required && <span style={{ color: 'red' }}>(*)</span>}
      </div>
    )
  }

  const EditForm = () => {
    return (
      <>
        <div>
          <div style={{ margin: '20px 0' }}>
            <Title name="닉네임" required={true} />
            <StyledInput placeholder="닉네임을 입력해주세요." defaultValue={userInfo?.user_nm}/>
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
          <div style={{ margin: '20px 0' }}>
            <div style={{ fontWeight: 600, fontSize: 20 }}>
              {userInfo?.user_nm}
            </div>
            {userInfo?.type === 'oAuth' && <>
              <div style={{ background: '#FAE100', width: 100, height: 27, lineHeight: '27px', margin: '5px auto', borderRadius: 16, verticalAlign: 'middle' }}>
                <Kakao style={{ width: 14, height: 14, verticalAlign: 'middle', fill: '#3C1E1E' }} /> <span style={{ fontSize: 13, fontWeight: 600, color: '#3C1E1E' }}>카카오 계정</span>
              </div>
            </>}
            {userInfo?.role_rank > 2 && <>
              <div style={{ background: '#292D3E', width: 85, height: 27, lineHeight: '27px', margin: '5px auto', borderRadius: 16, verticalAlign: 'middle' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>관리자 계정</span>
              </div>
            </>}
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
        <>
          <div style={{ textAlign: 'center' }}>
            <span onClick={() => isEdit ? alert('프로필 수정 클릭') : ''}>
              <Badge
                offset={["-15%", "85%"]}
                style={{
                  width: "36px",
                  height: "36px",
                  boxShadow: "0 0 0 2px black",
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  justifyContent: 'center',
                  cursor: isEdit ? 'pointer' : 'default'
                }}
                count={isEdit ? <EditOutlined /> : ''}
                dot={isEdit}
              >
                <Avatar size={130} icon={<UserOutlined />} style={{ cursor: isEdit ? 'pointer' : 'default' }} />
              </Badge>
            </span>
          </div>
          {isEdit && <EditForm />}
          {!isEdit && <ShowForm />}
        </>
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

const StyledInput = styled(Input)`
  && {
    height: 40px;
    margin-bottom: 10px;
  }
`

const StyledBoxDiv = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #BBCEDD;
  border-radius: 10px;
`

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #5D559A;
`