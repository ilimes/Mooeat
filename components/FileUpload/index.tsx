import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Button, Col, Row, message } from 'antd';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { UploadInfoTypes } from '@/types/Common/Common.interface';

const FileInfo = ({ uploadedInfo }: { uploadedInfo: UploadInfoTypes }) => (
  <ul className="preview_info">
    {Object.entries(uploadedInfo).map(([key, value]) => (
      <li key={key}>
        <span className="info_key">{key}</span>
        <span className="info_value">{value}</span>
        <span className="info_value" />
      </li>
    ))}
  </ul>
);

const Logo = () => (
  <svg className="icon" x="0px" y="0px" viewBox="0 0 24 24">
    <path fill="transparent" d="M0,0h24v24H0V0z" />
    <path
      fill="#4e4885"
      d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19  c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1  H5.1z"
    />
  </svg>
);

const FileUpload = ({
  shareObj,
  setShareObj,
  uploadedInfo,
  setUploadedInfo,
  previews,
  setPreviews,
}: {
  shareObj: any;
  setShareObj: Dispatch<any>;
  uploadedInfo: UploadInfoTypes | null;
  setUploadedInfo: React.Dispatch<React.SetStateAction<UploadInfoTypes | null>>;
  previews: any;
  setPreviews: React.Dispatch<any>;
}) => {
  const [isActive, setActive] = useState(false);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const setFileInfo = (file: File) => {
    if (file) {
      const { name, size: byteSize, type } = file;
      const size = `${(byteSize / (1024 * 1024)).toFixed(2)}mb`;
      setUploadedInfo({ name, size, type }); // name, size, type 정보를 uploadedInfo에 저장
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    const { dataTransfer } = event;
    if (!dataTransfer.files) return;

    event.preventDefault();
    setActive(false);

    const { files } = dataTransfer;
    handleImageChange(files, event);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (!target.files) return;

    const { files } = target;
    handleImageChange(files, event);
  };

  const handleImageChange = (
    files: FileList,
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>,
  ) => {
    const newImages = [...shareObj.images];
    const newPreviews = [...previews];
    const totalImagesLen = newImages.length + files.length;

    if (shareObj?.images?.length > 2) {
      message.warning('이미 등록된 이미지가 3개입니다. 삭제 후 넣어주세요.');
      return;
    }

    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const maxSize = 3 * 1024 * 1024; // 5MB

    if (files.length < 4 && totalImagesLen < 4) {
      for (let i = 0; i < files!.length; i++) {
        const file: File = files![i];

        // 확장자 체크
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension ?? '')) {
          message.warning(
            '업로드 불가능한 파일이 존재합니다. jpg, jpeg, png 파일만 업로드 가능합니다.',
          );
          return;
        }

        // 파일 크기 체크
        if (file.size > maxSize) {
          message.warning('업로드 불가능한 파일이 존재합니다. 파일 크기는 3MB 이하여야 합니다.');
          return;
        }

        // 이벤트객체의 파일을 newImages에 담기
        newImages.push(file);
        // 파일리더 객체 생성
        const reader = new FileReader();
        // 파일 읽어온 후 실행되는 콜백함수
        reader.onload = (e) => {
          // 읽어온 값을 갱신하기
          newPreviews.push(e.target!.result as string);
          setPreviews(newPreviews);
        };
        // 파일 객체를 읽어 base64 형태의 문자열로 변환
        reader.readAsDataURL(file);
      }
    } else {
      message.warning('3개 이상의 파일을 등록할 수 없습니다.');
      return;
    }
    setFileInfo(files?.[files.length - 1]);
    setShareObj({ ...shareObj, images: newImages });
  };

  const handleDeletePreview = (index: number) => {
    const newImages = [...shareObj.images];
    const newPreviews = [...previews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setShareObj({ ...shareObj, images: newImages });
    setPreviews(newPreviews);
    setUploadedInfo(null);
  };

  return (
    <>
      <StyledDiv>
        <StyledLabel
          className={`preview${isActive ? ' active' : ''}`} // isActive 값에 따라 className 제어
          onDragEnter={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragEnd}
          onDrop={handleDrop}
        >
          <StyledInput
            type="file"
            className="file"
            onChange={handleUpload}
            accept="image/jpg, image/jpeg, image/png"
            multiple
          />
          {uploadedInfo && (
            <>
              <FileInfo uploadedInfo={uploadedInfo} />
              <div
                style={{
                  paddingTop: 15,
                  color: 'grey',
                  marginRight: 'auto',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 5,
                }}
              >
                <InfoCircleOutlined />
                <div>
                  1) 업로드: 클릭 또는 끌어다 놓기
                  <br />
                  2) 다중 업로드 가능
                  <br />
                  3) 이미지 클릭 시 파일정보 표시
                </div>
              </div>
            </>
          )}
          {!uploadedInfo && (
            <>
              <Logo />
              <StyledP1 className="preview_msg">
                <span style={{ fontWeight: 800 }}>클릭</span> 혹은 파일을 이곳에{' '}
                <span style={{ fontWeight: 800 }}>드롭</span>하세요.
              </StyledP1>
              <StyledP2 className="preview_desc">파일당 최대 3MB, 3장까지 첨부가능</StyledP2>
            </>
          )}
        </StyledLabel>
      </StyledDiv>
      <StyledDiv>
        <Row gutter={[0, 20]} style={{ width: '100%', marginTop: 20 }}>
          {previews?.map((preview: any, index: number) => (
            <Col key={index} span={8} style={{ padding: 10 }}>
              <div>
                <Image
                  src={preview}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 150,
                    display: 'block',
                    borderRadius: 16,
                    border: '1px solid #ccc',
                  }}
                  onClick={() => setFileInfo(shareObj.images[index])}
                  alt={`${preview}-${index}`}
                />
                <Button
                  danger
                  onClick={() => handleDeletePreview(index)}
                  style={{ borderRadius: 100, marginTop: 10 }}
                >
                  <DeleteOutlined />
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </StyledDiv>
    </>
  );
};

export default FileUpload;

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  .preview_info {
    width: 100%;
    list-style: none;
    padding: 0;
    gap: 16px;
    display: flex;
    flex-direction: column;
  }

  .preview_info .info_key {
    display: block;
    font-weight: 500;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .preview_info .info_value {
    font-size: 14px;
  }
`;

const StyledLabel = styled.label`
  width: 100%;
  height: 256px;
  margin: auto;
  background-color: #fff;
  border-radius: 5px;
  border: 3px dashed #eee;
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    border-color: grey;
  }
  &.preview.active {
    background-color: #efeef3;
    border-color: grey;
  }
`;

const StyledInput = styled.input`
  display: none;
  &::file-selector-button {
    font-size: 14px;
    background: #fff;
    border: 1px solid #111;
    border-radius: 12px;
    padding: 4px 32px;
    cursor: pointer;
  }
`;

const StyledP1 = styled.p`
  font-weight: 500;
  font-size: 18px;
  margin: 20px 0 10px;
`;

const StyledP2 = styled.p`
  margin: 0;
  font-size: 14px;
`;
