// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {useIsEnglishLocale} from '@hooks/useIsEnglishLocale';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {ActiveUsersIcon} from '@svg/ActiveUsersIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {forwardRef, Ref} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {referralType: ReferralType};

export const ActiveUsers = forwardRef(
  ({referralType}: Props, forwardedRef: Ref<Text>) => {
    const {total = 0, active = 0} = useSelector(
      referralsSelector({referralType}),
    );
    const isEnglishLocale = useIsEnglishLocale();
    return (
      <Text style={styles.title} ref={forwardedRef}>
        {isEnglishLocale ? (
          <Text style={styles.label}>{`${t('users.active')}:`}</Text>
        ) : (
          <ActiveUsersIcon width={rem(16)} />
        )}
        {` ${active}/${total}`}
      </Text>
    );
  },
);

const styles = StyleSheet.create({
  label: {
    ...font(14, null, 'regular', 'secondary'),
  },
  title: {
    ...font(14, null, 'regular', 'primaryDark'),
  },
});
