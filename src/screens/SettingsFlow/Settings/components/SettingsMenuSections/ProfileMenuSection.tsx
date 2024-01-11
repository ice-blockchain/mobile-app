// SPDX-License-Identifier: ice License 1.0

import {isLightDesign} from '@constants/featureFlags';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuItem} from '@screens/SettingsFlow/Settings/components/MenuItem.tsx';
import {SectionTitle} from '@screens/SettingsFlow/Settings/components/SectionTitle';
import {CertificateIcon} from '@svg/CertificateIcon';
import {EmailNotificationIcon} from '@svg/EmailNotificationIcon';
import {PersonIcon} from '@svg/PersonIcon';
import {PushNotificationIcon} from '@svg/PushNotificationIcon';
import {t} from '@translations/i18n';
import React from 'react';

export const ProfileMenuSection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  return (
    <>
      <SectionTitle text={t('settings.profile').toUpperCase()} />
      <MenuItem
        title={t('settings.personal_information_title')}
        description={t('settings.personal_information_description')}
        renderIcon={PersonIcon}
        onPress={() => navigation.navigate('PersonalInformation')}
      />
      <MenuItem
        title={t('settings.push_notifications_title')}
        description={t('settings.push_notifications_description')}
        renderIcon={PushNotificationIcon}
        onPress={() =>
          navigation.navigate('NotificationSettings', {
            notificationDeliveryChannel: 'push',
          })
        }
      />
      <MenuItem
        title={t('settings.email_notifications_title')}
        description={t('settings.email_notifications_description')}
        renderIcon={EmailNotificationIcon}
        onPress={() =>
          navigation.navigate('NotificationSettings', {
            notificationDeliveryChannel: 'email',
          })
        }
      />
      {isLightDesign ? null : (
        <MenuItem
          title={t('settings.inapp_privacy_title')}
          description={t('settings.inapp_privacy_description')}
          renderIcon={CertificateIcon}
          onPress={() => {
            navigation.goBack();
            navigation.push('ProfilePrivacyEditStep1');
          }}
        />
      )}
    </>
  );
};
