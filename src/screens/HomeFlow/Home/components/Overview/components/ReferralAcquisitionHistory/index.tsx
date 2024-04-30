// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {isLiteTeam} from '@constants/featureFlags';
import {useIsEnglishLocale} from '@hooks/useIsEnglishLocale';
import {Images} from '@images';
import {
  CardBase,
  CardBaseSkeleton,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {Tiers} from '@screens/HomeFlow/Home/components/Overview/components/ReferralAcquisitionHistory/components/Tiers';
import {UnitedVerticalBar} from '@screens/HomeFlow/Home/components/Overview/components/ReferralAcquisitionHistory/components/UnitedVerticalBar';
import {ReferralsEmptyState} from '@screens/HomeFlow/Home/components/Overview/components/ReferralsEmptyState';
import {dayjs} from '@services/dayjs';
import {isTeamEnabledSelector} from '@store/modules/Account/selectors';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralHistorySelector} from '@store/modules/Referrals/selectors';
import {TrophyIcon} from '@svg/TrophyIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

const NUMBER_OF_STEPS_Y = 5;
const Y_AXIS_HEIGHT = '100%';

interface Props {
  sharedIsCollapsed: Animated.SharedValue<number>;
}

export const ReferralAcquisitionHistory = ({sharedIsCollapsed}: Props) => {
  const dispatch = useDispatch();

  const isEnglishLocale = useIsEnglishLocale();

  useEffect(() => {
    dispatch(ReferralsActions.GET_REFERRALS_HISTORY.START.create());
  }, [dispatch]);

  const isSplashHidden = useSelector(isSplashHiddenSelector);
  const isTeamEnabled = useSelector(isTeamEnabledSelector);
  const referralHistory = useSelector(referralHistorySelector);

  if (!isSplashHidden) {
    return null;
  }

  if (referralHistory == null) {
    return <CardBaseSkeleton />;
  }

  const maxValue = isLiteTeam
    ? isTeamEnabled
      ? Math.max(...referralHistory.map(tier => tier.t1 + tier.t2))
      : Math.max(...referralHistory.map(tier => tier.t1))
    : Math.max(
        ...referralHistory.map(tier => tier.t1),
        ...referralHistory.map(tier => tier.t2),
      );

  const stepValue = Math.ceil(maxValue / NUMBER_OF_STEPS_Y);
  const lastXValue = stepValue * NUMBER_OF_STEPS_Y;

  return (
    <CardBase
      backgroundImageSource={Images.backgrounds.referralsCardBg}
      headerTitle={
        isLiteTeam ? t('home.referrals.title_team') : t('home.referrals.title')
      }
      headerTitleIcon={<TrophyIcon fill={COLORS.white} />}
      headerValueIcon={isEnglishLocale && !isLiteTeam ? <Tiers /> : null}
      sharedIsCollapsed={sharedIsCollapsed}>
      {referralHistory.length === 0 ? (
        <ReferralsEmptyState />
      ) : (
        <View style={styles.body}>
          <View style={styles.yAxis}>
            {Array(NUMBER_OF_STEPS_Y)
              .fill('')
              .map((_, i) => {
                const currentValue = i === 0 ? stepValue : stepValue * (i + 1);
                return (
                  <Text key={i} style={styles.yAxisText}>
                    {currentValue}
                  </Text>
                );
              })}
          </View>
          {referralHistory
            .map(({t1, t2, date}) => {
              return (
                <View style={styles.column} key={date}>
                  <UnitedVerticalBar
                    valuePercentageB1={
                      ((isLiteTeam && isTeamEnabled ? t1 + t2 : t1) * 100) /
                      lastXValue
                    }
                    valuePercentageB2={
                      isLiteTeam ? null : (t2 * 100) / lastXValue
                    }
                    label={dayjs(date).format('MM/DD')}
                  />
                </View>
              );
            })
            .reverse()}
        </View>
      )}
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
  },
  yAxis: {
    height: Y_AXIS_HEIGHT,
    flexDirection: 'column-reverse',
    alignItems: 'center',
    marginBottom: rem(8),
    justifyContent: 'space-around',
  },
  yAxisText: {
    ...font(8, 10, 'medium', 'white'),
  },
});
