import { useState } from 'react';
import { useEventListener } from './useEventListener';

export const useHover = (ref, options) => {
  const [isHover, setIsHover] = useState(false);
  const { onEnter, onLeave } = options || {};
  useEventListener(ref, 'mouseenter', () => {
    onEnter && onEnter();
    setIsHover(true);
  });
  useEventListener(ref, 'mouseleave', () => {
    onLeave && onLeave();
    setIsHover(false);
  });
  return isHover;
}