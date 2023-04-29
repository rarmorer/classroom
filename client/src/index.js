import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ClientContext} from './context/globalContext';
import {userState} from './context/globalState';
import { devConfig } from './dev';
import ZoomVideo from '@zoom/videosdk';

let meetingArgs = {...devConfig};
//make this a dropdown that will have to be verified with login?
if (userState.status === 'teacher') {
  meetingArgs.roleType = 1;
} else {
  meetingArgs.roleType = 0;
}

//teacher will have to initialize session, cannot be done automatically; condtiional 

const getToken = async(options) => {
  let response = await fetch('/generate', options).then(response => response.json());
  return response;
}

if (!meetingArgs.signature) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(meetingArgs) 
  }
  getToken(requestOptions).then(res => meetingArgs.signature = res)
  // console.log('meetingArgs', meetingArgs)
}

const client = ZoomVideo.createClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ClientContext.Provider value = {client}>
        <App meetingArgs = {meetingArgs}/>
      </ClientContext.Provider>
  </React.StrictMode>
);
