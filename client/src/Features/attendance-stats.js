import { Button, Modal } from 'antd';
import React, { useState, useContext } from 'react';
import {ModalContext} from '../context/globalContext'; 

const AttendanceStats = () => {
  const {attendanceModal, setAttendanceModal}  = useContext(ModalContext);
  return (
    <>
      <Modal
        title="20px to Top"
        style={{
          top: 20,
        }}
        open={attendanceModal}
        onOk={() => setAttendanceModal(false)}
        onCancel={() => setAttendanceModal(false)}
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
export default AttendanceStats;