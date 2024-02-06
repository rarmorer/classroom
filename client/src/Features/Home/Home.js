/* eslint-disable no-restricted-globals */
import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { devConfig } from '../../util';
import {UserContext, ClassroomContext} from '../../context/globalContext'; 
import LoginForm from './LoginForm.js'
import {Select, message} from 'antd';
import './Home.scss'

const Home = () => {
  // const navigate = useNavigate();

  const {memberState, memberDispatch} = useContext(UserContext);

  const getToken = async(options) => {
    let response = await fetch('/generate', options).then(response => response.json());
    return response;
    }

  const updateArgs = (args) => {
    memberDispatch({
      type: 'UPDATE_ARGS',
      payload: {
        meetingArgs: args
      }
    })
  }

  const updateStatus = (user) => {
    memberDispatch({ 
      type: 'UPDATE_STATUS', 
      payload: {
        status: user
      }
    })
  }
  const onClick = (value) => {
    let user;
    let meetingArgs = {...devConfig};
    if (value === '1' || value === '3') {
      user = 'Student';
      meetingArgs.roleType = 0;
    } else {
      meetingArgs.roleType = 1;
      user = 'Teacher'
    }
    if (!meetingArgs.signature) {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(meetingArgs) 
      }
      getToken(requestOptions).then(res => meetingArgs.signature = res)
    }
    updateArgs(meetingArgs);
    updateStatus(user)
  }
    const onSubmitFailed = () => {
      //figure out where to put this
      if (memberState.error) {
        message.error('user not found')
      }
    }
    return ( 
      <div className = "homePage">
      <div>
      {memberState.status === '' && 
      <div>
        <Select
          defaultValue="I am A..."
          style={{
          width: 150,
          }}
          className='homeDropdown'
          onChange={onClick}
          options={[
            {
              value: '1',
              label: 'Student',
            },
            {
              value: '2',
              label: 'Teacher',
            },
            {
              value: '3',
              label: 'Guest',
            },
          ]}
        />   
      </div>
      }
      {memberState.status !=='' &&
      <LoginForm/>
      }
      </div>
      </div>
    )
}

export default Home;


