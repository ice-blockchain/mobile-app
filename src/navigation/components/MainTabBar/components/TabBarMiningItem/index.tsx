// SPDX-License-Identifier: BUSL-1.1

import {Images} from '@images';
import {MAIN_TAB_BAR_HEIGHT} from '@navigation/components/MainTabBar';
import {MiningAnimation} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningAnimation';
import {MiningTooltip} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningTooltip';
import {useFadeLottie} from '@navigation/components/MainTabBar/components/TabBarMiningItem/hooks/useFadeLottie';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MiningInactiveIcon} from '@svg/TabBar/MiningInactiveIcon';
import LottieView from 'lottie-react-native';
import React, {useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {rem} from 'rn-units';

export const TabBarMiningItem = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [miningActive, setMiningActive] = useState(false);

  const lottieRef = useRef<LottieView>(null);
  const lottieWrapperRef = useRef<View>(null);
  const {animatedOpacity} = useFadeLottie(miningActive, lottieRef);

  const onButtonPress = () => {
    if (miningActive) {
      navigation.navigate('Tooltip', {
        descriptionPosition: 'above',
        targetRef: lottieWrapperRef,
        descriptionOffset: rem(30),
        targetCircleSize: rem(92),
        TargetComponent: () => <MiningAnimation />,
        DescriptionComponent: () => <MiningTooltip />,
      });
    } else {
      setMiningActive(state => !state);
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={Images.tabbar.miningBackground}>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.button}
        activeOpacity={1}
        onPress={onButtonPress}>
        <Animated.View
          style={{opacity: animatedOpacity}}
          ref={lottieWrapperRef}>
          <MiningAnimation />
        </Animated.View>
        <Animated.View
          style={[
            styles.inactiveIcon,
            {
              opacity: animatedOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}>
          <MiningInactiveIcon size={rem(79)} />
        </Animated.View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: MAIN_TAB_BAR_HEIGHT,
    width: rem(112),
  },
  button: {
    position: 'absolute',
    left: rem(7),
    top: rem(-42),
    height: rem(100),
    width: rem(100),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inactiveIcon: {
    position: 'absolute',
    top: rem(11),
    left: rem(11),
  },
});
