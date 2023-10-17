// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {IceLabel} from '@components/Labels/IceLabel';
import {Slider} from '@components/Slider';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {MiningIcon} from '@svg/MiningIcon';
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

const TEAM_MIN = 0;
const TEAM_MAX = 100;
const TEAM_DEFAULT = 35;
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

export const CalculatorLite = memo(
  ({result, onParametersChange, loading}: Props) => {
    const teamElementRef = useRef<TextInput | null>(null);
    const activeMinersElementRef = useRef<TextInput | null>(null);
    const teamValueRef = useRef(TEAM_DEFAULT);
    const activeMinersValueRef = useRef(ACTIVE_MINERS_DEFAULT);

    const setParameters = useMemo(
      () =>
        throttle(() => {
          onParametersChange({
            tierOneValue: teamValueRef.current,
            tierTwoValue: 0,
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
          <TierTwoIcon />
          <Text style={styles.sliderLabelText}>
            {t('mining_calculator.team_members')}
          </Text>
          <TextInput
            style={styles.sliderValueText}
            ref={teamElementRef}
            editable={false}
            defaultValue={teamValueRef.current.toString()}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(TEAM_DEFAULT)}
          minimumValue={useSharedValue(TEAM_MIN)}
          maximumValue={useSharedValue(TEAM_MAX)}
          step={TEAM_MAX}
          onValueChange={value => {
            setParameters();
            teamValueRef.current = Math.round(value); // https://0.30000000000000004.com/
            teamElementRef.current?.setNativeProps({
              text: teamValueRef.current.toString(),
            });
          }}
        />
        <View style={styles.sliderInfo}>
          <MiningIcon />
          <Text style={styles.sliderLabelText}>
            {t('mining_calculator.active_team_members')}
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
