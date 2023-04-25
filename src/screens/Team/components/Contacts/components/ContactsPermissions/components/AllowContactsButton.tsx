// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {AddressBookIcon} from '@svg/AddressBookIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export const AllowContactsButton = () => {
  const dispatch = useDispatch();
  return (
    <PrimaryButton
      text={t('team.contacts.empty_button_title')}
      onPress={() =>
        dispatch(PermissionsActions.GET_PERMISSIONS.START.create('contacts'))
      }
      style={styles.button}
      textStyle={styles.buttonText}
      icon={<AddressBookIcon />}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: rem(253),
    height: rem(52),
    borderRadius: rem(12),
  },
  buttonText: {
    ...font(17, 20, 'bold'),
  },
});
