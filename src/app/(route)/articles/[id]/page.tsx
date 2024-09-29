'use client';

import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Input,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  Tabs,
  Tooltip,
  message,
} from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  CommentOutlined,
  LikeOutlined,
  ShareAltOutlined,
  RollbackOutlined,
  InfoCircleOutlined,
  EditOutlined,
  HeartOutlined,
  HeartFilled,
  NotificationOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import 'moment/locale/ko';
import SlotCounter from 'react-slot-counter';
import type { Session } from 'next-auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import FlipNumbers from 'react-flip-numbers';
import KakaoSvg from '@/public/svg/kakao.svg';
import {
  deleteBoard,
  deleteComment,
  loadArticleData,
  loadBoardLikeCheck,
  loadCommentList,
  loadRegUserInfo,
  loadUserInfoData,
  putBoardLike,
  writeComment,
} from '@/api/Api';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import { BoardTypes, Comment, CommentTypes, RegUserInfoTypes } from '@/types/Board/Board.interface';
import { userInfoState } from '@/recoil/states';
import { useModal } from '@/hooks/useModal';

const Articles = () => {
  const router = useRouter();
  const params = useParams();

  const { Modal, isOpen, openModal, closeModal } = useModal();
  const {
    Modal: LoginModal,
    isOpen: isOpenLoginModal,
    openModal: openLoginModal,
    closeModal: closeLoginModal,
  } = useModal();

  const { data: session, status } = useSession();
  const [data, setData] = useState<BoardTypes | null>(null);
  const [regUserInfo, setRegUserInfo] = useState<RegUserInfoTypes | null>(null);
  const [commentList, setCommentList] = useState<CommentTypes | null>(null);
  const [selectedCommentSeq, setSelectedCommentSeq] = useState<number | null>(null);
  const isMyArticle = data?.reg_user_seq === session?.user?.info?.userInfo?.user_seq;

  const profileImg = data?.profile_path ? `${data?.profile_path}?thumb=1` : null;
  const profile = profileImg ? (
    <img src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profileImg}`} alt="profile" />
  ) : (
    <Image src={unknownAvatar} alt="unknown" />
  );

  const id = params?.id;

  const user = session?.user;
  const {
    data: boardLikeCheck,
    isSuccess,
    isError,
    refetch: boardLikeRefetch,
  } = useQuery({
    queryKey: ['boardLikeCheck'],
    queryFn: async () => {
      const result = await loadBoardLikeCheck({
        board_seq: id,
      });
      if (result?.success) {
        return result?.data;
      }
      return null;
    },
    enabled: !!user,
  });

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
      setCommentList({ list: result?.list, count: result?.count });
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

  const onClickDeleteBoard = async () => {
    const formData = {
      board_seq: data?.board_seq,
    };
    const result = await deleteBoard(formData);
    if (result?.success) {
      message.success('게시글이 삭제되었습니다.');
      router.push('/community');
    } else {
      alert(result?.err || '에러발생');
    }
  };

  const onClickBoardLike = async () => {
    if (!session) {
      openLoginModal();
      return;
    }

    const formData = {
      board_seq: data?.board_seq,
    };
    const result = await putBoardLike(formData);
    if (result?.success) {
      // 좋아요 등록 => 카운트 증가
      if (!boardLikeCheck && data) setData({ ...data, like_cnt: data.like_cnt + 1 });
      // 좋아요 취소 => 카운트 감소
      if (boardLikeCheck && data) setData({ ...data, like_cnt: data.like_cnt - 1 });

      // 항목에 따른 메시지 표시
      message.success(
        !boardLikeCheck ? '좋아요 등록이 완료되었습니다.' : '좋아요 등록이 취소되었습니다.',
      );
      boardLikeRefetch();
    } else {
      message.success(result?.message || '에러발생');
    }
  };

  const handleShearToKakao = () => {
    const { Kakao, location } = window;
    // Kakao.Share.sendScrap({
    //   requestUrl: location.href,
    // });
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: data?.title,
        // description: '공유할 설명',
        imageUrl:
          'https://github.com/ilimes/ilimes.github.io/assets/95404736/e45aba79-622e-4475-a783-852606f0541c',
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
      ],
    });
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
          <StyledOutDiv
            style={{ fontSize: 13, color: 'grey', display: 'flex', alignItems: 'center', gap: 2 }}
          >
            {moment(data?.reg_dt).isAfter(moment().subtract(1, 'd'))
              ? moment(data?.reg_dt).fromNow()
              : moment(data?.reg_dt).format('LLL')}
            <span style={{ margin: '0 5px' }}>·</span>
            {/* 조회수, 댓글, 좋아요 */}
            <span style={{ display: 'flex', gap: 3 }}>
              <EyeOutlined style={{ color: '#beb4b4' }} /> {data?.view_cnt}
              <span>·</span>
            </span>
            <span style={{ display: 'flex', gap: 3 }}>
              <CommentOutlined style={{ color: '#beb4b4' }} /> {data?.comment_cnt}
              <span>·</span>
            </span>
            <span>
              <span style={{ display: 'flex', gap: 3 }}>
                <HeartFilled style={{ color: '#F04C53' }} />
                <span>
                  {/* <SlotCounter value={data?.like_cnt || 0} /> */}
                  <FlipNumbers
                    play
                    color="#808080"
                    duration={1.5}
                    width={10}
                    height={13}
                    numbers={data?.like_cnt?.toString() || '0'}
                  />
                </span>
              </span>
            </span>
          </StyledOutDiv>
        </StyledOutDiv>
      </div>
      {/* 제목 영역 */}
      <Skeleton paragraph={{ rows: 0 }} loading={!data} active>
        <Title>{data?.title}</Title>
      </Skeleton>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: 20,
          gap: 10,
        }}
      >
        {isMyArticle && (
          <div style={{ display: 'flex', gap: 10 }}>
            <Button onClick={() => router.push(`/articles/write?id=${data?.board_seq}`)}>
              <EditOutlined />
              게시글 수정
            </Button>
            <Button danger onClick={openModal}>
              <DeleteOutlined />
              게시글 삭제
            </Button>
          </div>
        )}
        {!isMyArticle && (
          <Button>
            <NotificationOutlined />
            신고하기
          </Button>
        )}
        <Button onClick={handleShearToKakao}>
          {/* <ShareAltOutlined /> */}
          <KakaoSvg
            style={{
              width: 16,
              height: 16,
              marginRight: 7,
              verticalAlign: 'text-bottom',
              fill: '#3C1E1E',
            }}
          />
          카카오로 공유하기
        </Button>
      </div>
      {/* 컨텐츠 영역 */}
      <Skeleton paragraph={{ rows: 3 }} loading={!data} active>
        <StyledContentDiv dangerouslySetInnerHTML={{ __html: data?.content ?? '' }} />
      </Skeleton>
      {/* 태그 영역 */}
      <div style={{ margin: '30px 0', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {data?.tag_names
          ?.split(':')
          ?.map((e: string, i: number) => <StyledTagSpan key={i}>#{e}</StyledTagSpan>)}
      </div>
      {/* 추천 영역 */}
      <StyledLikeBtn $background={boardLikeCheck ? '#ffdcdc' : '#fff'} onClick={onClickBoardLike}>
        {/* <LikeOutlined style={{ color: '#beb4b4' }} /> 추천하기 */}
        {/* <LikeFilled style={{ color: '#5383EC' }} /> 추천취소 */}
        {!boardLikeCheck && (
          <>
            <HeartOutlined style={{ color: '#F04C53' }} /> 좋아요
          </>
        )}
        {boardLikeCheck && (
          <>
            <HeartFilled style={{ color: '#F04C53' }} /> 좋아요 취소
          </>
        )}
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
                <PlusOutlined /> 팔로우
              </StyledPlusBtn>
            )}
          </Skeleton>
        </div>
      }
      <Divider />
      {/* 댓글 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ fontSize: 18 }}>댓글 {commentList?.count}</div>
        {commentList?.list?.map((e: Comment, i: number) => (
          <div key={i}>
            <CommentDiv
              e={e}
              selectedCommentSeq={selectedCommentSeq}
              setSelectedCommentSeq={setSelectedCommentSeq}
              getCommentList={getCommentList}
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
                  {e?.children?.map((ele: Comment, idx: number) => (
                    <div key={idx} id={`comment-${ele?.comment_seq}`}>
                      <CommentDiv
                        e={ele}
                        selectedCommentSeq={selectedCommentSeq}
                        setSelectedCommentSeq={setSelectedCommentSeq}
                        getCommentList={getCommentList}
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
      <Modal title="삭제" isOpen={isOpen} closeModal={closeModal}>
        <div style={{ margin: '30px 0' }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>정말 게시글을 삭제하시겠습니까?</div>
          <div style={{ color: 'grey' }}>삭제 버튼을 누르면 현재 보고있는 게시글이 삭제됩니다.</div>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button onClick={closeModal}>취소</Button>
          <Button
            danger
            onClick={() => {
              onClickDeleteBoard();
              closeModal();
            }}
          >
            삭제
          </Button>
        </div>
      </Modal>
      <LoginModal
        title="로그인이 필요합니다."
        isOpen={isOpenLoginModal}
        closeModal={closeLoginModal}
      >
        <div>게시글에 좋아요를 누르시려면 로그인이 필요합니다.</div>
        <div>로그인 페이지로 이동할까요?</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button onClick={closeLoginModal}>취소</Button>
          <Button
            type="primary"
            onClick={() => {
              router.push('/auth/login');
            }}
          >
            이동
          </Button>
        </div>
      </LoginModal>
    </div>
  );
};

const CommentDiv = ({
  e,
  selectedCommentSeq,
  setSelectedCommentSeq,
  getCommentList,
}: {
  e: any;
  selectedCommentSeq: any;
  setSelectedCommentSeq: any;
  getCommentList: any;
}) => {
  const { data: session, status } = useSession();
  const commentRef = useRef<any>(null);
  const pathname = usePathname();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const onClickDeleteComment = async () => {
    const formData = {
      comment_seq: e?.comment_seq,
    };
    const result = await deleteComment(formData);
    if (result?.success) {
      message.success('댓글이 삭제되었습니다.');
      getCommentList();
    } else {
      alert(result?.err || '에러발생');
    }
  };

  useEffect(() => {
    const handleScrollToComment = async () => {
      const { hash } = window.location;

      if (hash === `#comment-${e.comment_seq}` && commentRef.current) {
        requestAnimationFrame(() => {
          commentRef.current.scrollIntoView({ behavior: 'smooth' });
        });

        // 깜빡임 효과 함수
        const blink = (delay: number) =>
          new Promise((resolve) => {
            setIsHighlighted(true);
            setTimeout(() => {
              setIsHighlighted(false);
              setTimeout(resolve, delay);
            }, delay);
          });

        // 두 번 깜빡이기
        await blink(500);
        await blink(500);
      }
    };

    // 스크롤 시점을 렌더링 완료 후로 지연
    setTimeout(handleScrollToComment, 300);
  }, [pathname, e?.comment_seq]);

  return (
    <>
      <StyledCommentWrapDiv
        ref={commentRef}
        id={`comment-${e?.comment_seq}`}
        $isHighlighted={isHighlighted}
      >
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
            {e?.reg_user_seq === session?.user?.info?.userInfo?.user_seq ? (
              <Popconfirm
                title="정말 삭제하시겠습니까?"
                onConfirm={onClickDeleteComment}
                okText="삭제"
                cancelText="취소"
              >
                <span style={{ color: '#f04c53', fontSize: 14, cursor: 'pointer' }}>
                  {' '}
                  <span style={{ color: '#000' }}>·</span> 삭제
                </span>
              </Popconfirm>
            ) : (
              ''
            )}
          </div>
        </div>
      </StyledCommentWrapDiv>
    </>
  );
};

export default Articles;

const Title = styled.div`
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 20px;
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

const StyledLikeBtn = styled.div<{ $background: string }>`
  border: 1px solid #ababab;
  color: #0c0c0c;
  border-radius: 20px;
  padding: 10px 10px 10px 6px;
  margin: 0 auto 30px auto;
  width: 170px;
  text-align: center;
  ${({ $background }) => `background: ${$background};`}
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

const StyledContentDiv = styled.div`
  white-space: normal;
  line-height: 1.4;
  p {
    margin: 0;
  }
  img {
    max-width: 100%;
  }
`;

const StyledCommentWrapDiv = styled.div<{ $isHighlighted?: boolean }>`
  display: flex;
  transition: background-color 0.5s ease;
  background-color: ${({ $isHighlighted }) => ($isHighlighted ? 'yellow' : 'transparent')};
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
