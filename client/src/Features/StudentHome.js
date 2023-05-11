import React, {useContext} from 'react';
import {UserContext, ClientContext, MediaContext} from '../context/globalContext'; 

const StudentHome = () => {
//figure out how to get session State to persist across componenets
const {memberState, memberDispatch} = useContext(UserContext);
const {sessionState, sessionDispatch} = useContext(UserContext);
const client = useContext(ClientContext);
const {mediaStream, setMediaStream} = useContext(MediaContext);

  const {topic, signature, name, password} = memberState.meetingArgs;
  const joinSession = () => {
    console.log(sessionState.sessionStarted)
    if (sessionState.sessionStarted) {
      client.join(topic, signature, name, password);
      console.log('session joined')
    }
  }
  return (
    <div>
      <button onClick={joinSession}>Join Session</button>
      Hello
    </div>
  )
}

//button to join session + based on onditional if sessionstate is true 

export default StudentHome;