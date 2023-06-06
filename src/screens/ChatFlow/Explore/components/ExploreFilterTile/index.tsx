// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ExploreFilterType} from '@screens/ChatFlow/Explore/types';
import {ChannelIcon} from '@svg/ChannelIcon';
import {InfiniteIcon} from '@svg/InfiniteIcon';
import {TeamActiveIcon} from '@svg/TeamActiveIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  filterType: ExploreFilterType;
  selected: boolean;
};

function getFilterTypeIcon(filterType: ExploreFilterType) {
  switch (filterType) {
    case 'all':
      return (
        <InfiniteIcon width={rem(24)} height={rem(24)} color={COLORS.white} />
      );
    case 'channels':
      return (
        <ChannelIcon color={COLORS.white} width={rem(22)} height={rem(22)} />
      );
    case 'groups':
      return (
        <TeamActiveIcon color={COLORS.white} width={rem(28)} height={rem(28)} />
      );
    default:
      return null;
  }
}

function getFilterTypeIconStyle(filterType: ExploreFilterType) {
  switch (filterType) {
    case 'all':
      return styles.allBackground;
    case 'channels':
      return styles.channelsBackground;
    case 'groups':
      return styles.groupsBackground;
    default:
      return null;
  }
}

function getFilterTypeTitle(filterType: ExploreFilterType) {
  switch (filterType) {
    case 'all':
      return t('chat.explore.filter.all');
    case 'channels':
      return t('chat.explore.filter.channels');
    case 'groups':
      return t('chat.explore.filter.groups');
    default:
      return '';
  }
}

export function ExploreFilterTile({onPress, filterType, selected}: Props) {
  return (
    <Pressable
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}>
      <View style={[styles.iconContainer, getFilterTypeIconStyle(filterType)]}>
        {getFilterTypeIcon(filterType)}
      </View>
      <Text style={styles.title}>{getFilterTypeTitle(filterType)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondaryFaint05opacity,
    borderRadius: rem(16),
    paddingLeft: rem(4),
    paddingRight: rem(16),
    flexDirection: 'row',
    marginRight: rem(10),
    height: rem(48),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondaryFaint05opacity,
  },
  selectedContainer: {
    borderColor: COLORS.primaryLight,
  },
  iconContainer: {
    width: rem(40),
    height: rem(40),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingLeft: rem(10),
    ...font(15, 17, 'semibold', 'codeFieldText'),
  },
  allBackground: {
    backgroundColor: COLORS.dodgerBlue,
  },
  channelsBackground: {
    backgroundColor: COLORS.vibrantTangerine,
  },
  groupsBackground: {
    backgroundColor: COLORS.royalBlue,
  },
});
