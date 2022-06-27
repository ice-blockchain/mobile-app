// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {FONTS} from '@constants/fonts';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {TicketIconSvg} from '@svg/Ticket';
import {translate} from '@translations/i18n';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

const icon = require('../../assets/teamConfirmCode.png');

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
  const tabbarOffest = useBottomTabBarOffsetStyle();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tabbarOffest.current}>
      <View style={styles.container}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{translate('team.confirm_code.title')}</Text>
        <Text style={styles.description}>
          {translate('team.confirm_code.description')}
        </Text>
        <View style={styles.inputContainer}>
          <CommonInput
            placeholder={translate('team.confirm_code.placeholder')}
            value={inputValue}
            onChangeText={onInputChange}
            icon={<TicketIconSvg />}
            containerStyle={styles.input}
          />
          <PrimaryButton
            text={translate('team.confirm_code.button')}
            onPress={handleOnPress}
            style={styles.allowAccessButton}
          />
        </View>
      </View>
    </ScrollView>
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
