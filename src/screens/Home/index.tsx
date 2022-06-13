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
    inputRange: [0, scrollInterpolationTopPosition],
    outputRange: [rem(145), rem(0)],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader />
      <View style={styles.contentWrapper}>
        <Animated.View
          style={[styles.back, {transform: [{translateY: translation}]}]}
        />
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
    marginTop: rem(54),
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
  contentWrapper: {
    flex: 1,
    marginTop: 29,
  },
  scrollContent: {
    paddingTop: rem(170),
  },
});
