// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CommonInput} from '@components/Inputs/CommonInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {EthereumAddressWarning} from '@screens/HomeFlow/EtheriumAddress/components/EthereumAddressWarning';
import {FramedEthereumIcon} from '@screens/HomeFlow/EtheriumAddress/components/FramedEthereumIcon';
import {EthereumBookIcon} from '@svg/EthereumBookIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const EthereumAddress = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  const {scrollRef} = useScrollEndOnKeyboardShown();

  return (
    <KeyboardAvoider>
      <Header title={t('ethereum_address.title')} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.containerContent]}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <FramedEthereumIcon style={styles.icon} />
        <Text style={styles.titleText}>
          {t('ethereum_address.enter_address_title')}
        </Text>
        <Text style={styles.descriptionText}>
          {t('ethereum_address.enter_address_description')}
        </Text>
        <CommonInput
          icon={<EthereumBookIcon />}
          label={t('ethereum_address.title')}
          value={''}
          containerStyle={styles.input}
        />
        <EthereumAddressWarning />
        <PrimaryButton
          text={t('button.confirm_address')}
          onPress={() => {}}
          style={styles.button}
        />
      </ScrollView>
    </KeyboardAvoider>
  );
});

const styles = StyleSheet.create({
  containerContent: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  icon: {
    marginTop: rem(45),
    alignSelf: 'center',
  },
  titleText: {
    marginTop: rem(16),
    ...font(24, 29, 'black', 'primaryDark', 'center'),
  },
  descriptionText: {
    marginTop: rem(14),
    marginHorizontal: rem(10),
    ...font(14, 20, 'medium', 'secondary', 'center'),
  },
  input: {
    marginTop: rem(74),
  },
  button: {
    marginTop: rem(48),
  },
});
