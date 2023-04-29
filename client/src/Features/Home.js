/* eslint-disable no-restricted-globals */
import React, {useState, useContext} from 'react';
import {useNavigate, redirect} from 'react-router-dom';
import { devConfig } from '../dev';
import {UserContext} from '../context/globalContext'; 
import {Dropdown, Space, Select} from 'antd';

const Home = () => {

  let navigate = useNavigate();
  // const {memberState, memberDispatch} = useContext(UserContext);
  
  let meetingArgs = {...devConfig};
  let member = '';

  const getToken = async(options) => {
    let response = await fetch('/generate', options).then(response => response.json());
    return response;
    }

  const loginOnClick = (value) => {
    console.log(value)
    if (value === '1' || value === '3') {
      meetingArgs.roleType = 0; 
      member = 'Student'  
    } else {
      meetingArgs.roleType = 1;
      member = 'Teacher'
    }

    if (!meetingArgs.signature) {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(meetingArgs) 
      }
      getToken(requestOptions).then(res => meetingArgs.signature = res)

    console.log(meetingArgs, 'member', member)
    
    navigate(`/${member}Home${location.search}`)
    
    }
  }
    return ( 
      <div>
        <Select
          defaultValue="I am A..."
          style={{
            width: 120,
          }}
          onChange={loginOnClick}
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
    )
}

export default Home;


