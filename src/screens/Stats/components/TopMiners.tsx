// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles} from '@constants/styles';
import {Images} from '@images';
import {HomeTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TopMinersItem} from '@screens/Stats/components/TopMinersItem';
import {ArrowRightStatsSvg} from '@svg/ArrowRightStats';
import {translate} from '@translations/i18n';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

interface TopMinersProps {}

const topMiners = [
  {
    nickname: 'iulianflyby',
    photoUrl: Images.topMiners.yoda,
    ice: 214114114,
  },
  {
    nickname: 'joshitinnograt',
    photoUrl: '',
    ice: 156144144,
  },
  {
    nickname: 'andremary',
    photoUrl: Images.topMiners.monkey,
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
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();
  const onPress = () => navigation.navigate('TopMiners');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate('stats.top_miners')}</Text>
      <Text style={styles.description}>
        {translate('stats.most_active_users')}
      </Text>

      <View style={[styles.users, commonStyles.shadow]}>
        {topMiners.map(miner => (
          <TopMinersItem
            key={miner.nickname}
            miners={miner.ice}
            nickname={miner.nickname}
            photo={miner.photoUrl}
          />
        ))}

        <TouchableOpacity style={styles.seeAllUsers} onPress={onPress}>
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
