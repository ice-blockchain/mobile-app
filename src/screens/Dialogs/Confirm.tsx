// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {t} from '@translations/i18n';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

export type ConfirmButton = {
  label: string;
  onPress?: () => void;
  preset?: 'default' | 'destructive';
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const DEFAULT_CONFIRM_YES_BUTTON: ConfirmButton = {
  label: t('button.yes'),
};

export const DEFAULT_CONFIRM_NO_BUTTON: ConfirmButton = {
  label: t('buttons.no_cancel'),
  preset: 'destructive',
};

export const Confirm = () => {
  const {
    params: {
      title,
      subtitle,
      buttons = [DEFAULT_CONFIRM_YES_BUTTON, DEFAULT_CONFIRM_NO_BUTTON],
    },
  } = useRoute<RouteProp<MainStackParamList, 'Confirm'>>();
  const navigation = useNavigation();
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {!!title && <Text style={styles.titleText}>{title}</Text>}
        {!!subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        <View style={styles.buttons}>
          {buttons.map(button => (
            <TouchableOpacity
              key={button.label}
              style={[
                styles.button,
                button.preset === 'destructive'
                  ? styles.button_destructive
                  : styles.button_default,
                button.containerStyle,
              ]}
              onPress={() => {
                navigation.goBack();
                button.onPress?.();
              }}>
              <Text
                style={[
                  styles.buttonLabelText,
                  button.preset === 'destructive'
                    ? styles.buttonLabelText_destructive
                    : styles.buttonLabelText_default,
                  button.labelStyle,
                ]}>
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.black04opacity,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingHorizontal: rem(28),
    paddingTop: rem(30),
    paddingBottom: rem(38),
    borderRadius: rem(20),
  },
  titleText: {
    fontSize: font(24),
    lineHeight: font(29),
    color: COLORS.darkBlue,
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
  },
  subtitleText: {
    marginTop: rem(14),
    fontSize: font(14),
    lineHeight: font(24),
    color: COLORS.greyText,
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: rem(10),
    justifyContent: 'center',
  },
  button: {
    width: rem(96),
    height: rem(34),
    borderRadius: rem(11),
    marginHorizontal: rem(6),
    marginTop: rem(10),
    justifyContent: 'center',
  },
  button_default: {
    backgroundColor: COLORS.primary,
  },
  button_destructive: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.pomegranate,
  },
  buttonLabelText: {
    fontSize: font(12),
    lineHeight: font(15),
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
  },
  buttonLabelText_default: {
    color: COLORS.white,
  },
  buttonLabelText_destructive: {
    color: COLORS.pomegranate,
  },
});
