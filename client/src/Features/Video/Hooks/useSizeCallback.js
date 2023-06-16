import { useLayoutEffect } from "react";

export const useSizeCallback = (target, callback) => {
  useLayoutEffect(() => {
    if (!target) {
      return () => {}
    }
    //resizeObserver interface reports changes to dimensions of element's content or border box
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((e) => {
      callback({
        width: e.target.clientWidth,
        height: e.target.clientHeight
      })
    })
  });
  resizeObserver.observe(target);
  return () => {
    resizeObserver.unobserve(target);
    resizeObserver.disconnect();
  };
  }, [target, callback])
}

