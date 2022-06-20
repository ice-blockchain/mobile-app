// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {FONTS} from '@constants/fonts';
import {TicketIconSvg} from '@svg/Ticket';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

const icon = require('../../assets/teamConfirmCode.png');

type ConfirmCodeProps = {};

export function ConfirmCode({}: ConfirmCodeProps): React.ReactElement {
  const [inputValue, onInputChange] = useState('');
  const handleOnPress = () => {
    // handle request
  };
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>Confirm Code</Text>
      <Text style={styles.description}>
        Please enter the confirmation code you have received on your phone.
      </Text>
      <View style={styles.inputContainer}>
        <CommonInput
          placeholder={'Enter the code'}
          value={inputValue}
          onChangeText={onInputChange}
          icon={<TicketIconSvg />}
          containerStyle={styles.input}
        />
        <PrimaryButton
          text={'Confirm your code now'}
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
    width: '100%',
    marginTop: 25,
    paddingHorizontal: rem(27),
  },
  icon: {
    width: rem(200),
    height: rem(170),
    marginTop: rem(16),
  },
  title: {
    fontSize: font(24),
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: rem(2),
  },
  description: {
    fontSize: font(14),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: rem(7),
    lineHeight: rem(24),
  },
  allowAccessButton: {
    marginTop: rem(25),
    width: '100%',
  },
  input: {
    width: '100%',
  },
});
