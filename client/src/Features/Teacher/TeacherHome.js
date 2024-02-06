import React, {useContext, useEffect, useState} from 'react';
import { message } from 'antd';
import {UserContext, ClientContext, MediaContext, ModalContext, ClassroomContext} from '../../context/globalContext'; 
import { Dropdown, Space, Card, Col, Row, Tooltip } from 'antd';
import {useNavigate} from 'react-router-dom';
import NavBar from '../Home/Nav';
import './TeacherHome.scss'

const TeacherHome = () => {
  const client = useContext(ClientContext);
  const {letter, setLetter} = useContext(ClassroomContext);
  const navigate = useNavigate();
  localStorage.setItem('teacherId',client.getSessionInfo().userId);

  const onCardClick = (page) => {
    navigate(`/${page}-stats`)
  }

  client.on('chat-on-message', (payload) => {
    console.log(payload.message);
    setLetter(payload.message)
  })
    
  return (
    <div>  
        <NavBar />
        <div className='teacherHome'>
          <div className='cards'>
            <Row gutter={16}>
              <Col span={8} align='middle'>
              <Card 
                title="Classroom Statistics" 
                bordered={false} 
                style={{width:300}}
                onClick={() => onCardClick('classroom')}
                className='entry-item'
              >
                Look at information about your classroom of students, from grades to attendance.
              </Card>
              </Col>
              <Col span={8} align='middle'>
              <Card 
                title="Attendance Statistics" 
                bordered={false} 
                style={{width:300}}
                onClick={() => onCardClick('attendance')}
                className='entry-item'
              >
                See who attended your previous session(s) based on userId & name, and see when they arrived.
              </Card>
              </Col>
              <Col span={8} align='middle'>
              <Card 
                title="Session Statistics" 
                bordered={false} 
                style={{width:300}}
                onClick={() => onCardClick('session')}
                className='entry-item'
              >
                View information about your last session(s), including how long it lasted and when it started.
              </Card>
              </Col>
            </Row>
          </div>
        </div>
    </div>
  )
}

export default TeacherHome;
