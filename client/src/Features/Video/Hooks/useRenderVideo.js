import { useEffect, MutableRefObject } from "react";
import { usePrevious } from "./usePrevious";
import { usePersistFunc } from "./usePersistFunc";
import { isShallowEqual } from "../../../util";

export const useRenderVideo = (mediaStream, videoRef, layout, subscribedVid, participants, currUserId) => {
  const prevSubscribedVids = usePrevious(subscribedVid);
  const prevLayout = usePrevious(layout);
  const prevParticipants = usePrevious(participants);

   //gallery view without SharedArrayBuffer mode, self video is present by Video Element
   
   const skipSelfVideo = !window.crossOriginIsolated;
   useEffect(() => {
    if (videoRef.current && layout && layout.length > 0) {
      const addedSubscribers = subscribedVid.filter((id) => !(prevSubscribedVids || []).includes(id));
      const removedSubscribers = (prevSubscribedVids || []).filter((id)=> !subscribedVid.includes(id));
      const unalteredSubscribers = subscribedVid.filter((id) => (prevSubscribedVids || []).includes(id));

      if (removedSubscribers.length > 0) {
        removedSubscribers.forEach(async (userId) => {
          if ((!skipSelfVideo || (skipSelfVideo && userId !== currUserId))) {
            await mediaStream?.stopRenderVideo(videoRef.current, userId)
          }
        });
      }
      if (addedSubscribers.length > 0) {
        addedSubscribers.forEach(async (userId) => {
          const index = participants.findIndex((user) => user.userId === userId);
          const cellDimension = layout[index];
          if (cellDimension && (!skipSelfVideo || (skipSelfVideo && userId !== currUserId))) {
            const {width, height, x, y, quality} = cellDimension;
            await mediaStream?.renderVideo(videoRef.current, userId, width, height, x, y, quality)
          }
        })
      }
      if (unalteredSubscribers.length > 0) {
        if (prevLayout && (layout.length !== prevLayout.length || !isShallowEqual(layout[0], prevLayout[0]))) {
          unalteredSubscribers.forEach((userId) => {
            const index = participants.findIndex((el) => el.userId === userId);
            const cellDimension = layout[index];
            if (cellDimension && (!skipSelfVideo || (skipSelfVideo && userId !== currUserId))) {
              const {width, height, x, y, quality} = cellDimension;
              if (prevLayout && prevLayout[index] && prevLayout[index].quality !== quality) {
                mediaStream?.renderVideo(videoRef.current, userId, width, height, x, y, quality)
              }
              mediaStream?.adjustRenderedVideoPosition(videoRef.current, userId, width, height, x, y)
            }
          })
        }
        //order of participants changed
        const participantsIds = participants.map((user) => user.userId);
        const previousParticipantsIds = prevParticipants?.map((user) => user.userId);
        if (participantsIds.join('-') !== previousParticipantsIds?.join('-')) {
          unalteredSubscribers.forEach((userId) => {
            const index = participantsIds.findIndex((id) => id === userId);
            const prevIndex = previousParticipantsIds?.findIndex((id) => id === userId);
            if (index !== prevIndex) {
              const cellDimension = layout[index];
              if (cellDimension && (!skipSelfVideo || (skipSelfVideo && userId !== currUserId))) {
                const {width, height, x, y} = cellDimension;
                mediaStream?.adjustRenderedVideoPosition(videoRef.current, userId, width, height, x, y)
              }
            }
          })
        }
      }
    }
   }, [mediaStream, videoRef, layout, prevLayout, participants, prevParticipants, subscribedVid, prevSubscribedVids, skipSelfVideo, currUserId])
  
useEffect(() => {
  if (subscribedVid.length > 0) {
    subscribedVid.forEach(async(userId) => {
      const index = participants.findIndex((user) => user.userId === userId);
      const cellDimension = layout[index];
      if (cellDimension &&(!skipSelfVideo || (skipSelfVideo && userId !== currUserId))) {
        const { width, height, x, y, quality } = cellDimension;
        await mediaStream?.renderVideo(videoRef.current, userId, width, height, x, y, quality )
      }
    })
  }
}, [mediaStream, videoRef, layout, participants, subscribedVid, skipSelfVideo, currUserId]);

  const stopAllVids = usePersistFunc((videoCanvasDOM) => {
    if (subscribedVid.length > 0) {
      subscribedVid.forEach((userId) => {
        mediaStream?.stopRenderVideo(videoCanvasDOM, userId)
      })
    }
  });

  useEffect(() => {
    const videoCanvasDOM = videoRef.current;
    return () => {
      stopAllVids(videoCanvasDOM)
    };
  }, [videoRef, stopAllVids])
  
}