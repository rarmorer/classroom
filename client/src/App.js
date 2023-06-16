import React, {useContext, useState, useEffect, useReducer} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Features/Home/Home';
import LandingPage from './Features/Home/LandingPage';
import VideoContainer from './Features/Video/components/Video';
import StudentVideo from './Features/Student/studentVideo';
import TeacherVideo from './Features/Teacher/teacherVideo';
import StudentHome from './Features/Student/StudentHome';
import LoginForm from './Features/Home/LoginForm';
import NavBar from './Features/Home/Nav';
import ClassroomStats from './Features/Stats/classroom-stats';
import AttendanceStats from './Features/Stats/attendance-stats';
import SessionStats from './Features/Stats/session-stats';
import {UserContext, MediaContext, ModalContext, ClassroomContext} from './context/globalContext';
import {userState, userReducer, initsessionState, sessionReducer} from './context/globalState';
import './App.css';

const App = () => {  
  const [mediaStream, setMediaStream] = useState();
  const [chatClient, setChatClient] = useState();
  const [memberState, memberDispatch] = useReducer(userReducer, userState);
  const [sessionState, sessionDispatch] = useReducer(sessionReducer, initsessionState);
  const [rosterState, setRosterState] = useState([])
  const [letterModal, setLetterModal] = useState(false)
  const [letter, setLetter] = useState('')

  return (
    <div>
      <MediaContext.Provider 
        value={{
        mediaStream, 
        setMediaStream,
        chatClient, 
        setChatClient
        }}>
        <UserContext.Provider
        value={{
          memberState, 
          memberDispatch, 
          sessionState, 
          sessionDispatch, 
        }}>
        <ClassroomContext.Provider value = {{
          rosterState,
          setRosterState,
          letter,
          setLetter,
          letterModal,
          setLetterModal,
        }}>
          <BrowserRouter>
            <Routes>
              <Route path = '/' element = {<Home/>} />
              <Route path = '/LandingPage' element = {<LandingPage/>} />
              <Route path = '/Video' element = {<VideoContainer/>} />
              <Route path = '/StudentVideo' element = {<StudentVideo/>} />
              <Route path = '/TeacherVideo' element = {<TeacherVideo/>} />
              <Route path = '/StudentHome' element = {<StudentHome/>} />
              <Route path = '/Nav' element = {<NavBar/>} />
              <Route path = '/LoginForm' element = {<LoginForm/>} />
              <Route path = '/classroom-stats' element = {<ClassroomStats/>}/>
              <Route path = '/session-stats' element = {<SessionStats/>}/>
              <Route path = '/attendance-stats' element = {<AttendanceStats/>}/>
            </Routes>
          </BrowserRouter>
            </ClassroomContext.Provider>
        </UserContext.Provider>
      </MediaContext.Provider>
    </div>
  )
  
}


export default App;
