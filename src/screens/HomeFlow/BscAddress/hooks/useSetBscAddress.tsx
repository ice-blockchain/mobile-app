// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useGoBackIfAddressSet} from '@screens/HomeFlow/BscAddress/hooks/useGoBackIfAddressSet';
import {AccountActions} from '@store/modules/Account/actions';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const useSetBscAddress = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  const dispatch = useDispatch();
  const user = useSelector(unsafeUserSelector);
  const [address, setAddress] = useState(
    user.miningBlockchainAccountAddress ?? '',
  );
  const submittedRef = useRef(false);

  useGoBackIfAddressSet({isFormSubmitted: submittedRef.current});

  const error = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const loading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const onAddressChange = (text: string) => {
    if (error) {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET);
    }
    setAddress(text);
  };

  const isRemoveAction = !address && !!user?.miningBlockchainAccountAddress;

  const onSubmit = () => {
    if (isRemoveAction) {
      submittedRef.current = true;
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create({
          miningBlockchainAccountAddress: address,
        }),
      );
      return;
    }
    navigation.navigate({
      name: 'PopUp',
      key: 'confirm-bsc-address-popup',
      params: {
        title: t('button.confirm_address'),
        message: (
          <>
            <Text style={styles.messageText}>
              {t('bsc_address.enter_address_confirmation')}
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
              submittedRef.current = true;
              dispatch(
                AccountActions.UPDATE_ACCOUNT.START.create({
                  miningBlockchainAccountAddress: address,
                }),
              );
            },
          },
        ],
      },
    });
  };

  return {
    onSubmit,
    address,
    loading,
    error: submittedRef.current ? error : null,
    onAddressChange,
    isRemoveAction,
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
