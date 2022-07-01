// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Badges} from '@screens/ProfileFlow/Profile/components/Badges';
import {HeaderRightButtons} from '@screens/ProfileFlow/Profile/components/HeaderRightButtons';
import {Invite} from '@screens/ProfileFlow/Profile/components/Invite';
import {MiningCalculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator';
import {Role} from '@screens/ProfileFlow/Profile/components/Role';
import {UserInfo} from '@screens/ProfileFlow/Profile/components/UserInfo';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

export const Profile = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.white}
        renderRightButtons={HeaderRightButtons}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={bottomOffset.current}
        showsVerticalScrollIndicator={false}>
        <UserInfo />
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <Badges />
          <Role />
          <Invite />
          <MiningCalculator />
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    marginTop: rem(16),
    // make bottom overscroll area white, otherwise it'd be of container color
    paddingBottom: 2000,
    marginBottom: -2000,
  },
});
