// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {SectionHeader} from '@components/SectionHeader';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {
  TeamMember,
  TeamMemberSkeleton,
} from '@screens/HomeFlow/Home/components/Team/components/TeamMember';
import {useRtlOnLayoutReady} from '@screens/HomeFlow/Home/components/Team/hooks/useRtlOnLayoutReady';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {isRTL, t} from '@translations/i18n';
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {isAndroid, rem} from 'rn-units';

export const Team = memo(() => {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();

  const {
    fetch,
    data: referrals,
    loadNext,
    hasNext,
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
    fetch({isInitial: true});
  }, [fetch]);

  const onViewTeamPress = useCallback(
    () => navigation.navigate('TeamTab'),
    [navigation],
  );

  const {onLayout, flatListRef} = useRtlOnLayoutReady();
  const renderItem: ListRenderItem<string | null> = useCallback(
    ({item, index}) => {
      return (
        <View key={index} style={styles.separator} onLayout={onLayout}>
          {item ? <TeamMember userId={item} /> : <TeamMemberSkeleton />}
        </View>
      );
    },
    [onLayout],
  );

  if (referrals.length < 2 && !hasNext) {
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
        ref={flatListRef}
        data={referrals.length ? referrals : Array<null>(6).fill(null)}
        renderItem={renderItem}
        ListFooterComponent={
          loadNextLoading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : null
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.memberContent}
        onEndReached={loadNext}
        inverted={isRTL && isAndroid}
      />
    </>
  );
});

const styles = StyleSheet.create({
  separator: {
    marginEnd: isRTL ? rem(19) : 0,
    marginStart: !isRTL ? rem(19) : 0,
  },
  memberContent: {
    marginTop: rem(18),
    paddingHorizontal: SCREEN_SIDE_OFFSET + rem(4),
    alignItems: 'center', // for activity indicator
    flexGrow: 1,
    flexDirection: isRTL && isAndroid ? 'row-reverse' : 'row',
  },
  activityIndicator: {
    marginLeft: rem(10),
  },
});
