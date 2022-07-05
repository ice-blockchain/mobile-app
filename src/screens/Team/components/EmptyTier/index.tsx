// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {Text} from '@components/Text';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {RATIO} from '@constants/styles';
import {TierType} from '@screens/Team/components/Tier';
import {InviteTierTwoIcon} from '@svg/InviteTierTwoIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {font, rem} from 'rn-units';

const icon = require('../../assets/images/teamTier2.png');

type EmptyTierProps = {
  type: TierType;
};

export function EmptyTier({type}: EmptyTierProps): React.ReactElement {
  const handleOnPress = () => {};
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>
        <Text text="team.empty.title_part1" />
        <Text
          style={styles.boldTitle}
          text={
            type === TierType.tierOne ? 'team.tierOne_tab' : 'team.tierTwo_tab'
          }
        />
        <Text text="team.empty.title_part2" />
      </Text>

      <PrimaryButton
        text={t('team.empty.button_title')}
        onPress={handleOnPress}
        style={styles.inviteButton}
        textStyle={styles.text}
        icon={<InviteTierTwoIcon />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: rem(200 * RATIO),
    height: rem(170 * RATIO),
    marginTop: rem(48 * RATIO),
  },
  title: {
    fontSize: font(14 * RATIO),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: rem(24),
    marginTop: rem(20 * RATIO),
    lineHeight: font(24 * RATIO),
  },
  boldTitle: {
    fontFamily: FONTS.primary.bold,
  },
  inviteButton: {
    marginTop: rem(35 * RATIO),
    width: rem(253),
    height: rem(55),
    backgroundColor: COLORS.primary,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
    fontSize: font(18),
    lineHeight: rem(21.6),
    marginLeft: 10,
  },
});
