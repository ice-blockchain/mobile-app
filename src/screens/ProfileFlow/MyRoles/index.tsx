// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {FaqButton} from '@navigation/components/Header/components/FaqButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Role} from '@screens/ProfileFlow/MyRoles/components/Role';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

export const MyRoles = () => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.darkBlue}
        backgroundColor={COLORS.white}
        renderRightButtons={FaqButton}
        title={t('my_roles.title')}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, bottomOffset.current]}>
        <Role
          title="Pioneer"
          tagline="Are you flesh and blood?"
          description="Earn by checking in every 24 hours to show your commitment to the ice network and prove that you're a human, not a bot."
          imageSource={Images.roles.pioneer}
          backgroundColor={COLORS.white}
          checked={true}
        />
        <Role
          title="Ambassador"
          tagline="Invite friends to join your team."
          description="You become an ambassador when at least 100 people joined your team. Every ambassador will get early access to new features."
          imageSource={Images.roles.ambassador}
          checked={true}
        />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    backgroundColor: COLORS.alabaster,
    flexGrow: 1,
  },
});
