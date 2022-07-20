// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {StakeIcon} from '@svg/StakeIcon';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

export const Footer = memo(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.noteText}>
        By clicking Stake Now, you agree to the ice Staking Terms. Your ice
        holdings will be locked for the selected period.
      </Text>
      <PrimaryButton
        onPress={() => {}}
        text={'Stake Now!'}
        style={styles.button}
        icon={<StakeIcon />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(70),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  noteText: {
    fontSize: font(11),
    lineHeight: font(15),
    fontFamily: FONTS.primary.regular,
    color: COLORS.black,
    textAlign: 'center',
  },
  button: {
    marginTop: rem(14),
    backgroundColor: COLORS.persianBlue,
  },
});
