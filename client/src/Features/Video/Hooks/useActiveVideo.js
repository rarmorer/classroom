import { useState, useCallback, useEffect } from "react";

export const useActiveVideo = (client) => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeSpeaker, setActiveSpeaker] = useState(0);
  const onVideoActiveChange = useCallback((payload) => {
    const { state, userId } = payload;
    if (state === 'Active') {
      setActiveVideo(userId);
    } else if (state === 'Inactive') {
      setActiveVideo(0);
    }
  }, []);

  const onActiveSpeakerChange = useCallback((payload) => {
    if (Array.isArray(payload) && payload.length > 0) {
      const { userId } = payload[0];
      setActiveSpeaker(userId);
    }
  }, []);

  useEffect(() => {
    client.on('video-active-change', onVideoActiveChange);
    client.on('active-speaker', onActiveSpeakerChange);
    return () => {
      client.off('video-active-change', onVideoActiveChange);
      client.off('active-speaker', onActiveSpeakerChange);
    };
  }, [client, onVideoActiveChange, onActiveSpeakerChange]);
  
  return activeVideo || activeSpeaker;
}