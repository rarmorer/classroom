import { Button, Modal } from 'antd';
import React, { useState, useContext } from 'react';
import {ModalContext} from '../context/globalContext'; 

const SessionStats = () => {
  const {sessionModal, setSessionModal}  = useContext(ModalContext);
  console.log('sessionModal', sessionModal)
  return (
    <>
      <Modal
        title="20px to Top"
        style={{
          top: 20,
        }}
        open={sessionModal}
        onOk={() => setSessionModal(false)}
        onCancel={() => setSessionModal(false)}
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
export default SessionStats;