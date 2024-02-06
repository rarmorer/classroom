import { Table} from 'antd';
import React, { useState, useContext } from 'react';
import {ModalContext, UserContext, ClassroomContext} from '../../context/globalContext'; 
import './stats.scss'


const ClassroomStats = () => {
  //data is hard-coded for demo purposes; suggest making a call to API to access createdx database and get stored student data that's been manually inputted
  const data = [
    {
      name: 'Sam',
      Math_grade: 'A',
      Science_grade: 'B',
      English_grade: 'B',
      Art_grade: 'A',
      Attendance: '15/20'
    },
    {
      name: 'Darnell',
      Math_grade: 'A',
      Science_grade: 'A',
      English_grade: 'A',
      Art_grade: 'A',
      Attendance: '20/20'
    },
    {
      name: 'Sofia',
      Math_grade: 'A',
      Science_grade: 'B',
      English_grade: 'B',
      Art_grade: 'A',
      Attendance: '19/20'
    },
    {
      name: 'Carlos',
      Math_grade: 'A',
      Science_grade: 'B',
      English_grade: 'A',
      Art_grade: 'A',
      Attendance: '20/20'
    },
    {
      name: 'Kaylyn',
      Math_grade: 'B',
      Science_grade: 'B',
      English_grade: 'B',
      Art_grade: 'A',
      Attendance: '18/20'
    },
    {
      name: 'Dan',
      Math_grade: 'C',
      Science_grade: 'C',
      English_grade: 'B',
      Art_grade: 'B',
      Attendance: '10/20'
    }
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Math',
      dataIndex: 'Math_grade',
      key: 'Math'
    },
    {
      title: 'Science',
      dataIndex: 'Science_grade',
      key: 'Science'
    },
    {
      title: 'English',
      dataIndex: 'English_grade',
      key: 'English'
    },
    {
      title: 'Art',
      dataIndex: 'Art_grade',
      key: 'Art'
    },
    {
      title: 'Attendance',
      dataIndex: 'Attendance',
      key: 'Attendance'
    },
  ]
  return (
    <div className = 'attendance-container'>
      <div className = 'attendance-wrapper'>
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
}
export default ClassroomStats;