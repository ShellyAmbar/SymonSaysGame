import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
import Styles from './with-loading.styles';
const WithLoading = Component => {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <View style={Styles.container}>
        <ActivityIndicator
          size={'large'}
          color={GlobalColors.TextColors.white}
        />
      </View>
    );
  };
};
export default WithLoading;
