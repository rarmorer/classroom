import React, {useState, useContext, useEffect} from 'react';
import { message } from 'antd';
import {UserContext, ClientContext, MediaContext} from '../context/globalContext'; 
import {useNavigate, redirect} from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

//button to initialize and join session
const TeacherHome = () => {

  const {memberState, memberDispatch} = useContext(UserContext);
  const {sessionState, sessionDispatch} = useContext(UserContext);
  const {topic, signature, name, password} = memberState.meetingArgs;
  const client = useContext(ClientContext);
  const {mediaStream, setMediaStream} = useContext(MediaContext);

  const navigate = useNavigate();

  const initSession = async() => {
    console.log(memberState.meetingArgs)
    await client.init('en-US', 'CDN')

    try {
      await client.join(topic, signature, name, password);
      const stream = client.getMediaStream();
      setMediaStream(stream);
      await sessionDispatch({
        type: 'UPDATE_SESSION', 
        payload: {
          sessionStarted: true
        }
      })
      console.log('meeting joined', memberState.session);
      navigate('/TeacherVideo')
    } catch(err) {
      console.log('Error joinig meeting', err);
      message.error(err.reason)
    }
    console.log('session', memberState.session)
  }
//dont use memberState for conditional rendering
  return (
    <div>
      {!memberState.session && <button onClick={initSession}>Start Session</button>}
      {memberState.session && <button>Choose Avi</button>}
    </div>
  )
}

export default TeacherHome;