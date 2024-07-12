import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const useScreenShake = () => {
  const [screenShake, setScreenShake] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start(() => {
      setScreenShake(false);
    });
  };

  useEffect(() => {
    if (screenShake) {
      startShakeAnimation();
    }
  }, [screenShake]);

  return { screenShake, setScreenShake, shakeAnimation };
};

export default useScreenShake;
