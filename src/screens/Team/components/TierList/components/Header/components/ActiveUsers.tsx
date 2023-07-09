// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {useIsEnglishLocale} from '@hooks/useIsEnglishLocale';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {ActiveUsersIcon} from '@svg/ActiveUsersIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {isIOS, rem} from 'rn-units';

type Props = {referralType: ReferralType};

export const ActiveUsers = ({referralType}: Props) => {
  const {total = 0, active = 0} = useSelector(
    referralsSelector({referralType}),
  );
  const isEnglishLocale = useIsEnglishLocale();
  return isEnglishLocale ? (
    <Text style={styles.title}>
      <Text style={styles.label}>{`${t('users.active')}:`}</Text>
      {` ${active}/${total}`}
    </Text>
  ) : (
    <View style={styles.container}>
      <ActiveUsersIcon width={rem(16)} style={styles.icon} />
      <Text style={styles.titleNonEnglish}>{`  ${active}/${total}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    ...font(14, null, 'regular', 'secondary'),
  },
  title: {
    ...font(14, null, 'regular', 'primaryDark'),
  },
  titleNonEnglish: {
    ...font(14, 20, 'regular', 'primaryDark'),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  icon: {
    bottom: isIOS ? rem(4) : rem(3),
  },
});
