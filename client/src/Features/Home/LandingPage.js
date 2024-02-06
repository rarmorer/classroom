import React, {useState, useContext, useEffect} from 'react';
import { message } from 'antd';
import {UserContext, ClientContext, MediaContext, ModalContext, ClassroomContext} from '../../context/globalContext'; 
import {useNavigate, redirect} from 'react-router-dom';
import { Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TeacherHome from '../Teacher/TeacherHome';
import StudentHome from '../Student/StudentHome';
import ClassroomStats from '../Stats/classroom-stats';

const LandingPage = () => {
  const {memberState, memberDispatch} = useContext(UserContext);
  // const {sessionState, sessionDispatch} = useContext(UserContext);
  // const {topic, signature, name, password, roleType} = memberState.meetingArgs;
  // const client = useContext(ClientContext);
  // const {mediaStream, setMediaStream} = useContext(MediaContext);

  return (
    <div>
      {
      memberState.status === 'Teacher' && 
      <div> 
         <TeacherHome/>
      </div>
      }
      {
        memberState.status === 'Student' && 
        <StudentHome/>
      }  
    </div>
  )
}

export default LandingPage;