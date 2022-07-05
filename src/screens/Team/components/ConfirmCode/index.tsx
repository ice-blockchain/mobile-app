// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {FONTS} from '@constants/fonts';
import {IS_SMALL_SCREEN, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {TicketIconSvg} from '@svg/Ticket';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {font, isIOS, rem, screenWidth} from 'rn-units';

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

  const tabbarOffest = useBottomTabBarOffsetStyle({
    extraOffset: IS_SMALL_SCREEN ? (isIOS ? undefined : 20) : undefined,
  });
  return (
    <View style={[styles.container, tabbarOffest.current]}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.phone.confirmCode}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
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
          autoCorrect={false}
          keyboardType="name-phone-pad"
          returnKeyType="done"
          onSubmitEditing={handleOnPress}
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
    marginTop: rem(25),
    paddingHorizontal: rem(27),
  },
  imageContainer: {
    flex: 1,
    maxHeight: rem(200),
  },
  image: {
    flex: 1,
  },
  title: {
    fontSize: font(24),
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(2),
  },
  description: {
    fontSize: font(14),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(7),
    lineHeight: rem(24),
  },
  allowAccessButton: {
    marginTop: rem(25),
    width: screenWidth - rem(48),
  },
  input: {
    width: screenWidth - rem(48),
  },
});
