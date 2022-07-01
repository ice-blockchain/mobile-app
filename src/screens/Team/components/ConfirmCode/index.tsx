// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {FONTS} from '@constants/fonts';
import {IS_SMALL_SCREEN, RATIO, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {TicketIconSvg} from '@svg/Ticket';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {font, rem, screenWidth} from 'rn-units';

const icon = require('../../assets/images/teamConfirmCode.png');

type ConfirmCodeProps = {
  confirmCodePress: () => void;
};

export function ConfirmCode({
  confirmCodePress,
}: ConfirmCodeProps): React.ReactElement {
  const [inputValue, onInputChange] = useState('');
  const handleOnPress = () => {
    confirmCodePress();
  };
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{t('team.confirm_code.title')}</Text>
      <Text style={styles.description}>
        {t('team.confirm_code.description')}
      </Text>
      <View style={styles.inputContainer}>
        <CommonInput
          placeholder={t('team.confirm_code.placeholder')}
          value={inputValue}
          onChangeText={onInputChange}
          icon={<TicketIconSvg />}
          containerStyle={styles.input}
        />
        <PrimaryButton
          text={t('team.confirm_code.button')}
          onPress={handleOnPress}
          style={styles.allowAccessButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    width: screenWidth,
    marginTop: IS_SMALL_SCREEN ? rem(10) : rem(25),
    paddingHorizontal: rem(27),
  },
  icon: {
    width: rem(200 * RATIO),
    height: rem(170 * RATIO),
    marginTop: IS_SMALL_SCREEN ? rem(6) : rem(16),
  },
  title: {
    fontSize: font(24 * RATIO),
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(2 * RATIO),
  },
  description: {
    fontSize: font(14 * RATIO),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(7 * RATIO),
    lineHeight: rem(24 * RATIO),
  },
  allowAccessButton: {
    marginTop: IS_SMALL_SCREEN ? rem(10) : rem(25),
    width: screenWidth - rem(48),
  },
  input: {
    width: screenWidth - rem(48),
  },
});
