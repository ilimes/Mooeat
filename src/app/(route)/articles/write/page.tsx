"use client";

import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import QuillNoSSRWrapper from '@/components/QuillNoSSRWrappper';
import { useRef } from 'react';
import ReactQuill from 'react-quill';

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

  return (
    <>
      <Title>글쓰기</Title>
      <Explain>게시글을 작성해보세요 :)</Explain>
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10 }}>제목</div>
      <Input size="large" />
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
      <div style={{ fontWeight: 600, fontSize: 15, margin: '10px 0' }}>태그</div>
      <div>태그를 등록하세요. (최대 4개)</div>
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
