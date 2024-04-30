// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {useIsEnglishLocale} from '@hooks/useIsEnglishLocale';
import {PeopleIcon} from '@svg/PeopleIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  value: number;
};

export const BadgeProgress = ({value: progressValue}: Props) => {
  const isEnglishLocale = useIsEnglishLocale();
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text
          style={styles.percValueText}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {progressValue}%
        </Text>
        {isEnglishLocale ? (
          <Text
            style={styles.percLabelText}
            numberOfLines={2}
            adjustsFontSizeToFit>
            {t('global.of')}
          </Text>
        ) : null}
        <PeopleIcon />
      </View>
      <View style={styles.progressBody}>
        <View style={[styles.progressValue, {width: `${progressValue}%`}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(85),
    marginRight: rem(14),
    marginTop: rem(4),
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  percValueText: {
    marginRight: rem(6),
    ...font(14, 19, 'bold', 'primaryDark'),
  },
  percLabelText: {
    flex: 1,
    ...font(12, 16, 'medium', 'periwinkleGray', 'right'),
  },
  progressBody: {
    height: rem(8),
    borderRadius: rem(4),
    backgroundColor: COLORS.secondaryFaint,
    alignSelf: 'stretch',
    marginTop: rem(10),
    overflow: 'hidden',
  },
  progressValue: {
    height: rem(8),
    borderRadius: rem(4),
    backgroundColor: COLORS.shamrock,
  },
});
