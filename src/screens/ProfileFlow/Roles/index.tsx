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
          title="Snowman"
          tagline="Are you flesh and blood?"
          description="Earn by checking in every 24 hours to show your commitment to the ice network and prove that you're a human, not a bot."
          imageSource={Images.roles.snowman}
          backgroundColor={COLORS.white}
          checked={true}
        />
        <Role
          title="Ambassador"
          tagline="Invite friends to join your team."
          description="You become an ambassador when at least 100 people joined your team. Every ambassador will get early access to new features."
          imageSource={Images.roles.ambassador}
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
});
