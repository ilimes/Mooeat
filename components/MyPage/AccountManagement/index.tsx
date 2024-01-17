import { Avatar, Badge, Button, Divider, Input, message } from "antd";
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import GoogleIcon from '@/public/svg/google.svg';
import Kakao from '@/public/svg/kakao.svg';
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { loadUserInfoData } from '@/api/Api';
import { UserInfoTypes } from '@/types/User/User.interface';

const AccountManagement = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.token?.data?.token;
  const [userInfo, setUserInfo] = useState<UserInfoTypes | null>(null);

  const getUserInfoData = async () => {
    const result = await loadUserInfoData({}, token);
    if (result?.success) {
      setUserInfo(result?.user_info)
      console.log(result?.user_info)
    } else {
      setUserInfo(null);
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      getUserInfoData();
    }
  }, [status])

  return (
    <>
      <MyInfo userInfo={userInfo}/>
      <Password userInfo={userInfo}/>
      <AccountLinking />
      <DeleteAccount />
    </>
  )
}

const MyInfo = ({ userInfo }: { userInfo: UserInfoTypes | null }) => {
  const [isEdit, setIsEdit] = useState(false);

  const EditForm = () => {
    return (
      <>
        <div>
          <div style={{ margin: '20px 0' }}>
            <Title name="이메일 (계정)" required={true} />
            <StyledInput placeholder="이메일을 입력해주세요." defaultValue={userInfo?.user_id} disabled/>
            <Title name="닉네임" required={true} />
            <StyledInput placeholder="닉네임을 입력해주세요." defaultValue={userInfo?.user_nm}/>
            <Title name="휴대폰 번호" required={true} />
            <StyledInput placeholder="휴대폰 번호를 입력해주세요."/>
            <Title name="자기소개" required={true} />
            <StyledInput placeholder="자기소개를 입력해주세요."/>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button type="default" style={{ height: 45, fontWeight: 600 }} onClick={() => setIsEdit(false)}>취소하기</Button>
            <Button type="primary" style={{ height: 45, marginLeft: 10, fontWeight: 600 }} onClick={() => setIsEdit(false)}>저장하기</Button>
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
            {userInfo && userInfo.role_rank > 2 && <>
              <div style={{ background: '#292D3E', width: 85, height: 27, lineHeight: '27px', margin: '5px auto', borderRadius: 16, verticalAlign: 'middle' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>관리자 계정</span>
              </div>
            </>}
            <div>{userInfo?.user_id}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" style={{ height: 45, fontWeight: 600 }} onClick={() => setIsEdit(!isEdit)}>수정하기</Button>
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

const Password = ({ userInfo }: { userInfo: UserInfoTypes | null }) => {
  const [isPwEdit, setIsPwEdit] = useState(false);

  return (
    <>
      <SubTitle>비밀번호</SubTitle>
      <StyledBoxDiv>
        {isPwEdit && <PwEditForm isPwEdit={isPwEdit} setIsPwEdit={setIsPwEdit} />}
        {!isPwEdit && <PwShowForm userInfo={userInfo} isPwEdit={isPwEdit} setIsPwEdit={setIsPwEdit} />}
      </StyledBoxDiv>
    </>
  )
}

const PwEditForm = ({ isPwEdit, setIsPwEdit }: { isPwEdit: boolean, setIsPwEdit: Dispatch<SetStateAction<boolean>> }) => {
  interface ContentTypes {
    oldPw?: string;
    newPw?: string;
  }
  const [content, setContent] = useState<ContentTypes>({});
  const onClickChangePw = () => {
    if (!content?.oldPw) {
      message.warning('현재 비밀번호를 입력해주세요.')
      return;
    }
    
    if (!content?.newPw) {
      message.warning('새로운 비밀번호를 입력해주세요.')
      return;
    }
    
    if (content?.oldPw != content?.newPw) {
      message.error('현재 비밀번호와 새로운 비밀번호가 일치하지 않습니다.')
      return;
    }

    setIsPwEdit(false);
  }

  return (
    <>
      <div>
        <div style={{ margin: "20px 0" }}>
          <Title name="현재 비밀번호" required={true} />
          <StyledInput
            type="Password"
            placeholder="현재 비밀번호를 입력해주세요."
            value={content?.oldPw}
            onChange={(e) => setContent({ ...content, oldPw: e.target.value })}
          />
          <Title name="새로운 비밀번호" required={true} />
          <StyledInput
            type="Password"
            placeholder="새로운 비밀번호를 입력해주세요."
            value={content?.newPw}
            onChange={(e) => setContent({ ...content, newPw: e.target.value })}
          />
        </div>
        <div style={{ textAlign: "right" }}>
          <Button
            type="default"
            style={{ height: 45, fontWeight: 600 }}
            onClick={() => setIsPwEdit(false)}
          >
            취소하기
          </Button>
          <Button
            type="primary"
            style={{ height: 45, marginLeft: 10, fontWeight: 600 }}
            onClick={onClickChangePw}
          >
            저장하기
          </Button>
        </div>
      </div>
    </>
  );
}

const PwShowForm = ({ userInfo, isPwEdit, setIsPwEdit }: { userInfo: UserInfoTypes | null, isPwEdit: boolean, setIsPwEdit: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14 }}>
          {}
          최근 업데이트: <span style={{ fontWeight: 600 }}>{userInfo?.pw_mod_dt ?? '없음'}</span>
        </div>  
        <div>
          <Button style={{ height: 45, fontWeight: 600 }} onClick={() => setIsPwEdit(!isPwEdit)}>비밀번호 변경</Button>
        </div>
      </div>
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
              <Button type='primary' style={{ height: 45, fontWeight: 600 }} disabled>연결하기</Button>
            </div>
          </div>
          <Divider style={{ margin: '5px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Kakao style={{ width: 38, height: 38, margin: '0 10px', verticalAlign: 'middle' }} /> Kakao
            </div>
            <div>
              <Button type='primary' style={{ height: 45, fontWeight: 600 }} disabled>연결하기</Button>
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
            <Button style={{ height: 45, fontWeight: 600 }}>계정 삭제하기</Button>
          </div>
        </div>
      </StyledBoxDiv>
    </>
  )
}

const Title = ({name, required} : {name: string, required: boolean}) => {
  return (
    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 7 }}>
      <span>{name}</span> {required && <span style={{ color: 'red' }}>(*)</span>}
    </div>
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
  margin-bottom: 15px;
  font-weight: 600;
  color: #5D559A;
`