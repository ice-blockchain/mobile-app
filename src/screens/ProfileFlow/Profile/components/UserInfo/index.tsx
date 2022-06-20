// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Avatar} from '@screens/ProfileFlow/Profile/components/UserInfo/components/Avatar';
import {Level} from '@screens/ProfileFlow/Profile/components/UserInfo/components/Level';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/number';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

export const UserInfo = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Avatar
          showPen
          uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
        />
        <Text style={styles.usernameText} numberOfLines={1}>
          @johnyknox07
        </Text>
      </View>
      <View style={styles.ladder}>
        <View style={styles.ladderLeft}>
          <Text style={styles.ladderValueText}>{formatNumber(606683)}</Text>
          <Text style={styles.ladderLabelText}>
            {t('profile.global_rank').toUpperCase()}
          </Text>
        </View>
        <Level value={21} />
        <View style={styles.ladderRight}>
          <View>
            <Text style={styles.ladderValueText}>{formatNumber(1024)}</Text>
            <Text style={styles.ladderLabelText}>
              {t('global.referrals').toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(20),
  },
  body: {
    alignItems: 'center',
  },
  usernameText: {
    fontFamily: FONTS.primary.bold,
    color: COLORS.white,
    fontSize: font(18),
    marginTop: rem(20),
  },
  ladder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(20),
  },
  ladderLeft: {
    flex: 1,
  },
  ladderRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  ladderValueText: {
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
    fontSize: font(15),
    lineHeight: font(18),
  },
  ladderLabelText: {
    fontFamily: FONTS.primary.bold,
    color: COLORS.white,
    fontSize: font(10),
    lineHeight: font(12),
    marginTop: rem(4),
  },
});
