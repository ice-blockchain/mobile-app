// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar';
import {COLORS} from '@constants/colors';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ListControlAction} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlAction';
import {ListControlSeparator} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import {ListControlCountry} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlCountry';
import {ListControlInput} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlInput';
import {SectionCard} from '@screens/SettingsFlow/PersonalInformation/components/SectionCard.tsx';
import React, {memo} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

export const PersonalInformation = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Header
        color={COLORS.white}
        title={'Personal Information'}
        titlePreset={'small'}
        renderRightButtons={LangButton}
        containerStyle={shadowStyle}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[bottomOffset.current, styles.scrollContent]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Avatar
            showPen
            uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
            style={styles.avatar}
          />
          <SectionCard>
            <ListControlInput
              label="First name"
              textContentType="name"
              defaultValue="Johnny Alexander"
            />
            <ListControlSeparator />
            <ListControlInput
              label="Last name"
              textContentType="familyName"
              defaultValue="Smithsonian"
            />
            <ListControlSeparator />
            <ListControlAction
              label="Phone"
              action="CHANGE"
              value={'+1 0712 345 678'}
              onPress={() => {}}
            />
            <ListControlSeparator />
            <ListControlCountry label="Country" />
            <ListControlSeparator />
            <ListControlInput
              label="City"
              textContentType="addressCity"
              defaultValue="Beverly Hills"
            />
          </SectionCard>
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  scrollContent: {
    flexGrow: 1,
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
