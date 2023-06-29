// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {
  CardBase,
  CardBaseSkeleton,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {Tiers} from '@screens/HomeFlow/Home/components/Overview/components/ReferralAcquisitionHistory/components/Tiers';
import {UnitedVerticalBar} from '@screens/HomeFlow/Home/components/Overview/components/ReferralAcquisitionHistory/components/UnitedVerticalBar';
import {ReferralsEmptyState} from '@screens/HomeFlow/Home/components/Overview/components/ReferralsEmptyState';
import {dayjs} from '@services/dayjs';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {
  referralHistorySelector,
  userReferralCountSelector,
} from '@store/modules/Referrals/selectors';
import {TrophyIcon} from '@svg/TrophyIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

const NUMBER_OF_STEPS_Y = 5;
const Y_AXIS_HEIGHT = '100%';

interface Props {
  isCollapsed: boolean;
}

export const ReferralAcquisitionHistory = ({isCollapsed}: Props) => {
  const dispatch = useDispatch();

  const userReferralCount = useSelector(userReferralCountSelector);

  useEffect(() => {
    dispatch(ReferralsActions.GET_REFERRALS_HISTORY.START.create());
  }, [dispatch]);

  const isSplashHidden = useSelector(isSplashHiddenSelector);

  const referralHistory = useSelector(referralHistorySelector);

  const maxTierOneRefValue = Math.max(
    ...(referralHistory ?? []).map(tier => tier.t1),
  );
  const maxTierTwoRefValue = Math.max(
    ...(referralHistory ?? []).map(tier => tier.t2),
  );
  const maxValue = Math.max(maxTierOneRefValue, maxTierTwoRefValue);

  const stepValue = Math.ceil(maxValue / NUMBER_OF_STEPS_Y);
  const lastXValue = stepValue * NUMBER_OF_STEPS_Y;

  if (!isSplashHidden) {
    return null;
  }

  if (referralHistory == null) {
    return <CardBaseSkeleton />;
  }

  return (
    <CardBase
      backgroundImageSource={Images.backgrounds.referralsCardBg}
      headerTitle={t('home.referrals.title')}
      headerTitleIcon={<TrophyIcon fill={COLORS.white} />}
      headerValueIcon={<Tiers />}
      isCollapsed={isCollapsed}>
      {userReferralCount === 0 ? (
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
                    valuePercentageB1={(t1 * 100) / lastXValue}
                    valuePercentageB2={(t2 * 100) / lastXValue}
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
