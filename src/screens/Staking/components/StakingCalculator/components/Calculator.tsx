// SPDX-License-Identifier: BUSL-1.1

import {Slider} from '@components/Slider';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ChartIcon} from '@svg/ChartIcon';
import {YearsIcon} from '@svg/YearsIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/number';
import React, {memo, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {font, isAndroid, rem} from 'rn-units';

const YEARS_MIN = 0;
const YEARS_MAX = 10;
const YEARS_DEFAULT = 4;
const ALLOCATION_MIN = 0;
const ALLOCATION_MAX = 100;
const ALLOCATION_DEFAULT = 75;

type Props = {
  onCalculateResult: (data: {years: number; allocation: number}) => void;
  result: number | null;
  loading: boolean;
};

export const Calculator = memo(
  ({result, onCalculateResult, loading}: Props) => {
    const yearsElementRef = useRef<TextInput | null>(null);
    const allocationElementRef = useRef<TextInput | null>(null);
    const yearsValueRef = useRef(YEARS_DEFAULT);
    const allocationValueRef = useRef(ALLOCATION_DEFAULT);

    const calculateResult = () => {
      onCalculateResult({
        years: yearsValueRef.current,
        allocation: allocationValueRef.current,
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(calculateResult, []);

    return (
      <View style={[styles.containder, commonStyles.shadow]}>
        <Text style={styles.resultLabelText}>
          {t('mining_calculator.result_label')}:
        </Text>
        <View style={styles.resultValue}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={styles.resultValueText}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {result != null && (
                <>
                  {`${formatNumber(result)} ${t('mining_calculator.currency')}`}
                  <Text style={styles.resultValueText_bonus}> (+145%)</Text>
                </>
              )}
            </Text>
          )}
        </View>
        <Text style={styles.currentRateText}>
          {t('current_rate').toUpperCase()}: 7,120 ice/h
        </Text>
        <View style={styles.sliderInfo}>
          <YearsIcon />
          <Text style={styles.sliderLabelText}>{t('global.years')}</Text>
          <TextInput
            style={styles.sliderValueText}
            ref={yearsElementRef}
            editable={false}
            defaultValue={yearsValueRef.current.toString()}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(YEARS_DEFAULT)}
          minimumValue={useSharedValue(YEARS_MIN)}
          maximumValue={useSharedValue(YEARS_MAX)}
          step={YEARS_MAX}
          onValueChange={value => {
            yearsValueRef.current = value;
            yearsElementRef.current?.setNativeProps({text: value.toString()});
          }}
          onSlidingComplete={calculateResult}
        />
        <View style={styles.sliderInfo}>
          <ChartIcon />
          <Text style={styles.sliderLabelText}>{t('staking.allocation')}</Text>
          <TextInput
            style={styles.sliderValueText}
            ref={allocationElementRef}
            editable={false}
            defaultValue={`${allocationValueRef.current}%`}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(ALLOCATION_DEFAULT)}
          minimumValue={useSharedValue(ALLOCATION_MIN)}
          maximumValue={useSharedValue(ALLOCATION_MAX)}
          step={ALLOCATION_MAX}
          onValueChange={value => {
            allocationValueRef.current = Math.round(value); // https://0.30000000000000004.com/
            allocationElementRef.current?.setNativeProps({
              text: `${allocationValueRef.current}%`,
            });
          }}
          onSlidingComplete={calculateResult}
        />
        <Text style={styles.descriptionText}>{t('staking.description')}</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  containder: {
    marginTop: -rem(82),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingHorizontal: rem(16),
    borderRadius: rem(15),
    backgroundColor: COLORS.madison,
    paddingBottom: rem(16),
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
  currentRateText: {
    fontSize: font(13),
    lineHeight: font(24),
    fontFamily: FONTS.primary.bold,
    color: COLORS.periwinkleGray,
    textAlign: 'center',
  },
  resultValueText_bonus: {
    color: COLORS.shamrock,
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
  sliderInfo: {
    marginTop: isAndroid ? rem(17) : rem(27),
    marginHorizontal: rem(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    marginTop: isAndroid ? rem(3) : rem(10),
    marginLeft: rem(32),
    marginRight: rem(26),
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
    fontFamily: FONTS.primary.bold,
    color: COLORS.periwinkleGray,
    textAlign: 'right',
  },
  descriptionText: {
    marginTop: rem(60),
    fontSize: font(14),
    lineHeight: font(18),
    fontFamily: FONTS.primary.regular,
    color: COLORS.linkWater,
  },
});
