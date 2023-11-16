import React from 'react';
import { Modal } from 'antd';

interface ModalProps {
  children: React.ReactNode;
  title: string,
  isOpen: boolean;
  closeModal: () => void;
}

const ModalComponent = ({ children, title, isOpen, closeModal }: ModalProps) => {
  return (
    <>
      <Modal title={title} open={isOpen} onCancel={closeModal} footer={false}>
        <div style={{ marginTop: 20 }}>
          {children}
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;