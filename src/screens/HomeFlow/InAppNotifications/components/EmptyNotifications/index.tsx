// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {InAppNotificationActions} from '@store/modules/InAppNotifications/actions';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export const EmptyNotifications = () => {
  const dispatch = useDispatch();

  const onGenerateNotificationsPress = async () => {
    dispatch(
      InAppNotificationActions.ADD_IN_APP_MOCKED_NOTIFICATIONS.STATE.create(),
    );
  };

  const onGenerateAnnouncementsPress = async () => {
    dispatch(InAppNotificationActions.ADD_MOCKED_ANNOUNCEMENTS.STATE.create());
  };

  const onGenerateBothPress = async () => {
    dispatch(
      InAppNotificationActions.ADD_IN_APP_NOTIFICATIONS_AND_ANNOUNCEMENTS.STATE.create(),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('notifications.no_notifications')}</Text>
      <PrimaryButton
        style={styles.button}
        onPress={onGenerateNotificationsPress}
        text={t('notifications.add_notifications')}
        textStyle={styles.buttonText}
      />
      <PrimaryButton
        style={styles.button}
        onPress={onGenerateAnnouncementsPress}
        text={t('notifications.add_announcements')}
        textStyle={styles.buttonText}
      />
      <PrimaryButton
        style={styles.button}
        onPress={onGenerateBothPress}
        text={t('notifications.add_both')}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    ...font(17, 22, 'semibold', 'primaryDark'),
    marginBottom: rem(50),
    marginTop: rem(120),
  },
  button: {
    width: rem(247),
    marginBottom: rem(20),
  },
  buttonText: {
    textAlign: 'center',
  },
});
