// SPDX-License-Identifier: ice License 1.0

import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  email: string | null;
};

export const Description = ({email}: Props) => {
  return (
    <>
      <Text style={styles.descriptionText}>
        {t('confirm_code.description')}
        {'\n'}
      </Text>
      <Text style={styles.emailText}>{email}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    ...font(14, 19, 'medium', 'wildSand'),
  },
  emailText: {
    ...font(14, 19, 'bold', 'wildSand'),
  },
});
