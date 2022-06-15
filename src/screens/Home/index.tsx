// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {HomeContent} from '@screens/Home/components/Content';
import React, {useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

import HomeHeader from './components/Header';
import {
  HomeCards,
  scrollInterpolationTopPosition,
} from './components/HomeCards';

export const Home = () => {
  const scrolling = useRef(new Animated.Value(0)).current;
  const translation = scrolling.interpolate({
    inputRange: [0, rem(145)],
    outputRange: [rem(145), rem(0)],
    extrapolate: 'clamp',
  });

  const shadowIOS = scrolling.interpolate({
    inputRange: [
      scrollInterpolationTopPosition - 30,
      scrollInterpolationTopPosition,
    ],
    outputRange: [0, 0.4],
    extrapolate: 'clamp',
  });

  const shadowAndroid = scrolling.interpolate({
    inputRange: [
      scrollInterpolationTopPosition - 30,
      scrollInterpolationTopPosition,
    ],
    outputRange: [0, 3],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader />
      <View style={styles.contentWrapper}>
        <Animated.View
          style={[styles.back, {transform: [{translateY: translation}]}]}>
          <Animated.View
            style={[
              styles.whiteSpaceShadow,
              {
                shadowOpacity: shadowIOS,
                elevation: shadowAndroid,
              },
            ]}
          />
        </Animated.View>
        <View style={styles.content}>
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
                useNativeDriver: false,
              },
            )}>
            <HomeContent />
          </Animated.ScrollView>
        </View>
        <HomeCards scrolling={scrolling} />
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
    marginTop: rem(44),
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
    top: rem(37 / 2),
  },
  whiteSpaceShadow: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: rem(37 / 2 + 44 - 37),
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
  },
  contentWrapper: {
    flex: 1,
    marginTop: 29,
  },
  scrollContent: {
    paddingTop: rem(180),
    paddingBottom: rem(60),
  },
});
