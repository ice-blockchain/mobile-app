// SPDX-License-Identifier: ice License 1.0

import {ActionListItem} from '@components/ListItems/ActionListItem';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ChevronSmallIcon} from '@svg/ChevronSmallIcon';
import {CompletedTrophyIcon} from '@svg/CompletedTrophyIcon';
import {TaskCompletedSvg} from '@svg/TaskCompleted';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  isExpanded: boolean;
};

const DONE_ICON_SIZE = rem(16);

export const CompletedItem = ({onPress, isExpanded}: Props) => {
  return (
    <ActionListItem
      onPress={onPress}
      containerStyle={[styles.container, commonStyles.shadow]}
      LeadingIcon={
        <>
          <CompletedTrophyIcon />
          <View style={styles.completedWrapper}>
            <TaskCompletedSvg
              fill={COLORS.shamrock}
              width={DONE_ICON_SIZE}
              height={DONE_ICON_SIZE}
            />
          </View>
        </>
      }
      title={t('home.tasks.completed.title')}
      subtitle={t('home.tasks.completed.description')}
      TrailingIcon={
        <ChevronSmallIcon
          style={[styles.chevron, isExpanded && styles.rotatedChevron]}
          width={rem(12)}
          height={rem(12)}
          color={COLORS.primaryDark}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
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
  chevron: {
    marginLeft: rem(8),
  },
  rotatedChevron: {
    transform: [{rotateZ: '180deg'}],
  },
});
