import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { ClientContext, MediaContext } from '../../../context/globalContext';
import Avatar from './Avatar' 
import Pagination from './Pagination';
import { useCanvasDimension } from '../Hooks/useCanvasDimension';
import { useGalleryLayout } from '../Hooks/useGalleryLayout';
import { usePagination } from '../Hooks/usePagination';
import { useActiveVideo } from '../Hooks/useActiveVideo';
import { useShare } from '../Hooks/useShare';
import { useLocalVolume } from '../Hooks/useLocalVolume';
import './video.scss';
import VideoFooter from './VideoFooter';
import { isShallowEqual } from '../../../dev';
import { useSizeCallback } from '../Hooks/useSizeCallback';

const VideoContainer = (props) => {
  const {status} = props;
  const client = useContext(ClientContext);
  const {mediaStream} = useContext(MediaContext);

  const videoRef = useRef(null);
  const shareRef = useRef(null);
  const selfShareRef = useRef(null);
  const shareContainerRef = useRef(null);
  const [containerDimension, setContainerDimension] = useState({width: 0, height: 0})

  const [shareViewDimension, setShareViewDimension] = useState({width: 0,height: 0});
  const canvasDimension = useCanvasDimension(mediaStream, videoRef);
  const activeVideo = useActiveVideo(client);
  const { page, pageSize, totalPage, totalSize, setPage } = usePagination(client, canvasDimension);
  const { visibleParticipants, layout: videoLayout } = useGalleryLayout(
    client,
    mediaStream,
    videoRef,
    canvasDimension,
    {
      page,
      pageSize,
      totalPage,
      totalSize
    }
  );
  const {isRecieveSharing, isStartedShare, sharedContentDimension} = useShare(client, client.getMediaStream(), shareRef);
  const {userVolumeList, setLocalVolume} = useLocalVolume();
  const isSharing = isRecieveSharing || isStartedShare;

  const isSupportWebCodecs = () => {
    return typeof window.MediaStreamTrackProcessor === 'function';
   }
  
  useEffect(() => {
    if (isSharing && shareContainerRef.current) {
      const {width, height} = sharedContentDimension;
      const {width: containerWidth, height: containerHeight} = containerDimension;
      const ratio = Math.min(containerWidth / width, containerHeight / height, 1);
      setShareViewDimension({
        width: Math.floor(width * ratio),
        height: Math.floor(height * ratio)
        })
      }
    }, [isSharing, sharedContentDimension, containerDimension])

      const onShareContainerResize = useCallback(({width, height}) => {
        _.throttle(() => {
          setContainerDimension({width, height});
        }, 50)();
      }, [])

      useSizeCallback(shareContainerRef.current, onShareContainerResize);

      useEffect(() => {
        if (!isShallowEqual(shareViewDimension, sharedContentDimension)) {
          mediaStream?.updateSharingCanvasDimension(shareViewDimension.width, shareViewDimension.height)
        }
      }, [mediaStream, sharedContentDimension, shareViewDimension])
  
      return (
        <div className="viewport">
        <div
          className={classnames('share-container', {
            'in-sharing': isSharing
          })}
          ref={shareContainerRef}
        >
          <div
            className="share-container-viewport"
            style={{
              width: `${shareViewDimension.width}px`,
              height: `${shareViewDimension.height}px`
            }}
          >
            <canvas className={classnames('share-canvas', { hidden: isStartedShare })} ref={shareRef} />
            {isSupportWebCodecs() ? (
              <video
                className={classnames('share-canvas', {
                  hidden: isRecieveSharing
                })}
                ref={selfShareRef}
              />
            ) : (
              <canvas
                className={classnames('share-canvas', {
                  hidden: isRecieveSharing
                })}
                ref={selfShareRef}
              />
            )}
          </div>
        </div>
        <div
          className={classnames('video-container', {
            'in-sharing': isSharing
          })}
        >
          <canvas className="video-canvas" id="video-canvas" width="800" height="600" ref={videoRef} />
          <ul className="avatar-list">
            {visibleParticipants.map((user, index) => {
              if (index > videoLayout.length - 1) {
                return null;
              }
              const dimension = videoLayout[index];
              const { width, height, x, y } = dimension;
              const { height: canvasHeight } = canvasDimension;
              return (
                <Avatar
                  participant={user}
                  key={user.userId}
                  isActive={activeVideo === user.userId}
                  volume={userVolumeList.find((u) => u.userId === user.userId)?.volume}
                  setLocalVolume={setLocalVolume}
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    top: `${canvasHeight - y - height}px`,
                    left: `${x}px`
                  }}
                />
              );
            })}
          </ul>
        </div>
        <VideoFooter className="video-operations" sharing shareRef={selfShareRef} />
        {totalPage > 1 && <Pagination page={page} totalPage={totalPage} setPage={setPage} inSharing={isSharing} />}
      </div> 
      )
}

export default VideoContainer;