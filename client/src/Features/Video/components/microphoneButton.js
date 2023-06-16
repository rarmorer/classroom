/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Menu, Tooltip, Dropdown, Button, Modal, Select, Input } from 'antd';
import classNames from 'classnames';
import { AudioOutlined, AudioMutedOutlined, CheckOutlined, UpOutlined } from '@ant-design/icons';
import { IconFont } from '../../../icons/icon-font';
import './microphone.scss';
// import CallOutModal from './call-out-modal';

const { Button: DropdownButton } = Dropdown;

const MicrophoneButton = (props) => {
  const {
    isStartedAudio,
    isSupportPhone,
    isMuted,
    className,
    disabled,
    onMicrophoneClick,
    onMicrophoneMenuClick,

  } = props;
  const tooltipText = isStartedAudio ? (isMuted ? 'unmute' : 'mute') : 'start audio';
  const menu = [];
  menu.push({
    items: [
      {
        label: 'Leave Audio',
        value: 'leave audio'
      }
    ]
  });

  const onMenuItemClick = (payload) => {
    onMicrophoneMenuClick(payload.key);
  };

  const overlayMenu = (
    <Menu onClick={onMenuItemClick} theme="dark" className="microphone-menu">
      {menu.map((e) => {
        if (e.group) {
          const mItem = e.items.map((m) => (
            <Menu.Item key={`${e.group}|${m.value}`} icon={m.checked && <CheckOutlined />}>
              {m.label}
            </Menu.Item>
          ));
          return (
            <React.Fragment key={e.group}>
              <Menu.ItemGroup title={e.title} key={e.group}>
                {mItem}
              </Menu.ItemGroup>
              <Menu.Divider key={`${e.group}-divider`} />
            </React.Fragment>
          );
        }
        return (e.items).map((m) => (
          <Menu.Item key={m?.value}>{m?.label}</Menu.Item>
        ));
      })}
    </Menu>
  );

  return (
    <div className={classNames('microphone-footer', className)}>
      {isStartedAudio ? (
        <DropdownButton
          className="microphone-dropdown-button"
          size="large"
          overlay={overlayMenu}
          onClick={onMicrophoneClick}
          trigger={['click']}
          type="ghost"
          icon={<UpOutlined />}
          placement="topRight"
          disabled={disabled}
        >
          {isMuted ? <AudioMutedOutlined/> : <AudioOutlined/>}
        </DropdownButton>
      ) : (
        <Tooltip title={tooltipText}>
          {isSupportPhone ? (
            <DropdownButton
              className="microphone-dropdown-button"
              size="large"
              onClick={onMicrophoneClick}
              trigger={['click']}
              type="ghost"
              icon={<UpOutlined />}
              placement="topRight"
            >
              <IconFont type="icon-headset" />
            </DropdownButton>
          ) : (
            <Button
              className="microphone-button"
              icon={<IconFont type="icon-headset" />}
              size="large"
              ghost
              shape="circle"
              onClick={onMicrophoneClick}
            />
          )}
        </Tooltip>
      )}

    </div>
  );
};

export default MicrophoneButton;
