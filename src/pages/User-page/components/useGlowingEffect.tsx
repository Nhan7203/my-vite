import { useState, useEffect } from 'react';

const useGlowingEffect = (initialValue = false, interval = 1000) => {
  const [isGlowing, setIsGlowing] = useState(initialValue);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsGlowing((prevIsGlowing) => !prevIsGlowing);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  return isGlowing;
};

export default useGlowingEffect;