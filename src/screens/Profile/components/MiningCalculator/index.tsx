// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {CheckBox} from '@screens/Profile/components/MiningCalculator/components/Checkbox';
import {Slider} from '@screens/Profile/components/MiningCalculator/components/Slider';
import {MiningIcon} from '@svg/MiningIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {formatNumber} from '@utils/number';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

let timer: null | ReturnType<typeof setTimeout> = null;
export const MiningCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [activeInviter, setActiveInviter] = useState(true);
  const [tierOneNumber, setTierOneNumber] = useState(5);
  const [tierTwoNumber, setTierTwoNumber] = useState(15);
  const [result, setResult] = useState<number | null>(null);

  const calculateResult = () => {
    setLoading(true);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setResult(tierOneNumber * tierTwoNumber * (activeInviter ? 100 : 50));
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    calculateResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeInviter]);

  return (
    <View style={[styles.containder, commonStyles.shadow]}>
      <Text style={styles.resultLabelText}>You will earn:</Text>
      <View style={styles.resultValue}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.resultValueText}>
            {result !== null ? `${formatNumber(result)} ice/h` : null}
          </Text>
        )}
      </View>
      <View style={styles.checkboxWrapper}>
        <CheckBox
          value={activeInviter}
          onValueChange={setActiveInviter}
          LabelComponent={
            <View style={styles.checkboxLabel}>
              <MiningIcon />
              <Text style={styles.checkboxLabelText}>Active inviter</Text>
            </View>
          }
        />
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
          onSlidingComplete={calculateResult}
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
          onSlidingComplete={calculateResult}
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
  resultValue: {
    height: rem(26),
    alignItems: 'center',
  },
  resultValueText: {
    fontSize: font(22),
    lineHeight: font(26),
    fontFamily: FONTS.primary.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  checkboxWrapper: {
    paddingTop: rem(28),
  },
  checkboxLabel: {
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
