// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {Slider} from '@components/Slider';
import {COLORS} from '@constants/colors';
import {FORCE_LTR_TEXT_CHAR} from '@constants/rtl';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useCalculatorSliderValues} from '@screens/Staking/components/Calculator/hooks/useCalculatorSliderValues';
import {miningRatesSelector} from '@store/modules/Tokenomics/selectors';
import {ChartIcon} from '@svg/ChartIcon';
import {YearsIcon} from '@svg/YearsIcon';
import {isRTL, t} from '@translations/i18n';
import {
  formatNumber,
  formatNumberString,
  removeZeroDigits,
} from '@utils/numbers';
import {font} from '@utils/styles';
import {throttle} from 'lodash';
import React, {memo, useEffect, useMemo, useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  onParametersChange: (data: {years: number; allocation: number}) => void;
  calculatedResults: {miningRate: number; bonus: number} | null;
  loading?: boolean;
};

export const Calculator = memo(
  ({calculatedResults, onParametersChange, loading = false}: Props) => {
    const miningRate = useSelector(miningRatesSelector);

    const {
      availableStakingYearsMin,
      availableStakingYearsMax,
      availableYearsPercentage,
      stakingYearsInitialValue,
      availableAllocationMin,
      availableAllocationMax,
      availableAllocationPercentage,
      allocationInitialValue,
    } = useCalculatorSliderValues();

    const yearsElementRef = useRef<TextInput | null>(null);
    const allocationElementRef = useRef<TextInput | null>(null);
    const yearsValueRef = useRef(stakingYearsInitialValue);
    const allocationValueRef = useRef(allocationInitialValue);

    const setParameters = useMemo(
      () =>
        throttle(() => {
          onParametersChange({
            years: yearsValueRef.current,
            allocation: allocationValueRef.current,
          });
        }, 200),
      [onParametersChange],
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(setParameters, []);

    return (
      <View style={[styles.container, commonStyles.shadow]}>
        <Text style={styles.resultLabelText}>
          {t('mining_calculator.result_label')}:
        </Text>
        <View style={styles.resultValue}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Text style={styles.resultValueText}>
                {calculatedResults
                  ? ` ${FORCE_LTR_TEXT_CHAR}${formatNumber(
                      calculatedResults.miningRate,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )} `
                  : ''}
              </Text>
              <IceLabel
                iconSize={rem(24)}
                iconOffsetY={1}
                textStyle={styles.resultValueText}
                label={t('general.ice_per_hour')}
              />
              <Text style={styles.resultBonusText}>
                {calculatedResults
                  ? ` ${FORCE_LTR_TEXT_CHAR}(+${removeZeroDigits(
                      formatNumber(calculatedResults.bonus, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                    )}%) `
                  : ''}
              </Text>
            </>
          )}
        </View>
        {miningRate && (
          <View style={styles.currentRateContainer}>
            <Text style={styles.currentRateText}>
              {t('staking.current_rate').toUpperCase()}:{' '}
              {formatNumberString(
                miningRate.positiveTotalNoPreStakingBonus.amount,
              )}{' '}
            </Text>
            <IceLabel
              iconSize={14}
              iconOffsetY={1}
              label={t('general.ice_per_hour')}
              textStyle={styles.currentRateText}
            />
          </View>
        )}
        <View style={styles.sliderInfo}>
          <YearsIcon
            color={COLORS.periwinkleGray}
            width={rem(22)}
            height={rem(22)}
          />
          <Text style={styles.sliderLabelText}>{t('global.years')}</Text>
          <TextInput
            style={styles.sliderValueText}
            ref={yearsElementRef}
            editable={false}
            defaultValue={yearsValueRef.current.toString()}
          />
        </View>
        <Slider
          style={[styles.slider, {width: `${availableYearsPercentage}%`}]}
          progress={useSharedValue(stakingYearsInitialValue)}
          minimumValue={useSharedValue(availableStakingYearsMin)}
          maximumValue={useSharedValue(availableStakingYearsMax)}
          step={availableStakingYearsMax - availableStakingYearsMin || 1}
          onValueChange={value => {
            setParameters();
            yearsValueRef.current = value;
            yearsElementRef.current?.setNativeProps({text: value.toString()});
          }}
        />
        <View style={styles.sliderInfo}>
          <ChartIcon
            color={COLORS.periwinkleGray}
            width={rem(23)}
            height={rem(24)}
          />
          <Text style={styles.sliderLabelText}>{t('staking.allocation')}</Text>
          <TextInput
            style={styles.sliderValueText}
            ref={allocationElementRef}
            editable={false}
            defaultValue={`${allocationValueRef.current}%`}
          />
        </View>
        <Slider
          style={[styles.slider, {width: `${availableAllocationPercentage}%`}]}
          progress={useSharedValue(allocationInitialValue)}
          minimumValue={useSharedValue(availableAllocationMin)}
          maximumValue={useSharedValue(availableAllocationMax)}
          step={availableAllocationMax - availableAllocationMin || 1}
          onValueChange={value => {
            setParameters();
            allocationValueRef.current = Math.round(value); // https://0.30000000000000004.com/
            allocationElementRef.current?.setNativeProps({
              text: `${allocationValueRef.current}%`,
            });
          }}
        />
        <Text style={styles.descriptionText}>{t('staking.description')}</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: -rem(82),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingHorizontal: rem(16),
    borderRadius: rem(20),
    backgroundColor: COLORS.madison,
    paddingBottom: rem(30),
  },
  resultLabelText: {
    marginTop: rem(30),
    marginBottom: rem(12),
    ...font(13, 24, 'regular', 'periwinkleGray', 'center'),
  },
  resultValue: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultValueText: {
    ...font(28, 36, 'bold', 'white', 'auto'),
    textAlignVertical: 'center',
  },
  resultBonusText: {
    ...font(28, 36, 'bold', 'shamrock', 'auto'),
    textAlignVertical: 'center',
  },
  currentRateContainer: {
    marginVertical: rem(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentRateText: {
    ...font(13, 18, 'bold', 'periwinkleGray'),
    textAlignVertical: 'center',
  },
  sliderInfo: {
    marginTop: rem(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    marginTop: rem(10),
    alignSelf: 'flex-end',
  },
  sliderLabelText: {
    ...font(13, 24, 'regular', 'periwinkleGray'),
  },
  sliderValueText: {
    flex: 1,
    ...font(17, 24, 'bold', 'white', isRTL ? 'left' : 'right'),
  },
  descriptionText: {
    marginTop: rem(40),
    ...font(14, 19, 'regular', 'periwinkleGray', 'center'),
  },
});
