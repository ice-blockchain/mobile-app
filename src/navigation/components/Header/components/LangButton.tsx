// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DropdownIcon} from '@svg/DropdownIcon';
import {WorldIcon} from '@svg/WorldIcon';
import i18n from '@translations/i18n';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {font} from 'rn-units';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const LangButton = ({
  containerStyle,
  color = COLORS.white,
}: Props = {}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('LanguageSettings')}
      hitSlop={SMALL_BUTTON_HIT_SLOP}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.langText, {color}]}>
          {i18n.currentLocale().toUpperCase()}
        </Text>
        <WorldIcon fill={color} style={styles.worldIcon} />
        <DropdownIcon fill={color} style={styles.dropdownIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langText: {
    fontSize: font(13),
    fontFamily: FONTS.primary.bold,
  },
  worldIcon: {
    marginLeft: 4,
  },
  dropdownIcon: {
    marginLeft: 3,
  },
});
