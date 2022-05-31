// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {HomeContent} from '@screens/Home/components/Content';
import React, {useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

import HomeHeader from './components/Header';
import {HomeTiles} from './components/HomeCards';

export const Home = () => {
  const scrolling = useRef(new Animated.Value(0)).current;
  const translation = scrolling.interpolate({
    inputRange: [0, 230],
    outputRange: [rem(253), rem(137)], // to 137
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader />
      <Animated.View
        style={[styles.back, {transform: [{translateY: translation}]}]}
      />
      <View style={{flex: 1}}>
        <Animated.ScrollView
          scrollEventThrottle={32}
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
            {useNativeDriver: false},
          )}>
          <View style={{height: rem(224)}} />
          <HomeContent />
        </Animated.ScrollView>

        <HomeTiles scrolling={scrolling} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B47C3',
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
});
