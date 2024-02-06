import React, {useContext} from 'react';
import {UserContext, ClientContext, MediaContext} from '../../context/globalContext'; 
import NavBar from '../Home/Nav';
import LetterBox from './letterBox';
import { Button, Space } from 'antd';

const StudentHome = () => {
//figure out how to get session State to persist across componenets
const {memberState, memberDispatch} = useContext(UserContext);
// const {sessionState, sessionDispatch} = useContext(UserContext);
const client = useContext(ClientContext);
// const {mediaStream, setMediaStream} = useContext(MediaContext);

  const {topic, signature, name, password} = memberState.meetingArgs;
  console.log('localStorage-admin', JSON.parse(localStorage.getItem('admin')))

  return (
    <div>
      <NavBar/>
      <div>
        <h2 className='letter-title'>Write Your Teacher a Letter!</h2>
        <p className='letter-title'>Tell your teacher how much they mean to you with a letter that'll be sent directly to them!</p>
      </div>
      <LetterBox/>
    </div>
  )
}

//button to join session + based on onditional if sessionstate is true 

export default StudentHome;