// SPDX-License-Identifier: ice License 1.0

import {CommonInput} from '@components/Inputs/CommonInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ConfirmAddressButton} from '@screens/HomeFlow/EthereumAddress/components/ConfirmAddressButton';
import {EthereumAddressWarning} from '@screens/HomeFlow/EthereumAddress/components/EthereumAddressWarning';
import {FramedEthereumIcon} from '@screens/HomeFlow/EthereumAddress/components/FramedEthereumIcon';
import {EthereumBookIcon} from '@svg/EthereumBookIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const EthereumAddress = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  const tabbarOffset = useBottomTabBarOffsetStyle();
  const {scrollRef} = useScrollEndOnKeyboardShown();
  const isKeyboardShown = useIsKeyboardShown();

  return (
    <KeyboardAvoider>
      <Header title={t('ethereum_address.title')} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.containerContent, tabbarOffset.current]}
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
        {!isKeyboardShown && <EthereumAddressWarning style={styles.warning} />}
        <ConfirmAddressButton style={styles.button} onPress={() => {}} />
      </ScrollView>
    </KeyboardAvoider>
  );
});

const styles = StyleSheet.create({
  containerContent: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    flexGrow: 1,
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
  warning: {
    marginTop: rem(24),
  },
  button: {
    marginTop: rem(48),
    marginHorizontal: rem(18),
  },
});
