// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {SectionHeader} from '@components/SectionHeader';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {TeamMember} from '@screens/HomeFlow/Home/components/Team/components/TeamMember';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

export const Team = memo(() => {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();

  const {
    fetch,
    data: referrals,
    loadNext,
    loadNextLoading,
  } = useFetchCollection(
    useMemo(
      () => ({
        selector: referralsSelector({referralType: 'T1'}),
        action: ReferralsActions.GET_REFERRALS({referralType: 'T1'})('T1'),
      }),
      [],
    ),
  );

  useEffect(() => {
    fetch({offset: 0});
  }, [fetch]);

  const onViewTeamPress = useCallback(
    () => navigation.navigate('TeamTab'),
    [navigation],
  );

  const renderItem: ListRenderItem<typeof referrals[0]> = useCallback(
    ({item}) => {
      return <TeamMember userId={item} />;
    },
    [],
  );

  if (!referrals.length || referrals.length < 2) {
    return null;
  }

  return (
    <>
      <SectionHeader
        title={t('home.team.title')}
        action={t('home.team.view_team')}
        onActionPress={onViewTeamPress}
      />
      <FlatList
        horizontal
        data={referrals}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={
          loadNextLoading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : null
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.memberContent}
        onEndReached={loadNext}
      />
    </>
  );
});

const renderSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    width: rem(19),
  },
  memberContent: {
    marginTop: rem(18),
    paddingHorizontal: SCREEN_SIDE_OFFSET + rem(4),
    alignItems: 'center', // for activity indicator
  },
  activityIndicator: {
    marginLeft: rem(10),
  },
});
