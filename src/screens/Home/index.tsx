// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {HomeContent} from '@screens/Home/components/Content';
import {throttle} from 'lodash';
import React, {useRef} from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

import HomeHeader from './components/Header';
import {HomeCards} from './components/HomeCards';

export const Home = () => {
  const scrolling = useRef(new Animated.Value(0)).current;
  const animation = useRef(new Animated.Value(1)).current;
  const animationPosition = useRef<1 | 0>(1);
  const translation = scrolling.interpolate({
    inputRange: [0, 230],
    outputRange: [rem(145), rem(0)],
    extrapolate: 'clamp',
  });

  const hideShowCards = throttle((yOffset: number) => {
    if (yOffset > 80 && animationPosition.current === 1) {
      animationPosition.current = 0;
      Animated.timing(animation, {
        toValue: 0,
        useNativeDriver: false,
        duration: 400,
      }).start();
    }
    if (yOffset < 80 && animationPosition.current === 0) {
      animationPosition.current = 1;
      Animated.timing(animation, {
        toValue: 1,
        useNativeDriver: false,
        duration: 400,
      }).start();
    }
  }, 100);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    hideShowCards(e.nativeEvent.contentOffset.y);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader />
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <Animated.View
            style={[styles.back, {transform: [{translateY: translation}]}]}
          />
          <Animated.ScrollView
            contentContainerStyle={styles.scrollContent}
            scrollEventThrottle={2}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrolling,
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
                listener: handleScroll,
              },
            )}>
            <HomeContent />
          </Animated.ScrollView>
        </View>
        <HomeCards scrolling={animation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B47C3',
  },
  content: {
    flex: 1,
    marginTop: rem(19),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  back: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  contentWrapper: {
    flex: 1,
    marginTop: 29,
  },
  scrollContent: {
    paddingTop: rem(205),
  },
});
