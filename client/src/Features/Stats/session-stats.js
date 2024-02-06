import { Button, Table } from 'antd';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import {ModalContext, ClientContext} from '../../context/globalContext'; 
import './stats.scss'

const SessionStats = () => {
  const client = useContext(ClientContext);
  const [stats, setStats] = useState();

  useEffect(() => {
    const getSessionStats = async() => {
      let details = await fetch('/details').then(res => res.json());
      setStats(details)
    }
    getSessionStats();
    console.log(stats)
  }, [])

  console.log('sesStats', stats)

  const data = [
    {
      sessionId: stats.id,
      startTime: stats.start_time,
      duration: stats.duration,
      classCount: stats.user_count,
      //recording must be enabled on account
      recorded: stats.has_recording
    }
  ]

  const columns = [
    {
      title: 'Session ID',
      dataIndex: 'sessionId', 
      key: 'sessionId'
    },
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