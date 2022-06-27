// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {translate} from '@translations/i18n';
import React from 'react';
import {
  FlexStyle,
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {isIOS, rem} from 'rn-units';

const icon = require('../../assets/teamSearchBarIcon.png');

type SearchProps = {
  value: string;
  style?: StyleProp<ViewStyle | FlexStyle>;
  placeholder?: string;
  onChangeText: (value: string) => void;
};

export default function Search({
  style,
  placeholder = 'team.header.search_placeholder',
  ...rest
}: SearchProps): React.ReactElement {
  const textInputRef: React.RefObject<TextInput> = React.createRef();
  const focus = () => textInputRef.current?.focus();

  return (
    <View style={[styles.wrapper, style]}>
      <Touchable onPress={focus} style={styles.btn}>
        <Image source={icon} style={styles.icon} />
      </Touchable>
      <TextInput
        ref={textInputRef}
        style={[styles.input]}
        placeholderTextColor={COLORS.heather}
        placeholder={placeholder ? translate(placeholder) : ''}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rem(15),
    backgroundColor: COLORS.white,
    height: rem(45),
    marginHorizontal: 24,
    alignSelf: 'center',
    marginTop: 55,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginTop: rem(isIOS ? 0 : 5),
    backgroundColor: 'transparent',
    fontSize: rem(13),
  },
  icon: {
    width: rem(15),
    height: rem(15),
  },
  btn: {
    paddingLeft: rem(14),
    paddingRight: rem(14),
  },
});
