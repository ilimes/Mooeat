"use client";

import { Button, Input, Select, Tooltip, message } from "antd";
import { PlusOutlined, CloseCircleOutlined, RollbackOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import QuillNoSSRWrapper from '@/components/QuillNoSSRWrappper';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { loadInfoList, writeBoard } from "@/api/Api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface TagInputProps {
  placeholder: string;
  spellCheck: boolean;
  contentEditable: boolean;
  onInput: (e: React.ChangeEvent<HTMLSpanElement>) => void;
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

interface IInfoTypes {
  value: string;
  label: string;
}

const Write = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.info?.data?.token;
  const router = useRouter();
  const quillInstance = useRef<ReactQuill>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [infoItems, setInfoItems] = useState<IInfoTypes[]>([]);
  const [pushDatas, setPushDatas] = useState<any>({ tags: [] });
  const [newTagText, setNewTagText] = useState<string>('');
  const ref = useRef<HTMLSpanElement>(null);
  
  // 최대 입력가능한 글자수
  const MAX_LENGTH = 10;

  // onInput handler
  const handleInputEvent = (e: React.ChangeEvent<HTMLSpanElement>) => {
    const newValue = e.target.innerText;
    if (newValue.length >= MAX_LENGTH) {
      // setEditable(false);
      message.warning('태그는 최대 10글자 까지만 입력 가능합니다.');
      if (ref.current) {
        ref.current.innerHTML = newTagText;
      }
      return false;
    } else {
      setNewTagText(newValue);
    }
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      // 기본 엔터 동작을 막지 않으면 개행 문자가 삽입된다.
      e.preventDefault();
      if (!newTagText) {
        message.warning('태그를 입력하신 뒤 엔터를 눌러주세요.')
      } else if (pushDatas?.tags?.find((e: any) => e === newTagText)) {
        message.warning('이미 등록되어 있는 태그입니다.')
      } else if (pushDatas?.tags?.length > 4) {
        message.warning('태그는 최대 5개까지만 등록 가능합니다.')
      } else {
        setPushDatas({...pushDatas, tags: [...pushDatas?.tags, newTagText]});
        setNewTagText('');
        if (ref.current) {
          ref.current.innerHTML = '';
        }
      }
    }
  }

  const getInfoList = async () => {
    const result = await loadInfoList();
    setInfoItems([...result?.list?.map((e: any) => ({
      value: `${e.cate_seq}`,
      label: `${e.cate_nm}`,
    }))])
  }

  const putBoardData = async () => {
    const formData = pushDatas;

    if (!formData?.cate_seq) {
      message.warning("카테고리를 선택해주세요.");
      return;
    }

    if (!formData?.title?.length) {
      message.warning("제목을 입력해주세요.");
      return;
    }

    if (!formData?.content?.replace(/(<([^>]+)>)/gi, '')?.length) {
      message.warning("내용을 입력해주세요.");
      return;
    }
    
    const result = await writeBoard(formData, token);
    if (result?.success) {
      message.success("성공적으로 등록되었습니다.")
      router.push('/community');
    } else {
      message.error(result?.message || '에러 발생')
    }
  }

  useEffect(() => {
    getInfoList();
  }, [])

  return (
    <>
      <Title>글쓰기</Title>
      <Explain>커뮤니티 이용 가이드에 위배되는 게시글을 작성하는 경우 삭제될 수 있습니다.</Explain>
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10 }}>카테고리</div>
      <Select value={pushDatas?.cate_seq} options={infoItems} onChange={(e) => setPushDatas({... pushDatas, cate_seq: e})} placeholder="카테고리 선택" style={{ width: 150 }} size="large" />
      <div style={{ fontWeight: 600, fontSize: 15, margin: '10px 0' }}>제목</div>
      <Input value={pushDatas?.title} onChange={(e) => setPushDatas({...pushDatas, title: e.target.value})} placeholder="제목을 입력해주세요." size="large" />
      <div style={{ fontWeight: 600, fontSize: 15, margin: '10px 0' }}>내용</div>
      <div>
        <StyledReactQuill
          forwardedRef={quillInstance}
          value={pushDatas?.content}
          onChange={(e) => setPushDatas({...pushDatas, content: e})}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
      </div>
      <div style={{ fontWeight: 600, fontSize: 15, margin: '20px 0' }}>태그 (최대 5개)</div>
      <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
        {
          pushDatas?.tags?.map((e: any, i: number) => {
            return (
              <span key={i}>{e}{" "}
                <span onClick={() => setPushDatas({...pushDatas, tags: [...pushDatas?.tags?.filter((ele: any) => ele != e)]})} style={{ cursor: 'pointer' }}>
                  <CloseCircleOutlined />
                </span>
              </span>
            )
          })
        }
        <Tooltip trigger={['focus']} title={'태그 입력 후 엔터 키를 누르면 추가됩니다.'} placement="topLeft" overlayClassName="tag-input">
          <div onClick={ () => setEditable(true) }>
            <TagInput
              ref={ref}
              placeholder='태그 입력'
              spellCheck={ false }
              contentEditable={editable}
              onInput={handleInputEvent}
              onKeyDown={handleOnKeyPress}
            />
          </div>
        </Tooltip>
      </div>
      <div style={{ marginTop: 20, textAlign: 'right' }}>
        <Button
            onClick={() => router.push('/community')}
            style={{ width: 125, height: 47, fontWeight: "bold", fontSize: 16, marginRight: 10 }}
        >
            <RollbackOutlined /> 목록으로
        </Button>
        <Button
            type="primary"
            onClick={putBoardData}
            style={{ width: 125, height: 47, fontWeight: "bold", fontSize: 16 }}
        >
            <PlusOutlined /> 등록하기
        </Button>
      </div>
    </>
  );
};

export default Write;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`;

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`;

const StyledReactQuill = styled(QuillNoSSRWrapper)`
  .ql-container {
    min-height: 300px;
    max-height: 600px;
    overflow: auto;
  }
`;

const TagInput = styled.span<TagInputProps>`
  display: inline-block;
  font-weight: lighter;
  border-bottom: 1px solid #232323;
  font-size: 18px;
  max-width: 150px;
  min-width: 70px;

  // placeholder
  &:empty::before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  };
`