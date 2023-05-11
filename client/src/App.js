import React, {useContext, useState, useEffect, useReducer} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Features/Home';
import TeacherHome from './Features/TeacherHome';
import TeacherVideo from './Features/TeacherVideo/teacherVideo';
import StudentHome from './Features/StudentHome';
import {UserContext, MediaContext} from './context/globalContext';
import {userState, userReducer, initsessionState, sessionReducer} from './context/globalState';
import './App.css';

const App = () => {  
  const [mediaStream, setMediaStream] = useState();
  const [memberState, memberDispatch] = useReducer(userReducer, userState);
  const [sessionState, sessionDispatch] = useReducer(sessionReducer, initsessionState)
//possibly go back and create separate context for session state
  return (
    <div>
      <MediaContext.Provider 
        value={{
        mediaStream, 
        setMediaStream}}>
        <UserContext.Provider
        value={{
          memberState, 
          memberDispatch, 
          sessionState, 
          sessionDispatch}}>
          <BrowserRouter>
            <Routes>
              <Route path = '/' element = {<Home/>} />
              <Route path = '/TeacherHome' element = {<TeacherHome/>} />
              <Route path = '/StudentHome' element = {<StudentHome/>} />
              <Route path = '/TeacherVideo' element = {<TeacherVideo/>} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </MediaContext.Provider>
    </div>
  )
  
}


export default App;
