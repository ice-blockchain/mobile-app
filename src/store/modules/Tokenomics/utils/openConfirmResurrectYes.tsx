// SPDX-License-Identifier: ice License 1.0

import {ResurrectRequiredData} from '@api/tokenomics/types';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const openConfirmResurrectYes = (params: ResurrectRequiredData) => {
  let resultResolve: (value: 'yes' | 'no') => void;
  const resultPromise = new Promise<'yes' | 'no'>(r => (resultResolve = r));

  const message = replaceString(
    t('pop_up.resurrection_yes_confirm_message'),
    tagRegex('amount'),
    (match, index) => (
      <Text key={match + index} style={styles.boldText}>
        {formatNumber(params.amount, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
    ),
  );

  navigate({
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.resurrection},
      title: t('pop_up.please_confirm'),
      message: <Message text={message} />,
      buttons: [
        {
          text: t('button.cancel'),
          preset: 'outlined',
          onPress: () => resultResolve('no'),
        },
        {
          text: t('button.confirm'),
          onPress: () => resultResolve('yes'),
        },
      ],
      dismissOnAndroidHardwareBack: false,
      dismissOnOutsideTouch: false,
    },
  });

  return resultPromise;
};

const styles = StyleSheet.create({
  boldText: {
    ...font(14, 20, 'bold', 'primaryDark'),
  },
});
