// SPDX-License-Identifier: ice License 1.0

import {Badge} from '@components/Badge';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {NewsActions} from '@store/modules/News/actions';
import {NewsSelectors} from '@store/modules/News/selectors';
import {LampActiveIcon} from '@svg/LampActiveIcon';
import {LampInactiveIcon} from '@svg/LampInactiveIcon';
import {StatsIcon} from '@svg/StatsIcon';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

const ICON_SIZE = rem(40);
const STATS_ICON_SIZE = rem(27);

export const NewsIcon = ({focused}: Props) => {
  const dispatch = useDispatch();

  const count = useSelector(NewsSelectors.getUnreadCount);

  useEffect(() => {
    dispatch(NewsActions.UNREAD_NEWS_COUNT_LOAD.START.create());
  }, [dispatch]);

  if (isLightDesign) {
    return focused ? (
      <StatsIcon
        color={COLORS.primaryLight}
        width={STATS_ICON_SIZE}
        height={STATS_ICON_SIZE}
      />
    ) : (
      <StatsIcon
        color={COLORS.secondary}
        width={STATS_ICON_SIZE}
        height={STATS_ICON_SIZE}
      />
    );
  }

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
