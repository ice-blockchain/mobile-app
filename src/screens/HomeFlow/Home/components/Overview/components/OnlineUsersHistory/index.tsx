// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {VerticalBar} from '@components/BarGraph/components/VerticalBar';
import {useGetUserGrowthBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetUserGrowthBarGraphDataForStatsPeriod';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {
  CardBase,
  CardBaseSkeleton,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {totalActiveUsersSelector} from '@store/modules/Stats/selectors';
import {FriendIcon} from '@svg/FriendIcon';
import {GraphIcon} from '@svg/GraphIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TextProps, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const USER_GROWTH_STATS_PERIOD = 7;

const Y_AXIS_HEIGHT = '100%';
const BAR_HEIGHT = '90%';
const NUMBER_OF_STEPS_Y = 5;

type Props = {
  sharedIsCollapsed: Animated.SharedValue<number>;
};

export const OnlineUsersHistory = ({sharedIsCollapsed}: Props) => {
  const {activeUsersData: data} = useGetUserGrowthBarGraphDataForStatsPeriod(
    USER_GROWTH_STATS_PERIOD,
  );

  const isSplashHidden = useSelector(isSplashHiddenSelector);
  const totalActiveUsers = useSelector(totalActiveUsersSelector);

  const Header = useCallback(
    ({style}: TextProps) => (
      <AnimatedNumberText value={totalActiveUsers} style={style} />
    ),
    [totalActiveUsers],
  );

  const maxValue = data.length ? Math.max(...data.map(d => d.value)) : 0;
  const minValue = data.length ? Math.min(...data.map(d => d.value)) : 0;

  const stepValue = data.length ? Math.ceil(maxValue / NUMBER_OF_STEPS_Y) : 0;
  const lastXValue = stepValue * NUMBER_OF_STEPS_Y;

  if (!isSplashHidden) {
    return null;
  }

  if (!data.length) {
    return <CardBaseSkeleton />;
  }

  return (
    <CardBase
      backgroundImageSource={Images.backgrounds.adoptionCardBg}
      headerTitle={t('home.adoption.title')}
      sharedIsCollapsed={sharedIsCollapsed}
      headerTitleIcon={<GraphIcon fill={COLORS.white} />}
      HeaderValue={Header}
      headerValueIcon={<FriendIcon fill={COLORS.shamrock} />}>
      <View style={styles.body}>
        <View style={styles.yAxis}>
          {Array(NUMBER_OF_STEPS_Y)
            .fill('')
            .map((_, i) => {
              const currentValue = stepValue * i ? stepValue * i : minValue;
              return (
                <Text key={i} style={styles.yAxisText}>
                  {formatNumber(currentValue, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                    notation: 'compact',
                  })}
                </Text>
              );
            })}
        </View>
        {data
          .map(({label, value}, index) => {
            return (
              <View key={`${label}_${index}`} style={styles.column}>
                <VerticalBar
                  valuePercentage={(value * 100) / lastXValue}
                  label={label}
                />
              </View>
            );
          })
          .reverse()}
      </View>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: rem(8),
  },
  column: {
    alignItems: 'center',
    height: BAR_HEIGHT,
  },
  yAxis: {
    height: Y_AXIS_HEIGHT,
    flexDirection: 'column-reverse',
    alignItems: 'center',
    marginBottom: rem(6),
  },
  yAxisText: {
    flex: 1,
    ...font(8, 10, 'medium', 'white'),
  },
});
