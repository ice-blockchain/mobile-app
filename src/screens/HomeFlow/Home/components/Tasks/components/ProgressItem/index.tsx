// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useIsEnglishLocale} from '@hooks/useIsEnglishLocale';
import {ITEM_LEFT_POSITION} from '@screens/HomeFlow/Home/components/Tasks/components/TaskItem';
import {ProgressCircleSvg} from '@svg/ProgressCircle';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  total: number;
  completed: number;
};

const CIRCLE_SIZE = rem(48);
const PROGRESS_WIDTH = rem(4);

export const ProgressItem = ({total, completed}: Props) => {
  const progressInPercent = (completed / total) * 100;
  const isEnglishLocale = useIsEnglishLocale();
  return (
    <View style={styles.header}>
      <View style={[styles.amountWrapper, commonStyles.shadow]}>
        <Text style={styles.amountText}>{completed}</Text>
        <Text style={styles.amountTextSmall}>
          {isEnglishLocale ? t('global.of') : '/'}
        </Text>
        <Text style={styles.amountText}>{total}</Text>
        <ProgressCircleSvg
          progress={progressInPercent}
          strokeWidth={PROGRESS_WIDTH}
          color={COLORS.shamrock}
          radius={CIRCLE_SIZE / 2 - PROGRESS_WIDTH / 2}
          style={styles.progress}
        />
      </View>
      <View style={commonStyles.flexOne}>
        <Text style={styles.title}>{t('home.tasks.title')}</Text>
        <Text style={styles.description}>{t('home.tasks.description')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  amountWrapper: {
    marginLeft: ITEM_LEFT_POSITION - CIRCLE_SIZE / 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: COLORS.white,
    borderWidth: PROGRESS_WIDTH,
    borderColor: COLORS.gallery,
    marginRight: rem(12),
    flexDirection: 'row',
  },
  amountText: {
    ...font(12, 15, 'bold', 'primaryDark'),
  },
  amountTextSmall: {
    marginHorizontal: rem(2),
    ...font(12, 15, 'regular', 'primaryDark'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rem(10),
  },
  title: {
    ...font(14, 19, 'black', 'primaryDark'),
  },
  description: {
    marginTop: rem(4),
    ...font(12, 16, 'medium', 'toreaBay'),
  },
  progress: {
    position: 'absolute',
  },
});
