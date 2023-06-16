import React, {useState, useContext, useCallback} from 'react';
import { Button, Tooltip } from 'antd';
import { AudioOutlined, AudioMutedOutlined, VideoCameraAddOutlined, VideoCameraOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
// import { IconFont } from '../../components/icon-font';
import {UserContext, ClientContext, MediaContext} from '../../context/globalContext'; 
import VideoContainer from '../Video/components/Video';

// import './teacherVideo.scss';

const TeacherVideo = () => {

    const [videoStarted, setVideoStarted] = useState(false);
    const [audioStarted, setAudioStarted] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isShareScreen, setIsShareScreen] = useState(false);
    const [isSAB, setIsSAB] = useState(false);

    const client = useContext(ClientContext);
    const {mediaStream, setMediaStream} = useContext(MediaContext);
    const {memberState, memberDispatch} = useContext(UserContext);


   return (
    <VideoContainer/>
   )
}
export default TeacherVideo;
