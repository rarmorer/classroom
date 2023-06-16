import {useEffect, useRef } from 'react';

export const useUnmount = (func) => {
  const fnRef = useRef(func);
  fnRef.current = func;
  //curried anonymous functions 
  useEffect(() => () => {
    if (fnRef.current) {
      fnRef.current();
    }
  }, [])
};

export const useMount = (func) => {
  useEffect(() => {
    func();
  }, []);
}