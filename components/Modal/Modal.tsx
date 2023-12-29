import React from 'react';
import { Modal } from 'antd';
import { ModalPropsTypes } from '@/types/Common/Common.interface';

const ModalComponent = ({ children, title, isOpen, closeModal }: ModalPropsTypes) => {
  return (
    <>
      <Modal title={title} open={isOpen} onCancel={closeModal} footer={false} destroyOnClose>
        <div style={{ marginTop: 20 }}>
          {children}
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;