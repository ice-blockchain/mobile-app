// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {AppVersion} from '@screens/SettingsFlow/Settings/components/AppVersion';
import {Avatar} from '@screens/SettingsFlow/Settings/components/Avatar';
import {
  MenuItem,
  MenuItemSeparator,
} from '@screens/SettingsFlow/Settings/components/MenuItem.tsx';
import {SectionCard} from '@screens/SettingsFlow/Settings/components/SectionCard.tsx';
import {SectionTitle} from '@screens/SettingsFlow/Settings/components/SectionTitle';
import {CheckMarkIcon} from '@svg/CheckMarkIcon';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

export const Settings = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();

  return (
    <View style={styles.container}>
      <Header
        color={COLORS.white}
        title={'Settings'}
        titlePreset={'small'}
        renderRightButtons={LangButton}
        containerStyle={shadowStyle}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={bottomOffset.current}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Avatar
            showPen
            uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
            style={[styles.avatar, commonStyles.shadow]}
          />
          <SectionTitle text="PROFILE" />
          <SectionCard>
            <MenuItem
              title="Personal Information"
              description="Change your first and last name"
              renderIcon={CheckMarkIcon}
              onPress={() => {}}
            />
            <MenuItemSeparator />
            <MenuItem
              title="Personal Information"
              description="Change your first and last name"
              renderIcon={CheckMarkIcon}
              onPress={() => {}}
            />
          </SectionCard>
          <SectionTitle text="LEGAL" />
          <SectionCard>
            <MenuItem
              title="Terms of Service"
              description="Terms of use and conditions"
              renderIcon={CheckMarkIcon}
              onPress={() => {}}
            />
            <MenuItemSeparator />
            <MenuItem
              title="Privacy Policy"
              description="Read all about our privacy policy"
              renderIcon={CheckMarkIcon}
              onPress={() => {}}
            />
          </SectionCard>
          <SectionTitle text="SUPPORT" />
          <SectionCard>
            <MenuItem
              title="Send Feedback"
              description="Help us improve our mining app"
              renderIcon={CheckMarkIcon}
              onPress={() => {}}
            />
            <MenuItemSeparator />
            <MenuItem
              title="Invite a Friend"
              description="Earn extra ice by inviting your friends"
              renderIcon={CheckMarkIcon}
              onPress={() => {}}
            />
            <MenuItemSeparator />
            <MenuItem
              title="Delete Account"
              description="Erase your ice account"
              renderIcon={CheckMarkIcon}
              onPress={() => {}}
            />
            <MenuItemSeparator />
            <MenuItem
              title="Log Out"
              description="Are you sure you want to sign off?"
              renderIcon={CheckMarkIcon}
              onPress={() => {}}
            />
          </SectionCard>
          <AppVersion />
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
    marginTop: rem(80),
    paddingTop: rem(12),
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
    // make bottom overscroll area white, otherwise it'd be of container color
    paddingBottom: 2000,
    marginBottom: -2000,
  },
  avatar: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
  },
});
