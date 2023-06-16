import { useState, useCallback, useEffect } from 'react';
import { useMount, useUnmount } from './useMount';
import { usePrevious } from './usePrevious';

export const useShare = (client, mediaStream, shareRef) => {
  const [isRecieveSharing, setIsReceiveSharing] = useState(false);
  const [isStartedShare, setIsStartedShare] = useState(false);
  const [activeSharingId, setActiveSharingId] = useState(0);
  const [sharedContentDimension, setSharedContentDimension] = useState({
    width: 0,
    height: 0
  });
  const [currentUserId, setCurrentUserId] = useState(0);
  const onActiveShareChange = useCallback(({state, userId}) => {
    if (!isStartedShare) {
      setActiveSharingId(userId);
      setIsReceiveSharing(state === 'Active')
    }
  }, [isStartedShare])

  const onSharedContentDimensionChange = useCallback(({width, height}) => {
    setSharedContentDimension({width, height})
  }, []);

  const onCurrentUserUpdate = useCallback((payload) => {
    if (Array.isArray(payload) && payload.length > 0) {
      payload.forEach((el) => {
        if (el.userId ===  currentUserId  && el.shareOn !== undefined) {
          setIsStartedShare(el.shareOn);
          if (el.shareOn) {
            setIsReceiveSharing(false)
          }
        }
      })
    }
  }, [currentUserId]);

  useEffect(() => {
    client.on('active-share-change', onActiveShareChange);
    client.on('share-content-dimension-change', onSharedContentDimensionChange);
    client.on('user-updated', onCurrentUserUpdate);
    return () => {
    client.off('active-share-change', onActiveShareChange);
    client.off('share-content-dimension-change', onSharedContentDimensionChange);
    client.off('user-updated', onCurrentUserUpdate);
    };
  }, [client, onActiveShareChange, onSharedContentDimensionChange, onCurrentUserUpdate]);

  const previousIsReceiveSharing = usePrevious(isRecieveSharing);

  useEffect(() => {
    if (shareRef.current && previousIsReceiveSharing !== isRecieveSharing) {
      if (isRecieveSharing) {
        mediaStream?.startShareView(shareRef.current, activeSharingId);
      } else if (previousIsReceiveSharing === true && isRecieveSharing === false) {
        mediaStream?.stopShareView();
      }
    }
  }, [mediaStream, shareRef, previousIsReceiveSharing, isRecieveSharing, activeSharingId]);

  useEffect(() => {
    if (mediaStream) {
      const activeSharedUserId = mediaStream.getActiveShareUserId();
      if (activeSharedUserId) {
        setIsReceiveSharing(true);
        setActiveSharingId(activeSharedUserId)
      }
    }
  }, [mediaStream]);

  useMount(() => {
    setCurrentUserId(client.getSessionInfo().userId)
  })

  useUnmount(() => {
    if (isRecieveSharing && client.getSessionInfo().isInMeeting) {
      mediaStream?.stopShareView();
    }
  });
  return { isRecieveSharing, isStartedShare, sharedContentDimension}
}