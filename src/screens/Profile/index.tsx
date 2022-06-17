// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Badges} from '@screens/Profile/components/Badges';
import {HeaderRightButtons} from '@screens/Profile/components/HeaderRightButtons';
import {InviteButton} from '@screens/Profile/components/InviteButton';
import {InviteNote} from '@screens/Profile/components/InviteNote';
import {MiningCalculator} from '@screens/Profile/components/MiningCalculator';
import {Role} from '@screens/Profile/components/Role';
import {SectionHeader} from '@screens/Profile/components/SectionHeader';
import {UserInfo} from '@screens/Profile/components/UserInfo';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

export const Profile = () => {
  useFocusStatusBar({style: 'light-content', backgorund: COLORS.persianBlue});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, animatedStyle} = useScrollShadow();

  return (
    <View style={styles.container}>
      <Header
        containerStyle={animatedStyle}
        color={COLORS.white}
        renderRightButtons={HeaderRightButtons}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={bottomOffset.current}
        showsVerticalScrollIndicator={false}>
        <UserInfo />
        <View style={styles.card}>
          <SectionHeader
            title="MY BADGES"
            showViewAll={true}
            onViewAllPress={() => {}}
          />
          <Badges />
          <SectionHeader title="MY ROLE" showViewAll={false} />
          <Role />
          <InviteButton />
          <InviteNote />
          <SectionHeader title="MINING CALCULATOR" showViewAll={false} />
          <MiningCalculator />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    marginTop: rem(16),
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
    // make bottom overscroll area white, otherwise it'd be of container color
    paddingBottom: 2000,
    marginBottom: -2000,
  },
});
