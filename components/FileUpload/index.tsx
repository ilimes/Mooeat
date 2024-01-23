import { UploadInfoTypes } from '@/types/Common/Common.interface';
import React, { useState } from 'react';
import styled from 'styled-components';

const FileInfo = ({ uploadedInfo }: { uploadedInfo: UploadInfoTypes }) => (
    <ul className="preview_info">
      {Object.entries(uploadedInfo).map(([key, value]) => (
        <li key={key}>
          <span className="info_key">{key}</span>
          <span className="info_value">{value}</span>
        </li>
      ))}
    </ul>
  );

const Logo = () => (
    <svg className="icon" x="0px" y="0px" viewBox="0 0 24 24">
      <path fill="transparent" d="M0,0h24v24H0V0z"/>
      <path fill="#000" d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19  c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1  H5.1z"/>
    </svg>
  );

const FileUpload = () => {
    const [isActive, setActive] = useState(false);
    const [uploadedInfo, setUploadedInfo] = useState<UploadInfoTypes | null>(null);
  
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);
    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
    };
  
    const setFileInfo = (file: File) => {
      if (file) {
        const { name, size: byteSize, type } = file;
        const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
        setUploadedInfo({ name, size, type }); // name, size, type 정보를 uploadedInfo에 저장
      }
    };
  
    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setActive(false);
  
      const file = event.dataTransfer.files[0];
      setFileInfo(file);
    };
  
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      if (!target.files) return;

      const file = target.files[0];
      setFileInfo(file);
    };

    return (
        <>
            <StyledDiv>
                <StyledLabel
                    className={`preview${isActive ? ' active' : ''}`}  // isActive 값에 따라 className 제어
                    onDragEnter={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragEnd}
                    onDrop={handleDrop}
                >
                    <StyledInput type="file" className="file" onChange={handleUpload} />
                    {uploadedInfo && <FileInfo uploadedInfo={uploadedInfo} />}
                    {!uploadedInfo && (
                        <>
                            <Logo />
                            <StyledP1 className="preview_msg"><span style={{ fontWeight: 600 }}>클릭</span> 혹은 파일을 이곳에 <span style={{ fontWeight: 600 }}>드롭</span>하세요.</StyledP1>
                            <StyledP2 className="preview_desc">파일당 최대 3MB</StyledP2>
                        </>
                    )}
                </StyledLabel>
            </StyledDiv>
        </>
    )
}

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
`

const StyledSvg = styled.svg`
    width: 100px;
    height: 100px;
    pointer-events: none;
`

const StyledLabel = styled.label`
    width: 100%;
    height: 150px;
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
`

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
`

const StyledP1 = styled.p`
    font-weight: 500;
    font-size: 18px;
    margin: 20px 0 10px;
`

const StyledP2 = styled.p`
    margin: 0;
    font-size: 14px;
`