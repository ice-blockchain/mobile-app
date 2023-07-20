// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {IceLabel} from '@components/Labels/IceLabel';
import {Slider} from '@components/Slider';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {MiningIcon} from '@svg/MiningIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {isRTL, t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
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
import {isAndroid, rem} from 'rn-units';

const TIER_ONE_MIN = 0;
const TIER_ONE_MAX = 30;
const TIER_ONE_DEFAULT = 10;
const TIER_TWO_MIN = 0;
const TIER_TWO_MAX = 20;
const TIER_TWO_DEFAULT = 15;
const ACTIVE_MINERS_MIN = 0;
const ACTIVE_MINERS_MAX = 100;
const ACTIVE_MINERS_DEFAULT = 30;

type Props = {
  onParametersChange: (data: {
    tierOneValue: number;
    tierTwoValue: number;
    activeMinersPerc: number;
  }) => void;
  result: number | null;
  loading?: boolean;
};

export const Calculator = memo(
  ({result, onParametersChange, loading}: Props) => {
    const tierOneElementRef = useRef<TextInput | null>(null);
    const tierTwoElementRef = useRef<TextInput | null>(null);
    const activeMinersElementRef = useRef<TextInput | null>(null);
    const tierOneValueRef = useRef(TIER_ONE_DEFAULT);
    const tierTwoValueRef = useRef(TIER_TWO_DEFAULT);
    const activeMinersValueRef = useRef(ACTIVE_MINERS_DEFAULT);

    const setParameters = useMemo(
      () =>
        throttle(() => {
          onParametersChange({
            tierOneValue: tierOneValueRef.current,
            tierTwoValue: tierTwoValueRef.current,
            activeMinersPerc: activeMinersValueRef.current,
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
          ) : result !== null ? (
            <>
              <AnimatedNumberText
                value={result ?? 0}
                style={styles.resultValueText}
                textDecorator={animatedValue =>
                  ` ${formatNumber(animatedValue, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} `
                }
              />
              <IceLabel
                iconSize={24}
                iconOffsetY={isAndroid ? 2 : -4}
                textStyle={styles.resultValueText}
                label={t('general.ice_per_hour')}
              />
            </>
          ) : null}
        </View>
        <View style={[styles.sliderInfo, styles.sliderInfo__first]}>
          <TierOneIcon />
          <Text style={styles.sliderLabelText}>
            {t('mining_calculator.tier_1_ref')}
          </Text>
          <TextInput
            style={styles.sliderValueText}
            ref={tierOneElementRef}
            editable={false}
            defaultValue={tierOneValueRef.current.toString()}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(TIER_ONE_DEFAULT)}
          minimumValue={useSharedValue(TIER_ONE_MIN)}
          maximumValue={useSharedValue(TIER_ONE_MAX)}
          step={TIER_ONE_MAX}
          onValueChange={value => {
            setParameters();
            tierOneValueRef.current = value;
            tierOneElementRef.current?.setNativeProps({text: value.toString()});
          }}
        />
        <View style={styles.sliderInfo}>
          <TierTwoIcon />
          <Text style={styles.sliderLabelText}>
            {t('mining_calculator.tier_2_ref')}
          </Text>
          <TextInput
            style={styles.sliderValueText}
            ref={tierTwoElementRef}
            editable={false}
            defaultValue={tierTwoValueRef.current.toString()}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(TIER_TWO_DEFAULT)}
          minimumValue={useSharedValue(TIER_TWO_MIN)}
          maximumValue={useSharedValue(TIER_TWO_MAX)}
          step={TIER_TWO_MAX}
          onValueChange={value => {
            setParameters();
            tierTwoValueRef.current = value;
            tierTwoElementRef.current?.setNativeProps({text: value.toString()});
          }}
        />
        <View style={styles.sliderInfo}>
          <MiningIcon />
          <Text style={styles.sliderLabelText}>
            {t('mining_calculator.active_miners')}
          </Text>
          <TextInput
            style={styles.sliderValueText}
            ref={activeMinersElementRef}
            editable={false}
            defaultValue={`${activeMinersValueRef.current}%`}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(ACTIVE_MINERS_DEFAULT)}
          minimumValue={useSharedValue(ACTIVE_MINERS_MIN)}
          maximumValue={useSharedValue(ACTIVE_MINERS_MAX)}
          step={ACTIVE_MINERS_MAX}
          onValueChange={value => {
            setParameters();
            activeMinersValueRef.current = Math.round(value); // https://0.30000000000000004.com/
            activeMinersElementRef.current?.setNativeProps({
              text: `${activeMinersValueRef.current}%`,
            });
          }}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: rem(16),
    marginHorizontal: 16,
    paddingHorizontal: rem(20),
    borderRadius: rem(20),
    backgroundColor: COLORS.primaryDark,
    paddingBottom: rem(40),
  },
  resultLabelText: {
    marginTop: rem(28),
    ...font(13, 24, 'regular', 'periwinkleGray', 'center'),
  },
  resultValue: {
    minHeight: rem(36),
    marginTop: rem(4),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultValueText: {
    ...font(28, 35, 'bold', 'white', 'center'),
  },
  sliderInfo: {
    marginTop: isAndroid ? rem(17) : rem(36),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderInfo__first: {
    marginTop: isAndroid ? rem(4) : rem(24),
  },
  slider: {
    marginTop: rem(10),
    alignSelf: 'flex-end',
    width: '100%',
  },
  sliderLabelText: {
    ...font(13, 24, 'regular', 'periwinkleGray'),
  },
  sliderValueText: {
    flex: 1,
    ...font(17, 24, 'bold', 'white', isRTL ? 'left' : 'right'),
  },
});
