import { View, FlatList, Text } from 'react-native';
import React from 'react';
import Styles from './game-screen.styles';

import Button from './button/button';
import LottieView from 'lottie-react-native';

import UserScoresModal from '../../modals/user-scores-modal/user-scores-modal';

import useGameScreen from './hooks/useGameScreen';
import CircularTimer from 'react-native-animated-circular-counter';
import { GlobalColors } from '../../assets/styles/colors';
const GameScreen = () => {
  const {
    calculateItemHeight,
    onButtonPressed,
    isModalScoresVisible,
    setIsModalScoresVisible,
    isButtnosEnabled,
    buttons,
    isfinishLevel,
    animationRef,
    setLayoutWidth,
    currentLevel,
    playLevelSequence,
    randomSequence,
    showCountDown,
    onFailure,
  } = useGameScreen();
  const itemSeperator = () => <View style={{ height: 20 }} />;

  return (
    <View style={Styles.container}>
      {showCountDown && (
        <CircularTimer
          duration={(currentLevel + 1) * 2}
          height={60}
          width={60}
          onFinish={() => {
            onFailure();
          }}
          progressColor={GlobalColors.Brand.primary}
          circleColor="white"
          isCountDown={true}
          animateFillProgress={true}
          intervalDuration={1000}
          strokeWidth={3}
        />
      )}
      <FlatList
        onLayout={e => {
          setLayoutWidth(e.nativeEvent.layout.width);
        }}
        numColumns={2}
        ItemSeparatorComponent={itemSeperator}
        contentContainerStyle={Styles.content}
        style={Styles.buttonsContainer}
        data={buttons}
        renderItem={({ item, index }) => (
          <Button
            disabled={!isButtnosEnabled}
            key={item.id}
            button={item}
            onButtonPressed={button => {
              if (isButtnosEnabled) {
                onButtonPressed(button);
              }
            }}
            ref={item.ref}
            style={{
              height: calculateItemHeight,
            }}
          />
        )}
      />

      {isfinishLevel && (
        <View style={Styles.lottie}>
          <LottieView
            source={require('../../assets/lotties/confettie.json')}
            autoPlay
            loop
            ref={animationRef}
          />
          <Text style={Styles.nextLevelText}>
            {` Level ${currentLevel + 1}`}
          </Text>
        </View>
      )}

      {isModalScoresVisible && (
        <UserScoresModal
          isModalVisible={isModalScoresVisible}
          onBackdropPress={() => {
            setIsModalScoresVisible(false);
            playLevelSequence(randomSequence);
          }}
          onClickClose={() => {
            setIsModalScoresVisible(false);
            playLevelSequence(randomSequence);
          }}
        />
      )}
    </View>
  );
};

export default GameScreen;
