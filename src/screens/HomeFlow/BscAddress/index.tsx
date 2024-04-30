// SPDX-License-Identifier: ice License 1.0

import {FramedBscIcon} from '@components/FramedBscIcon';
import {CommonInput} from '@components/Inputs/CommonInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {AddressActionButton} from '@screens/HomeFlow/BscAddress/components/AddressActionButton';
import {WalletCard} from '@screens/HomeFlow/BscAddress/components/WalletCard';
import {useSetBscAddress} from '@screens/HomeFlow/BscAddress/hooks/useSetBscAddress';
import {useValidatorsWarning} from '@screens/HomeFlow/BscAddress/hooks/useValidatorsWarning';
import {BscBookIcon} from '@svg/BscBookIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const BscAddress = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const {bottom: bottomInset} = useSafeAreaInsets();
  const {scrollRef} = useScrollEndOnKeyboardShown();
  const isKeyboardShown = useIsKeyboardShown();
  const {showWarning, needToShowWarning} = useValidatorsWarning();

  const {address, loading, error, onAddressChange, onSubmit, isRemoveAction} =
    useSetBscAddress();

  return (
    <KeyboardAvoider>
      <Header title={t('bsc_address.title')} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.containerContent,
          {paddingBottom: Math.max(bottomInset + rem(20), rem(54))},
        ]}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <FramedBscIcon style={styles.icon} />
        <Text style={styles.titleText}>
          {t('bsc_address.enter_address_title')}
        </Text>
        <Text style={styles.descriptionText}>
          {t('bsc_address.enter_address_description')}
        </Text>
        <CommonInput
          icon={<BscBookIcon />}
          label={t('bsc_address.title')}
          value={address}
          onChangeText={onAddressChange}
          containerStyle={styles.input}
          editable={!loading}
          errorText={error}
          onChange={needToShowWarning ? showWarning : undefined}
          showChangeLabel={false}
        />
        {!isKeyboardShown && <WalletCard style={styles.walletCard} />}
        <AddressActionButton
          style={styles.button}
          onPress={onSubmit}
          loading={loading}
          isRemoveAction={isRemoveAction}
        />
      </ScrollView>
    </KeyboardAvoider>
  );
});

const styles = StyleSheet.create({
  containerContent: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    flexGrow: 1,
  },
  icon: {
    marginTop: rem(24),
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
    marginTop: rem(50),
  },
  walletCard: {
    marginTop: rem(24),
  },
  button: {
    marginTop: rem(48),
    marginHorizontal: rem(18),
  },
});
