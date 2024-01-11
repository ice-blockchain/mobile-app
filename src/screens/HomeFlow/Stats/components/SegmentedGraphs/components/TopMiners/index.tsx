// SPDX-License-Identifier: ice License 1.0

import {Miner} from '@api/statistics/types';
import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {UserListItemCompact} from '@components/ListItems/UserListItemCompact';
import {SectionHeader} from '@components/SectionHeader';
import {Touchable} from '@components/Touchable';
import {isLightDesign} from '@constants/featureFlags';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CollectionActions} from '@store/modules/Collections';
import {collectionSelector} from '@store/modules/Collections/selectors';
import {t} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
import {uniqueId} from 'lodash';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const MINERS_COUNT = 5;

const SKELETONS = Array(MINERS_COUNT)
  .fill(null)
  .map((_, index) => <ListItemSkeleton key={index} />);

export const TopMiners = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const onSeeAllPress = useCallback(() => {
    navigation.navigate('TopMiners');
  }, [navigation]);

  const {data, fetch, hasNext} = useFetchCollection({
    selector: collectionSelector('topMiners'),
    action: CollectionActions.GET_TOP_MINERS,
    options: {pageSize: MINERS_COUNT},
  });

  const [displayData, setDisplayData] = useState<Miner[]>([]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setDisplayData(data);
    });
    return () => cancelAnimationFrame(handle);
  }, [data]);

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      fetch({isInitial: true});
    });
    return () => interactionPromise.cancel();
  }, [fetch]);

  return (
    <View style={styles.container}>
      <SectionHeader
        title={t('stats.top_miners')}
        action={t('button.see_all')}
        onActionPress={onSeeAllPress}
        style={styles.header}
      />
      <View style={styles.list}>
        {hasNext && !displayData.length
          ? SKELETONS
          : displayData.map(user => (
              <Touchable
                key={user.userId ?? uniqueId()}
                onPress={() => {
                  if (user.userId && !isLightDesign) {
                    navigation.navigate('UserProfile', {userId: user.userId!});
                  }
                }}>
                <UserListItemCompact
                  profilePictureUrl={user.profilePictureUrl}
                  name={user.username}
                  iceAmount={formatNumberString(user.balance)}
                />
              </Touchable>
            ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(14),
  },
  list: {
    marginTop: rem(4),
  },
  header: {
    marginHorizontal: 0,
  },
});
