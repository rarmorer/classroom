import React, { useState, useCallback, useContext, useEffect, MutableRefObject } from 'react';
import classNames from 'classnames';
import { message } from 'antd';
import { ClientContext, UserContext, MediaContext } from '../../../context/globalContext';
import CameraButton from './cameraButton';
import MicrophoneButton from './microphoneButton';
import { ScreenShareButton } from './screenShareButton';
import './VideoFooter.scss';
import { useUnmount } from '../Hooks/useMount';
import {
  MutedSource,
  AudioChangeAction,
  DialOutOption,
  VideoCapturingState,
  SharePrivilege,
  MobileVideoFacingMode
} from '@zoom/videosdk';

const isAudioEnable = typeof AudioWorklet === 'function';
const VideoFooter = (props) => {
  const { className, shareRef, sharing } = props;
  const [isStartedAudio, setIsStartedAudio] = useState(false);
  const [isStartedVideo, setIsStartedVideo] = useState(false);
  const [audio, setAudio] = useState('');
  const [isStartedScreenShare, setIsStartedScreenShare] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMicrophone, setActiveMicrophone] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState('');
  const [activeCamera, setActiveCamera] = useState('');
  const [speakerList, setSpeakerList] = ([]);
  const [statisticVisible, setStatisticVisible] = useState(false);
  const [selecetedStatisticTab, setSelectedStatisticTab] = useState('audio');
  const [isComputerAudioDisabled, setIsComputerAudioDisabled] = useState(false);
  const [sharePrivilege, setSharePrivileg] = useState(SharePrivilege.Unlocked);
  const { mediaStream } = useContext(MediaContext);
  const {memberState, memberDispatch} = useContext(UserContext);

  // console.log('videoFooter status', memberState)
  const client = useContext(ClientContext);

  const isSupportWebCodecs = () => {
    return typeof (window).MediaStreamTrackProcessor === 'function';
  }

  const onCameraClick = useCallback(async () => {
    const SELF_VIDEO_ID = 'ZOOM_WEB_SDK_SELF_VIDEO';
    if (isStartedVideo) {
      await mediaStream?.stopVideo();
      setIsStartedVideo(false);
    } else {
      if (!mediaStream?.isSupportMultipleVideos()) {
        const videoElement = document.querySelector(`#${SELF_VIDEO_ID}`);
        if (videoElement) {
          await mediaStream?.startVideo({ videoElement });
          if (!isSupportWebCodecs()) {
            const canvasElement = document.querySelector(`#${SELF_VIDEO_ID}`);
            mediaStream?.renderVideo(canvasElement, client.getSessionInfo().userId, 254, 143, 0, 0, 3);
          }
        }
      } else {
        const startVideoOptions = { hd: true,  virtualBackground: { imageUrl: 'blur' } };
        await mediaStream?.startVideo(startVideoOptions);
        if (!mediaStream?.isSupportMultipleVideos()) {
          const canvasElement = document.querySelector(`#${SELF_VIDEO_ID}`);
          mediaStream?.renderVideo(canvasElement, client.getSessionInfo().userId, 254, 143, 0, 0, 3);
        }
      }

      setIsStartedVideo(true);
    }
  }, [mediaStream, isStartedVideo, client]);

  const onMicrophoneClick = useCallback(async () => {
    if (isStartedAudio) {
      if (isMuted) {
        await mediaStream?.unmuteAudio();
        setIsMuted(false);
      } else {
        await mediaStream?.muteAudio();
        setIsMuted(true);
      }
    } else {
      await mediaStream?.startAudio();
      setIsStartedAudio(true);
      if (memberState.status === 'Student') {
        setTimeout(() => {
          mediaStream?.stopAudio();
          setIsStartedAudio(false);
          message.info('Time is Up! Thanks for Sharing')
        }, 10000);   
      }
    }
  }, [mediaStream, isStartedAudio, isMuted]);

  const onMicrophoneMenuClick = async (key) => {
    if (mediaStream) {
      const [type, deviceId] = key.split('|');
      if (type === 'microphone') {
        if (deviceId !== activeMicrophone) {
          await mediaStream.switchMicrophone(deviceId);
          setActiveMicrophone(mediaStream.getActiveMicrophone());
        }
      } else if (type === 'speaker') {
        if (deviceId !== activeSpeaker) {
          await mediaStream.switchSpeaker(deviceId);
          setActiveSpeaker(mediaStream.getActiveSpeaker());
        }
      } else if (type === 'leave audio') {
        if (audio === 'computer') {
          await mediaStream.stopAudio();
        } 
        setIsStartedAudio(false);
      } else if (type === 'statistic') {
        setSelectedStatisticTab('audio');
        setStatisticVisible(true);
      }
    }
  };
  const onSwitchCamera = async (key) => {
    if (mediaStream) {
      if (activeCamera !== key) {
        await mediaStream.switchCamera(key);
        setActiveCamera(mediaStream.getActiveCamera());
      }
    }
  };

  const onHostAudioMuted = useCallback((payload) => {
    const { action, source, type } = payload;
    if (action === AudioChangeAction.Join) {
      setIsStartedAudio(true);
      setAudio(type);
    } else if (action === AudioChangeAction.Leave) {
      setIsStartedAudio(false);
    } else if (action === AudioChangeAction.Muted) {
      setIsMuted(true);
      if (source === MutedSource.PassiveByMuteOne) {
        message.info('Host muted you');
      }
    } else if (action === AudioChangeAction.Unmuted) {
      setIsMuted(false);
      if (source === 'passive') {
        message.info('Host unmuted you');
      }
    }
  }, []);

  const onScreenShareClick = useCallback(async () => {
    if (!isStartedScreenShare && shareRef && shareRef.current) {
      await mediaStream?.startShareScreen(shareRef.current, { requestReadReceipt: true });
      setIsStartedScreenShare(true);
    } else if (isStartedScreenShare) {
      await mediaStream?.stopShareScreen();
      setIsStartedScreenShare(false);
    }
  }, [mediaStream, isStartedScreenShare, shareRef]);


  const onVideoCaptureChange = useCallback((payload) => {
    if (payload.state === VideoCapturingState.Started) {
      setIsStartedVideo(true);
    } else {
      setIsStartedVideo(false);
    }
  }, []);
  const onShareAudioChange = useCallback((payload) => {
    const { state } = payload;
    if (state === 'on') {
      setIsComputerAudioDisabled(true);
    } else if (state === 'off') {
      setIsComputerAudioDisabled(false);
    }
  }, []);
  const onHostAskToUnmute = useCallback((payload) => {
    const { reason } = payload;
    console.log(`Host ask to unmute the audio.`, reason);
  }, []);

  const onCanSeeMyScreen = useCallback(() => {
    message.info('Users can now see your screen', 1000);
  }, []);

  useEffect(() => {
    client.on('current-audio-change', onHostAudioMuted);
    client.on('video-capturing-change', onVideoCaptureChange);
    client.on('share-audio-change', onShareAudioChange);
    client.on('host-ask-unmute-audio', onHostAskToUnmute);
    client.on('share-can-see-screen', onCanSeeMyScreen);
    return () => {
      client.off('current-audio-change', onHostAudioMuted);
      client.off('video-capturing-change', onVideoCaptureChange);
      client.off('share-audio-change', onShareAudioChange);
      client.off('host-ask-unmute-audio', onHostAskToUnmute);
      client.off('share-can-see-screen', onCanSeeMyScreen);
    };
  }, [
    client,
    onHostAudioMuted,
    onVideoCaptureChange,
    onShareAudioChange,
    onHostAskToUnmute,
    onCanSeeMyScreen
  ]);
  useUnmount(() => {
    if (isStartedAudio) {
      mediaStream?.stopAudio();
    }
    if (isStartedVideo) {
      mediaStream?.stopVideo();
    }
    if (isStartedScreenShare) {
      mediaStream?.stopShareScreen();
    }
  });
  useEffect(() => {
    if (mediaStream && client.getSessionInfo().isInMeeting) {
      mediaStream.subscribeAudioStatisticData();
      mediaStream.subscribeVideoStatisticData();
    }
    return () => {
      if (client.getSessionInfo().isInMeeting) {
        mediaStream?.unsubscribeAudioStatisticData();
        mediaStream?.unsubscribeVideoStatisticData();
      }
    };
  }, [mediaStream, client]);
  return (
    <div className={classNames('video-footer', className)}>
      {isAudioEnable && (
        <MicrophoneButton
          isStartedAudio={isStartedAudio}
          isMuted={isMuted}
          audio={audio}
          onMicrophoneClick={onMicrophoneClick}
          onMicrophoneMenuClick={onMicrophoneMenuClick}
          speakerList={speakerList}
          activeMicrophone={activeMicrophone}
          activeSpeaker={activeSpeaker}
          disabled={isComputerAudioDisabled}
        />
      )}
      <CameraButton
        isStartedVideo={isStartedVideo}
        onCameraClick={onCameraClick}
        onSwitchCamera={onSwitchCamera}
        onVideoStatistic={() => {
          setSelectedStatisticTab('video');
          setStatisticVisible(true);
        }}
        activeCamera={activeCamera}
      />
      {sharing && (
        <ScreenShareButton
          sharePrivilege={sharePrivilege}
          isHostOrManager={client.isHost() || client.isManager()}
          isStartedScreenShare={isStartedScreenShare}
          onScreenShareClick={onScreenShareClick}
          onSharePrivilegeClick={async (privilege) => {
            await mediaStream?.setSharePrivilege(privilege);
            setSharePrivileg(privilege);
          }}
        />
      )}
    </div>
  );
};
export default VideoFooter;
