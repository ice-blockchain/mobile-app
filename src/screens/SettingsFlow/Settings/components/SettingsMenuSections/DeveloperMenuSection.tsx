// SPDX-License-Identifier: ice License 1.0

import {MenuItem} from '@screens/SettingsFlow/Settings/components/MenuItem.tsx';
import {SectionTitle} from '@screens/SettingsFlow/Settings/components/SectionTitle';
import {
  authTokenSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {PersonIcon} from '@svg/PersonIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {Share} from 'react-native';
import {useSelector} from 'react-redux';

export const DeveloperMenuSection = () => {
  const user = useSelector(userSelector);
  const token = useSelector(authTokenSelector);
  return (
    <>
      <SectionTitle text={t('settings.developer').toUpperCase()} />
      <MenuItem
        title={t('settings.user_id')}
        description={user?.id}
        renderIcon={PersonIcon}
        onPress={() => Share.share({message: user?.id ?? ''})}
      />
      <MenuItem
        title={t('settings.user_token')}
        description={token}
        renderIcon={PersonIcon}
        onPress={() => Share.share({message: token ?? ''})}
      />
    </>
  );
};
