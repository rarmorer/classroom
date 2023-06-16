import { useRef, useEffect } from 'react';

export const useEventListener = (target, eventName, handler, options) => {
  
  const handlerRef = useRef();
  handlerRef.current = handler;

  useEffect(() => {
    let targetElement = null;
    if (!target){ 
      targetElement = window
    } else if (Object.hasOwnProperty.call(target, 'current')) {
      targetElement = target.current;
    } else {
      targetElement = target;
    }
    if (targetElement && targetElement.addEventListener) {
      const eventListener = (event) => {
        handlerRef.current && handlerRef.current(event);
        targetElement.addEventListener(eventName, eventListener, {
          capture: options.capture,
          passive: options.passive
        });
        return () => {
          targetElement?.removeEventListner(eventName, eventListener, {
            capture: options.capture
          })
        }
      };
    }
    return () => {

    }
  }, [target, eventName, options])
}