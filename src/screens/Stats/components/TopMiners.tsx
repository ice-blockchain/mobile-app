// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {ArrowRightStatsSvg} from '@svg/ArrowRightStats';
import {translate} from '@translations/i18n';
import {numberWithCommas} from '@utils/number';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

interface TopMinersProps {}

const topMiners = [
  {
    nickname: 'iulianflyby',
    photoUrl: '',
    ice: 214114114,
  },
  {
    nickname: 'joshitinnograt',
    photoUrl: '',
    ice: 156144144,
  },
  {
    nickname: 'andremary',
    photoUrl: '',
    ice: 94541009,
  },
  {
    nickname: 'parisdophie92',
    photoUrl: '',
    ice: 4144144,
  },
  {
    nickname: 'mikehush',
    photoUrl: '',
    ice: 613190,
  },
];

export const TopMiners = ({}: TopMinersProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate('stats.top_miners')}</Text>
      <Text style={styles.description}>
        {translate('stats.most_active_users')}
      </Text>

      <View style={styles.users}>
        {topMiners.map(v => (
          <View key={v.nickname} style={styles.user}>
            <View style={styles.userInfo}>
              <View style={styles.icon} />
              <Text style={styles.nickname}>{v.nickname}</Text>
            </View>
            <Text style={styles.ice}>{`${numberWithCommas(v.ice)} ice`}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.seeAllUsers}>
          <Text style={styles.seeAllUsersText}>
            {translate('stats.see_all_active_users')}
          </Text>
          <ArrowRightStatsSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(24),
    paddingTop: rem(32),
  },
  title: {
    fontSize: font(15),
    color: COLORS.black,
    fontFamily: FONTS.primary.black,
    marginBottom: rem(4),
  },
  description: {
    fontSize: font(13),
    color: '#747474',
    fontFamily: FONTS.primary.medium,
    marginBottom: rem(14),
  },
  users: {
    backgroundColor: COLORS.white,
    borderRadius: 16,

    shadowColor: COLORS.mariner,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  user: {
    flexDirection: 'row',
    paddingHorizontal: rem(24),
    alignItems: 'center',
    paddingVertical: rem(13),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4FB',
  },
  icon: {
    width: rem(29),
    height: rem(29),
    borderRadius: 9,
    backgroundColor: COLORS.gullGray,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontSize: font(12),
    color: COLORS.darkBlue,
    fontFamily: FONTS.primary.bold,
    marginLeft: rem(8),
  },
  ice: {
    fontSize: font(12),
    color: COLORS.greyText,
    fontFamily: FONTS.primary.semibold,
  },
  seeAllUsers: {
    paddingHorizontal: rem(26),
    paddingTop: rem(12),
    paddingBottom: rem(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllUsersText: {
    fontSize: font(12),
    color: COLORS.darkBlue,
    fontFamily: FONTS.primary.bold,
    marginRight: rem(10),
    lineHeight: rem(20),
    textTransform: 'uppercase',
  },
});
