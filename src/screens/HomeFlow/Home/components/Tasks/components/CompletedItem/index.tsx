// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ChevronSmallIcon} from '@svg/ChevronSmallIcon';
import {CompletedTrophyIcon} from '@svg/CompletedTrophyIcon';
import {TaskCompletedSvg} from '@svg/TaskCompleted';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  isExpanded: boolean;
};

const DONE_ICON_SIZE = rem(16);
const TROPHY_ICON_SIZE = rem(36);

export const CompletedItem = ({onPress, isExpanded}: Props) => {
  return (
    <Touchable
      style={[styles.container, commonStyles.shadow]}
      onPress={onPress}>
      <View style={[styles.iconContainer]}>
        <View style={styles.trophyWrapper}>
          <CompletedTrophyIcon />
        </View>

        <View style={styles.completedWrapper}>
          <TaskCompletedSvg
            fill={COLORS.shamrock}
            width={DONE_ICON_SIZE}
            height={DONE_ICON_SIZE}
          />
        </View>
      </View>

      <View style={styles.textsWrapper}>
        <Text style={styles.title}>{t('home.tasks.completed.title')}</Text>

        <Text style={styles.description}>
          {t('home.tasks.completed.description')}
        </Text>
      </View>

      <ChevronSmallIcon
        style={[styles.chevron, isExpanded && styles.rotatedChevron]}
        width={rem(12)}
        height={rem(12)}
        color={COLORS.gunmetalGrey}
      />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    padding: rem(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: rem(60),
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    width: TROPHY_ICON_SIZE,
    height: TROPHY_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyWrapper: {
    width: TROPHY_ICON_SIZE,
    height: TROPHY_ICON_SIZE,
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedWrapper: {
    width: DONE_ICON_SIZE,
    height: DONE_ICON_SIZE,
    position: 'absolute',
    right: -rem(4),
    bottom: -rem(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textsWrapper: {
    marginLeft: rem(11),
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    ...font(14, 19, 'black', 'primaryDark'),
  },
  description: {
    marginTop: rem(4),
    ...font(12, 16, 'medium', 'toreaBay'),
  },
  chevron: {
    marginLeft: rem(8),
  },
  rotatedChevron: {
    transform: [{rotateZ: '180deg'}],
  },
});
