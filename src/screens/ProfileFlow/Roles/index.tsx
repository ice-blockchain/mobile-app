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
        <Role
          title={t('roles.snowman.title')}
          tagline={t('roles.snowman.subtitle')}
          description={t('roles.snowman.description')}
          imageSource={Images.roles.snowman}
          backgroundColor={COLORS.white}
          checked={true}
        />
        <Role
          title={t('roles.ambassador.title')}
          tagline={t('roles.ambassador.subtitle')}
          description={t('roles.ambassador.description')}
          imageSource={Images.roles.ambassador}
          containerStyle={styles.lastRole}
        />
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
