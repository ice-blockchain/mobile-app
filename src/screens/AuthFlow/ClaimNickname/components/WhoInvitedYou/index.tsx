// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import TicketIconSvg from '@svg/ticket';
import WhoInvitedYouSvg from '@svg/whoInvitedYou';
import {translate} from '@utils/i18n';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {font, rem} from 'rn-units';
import CommonInput from '../input';

interface WhoInvitedYouProps {
  inputValue: string;
  onInputChange: (v: string) => void;
}

const WhoInvitedYou = ({inputValue, onInputChange}: WhoInvitedYouProps) => {
  return (
    <View style={styles.container}>
      <WhoInvitedYouSvg width={rem(236)} height={rem(275)} />
      <Text style={styles.title}>{translate('whoInvitedYou.title')}</Text>
      <Text style={styles.description}>
        {translate('whoInvitedYou.description')}
      </Text>

      <CommonInput
        placeholder={translate('whoInvitedYou.inputPlaceholder')}
        value={inputValue}
        onChangeText={onInputChange}
        leftIcon={<TicketIconSvg />}
        containerStyle={styles.input}
      />
    </View>
  );
};

export default WhoInvitedYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: rem(100),
  },
  title: {
    marginTop: rem(24),
    marginBottom: rem(23),
    fontFamily: FONTS.primary.black,
    color: COLORS.darkBlue,
    fontSize: font(28),
    textAlign: 'center',
  },
  description: {
    fontFamily: FONTS.primary.regular,
    color: COLORS.greyText,
    fontSize: font(14),
    lineHeight: rem(24),
    textAlign: 'center',
  },
  input: {
    marginTop: rem(30),
  },
});
