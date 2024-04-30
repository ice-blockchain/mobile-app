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

const ICON_SIZE = rem(40);

export const NewsIcon = ({focused}: Props) => {
  const dispatch = useDispatch();

  const count = useSelector(NewsSelectors.getUnreadCount);

  useEffect(() => {
    dispatch(NewsActions.UNREAD_NEWS_COUNT_LOAD.START.create());
  }, [dispatch]);

  return (
    <View>
      {focused ? (
        <LampActiveIcon width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <LampInactiveIcon width={ICON_SIZE} height={ICON_SIZE} />
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
});
