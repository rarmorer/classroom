import { Button, Table } from 'antd';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import {ModalContext, ClientContext} from '../../context/globalContext'; 
import './stats.scss'

const SessionStats = (props) => {
  const client = useContext(ClientContext);
  const [stats, setStats] = useState();

  useEffect(() => {
    const getSessionStats = async() => {
      let details = await fetch('/details').then(res => res.json());
      console.log('details', details)
      setStats(details)
    }
    getSessionStats();
    console.log(stats)
  }, [])

  // const getSessionStats = useCallback(async () => {
  //   let details = await fetch('/details').then(res => res.json());
  //   console.log('details', details)
  //   setStats(details)
  // }, [stats])
   

  console.log('sesStats', stats)

  const data = [
    {
      // sessionId: stats.id,
      startTime: '10:30AM',
      duration: '30',
      classCount: '15',
      recorded: 'false'
    }
  ]

  const columns = [
    // {
    //   title: 'Session ID',
    //   dataIndex: 'sessionId', 
    //   key: 'sessionId'
    // },
    {
      title: 'Start Time', 
      dataIndex: 'startTime',
      key: 'startTime'
    },
    {
      title: 'Session Duration', 
      dataIndex: 'duration',
      key: 'duration'
    },
    {
      title: 'Attendance Count',
      dataIndex: 'classCount',
      key: 'classCount'
    },
    {
      title: 'Session Recorded',
      dataIndex: 'recorded',
      key: 'recorded'
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
export default SessionStats;