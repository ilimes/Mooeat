'use client';

import { Button, Input, Select, Spin, Tooltip, message } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  RollbackOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadArticleData, loadInfoList, uploadImgFileOne, writeBoard } from '@/api/Api';
import QuillNoSSRWrapper from '@/components/QuillNoSSRWrappper';
import TopTitle from '@/components/SharedComponents/TopTitle';

interface TagInputProps {
  placeholder: string;
  spellCheck: boolean;
  contentEditable: boolean;
  onInput: (e: React.ChangeEvent<HTMLSpanElement>) => void;
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

interface IInfoTypes {
  value: string;
  label: string;
}

const Write = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.info?.data?.token;
  const router = useRouter();
  const searchParams = useSearchParams();
  const quillInstance = useRef<ReactQuill>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [infoItems, setInfoItems] = useState<IInfoTypes[]>([]);
  const [pushDatas, setPushDatas] = useState<any>({ tags: [] });
  const [newTagText, setNewTagText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isEdit = pushDatas?.board_seq;

  // 최대 입력가능한 글자수
  const MAX_LENGTH = 10;

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (file) {
        const uploadResult = await uploadImgFileOne(file, token);
        if (uploadResult?.success) {
          const fileUid = uploadResult?.files?.[0]?.file_uid;
          if (quillInstance) {
            const editor = quillInstance.current!.getEditor();
            const range = editor.getSelection();
            // 가져온 위치에 이미지를 삽입한다
            const IMG_URL = `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/file/image/${fileUid}`;
            editor.insertEmbed(range!.index, 'image', IMG_URL);
          }
        } else {
          message.warning(uploadResult?.message || '에러');
        }
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['image', 'link'],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  // onInput handler
  const handleInputEvent = (e: React.ChangeEvent<HTMLSpanElement>) => {
    const newValue = e.target.innerText;
    if (newValue.length >= MAX_LENGTH) {
      // setEditable(false);
      if (ref.current) {
        ref.current.innerHTML = newTagText;
      }
      return false;
    }
    setNewTagText(newValue);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      // 기본 엔터 동작을 막지 않으면 개행 문자가 삽입된다.
      e.preventDefault();

      if (!newTagText) {
        message.warning('태그 내용을 입력하신 뒤 엔터를 눌러주세요.');
      } else if (pushDatas?.tags?.find((ele: any) => ele === newTagText)) {
        message.warning('이미 등록되어 있는 태그입니다.');
      } else if (pushDatas?.tags?.length > 4) {
        message.warning('태그는 최대 5개까지만 등록 가능합니다.');
      } else {
        if (pushDatas.tags) {
          setPushDatas({ ...pushDatas, tags: [...pushDatas.tags, newTagText] });
        } else {
          setPushDatas({ ...pushDatas, tags: [newTagText] });
        }
        setNewTagText('');
        setTooltipVisible(false);

        if (ref.current) {
          ref.current.innerHTML = '';
        }

        // 포커스 다시 설정
        setTimeout(() => {
          if (ref.current) {
            ref.current.focus();
            setTooltipVisible(true);
          }
        }, 100);
      }
    }
  };

  const getInfoList = async () => {
    const result = await loadInfoList();
    setInfoItems([
      ...result?.list?.map((e: any) => ({
        value: `${e.cate_seq}`,
        label: `${e.cate_nm}`,
      })),
    ]);
  };

  const putBoardData = async () => {
    const formData = pushDatas;

    if (!formData?.cate_seq) {
      message.warning('카테고리를 선택해주세요.');
      return;
    }

    if (!formData?.title?.length) {
      message.warning('제목을 입력해주세요.');
      return;
    }

    if (!formData?.content?.replace(/(<([^>]+)>)/gi, '')?.length) {
      message.warning('내용을 입력해주세요.');
      return;
    }

    const result = await writeBoard(formData, token);
    if (result?.success) {
      message.success('성공적으로 등록되었습니다.');
      router.push('/community');
    } else {
      message.error(result?.message || '에러 발생');
    }
  };

  const getBoardView = async (board_num: number) => {
    const formData = {
      board_num,
    };
    const result = await loadArticleData(formData);
    setPushDatas({
      ...pushDatas,
      ...result?.data,
      tags: result?.data?.tag_names?.split(':'),
      cate_seq: result?.data?.cate_seq?.toString(),
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (editable && ref.current) {
      ref.current.focus();
    }
  }, [editable]);

  useEffect(() => {
    getInfoList();
    if (searchParams.get('id')) {
      const boardSeq = searchParams.get('id');
      getBoardView(Number(boardSeq));
    }
  }, []);

  return (
    (!searchParams.get('id') || !isLoading) && (
      <>
        <TopTitle
          title={isEdit ? '게시글 수정' : '글쓰기'}
          explain="커뮤니티 이용 가이드에 위배되는 게시글을 작성하는 경우 삭제될 수 있습니다."
        />
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>카테고리</div>
        <Select
          value={pushDatas?.cate_seq}
          options={infoItems}
          onChange={(e) => setPushDatas({ ...pushDatas, cate_seq: e })}
          placeholder="카테고리 선택"
          style={{ width: 150 }}
          size="large"
        />
        <div style={{ fontWeight: 700, fontSize: 15, margin: '10px 0' }}>제목</div>
        <Input
          value={pushDatas?.title}
          onChange={(e) => setPushDatas({ ...pushDatas, title: e.target.value })}
          placeholder="제목을 입력해주세요."
          size="large"
        />
        <div style={{ fontWeight: 700, fontSize: 15, margin: '10px 0' }}>내용</div>
        <div data-text-editor="editor-div">
          <StyledReactQuill
            forwardedRef={quillInstance}
            value={pushDatas?.content}
            onChange={(e) => setPushDatas({ ...pushDatas, content: e })}
            modules={modules}
            theme="snow"
            placeholder="내용을 입력해주세요."
            bounds={'[data-text-editor="editor-div"]'}
          />
        </div>
        <div style={{ display: 'flex', gap: 5, fontWeight: 700, fontSize: 15, margin: '20px 0' }}>
          태그
          <Tooltip
            trigger="click"
            placement="right"
            title={
              <div>
                · 최대 5개 등록 가능 <br /> · 10글자까지 입력 가능
              </div>
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}>
          {pushDatas?.tags?.map((e: any, i: number) => (
            <span key={i}>
              {e}{' '}
              <span
                onClick={() =>
                  setPushDatas({
                    ...pushDatas,
                    tags: [...pushDatas?.tags?.filter((ele: any) => ele !== e)],
                  })
                }
                aria-hidden="true"
                style={{ cursor: 'pointer', color: '#909090' }}
              >
                <DeleteOutlined />
              </span>
            </span>
          ))}
          <Tooltip
            trigger={['focus']}
            title="입력 후 엔터 키를 누르면 추가됩니다."
            placement="bottomLeft"
            overlayClassName="tag-input"
            open={tooltipVisible}
            onOpenChange={setTooltipVisible}
          >
            <div onClick={() => setEditable(true)} aria-hidden="true">
              <TagInput
                ref={ref}
                placeholder="태그 입력"
                spellCheck={false}
                contentEditable={editable}
                onInput={handleInputEvent}
                onKeyDown={handleOnKeyPress}
                onFocus={() => setTooltipVisible(true)}
              />
            </div>
          </Tooltip>
        </div>
        <div style={{ marginTop: 60, textAlign: 'right' }}>
          <Button
            onClick={() => router.push('/community')}
            style={{ width: 125, height: 47, fontWeight: 'bold', fontSize: 16, marginRight: 10 }}
          >
            <RollbackOutlined /> 목록으로
          </Button>
          <Button
            type="primary"
            onClick={putBoardData}
            style={{ width: 125, height: 47, fontWeight: 'bold', fontSize: 16 }}
          >
            {isEdit ? (
              <div>
                <EditOutlined /> 수정하기
              </div>
            ) : (
              <div>
                <PlusOutlined /> 등록하기
              </div>
            )}
          </Button>
        </div>
      </>
    )
  );
};

export default Write;

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
  }
`;
