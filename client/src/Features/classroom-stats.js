import { Button, Modal } from 'antd';
import React, { useState, useContext } from 'react';
import {ModalContext} from '../context/globalContext'; 

const ClassroomStats = () => {
  const {classroomModal, setClassroomModal}  = useContext(ModalContext);
  return (
    <>
      <Modal
        title="20px to Top"
        style={{
          top: 20,
        }}
        open={classroomModal}
        onOk={() => setClassroomModal(false)}
        onCancel={() => setClassroomModal(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <br />
      <br />
    </>
  );
}
export default ClassroomStats;