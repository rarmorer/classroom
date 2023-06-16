import { Button, Modal, Table} from 'antd';
import React, { useState, useContext } from 'react';
import {ModalContext, UserContext, ClassroomContext} from '../../context/globalContext'; 
import './stats.scss'

const AttendanceStats = () => {
  const {memberState, memberDispatch} = useContext(UserContext);
  const {rosterState, setRosterState} = useContext(ClassroomContext);
  console.log('roster recieved', rosterState[0].map((user) => user.userId))
  console.log('meetingArgs', memberState.meetingArgs)


  const data = rosterState[0].map((user) => {
  return (
      {
        name: user.name,
        userId: user.userId, 
        Arrived_At: '10:30AM'
      }
    )
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'UserID', 
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: 'Time of Arrival',
      dataIndex: 'Arrived_At',
      key: 'Arrived_At'
    }
  ]

  return (
    <div className = 'attendance-container'>
      <div className = 'attendance-wrapper'>
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
}
export default AttendanceStats;