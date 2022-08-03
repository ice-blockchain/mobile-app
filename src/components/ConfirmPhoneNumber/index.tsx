// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {FONTS} from '@constants/fonts';
import {IS_SMALL_SCREEN, SCREEN_SIDE_OFFSET} from '@constants/styles';
import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {Images} from '@images';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {TicketIconSvg} from '@svg/Ticket';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {font, isIOS, rem} from 'rn-units';

type Props = {
  onSubmitPress: (code: string) => void;
  hideBodyOnKeyboardOpen?: boolean;
};

export function ConfirmPhoneNumber({
  onSubmitPress,
  hideBodyOnKeyboardOpen = false,
}: Props) {
  const [code, onCodeChange] = useState('');
  const isKeyboardShown = useIsKeyboardShown();

  const handleOnPress = () => {
    onSubmitPress(code);
  };

  const tabbarOffest = useBottomTabBarOffsetStyle({
    extraOffset: IS_SMALL_SCREEN ? (isIOS ? undefined : 20) : undefined,
  });

  return (
    <View style={[styles.container, tabbarOffest.current]}>
      {(!isKeyboardShown || !hideBodyOnKeyboardOpen) && (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={Images.phone.confirmPhoneNumber}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>{t('team.confirm_code.title')}</Text>
          <Text style={styles.description}>
            {t('team.confirm_code.description')}
          </Text>
        </>
      )}
      <CommonInput
        placeholder={t('team.confirm_code.placeholder')}
        value={code}
        onChangeText={onCodeChange}
        icon={<TicketIconSvg />}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: rem(25),
    paddingHorizontal: rem(27),
  },
  imageContainer: {
    flex: 1,
    maxHeight: rem(200),
    alignItems: 'center',
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
    marginBottom: rem(20),
    lineHeight: rem(24),
  },
  allowAccessButton: {
    marginTop: rem(25),
  },
});
