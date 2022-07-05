// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {Text} from '@components/Text';
import {FONTS} from '@constants/fonts';
import {RATIO} from '@constants/styles';
import {t} from '@translations/i18n';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {font, rem} from 'rn-units';

const icon = require('../../assets/images/teamAgendaNotShared.png');

type ContactsPermissionsProps = {
  requestContactsAccessPermissionPress: () => void;
};

export function ContactsPermissions({
  requestContactsAccessPermissionPress,
}: ContactsPermissionsProps): React.ReactElement {
  const handleOnPress = () => {
    requestContactsAccessPermissionPress();
  };
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title} text="team.contacts.empty_title" />
      <Text style={styles.description} text="team.contacts.empty_description" />
      <PrimaryButton
        text={t('team.contacts.empty_button_title')}
        onPress={handleOnPress}
        style={styles.allowAccessButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: rem(200 * RATIO),
    height: rem(170 * RATIO),
    marginTop: rem(16 * RATIO),
  },
  title: {
    fontSize: font(24 * RATIO),
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
    marginHorizontal: rem(24),
    marginTop: rem(2),
  },
  description: {
    fontSize: font(14 * RATIO),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: rem(24),
    marginTop: rem(7 * RATIO),
    lineHeight: rem(24 * RATIO),
  },
  allowAccessButton: {
    marginTop: rem(25 * RATIO),
  },
});
