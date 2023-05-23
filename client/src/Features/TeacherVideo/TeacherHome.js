import React, {useState, useContext, useEffect} from 'react';
import { message } from 'antd';
import {UserContext, ClientContext, MediaContext, ModalContext} from '../../context/globalContext'; 
import {useNavigate, redirect} from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SessionStats from '../session-stats';
import AttendanceStats from '../attendance-stats';
import ClassroomStats from '../classroom-stats';

//button to initialize and join session
const TeacherHome = () => {
  const {memberState, memberDispatch} = useContext(UserContext);
  const {sessionState, sessionDispatch} = useContext(UserContext);
  const {sessionModal, setSessionModal, attendanceModal, setAttendanceModal, classroomModal, setClassroomModal}  = useContext(ModalContext)
  const {topic, signature, name, password} = memberState.meetingArgs;
  const client = useContext(ClientContext);
  const {mediaStream, setMediaStream} = useContext(MediaContext);

  const navigate = useNavigate();

  const updateSession = async (status) => {
    console.log('running session update', status)
    await sessionDispatch({
      type: 'UPDATE_SESSION', 
      payload: {
        sessionStarted: true
      }
    })
  }

  //possibly wrap in useCallback to mantain state 
  const initSession = async() => {
    console.log('session', sessionState.sessionStarted)

    console.log(memberState.meetingArgs)
    await client.init('en-US', 'CDN')

    try {
      await client.join(topic, signature, name, password);
      const stream = client.getMediaStream();
      setMediaStream(stream);
      updateSession(true)
      console.log(sessionState)
    } catch(err) {
      console.log('Error joinig meeting', err);
      message.error(err.reason)
    }
  }
  if (sessionState.sessionStarted) navigate('/TeacherVideo');
  else console.log('cannot move')

  //drop-down set up

  const items = [
    {
      label: (
        <a onClick={() => {setClassroomModal(true)}}>
          Classroom Statistics
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a onClick={() => setAttendanceModal(true)}>
         Attendance Statistics
        </a>
      ),
      key: '1',
    },
    {
    label: (
      <a onClick={() => setSessionModal(true)}>
        Session Statistics 
      </a>
    ),
    key: '2',
    },
  ];

  console.log(sessionModal)

  return (
    <div>
      <div> <button onClick={() => initSession()}>Start Session</button>
        <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Class Info
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    
      <SessionStats open = {sessionModal} setOpen = {setSessionModal} />
      <ClassroomStats open = {classroomModal} setOpen = {setClassroomModal} />
      <AttendanceStats open = {attendanceModal} setOpen = {setAttendanceModal} />
      </div>
    </div>
  )
}

export default TeacherHome;