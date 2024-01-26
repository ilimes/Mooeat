"use client";

import { Button, Input, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import QuillNoSSRWrapper from '@/components/QuillNoSSRWrappper';
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';

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

const Write = () => {
  const quillInstance = useRef<ReactQuill>(null);
  const [editable, setEditable] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  
  // 최대 입력가능한 글자수
  const MAX_LENGTH = 20

  // onInput handler
  const handleInputEvent = (e: React.ChangeEvent<HTMLSpanElement>) => {
    const newValue = e.target.innerText;
    if (newValue.length >= MAX_LENGTH) {
      setEditable(false);
    }
    // onChange(newValue);
  };

  return (
    <>
      <Title>글쓰기</Title>
      <Explain>커뮤니티 이용 가이드에 위배되는 게시글을 작성하는 경우 삭제될 수 있습니다.</Explain>
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10 }}>제목</div>
      <Input size="large" placeholder="제목을 입력해주세요." />
      <div style={{ fontWeight: 600, fontSize: 15, margin: '10px 0' }}>내용</div>
      <div>
        <StyledReactQuill
          forwardedRef={quillInstance}
          // value={contents}
          // onChange={setContents}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
      </div>
      <div style={{ fontWeight: 600, fontSize: 15, margin: '20px 0' }}>태그 (최대 4개)</div>
      <div>
        <Tooltip trigger={['focus']} title={'태그 입력 후 엔터 키를 누르면 등록됩니다.'} placement="topLeft" overlayClassName="tag-input">
          {/* <Input style={{ width: 'fit-content' }} /> */}
          <div onClick={ () => setEditable(true) }>
            <TagInput
              ref={ref}
              placeholder='태그 입력'
              spellCheck={ false }
              contentEditable={editable}
              onInput={handleInputEvent}
            />
          </div>
        </Tooltip>
      </div>
      <div style={{ marginTop: 20, textAlign: 'right' }}>
        <Button
            type="primary"
            // htmlType="submit"
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
  max-width: calc(100% - 32px);
  min-width: 50px;

  // placeholder
  &:empty::before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  };
`