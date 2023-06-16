import { useRef } from 'react';

export const usePersistFunc = (func) => {
  const fnRef = useRef(func);
  fnRef.current = func;
  const PersistFunc = useRef();
  if (!PersistFunc.current) {
    PersistFunc.current = (args) => {
      fnRef.current.apply(this, args)
    }
  }
  return PersistFunc.current;
}