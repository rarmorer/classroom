import React, {useContext, useState, useEffect, useReducer} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Features/Home';
import TeacherHome from './Features/TeacherHome';
import {UserContext} from './context/globalContext';
import {userState, userReducer} from './context/globalState';
import './App.css';

const App = (props) => {
  const {meetingArgs: { sdkKey, topic, signature, name, password }} = props;
  
  const [mediaStream, setMediaStream] = useState();
  const [memberState, memberDispatch] = useReducer(userReducer, userState);

  return (
    <div>
      <UserContext.Provider
      value={{
        memberState, 
        memberDispatch}}>
        <BrowserRouter>
          <Routes>
            <Route path = '/' element = {<Home/>} />
            <Route path = '/TeacherHome' element = {<TeacherHome/>} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
  
}


export default App;
