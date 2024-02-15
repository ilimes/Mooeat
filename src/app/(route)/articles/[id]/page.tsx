'use client';

import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Input,
  Row,
  Skeleton,
  Tabs,
  Tooltip,
  message,
} from 'antd';
import {
  UserOutlined,
  PlusOutlined,
  EyeOutlined,
  CommentOutlined,
  LikeOutlined,
  LikeFilled,
  RollbackOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter, useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import 'moment/locale/ko';
import type { Session } from 'next-auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { loadArticleData, loadCommentList, loadRegUserInfo, writeComment } from '@/api/Api';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import { BoardTypes, CommentTypes, RegUserInfoTypes } from '@/types/Board/Board.interface';
import { userInfoState } from '@/recoil/states';

const Articles = () => {
  const router = useRouter();
  const params = useParams();

  const { data: session, status } = useSession();
  const [data, setData] = useState<BoardTypes | null>(null);
  const [regUserInfo, setRegUserInfo] = useState<RegUserInfoTypes | null>(null);
  const [commentList, setCommentList] = useState<CommentTypes[] | null>(null);
  const [selectedCommentSeq, setSelectedCommentSeq] = useState<number | null>(null);

  const profileImg = data?.profile_path ? `${data?.profile_path}?thumb=1` : null;
  const profile = profileImg ? (
    <img src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profileImg}`} alt="profile" />
  ) : (
    <Image src={unknownAvatar} alt="unknown" />
  );

  const id = params?.id;

  const getArticleData = async () => {
    const formData = { board_num: id };
    const result = await loadArticleData(formData);
    if (result?.success) {
      setData(result?.data);
    } else {
      alert(result?.err || '에러발생');
      router.push('/community');
    }
  };

  const getCommentList = async () => {
    const formData = { board_num: id };
    const result = await loadCommentList(formData);
    if (result?.success) {
      setCommentList(result?.list);
    } else {
      alert(result?.err || '에러발생');
    }
  };

  const getRegUserInfo = async (user_seq: number) => {
    const formData = { user_seq };
    // 작성자 정보 조회
    const result = await loadRegUserInfo(formData);
    if (result?.success) {
      setRegUserInfo(result?.data);
    } else {
      alert(result?.err || '에러발생');
    }
  };

  useEffect(() => {
    if (status !== 'loading') {
      getArticleData();
      getCommentList();
      // 최상단으로 스크롤
      window.scrollTo(0, 0);
    }
  }, [status]);

  useEffect(() => {
    if (data) {
      getRegUserInfo(data?.reg_user_seq);
    }
  }, [data]);

  return (
    <div>
      {/* 메뉴 설명 영역 */}
      <Explain>
        커뮤니티 / <span style={{ color: '#4F4791' }}>{data?.cate_nm}</span>
      </Explain>
      {/* 아바타 영역 */}
      <div style={{ margin: '30px 0', display: 'flex', gap: 10 }}>
        <div>
          <Avatar size={40} icon={profile} />
        </div>
        <StyledOutDiv>
          <StyledOutDiv style={{ fontSize: 15, marginBottom: 5 }}>{data?.reg_user_nm}</StyledOutDiv>
          <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>
            {moment(data?.reg_dt).isAfter(moment().subtract(1, 'd'))
              ? moment(data?.reg_dt).fromNow()
              : moment(data?.reg_dt).format('LLL')}
            <span style={{ margin: '0 5px' }}>·</span>
            {/* 조회수, 댓글, 좋아요 */}
            <EyeOutlined style={{ color: '#beb4b4' }} /> {data?.view_cnt}
            <span style={{ margin: '0 5px' }}>·</span>
            <CommentOutlined style={{ color: '#beb4b4' }} /> {data?.comment_cnt}
            <span style={{ margin: '0 5px' }}>·</span>
            <LikeOutlined style={{ color: '#beb4b4' }} /> {data?.like_cnt}
          </StyledOutDiv>
        </StyledOutDiv>
      </div>
      {/* 제목 영역 */}
      <Skeleton paragraph={{ rows: 0 }} loading={!data} active>
        <Title>{data?.title}</Title>
      </Skeleton>
      {/* 컨텐츠 영역 */}
      <Skeleton paragraph={{ rows: 3 }} loading={!data} active>
        <div
          dangerouslySetInnerHTML={{ __html: data?.content ?? '' }}
          style={{ whiteSpace: 'normal', lineHeight: 1.23 }}
        />
      </Skeleton>
      {/* 태그 영역 */}
      <div style={{ margin: '30px 0', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {data?.tag_names
          ?.split(':')
          ?.map((e: string, i: number) => <StyledTagSpan key={i}>#{e}</StyledTagSpan>)}
      </div>
      {/* 추천 영역 */}
      <StyledLikeBtn>
        <LikeOutlined style={{ color: '#beb4b4' }} /> 추천하기
        {/* <LikeFilled style={{ color: '#5383EC' }} /> 추천취소 */}
      </StyledLikeBtn>
      {/* 작성자 정보 영역 */}
      {
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#F5F5F5',
            borderRadius: 12,
            padding: 40,
            gap: 30,
            height: 140,
          }}
        >
          <Skeleton paragraph={{ rows: 2 }} loading={!regUserInfo} active>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{regUserInfo?.user_info?.user_nm}</div>
              <div style={{ fontSize: 16, fontWeight: 400 }}>
                {regUserInfo?.user_info?.introduce || '자기소개가 존재하지 않습니다.'}
              </div>
            </div>
            {/* 자기 자신에게는 구독하기 버튼 나타타지 않음 */}
            {regUserInfo?.user_info?.user_seq !== session?.user?.info?.userInfo?.user_seq && (
              <StyledPlusBtn>
                <PlusOutlined /> 구독하기
              </StyledPlusBtn>
            )}
          </Skeleton>
        </div>
      }
      <Divider />
      {/* 댓글 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ fontSize: 18 }}>댓글 {commentList?.length}</div>
        {commentList?.map((e: CommentTypes, i: number) => (
          <div key={i}>
            <CommentDiv
              e={e}
              selectedCommentSeq={selectedCommentSeq}
              setSelectedCommentSeq={setSelectedCommentSeq}
            />
            {e?.children?.length ? (
              <>
                <div
                  style={{
                    background: '#f5f5f5',
                    margin: '20px 0px 0px 30px',
                    padding: 20,
                    borderRadius: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 40,
                  }}
                >
                  {e?.children?.map((ele: CommentTypes, idx: number) => (
                    <div key={idx}>
                      <CommentDiv
                        e={ele}
                        selectedCommentSeq={selectedCommentSeq}
                        setSelectedCommentSeq={setSelectedCommentSeq}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}
            {e?.comment_seq === selectedCommentSeq && (
              <ReplyDiv
                key="subReply"
                session={session}
                router={router}
                getCommentList={getCommentList}
                selectedCommentSeq={selectedCommentSeq}
                setSelectedCommentSeq={setSelectedCommentSeq}
                isReply
              />
            )}
          </div>
        ))}
        <ReplyDiv
          key="mainReply"
          session={session}
          router={router}
          getCommentList={getCommentList}
          setSelectedCommentSeq={setSelectedCommentSeq}
          isReply={false}
        />
        <div style={{ textAlign: 'right' }}>
          <Button
            style={{ height: 35, fontSize: 14, fontWeight: 800 }}
            onClick={() => router.push('/community')}
          >
            <RollbackOutlined />
            커뮤니티로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};

const CommentDiv = ({
  e,
  selectedCommentSeq,
  setSelectedCommentSeq,
}: {
  e: any;
  selectedCommentSeq: any;
  setSelectedCommentSeq: any;
}) => (
  <>
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: 10 }}>
        <Avatar
          size={55}
          icon={
            e?.profile_path ? (
              <img
                src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${`${e?.profile_path}?thumb=1`}`}
                alt="profile"
              />
            ) : (
              <Image src={unknownAvatar} alt="unknown" />
            )
          }
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ fontWeight: 700 }}>{e?.reg_user_nm}</div>
        <div>{e?.content}</div>
        <div style={{ fontSize: 13, marginTop: 10 }}>
          <span style={{ color: 'grey' }}>
            {moment(e?.reg_dt).isAfter(moment().subtract(1, 'd'))
              ? moment(e?.reg_dt).fromNow()
              : moment(e?.reg_dt).format('LLL')}
          </span>{' '}
          {!e?.parents_seq && (
            <>
              ·{' '}
              <span
                onClick={() =>
                  setSelectedCommentSeq(
                    e?.comment_seq === selectedCommentSeq ? null : e?.comment_seq,
                  )
                }
                aria-hidden="true"
                style={{ color: '#000', fontSize: 14, cursor: 'pointer' }}
              >
                {e?.comment_seq === selectedCommentSeq ? '답글 취소' : '답글 달기'}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  </>
);

export default Articles;

const Title = styled.div`
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 40px;
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`;

const StyledOutDiv = styled.div`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const StyledTagSpan = styled.span`
  background: #f9f9ff;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    color: #7944f4;
  }
`;

const StyledPlusBtn = styled.div`
  border: 1px solid #ababab;
  color: #0c0c0c;
  border-radius: 20px;
  padding: 10px 10px 10px 6px;
  width: 120px;
  text-align: center;
  &:hover {
    cursor: pointer;
    border: 1px solid black;
    color: black;
  }
`;

const StyledLikeBtn = styled.div`
  border: 1px solid #ababab;
  color: #0c0c0c;
  border-radius: 20px;
  padding: 10px 10px 10px 6px;
  margin: 0 auto 30px auto;
  width: 170px;
  text-align: center;
  &:hover {
    cursor: pointer;
    border: 1px solid black;
    color: black;
  }
`;

const StyledCommentDiv = styled.div`
  border: 1px solid #d0d2d5;
  min-height: 120px;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 5px;
  &:hover,
  &:focus-within {
    border: 1px solid black;
    color: black;
  }
`;

const ReplyDiv = ({
  session,
  router,
  getCommentList,
  selectedCommentSeq,
  setSelectedCommentSeq,
  isReply,
}: {
  session: Session | null;
  router: AppRouterInstance;
  getCommentList: () => Promise<void>;
  selectedCommentSeq?: number | null;
  setSelectedCommentSeq: Dispatch<SetStateAction<number | null>>;
  isReply: boolean;
}) => {
  const userInfo = useRecoilValue(userInfoState);
  const profileImg = userInfo?.user_set?.file_path_thumb;
  const profile = profileImg ? (
    <img src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profileImg}`} alt="profile" />
  ) : (
    <Image src={unknownAvatar} alt="unknown" />
  );
  const params = useParams();

  const [commentData, setCommentData] = useState<any>({});

  const onClickCommentWrite = async (isReply: boolean) => {
    const formData = { comment_cd: 'BOARD', target_seq: Number(params?.id), ...commentData };
    if (isReply) {
      formData.parents_seq = selectedCommentSeq;
    }
    if (!formData?.content) {
      message.warning('내용을 입력해주세요.');
      return;
    }
    const result = await writeComment(formData);
    if (result?.success) {
      message.success('댓글이 등록되었습니다.');
      getCommentList();
      setCommentData({});
      setSelectedCommentSeq(null);
    } else {
      message.warning(result?.message || '에러발생');
    }
  };

  return (
    <div style={{ display: 'flex', paddingLeft: isReply ? 50 : 0, marginTop: 20 }}>
      <div style={{ marginRight: 10 }}>
        <Avatar size={55} icon={profile} />
      </div>
      <div style={{ flex: 1 }}>
        <StyledCommentDiv>
          <div style={{ fontWeight: 400, marginBottom: 5 }}>
            {!session && (
              <div>
                <InfoCircleOutlined />
                <Tooltip title="클릭 시 로그인 페이지로 이동합니다.">
                  <span
                    style={{
                      fontWeight: 700,
                      color: '#4F4791',
                      cursor: 'pointer',
                      marginLeft: 5,
                    }}
                    aria-hidden="true"
                    onClick={() => router.push('/auth/login')}
                  >
                    로그인
                  </span>
                </Tooltip>{' '}
                후 이용해주세요.
              </div>
            )}
            {session && session?.user?.info?.userInfo?.user_nm}
          </div>
          <Input.TextArea
            className="commentArea"
            value={commentData?.content}
            onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
            bordered={false}
            placeholder="내용을 입력해주세요."
            style={{ padding: 0, resize: 'none', marginBottom: 10 }}
            autoSize
            disabled={!session}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 15,
            }}
          >
            {/* <div style={{ display: "flex", gap: 5 }}>
                  <Checkbox />
                  <div style={{ display: "flex", alignItems: "self-end" }}>
                    비밀글
                  </div>
                </div> */}
            <Button
              type="primary"
              style={{ height: 45, fontSize: 15, fontWeight: 800 }}
              onClick={() => onClickCommentWrite(!!isReply)}
              disabled={!session}
            >
              댓글 쓰기
            </Button>
          </div>
        </StyledCommentDiv>
      </div>
    </div>
  );
};
