import {
  Avatar,
  Button,
  Col,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Spin,
  message,
} from 'antd';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import { contentPut, uploadFile } from '@/src/app/api/Api';
import { UploadInfoTypes } from '@/src/types/Common/Common.interface';
import { Friend, FriendTypes } from '@/src/types/Friend/Friend.interface';
import FileUpload from '@/src/components/FileUpload';
import Freepik from '@/src/components/Freepik';

const freepikLink =
  'https://kr.freepik.com/free-vector/colorful-icons-set-style_12067938.htm#query=share&position=5&from_view=search&track=sph&uuid=ff78e392-b332-4598-ac8b-18451751f2c3';

const ShareContent = ({ pureFriendList }: { pureFriendList: Friend[] }) => {
  const { data: session, status } = useSession();
  const token = session?.user?.info?.data?.token;

  const searchParams = useSearchParams();
  const seq = searchParams?.get('seq');

  const [uploading, setUploading] = useState(false); // 모달 상태 관리

  const [shareObj, setShareObj] = useState<any>({ images: [] });
  const [uploadedInfo, setUploadedInfo] = useState<UploadInfoTypes | null>(null);
  const [previews, setPreviews] = useState<any>([]);

  const props = { shareObj, setShareObj, uploadedInfo, setUploadedInfo, previews, setPreviews };

  const currentTime = moment().format('HH');
  const getTime = () => {
    if (Number(currentTime) > 18) {
      return 3;
    }
    if (Number(currentTime) > 12) {
      return 2;
    }
    if (Number(currentTime) > 6) {
      return 1;
    }
  };

  const onClickShare = async () => {
    if (!shareObj?.userSeq) {
      message.warning('대상을 먼저 선택해주세요.');
      return;
    }
    if (!shareObj?.time) {
      message.warning('시간대를 선택해주세요.');
      return;
    }
    if (!shareObj?.content) {
      message.warning('내용을 입력해주세요.');
      return;
    }
    if (!shareObj?.images?.length) {
      message.warning('이미지를 업로드해주세요.');
      return;
    }

    setUploading(true);

    let fileCds = [];
    // 이미지 업로드
    if (shareObj?.images) {
      const uploadResult = await uploadFile(shareObj?.images, token);
      if (uploadResult?.success) {
        fileCds = uploadResult?.files?.map((e: any) => e?.file_cd);
      } else {
        message.warning(uploadResult?.message || '에러');
        setUploading(false);
        return;
      }
    }

    const formData = {
      to_user_seq: shareObj?.userSeq,
      time: shareObj?.time,
      content: shareObj?.content,
      images: fileCds,
    };

    const updateResult = await contentPut(formData, token);
    if (updateResult?.success) {
      message.success('입력하신 정보로 공유되었습니다.');
      setShareObj({ Images: [] });
      setUploadedInfo(null);
      setPreviews([]);
    } else {
      message.warning(updateResult?.message || '에러');
      setUploading(false);
    }

    setUploading(false);
  };

  useEffect(() => {
    if (
      pureFriendList?.length &&
      pureFriendList?.find((e: any) => e.to_user_seq === Number(seq)) &&
      seq
    ) {
      setShareObj({ ...shareObj, userSeq: Number(seq), time: getTime() });
    }
  }, [pureFriendList, seq]);

  useEffect(() => {
    setShareObj({ ...shareObj, time: getTime() });
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <Image src="/img/share/share.png" alt="Attendance" width={300} height={210} />
      </div>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <Titles name="대상 선택" required />
              <Select
                placeholder="공유할 친구를 선택해주세요."
                options={pureFriendList?.map((e: Friend, i: number) => ({
                  value: e?.to_user_seq,
                  label: (
                    <>
                      <Avatar
                        size={32}
                        icon={
                          e?.profile_path ? (
                            <img
                              src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${`${e?.profile_path}?thumb=1`}`}
                              alt="avatar"
                            />
                          ) : (
                            <Image src={unknownAvatar} alt="unknown" />
                          )
                        }
                      />{' '}
                      {`${e?.to_user_nm} (${e?.to_user_id})`}
                    </>
                  ),
                }))}
                value={shareObj?.userSeq}
                style={{ width: '100%', height: 55 }}
                onChange={(e: string) => setShareObj({ ...shareObj, userSeq: e })}
                size="large"
              />
            </div>
            <div>
              <Titles name="시간대" required />
              <Radio.Group
                value={shareObj?.time}
                size="large"
                buttonStyle="solid"
                onChange={(e: RadioChangeEvent) =>
                  setShareObj({ ...shareObj, time: e.target.value })
                }
                style={{ display: 'flex', textAlign: 'center', height: 55, fontWeight: 600 }}
              >
                <Radio.Button value={1} style={{ flex: 1, height: '100%', lineHeight: '50px' }}>
                  아침
                </Radio.Button>
                <Radio.Button value={2} style={{ flex: 1, height: '100%', lineHeight: '50px' }}>
                  점심
                </Radio.Button>
                <Radio.Button value={3} style={{ flex: 1, height: '100%', lineHeight: '50px' }}>
                  저녁
                </Radio.Button>
              </Radio.Group>
            </div>
            <div>
              <Titles name="내용" required />
              <Input.TextArea
                placeholder="내용을 작성해주세요."
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setShareObj({ ...shareObj, content: e.target.value })
                }
                value={shareObj?.content}
                style={{ resize: 'none', height: 196, padding: 13 }}
                size="large"
              />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <FileUpload {...props} />
        </Col>
      </Row>
      <div style={{ marginTop: 10, textAlign: 'right' }}>
        <Button
          type="primary"
          onClick={onClickShare}
          style={{ width: 130, height: 50, fontWeight: 700 }}
        >
          공유하기
        </Button>
      </div>
      <Freepik link={freepikLink} name1="작가 coolvector" name2="출처 Freepik" />
      <Modal title="파일 업로드 중" visible={uploading} footer={null} closable={false}>
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <p>파일을 전송 중입니다...</p>
        </div>
      </Modal>
    </>
  );
};

export default ShareContent;

const Titles = ({ name, required }: { name: string; required: boolean }) => (
  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 7 }}>
    <span>{name}</span>
    {required && <span style={{ color: 'red' }}>(*)</span>}
  </div>
);
