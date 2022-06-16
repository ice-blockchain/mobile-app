// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {HomeContent} from '@screens/Home/components/Content';
import React, {useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

import HomeHeader from './components/Header';
import {
  collapsedCardHeight,
  HomeCards,
  scrollInterpolationTopPosition,
} from './components/HomeCards';

export const Home = () => {
  const scrolling = useRef(new Animated.Value(0)).current;
  const shadowOpacity = scrolling.interpolate({
    inputRange: [
      scrollInterpolationTopPosition,
      scrollInterpolationTopPosition + 10,
    ],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader />
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <View style={styles.safeAreaShadowContainer}>
            <Animated.View
              style={[styles.safeAreaShadow, {opacity: shadowOpacity}]}
            />
          </View>
          <Animated.ScrollView
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
            <View style={styles.scrollContent}>
              <HomeContent />
            </View>
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
    backgroundColor: COLORS.persianBlue,
  },
  content: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 1,
    marginTop: collapsedCardHeight / 2,
    overflow: 'hidden',
  },
  contentWrapper: {
    flex: 1,
    marginTop: 29,
  },
  safeAreaShadowContainer: {
    paddingBottom: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  safeAreaShadow: {
    height: collapsedCardHeight / 2 + 6,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 3,
  },
  scrollContent: {
    marginTop: rem(180),
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: rem(20),
    paddingBottom: rem(80),
  },
});
