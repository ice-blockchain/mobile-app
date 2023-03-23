// SPDX-License-Identifier: ice License 1.0

import {Badge} from '@components/Badge';
import {NewsActions} from '@store/modules/News/actions';
import {NewsSelectors} from '@store/modules/News/selectors';
import {LampActiveIcon} from '@svg/LampActiveIcon';
import {LampInactiveIcon} from '@svg/LampInactiveIcon';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

export const NewsIcon = ({focused}: Props) => {
  const dispatch = useDispatch();

  const count = useSelector(NewsSelectors.getUnreadCount);

  useEffect(() => {
    dispatch(NewsActions.UNREAD_NEWS_COUNT_LOAD.START.create());
  }, [dispatch]);

  return (
    <View style={styles.icon}>
      {focused ? (
        <LampActiveIcon width={rem(40)} height={rem(40)} />
      ) : (
        <LampInactiveIcon width={rem(40)} height={rem(40)} />
      )}

      {count > 0 ? <Badge style={styles.badge} value={count} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  icon: {marginRight: rem(26)},
});
