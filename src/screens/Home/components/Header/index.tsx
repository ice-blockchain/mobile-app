// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {userSelector} from '@store/modules/Auth/selectors';
import {BellSvg} from '@svg/Bell';
import {ChatBubblesSvg} from '@svg/ChatBubbles';
import {StatsSvg} from '@svg/Stats';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {font, rem} from 'rn-units';

interface HomeHeaderProps {}

export const HomeHeader = ({}: HomeHeaderProps) => {
  const user = useSelector(userSelector);
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.image} />
        <View>
          {/** TODO: remove hardcoded greetings */}
          <Text style={styles.greetings}>{'Good evening,'}</Text>
          {user && <Text style={styles.nick}>{`@${user.username}`}</Text>}
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: rem(18),
  },
  image: {
    width: rem(34),
    height: rem(34),
    borderRadius: rem(12),
    borderWidth: 1,
    marginRight: rem(8),
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
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
