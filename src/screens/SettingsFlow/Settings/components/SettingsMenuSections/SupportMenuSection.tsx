// SPDX-License-Identifier: ice License 1.0

import {DEFAULT_DIALOG_NO_BUTTON} from '@components/Buttons/PopUpButton';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {LINKS} from '@constants/links';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuItem} from '@screens/SettingsFlow/Settings/components/MenuItem.tsx';
import {SectionTitle} from '@screens/SettingsFlow/Settings/components/SectionTitle';
import {AccountActions} from '@store/modules/Account/actions';
import {
  AnalyticsEventLogger,
  EVENT_NAMES,
} from '@store/modules/Analytics/constants';
import {EraseIcon} from '@svg/EraseIcon';
import {FeedbackIcon} from '@svg/FeedbackIcon';
import {InviteIcon} from '@svg/InviteIcon';
import {LogOutIcon} from '@svg/LogOutIcon';
import {t} from '@translations/i18n';
import {openLink} from '@utils/device';
import React from 'react';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export const SupportMenuSection = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  return (
    <>
      <SectionTitle text={t('settings.support').toUpperCase()} />
      <MenuItem
        title={t('settings.feedback_title')}
        description={t('settings.feedback_description')}
        renderIcon={FeedbackIcon}
        onPress={() => {
          openLink(`mailto:${LINKS.FEEDBACK_EMAIL}`);
          AnalyticsEventLogger.trackEvent({
            eventName: EVENT_NAMES.SEND_FEEDBACK,
          });
        }}
      />
      {isLightDesign ? null : (
        <MenuItem
          title={t('settings.invite_title')}
          description={t('settings.invite_description')}
          renderIcon={() => (
            <InviteIcon
              fill={COLORS.primaryLight}
              width={rem(24)}
              height={rem(24)}
            />
          )}
          onPress={() => navigation.navigate('InviteShare')}
        />
      )}
      <MenuItem
        title={t('settings.delete_title')}
        description={t('settings.delete_description')}
        renderIcon={EraseIcon}
        onPress={() => {
          navigation.navigate({
            name: 'PopUp',
            key: 'delete-account-confirmation-popup',
            params: {
              title: t('pop_up.delete_account_confirmation_title'),
              message: t('pop_up.delete_account_confirmation_text'),
              buttons: [
                DEFAULT_DIALOG_NO_BUTTON,
                {
                  text: t('button.continue'),
                  preset: 'destructive',
                  onPress: () =>
                    dispatch(AccountActions.DELETE_ACCOUNT.START.create()),
                },
              ],
            },
          });
        }}
        confirmation={{
          title: t('settings.delete_confirmation_title'),
          yesText: t('settings.delete_confirmation_yes'),
          noText: t('button.no'),
        }}
      />
      <MenuItem
        title={t('settings.logout_title')}
        description={t('settings.logout_description')}
        renderIcon={LogOutIcon}
        onPress={() => {
          dispatch(AccountActions.SIGN_OUT.START.create());
        }}
        confirmation={{
          title: t('settings.logout_confirmation_title'),
          yesText: t('settings.logout_confirmation_yes'),
          noText: t('button.no'),
        }}
      />
    </>
  );
};
