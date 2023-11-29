// SPDX-License-Identifier: ice License 1.0

import {CommonInput} from '@components/Inputs/CommonInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ConfirmAddressButton} from '@screens/HomeFlow/EthereumAddress/components/ConfirmAddressButton';
import {EthereumAddressWarning} from '@screens/HomeFlow/EthereumAddress/components/EthereumAddressWarning';
import {FramedEthereumIcon} from '@screens/HomeFlow/EthereumAddress/components/FramedEthereumIcon';
import {useGoBackIfAddressSet} from '@screens/HomeFlow/EthereumAddress/hooks/useGoBackIfAddressSet';
import {useSetEthereumAddress} from '@screens/HomeFlow/EthereumAddress/hooks/useSetEthereumAddress';
import {useValidatorsWarning} from '@screens/HomeFlow/EthereumAddress/hooks/useValidatorsWarning';
import {EthereumBookIcon} from '@svg/EthereumBookIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const EthereumAddress = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const {bottom: bottomInset} = useSafeAreaInsets();
  const {scrollRef} = useScrollEndOnKeyboardShown();
  const isKeyboardShown = useIsKeyboardShown();
  const {showWarning, isWarningConfirmed} = useValidatorsWarning();

  const {address, loading, error, onAddressChange, onSubmit} =
    useSetEthereumAddress();

  useGoBackIfAddressSet();

  return (
    <KeyboardAvoider>
      <Header title={t('ethereum_address.title')} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.containerContent,
          {marginBottom: bottomInset},
        ]}
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
          value={address}
          onChangeText={onAddressChange}
          containerStyle={styles.input}
          editable={!loading}
          errorText={error}
          onChange={!isWarningConfirmed ? showWarning : undefined}
          showChangeLabel={false}
        />
        {!isKeyboardShown && <EthereumAddressWarning style={styles.warning} />}
        <ConfirmAddressButton
          style={styles.button}
          onPress={onSubmit}
          loading={loading}
        />
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
    marginBottom: rem(20),
    marginHorizontal: rem(18),
  },
});
