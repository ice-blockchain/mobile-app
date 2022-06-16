// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Slider} from '@screens/Profile/components/MiningCalculator/components/Slider';
import {MiningIcon} from '@svg/MiningIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

export const MiningCalculator = () => {
  const [tierOneNumber, setTierOneNumber] = useState(5);
  const [tierTwoNumber, setTierTwoNumber] = useState(15);

  return (
    <View style={[styles.containder, commonStyles.shadow]}>
      <Text style={styles.resultLabelText}>You will earn:</Text>
      <Text style={styles.resultValueText}>14,050 ice/h</Text>
      <View style={styles.checkbox}>
        <MiningIcon />
        <Text style={styles.checkboxLabelText}>Active inviter</Text>
      </View>
      <View style={styles.sliders}>
        <View style={styles.sliderInfo}>
          <TierOneIcon />
          <Text style={styles.sliderLabelText}>Tier 1 active referrals</Text>
          <Text style={styles.sliderValueText}>{tierOneNumber}</Text>
        </View>
        <Slider
          style={styles.slider}
          value={tierOneNumber}
          minimumValue={0}
          maximumValue={30}
          step={1}
          onValueChange={setTierOneNumber}
        />
        <View style={styles.sliderInfo}>
          <TierTwoIcon />
          <Text style={styles.sliderLabelText}>Tier 1 active referrals</Text>
          <Text style={styles.sliderValueText}>{tierTwoNumber}</Text>
        </View>
        <Slider
          style={styles.slider}
          value={tierTwoNumber}
          minimumValue={0}
          maximumValue={30}
          step={1}
          onValueChange={setTierTwoNumber}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containder: {
    marginTop: rem(12),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingRight: rem(42),
    paddingLeft: rem(36),
    borderRadius: rem(15),
    backgroundColor: COLORS.persianBlue,
    paddingBottom: rem(42),
  },
  resultLabelText: {
    fontSize: font(13),
    lineHeight: font(24),
    fontFamily: FONTS.primary.regular,
    color: COLORS.periwinkleGray,
    marginTop: rem(34),
    textAlign: 'center',
  },
  resultValueText: {
    fontSize: font(22),
    lineHeight: font(26),
    fontFamily: FONTS.primary.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  checkbox: {
    marginTop: rem(28),
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabelText: {
    fontSize: font(13),
    lineHeight: font(24),
    fontFamily: FONTS.primary.regular,
    color: COLORS.white,
  },
  sliders: {
    marginTop: rem(17),
  },
  sliderInfo: {
    marginTop: rem(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    marginTop: -rem(8),
    marginLeft: rem(6),
  },
  sliderLabelText: {
    fontSize: font(13),
    lineHeight: font(24),
    fontFamily: FONTS.primary.regular,
    color: COLORS.white,
  },
  sliderValueText: {
    flex: 1,
    fontSize: font(13),
    lineHeight: font(24),
    fontFamily: FONTS.primary.bold,
    color: COLORS.periwinkleGray,
    textAlign: 'right',
  },
});
