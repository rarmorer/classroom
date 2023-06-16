import { useContext } from 'react';
import { Button, Tooltip, Menu, Dropdown } from 'antd';
import { CheckOutlined, UpOutlined, VideoCameraAddOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { MediaContext } from '../../../context/globalContext';
import classNames from 'classnames';
import './camera.scss';

const CameraButton = (props) => {
  const {
    isStartedVideo,
    className,
    cameraList,
    activeCamera,
    isMirrored,
    isBlur,
    onCameraClick,
    onSwitchCamera,
    onMirrorVideo,
    onVideoStatistic,
    onBlurBackground
  } = props;
  const { mediaStream } = useContext(MediaContext);
  const onMenuItemClick = (payload) => {
    if (payload.key === 'mirror') {
      onMirrorVideo?.();
    } else if (payload.key === 'statistic') {
      onVideoStatistic?.();
    } else if (payload.key === 'blur') {
      onBlurBackground?.();
    } else {
      onSwitchCamera(payload.key);
    }
  };
  const menu = cameraList && cameraList.length > 0 && (
    <Menu onClick={onMenuItemClick} theme="dark" className="camera-menu">
      <Menu.ItemGroup title="Select a Camera">
        {cameraList.map((item) => (
          <Menu.Item key={item.deviceId} icon={item.deviceId === activeCamera && <CheckOutlined />}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item key="mirror" icon={isMirrored && <CheckOutlined />}>
        Mirror My Video
      </Menu.Item>
      {mediaStream?.isSupportVirtualBackground() && (
        <Menu.Item key="blur" icon={isBlur && <CheckOutlined />}>
          Blur My Background
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item key="statistic">Video Statistic</Menu.Item>
    </Menu>
  );
  
  return (
    <div className={classNames('camera-footer', className)}>
      {isStartedVideo && menu ? (
        <Dropdown.Button
          className="camera-dropdown-button"
          size="large"
          overlay={menu}
          onClick={onCameraClick}
          trigger={['click']}
          type="ghost"
          icon={<UpOutlined />}
          placement="topRight"
        >
          <VideoCameraOutlined />
        </Dropdown.Button>
      ) : (
        <Tooltip title={`${isStartedVideo ? 'stop camera' : 'start camera'}`}>
          <Button
            className={classNames('camere-button', className)}
            icon={isStartedVideo ? <VideoCameraOutlined /> : <VideoCameraAddOutlined />}
            ghost={true}
            shape="circle"
            size="large"
            onClick={onCameraClick}
          />
        </Tooltip>
      )}
    </div>
  );
};
export default CameraButton;
