import React, {useState, useContext, useEffect} from 'react';
import {useNavigate, redirect} from 'react-router-dom';
import { devConfig } from '../dev';
import {UserContext} from '../context/globalContext'; 
import { Button, Checkbox, Form, Input } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';


const TeacherHome = () => {

  const {memberState, memberDispatch} = useContext(UserContext);

  const submitUserData = async (values) => {

    memberDispatch({
      type: 'UPDATE_USERNAME', 
      payload: { 
        username: values.username
      }
    })
    memberDispatch({
      type: 'UPDATE_PASSWORD', 
      payload: { 
        username: values.password
      }
    })

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"username" : memberState.username, "password": memberState.password})
    };
    let result;
    result = await fetch("http://localhost:4000/login", requestOptions).then(res => res.json());

    if (result.loggedIn === false) {
      memberDispatch({
        type: 'UPDATE_ERROR',
        payload: {
          error: true
        }
      })
    } else {
      memberDispatch({
        type: 'UPDATE_ERROR',
        payload: {
          error: false
        }
      })
      memberDispatch({
        type: 'UPDATE_STATUS',
        payload: {
          isLoggedin: true,
        }
      })
    }
  }

  const onSubmitFailed = () => {

  }

  return(
    {if (member.isLoggedin)}
    <div>
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
        // onFieldsChange={()=>updateInfo}
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
          <Input />
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
          <Input.Password />
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
  </div>
  );
}

export default TeacherHome;