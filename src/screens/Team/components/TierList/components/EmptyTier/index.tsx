// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {Text} from '@components/Text';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {InviteIcon} from '@svg/InviteIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {font, rem} from 'rn-units';

const icon = require('../../../../assets/images/teamTier2.png');

type Props = {
  title: string;
};

export function EmptyTier({title}: Props) {
  const tabbarOffest = useBottomTabBarOffsetStyle();
  const handleOnPress = () => {};
  return (
    <View style={[styles.container, tabbarOffest.current]}>
      <View style={styles.imageContainer}>
        <Image source={icon} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title}>
        <Text text="team.empty.title_part1" />
        <Text style={styles.boldTitle} text={title} />
        <Text text="team.empty.title_part2" />
      </Text>

      <PrimaryButton
        text={t('team.empty.button_title')}
        onPress={handleOnPress}
        style={styles.inviteButton}
        textStyle={styles.text}
        icon={
          <InviteIcon fill={COLORS.white} width={rem(28)} height={rem(28)} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    maxHeight: rem(200),
    marginTop: rem(48),
  },
  image: {
    flex: 1,
  },
  title: {
    fontSize: font(14),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(20),
    lineHeight: font(24),
  },
  boldTitle: {
    fontFamily: FONTS.primary.bold,
  },
  inviteButton: {
    marginTop: rem(35),
    width: rem(253),
    height: rem(55),
    backgroundColor: COLORS.primary,
  },
  text: {
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
    fontSize: font(18),
    lineHeight: rem(21.6),
  },
});
