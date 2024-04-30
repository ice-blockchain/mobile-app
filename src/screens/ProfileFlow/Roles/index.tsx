// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {FaqButton} from '@navigation/components/Header/components/FaqButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Role} from '@screens/ProfileFlow/Roles/components/Role';
import {userSelector} from '@store/modules/Account/selectors';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const Roles = () => {
  const authUser = useSelector(userSelector);
  const route = useRoute<RouteProp<ProfileTabStackParamList, 'Roles'>>();
  const isOwner = !route.params || route.params.userId === authUser?.id;

  const roles = useSelector(
    AchievementsSelectors.getRolesByUserId({userId: route.params?.userId}),
  );

  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        backgroundColor={COLORS.white}
        renderRightButtons={FaqButton}
        title={isOwner ? t('profile.my_roles.title') : t('profile.roles.title')}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, bottomOffset.current]}>
        {roles.map((role, index) => {
          return (
            <Role
              key={role.type}
              title={t(`roles.${role.type}.title`)}
              tagline={t(`roles.${role.type}.subtitle`)}
              description={t(`roles.${role.type}.description`)}
              imageSource={Images.roles[role.type]}
              backgroundColor={COLORS.white}
              checked={role.enabled}
              containerStyle={index === roles.length - 1 && styles.lastRole}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
    paddingHorizontal: rem(20),
    paddingTop: rem(10),
  },
  lastRole: {
    marginBottom: 0,
  },
});
