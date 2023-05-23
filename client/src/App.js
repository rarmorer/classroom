import React, {useContext, useState, useEffect, useReducer} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Features/Home';
import TeacherHome from './Features/TeacherVideo/TeacherHome';
import TeacherVideo from './Features/TeacherVideo/teacherVideo';
import StudentHome from './Features/StudentHome';
import SessionStats from './Features/session-stats';
import {UserContext, MediaContext, ModalContext} from './context/globalContext';
import {userState, userReducer, initsessionState, sessionReducer} from './context/globalState';
import './App.css';

const App = () => {  
  const [mediaStream, setMediaStream] = useState();
  const [memberState, memberDispatch] = useReducer(userReducer, userState);
  const [sessionState, sessionDispatch] = useReducer(sessionReducer, initsessionState)
  const [sessionModal, setSessionModal] = useState(false)
  const [classroomModal, setClassroomModal] = useState(false)
  const [attendanceModal, setAttendanceModal] = useState(false)
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
        <ModalContext.Provider value = {{
          sessionModal, 
          setSessionModal, 
          classroomModal, 
          setClassroomModal,
          attendanceModal,
          setAttendanceModal
        }}>
          <BrowserRouter>
            <Routes>
              <Route path = '/' element = {<Home/>} />
              <Route path = '/TeacherHome' element = {<TeacherHome/>} />
              <Route path = '/TeacherVideo' element = {<TeacherVideo/>} />
              <Route path = '/StudentHome' element = {<StudentHome/>} />
              {/* <Route path = '/SessionStats' element = {<SessionStats/>} /> */}
            </Routes>
          </BrowserRouter>
          </ModalContext.Provider>
        </UserContext.Provider>
      </MediaContext.Provider>
    </div>
  )
  
}


export default App;
