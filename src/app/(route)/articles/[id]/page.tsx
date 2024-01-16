"use client";

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
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  EyeOutlined,
  CommentOutlined,
  LikeOutlined,
  LikeFilled,
  RollbackOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import moment from "moment";
import "moment/locale/ko";
import {
  BoardTypes,
  CommentTypes,
  RegUserInfoTypes,
} from "@/types/Board/Board.interface";
import type { Session } from 'next-auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { loadArticleData, loadCommentList, loadRegUserInfo } from '@/api/Api';

const Articles = () => {
  const router = useRouter();
  const params = useParams();

  const { data: session, status } = useSession();
  const [data, setData] = useState<BoardTypes | null>(null);
  const [regUserInfo, setRegUserInfo] = useState<RegUserInfoTypes | null>(null);
  const [commentList, setCommentList] = useState<CommentTypes[] | null>(null);
  const [selectedCommentSeq, setSelectedCommentSeq] = useState<number | null>(null)
  const id = params?.id;

  const getArticleData = async () => {
    const formData = { board_num: id };
    // const result = await fetchArticleData(formData);
    const result = await loadArticleData(formData);
    if (result?.success) {
      setData(result?.data);
    } else {
      alert(result?.err || "에러발생");
      router.push("/community");
    }
  };

  const getCommentList = async () => {
    const formData = { board_num: id };
    // const result = await fetchCommentList(formData);
    const result = await loadCommentList(formData);
    if (result?.success) {
      setCommentList(result?.list);
    } else {
      alert(result?.err || "에러발생");
    }
  };

  const getRegUserInfo = async (user_seq: number) => {
    const formData = { user_seq };
    // 작성자 정보 조회
    // const result = await fetchRegUserInfo(formData);
    const result = await loadRegUserInfo(formData);
    if (result?.success) {
      setRegUserInfo(result?.data);
    } else {
      alert(result?.err || "에러발생");
    }
  };

  useEffect(() => {
    if (status != 'loading') {
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
        커뮤니티 / <span style={{ color: "#4F4791" }}>{data?.cate_nm}</span>
      </Explain>
      {/* 아바타 영역 */}
      <div style={{ margin: "30px 0", display: "flex", gap: 10 }}>
        <div>
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <StyledOutDiv>
          <StyledOutDiv style={{ fontSize: 15, marginBottom: 5 }}>
            {data?.reg_user_nm}
          </StyledOutDiv>
          <StyledOutDiv style={{ fontSize: 13, color: "grey" }}>
            {moment(data?.reg_dt).isAfter(moment().subtract(1, "d"))
              ? moment(data?.reg_dt).fromNow()
              : moment(data?.reg_dt).format("LLL")}
            <span style={{ margin: "0 5px" }}>·</span>
            {/* 조회수, 댓글, 좋아요 */}
            <EyeOutlined style={{ color: "#beb4b4" }} /> {data?.view_cnt}
            <span style={{ margin: "0 5px" }}>·</span>
            <CommentOutlined style={{ color: "#beb4b4" }} /> {data?.comment_cnt}
            <span style={{ margin: "0 5px" }}>·</span>
            <LikeOutlined style={{ color: "#beb4b4" }} /> {data?.like_cnt}
          </StyledOutDiv>
        </StyledOutDiv>
      </div>
      {/* 제목 영역 */}
      <Skeleton paragraph={{ rows: 0 }} loading={!data ? true : false} active>
        <Title>{data?.title}</Title>
      </Skeleton>
      {/* 컨텐츠 영역 */}
      <Skeleton paragraph={{ rows: 3 }} loading={!data ? true : false} active>
        <div style={{ whiteSpace: "normal" }}>{data?.content}</div>
      </Skeleton>
      {/* 태그 영역 */}
      <div
        style={{ margin: "30px 0", display: "flex", flexWrap: "wrap", gap: 10 }}
      >
        {data?.tag_names?.split(":")?.map((e: string, i: number) => (
          <StyledTagSpan key={i}>#{e}</StyledTagSpan>
        ))}
      </div>
      {/* 추천 영역 */}
      <StyledLikeBtn>
        <LikeOutlined style={{ color: "#beb4b4" }} /> 추천하기
        {/* <LikeFilled style={{ color: '#5383EC' }} /> 추천취소 */}
      </StyledLikeBtn>
      {/* 작성자 정보 영역 */}
      {
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#F5F5F5",
              borderRadius: 12,
              padding: 40,
              gap: 30,
              height: 200,
            }}
          >
            <Skeleton
              paragraph={{ rows: 2 }}
              loading={!regUserInfo ? true : false}
              active
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div style={{ fontSize: 18, fontWeight: 600 }}>
                  {regUserInfo?.user_info?.user_nm}
                </div>
                <div style={{ fontSize: 16, fontWeight: 400 }}>
                  {regUserInfo?.user_info?.introduce ||
                    "자기소개가 존재하지 않습니다."}
                </div>
              </div>
              {/* 자기 자신에게는 구독하기 버튼 나타타지 않음 */}
              {regUserInfo?.user_info?.user_seq !=
                session?.user?.token?.userInfo?.user_seq && (
                <StyledPlusBtn>
                  <PlusOutlined /> 구독하기
                </StyledPlusBtn>
              )}
            </Skeleton>
          </div>
        </>
      }
      <Divider />
      {/* 댓글 영역 */}
      <div>
        <div style={{ marginBottom: 20, fontSize: 18 }}>
          댓글 {commentList?.length}
        </div>
        {commentList?.map((e: CommentTypes, i: number) => (
          <>
            <div key={i} style={{ display: "flex", marginBottom: 40 }}>
              <div style={{ marginRight: 10 }}>
                <Avatar size={55} icon={<UserOutlined />} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ fontWeight: 600 }}>{e?.reg_user_nm}</div>
                <div>{e?.content}</div>
                <div style={{ fontSize: 13, marginTop: 10 }}>
                  <span style={{ color: "grey" }}>
                    {moment(e?.reg_dt).isAfter(moment().subtract(1, "d"))
                      ? moment(e?.reg_dt).fromNow()
                      : moment(e?.reg_dt).format("LLL")}
                  </span>{" "}
                  ·{" "}
                  <span
                    onClick={() => !selectedCommentSeq ? setSelectedCommentSeq(e?.comment_seq) : setSelectedCommentSeq(null)}
                    style={{ color: "#000", fontSize: 14, cursor: "pointer" }}
                  >
                    {selectedCommentSeq && "달기 취소"}
                    {!selectedCommentSeq && "답글 달기"}
                  </span>
                </div>
              </div>
            </div>
            {
              (e?.comment_seq === selectedCommentSeq) &&
              <ReplyDiv session={session} router={router} isPadding={true} />
            }
          </>
        ))}
        <ReplyDiv session={session} router={router} isPadding={false} />
        <div style={{ textAlign: "right" }}>
          <Button
            style={{ height: 35, fontSize: 14, fontWeight: 800 }}
            onClick={() => router.push("/community")}
          >
            <RollbackOutlined />
            커뮤니티로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Articles;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
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

const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const BtnGroup = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #606060;
`;

const StyledSpan = styled.span`
  && {
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
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

const fetchArticleData = async (formData: { board_num: string | string[] }) => {
  const res = await fetch(`/api/board/view`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  const result = await res.json();

  return result?.data;
};

const fetchCommentList = async (formData: { board_num: string | string[] }) => {
  const res = await fetch(`/api/board/comment/list`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  const result = await res.json();

  return result?.data;
};

const fetchRegUserInfo = async (formData: { user_seq: number }) => {
  const res = await fetch(`/api/board/user/info`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  const result = await res.json();

  return result?.data;
};

const ReplyDiv = ({session, router, isPadding}: {session: Session | null, router: AppRouterInstance, isPadding: boolean}) => {
  return (
    <div style={{ display: "flex", paddingLeft: isPadding ? 50 : 0 }}>
          <div style={{ marginRight: 10 }}>
            <Avatar size={55} icon={<UserOutlined />} />
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
                          fontWeight: 600,
                          color: "#4F4791",
                          cursor: "pointer",
                          marginLeft: 5,
                        }}
                        onClick={() => router.push("/auth/login")}
                      >
                        로그인
                      </span>
                    </Tooltip>{" "}
                    후 이용해주세요.
                  </div>
                )}
                {session && session?.user?.token?.userInfo?.user_nm}
              </div>
              <Input.TextArea
                className="commentArea"
                bordered={false}
                placeholder="내용을 입력해주세요."
                style={{ padding: 0, resize: "none", marginBottom: 10 }}
                autoSize
                disabled={!session ? true : false}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <div style={{ display: "flex", gap: 5 }}>
                  <Checkbox />
                  <div style={{ display: "flex", alignItems: "self-end" }}>
                    비밀글
                  </div>
                </div>
                <Button
                  type="primary"
                  style={{ height: 45, fontSize: 15, fontWeight: 800 }}
                  disabled={!session ? true : false}
                >
                  댓글 쓰기
                </Button>
              </div>
            </StyledCommentDiv>
          </div>
        </div>
  )
}