import {useCallback, useEffect, useState, MutableRefObject} from 'react';
import { getVideoLayout } from './videoLayoutHelper';
import { useRenderVideo } from './useRenderVideo';


export const useGalleryLayout = (client, mediaStream, videoRef, dimension, pagination) => {
    const [visibleParticipants, setVisibleParticipants] = useState([]);
    const [layout, setLayout] = useState([]);
    const [subscribedVideos, setSubscribedVideos] = useState([]);
    const { page, pageSize, totalPage, totalSize } = pagination;

    let size = pageSize;
    if (page === totalPage - 1) {
      size = Math.min(size, totalSize % pageSize || size);
    }

    useEffect(() => {
      setLayout(getVideoLayout(dimension.width, dimension.height, size));
      }, [dimension, size]);

      const onParticipantsChange = useCallback(() => {
      const participants = client.getAllUser();
      const currentUser = client.getCurrentUserInfo();
      if (currentUser && participants.length > 0) {
        let pageParticipants = [];
        if (participants.length === 1) {
          pageParticipants = participants;
        } else {
          pageParticipants = participants
            .filter((user) => user.userId !== currentUser.userId)
            .sort((user1, user2) => Number(user2.bVideoOn) - Number(user1.bVideoOn));
          pageParticipants.splice(1, 0, currentUser);
          pageParticipants = pageParticipants.filter(
            (_user, index) => Math.floor(index / pageSize) === page,
          );
        }
        setVisibleParticipants(pageParticipants);
        const videoParticipants = pageParticipants
          .filter((user) => user.bVideoOn)
          .map((user) => user.userId);
        setSubscribedVideos(videoParticipants);
      }
    }, [client, page, pageSize]);
    useEffect(() => {
      client.on('user-added', onParticipantsChange);
      client.on('user-removed', onParticipantsChange);
      client.on('user-updated', onParticipantsChange);
      return () => {
        client.off('user-added', onParticipantsChange);
        client.off('user-removed', onParticipantsChange);
        client.off('user-updated', onParticipantsChange);
      };
    }, [client, onParticipantsChange]);
    useEffect(() => {
      onParticipantsChange();
    }, [onParticipantsChange]);
  
    useRenderVideo(
      mediaStream,
      videoRef,
      layout,
      subscribedVideos,
      visibleParticipants,
      client.getCurrentUserInfo()?.userId
    );
    return {
      visibleParticipants,
      layout,
    };
}