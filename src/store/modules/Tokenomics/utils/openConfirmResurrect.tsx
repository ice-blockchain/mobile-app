// SPDX-License-Identifier: ice License 1.0

import {ResurrectRequiredData} from '@api/tokenomics/types';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {dayjs} from '@services/dayjs';
import {MedKitIcon} from '@svg/MedKitIcon';
import {isRTL, replaceString, t, tagRegex} from '@translations/i18n';
import {getDurationString} from '@utils/date';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const openConfirmResurrect = (params: ResurrectRequiredData) => {
  let resultResolve: (value: 'yes' | 'no') => void;
  const resultPromise = new Promise<'yes' | 'no'>(r => (resultResolve = r));

  let message = replaceString(
    t('pop_up.resurrection_message'),
    tagRegex('amount'),
    (match, index) => (
      <Text key={match + index} style={styles.boldText}>
        {isRTL && <Text> </Text>}
        {formatNumberString(params.amount)}
      </Text>
    ),
  );

  message = replaceString(message, tagRegex('period'), (match, index) => (
    <Text key={match + index} style={styles.boldText}>
      {getDurationString(dayjs.duration(params.duringTheLastXSeconds, 's'))}
    </Text>
  ));

  navigate({
    name: 'PopUp',
    key: 'confirm-resurrect-popup',
    params: {
      imageProps: {source: Images.popUp.resurrection},
      title: t('pop_up.resurrection'),
      message: <Message text={message} />,
      warning: t('pop_up.resurrection_warning'),
      buttons: [
        {
          text: t('button.not_now'),
          preset: 'outlined',
          onPress: () => resultResolve('no'),
        },
        {
          icon: <MedKitIcon />,
          text: t('button.resurrect_me'),
          onPress: () => resultResolve('yes'),
        },
      ],
      dismissOnButtonPress: false,
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
