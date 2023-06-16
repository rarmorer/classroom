import React, { useContext, useRef } from 'react';
import { AudioMutedOutlined } from '@ant-design/icons';
import { Slider } from 'antd';
import classNames from 'classnames';
import './Avatar.scss';
import { ClientContext } from '../../../context/globalContext';
import { useHover } from '../../../Hooks/useHover';

const Avatar = (props) => {
  const { participant, style, isActive, className, volume, setLocalVolume } = props;
  const { displayName, audio, muted, bVideoOn, userId } = participant;
  const avatarRef = useRef(null);
  const isHover = useHover(avatarRef);
  const zmClient = useContext(ClientContext);
  const onSliderChange = (value) => {
    setLocalVolume?.(userId, value);
  };
  return (
    <div
    className={classNames('avatar', { 'avatar-active': isActive }, className)}
    style={{ ...style, background: bVideoOn ? 'transparent' : 'rgb(26,26,26)' }}
    ref={avatarRef}
  >
    {(bVideoOn || (audio === 'computer' && muted)) && (
      <div className="corner-name">
        {audio === 'computer' && muted && <AudioMutedOutlined style={{ color: '#f00' }} />}
        {/* {bVideoOn && <span>{displayName}</span>} */}
      </div>
    )}
    {/* {!bVideoOn && <p className="center-name">{displayName}</p>} */}
    {isHover && audio === 'computer' && zmClient.getSessionInfo().userId !== userId && (
      <div className={classNames('avatar-volume')}>
        <label>Volume:</label>
        <Slider
          marks={{ 0: '0', 100: '100' }}
          tooltipVisible={true}
          defaultValue={100}
          onChange={onSliderChange}
          value={volume}
        />
      </div>
    )}
  </div>
  )
};

export default Avatar;