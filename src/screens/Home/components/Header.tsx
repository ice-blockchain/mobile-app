// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {BellSvg} from '@svg/Bell';
import {ChatBubblesSvg} from '@svg/ChatBubbles';
import {StatsSvg} from '@svg/Stats';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

interface HomeHeaderProps {}

const HomeHeader = ({}: HomeHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        {/** image */}
        <View style={styles.image} />
        <View>
          <Text style={styles.greetings}>{'Good evening,'}</Text>
          {/** nick */}
          <Text style={styles.nick}>{'@elementalmaster'}</Text>
        </View>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity style={styles.icon}>
          <BellSvg />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <StatsSvg />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <ChatBubblesSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(23),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rem(29),
  },
  image: {
    width: rem(34),
    height: rem(34),
    borderRadius: rem(12),
    borderWidth: 1,
    marginRight: rem(8),
    borderColor: COLORS.white,
    backgroundColor: '#fff',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetings: {
    fontSize: font(13),
    color: COLORS.white,
    marginBottom: 2,
    fontFamily: FONTS.primary.regular,
    lineHeight: rem(16),
  },
  nick: {
    fontSize: font(13),
    color: COLORS.white,
    fontFamily: FONTS.primary.bold,
    lineHeight: rem(16),
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: rem(7),
  },
});
