// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {isLiteTeam} from '@constants/featureFlags';
import {Images} from '@images';
import {CardBase} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {ReferralsEmptyState} from '@screens/HomeFlow/Home/components/Overview/components/ReferralsEmptyState';
import {isTeamEnabledSelector} from '@store/modules/Account/selectors';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {
  userReferralCountSelector,
  userT1ReferralSelector,
  userT2ReferralSelector,
} from '@store/modules/Referrals/selectors';
import {FriendsIcon} from '@svg/FriendsIcon';
import {TrophyIcon} from '@svg/TrophyIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

interface Props {
  sharedIsCollapsed: Animated.SharedValue<number>;
}

export const ReferralsCard = ({sharedIsCollapsed}: Props) => {
  const isTeamEnabled = useSelector(isTeamEnabledSelector);
  const userReferralCount = useSelector(userReferralCountSelector);
  const userT1ReferralCount = useSelector(userT1ReferralSelector);
  const userT2ReferralCount = useSelector(userT2ReferralSelector);
  const isSplashHidden = useSelector(isSplashHiddenSelector);

  if (!isSplashHidden) {
    return null;
  }

  return (
    <CardBase
      backgroundImageSource={Images.backgrounds.referralsCardBg}
      headerTitle={
        isLiteTeam ? t('home.referrals.title_team') : t('home.referrals.title')
      }
      headerTitleIcon={<TrophyIcon fill={COLORS.white} />}
      HeaderValue={formatNumber(
        isLiteTeam && !isTeamEnabled ? userT1ReferralCount : userReferralCount,
      )}
      headerValueIcon={<FriendsIcon fill={COLORS.white} />}
      sharedIsCollapsed={sharedIsCollapsed}>
      {userReferralCount === 0 ? (
        <ReferralsEmptyState />
      ) : (
        <>
          <View style={styles.body}>
            <View style={styles.column}>
              <Text style={styles.labelText}>
                {isLiteTeam
                  ? t('home.referrals.users')
                  : t('home.referrals.users_tier_1')}
              </Text>
              <Text style={styles.valueText}>
                {formatNumber(
                  isLiteTeam && isTeamEnabled
                    ? userReferralCount
                    : userT1ReferralCount,
                )}
              </Text>
            </View>
            {!isLiteTeam && (
              <View style={styles.column}>
                <Text style={styles.labelText}>
                  {t('home.referrals.users_tier_2')}
                </Text>
                <Text style={styles.valueText}>
                  {formatNumber(userT2ReferralCount)}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.noteText}>
            {isLiteTeam
              ? t('home.referrals.description_team')
              : t('home.referrals.description')}
          </Text>
        </>
      )}
    </CardBase>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: rem(24),
    flexGrow: 1,
  },
  column: {
    paddingTop: rem(6),
    flex: 1,
  },
  labelText: {
    textTransform: 'uppercase',
    opacity: 0.5,
    ...font(10, 12, 'regular'),
  },
  valueText: {
    marginTop: rem(4),
    ...font(24, 30, 'bold'),
  },
  noteText: {
    marginTop: rem(6),
    marginBottom: rem(12),
    ...font(11, 15, 'regular'),
  },
});
