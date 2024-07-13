import React from 'react';
import { Modal } from 'antd';
import { ModalPropsTypes } from '@/types/Common/Common.interface';
import './animation-style.css';

const ModalComponent = ({ children, title, isOpen, closeModal }: ModalPropsTypes) => (
  <Modal
    title={title}
    open={isOpen}
    onCancel={closeModal}
    footer={false}
    centered
    transitionName="my-modal"
    destroyOnClose
  >
    <div style={{ marginTop: 20 }}>{children}</div>
  </Modal>
);

export default ModalComponent;
