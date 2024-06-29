import { View } from 'react-native';
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import Styles from './rectangle.styles';

const Rectangle = memo(
  forwardRef(({ color }: { color: string }, ref: any) => {
    const [opacity, setOpacity] = useState(1);
    useImperativeHandle(ref, () => ({
      simulateButtonPress: () => {
        setOpacity(0);
        const timeout = setTimeout(() => {
          setOpacity(1);
          clearTimeout(timeout);
        }, 300);
      },
    }));
    return (
      <View
        ref={ref}
        style={[Styles.rectangle, { backgroundColor: color, opacity: opacity }]}
      />
    );
  })
);

export default Rectangle;
