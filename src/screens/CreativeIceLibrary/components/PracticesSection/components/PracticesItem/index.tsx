// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {isRTL} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export type RuleData = {
  title: string;
  description: string;
};

export type PracticesItemData = {
  image: ImageRequireSource;
  title: string;
  icon: React.ReactElement;
  color: string;
  rules: RuleData[];
};

type Props = {
  data: PracticesItemData;
};

export function PracticesItem({data}: Props) {
  const renderPracticeRule = (rule: RuleData) => {
    return (
      <View key={rule.title}>
        <View style={styles.ruleTitleContainer}>
          {data.icon}
          <Text style={styles.ruleTitle}>{rule.title}</Text>
        </View>
        <Text style={styles.ruleDescription}>{rule.description}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Image source={data.image} style={styles.image} />
      <View style={styles.rulesContainer}>
        <Text style={[styles.title, {color: data.color}]}>{data.title}</Text>
        {data.rules.map(renderPracticeRule)}
      </View>
    </View>
  );
}

const BORDER_RADIUS = rem(16);

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
    marginBottom: rem(16),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  image: {
    borderTopRightRadius: BORDER_RADIUS,
    borderTopLeftRadius: BORDER_RADIUS,
  },
  rulesContainer: {
    padding: rem(16),
  },
  ruleTitleContainer: {
    marginTop: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingTop: rem(16),
    ...font(20, 24, 'semibold', 'primaryDark'),
  },
  ruleTitle: {
    paddingLeft: isRTL ? 0 : rem(8),
    paddingRight: !isRTL ? 0 : rem(8),
    ...font(14, 18, 'bold', 'primaryDark'),
  },
  ruleDescription: {
    paddingTop: rem(12),
    ...font(14, 18, 'regular', 'emperor'),
  },
});
