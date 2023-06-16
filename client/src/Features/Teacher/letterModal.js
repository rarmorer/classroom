import {useState, useContext} from 'react';
import {Modal} from 'antd';
import { ClassroomContext } from '../../context/globalContext';

const LetterModal = () => {
  const {letter, letterModal, setLetterModal} = useContext(ClassroomContext);
  return (
    <>
      <Modal
        title="A Letter For You"
        style={{
          top: 20,
        }}
        open={letterModal}
        onOk={() => setLetterModal(false)}
        onCancel={() => setLetterModal(false)}
      >
       {letter}
      </Modal>
      <br />
      <br />
    </>
  )
}

export default LetterModal;