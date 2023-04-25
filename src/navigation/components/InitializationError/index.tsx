// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import RNRestart from 'react-native-restart';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const InitializationError = () => {
  const onTryAgainPress = () => {
    RNRestart.restart();
  };

  const errorMessage = useSelector(
    failedReasonSelector.bind(null, AppCommonActions.APP_INITIALIZED),
  );

  return (
    <View style={styles.container}>
      <Image
        resizeMode={'contain'}
        style={styles.image}
        source={Images.popUp.error}
      />
      <Text style={styles.titleText}>{t('errors.general_error_title')}</Text>
      <Text style={styles.messageText}>{errorMessage}</Text>
      <PrimaryButton
        style={styles.button}
        onPress={onTryAgainPress}
        text={t('button.try_again')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: rem(40),
  },
  image: {
    width: rem(250),
    height: rem(230),
  },
  titleText: {
    marginTop: rem(12),
    ...font(24, 29, 'black', 'primaryDark', 'center'),
  },
  messageText: {
    ...font(14, 20, 'medium', 'secondary', 'center'),
    marginTop: rem(16),
  },
  button: {
    height: rem(52),
    paddingHorizontal: rem(54),
    marginTop: rem(26),
  },
});
