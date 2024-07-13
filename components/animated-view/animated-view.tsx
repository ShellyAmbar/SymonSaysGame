import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const BouncingButton = ({ children, style, duration = 600, toValue = 1.3 }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const bounce = () => {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ]).start(() => bounce());
    };
    bounce();
  }, [bounceAnim]);

  return (
    <Animated.View
      style={[{ transform: [{ scale: bounceAnim }] }, { ...style }]}
    >
      {children}
    </Animated.View>
  );
};

export default BouncingButton;
