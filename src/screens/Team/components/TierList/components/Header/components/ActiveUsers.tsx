// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {isAndroid, rem} from 'rn-units';

export const ActiveUsers = () => {
  return (
    <Text style={styles.title}>
      <Text style={styles.label}>
        {replaceString(t('users.friends'), tagRegex('logo'), (match, index) => (
          <IceLabel
            key={match + index}
            iconSize={rem(14)}
            color={COLORS.secondary}
            textStyle={commonStyles.bold}
            iconOffsetY={isAndroid ? 4 : -1}
          />
        ))}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    ...font(14, null, 'regular', 'secondary'),
  },
  title: {
    ...font(14, null, 'regular', 'primaryDark'),
  },
});
