import React, {useContext, useState} from 'react';
import {Input, Button} from 'antd'
import {message} from 'antd'
import {UserContext, ClientContext, MediaContext, ClassroomContext} from '../../context/globalContext';
import './studentHome.scss'

const LetterBox = () => {
  const {chatClient, setChatClient} = useContext(MediaContext);
  const client = useContext(ClientContext);
  const {TextArea} = Input;
  const [inputMessage, setInputMessage] = useState('');

  const updateMessage = (input) => {
    setInputMessage(input)
  }

  const sendMessage = () => {
    message.info('Your Message Has Been Sent!')
    chatClient.send(`${inputMessage}`, (JSON.parse(localStorage.getItem('teacherId'))))
  }
  return (
    <div className='form-group'>
      <div className='letter'>
        <div className='letter-container'>
          <TextArea 
            rows = {6}
            onChange={(e) => updateMessage(e.target.value)}
            maxLength={140}
            placeHolder="Write Your Letter Here..."
          />
        </div>
      </div>
      <br/>
        <Button 
        style={{alignItems: 'center'}}
        onClick={() => sendMessage()}>Send Your Letter!</Button>
    </div>   
  )

}
export default LetterBox;