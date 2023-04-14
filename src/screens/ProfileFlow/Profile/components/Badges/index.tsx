// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {SectionHeader} from '@components/SectionHeader';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BadgeSummariesList} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeSummariesList';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  user: User;
  isOwner: boolean;
};

export const Badges = memo(({user, isOwner}: Props) => {
  const badgesSummary = useSelector(
    AchievementsSelectors.getBadgesSummary({userId: user?.id}),
  );

  const isLoading = useSelector(
    isLoadingSelector.bind(null, AchievementsActions.USER_ACHIEVEMENTS_LOAD),
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const onViewAllPress = useCallback(
    () => navigation.navigate('Badges', {userId: user?.id}),
    [navigation, user],
  );

  const title = isOwner
    ? t('profile.my_badges.title')
    : t('profile.badges.title');

  let action: String | undefined = t('button.view_all');
  if (!isOwner && user?.hiddenProfileElements?.includes('badges')) {
    action = undefined;
  }

  return (
    <>
      <SectionHeader
        title={title.toUpperCase()}
        action={action}
        onActionPress={onViewAllPress}
        style={styles.header}
      />
      <BadgeSummariesList
        loading={isLoading && badgesSummary.length === 0}
        user={user}
        data={badgesSummary}
        isOwner={isOwner}
      />
    </>
  );
});

const styles = StyleSheet.create({
  header: {
    paddingTop: rem(5),
    height: rem(24),
  },
});
