// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {Text} from '@components/Text';
import {FONTS} from '@constants/fonts';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {translate} from '@translations/i18n';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {font, rem} from 'rn-units';

const icon = require('../../assets/teamAgendaNotShared.png');

type ContactsPermissionsProps = {
  requestContactsAccessPermissionPress: () => void;
};

export function ContactsPermissions({
  requestContactsAccessPermissionPress,
}: ContactsPermissionsProps): React.ReactElement {
  const handleOnPress = () => {
    requestContactsAccessPermissionPress();
  };
  const tabbarOffest = useBottomTabBarOffsetStyle();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={{
        paddingBottom: tabbarOffest.current.paddingBottom,
      }}>
      <View style={styles.container}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title} text="team.contacts.empty_title" />
        <Text
          style={styles.description}
          text="team.contacts.empty_description"
        />
        <PrimaryButton
          text={translate('team.contacts.empty_button_title')}
          onPress={handleOnPress}
          style={styles.allowAccessButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: rem(200),
    height: rem(170),
    marginTop: rem(16),
  },
  title: {
    fontSize: font(24),
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: rem(2),
  },
  description: {
    fontSize: font(14),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: rem(7),
    lineHeight: rem(24),
  },
  allowAccessButton: {
    marginTop: rem(25),
  },
});
