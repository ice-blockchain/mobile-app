// SPDX-License-Identifier: ice License 1.0

import {UserAvatarHeader} from '@components/UserAvatarHeader';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {useUpdateAvatar} from '@hooks/useUpdateAvatar';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {AppVersion} from '@screens/SettingsFlow/Settings/components/AppVersion';
import {DeveloperMenuSection} from '@screens/SettingsFlow/Settings/components/SettingsMenuSections/DeveloperMenuSection';
import {LegalMenuSection} from '@screens/SettingsFlow/Settings/components/SettingsMenuSections/LegalMenuSection';
import {ProfileMenuSection} from '@screens/SettingsFlow/Settings/components/SettingsMenuSections/ProfileMenuSection';
import {SupportMenuSection} from '@screens/SettingsFlow/Settings/components/SettingsMenuSections/SupportMenuSection';
import {isAdminSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';

export const Settings = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const isAdmin = useSelector(isAdminSelector);
  const {updateAvatar, updateAvatarLoading} = useUpdateAvatar();

  return (
    <View style={styles.container}>
      <Header
        title={t('settings.title')}
        renderRightButtons={LangButton}
        containerStyle={shadowStyle}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={bottomOffset.current}
        showsVerticalScrollIndicator={false}>
        <UserAvatarHeader
          onChange={updateAvatar}
          updateAvatarLoading={updateAvatarLoading}
        />
        <View style={commonStyles.baseSubScreen}>
          <ProfileMenuSection />
          <LegalMenuSection />
          <SupportMenuSection />
          {isAdmin && <DeveloperMenuSection />}
          <AppVersion />
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
