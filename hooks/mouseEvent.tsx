import { useEffect } from 'react';
import { SpringRef } from 'react-spring';
import { useIsOver, useSetIsOver } from '../contexts/MouseContext';

export type Mouse = {
  width: number;
  height: number;
  borderRadius: number;
  opacity: number;
  top: number;
  left: number;
};

const useMouseMove = (initMouse: Mouse, setSpringStyles: SpringRef<Mouse>, times: number) => {
  const isOver = useIsOver();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (isOver) {
        setSpringStyles.start({
          opacity: 100,
          // 大きくした分だけ割る値も小さくする
          top: e.y - initMouse.height / (2 / times),
          left: e.x - initMouse.width / (2 / times),
        });
      } else {
        setSpringStyles.start({
          opacity: 100,
          // initMouse.* / 2 は真ん中合わせ
          top: e.y - initMouse.height / 2,
          left: e.x - initMouse.width / 2,
        });
      }
    };

    window.addEventListener('mousemove', listener);

    return () => {
      window.removeEventListener('mousemove', listener);
    };
  }, [setSpringStyles, initMouse, times, isOver]);
};

const useMouseOver = (initMouse: Mouse, setSpringStyles: SpringRef<Mouse>, times: number, tag: string) => {
  const setIsOver = useSetIsOver();

  useEffect(() => {
    const elements = document.querySelectorAll(tag);
    const listener = () => {
      setSpringStyles.start({
        width: initMouse.width * times,
        height: initMouse.height * times,
        borderRadius: initMouse.borderRadius * times,
      });

      setIsOver(true);
    };

    elements.forEach((element) => {
      element.addEventListener('mouseover', listener);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mouseover', listener);
      });
    };
  }, [initMouse, setSpringStyles, times, tag, setIsOver]);
};

const useMouseOut = (initMouse: Mouse, setSpringStyles: SpringRef<Mouse>, times: number, tag: string) => {
  const setIsOver = useSetIsOver();

  useEffect(() => {
    const elements = document.querySelectorAll(tag);
    const listener = () => {
      setSpringStyles.start({
        width: initMouse.width,
        height: initMouse.height,
        borderRadius: initMouse.borderRadius,
      });

      setIsOver(false);
    };

    elements.forEach((element) => {
      element.addEventListener('mouseout', listener);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mouseout', listener);
      });
    };
  }, [initMouse, setSpringStyles, times, tag, setIsOver]);
};

export { useMouseMove, useMouseOver, useMouseOut };
