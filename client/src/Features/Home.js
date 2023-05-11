/* eslint-disable no-restricted-globals */
import React, {useContext, useEffect} from 'react';
import {useNavigate, redirect} from 'react-router-dom';
import { devConfig } from '../dev';
import {UserContext} from '../context/globalContext'; 
import {StatusContext} from '../context/globalContext'; 
import {Form, Input, Button, Checkbox, Select} from 'antd';

const Home = () => {
  const {memberState, memberDispatch} = useContext(UserContext);
  const navigate = useNavigate();
  
  const getToken = async(options) => {
    let response = await fetch('/generate', options).then(response => response.json());
    return response;
    }
  
  const updateUsername = (username) => {
    memberDispatch({
      type: 'UPDATE_USERNAME',
      payload:{
        username: username
      }
    })
  }
  const updatePassword = (password) => {
    memberDispatch({
      type: 'UPDATE_PASSWORD',
      payload:{
        password: password
      }
    })
  }

  const updateArgs = (args) => {
    memberDispatch({
      type: 'UPDATE_ARGS',
      payload: {
        meetingArgs: args
      }
    })
  }

  const onClick = (value) => {
    let meetingArgs = {...devConfig};
    let user;
    if (value === '1' || value === '3') {
      user = 'Student';
      meetingArgs.roleType = 0;
    } else {
      meetingArgs.roleType = 1;
      user = 'Teacher';
    }
    memberDispatch({ 
      type: 'UPDATE_STATUS', 
      payload: {
        status: user
      }
    })

    if (!meetingArgs.signature) {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(meetingArgs) 
      }
      getToken(requestOptions).then(res => meetingArgs.signature = res)
    }
    updateArgs(meetingArgs)
  }

    const submitUserData = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"username": memberState.username, "password": memberState.password})
      };
      let result;
      result = await fetch("http://localhost:4000/login", requestOptions).then(res => res.json());
      if (result === false) {
        memberDispatch({
          type: 'UPDATE_ERROR',
          payload: {
            error: true
          }
        })
      } else {
        memberDispatch({
          type: 'UPDATE_STATUS',
          payload: {
            isLoggedin: true,
          }
        })
        navigate(`/${memberState.status}Home${location.search}`)
      }
      console.log('entered info', memberState.username, memberState.password);
    }
  
    const onSubmitFailed = () => {
  
    }
    return ( 
      <div>
        {memberState.status !== 'guest' &&
          <Form 
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={submitUserData}
          onFinishFailed={onSubmitFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
            
          >
            <Input onChange={(e) => updateUsername(e.target.value)} />
          </Form.Item>
  
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password onChange={(e) => updatePassword(e.target.value)} />
          </Form.Item>
  
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        }
  
      {memberState.status === 'guest' && 
                <Select
                defaultValue="I am A..."
                style={{
                  width: 120,
                }}
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
      }
      </div>
    )
}

export default Home;


