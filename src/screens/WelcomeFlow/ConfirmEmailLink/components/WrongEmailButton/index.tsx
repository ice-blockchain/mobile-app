// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {ValidationActions} from '@store/modules/Validation/actions';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export const WrongEmailButton = () => {
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(ValidationActions.EMAIL_VALIDATION.RESET.create());
  };
  return (
    <Touchable
      style={styles.container}
      onPress={onPress}
      hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
      <Text style={styles.buttonText}>{t('confirm_email.wrong_email')}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(36),
    marginBottom: rem(18),
  },
  buttonText: {
    ...font(15, 20, 'medium', 'secondary', 'center'),
  },
});
