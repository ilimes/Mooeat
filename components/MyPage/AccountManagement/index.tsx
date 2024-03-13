import { Avatar, Badge, Button, Divider, Input, Popconfirm, message } from 'antd';
import { ReloadOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery } from '@tanstack/react-query';
import GoogleIcon from '@/public/svg/google.svg';
import Kakao from '@/public/svg/kakao.svg';
import { changePw, loadUserInfoData, updateUser, uploadFile } from '@/api/Api';
import { ChangeDataTypes, UserInfoTypes } from '@/types/User/User.interface';
import { FileTypes } from '@/types/Common/Common.interface';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import { userInfoState } from '@/recoil/states';

const AccountManagement = () => {
  const { data: session, status, update } = useSession();
  const token = session?.user?.info?.data?.token;
  const [userInfo, setUserInfo] = useRecoilState<UserInfoTypes | null>(userInfoState);

  const getUserInfoData = async () => {
    const result = await loadUserInfoData({});
    if (result?.success) {
      setUserInfo(result?.user_info);
    } else {
      setUserInfo(null);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getUserInfoData();
    }
  }, [status]);

  return (
    <>
      <MyInfo getUserInfoData={getUserInfoData} />
      <Password userInfo={userInfo} getUserInfoData={getUserInfoData} />
      <AccountLinking />
      <DeleteAccount />
    </>
  );
};

const MyInfo = ({ getUserInfoData }: { getUserInfoData: () => Promise<void> }) => {
  const { data: session, status, update } = useSession();
  const token = session?.user?.info?.data?.token;
  const user = session?.user;
  const {
    data: userInfo,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const result = await loadUserInfoData({});
      if (result?.success) {
        return result?.user_info;
      }
      return null;
    },
    enabled: !!user,
  });
  const { mutate: profileMutate } = useMutation({
    mutationFn: async (formData: any) => updateUser(formData, token),
    onMutate: () => {},
    onSuccess: (result) => {
      if (result?.success) {
        // getUserInfoData();
        setIsEdit(false);
        message.success('성공적으로 수정되었습니다.');
        refetch();
      } else {
        message.warning(result?.message || '에러');
      }
    },
    onError: () => {},
    onSettled: () => {},
  });
  const [changeData, setChangeData] = useState<ChangeDataTypes>({});
  const [isEdit, setIsEdit] = useState(false);
  const [imgFile, setImgFile] = useState<FileTypes>({ url: null });
  const profileImg = userInfo?.user_set?.file_path_thumb;
  const profile = profileImg ? (
    <img src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profileImg}`} alt="profile" />
  ) : (
    <Image src={unknownAvatar} alt="unknown" />
  );
  const isDefault = changeData?.del_file_yn === 'Y';
  const imgRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    setChangeData({ ...changeData, del_file_yn: 'N' });
    if (imgRef.current) {
      if (!imgRef.current.files?.length) return;

      if (imgRef.current.files) {
        const file = imgRef.current.files;
        const reader = new FileReader();
        reader.readAsDataURL(file?.[0]);
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImgFile({ file, url: reader.result });
          }
        };
      }
    }
  };

  const onClickMyInfoSave = async () => {
    let fileCd = null;
    // 이미지 업로드
    if (imgFile?.file) {
      const uploadResult = await uploadFile(imgFile?.file, token);
      if (uploadResult?.success) {
        fileCd = uploadResult?.files?.[0]?.file_cd;
        setChangeData({ ...changeData, del_file_yn: 'N' });
      } else {
        console.log(uploadResult?.message || '에러');
        return;
      }
    }

    const formData = { ...changeData };
    if (fileCd) {
      formData.file_cd = fileCd;
    }

    await profileMutate(formData);
    // const updateResult = await updateUser(formData, token);
    // if (updateResult?.success) {
    //   getUserInfoData();
    //   setIsEdit(false);
    //   message.success('성공적으로 수정되었습니다.');
    // } else {
    //   message.warning(updateResult?.message || '에러');
    // }
  };

  const onClickDefault = () => {
    setChangeData({ ...changeData, del_file_yn: 'Y' });
  };

  useEffect(() => {
    setChangeData({
      user_nm: userInfo?.user_nm,
      introduce: userInfo?.introduce,
      del_file_yn: 'N',
    });
  }, [isEdit]);

  const ShowForm = () => (
    <div style={{ textAlign: 'center' }}>
      <div style={{ margin: '20px 0' }}>
        <div style={{ fontWeight: 800, fontSize: 20 }}>{userInfo?.user_nm}</div>
        {userInfo?.type === 'oAuth' && (
          <div
            style={{
              background: '#FAE100',
              width: 100,
              height: 27,
              lineHeight: '27px',
              margin: '5px auto',
              borderRadius: 16,
              verticalAlign: 'middle',
            }}
          >
            <Kakao style={{ width: 14, height: 14, verticalAlign: 'middle', fill: '#3C1E1E' }} />{' '}
            <span style={{ fontSize: 13, fontWeight: 700, color: '#3C1E1E' }}>카카오 계정</span>
          </div>
        )}
        {userInfo && userInfo.role_rank > 2 && (
          <div
            style={{
              background: '#292D3E',
              width: 85,
              height: 27,
              lineHeight: '27px',
              margin: '5px auto',
              borderRadius: 16,
              verticalAlign: 'middle',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>관리자 계정</span>
          </div>
        )}
        <div>{userInfo?.user_id}</div>
      </div>
      <div>{userInfo?.introduce}</div>
      <div style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          style={{ height: 45, fontWeight: 700 }}
          onClick={() => setIsEdit(!isEdit)}
        >
          수정하기
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <SubTitle>내 정보</SubTitle>
      <StyledBoxDiv>
        <>
          <div style={{ textAlign: 'center' }}>
            <label htmlFor={isEdit ? 'file' : undefined}>
              <span>
                <Badge
                  offset={['-15%', '85%']}
                  style={{
                    width: '36px',
                    height: '36px',
                    boxShadow: '0 0 0 2px black',
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    justifyContent: 'center',
                    cursor: isEdit ? 'pointer' : 'default',
                  }}
                  count={isEdit ? <EditOutlined /> : ''}
                  dot={isEdit}
                >
                  <Avatar
                    size={130}
                    icon={
                      isDefault ? (
                        <Image src={unknownAvatar} alt="unknown" />
                      ) : imgFile?.url ? (
                        <img src={imgFile?.url} alt="profile" />
                      ) : (
                        profile
                      )
                    }
                    style={{ cursor: isEdit ? 'pointer' : 'default' }}
                  />
                </Badge>
              </span>
            </label>
            <StyledFileInput
              type="file"
              id="file"
              accept=".png, .jpeg, .jpg"
              onChange={saveImgFile}
              ref={imgRef}
            />
            {isEdit && (
              <div>
                <div style={{ margin: '15px 0', fontSize: 13, color: 'grey' }}>
                  <InfoCircleOutlined /> PNG 또는 JPG 파일 10MB 이내
                </div>
              </div>
            )}
            {isEdit && (
              <div>
                <Button onClick={onClickDefault}>
                  <ReloadOutlined /> 기본 이미지로 변경
                </Button>
              </div>
            )}
          </div>
          {isEdit && (
            <EditForm
              userInfo={userInfo}
              changeData={changeData}
              setChangeData={setChangeData}
              setIsEdit={setIsEdit}
              setImgFile={setImgFile}
              onClickMyInfoSave={onClickMyInfoSave}
            />
          )}
          {!isEdit && <ShowForm />}
        </>
      </StyledBoxDiv>
    </>
  );
};

const EditForm = ({
  userInfo,
  changeData,
  setChangeData,
  setIsEdit,
  setImgFile,
  onClickMyInfoSave,
}: {
  userInfo: UserInfoTypes | null;
  changeData: ChangeDataTypes;
  setChangeData: Dispatch<SetStateAction<ChangeDataTypes>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setImgFile: Dispatch<SetStateAction<FileTypes>>;
  onClickMyInfoSave: () => Promise<void>;
}) => (
  <div>
    <div style={{ margin: '20px 0' }}>
      <Title name="이메일 (계정)" required />
      <StyledInput placeholder="이메일을 입력해주세요." defaultValue={userInfo?.user_id} disabled />
      <Title name="닉네임" required />
      <StyledInput
        placeholder="닉네임을 입력해주세요."
        value={changeData?.user_nm ?? userInfo?.user_nm}
        onChange={(e) => setChangeData({ ...changeData, user_nm: e.target.value })}
      />
      {/* <Title name="휴대폰 번호" required={true} />
          <StyledInput placeholder="휴대폰 번호를 입력해주세요." /> */}
      <Title name="자기소개" />
      <StyledInput
        placeholder="자기소개를 입력해주세요."
        value={changeData?.introduce ?? userInfo?.introduce}
        onChange={(e) => setChangeData({ ...changeData, introduce: e.target.value })}
      />
    </div>
    <div style={{ textAlign: 'right' }}>
      <Button
        type="default"
        style={{ height: 45, fontWeight: 700 }}
        onClick={() => {
          setIsEdit(false);
          setImgFile({ url: null });
        }}
      >
        취소하기
      </Button>
      <Button
        type="primary"
        style={{ height: 45, marginLeft: 10, fontWeight: 700 }}
        onClick={() => onClickMyInfoSave()}
      >
        저장하기
      </Button>
    </div>
  </div>
);

const Password = ({
  userInfo,
  getUserInfoData,
}: {
  userInfo: UserInfoTypes | null;
  getUserInfoData: () => Promise<void>;
}) => {
  const [isPwEdit, setIsPwEdit] = useState(false);

  return (
    <>
      <SubTitle>비밀번호</SubTitle>
      <StyledBoxDiv>
        {isPwEdit && (
          <PwEditForm
            isPwEdit={isPwEdit}
            setIsPwEdit={setIsPwEdit}
            getUserInfoData={getUserInfoData}
          />
        )}
        {!isPwEdit && (
          <PwShowForm userInfo={userInfo} isPwEdit={isPwEdit} setIsPwEdit={setIsPwEdit} />
        )}
      </StyledBoxDiv>
    </>
  );
};

const PwEditForm = ({
  isPwEdit,
  setIsPwEdit,
  getUserInfoData,
}: {
  isPwEdit: boolean;
  setIsPwEdit: Dispatch<SetStateAction<boolean>>;
  getUserInfoData: () => Promise<void>;
}) => {
  const { data: session, status } = useSession();
  const token = session?.user?.info?.data?.token;

  interface ContentTypes {
    oldPw?: string;
    newPw?: string;
  }
  const [content, setContent] = useState<ContentTypes>({});
  const onClickChangePw = () => {
    if (!content?.oldPw) {
      message.warning('현재 비밀번호를 입력해주세요.');
      return;
    }

    if (!content?.newPw) {
      message.warning('새로운 비밀번호를 입력해주세요.');
      return;
    }

    const formData = content;

    const changePassword = async () => {
      const result = await changePw(formData, token);
      if (result?.success) {
        await getUserInfoData();
        message.success('성공적으로 변경되었습니다.');
        setIsPwEdit(false);
      } else {
        message.warning(result?.message || '문제 발생');
      }
    };

    changePassword();
  };

  return (
    <div>
      <div style={{ margin: '20px 0' }}>
        <Title name="현재 비밀번호" required />
        <StyledInput
          type="Password"
          placeholder="현재 비밀번호를 입력해주세요."
          value={content?.oldPw}
          onChange={(e) => setContent({ ...content, oldPw: e.target.value })}
        />
        <Title name="새로운 비밀번호" required />
        <StyledInput
          type="Password"
          placeholder="새로운 비밀번호를 입력해주세요."
          value={content?.newPw}
          onChange={(e) => setContent({ ...content, newPw: e.target.value })}
        />
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button
          type="default"
          style={{ height: 45, fontWeight: 700 }}
          onClick={() => setIsPwEdit(false)}
        >
          취소하기
        </Button>
        <Button
          type="primary"
          style={{ height: 45, marginLeft: 10, fontWeight: 700 }}
          onClick={onClickChangePw}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

const PwShowForm = ({
  userInfo,
  isPwEdit,
  setIsPwEdit,
}: {
  userInfo: UserInfoTypes | null;
  isPwEdit: boolean;
  setIsPwEdit: Dispatch<SetStateAction<boolean>>;
}) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ fontSize: 14 }}>
      {}
      최근 업데이트: <span style={{ fontWeight: 700 }}>{userInfo?.pw_mod_dt ?? '없음'}</span>
    </div>
    <div>
      <Button style={{ height: 45, fontWeight: 700 }} onClick={() => setIsPwEdit(!isPwEdit)}>
        비밀번호 변경
      </Button>
    </div>
  </div>
);

const AccountLinking = () => (
  <>
    <SubTitle>계정 연동 정보</SubTitle>
    <StyledBoxDiv>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15, margin: '10px 0' }}>
        <div style={{ color: 'grey', fontSize: 14 }}>계정 연동 서비스는 현재 준비중입니다.</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <GoogleIcon
              style={{ width: 38, height: 38, margin: '0 10px', verticalAlign: 'middle' }}
            />{' '}
            Google
          </div>
          <div>
            <Button type="primary" style={{ height: 45, fontWeight: 700 }} disabled>
              연결하기
            </Button>
          </div>
        </div>
        <Divider style={{ margin: '5px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Kakao style={{ width: 38, height: 38, margin: '0 10px', verticalAlign: 'middle' }} />{' '}
            Kakao
          </div>
          <div>
            <Button type="primary" style={{ height: 45, fontWeight: 700 }} disabled>
              연결하기
            </Button>
          </div>
        </div>
      </div>
    </StyledBoxDiv>
  </>
);

const DeleteAccount = () => (
  <>
    <SubTitle>계정 삭제</SubTitle>
    <StyledBoxDiv>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14 }}>현재 접속된 계정을 삭제합니다.</div>
        <div>
          <Button style={{ height: 45, fontWeight: 700 }}>계정 삭제하기</Button>
        </div>
      </div>
    </StyledBoxDiv>
  </>
);

const Title = ({ name, required }: { name: string; required?: boolean }) => (
  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 7 }}>
    <span>{name}</span> {required && <span style={{ color: 'red' }}>(*)</span>}
  </div>
);

export default AccountManagement;

const StyledInput = styled(Input)`
  && {
    height: 40px;
    margin-bottom: 10px;
  }
`;

const StyledBoxDiv = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #bbcedd;
  border-radius: 10px;
`;

const SubTitle = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 700;
  color: #5d559a;
`;

const StyledFileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
