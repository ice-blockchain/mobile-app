// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {EmailIcon} from '@svg/EmailIcon';
import {PhoneIcon} from '@svg/PhoneIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

export type Tab = 'email' | 'phone';

type Props = {
  onSelect: (tab: Tab) => void;
  selected: Tab;
  containerStyle?: StyleProp<ViewStyle>;
};

const tabData: {id: Tab; icon: ReactNode; label: string}[] = [
  {
    id: 'email',
    icon: <EmailIcon width={rem(17)} height={rem(12)} />,
    label: t('signIn.email'),
  },
  {
    id: 'phone',
    icon: <PhoneIcon width={rem(12)} height={rem(19)} />,
    label: t('signIn.phone'),
  },
];

export const Tabs = ({onSelect, selected, containerStyle}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {tabData.map(tab => {
        const isActive = selected === tab.id;
        return (
          <Touchable
            style={styles.button}
            key={tab.id}
            onPress={() => onSelect(tab.id)}>
            <View style={styles.buttonBody}>
              {tab.icon}
              <Text
                style={[
                  styles.buttonText,
                  isActive && styles.buttonText_active,
                ]}>
                {tab.label}
              </Text>
            </View>
            {isActive && <View style={styles.buttonUnderline} />}
          </Touchable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: rem(10),
  },
  buttonBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rem(8),
    marginHorizontal: rem(6),
  },
  buttonUnderline: {
    height: rem(4),
    borderRadius: rem(2),
    backgroundColor: COLORS.primaryDark,
  },
  buttonText: {
    marginLeft: rem(10),
    ...font(20, 24, 'semibold', 'secondary'),
  },
  buttonText_active: {
    color: COLORS.primaryDark,
  },
});
