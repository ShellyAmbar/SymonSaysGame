import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
const WithLoading = Component => {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <Text>Loading...</Text>;
  };
};
export default WithLoading;
