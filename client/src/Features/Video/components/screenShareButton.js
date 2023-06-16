import React, {useContext} from 'react';
import { Button, Tooltip, Menu, Dropdown, Message } from 'antd';
import classNames from 'classnames';
import { UserContext } from '../../../context/globalContext';
import { IconFont } from '../../../icons/icon-font';
import { LockOutlined, UnlockOutlined, UpOutlined, CheckOutlined } from '@ant-design/icons';
import './screen-share.scss';
import { SharePrivilege } from '@zoom/videosdk';

const { Button: DropdownButton } = Dropdown;
const ScreenShareButton = (props) => {
  const { isStartedScreenShare, sharePrivilege, isHostOrManager, onScreenShareClick, onSharePrivilegeClick } = props;
  const {memberState, memberDispatch} = useContext(UserContext);

  const menu = [
    {
      label: 'Lock share',
      value: SharePrivilege.Locked,
      checked: sharePrivilege === SharePrivilege.Locked
    },
    {
      label: 'One participant can share at a time',
      value: SharePrivilege.Unlocked,
      checked: sharePrivilege === SharePrivilege.Unlocked
    },
    {
      label: 'Multiple participants can share simultaneously',
      value: SharePrivilege.MultipleShare,
      checked: sharePrivilege === SharePrivilege.MultipleShare
    }
  ];
  const onMenuItemClick = (payload) => {
    onSharePrivilegeClick?.(Number(payload.key));
  };
  const overlayMenu = (
    <Menu onClick={onMenuItemClick} theme="dark" className="microphone-menu">
      {menu.map((e) => (
        <Menu.Item key={`${e.value}`} icon={e.checked && <CheckOutlined />}>
          {e.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isHostOrManager ? (
        <DropdownButton
          className="screen-share-dropdown-button"
          size="large"
          overlay={overlayMenu}
          onClick={onScreenShareClick}
          trigger={['click']}
          type="ghost"
          icon={<UpOutlined />}
          placement="topRight"
        >
          <IconFont type="icon-share" />
        </DropdownButton>
      ) : (
        <Tooltip title={memberState.status === 'Student' && 'Students Cannot Share Screen'}>
        <Button
          className={classNames('screen-share-button', {
            'started-share': isStartedScreenShare
          })}
          disabled={memberState.status === 'Student' ? true : false}
          icon={<IconFont type="icon-share" />}
          ghost={true}
          shape="circle"
          size="large"
          onClick={onScreenShareClick}
        />
        </Tooltip>
      )}
    </>
  );
};

const ScreenShareLockButton = (props) => {
  const { isLockedScreenShare, onScreenShareLockClick } = props;
  return (
    <Tooltip title={isLockedScreenShare ? 'unlock screen share' : ' lock screen share'}>
      <Button
        className="screen-share-button"
        icon={isLockedScreenShare ? <LockOutlined /> : <UnlockOutlined />}
        // eslint-disable-next-line react/jsx-boolean-value
        ghost={true}
        shape="circle"
        size="large"
        onClick={onScreenShareLockClick}
      />
    </Tooltip>
  );
};

export { ScreenShareButton, ScreenShareLockButton };
