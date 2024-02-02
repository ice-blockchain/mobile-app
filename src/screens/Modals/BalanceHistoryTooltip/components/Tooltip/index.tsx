// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles, windowHeight, windowWidth} from '@constants/styles';
import {Coordinates} from '@screens/Modals/types';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import {isRTL, t} from '@translations/i18n';
import {formatNumberString, parseNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo, useRef} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {LayoutChangeEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  coordinates: Coordinates;
};

export const ROUNDED_TRIANGLE_SIZE = rem(20);

function getRight(coordinates: Coordinates) {
  return (
    coordinates.right ?? (coordinates.left ? windowWidth - coordinates.left : 0)
  );
}
function getTop(coordinates: Coordinates) {
  return (
    coordinates.top ??
    (coordinates.bottom ? windowHeight - coordinates.bottom : 0)
  );
}

const CELLS_NUMBER = 2;

export const Tooltip = memo(({coordinates}: Props) => {
  const balanceSummary = useSelector(balanceSummarySelector);
  const right = getRight(coordinates);

  const maxWidthRef = useRef(0);
  const numberCellsToRenderRef = useRef(CELLS_NUMBER);
  const [cellDynamicStyle, setCellDynamicStyle] =
    React.useState<ViewStyle | null>(null);
  const onCellLayout = ({nativeEvent}: LayoutChangeEvent) => {
    maxWidthRef.current = Math.max(
      maxWidthRef.current,
      nativeEvent.layout.width,
    );
    numberCellsToRenderRef.current -= 1;
    if (!numberCellsToRenderRef.current) {
      setCellDynamicStyle({
        width: maxWidthRef.current,
      });
    }
  };
  return (
    <View
      style={[
        styles.mainContainer,
        commonStyles.shadow,
        {
          top: getTop(coordinates) + ROUNDED_TRIANGLE_SIZE,
          right: isRTL ? (windowWidth - right) / 2 : right / 2,
        },
      ]}>
      <RoundedTriangle
        fill={COLORS.gulfBlue}
        width={ROUNDED_TRIANGLE_SIZE}
        height={ROUNDED_TRIANGLE_SIZE}
        style={[
          styles.arrow,
          {
            right: isRTL
              ? (windowWidth - right) / 2 - ROUNDED_TRIANGLE_SIZE / 2 - rem(3)
              : right / 2 - ROUNDED_TRIANGLE_SIZE / 2 - rem(2),
          },
        ]}
      />
      <View style={[styles.cell, cellDynamicStyle]} onLayout={onCellLayout}>
        <Text style={styles.labelText}>{t('balance_history.you')}</Text>
        <Text style={styles.valueText}>
          {balanceSummary &&
            formatNumberString(
              String(
                parseNumber(balanceSummary.totalMiningBlockchain) -
                  parseNumber(
                    balanceSummary.totalMainnetRewardPoolContribution,
                  ),
              ),
              {minimumFractionDigits: 0, maximumFractionDigits: 0},
            )}
        </Text>
      </View>
      <View style={styles.cellSeparator} />
      <View style={[styles.cell, cellDynamicStyle]} onLayout={onCellLayout}>
        <Text style={styles.labelText}>
          {t('balance_history.contribution')}
        </Text>
        <Text style={styles.valueText}>
          {balanceSummary &&
            formatNumberString(
              balanceSummary.totalMainnetRewardPoolContribution,
              {minimumFractionDigits: 0, maximumFractionDigits: 0},
            )}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.midnightSapphire,
    position: 'absolute',
    borderRadius: rem(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    minWidth: rem(100),
    padding: rem(10),
    alignItems: 'center',
  },
  cellSeparator: {
    width: 1,
    backgroundColor: COLORS.periwinkleGray,
    height: '80%',
  },
  labelText: {
    ...font(10, 14, 'regular', 'white', 'center'),
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  valueText: {
    ...font(14, 20, 'bold'),
  },
  arrow: {
    position: 'absolute',
    top: -ROUNDED_TRIANGLE_SIZE + rem(4),
  },
});
