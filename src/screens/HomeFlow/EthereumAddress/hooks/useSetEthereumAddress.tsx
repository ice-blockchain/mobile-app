// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const useSetEthereumAddress = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');

  const error = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );
  const loading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const onSubmit = () => {
    navigation.navigate('PopUp', {
      title: t('button.confirm_address'),
      message: (
        <>
          <Text style={styles.messageText}>
            {t('ethereum_address.enter_address_confirmation')}
          </Text>
          <Text style={[styles.messageText, styles.messageTextBold]}>
            {address}
          </Text>
        </>
      ),
      buttons: [
        {
          text: t('button.not_sure'),
          preset: 'outlined',
        },
        {
          text: t('button.confirm'),
          onPress: () => {
            dispatch(
              AccountActions.UPDATE_ACCOUNT.START.create({
                miningBlockchainAccountAddress: address,
              }),
            );
          },
        },
      ],
    });
  };
  return {
    onSubmit,
    address,
    loading,
    error,
    onAddressChange: setAddress,
  };
};

const styles = StyleSheet.create({
  messageText: {
    ...font(14, 20, 'medium', 'secondary', 'center'),
    marginTop: rem(16),
    marginHorizontal: rem(30),
  },
  messageTextBold: {
    fontWeight: '700',
  },
});
