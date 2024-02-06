/* eslint-disable no-restricted-globals */
import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext, ClassroomContext} from '../../context/globalContext'; 
import {Form, Input, Button, Checkbox, Select, message} from 'antd';
import './LoginForm.scss'

const LoginForm = () => {
  const {memberState, memberDispatch} = useContext(UserContext);
  const {sessionState, sessionDispatch} = useContext(UserContext);
  const {rosterState, setRosterState} = useContext(ClassroomContext);

  const navigate = useNavigate();

  const getRoster = async() => {
    let roster = await fetch('/session').then(roster => roster.json());
    console.log('ROSTER', roster)
    setRosterState(roster);
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
      message.error('Uh-oh! User Not Recognized')
    } else {
      memberDispatch({
        type: 'UPDATE_ERROR',
        payload: {
          error: false,
        }
      })
      navigate('/LandingPage')
    }

    localStorage.setItem('Logged_In', JSON.stringify(true));
    localStorage.setItem('User_Type', JSON.stringify(`${memberState.status}`))
  
    memberState.meetingArgs.name = memberState.username;
    getRoster();
  }
  
  const onSubmitFailed = () => {
    //figure out where to put this
    if (memberState.error) {
      message.error('user not found')
    }
  }

  return (
    <div className="login-page">
    <div className="login-box">
      <div className="illustration-wrapper">
        <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login"/>
      </div>
    <div>
    {memberState.status !== '' &&
    <Form 
    name="login-form"
    initialValues={{
      remember: true,
    }}
    onFinish={submitUserData}
    onFinishFailed={onSubmitFailed}
    autoComplete="off"
  >
    <p className="form-title">Welcome To Class!</p>
    <p>Login to the Dashboard</p>
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
    {}
  </div>
  </div>
  </div>
  )
}


export default LoginForm;