// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {StatsGraphUserSvg} from '@svg/StatsGraphUser';
import {t} from '@translations/i18n';
import {round} from 'lodash';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

interface StatsGraphProps {}

const graphData = [
  {
    amount: 432111,
    date: '24/03',
  },
  {
    amount: 502000,
    date: '25/03',
  },
  {
    amount: 607000,
    date: '26/03',
  },
  {
    amount: 712000,
    date: '27/03',
  },
  {
    amount: 819000,
    date: '28/03',
  },
  {
    amount: 924000,
    date: '29/03',
  },
  {
    amount: 1030000,
    date: '30/03',
  },
];

const getAmount = (v: number) => {
  if (v < 1000) {
    return `${v}`;
  }
  if (v < 10000) {
    return `${round(v / 1000, 2)}K`;
  }
  if (v < 100000) {
    return `${round(v / 1000, 1)}K`;
  }
  if (v < 1000000) {
    return `${round(v / 1000)}K`;
  }
  return `${round(v / 1000000, 2)}M`;
};

const graphColors = [
  '#2927AF',
  '#1D1AA3',
  '#1D1B92',
  '#181683',
  '#1D1B78',
  '#12106D',
  '#080754',
];

const getGraphColor = (i: number) => {
  return graphColors[i] ?? graphColors[graphColors.length - 1];
};

const maxValue = Math.max(...graphData.map(v => v.amount));
const maxHeight = rem(260);

export const StatsGraph = ({}: StatsGraphProps) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('stats.user_growth')}</Text>
        <Text style={styles.period}>24 Mar - 31 Mar</Text>
      </View>

      <View style={styles.graph}>
        {graphData.map((v, i) => (
          <View key={v.date} style={styles.graphWrapper}>
            <View>
              <View>
                <View style={styles.amountContainer}>
                  <StatsGraphUserSvg />
                  <Text style={styles.amount}>{getAmount(v.amount)}</Text>
                </View>
                <View
                  style={[
                    styles.graphColumn,
                    {
                      height: (v.amount * maxHeight) / maxValue,
                      backgroundColor: getGraphColor(i),
                    },
                  ]}
                />
              </View>

              <Text style={styles.date}>{v.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: rem(16),
    marginTop: rem(12),
    marginBottom: rem(12),
  },
  period: {
    fontSize: font(12),
    color: '#747474',
    fontFamily: FONTS.primary.medium,
  },
  title: {
    fontSize: font(18),
    color: COLORS.black,
    fontFamily: FONTS.primary.bold,
  },
  graph: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  amount: {
    fontSize: font(10),
    color: COLORS.black,
    fontFamily: FONTS.primary.bold,
    textAlign: 'center',
    paddingLeft: rem(6),
  },
  date: {
    fontSize: font(10),
    color: COLORS.black,
    fontFamily: FONTS.primary.bold,
    textAlign: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  graphColumn: {
    maxWidth: rem(40),
    minHeight: rem(10),
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  graphWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
