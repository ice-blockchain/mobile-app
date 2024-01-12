// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {SectionHeader} from '@components/SectionHeader';
import {isLightDesign} from '@constants/featureFlags';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {
  styles as teamMemberStyles,
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
        <View
          key={index}
          // ItemSeparatorComponent doesn't work with RTL as expected.
          // So have to use a wrapper with a margin.
          style={styles.separator}
          onLayout={onLayout}>
          {item ? <TeamMember userId={item} /> : <TeamMemberSkeleton />}
        </View>
      );
    },
    [onLayout],
  );

  if (referrals.length < 2 && !hasNext) {
    return <View style={styles.emptyTeamView} />;
  }

  return (
    <>
      <SectionHeader
        title={
          isLightDesign ? t('override.home.team.title') : t('home.team.title')
        }
        action={
          isLightDesign
            ? t('override.home.team.view_team')
            : t('home.team.view_team')
        }
        onActionPress={onViewTeamPress}
      />
      <FlatList
        horizontal
        overScrollMode={'never'}
        ref={flatListRef}
        data={referrals.length ? referrals : Array<null>(6).fill(null)}
        renderItem={renderItem}
        ListFooterComponent={
          loadNextLoading ? (
            <View style={teamMemberStyles.skeleton}>
              <ActivityIndicator style={styles.activityIndicator} />
            </View>
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
    marginEnd: rem(19),
  },
  memberContent: {
    marginTop: rem(18),
    paddingHorizontal: SCREEN_SIDE_OFFSET + rem(4),
    alignItems: 'center', // for activity indicator
    flexGrow: 1,
    flexDirection: isRTL && isAndroid ? 'row-reverse' : 'row',
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyTeamView: {
    paddingTop: rem(12),
  },
});
