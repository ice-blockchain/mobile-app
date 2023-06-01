// SPDX-License-Identifier: ice License 1.0

import {Badge} from '@components/Badge';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {HIT_SLOP} from '@constants/styles';
import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NewsActions} from '@store/modules/News/actions';
import {NewsSelectors} from '@store/modules/News/selectors';
import {LampInactiveIcon} from '@svg/LampInactiveIcon';
import React, {memo, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const NewsButton = memo(() => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList & HomeTabStackParamList>
    >();

  const dispatch = useDispatch();

  const badgeCount = useSelector(NewsSelectors.getUnreadCount);

  useEffect(() => {
    dispatch(NewsActions.UNREAD_NEWS_COUNT_LOAD.START.create());
  }, [dispatch]);

  return (
    <Touchable
      style={styles.container}
      hitSlop={HIT_SLOP}
      onPress={() => {
        navigation.navigate('News');
      }}>
      <LampInactiveIcon color={COLORS.downriver} />
      {badgeCount > 0 && (
        <Badge
          value={badgeCount >= 10 ? '9+' : `${badgeCount}`}
          style={styles.badge}
        />
      )}
    </Touchable>
  );
});

const styles = StyleSheet.create({
  container: {
    marginRight: rem(24),
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -5,
  },
});
