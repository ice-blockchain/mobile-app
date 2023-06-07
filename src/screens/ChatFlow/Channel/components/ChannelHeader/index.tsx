// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {HIT_SLOP, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import {useNavigation} from '@react-navigation/native';
import {ExploreRow} from '@screens/ChatFlow/Explore/components/ExploreRow';
import {ExploreData} from '@store/modules/Chats/types';
import {CandyBoxMenuIcon} from '@svg/CandyBoxMenuIcon';
import {ChevronIcon} from '@svg/ChevronIcon';
import {mirrorTransform} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  channelData: ExploreData;
};

export const CHANNEL_HEADER_HEIGHT = rem(36) + rem(14) * 2;

export function ChannelHeader({channelData}: Props) {
  const topOffset = useTopOffsetStyle();
  const navigation = useNavigation();
  return (
    <View style={topOffset.current}>
      <View style={styles.container}>
        <Touchable
          hitSlop={HIT_SLOP}
          style={styles.chevronIconContainer}
          onPress={navigation.goBack}>
          <ChevronIcon color={COLORS.primaryDark} style={styles.chevronIcon} />
        </Touchable>
        <ExploreRow headerMode exploreData={channelData} />
        <Touchable hitSlop={HIT_SLOP} style={styles.menuIconContainer}>
          <CandyBoxMenuIcon stroke={COLORS.primaryDark} />
        </Touchable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    height: CHANNEL_HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  chevronIconContainer: {
    paddingRight: rem(34),
    height: '100%',
    justifyContent: 'center',
  },
  chevronIcon: {
    ...mirrorTransform(true),
  },
  menuIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
