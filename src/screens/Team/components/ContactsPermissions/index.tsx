// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {Text} from '@components/Text';
import {FONTS} from '@constants/fonts';
import {IS_SMALL_SCREEN, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {TeamAllowContactsButtonIcon} from '@screens/Team/assets/svg/TeamAllowContactsButtonIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {font, isIOS, rem} from 'rn-units';

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
  const tabbarOffest = useBottomTabBarOffsetStyle({
    extraOffset: IS_SMALL_SCREEN ? (isIOS ? undefined : 20) : undefined,
  });
  return (
    <View style={[styles.container, tabbarOffest.current]}>
      <View style={styles.imageContainer}>
        <Image source={icon} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title} text="team.contacts.empty_title" />
      <Text style={styles.description} text="team.contacts.empty_description" />
      <PrimaryButton
        text={t('team.contacts.empty_button_title')}
        onPress={handleOnPress}
        style={styles.allowAccessButton}
        textStyle={styles.buttonText}
        icon={<TeamAllowContactsButtonIcon />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    maxHeight: rem(200),
    marginTop: rem(16),
  },
  image: {
    flex: 1,
  },
  title: {
    fontSize: font(24),
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(2),
  },
  description: {
    fontSize: font(14),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(7),
    lineHeight: rem(24),
  },
  allowAccessButton: {
    marginTop: rem(25),
    width: rem(253),
    height: rem(55),
  },
  buttonText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(18),
    lineHeight: rem(25),
  },
});
